// Bahan ajar dari satu sumber: paket/paket-1/paket_tiu_1.json → pdf/Paket_1_TIU_Soal.html + _Pembahasan.html.
// Gaya mengikuti PDF paket TKP (buat_pdf_paket.py). Bagian reviu (kode, bukti) tidak ikut.
// PDF: NODE_PATH=<puppeteer-core>/.. node "<TKP>/tmp/gen_pdf.js" <html> <pdf>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ENGINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PAKET = path.join(ENGINE, "paket/paket-1");
const KELUAR = path.join(PAKET, "pdf");
const { butir } = JSON.parse(fs.readFileSync(path.join(PAKET, "paket_tiu_1.json")));
const HURUF = ["A", "B", "C", "D", "E"];
const LABEL = {
  ARG: "Verbal · Argumen", SIL: "Verbal · Silogisme", ANL: "Verbal · Analogi", HIT: "Numerik · Berhitung",
  SUK: "Numerik · Deret", KOTAK: "Numerik · Pola Tabel", PAS: "Numerik · Pasangan Bilangan", CRT: "Numerik · Soal Cerita",
  KCK: "Kecukupan Data", ANA: "Penalaran Analitis", OPT: "Numerik · Biaya Termurah", FIG: "Figural",
};

// Teks aman untuk HTML; hanya tag <b>, <i>, <br> dari data yang dibiarkan.
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/&lt;(\/?)(b|i|br)&gt;/g, "<$1$2>");
const sel = (v) => esc(String(v).replace(/^-(?=\d)/, "−"));
const img = (f, kelas) => `<img class="${kelas}" src="../${f}" alt="">`;
// Gambar pembahasan ditanam langsung: label merahnya kadang lebih lebar dari bidang gambar dan akan terpotong bila dipasang sebagai <img>.
const tanam = (f) => `<div class="fig-bahas">${fs.readFileSync(path.join(PAKET, f), "utf8")
  .replace(/<svg\b([^>]*?)\s(width|height)="[^"]*"/g, "<svg$1").replace(/<svg\b([^>]*?)\s(width|height)="[^"]*"/g, "<svg$1")
  .replace("<svg", '<svg style="overflow: visible"')}</div>`;

function tabel(t) {
  // Tabel dua kolom yang panjang (suku ke-n) dibalik mendatar supaya hemat tempat.
  if (t[0].length === 2 && t.length > 3) t = [t.map((r) => r[0]), t.map((r) => r[1])];
  const kepala = typeof t[0][1] === "string" && !/^[XY]$/.test(t[0][1]);
  const baris = t.map((r, i) => `<tr>${r.map((c, j) => {
    const th = (kepala && i === 0) || (kepala && t.length === 2 && j === 0);
    return th ? `<th>${sel(c)}</th>` : `<td>${sel(c)}</td>`;
  }).join("")}</tr>`).join("");
  return `<table class="data${kepala ? "" : " kotak"}">${baris}</table>`;
}

function soalHtml(b) {
  const isi = [`<div class="soal-head"><span class="soal-num">Soal No ${b.no}</span><span class="badge">${LABEL[b.keluarga]}</span></div>`,
    `<div class="stem"><p>${esc(b.soal)}</p>`];
  if (b.gambar) isi.push(img(b.gambar, "fig-soal"));
  if (b.tabel) isi.push(tabel(b.tabel));
  if (b.pernyataan) isi.push(`<ol class="pernyataan">${b.pernyataan.map((p, i) => `<li><span>(${i + 1})</span>${esc(p)}</li>`).join("")}</ol>`);
  if (b.syarat) isi.push(`<ol class="syarat">${b.syarat.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>`);
  if (b.perintah) isi.push(`<p>${esc(b.perintah)}</p>`);
  isi.push("</div>");
  const opsi = b.jenis_opsi === "gambar"
    ? `<div class="opsi-gambar">${HURUF.map((h) => `<figure><figcaption>${h}</figcaption>${img(b.opsi[h], "fig-opsi")}</figure>`).join("")}</div>`
    : `<ul class="options">${HURUF.map((h) => `<li><span class="opt-letter">${h}.</span><span class="opt-text">${esc(b.opsi[h])}</span></li>`).join("")}</ul>`;
  // Soal dan opsinya tidak boleh terpisah halaman.
  return `<div class="isi-soal">${isi.join("\n")}\n${opsi}</div>`;
}

function bahasHtml(b) {
  const p = b.pembahasan;
  const bagian = (judul, teks) => (teks ? `<p><b>${judul}</b> ${esc(teks)}</p>` : "");
  return `<div class="pembahasan-siswa"><div class="ph-title">Pembahasan</div>
${bagian("Yang sebenarnya ditanya:", p.ditanya)}${bagian("Kalimat kunci:", p.kalimat_kunci)}${bagian("Cara cepat:", p.cara_kilat)}${bagian("Langkah lengkap:", p.langkah)}
${p.gambar ? tanam(p.gambar) : ""}
<p><b>Kenapa opsi lain gugur:</b></p><ul>${Object.entries(p.opsi_gugur).map(([h, t]) => `<li><b>${h}.</b> ${esc(t)}</li>`).join("")}</ul>
<p class="jawaban"><b>Jawaban: ${b.kunci}.</b> ${esc(p.alasan_kunci.replace(/^[A-E],\s*/, "").replace(/^./, (c) => c.toUpperCase()))}</p>
${bagian("Analogi:", p.analogi)}${bagian("Yang sering membuat keliru:", p.waspada)}</div>`;
}

const CSS = `
@page { size: A4; margin: 18mm 16mm 20mm 16mm; }
* { box-sizing: border-box; }
body { font-family: Charter, "Bitstream Charter", Georgia, serif; font-variant-numeric: lining-nums; font-size: 11pt; line-height: 1.5; color: #1a1a1a; margin: 0; background: #fff; }
.sans, .cover .kicker, .cover .meta-box, .cover .note, h2.section-title, .soal-num, .badge, table, .pembahasan-siswa, figcaption { font-family: "Helvetica Neue", Arial, sans-serif; }
.cover { page-break-after: always; padding-top: 70mm; text-align: center; }
.cover .kicker { font-size: 10pt; letter-spacing: 3px; text-transform: uppercase; color: #6b6b6b; margin-bottom: 10mm; }
.cover h1 { font-size: 26pt; margin: 0 0 6mm; color: #111; }
.cover .sub { font-size: 12pt; color: #444; margin-bottom: 14mm; }
.cover .meta-box { display: inline-block; text-align: left; border: 1px solid #ccc; border-radius: 4px; padding: 6mm 10mm; font-size: 9.5pt; color: #333; }
.cover .meta-box div { margin: 1.5mm 0; }
.cover .note { margin: 16mm auto 0; font-size: 9pt; color: #888; max-width: 120mm; }
h2.section-title { font-size: 13pt; text-transform: uppercase; letter-spacing: 1px; color: #111; border-bottom: 2px solid #111; padding-bottom: 2mm; margin: 0 0 6mm; }
.soal { break-inside: avoid; margin-bottom: 9mm; padding-bottom: 7mm; border-bottom: 1px solid #ddd; }
.soal.bahas { break-inside: auto; }
.isi-soal { break-inside: avoid; }
.pembahasan-siswa .ph-title, .pembahasan-siswa p:has(+ ul) { break-after: avoid; }
.pembahasan-siswa p, .pembahasan-siswa li { orphans: 3; widows: 3; }
.soal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3mm; break-after: avoid; }
.soal-num { font-weight: 700; font-size: 11.5pt; }
.badge { font-size: 8pt; font-weight: 700; padding: 1mm 3mm; border-radius: 10px; color: #fff; background: #3d4f6b; white-space: nowrap; }
.stem { margin-bottom: 3mm; text-align: justify; break-inside: avoid; }
.stem p { margin: 0 0 2.5mm; }
table.data { border-collapse: collapse; margin: 1mm 0 3mm; font-size: 10pt; }
table.data th, table.data td { border: 1px solid #999; padding: 1.6mm 4mm; text-align: center; min-width: 13mm; }
table.data th { background: #f2f2f2; }
table.kotak td { min-width: 14mm; padding: 2.4mm 4mm; font-size: 11pt; }
ol.pernyataan { list-style: none; padding: 0; margin: 0 0 2.5mm; }
ol.pernyataan li { display: flex; gap: 2.5mm; margin-bottom: 1mm; }
ol.syarat { margin: 0 0 2.5mm; padding-left: 6mm; }
.options { margin: 0 0 4mm; padding: 0; list-style: none; break-inside: avoid; }
.options li { display: flex; gap: 2.5mm; margin-bottom: 1.6mm; }
.opt-letter { flex: 0 0 5mm; font-weight: 700; }
.fig-soal { display: block; max-width: 150mm; max-height: 95mm; margin: 1mm 0 3mm; }
.opsi-gambar { display: flex; gap: 3mm; margin-bottom: 4mm; break-inside: avoid; }
.opsi-gambar figure { margin: 0; text-align: center; }
.opsi-gambar figcaption { font-weight: 700; font-size: 10pt; margin-bottom: 1mm; }
.fig-opsi { width: 30mm; height: 30mm; }
.fig-bahas { width: 120mm; margin: 3mm auto; break-inside: avoid; }
.fig-bahas svg { display: block; width: 100%; height: auto; }
.pembahasan-siswa { font-size: 9.4pt; background: #f3f8fb; border: 1px solid #c9dde8; padding: 3mm 4mm; margin-top: 2mm; }
.pembahasan-siswa .ph-title { font-weight: 700; font-size: 8.6pt; text-transform: uppercase; color: #2d5a73; margin-bottom: 1.5mm; }
.pembahasan-siswa p, .pembahasan-siswa li { margin: 0.9mm 0; text-align: justify; }
.pembahasan-siswa ul { margin: 0.5mm 0 1mm; padding-left: 5mm; }
.pembahasan-siswa .jawaban { background: #fff; border-left: 3px solid #2d5a73; padding: 1.5mm 3mm; }
table.kunci { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin-bottom: 4mm; }
table.kunci th, table.kunci td { border: 1px solid #ccc; padding: 1.6mm; text-align: center; }
table.kunci th { background: #f2f2f2; }
`;

const halaman = (sub, isi, catatan) => `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><title>Paket 1 TIU — ${sub}</title><style>${CSS}</style></head><body>
<div class="cover"><div class="kicker">D'Ajiks Akademi · SKD Kedinasan</div><h1>Paket 1 TIU</h1><div class="sub">${sub}</div>
<div class="meta-box"><div><b>Subtes</b> Tes Intelegensia Umum</div><div><b>Jumlah</b> ${butir.length} soal (no. ${butir[0].no}–${butir.at(-1).no})</div></div>
<div class="note">${catatan}</div></div>
${isi}
</body></html>`;

fs.mkdirSync(KELUAR, { recursive: true });
fs.writeFileSync(path.join(KELUAR, "Paket_1_TIU_Soal.html"), halaman("Lembar Soal",
  butir.map((b) => `<div class="soal">${soalHtml(b)}</div>`).join("\n"),
  "Pilih satu jawaban yang paling tepat. Setiap soal hanya memiliki satu jawaban benar."));

const potong = (a) => [a.slice(0, 18), a.slice(18)];
const kunci = potong(butir).map((bag) => `<table class="kunci"><tr><th>No</th>${bag.map((b) => `<th>${b.no}</th>`).join("")}</tr>`
  + `<tr><th>Kunci</th>${bag.map((b) => `<td>${b.kunci}</td>`).join("")}</tr></table>`).join("");
fs.writeFileSync(path.join(KELUAR, "Paket_1_TIU_Pembahasan.html"), halaman("Pembahasan",
  `<h2 class="section-title">Kunci Jawaban</h2>${kunci}<div style="page-break-after: always"></div>`
  + `<h2 class="section-title">Pembahasan per Soal</h2>`
  + butir.map((b) => `<div class="soal bahas">${soalHtml(b)}${bahasHtml(b)}</div>`).join("\n"),
  "Kerjakan lembar soal dulu, baru buka pembahasan ini."));
console.log(`ok ${butir.length} soal → ${KELUAR}`);
