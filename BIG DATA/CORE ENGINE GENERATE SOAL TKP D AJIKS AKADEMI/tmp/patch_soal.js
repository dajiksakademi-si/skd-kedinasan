// node patch_soal.js <soal.js> <patch.json> [--dry]: ganti stem/opts/fakta/konstruk/latar/poin per soal, cek tiap literal ganti tepat 1x.
const fs = require('fs'), path = require('path');
const [file, patchFile, dry] = process.argv.slice(2);
const items = require(path.resolve(file)), patch = JSON.parse(fs.readFileSync(patchFile, 'utf8'));
let txt = fs.readFileSync(file, 'utf8');
const lit = (s) => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const w = (t) => t.replace(/&hellip;/g, '').split(/\s+/).filter(Boolean).length;
for (const [n, p] of Object.entries(patch)) {
  const s = items.find((x) => x.n === +n);
  const pairs = [];
  if (p.stem) pairs.push([s.stem, p.stem]);
  if (p.fakta) pairs.push([s.fakta, p.fakta]);
  if (p.konstruk) pairs.push([s.konstruk, p.konstruk]);
  if (p.latar) pairs.push([s.latar, p.latar]);
  for (const l in p.opts || {}) pairs.push([s.opts[l], p.opts[l]]);
  for (const l in p.poin || {}) pairs.push([s.poin[l], p.poin[l]]);
  // ganti hanya di blok soal n (skor pendek seperti '4 S4' muncul di banyak soal)
  const i0 = txt.indexOf(`{ n: ${n},`), i1 = txt.indexOf('{ n: ', i0 + 1) < 0 ? txt.length : txt.indexOf('{ n: ', i0 + 1);
  if (i0 < 0) throw new Error(`soal ${n}: blok tidak ketemu`);
  let seg = txt.slice(i0, i1);
  for (const [a, b] of pairs) {
    const k = seg.split(lit(a)).length - 1;
    if (k !== 1) throw new Error(`soal ${n}: literal muncul ${k}x: ${a.slice(0, 50)}`);
    seg = seg.replace(lit(a), () => lit(b));
  }
  txt = txt.slice(0, i0) + seg + txt.slice(i1);
  const stem = p.stem || s.stem, opts = { ...s.opts, ...(p.opts || {}) }, fakta = p.fakta || s.fakta;
  if (!stem.includes(fakta)) throw new Error(`soal ${n}: fakta bukan kutipan stem`);
  const cerita = stem.replace(/[^.?!]*(\?|&hellip;|\.\.\.\.?)\s*$/, '');
  const ow = Object.values(opts).map(w), kl = w(opts[s.kunci]);
  const uniqMax = kl === Math.max(...ow) && ow.filter((x) => x === kl).length === 1;
  console.log(`#${n} cerita ${w(cerita)} kata/${cerita.split(/[.!?]\s/).length} kal · opsi ${ow.join('/')} · kunci ${kl}${uniqMax ? ' TERPANJANG' : ''}${Math.max(...ow) - Math.min(...ow) > 3 ? ' SELISIH>3' : ''}`);
}
if (!dry) fs.writeFileSync(file, txt);
