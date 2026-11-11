// PDF draf reviu figural bertema per paket: .test-out-tema/paket-N/items.json → pdf/Paket_N_TIU_Figural_Soal.pdf + _Pembahasan.pdf.
// Jalankan sesudah `npx tsx src/tiu-generate.ts .test-out-tema tema`. CSS dipinjam dari PDF TKP supaya seragam dengan TWK/TKP.
// Pakai (dari folder k12-spatial-engine): node src/tiu-tema-pdf.mjs 1
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const akar = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const n = process.argv[2];
const sumber = path.join(akar, '.test-out-tema', `paket-${n}`);
const items = JSON.parse(fs.readFileSync(path.join(sumber, 'items.json'), 'utf8'));
const tkp = path.join(akar, '..', '..', 'CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI', 'tmp', 'pdfs', 'paket1', 'Paket_1_TKP_Soal.html');
const css = fs.readFileSync(tkp, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1] + `
  .gbr { text-align: center; margin: 6px 0 10px; } .gbr img { max-width: 100%; max-height: 95mm; }
  .opsi-gbr { display: flex; justify-content: space-between; gap: 6px; margin: 8px 0; }
  .opsi-gbr div { text-align: center; font-weight: 700; font-size: 10pt; } .opsi-gbr img { width: 30mm; display: block; margin-bottom: 3px; }
  .soal { break-inside: avoid; page-break-inside: avoid; }
  .soal.bahas { page-break-inside: auto; break-inside: auto; }
  .pembahasan-siswa p { margin: 0 0 6px; } .pembahasan-siswa img { max-width: 100%; max-height: 90mm; display: block; margin: 6px auto; }
  table.summary td, table.summary th { text-align: center; }
  .cover { padding-top: 70mm; }`;
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const JENIS = { SERI: 'Deret gambar', ANA: 'Analogi gambar', BEDA: 'Gambar berbeda', MTX: 'Matriks gambar' };

if (items.some((q) => /\b(stem|distraktor|konstruk|kutub)\b|\b[DTCLJ][1-9]\b/i.test(q.pembahasan))) throw new Error('istilah dapur di pembahasan');

const blok = (q, i) => `<div class="soal-head"><span class="soal-num">Soal No ${i + 1}</span><span class="badge">${JENIS[q.sub_type.split('-')[1]]}</span></div>
<div class="stem">${esc(q.instruksi)} <b>${esc(q.stem)}</b></div>
${q.gambar ? `<div class="gbr"><img src="${q.gambar}"></div>` : ''}
<div class="opsi-gbr">${Object.entries(q.opsi_gambar).map(([h, f]) => `<div><img src="${f}">${h}</div>`).join('')}</div>`;
const bahas = (q) => {
  const [kunci, ...isi] = q.pembahasan.split('\n');
  return `<div class="pembahasan-siswa"><div class="ph-title">Pembahasan</div><p><b>${esc(kunci)}</b></p>${isi.map((p) => `<p>${esc(p)}</p>`).join('')}${q.gambar_pembahasan ? `<img src="${q.gambar_pembahasan}">` : ''}</div>`;
};
const halaman = (sub, isi, catatan) => `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Paket ${n} TIU Figural — ${sub}</title><style>${css}</style></head><body>
<div class="cover"><div class="kicker">D'Ajiks Akademi · SKD Kedinasan · DRAF REVIU</div><h1>Paket ${n} TIU Figural</h1><div class="sub">${sub}</div>
<div class="meta-box"><div><b>Subtes</b> Tes Intelegensia Umum — figural</div><div><b>Jumlah</b> ${items.length} soal</div></div>
<div class="note">${catatan}</div></div>${isi}</body></html>`;

const lembar = items.map((q, i) => `<div class="soal">${blok(q, i)}</div>`).join('\n');
const tabel = `<h2 class="section-title">Tabel Kunci</h2><table class="summary"><tr><th>No</th><th>Kunci</th><th>Jenis</th></tr>${
  items.map((q, i) => `<tr><td>${i + 1}</td><td>${q.kunci}</td><td>${JENIS[q.sub_type.split('-')[1]]}</td></tr>`).join('')}</table><div style="page-break-after: always"></div>`;
const semua = tabel + '<h2 class="section-title">Pembahasan per Soal</h2>' + items.map((q, i) => `<div class="soal bahas">${blok(q, i)}${bahas(q)}</div>`).join('\n');

const out = path.join(akar, 'pdf');
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
for (const [nama, html] of [
  [`Paket_${n}_TIU_Figural_Soal`, halaman('Lembar Soal', lembar, 'Pilih satu jawaban yang paling tepat. Jawaban benar bernilai 5, jawaban salah atau kosong bernilai 0.')],
  [`Paket_${n}_TIU_Figural_Pembahasan`, halaman('Pembahasan', semua, 'Kerjakan lembar soal dulu, baru buka pembahasan ini.')],
]) {
  const fHtml = path.join(sumber, `${nama}.html`); // di folder paket supaya alamat img/ terbaca
  fs.writeFileSync(fHtml, html);
  const page = await browser.newPage();
  await page.goto('file://' + fHtml, { waitUntil: 'networkidle0' });
  await page.pdf({ path: path.join(out, `${nama}.pdf`), format: 'A4', printBackground: true, margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' } });
  console.log('ok', path.join('pdf', `${nama}.pdf`));
}
await browser.close();
