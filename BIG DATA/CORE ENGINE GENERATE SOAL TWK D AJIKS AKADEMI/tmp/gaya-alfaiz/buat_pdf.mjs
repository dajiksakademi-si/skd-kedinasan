// PDF bahan ajar TWK per paket dari satu sumber: paket_twk_N.json → pdf/Paket_N_TWK_Soal.pdf + _Pembahasan.pdf.
// Tampilan meminjam CSS PDF paket TKP supaya seragam. Puppeteer dari package.json akar repo (npm install sekali).
// Pakai: node tmp/gaya-alfaiz/buat_pdf.mjs 1
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const dir = path.dirname(fileURLToPath(import.meta.url));
const n = process.argv[2];
const soal = JSON.parse(fs.readFileSync(path.join(dir, `paket_twk_${n}.json`), 'utf8')).soal;
const tkp = path.join(dir, '..', '..', '..', 'CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI', 'tmp', 'pdfs', 'paket1', 'Paket_1_TKP_Soal.html');
const css = fs.readFileSync(tkp, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1] + `
  .soal.bahas { page-break-inside: auto; break-inside: auto; }
  .soal.bahas .soal-head { break-after: avoid; page-break-after: avoid; }
  .soal.bahas .stem, .soal.bahas .options { break-inside: avoid; font-size: 10pt; }
  .pembahasan-siswa p { margin: 0 0 6px; }
  table.summary td, table.summary th { text-align: center; }
  .cover { padding-top: 70mm; }`;
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

if (soal.some((q) => /Analogi:|Jebakan:|\b(stem|distraktor|konstruk|kutub)\b|\bD[1-9]\b/i.test(q.pembahasan))) throw new Error('istilah dapur / Analogi / Jebakan di pembahasan');

const blok = (q, i) => `<div class="soal-head"><span class="soal-num">Soal No ${i + 1}</span><span class="badge">${esc(q.tema)}</span></div>
<div class="stem">${esc(q.soal).replace(/\n/g, '<br>')}</div>
<ul class="options">${Object.entries(q.opsi).map(([h, t]) => `<li><span class="opt-letter">${h}.</span><span class="opt-text">${esc(t)}</span></li>`).join('')}</ul>`;
const bahas = (q) => {
  const [kunci, ...isi] = q.pembahasan.split('\n');
  return `<div class="pembahasan-siswa"><div class="ph-title">Pembahasan</div><p><b>${esc(kunci)}</b></p>${isi.map((p) => `<p>${esc(p)}</p>`).join('')}</div>`;
};
const halaman = (sub, isi, catatan) => `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Paket ${n} TWK — ${sub}</title><style>${css}</style></head><body>
<div class="cover"><div class="kicker">D'Ajiks Akademi · SKD Kedinasan</div><h1>Paket ${n} TWK</h1><div class="sub">${sub}</div>
<div class="meta-box"><div><b>Subtes</b> Tes Wawasan Kebangsaan</div><div><b>Jumlah</b> ${soal.length} soal</div></div>
<div class="note">${catatan}</div></div>${isi}</body></html>`;

const lembar = soal.map((q, i) => `<div class="soal">${blok(q, i)}</div>`).join('\n');
const tabel = `<h2 class="section-title">Tabel Kunci</h2><table class="summary"><tr><th>No</th><th>Kunci</th><th>No</th><th>Kunci</th><th>No</th><th>Kunci</th></tr>${
  Array.from({ length: Math.ceil(soal.length / 3) }, (_, r) => `<tr>${[0, 1, 2].map((c) => { const i = r + c * Math.ceil(soal.length / 3); return soal[i] ? `<td>${i + 1}</td><td>${soal[i].kunci}</td>` : '<td></td><td></td>'; }).join('')}</tr>`).join('')
}</table><div style="page-break-after: always"></div>`;
const semua = tabel + '<h2 class="section-title">Pembahasan per Soal</h2>' + soal.map((q, i) => `<div class="soal bahas">${blok(q, i)}${bahas(q)}</div>`).join('\n');

const out = path.join(dir, 'pdf');
fs.mkdirSync(out, { recursive: true });
const berkas = [
  [`Paket_${n}_TWK_Soal`, halaman('Lembar Soal', lembar, 'Pilih satu jawaban yang paling tepat. Jawaban benar bernilai 5, jawaban salah atau kosong bernilai 0.')],
  [`Paket_${n}_TWK_Pembahasan`, halaman('Pembahasan', semua, 'Kerjakan lembar soal dulu, baru buka pembahasan ini.')],
];
const browser = await puppeteer.launch({ headless: true });
for (const [nama, html] of berkas) {
  fs.writeFileSync(path.join(out, `${nama}.html`), html);
  const page = await browser.newPage();
  await page.goto('file://' + path.join(out, `${nama}.html`), { waitUntil: 'networkidle0' });
  await page.pdf({ path: path.join(out, `${nama}.pdf`), format: 'A4', printBackground: true, margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' } });
  console.log('ok', path.join('pdf', `${nama}.pdf`));
}
await browser.close();
