'use strict';
// Corr sheets exported by convert_orientation.py; no raw absorbance is used.
const TrenchOrientation = (() => {
  const wavenumbers = Array.from({length:322}, (_,i)=>1432+8*i);
  let data, pending, cachedAlternatives, localBlob;
  async function loadLocalBlob(){
    if(localBlob) return localBlob;
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='orientation-local.js';
      script.onload=()=>{script.remove();resolve();};
      script.onerror=()=>{script.remove();reject(new Error('Local orientation data script unavailable'));};
      document.head.appendChild(script);
    });
    const encoded=window.ORIENTATION_GZIP_BASE64;
    if(typeof encoded!=='string') throw new Error('Invalid local orientation data script');
    const binary=atob(encoded), bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    window.ORIENTATION_GZIP_BASE64=null;
    localBlob=new Blob([bytes]);
    return localBlob;
  }
  async function load(){
    if(data) return;
    if(!pending) pending=(async()=>{
      let compressedStream;
      if(location.protocol==='file:'){
        compressedStream=(await loadLocalBlob()).stream();
      }else{
        const response=await fetch('orientation.f32.gz');
        if(!response.ok) throw new Error('Orientation dataset unavailable');
        compressedStream=response.body;
      }
      const buffer=await new Response(compressedStream.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
      if(buffer.byteLength!==14*19*17*6*322*4) throw new Error('Invalid orientation dataset');
      data=new Float32Array(buffer);
      localBlob=null;
    })().catch(error=>{pending=null;throw error;});
    return pending;
  }
  function weights(value,max){
    const v=Math.max(0,Math.min(max,value)), low=Math.floor(v), high=Math.ceil(v);
    return low===high ? [[low,1]] : [[low,high-v],[high,v-low]];
  }
  function spectrum(fs,height,air,angle){
    const out=new Float64Array(322);
    for(const [f,wf] of weights((fs-.05)/.05,13))
    for(const [p,wp] of weights(angle/5,18))
    for(const [h,wh] of weights(height/50,16))
    for(const [r,wr] of weights(air/20,5)){
      const offset=((((f*19)+p)*17+h)*6+r)*322, w=wf*wp*wh*wr;
      for(let k=0;k<322;k++) out[k]+=data[offset+k]*w;
    }
    return out;
  }
  // Preserve the original 1% air / 50 nm / 0.05 solid fraction search grid.
  // Interpolate spectra first, then take peaks (never interpolate WPR ratios).
  function alternatives(){
    if(!cachedAlternatives) cachedAlternatives=buildAlternatives().catch(error=>{
      cachedAlternatives=null;
      throw error;
    });
    return cachedAlternatives;
  }
  async function buildAlternatives(){
    const result=[];
    // Search every supplied orientation, yielding between angles so controls
    // remain responsive while the reusable four-variable grid is prepared.
    for(let angle=0;angle<=90;angle+=5){
    await new Promise(resolve=>setTimeout(resolve,0));
    for(let f=1;f<=14;f++) for(let h=0;h<=800;h+=50){
      const endpoints=Array.from({length:6},(_,r)=>spectrum(f*.05,h,r*20,angle));
      for(let air=0;air<=100;air++){
        const r=Math.min(4,Math.floor(air/20)), t=(air-r*20)/20;
        let stretch=-Infinity,bend=-Infinity;
        for(let k=0;k<322;k++){
          const wn=wavenumbers[k];
          if((wn>=3200&&wn<=3850)||(wn>=1500&&wn<=1800)){
            const v=endpoints[r][k]*(1-t)+endpoints[r+1][k]*t;
            if(wn>=3200) stretch=Math.max(stretch,v); else bend=Math.max(bend,v);
          }
        }
        result.push([Number((f*.05).toFixed(2)),h,air,bend===0?0:stretch/bend,stretch,angle]);
      }
    }
    }
    return result;
  }
  return {load,spectrum,alternatives,wavenumbers};
})();
