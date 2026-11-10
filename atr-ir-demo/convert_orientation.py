"""Export the supplied RCWA workbook: python convert_orientation.py workbook.xlsx.

Only Corr sheets are used. Layout: fs, orientation, height, air ratio, wavenumber.
Float32 little endian, gzip compressed; all measured grid points are retained.
"""
import gzip
import hashlib
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET
import zipfile
import numpy as np

source = Path(sys.argv[1])
out = Path(__file__).parent
ns = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
grid = np.full((14, 19, 17, 6, 322), np.nan, dtype='<f4')
with zipfile.ZipFile(source) as z:
    strings = [''.join(el.itertext()) for el in ET.fromstring(z.read('xl/sharedStrings.xml'))]
    for f in range(14):
        wave = []
        with z.open(f'xl/worksheets/sheet{18 + 2*f}.xml') as stream:
            for _, row in ET.iterparse(stream, events=['end']):
                if row.tag != ns + 'row':
                    continue
                cells = row.findall(ns + 'c')
                if row.attrib['r'] == '1':
                    labels = [strings[int(c.find(ns+'v').text)] for c in cells]
                    indices = []
                    for label in labels[2:]:
                        match = re.fullmatch(r'phi(\d+)_H(\d+)_r([\d.]+)', label)
                        assert match, label
                        p, h, r = map(float, match.groups())
                        indices.append((round(p/5), round(h/50), round(r*5)))
                    assert len(set(indices)) == 19*16*6
                else:
                    vals = [float(c.find(ns+'v').text) for c in cells]
                    assert len(vals) == len(labels)
                    k = len(wave)
                    wave.append(vals[0])
                    grid[f, :, 0, :, k] = vals[1]
                    for (p, h, r), value in zip(indices, vals[2:]):
                        grid[f, p, h, r, k] = value
                row.clear()
        assert wave == list(range(1432, 4001, 8))
        print(f'Converted fs={(f+1)*0.05:.2f}', flush=True)
assert np.isfinite(grid).all()
payload = grid.tobytes()
(out/'orientation.f32.gz').write_bytes(gzip.compress(payload, compresslevel=9, mtime=0))
metadata = dict(source=source.name, source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
                sheets='Corr_fs0.05 through Corr_fs0.70', shape=list(grid.shape),
                axes=['solid fraction', 'orientation (degrees)', 'height (nm)', 'air ratio', 'wavenumber (cm-1)'],
                fsValues=[round((i+1)*.05,2) for i in range(14)], orientations=list(range(0,91,5)),
                hValues=list(range(0,801,50)), airRatios=[0,.2,.4,.6,.8,1], wavenumbers=wave,
                format='gzip-compressed little-endian float32', bytes=len(payload))
(out/'orientation-metadata.json').write_text(json.dumps(metadata, indent=2)+'\n')
print('Exported', len(payload), 'bytes; compressed', (out/'orientation.f32.gz').stat().st_size)
