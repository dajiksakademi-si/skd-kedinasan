// node cek_kutipan.js <soal.js> <bahas.js>: kutipan "..." di pembahasan harus ada di cerita/opsi soal itu.
const path = require('path');
const [sf, bf] = process.argv.slice(2);
const soal = require(path.resolve(sf)), bahas = require(path.resolve(bf));
const norm = (t) => t.replace(/&hellip;/g, '…').replace(/<[^>]+>/g, '').toLowerCase().replace(/[.,;:]+$/, '');
let bad = 0;
for (const s of soal) {
  const b = bahas[s.n]; if (!b) continue;
  const src = norm([s.stem, ...Object.values(s.opts)].join(' '));
  const strs = []; const walk = (o) => { for (const k in o) typeof o[k] === 'string' ? strs.push(o[k]) : walk(o[k]); }; walk(b);
  for (const t of strs) for (const m of t.matchAll(/["“]([^"”]{4,}?)["”]/g)) {
    if (!src.includes(norm(m[1]))) { bad++; console.log(`#${s.n} "${m[1]}"`); }
  }
}
console.log(bad ? `${bad} kutipan bermasalah` : 'kutipan OK');
