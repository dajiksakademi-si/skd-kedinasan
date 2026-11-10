// Terapkan tulisan ulang gaya Al Faiz (soal pendek 3 kalimat, bahasa wajar) ke paket TWK TO.
// Pakai: node tmp/gaya-alfaiz/terapkan.mjs 1   → baca tmp/v16/paket_twk_1.json + ubah_p1.json, tulis paket_twk_1.json di folder ini
// Cek: jumlah kata soal, penentu ada di soal, kata soal lama yang hilang tapi masih disebut pembahasan (tanda pembahasan perlu disesuaikan).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const n = process.argv[2];
const paket = JSON.parse(fs.readFileSync(path.join(dir, '..', 'v16', `paket_twk_${n}.json`), 'utf8'));
const ubah = JSON.parse(fs.readFileSync(path.join(dir, `ubah_p${n}.json`), 'utf8'));
const fBahas = path.join(dir, `pembahasan_p${n}.json`); // opsional: pembahasan yang ditulis ulang mengikuti soal baru
const bahas = fs.existsSync(fBahas) ? JSON.parse(fs.readFileSync(fBahas, 'utf8')) : {};
const kata = (t) => t.split(/\s+/).filter(Boolean).length;
const isi = (t) => new Set(t.toLowerCase().match(/[a-z]{6,}/g) || []);
let galat = 0;

for (const q of paket.soal) {
  const u = ubah[q.id];
  if (!u) continue;
  const lama = q.soal;
  q.soal = u.soal;
  if (u.penentu) q.penentu = u.penentu;
  Object.assign(q.opsi, u.opsi || {});
  if (bahas[q.id]) q.pembahasan = bahas[q.id];
  const w = kata(q.soal);
  const hilang = [...isi(lama)].filter((k) => !isi(q.soal).has(k) && q.pembahasan.toLowerCase().includes(k));
  const tanda = [];
  if (w > 50) { tanda.push(`soal ${w} kata > 50`); galat++; }
  if (q.penentu && !q.soal.includes(q.penentu)) { tanda.push('penentu tidak ada di soal'); galat++; }
  if (u.opsi) tanda.push(`opsi diubah: ${Object.keys(u.opsi).join(',')}`);
  if (hilang.length) tanda.push(`pembahasan masih menyebut: ${hilang.join(', ')}`);
  console.log(`${q.id} ${kata(lama)}→${w} kata${tanda.length ? ' | ' + tanda.join(' | ') : ''}`);
}
const tak = Object.keys(ubah).filter((id) => !paket.soal.some((q) => q.id === id));
if (tak.length) { console.log('ID tidak ada di paket:', tak.join(', ')); galat++; }
paket.meta = { ...paket.meta, gaya: `Soal ditulis ulang gaya Al Faiz (pendek, wajar) ${new Date().toISOString().slice(0, 10)}; Bahasa tidak diubah` };
fs.writeFileSync(path.join(dir, `paket_twk_${n}.json`), JSON.stringify(paket, null, 2) + '\n');
console.log(galat ? `GALAT ${galat}` : 'OK');
process.exit(galat ? 1 : 0);
