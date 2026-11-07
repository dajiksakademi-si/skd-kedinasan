// node cek_pindai.js <pindai.json> <soal.js ...>: penentu = kutipan cerita, coret 3 huruf bukan kunci, sisa = poin 4 + kunci (kunci terakhir), bebas istilah dapur.
const fs = require('fs'), path = require('path');
const [pf, ...sf] = process.argv.slice(2);
const p = JSON.parse(fs.readFileSync(pf, 'utf8')), soal = sf.flatMap((f) => require(path.resolve(f)));
const dapur = /\bstem\b|\bkutub\b|konstruk|pengecoh|distraktor|\bJ[1-6]\b|\bS[1-5]\b|poin \d|mari kita|dengan demikian|akan tetapi|satu-satunya|sekaligus/i;
let err = 0; const e = (m) => { err++; console.log(m); };
for (const [n, d] of Object.entries(p.soal)) {
  const s = soal.find((x) => x.n === +n); if (!s) { e(`#${n} soal tidak ada`); continue; }
  const p4 = Object.keys(s.poin).find((l) => /^4/.test(s.poin[l]));
  if (!s.stem.includes(d.penentu)) e(`#${n} penentu bukan kutipan cerita`);
  const c = Object.keys(d.coret), sisa = Object.keys(d.sisa);
  if (c.length !== 3 || c.includes(s.kunci) || c.includes(p4)) e(`#${n} coret salah: ${c}`);
  if (sisa.length !== 2 || sisa[0] !== p4 || sisa[1] !== s.kunci) e(`#${n} sisa harus [${p4}, ${s.kunci}], tertulis [${sisa}]`);
  if (!d.aspek.startsWith(s.dim)) e(`#${n} aspek bukan ${s.dim}`);
  const m = JSON.stringify(d).match(dapur); if (m) e(`#${n} kata terlarang: ${m[0]}`);
}
console.log(err ? `${err} masalah` : `pindai OK (${Object.keys(p.soal).length} soal)`);
