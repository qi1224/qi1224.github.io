const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'C:/Users/wu78/PDF-Toolkit/node_modules/playwright');
const fs=require('node:fs'), http=require('node:http'), path=require('node:path');
const assert=require('node:assert/strict'), {execFileSync}=require('node:child_process');
const {gunzipSync}=require('node:zlib');
const original=execFileSync('git',['show','HEAD:atr-ir-demo/index.html'],{cwd:__dirname,maxBuffer:30e6}).toString();
const current=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
for(const prefix of ['const DATA=','const ALTERNATIVES=']){
  assert.equal(current.split('\n').find(l=>l.startsWith(prefix)),original.split('\n').find(l=>l.startsWith(prefix)), 'Original data retained');
}
assert.equal(current.split('function drawCross')[1].split('function currentParams')[0],original.split('function drawCross')[1].split('function currentParams')[0], 'Cross-section unchanged');
const packed=gunzipSync(fs.readFileSync(path.join(__dirname,'orientation.f32.gz')));
const sample=(f,p,h,r,k)=>packed.readFloatLE(((((f*19+p)*17+h)*6+r)*322+k)*4);
const server=http.createServer((req,res)=>{
  const name=req.url==='/'?'index.html':req.url.slice(1);
  if(!['index.html','orientation.js','orientation.f32.gz'].includes(name)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',name.endsWith('.html')?'text/html':name.endsWith('.js')?'text/javascript':'application/octet-stream');
  fs.createReadStream(path.join(__dirname,name)).pipe(res);
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url=process.argv.includes('--live') ? 'https://qi1224.github.io/atr-ir-demo/' : `http://127.0.0.1:${server.address().port}/`;
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    for(const size of [{width:1440,height:900},{width:1024,height:768},{width:1180,height:660},{width:390,height:844}]){
      const page=await browser.newPage({viewport:size});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(url);
      assert.equal(await page.locator('input[type=range]').count(),4);
      assert(await page.locator('#orientation').isDisabled());
      const old=await page.locator('#spectrum-line').getAttribute('d');
      const cross=await page.locator('#cross').innerHTML();
      await page.locator('#orientation-enabled').check();
      await page.waitForFunction(()=>!document.getElementById('orientation').disabled);
      assert.notEqual(await page.locator('#spectrum-line').getAttribute('d'),old);
      assert.equal(await page.locator('#cross').innerHTML(),cross);
      const at0=await page.locator('#spectrum-line').getAttribute('d');
      await page.locator('#orientation').fill('90');
      assert.notEqual(await page.locator('#spectrum-line').getAttribute('d'),at0);
      assert.equal(await page.locator('#cross').innerHTML(),cross);
      const values=await page.evaluate(()=>Array.from(TrenchOrientation.spectrum(.2,400,40,90)));
      values.forEach((v,k)=>assert(Math.abs(v-sample(3,18,8,2,k))<1e-7));
      const mixed=await page.evaluate(()=>Array.from(TrenchOrientation.spectrum(.225,425,50,42.5)));
      mixed.forEach((v,k)=>{
        let expected=0;
        for(const f of [3,4])for(const p of [8,9])for(const h of [8,9])for(const r of [2,3])expected+=sample(f,p,h,r,k)/16;
        assert(Math.abs(v-expected)<1e-7,'Four-axis interpolation');
      });
      assert(await page.evaluate(()=>{
        const a=TrenchOrientation.spectrum(.05,0,0,0),b=TrenchOrientation.spectrum(.7,0,100,90);
        return a.every((v,i)=>Math.abs(v-b[i])<1e-7);
      }),'Planar reference independent of parameters');
      const before=await page.evaluate(()=>{const p=currentParams(),s=buildSpectrum(p.fs,p.H,p.air);return [calcWPR(s),peakStretch(s)];});
      await page.evaluate(()=>{Math.random=()=>0;});
      await page.locator('#alternative').click();
      await page.waitForFunction(()=>!document.getElementById('alternative').disabled);
      const status=await page.locator('#alt-status').textContent();
      assert(status.startsWith('Matched'),status);
      assert.notEqual(await page.locator('#orientation').inputValue(),'90','Search can select a different orientation');
      const angles=await page.evaluate(async()=>[...new Set((await TrenchOrientation.alternatives()).map(c=>c[5]))]);
      assert.deepEqual(angles,Array.from({length:19},(_,i)=>5*i));
      if(status.startsWith('Matched')){
        const after=await page.evaluate(()=>{const p=currentParams(),s=buildSpectrum(p.fs,p.H,p.air);return [calcWPR(s),peakStretch(s)];});
        assert(Math.abs(before[0]-after[0])<=.015001);
        assert(Math.abs(before[1]-after[1])<=Math.max(1e-6,before[1]*.025)+1e-8);
      }
      // Restore default geometry to prove toggling recovers the original curve exactly.
      await page.evaluate(()=>{document.getElementById('air').value=40;document.getElementById('fs').value=.2;document.getElementById('height').value=400;});
      await page.locator('#orientation-enabled').uncheck();
      assert.equal(await page.locator('#spectrum-line').getAttribute('d'),old);
      assert(await page.locator('#orientation').isDisabled());
      const retainedAngle=await page.locator('#orientation').inputValue();
      await page.locator('#alternative').click();
      assert.equal(await page.locator('#orientation').inputValue(),retainedAngle,'Disabled mode leaves orientation unchanged');
      assert((await page.locator('#alt-status').textContent()).length);
      const layout=await page.evaluate(()=>{
        const controls=document.querySelector('.controls-inner'),a=document.getElementById('alternative');
        return {width:document.documentElement.scrollWidth,reachable:a.getBoundingClientRect().bottom<=controls.getBoundingClientRect().bottom+1||controls.scrollHeight>controls.clientHeight};
      });
      assert(layout.width<=size.width);assert(layout.reachable);
      assert.deepEqual(errors,[]);
      console.log(JSON.stringify({size,status,errors,layout}));
      if(size.width===1440) await page.screenshot({path:'C:/Users/wu78/atr-orientation-preview.png',fullPage:true});
      await page.close();
    }
    const cancellation=await browser.newPage();
    await cancellation.goto(url);
    await cancellation.locator('#orientation-enabled').check();
    await cancellation.waitForFunction(()=>!document.getElementById('orientation').disabled);
    await cancellation.evaluate(()=>{
      document.getElementById('alternative').click();
      document.getElementById('orientation').value=37;
      document.getElementById('orientation').dispatchEvent(new Event('input'));
    });
    await cancellation.waitForFunction(()=>!document.getElementById('alternative').disabled);
    assert.equal(await cancellation.locator('#orientation').inputValue(),'37');
    assert.equal(await cancellation.locator('#air').inputValue(),'40');
    assert.equal(await cancellation.locator('#alt-status').textContent(),'');
    await cancellation.close();
    const page=await browser.newPage();
    await page.route('**/orientation.f32.gz',route=>route.abort());
    await page.goto(url);
    const old=await page.locator('#spectrum-line').getAttribute('d');
    await page.locator('#orientation-enabled').check();
    await page.waitForFunction(()=>document.getElementById('alt-status').textContent.startsWith('Could not'));
    assert.equal(await page.locator('#spectrum-line').getAttribute('d'),old);
    assert(!await page.locator('#orientation-enabled').isChecked());
    console.log('Load failure safely retains original data. All checks passed.');
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
