// Handbook TIU · T6-5/T6-8 · soal figural Bab 14–18 (10 contoh, 2 per bab) · pemeriksa + perender (pola soal_kck.mjs).
// Sumber data = keluaran generator: aset/figural/items.json + img/*.svg, dibuat oleh
//   k12-spatial-engine: npx tsx src/tiu-handbook.ts "<HB>/aset/figural"
// (pemeriksa T2-6, bocor bentuk, dan kunci tunggal berjalan di sana; soal gagal tidak ditulis).
//   1. Data: 10 soal, ID = slot Contoh 1/2 bab, kunci 2 per huruf dan ≤ 2 berturut, kode per pilihan salah, gambar ada.
//   2. Pembahasan 7 langkah dari scripts/data/figural_b14_18_bahas.json (ditulis sesudah cek buta, T5-19): kata terlarang, kode tidak bocor, gugur tiap pilihan salah.
//   3. Render soal + pembahasan ke src/24–28 (blok <!--Bxx-Cyy:mulai/selesai-->); catatan pengajar slot disalin apa adanya (T5-22).
// Pakai: node scripts/soal_figural.mjs          → memeriksa (src harus sama dengan hasil render)
//        node scripts/soal_figural.mjs --tulis  → menulis blok src + scripts/data/figural_b14_18_buta.json
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASET = "aset/figural", BUTA = join(AKAR, "scripts/data/figural_b14_18_buta.json");
const SRC = { 14: "src/24_bab14.html", 15: "src/25_bab15.html", 16: "src/26_bab16.html", 17: "src/27_bab17.html", 18: "src/28_bab18.html" };
const TULIS = process.argv.includes("--tulis");
const data = JSON.parse(readFileSync(join(AKAR, ASET, "items.json"), "utf8"));
const BAHAS = JSON.parse(readFileSync(join(AKAR, "scripts/data/figural_b14_18_bahas.json"), "utf8"));
let n = 0;
const ok = (c, m) => { n++; assert.ok(c, m); };

// 1. data
const H = ["A", "B", "C", "D", "E"];
ok(data.length === 10, "harus 10 soal");
ok(JSON.stringify(data.map((b) => b.id)) === JSON.stringify([14, 15, 16, 17, 18].flatMap((x) => [`HB-TIU-B${x}-C01`, `HB-TIU-B${x}-C02`])), "ID/urutan soal tidak sesuai slot");
const seq = data.map((b) => b.kunci).join("");
H.forEach((h) => ok(seq.split(h).length - 1 === 2, `kunci ${h} tidak 2× (${seq})`));
ok(!/(.)\1\1/.test(seq), `kunci berderet > 2 (${seq})`);
for (const b of data) {
  ok(H.every((h) => b.kode[h] && (h === b.kunci) === (b.kode[h] === "kunci")), `${b.id}: kode pilihan tidak lengkap`);
  [b.gambar, ...Object.values(b.opsi_gambar)].filter(Boolean).forEach((p) => ok(existsSync(join(AKAR, ASET, p)), `${b.id}: ${p} tidak ada`));
  ok(!/satu-satunya/i.test(b.instruksi + b.tanya), `${b.id}: "satu-satunya" di soal`);
}

// 2. pembahasan (larangan = soal_kck.mjs)
const LARANGAN = ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus",
  "tidak hanya", "dibedah", "jebakan", "pengecoh", "stem", "distraktor", "konstruk", "kutub", "hots", "level", "kode", "kok", "nggak", "enggak", "di era", "maka", "karena itu"];
ok(Object.keys(BAHAS).length === 10 && data.every((b) => BAHAS[b.id]), "pembahasan tidak lengkap 10 soal");
for (const b of data) {
  const { nama, pembahasan: P } = BAHAS[b.id], salah = H.filter((h) => h !== b.kunci);
  const siswa = JSON.stringify(BAHAS[b.id]).toLowerCase();
  for (const k of LARANGAN) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(siswa), `${b.id}: kata terlarang "${k}"`);
  ok(!/\bj-[a-z]+|\bjf-|\bk[1-7]\b/i.test(siswa), `${b.id}: kode bocor ke teks siswa`);
  ok(["ditanya", "cepat", "lain", "cek", "kunci", "analogi", "waspada"].every((k) => P[k]), `${b.id}: 7 langkah lengkap`);
  ok(/“[^”]+”/.test(P.ditanya), `${b.id}: kalimat penentu dikutip di Inti pertanyaan`);
  ok(salah.every((h) => nama[h] && P.gugur[h]?.teks && P.gugur[h]?.uji) && !P.gugur[b.kunci] && !nama[b.kunci], `${b.id}: gugur tiap pilihan salah`);
  ok(P.kunci.split(/(?<=[.!?])\s+(?=[A-Z])/).length <= 2, `${b.id}: alasan kunci terlalu panjang`);
  ok(existsSync(join(AKAR, ASET, b.gambar_pembahasan)), `${b.id}: gambar pembahasan tidak ada`);
}

// 3. render
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function bahas(b) {
  const { nama, pembahasan: P } = BAHAS[b.id];
  return `
  <div class="kotak inti"><b class="lbl">Inti pertanyaan</b><p>${esc(P.ditanya)}</p></div>
  <div class="kotak langkah"><b class="lbl">Langkah penyelesaian</b>${img(b.gambar_pembahasan, "Gambar pembahasan", ' class="gbr"')}<dl class="tahap">
    <div><dt>Cara cepat</dt><dd>${esc(P.cepat)}</dd></div>
    <div><dt>Cara lain</dt><dd>${esc(P.lain)}</dd></div>
    <div><dt>Cek balik</dt><dd>${esc(P.cek)}</dd></div>
  </dl></div>
  <div class="gugur vb"><b class="lbl">Pilihan yang gugur</b>${H.filter((h) => h !== b.kunci).map((h) => `<div class="g"><span class="h">${h}</span><div class="x"><span class="uji">${esc(P.gugur[h].uji)}</span><b>${esc(nama[h])}.</b> ${esc(P.gugur[h].teks)}</div></div>`).join("")}</div>
  <div class="jwb"><span>${b.kunci}</span><p><b>Jawaban: ${b.kunci}.</b> ${esc(P.kunci)}</p></div>
  <div class="duo"><div class="il"><b>Ilustrasi</b><span>${esc(P.analogi)}</span></div><div><b>Kekeliruan yang Mungkin Terjadi</b><span>${esc(P.waspada)}</span></div></div>`;
}
const jam = '<svg class="ico"><use href="#jam"/></svg>';
const img = (p, alt, cls = "") => `<img${cls} src="${ASET}/${p}" alt="${alt}">`;
function blok(b, guru) {
  const t = b.id.replace("HB-TIU-", "");
  return `<!--${t}:mulai-->
<div data-soal="${b.id}" data-target="${b.target_detik}">
  <div class="soal">
    <div class="meta"><span>Contoh ${+t.slice(-2)}</span><span class="waktu">${jam}Target ${b.target_detik} detik</span></div>
    <p class="stem">${b.instruksi} ${b.tanya}</p>${b.gambar ? `\n    ${img(b.gambar, "Gambar soal", ' class="gbr"')}` : ""}
    <div class="opsi5 gbr5${b.jenis === "FIG-BEDA-HITUNG" ? " lebar" : ""}">${H.map((h) => `<div><span class="h">${h}</span>${img(b.opsi_gambar[h], `Pilihan ${h}`)}</div>`).join("")}</div>
  </div>
  ${guru}${bahas(b)}
</div>
<!--${t}:selesai-->`;
}
let beda = 0;
for (const bab of [14, 15, 16, 17, 18]) {
  const f = join(AKAR, SRC[bab]);
  let html = readFileSync(f, "utf8");
  for (const b of data.filter((x) => x.bab === bab)) {
    const t = b.id.replace("HB-TIU-", "");
    const terisi = new RegExp(`<!--${t}:mulai-->[\\s\\S]*?<!--${t}:selesai-->`);
    const kosong = new RegExp(`  <div class="slot" data-slot="${b.id}" data-target="${b.target_detik}">[\\s\\S]*?(<div class="guru">[\\s\\S]*?</div>)\\n  </div>`);
    if (terisi.test(html)) {
      const lama = html.match(terisi)[0], guru = lama.match(/  (<div class="guru">[\s\S]*?<\/div>)\n(?:  <div class="kotak inti">|<\/div>\n<!--)/)[1], baru = blok(b, guru);
      if (lama !== baru) beda++;
      html = html.replace(terisi, () => baru);
    } else {
      const m = html.match(kosong);
      ok(m, `${b.id}: slot kosong (target ${b.target_detik}) tidak ditemukan di ${SRC[bab]}`);
      beda++; html = html.replace(kosong, () => blok(b, m[1]));
    }
  }
  if (TULIS) writeFileSync(f, html);
}
ok(TULIS || beda === 0, `${beda} blok src berbeda dari hasil render (jalankan --tulis)`);

// berkas buta: soal tanpa kunci, kode, keluarga, dan bahan pembahasan; gambar lewat path relatif dari akar handbook
const buta = data.map((b) => ({ id: b.id, bab: b.bab, target_detik: b.target_detik, instruksi: b.instruksi, tanya: b.tanya,
  gambar: b.gambar ? `${ASET}/${b.gambar}` : null, opsi_gambar: Object.fromEntries(H.map((h) => [h, `${ASET}/${b.opsi_gambar[h]}`])) }));
const butaTeks = JSON.stringify(buta, null, 2) + "\n";
if (TULIS) writeFileSync(BUTA, butaTeks); else ok(existsSync(BUTA) && readFileSync(BUTA, "utf8") === butaTeks, "berkas buta usang (jalankan --tulis)");
ok(!/kunci|kode|pembahasan/.test(butaTeks), "berkas buta memuat kunci/pembahasan");

console.log(`soal_figural: semua assert lulus · ${n} butir dicek · 10 soal figural · kunci ${seq}${TULIS ? " · src + buta ditulis" : ""}`);
