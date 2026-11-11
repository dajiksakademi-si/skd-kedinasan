// node cek.js <soal.js> <patch.json>: opsi baru wajib sama jumlah kata dengan opsi lama (blueprint), cerita ≤ ~40 kata.
const path = require('path'), fs = require('fs');
const [file, pf] = process.argv.slice(2);
const items = require(path.resolve(file)), patch = JSON.parse(fs.readFileSync(pf, 'utf8'));
const w = (t) => t.replace(/&hellip;/g, '').split(/\s+/).filter(Boolean).length;
let bad = 0;
for (const [n, p] of Object.entries(patch)) {
  const s = items.find((x) => x.n === +n), e = [];
  for (const l in p.opts || {}) if (w(p.opts[l]) !== w(s.opts[l])) e.push(`${l} ${w(p.opts[l])}≠${w(s.opts[l])}`);
  if (p.stem && w(p.stem) > 45) e.push(`soal ${w(p.stem)} kata`);
  if (e.length) { bad++; console.log(`#${n}: ${e.join(', ')}`); }
}
console.log(bad ? `${bad} soal perlu dibetulkan` : 'jumlah kata opsi sama semua');
process.exit(bad ? 1 : 0);
