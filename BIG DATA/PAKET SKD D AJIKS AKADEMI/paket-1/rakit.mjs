// Rakit Paket 1 SKD utuh (TWK 30 + TIU 35 + TKP 45) untuk developer CAT:
// hasil/Paket_1_SKD_DAjiks/{paket_1_skd.json, svg/, pdf/, README.md} + hasil/Paket_1_SKD_DAjiks.zip.
// Pakai (dari folder ini): node rakit.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer";

const SINI = path.dirname(fileURLToPath(import.meta.url));
const BD = path.join(SINI, "../..");
const TWK = path.join(BD, "CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/tmp/gaya-alfaiz/paket_twk_1.json");
const TIU = path.join(BD, "CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/paket/paket-1/paket_tiu_1.json");
const FIG = path.join(BD, "CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/k12-spatial-engine/.test-out-tema/paket-1");
const TKP = path.join(BD, "CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/tmp");
const NAMA = "Paket_1_SKD_DAjiks";
const OUT = path.join(SINI, "hasil", NAMA);
const H = ["A", "B", "C", "D", "E"];
const req = createRequire(import.meta.url);

fs.rmSync(path.join(SINI, "hasil"), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "svg"), { recursive: true });
fs.mkdirSync(path.join(OUT, "pdf"), { recursive: true });

const skorBenar = (k) => Object.fromEntries(H.map((h) => [h, h === k ? 5 : 0]));
const svg = (rel) => { // salin SVG figural, kembalikan alamat di dalam paket
  const nama = path.basename(rel);
  fs.copyFileSync(path.join(FIG, rel), path.join(OUT, "svg", nama));
  return `svg/${nama}`;
};
const soal = [];

// TWK 1–30
for (const [i, q] of JSON.parse(fs.readFileSync(TWK)).soal.entries())
  soal.push({ no: i + 1, subtes: "TWK", id: q.id, kategori: q.tema, soal: q.soal, gambar: null, jenis_opsi: "teks",
    opsi: q.opsi, kunci: q.kunci, skor: skorBenar(q.kunci), pembahasan: q.pembahasan, gambar_pembahasan: null });

// TIU nonfigural 31–56; pembahasan tanpa analogi dan waspada (putusan Gusti 2026-11-08)
const LABEL = { ARG: "Verbal · Argumen", SIL: "Verbal · Silogisme", ANL: "Verbal · Analogi", HIT: "Numerik · Berhitung",
  SUK: "Numerik · Deret", KOTAK: "Numerik · Pola Tabel", PAS: "Numerik · Pasangan Bilangan", CRT: "Numerik · Soal Cerita",
  KCK: "Kecukupan Data", ANA: "Penalaran Analitis", OPT: "Numerik · Biaya Termurah" };
for (const q of JSON.parse(fs.readFileSync(TIU)).butir.filter((b) => b.keluarga !== "FIG")) {
  const p = q.pembahasan;
  const baris = [`Kunci: ${q.kunci}.`, `Yang ditanya: ${p.ditanya}`, p.kalimat_kunci && `Kalimat kunci: ${p.kalimat_kunci}`,
    `Cara cepat: ${p.cara_kilat}`, p.langkah && `Langkah: ${p.langkah}`,
    ...Object.entries(p.opsi_gugur).map(([h, t]) => `Pilihan ${h} gugur: ${t}`),
    `Jawaban ${q.kunci}: ${p.alasan_kunci.replace(/^[A-E],\s*/, "")}`].filter(Boolean);
  soal.push({ no: q.no, subtes: "TIU", id: `TIU-P1-${q.no}`, kategori: LABEL[q.keluarga], soal: q.soal,
    ...(q.tabel && { tabel: q.tabel }), ...(q.pernyataan && { pernyataan: q.pernyataan }), ...(q.syarat && { syarat: q.syarat }),
    ...(q.perintah && { perintah: q.perintah }), gambar: null, jenis_opsi: "teks", opsi: q.opsi, kunci: q.kunci,
    skor: skorBenar(q.kunci), pembahasan: baris.join("\n"), gambar_pembahasan: null });
}

// TIU figural bertema 57–65
const JENIS = { SERI: "Figural · Deret Gambar", ANA: "Figural · Analogi Gambar", BEDA: "Figural · Gambar Berbeda", MTX: "Figural · Matriks Gambar" };
for (const [i, q] of JSON.parse(fs.readFileSync(path.join(FIG, "items.json"))).entries())
  soal.push({ no: 57 + i, subtes: "TIU", id: q.id, kategori: JENIS[q.sub_type.split("-")[1]], soal: q.instruksi,
    perintah: q.stem, gambar: q.gambar ? svg(q.gambar) : null, jenis_opsi: "gambar",
    opsi: Object.fromEntries(H.map((h) => [h, svg(q.opsi_gambar[h])])), kunci: q.kunci, skor: skorBenar(q.kunci),
    pembahasan: q.pembahasan.replace(/^Jawaban: Opsi ([A-E])\./, "Kunci: $1."),
    gambar_pembahasan: q.gambar_pembahasan ? svg(q.gambar_pembahasan) : null });

// TKP 66–110 (latar baru 2026-11-11, pembahasan baru tkp_pembahasan.json)
const bahas = JSON.parse(fs.readFileSync(path.join(SINI, "tkp_pembahasan.json")));
const tkp = ["01_15", "16_30", "31_45"].flatMap((b) => req(path.join(TKP, `paket1_soal_${b}.js`)));
for (const q of tkp) {
  const skor = Object.fromEntries(H.map((h) => [h, +q.poin[h].match(/^\d/)[0]]));
  const b = bahas[q.n];
  const urut = H.filter((h) => h !== q.kunci).sort((x, y) => skor[y] - skor[x]);
  if (urut.some((h) => !b.opsi[h])) throw new Error(`TKP ${q.n}: pembahasan opsi kurang`);
  if (!b.kunci.startsWith(`${q.kunci} tepat`)) throw new Error(`TKP ${q.n}: kalimat kunci tidak cocok`);
  soal.push({ no: 65 + q.n, subtes: "TKP", id: `TKP-P1-${q.n}`, kategori: q.dim, soal: q.stem.replace(/&hellip;/g, "…"),
    gambar: null, jenis_opsi: "teks", opsi: q.opts, kunci: q.kunci, skor,
    pembahasan: [`Kunci: ${q.kunci} (nilai 5).`, b.tanya, ...urut.map((h) => `Pilihan ${h} (nilai ${skor[h]}): ${b.opsi[h]}`), b.kunci].join("\n"),
    gambar_pembahasan: null });
}

// Pemeriksaan
soal.sort((a, b) => a.no - b.no);
const cek = (ok, pesan) => { if (!ok) throw new Error(pesan); };
cek(soal.length === 110 && soal.every((q, i) => q.no === i + 1), "nomor 1–110 tidak utuh");
for (const q of soal) {
  cek(H.every((h) => q.opsi[h]) && H.includes(q.kunci), `${q.no}: opsi/kunci`);
  const nilai = H.map((h) => q.skor[h]).sort().join("");
  cek(q.subtes === "TKP" ? nilai === "12345" && q.skor[q.kunci] === 5 : nilai === "00005", `${q.no}: skor`);
  cek(!/\b(stem|distraktor|konstruk|kutub)\b|\b[DTCLJS][1-9]\b/i.test(q.pembahasan), `${q.no}: istilah dapur di pembahasan`);
  cek(!/Analogi:|Yang sering membuat keliru/.test(q.pembahasan), `${q.no}: sisa analogi/waspada`);
  for (const f of [q.gambar, q.gambar_pembahasan, ...(q.jenis_opsi === "gambar" ? Object.values(q.opsi) : [])].filter(Boolean))
    cek(fs.existsSync(path.join(OUT, f)), `${q.no}: ${f} tidak ada`);
}
const kunciPer = (s) => soal.filter((q) => q.subtes === s).map((q) => q.kunci).join("");

const paket = {
  meta: {
    paket: "Paket 1 SKD D'Ajiks Akademi", tanggal: "2026-11-11", jumlah_soal: 110,
    subtes: [
      { kode: "TWK", nama: "Tes Wawasan Kebangsaan", nomor: "1-30", jumlah: 30 },
      { kode: "TIU", nama: "Tes Intelegensia Umum", nomor: "31-65", jumlah: 35, catatan: "no. 57-65 soal gambar (SVG)" },
      { kode: "TKP", nama: "Tes Karakteristik Pribadi", nomor: "66-110", jumlah: 45 },
    ],
    penilaian: "TWK dan TIU: jawaban benar 5, salah atau kosong 0. TKP: tiap pilihan bernilai 1-5 sesuai field skor, kosong 0.",
    kunci: { TWK: kunciPer("TWK"), TIU: kunciPer("TIU"), TKP: kunciPer("TKP") },
  },
  soal,
};
fs.writeFileSync(path.join(OUT, "paket_1_skd.json"), JSON.stringify(paket, null, 1));

// PDF soal + pembahasan dari JSON yang sama
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/&lt;(\/?)(b|i|br)&gt;/g, "<$1$2>");
const sel = (v) => esc(String(v).replace(/^-(?=\d)/, "−"));
function tabel(t) {
  if (t[0].length === 2 && t.length > 3) t = [t.map((r) => r[0]), t.map((r) => r[1])];
  const kepala = typeof t[0][1] === "string" && !/^[XY]$/.test(t[0][1]);
  return `<table class="data${kepala ? "" : " kotak"}">${t.map((r, i) => `<tr>${r.map((c, j) =>
    (kepala && i === 0) || (kepala && t.length === 2 && j === 0) ? `<th>${sel(c)}</th>` : `<td>${sel(c)}</td>`).join("")}</tr>`).join("")}</table>`;
}
const blok = (q) => `<div class="isi-soal"><div class="soal-head"><span class="soal-num">Soal No ${q.no}</span><span class="badge">${q.subtes} · ${esc(q.kategori)}</span></div>
<div class="stem"><p>${esc(q.soal)}</p>${q.gambar ? `<img class="fig-soal" src="${q.gambar}">` : ""}${q.tabel ? tabel(q.tabel) : ""}
${q.pernyataan ? `<ol class="pernyataan">${q.pernyataan.map((p, i) => `<li><span>(${i + 1})</span>${esc(p)}</li>`).join("")}</ol>` : ""}
${q.syarat ? `<ol class="syarat">${q.syarat.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>` : ""}${q.perintah ? `<p>${esc(q.perintah)}</p>` : ""}</div>
${q.jenis_opsi === "gambar"
    ? `<div class="opsi-gambar">${H.map((h) => `<figure><figcaption>${h}</figcaption><img class="fig-opsi" src="${q.opsi[h]}"></figure>`).join("")}</div>`
    : `<ul class="options">${H.map((h) => `<li><span class="opt-letter">${h}.</span><span>${esc(q.opsi[h])}</span></li>`).join("")}</ul>`}</div>`;
const bhs = (q) => { const [k, ...isi] = q.pembahasan.split("\n");
  return `<div class="pembahasan-siswa"><div class="ph-title">Pembahasan</div><p><b>${esc(k)}</b></p>${isi.map((p) => `<p>${esc(p)}</p>`).join("")}${
    q.gambar_pembahasan ? `<img class="fig-bahas" src="${q.gambar_pembahasan}">` : ""}</div>`; };
const bagian = (fn) => ["TWK", "TIU", "TKP"].map((s) => `<h2 class="section-title">${paket.meta.subtes.find((x) => x.kode === s).nama} (${s})</h2>`
  + soal.filter((q) => q.subtes === s).map(fn).join("\n") + `<div style="page-break-after: always"></div>`).join("");
const CSS = `@page { size: A4; margin: 18mm 16mm 20mm 16mm; } * { box-sizing: border-box; }
body { font-family: Charter, Georgia, serif; font-variant-numeric: lining-nums; font-size: 11pt; line-height: 1.5; color: #1a1a1a; margin: 0; background: #fff; }
.cover, h2, .soal-num, .badge, table, .pembahasan-siswa, figcaption { font-family: "Helvetica Neue", Arial, sans-serif; }
.cover { page-break-after: always; padding-top: 70mm; text-align: center; } .cover .kicker { font-size: 10pt; letter-spacing: 3px; text-transform: uppercase; color: #6b6b6b; margin-bottom: 10mm; }
.cover h1 { font-size: 26pt; margin: 0 0 6mm; } .cover .sub { font-size: 12pt; color: #444; margin-bottom: 14mm; }
.cover .meta { display: inline-block; text-align: left; border: 1px solid #ccc; border-radius: 4px; padding: 6mm 10mm; font-size: 9.5pt; } .cover .meta div { margin: 1.5mm 0; }
.cover .note { margin: 16mm auto 0; font-size: 9pt; color: #888; max-width: 120mm; }
h2.section-title { font-size: 13pt; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #111; padding-bottom: 2mm; margin: 0 0 6mm; }
.soal { margin-bottom: 9mm; padding-bottom: 7mm; border-bottom: 1px solid #ddd; } .isi-soal { break-inside: avoid; }
.soal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3mm; } .soal-num { font-weight: 700; }
.badge { font-size: 8pt; font-weight: 700; padding: 1mm 3mm; border-radius: 10px; color: #fff; background: #3d4f6b; white-space: nowrap; }
.stem { text-align: justify; } .stem p { margin: 0 0 2.5mm; }
table.data { border-collapse: collapse; margin: 1mm 0 3mm; font-size: 10pt; } table.data th, table.data td { border: 1px solid #999; padding: 1.6mm 4mm; text-align: center; min-width: 13mm; }
table.data th { background: #f2f2f2; } ol.pernyataan { list-style: none; padding: 0; margin: 0 0 2.5mm; } ol.pernyataan li { display: flex; gap: 2.5mm; } ol.syarat { margin: 0 0 2.5mm; padding-left: 6mm; }
.options { margin: 0 0 4mm; padding: 0; list-style: none; } .options li { display: flex; gap: 2.5mm; margin-bottom: 1.6mm; } .opt-letter { flex: 0 0 5mm; font-weight: 700; }
.fig-soal { display: block; max-width: 150mm; max-height: 95mm; margin: 1mm auto 3mm; } .opsi-gambar { display: flex; justify-content: space-between; gap: 3mm; margin-bottom: 4mm; }
.opsi-gambar figure { margin: 0; text-align: center; } figcaption { font-weight: 700; font-size: 10pt; } .fig-opsi { width: 30mm; height: 30mm; }
.fig-bahas { display: block; max-width: 100%; max-height: 60mm; margin: 3mm auto; }
.pembahasan-siswa { font-size: 9.4pt; background: #f3f8fb; border: 1px solid #c9dde8; padding: 3mm 4mm; margin-top: 2mm; }
.pembahasan-siswa .ph-title { font-weight: 700; font-size: 8.6pt; text-transform: uppercase; color: #2d5a73; margin-bottom: 1.5mm; } .pembahasan-siswa p { margin: 0.9mm 0; text-align: justify; orphans: 3; widows: 3; }
table.kunci { border-collapse: collapse; width: 100%; font-size: 9pt; margin-bottom: 4mm; } table.kunci th, table.kunci td { border: 1px solid #ccc; padding: 1.4mm; text-align: center; } table.kunci th { background: #f2f2f2; }`;
const halaman = (sub, isi, catatan) => `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Paket 1 SKD — ${sub}</title><style>${CSS}</style></head><body>
<div class="cover"><div class="kicker">D'Ajiks Akademi · SKD Kedinasan</div><h1>Paket 1 SKD</h1><div class="sub">${sub}</div>
<div class="meta"><div><b>TWK</b> 30 soal · no. 1–30</div><div><b>TIU</b> 35 soal · no. 31–65</div><div><b>TKP</b> 45 soal · no. 66–110</div></div>
<div class="note">${catatan}</div></div>${isi}</body></html>`;
const kunciTabel = [0, 1, 2, 3, 4].map((r) => soal.slice(r * 22, r * 22 + 22)).map((bag) =>
  `<table class="kunci"><tr><th>No</th>${bag.map((q) => `<th>${q.no}</th>`).join("")}</tr><tr><th>Kunci</th>${bag.map((q) => `<td>${q.kunci}</td>`).join("")}</tr></table>`).join("");

const browser = await puppeteer.launch({ headless: true });
for (const [nama, html] of [
  ["Paket_1_SKD_Soal", halaman("Lembar Soal", bagian((q) => `<div class="soal">${blok(q)}</div>`),
    "Pilih satu jawaban. TWK dan TIU: benar 5, salah atau kosong 0. TKP: setiap pilihan bernilai 1–5.")],
  ["Paket_1_SKD_Pembahasan", halaman("Kunci dan Pembahasan", `<h2 class="section-title">Kunci Jawaban</h2>${kunciTabel}<p style="font-size:9pt">TKP: kunci = pilihan bernilai 5; nilai pilihan lain ada di pembahasan.</p><div style="page-break-after: always"></div>`
    + bagian((q) => `<div class="soal">${blok(q)}${bhs(q)}</div>`), "Kerjakan lembar soal dulu, baru buka pembahasan ini.")],
]) {
  const fHtml = path.join(OUT, `${nama}.html`); // sementara di akar paket supaya alamat svg/ terbaca
  fs.writeFileSync(fHtml, html);
  const page = await browser.newPage();
  await page.goto("file://" + fHtml, { waitUntil: "networkidle0" });
  await page.pdf({ path: path.join(OUT, "pdf", `${nama}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: `<div style="font-size:8px;width:100%;text-align:center;color:#888">Paket 1 SKD D'Ajiks Akademi · <span class="pageNumber"></span>/<span class="totalPages"></span></div>` });
  fs.unlinkSync(fHtml);
  console.log("ok", nama);
}
await browser.close();

fs.copyFileSync(path.join(SINI, "README-developer.md"), path.join(OUT, "README.md"));
execFileSync("zip", ["-rqX", `${NAMA}.zip`, NAMA], { cwd: path.join(SINI, "hasil") });
console.log(`ok ${soal.length} soal, ${fs.readdirSync(path.join(OUT, "svg")).length} SVG →`, path.join("hasil", `${NAMA}.zip`));
console.log("kunci", paket.meta.kunci);
