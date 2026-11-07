// node patch_bahas.js <bahas.js> <ganti.json>: ganti.json = [[n, lama, baru], ...]; tiap 'lama' wajib muncul tepat 1x di string soal n.
const fs = require('fs'), path = require('path');
const [file, gFile] = process.argv.slice(2);
const obj = require(path.resolve(file)), ganti = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const header = fs.readFileSync(file, 'utf8').split('\n')[0];
for (const [n, lama, baru, mau = 1] of ganti) {
  let hit = 0;
  const walk = (o) => { for (const k in o) { if (typeof o[k] === 'string') { const c = o[k].split(lama).length - 1; if (c) { hit += c; o[k] = o[k].split(lama).join(baru); } } else walk(o[k]); } };
  walk(obj[n]);
  if (hit !== mau) throw new Error(`soal ${n}: "${lama.slice(0, 40)}" muncul ${hit}x`);
}
fs.writeFileSync(file, header + '\nmodule.exports = ' + JSON.stringify(obj, null, 2) + ';\n');
console.log('ok', ganti.length, 'penggantian');
