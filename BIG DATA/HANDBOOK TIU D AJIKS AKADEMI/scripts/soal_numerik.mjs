// Handbook TIU · Tahap 5 · soal numerik Bab 6–10 (45 butir) · pemeriksa + perender dari satu sumber data (pola soal_verbal.mjs).
// Sumber teks: scripts/data/numerik_b06_10.json. Angka: scripts/numerik/model_a.mjs (Bab 6–7) + model_b.mjs (Bab 8–10).
//   1. Model menghitung kunci + setiap pilihan salah dari jalur kesalahan bernama; teks pilihan di data wajib sama persis.
//   2. Kunci tunggal (lihat model): perkiraan → nilai tepat terdekat; P vs Q → semua nilai peubah; pasangan → kedua ruas tiap pilihan;
//      barisan/tabel → derajat polinom + rumus lain ≤ 3 operasi (pola TO Paket 1) + aturan lain deret; soal cerita → jalur dihitung tepat.
//   3. Bentuk: urut naik, kunci bukan pencilan (jarak), ciri kunci tidak menyendiri, sebaran A–E kelompok (dengan Contoh 1 Bab 6), ≤ 2 berturut.
//   4. Pembahasan: setiap rantai "a × b = c" dihitung ulang; setiap angka lain wajib ada di soal/pilihan/daftar angka model.
//   5. Render blok soal ke src/16–20 (pembuka dua blok, Putusan T5-4); pembahasan latihan ke Lampiran B (T6, lampiran_b.mjs).
// Pakai: node scripts/soal_numerik.mjs          → memeriksa (src harus sama dengan hasil render)
//        node scripts/soal_numerik.mjs --tulis  → menulis blok src, field bukti, dan berkas buta
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { hitung, ujiAngka, sisa9, Q } from "./numerik/alat.mjs";
import { MODEL as MA } from "./numerik/model_a.mjs";
import { MODEL as MB } from "./numerik/model_b.mjs";
import { namaTabel, kutip, judulBab, keBahas, potongan, lampiranB } from "./lampiran_b.mjs";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(AKAR, "scripts/data/numerik_b06_10.json"), BUTA = join(AKAR, "scripts/data/numerik_b06_10_buta.json");
const ENGINE = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md");
const SRC = { 6: "src/16_bab06.html", 7: "src/17_bab07.html", 8: "src/18_bab08.html", 9: "src/19_bab09.html", 10: "src/20_bab10.html" };
const TULIS = process.argv.includes("--tulis");
const MODEL = { ...MA, ...MB };
// angka cerita/ungkapan di teks soal yang wajib sama dengan model (tabel dan deret diperiksa langsung dari model)
const WAJIB = {
  "HB-TIU-B06-P01": ["647 × 87 : 21"], "HB-TIU-B06-C02": ["125% × 96 − 36 : 1,5 + 3{2/5} × 10"], "HB-TIU-B06-C03": ["36% × 175 + 63 × 98"],
  "HB-TIU-B06-C04": ["103 × 97", "101 × 99"], "HB-TIU-B06-L01": ["−54 : (−9) − 7 × (2 − (−3))"], "HB-TIU-B06-L02": ["1.987 : {5/8}"],
  "HB-TIU-B06-L03": ["6 &lt; <i>x</i> &lt; 11", "P = <i>x</i><sup>2</sup> + 3", "Q = 8<i>x</i> − 9"],
  "HB-TIU-B08-P01": ["suku ke-50"], "HB-TIU-B08-C01": ["180"], "HB-TIU-B08-C02": ["suku ke-30"], "HB-TIU-B08-L02": ["suku ke-75", "suku ke-40"], "HB-TIU-B08-L04": ["suku ke-12"],
  "HB-TIU-B09-C01": ["13"], "HB-TIU-B09-L01": ["20"], "HB-TIU-B09-L02": ["11"],
  "HB-TIU-B10-P01": ["6 jam", "9 jam", "2 jam"], "HB-TIU-B10-C01": ["75%", "360 liter", "45%", "90%"], "HB-TIU-B10-C02": ["20 pekerja", "28 hari", "8 hari", "4 hari"],
  "HB-TIU-B10-C03": ["6 jam", "10 jam", "2 jam"], "HB-TIU-B10-C04": ["07.15", "18 km/jam", "07.35", "42 km/jam"], "HB-TIU-B10-C05": ["300 meter", "1.200 meter", "90 km/jam"],
  "HB-TIU-B10-C06": ["3 : 2", "7 : 5", "Lima tahun"], "HB-TIU-B10-C07": ["Rp80.000", "Rp200.000", "40%", "10%"], "HB-TIU-B10-L01": ["5 : 3", "30"],
  "HB-TIU-B10-L02": ["90 km", "20 km/jam", "60 km/jam"], "HB-TIU-B10-L03": ["60 km", "2 jam", "3 jam"], "HB-TIU-B10-L04": ["5 peti", "40 kg", "5%", "Rp15.000", "Rp50.000"],
  "HB-TIU-B10-L05": ["Rp2.400.000", "10%", "1 tahun 6 bulan"],
};
const data = JSON.parse(readFileSync(DATA, "utf8"));
let n = 0;
const ok = (c, m) => { n++; assert.ok(c, m); };
const polos = (s) => String(s).replace(/<[^>]+>/g, "");
const esc = (t) => String(t).replace(/ < /g, " &lt; ").replace(/ > /g, " &gt; ");
const fr = (t) => esc(t).replace(/(\d?)\{(\d+)\/(\d+)\}/g, (_, w, a, b) => `${w}<span class="fr"><sup>${a}</sup>⁄<sub>${b}</sub></span>`);

// ════════ 1–2. model, kunci tunggal, bentuk ════════
const engine = readFileSync(ENGINE, "utf8");
const KODE = new Set([...engine.matchAll(/^\| K\d \| (J-[A-Z]+)/gm)].map((m) => m[1]));
ok(KODE.size >= 30, "kode engine terbaca");
ok(data.butir.length === 45, "45 butir");
const M = {}, bukti = {};
for (const b of data.butir) {
  const f = MODEL[b.id]; ok(f, `${b.id}: model tidak ada`);
  const m = (M[b.id] = f(b));
  const H = Object.keys(b.opsi);
  ok(H.join("") === (m.empat ? "ABCD" : "ABCDE"), `${b.id}: huruf pilihan`);
  for (const h of H) ok(b.opsi[h] === m.teks[h], `${b.id} ${h}: data "${b.opsi[h]}" ≠ model "${m.teks[h]}"`);
  ok(b.kunci === m.kunci, `${b.id}: kunci data ${b.kunci} ≠ model ${m.kunci}`);
  for (const h of H) ok(b.kode[h] === (h === b.kunci ? "kunci" : m.kode[h]), `${b.id} ${h}: kode data ${b.kode[h]} ≠ model ${m.kode[h]}`);
  for (const h of H.filter((x) => x !== b.kunci)) ok(KODE.has(b.kode[h]) && b.nama[h], `${b.id} ${h}: kode/nama`);
  if (m.urut) bukti[b.id] = { ...m.bukti, bentuk: ujiAngka(b.id, H.map((h) => m.nilai[h]), b.kunci) };
  else bukti[b.id] = { ...m.bukti };
  if (!m.urut && !m.empat && !b.jenis.startsWith("PAS")) {   // pilihan huruf / pasangan nilai: kunci bukan simpul (pilihan yang berbagi unsur dengan pilihan terbanyak)
    const unsur = (t) => t.match(/^([A-Z])(\d+)$/)?.slice(1) ?? t.match(/^([A-Z])([A-Z])$/)?.slice(1) ?? t.match(/^(\S+) dan (\S+)$/).slice(1);
    const bagi = Object.fromEntries(H.map((h) => [h, H.filter((g) => g !== h && unsur(b.opsi[g]).some((x, i) => x === unsur(b.opsi[h])[i])).length]));
    ok(H.filter((h) => bagi[h] >= bagi[b.kunci]).length >= 2, `${b.id}: kunci = simpul unsur bersama tunggal ${JSON.stringify(bagi)}`);
    // revisi cek buta 3: tebakan "bagian terbanyak di tiap posisi" wajib jatuh di pilihan salah; tidak ada pilihan yang menyendiri
    const terbanyak = [0, 1].map((i) => { const f = {}; for (const h of H) f[unsur(b.opsi[h])[i]] = (f[unsur(b.opsi[h])[i]] ?? 0) + 1; const m = Math.max(...Object.values(f)); return new Set(Object.keys(f).filter((k) => f[k] === m)); });
    const modal = (h) => unsur(b.opsi[h]).every((x, i) => terbanyak[i].has(x));
    ok(!modal(b.kunci), `${b.id}: kunci memegang bagian terbanyak di kedua posisi`);
    ok(H.some((h) => h !== b.kunci && modal(h)), `${b.id}: gabungan bagian terbanyak bukan pilihan salah`);
    ok(H.every((h) => bagi[h] >= 1), `${b.id}: ada pilihan yang tidak berbagi bagian dengan pilihan lain ${JSON.stringify(bagi)}`);
    bukti[b.id].terbanyak = H.filter(modal);
    bukti[b.id].simpul = bagi;
  }
  if (m.sisa9) { const s = Object.fromEntries(H.map((h) => [h, sisa9(m.nilai[h])])); ok(H.filter((h) => s[h] === s[b.kunci]).length === 1, `${b.id}: sisa 9 kunci tidak tunggal`); bukti[b.id].sisa9 = s; }
  ok(b.alasan_kunci && b.kerangka && b.to_terdekat && b.kalimat_penentu && b.jenis && b.bentuk, `${b.id}: field wajib`);
  // angka soal wajib cocok dengan model (tabel/deret dirender dari model; ungkapan di teks soal)
  for (const w of WAJIB[b.id] ?? []) ok(polos(fr(soalTeks(b))).includes(polos(fr(w))), `${b.id}: teks soal tanpa "${w}"`);
  if (m.deret) ok(soalTeks(b).includes(m.deret.map((x) => x ?? "…").join(", ")), `${b.id}: deret di soal ≠ model`);
}
function soalTeks(b) { return [b.soal.pengantar, b.soal.tanya].filter(Boolean).join(" "); }

// sebaran kunci: urutan buku, Contoh 1 Bab 6 (C) ikut dihitung
const urutBuku = data.butir.map((b) => b.id);
const seq = [];
for (const b of data.butir) { seq.push(b.kunci); if (b.id === "HB-TIU-B06-P01") seq.push("C"); }
ok(!/(.)\1\1/.test(seq.join("")), `kunci sama > 2 berturut (${seq.join("")})`);
const hit = Object.fromEntries(["A", "B", "C", "D", "E"].map((h) => [h, seq.filter((x) => x === h).length]));
ok(Math.max(...Object.values(hit)) - Math.min(...Object.values(hit)) <= 1, `sebaran kunci tidak seimbang ${JSON.stringify(hit)}`);
for (const bab of [6, 7, 8, 9, 10]) ok(urutBuku.filter((id) => +id.slice(8, 10) === bab).length === { 6: 7, 7: 7, 8: 9, 9: 9, 10: 13 }[bab], `Bab ${bab}: banyak butir`);

// ════════ 3. bahasa + pembahasan ════════
const LARANGAN = ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus",
  "tidak hanya", "dibedah", "jebakan", "pengecoh", "stem", "distraktor", "konstruk", "kutub", "hots", "level", "kode", "kok", "nggak", "di era", "maka", "karena itu"];
const tok = (s) => (polos(fr(s)).replace(/\b\d{2}\.\d{2}\b/g, (x) => ` ${x.replace(".", "·")} `).match(/\d+(?:\.\d{3})*(?:,\d+)?|\d{2}·\d{2}/g) || []);
const NUM = String.raw`(?:\d[\d.,]*(?:\s?\{\d+\/\d+\})?|\{\d+\/\d+\})%?`;
const E = String.raw`[−(]*${NUM}\)*(?:\s+[×:+−]\s+[−(]*${NUM}\)*)*`;   // operator biner selalu berspasi; titik dua tanpa spasi = tanda baca
const RANTAI = new RegExp(`${E}(?:\\s*=\\s*${E})+`, "g");
const SMALL = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "100"]);
let rantai = 0;
function ujiAngkaTeks(b, teks, boleh) {
  for (const ch of fr(teks).replace(/<span class="fr"><sup>(\d+)<\/sup>⁄<sub>(\d+)<\/sub><\/span>/g, "{$1/$2}").replace(/<[^>]+>/g, "").matchAll(RANTAI)) {
    const imbang = (x) => { const c = (k) => x.split(k).length - 1; while (x.startsWith("(") && c("(") > c(")")) x = x.slice(1); while (x.endsWith(")") && c(")") > c("(")) x = x.slice(0, -1); return x.trim(); };
    const sisi = ch[0].split(/\s*=\s*/).map((x) => imbang(x.replace(/[.,]$/, "").trim()));
    const v = sisi.map((x) => { try { return hitung(x); } catch { return null; } });
    ok(v.every(Boolean), `${b.id}: rantai hitung tidak terbaca "${ch[0]}"`);
    ok(v.every((x) => x.eq(v[0])), `${b.id}: hitungan salah "${ch[0]}"`);
    rantai++;
    for (const s of sisi) for (const k of tok(s)) boleh.add(k);
  }
}
function ujiToken(b, teks, boleh) { for (const k of tok(teks)) { n++; if (!boleh.has(k) && !SMALL.has(k)) HILANG.push(`${b.id.slice(7)} "${k}"`); } }
const HILANG = [];
const TABEL = Object.fromEntries(Object.entries(SRC).map(([k, f]) => [k, namaTabel(readFileSync(join(AKAR, f), "utf8"))]));
// ponytail: nama kekeliruan latihan yang belum punya baris di tabel bab (jalurnya tidak terwakili nama tabel) — menunggu putusan Gusti (T6)
const NAMA_LUAR = new Set(["B06-L03 C", "B08-L01 D", "B08-L02 E", "B09-L01 A", "B09-L01 C", "B09-L02 B", "B09-L04 D", "B10-L01 C", "B10-L01 E", "B10-L03 A", "B10-L03 B", "B10-L04 B", "B10-L04 E"]);
for (const b of data.butir) {
  const m = M[b.id];
  const siswa = [b.soal, b.opsi, b.nama, b.pembahasan ?? {}].map((x) => JSON.stringify(x)).join(" ").toLowerCase();
  for (const k of LARANGAN) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(siswa), `${b.id}: kata terlarang "${k}"`);
  ok(!/\bj-[a-z]+|\bjf-|\bk[1-7]\b/i.test(siswa.replace(/k[1-7]\d/g, "")), `${b.id}: kode bocor ke teks siswa`);
  const guru = [b.jenis, b.bentuk, b.kerangka, b.to_terdekat, b.catatan_reviu, b.alasan_kunci].join(" ").toLowerCase();   // larangan build.py berlaku juga di catatan pengajar
  for (const k of ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus", "di era", "tidak hanya", "kok", "nggak", "enggak"]) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(guru), `${b.id}: kata terlarang di catatan pengajar "${k}"`);
  if (b.peran === "latihan") for (const h of Object.keys(b.opsi).filter((x) => x !== b.kunci))   // T6: nama kekeliruan latihan = tabel bab
    ok(TABEL[b.bab].has(kutip(b.nama[h])) !== NAMA_LUAR.has(`${b.id.slice(7)} ${h}`), `${b.id} ${h}: nama "${b.nama[h]}" ${NAMA_LUAR.has(`${b.id.slice(7)} ${h}`) ? "sudah ada di tabel (hapus dari NAMA_LUAR)" : `tidak ada di tabel kekeliruan Bab ${b.bab}`}`);
  const P = b.pembahasan, H = Object.keys(b.opsi);
  ok(P && ["ditanya", "cepat", "lain", "cek", "kunci", "analogi", "waspada"].every((k) => P[k]), `${b.id}: 7 langkah lengkap`);
  ok(H.filter((h) => h !== b.kunci).every((h) => P.gugur[h]?.teks && P.gugur[h]?.uji) && !P.gugur[b.kunci], `${b.id}: gugur tiap pilihan salah`);
  ok(/[“"]/.test(P.ditanya), `${b.id}: kalimat penentu dikutip di Inti pertanyaan`);
  ok(P.kunci.split(/(?<=[.!?])\s+(?=[A-Z])/).length <= 2, `${b.id}: alasan kunci terlalu panjang`);
  const boleh = new Set([...tok(soalTeks(b)), ...Object.values(b.opsi).flatMap(tok), ...(m.angka ?? []).flatMap(tok), ...tabelAngka(m).flatMap((x) => tok(String(x)))]);
  const teksP = Object.entries(P).flatMap(([k, v]) => (k === "gugur" ? Object.values(v).flatMap((g) => [g.teks, g.uji]) : k === "cepat_batas" ? [] : [v]));
  for (const t of teksP) ujiAngkaTeks(b, t, boleh);          // lintasan 1: rantai hitung dihitung ulang, angkanya sah
  for (const t of teksP) ujiToken(b, t, boleh);              // lintasan 2: angka lain wajib berasal dari soal/pilihan/model/rantai
}
ok(HILANG.length === 0, `angka pembahasan tidak berasal dari soal/pilihan/model/rantai hitung: ${HILANG.join(", ")}`);
function tabelAngka(m) { const t = m.tabel; if (!t) return (m.deret ?? []).filter((x) => x != null && typeof x === "number").map((x) => (x < 0 ? "−" : "") + Math.abs(x)); return JSON.stringify(t).match(/-?\d+/g).map((x) => x.replace("-", "−")); }

// ════════ 4. render ════════
const jam = '<svg class="ico"><use href="#jam"/></svg>';
const urut = (id) => +id.slice(-2);
const label = (b) => (b.peran === "pembuka" ? "Pertanyaan Pembuka" : `${b.peran === "contoh" ? "Contoh" : "Latihan"} ${urut(b.id)}`);
const angkaSel = (v) => (typeof v === "number" ? (v < 0 ? "−" : "") + String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : v);
const sel = (v, cls = "") => `<td${v === "X" || v === "Y" ? ' class="x"' : cls}>${angkaSel(v)}</td>`;
function tabel(m) {
  const t = m.tabel; if (!t) return "";
  const baris = (r) => `<tr>${r.map((v) => sel(v)).join("")}</tr>`;
  if (t.suku || t.duaKolom) {
    const [a, b] = t.suku ? ["Suku ke-", "Nilai"] : ["Kiri", "Kanan"], d = t.suku ?? t.duaKolom;
    return `<table class="tb pola datar"><tbody><tr><th>${a}</th>${d.map(([x]) => sel(x)).join("")}</tr><tr><th>${b}</th>${d.map(([, y]) => sel(y)).join("")}</tr></tbody></table>`;
  }
  if (t.kisi || t.kisiKolom || t.tetangga) return `<table class="tb pola petak"><tbody>${(t.kisi ?? t.kisiKolom ?? t.tetangga).map(baris).join("")}</tbody></table>`;
  if (t.xy) return `<table class="tb pola petak"><tbody>${t.xy.map(baris).join("")}</tbody></table>`;
  if (t.acuan) { const { R, C, sel: S } = t.acuan; return `<table class="tb pola petak"><tbody><tr><td class="ac sudut"></td>${C.map((c) => `<td class="ac">${c}</td>`).join("")}</tr>${R.map((r, i) => `<tr><td class="ac">${r}</td>${S[i].map((v) => sel(v)).join("")}</tr>`).join("")}</tbody></table>`; }
  assert.fail("bentuk tabel");
}
function stem(b, m) {
  let sudah = false;
  const tandai = (t) => { if (sudah || !t.includes(b.kalimat_penentu)) return fr(t); sudah = true; return fr(t.replace(b.kalimat_penentu, `<mark>${b.kalimat_penentu}</mark>`)); };
  const out = [];
  if (b.soal.pengantar) out.push(`<p class="stem">${tandai(b.soal.pengantar)}</p>`);
  const tb = tabel(m); if (tb) out.push(tb);
  out.push(`<p class="stem">${tandai(b.soal.tanya)}</p>`);
  ok(sudah, `${b.id}: kalimat penentu "${b.kalimat_penentu}" tidak ditemukan di soal`);
  return out.join("\n    ");
}
const pendek = (b) => Object.values(b.opsi).every((x) => x.length <= 8);
const kodeTeks = (b) => Object.keys(b.opsi).map((h) => `${h} ${b.kode[h] === "kunci" ? "<b>kunci</b>" : b.kode[h]}`).join(" · ");
const ringkasBukti = (id) => bukti[id].metode + (bukti[id].bentuk ? ` Jarak kunci ke pilihan terdekat ${String(bukti[id].bentuk.jarak).replace(".", ",")}, median jarak ${String(bukti[id].bentuk.median).replace(".", ",")}.` : ".");
function blok(b) {
  const m = M[b.id], H = Object.keys(b.opsi);
  const g = `<div class="guru"><b>${b.jenis}, ${b.bentuk}.</b> Kunci ${b.kunci}. Kode: ${kodeTeks(b)}. Kerangka: ${b.kerangka}. TO terdekat: ${b.to_terdekat}. Bukti: ${ringkasBukti(b.id)} ${b.catatan_reviu}</div>`;
  const opsi = pendek(b)
    ? `<div class="opsi5">${H.map((h) => `<div><span class="h">${h}</span><b>${b.opsi[h]}</b></div>`).join("")}</div>`
    : `<ol class="opsiv">${H.map((h) => `<li><span class="h">${h}</span><span>${fr(b.opsi[h])}</span></li>`).join("")}</ol>`;
  const soal = `  <div class="soal">
    <div class="meta"><span>${label(b)}</span><span class="waktu">${jam}Target ${b.target_detik} detik</span></div>
    ${stem(b, m)}
    ${opsi}
  </div>
  ${g}`;
  let bahas = "";
  if (b.pembahasan) {
    const P = b.pembahasan, salah = H.filter((h) => h !== b.kunci);
    const gugur = pendek(b)
      ? `<div class="gugur"><b class="lbl">Pilihan yang gugur</b>${salah.map((h) => `<div class="g"><span class="h">${h}</span><span class="v">${b.opsi[h]}<span class="uji">${fr(P.gugur[h].uji)}</span></span><div class="x"><b>${b.nama[h]}.</b> ${fr(P.gugur[h].teks)}</div></div>`).join("")}</div>`
      : `<div class="gugur vb"><b class="lbl">Pilihan yang gugur</b>${salah.map((h) => `<div class="g"><span class="h">${h}</span><div class="x"><span class="uji">${fr(P.gugur[h].uji)}</span><b>${b.nama[h]}.</b> ${fr(P.gugur[h].teks)}</div></div>`).join("")}</div>`;
    bahas = `
  <div class="kotak inti"><b class="lbl">Inti pertanyaan</b><p>${fr(P.ditanya)}</p></div>
  <div class="kotak langkah"><b class="lbl">Langkah penyelesaian</b><dl class="tahap">
    <div><dt>Cara cepat${P.cepat_batas ? `<small>${P.cepat_batas}</small>` : ""}</dt><dd>${fr(P.cepat)}</dd></div>
    <div><dt>Cara lain</dt><dd>${fr(P.lain)}</dd></div>
    <div><dt>Cek balik</dt><dd>${fr(P.cek)}</dd></div>
  </dl></div>
  ${gugur}
  <div class="jwb"><span>${b.kunci}</span><p><b>Jawaban: ${b.kunci}.</b> ${fr(P.kunci)}</p></div>
  <div class="duo"><div class="il"><b>Ilustrasi</b><span>${fr(P.analogi)}</span></div><div><b>Kekeliruan yang Mungkin Terjadi</b><span>${fr(P.waspada)}</span></div></div>`;
  }
  const t = b.id.replace("HB-TIU-", "");
  if (b.peran === "latihan") {   // T6: pembahasan di Lampiran B (soal diulang tanpa catatan pengajar) + tautan dua arah
    LB[b.bab].push(potongan(t, soal.replace(g, "").trimEnd().replace(`<span>${label(b)}</span>`, () => `<span>Bab ${b.bab} · ${label(b)}</span>`), bahas));
    return `<!--${t}:mulai-->\n<div data-soal="${b.id}" data-target="${b.target_detik}">\n${soal.replace(`<span>${label(b)}</span>`, () => keBahas(label(b), t))}\n</div>\n<!--${t}:selesai-->`;
  }
  // tautan dua arah soal pembuka ⇄ pembahasannya (pola a.ke Handbook TWK)
  if (b.peran === "pembuka") return [`<!--${t}:mulai-->\n<div data-soal="${b.id}" data-target="${b.target_detik}">\n${soal.replace(`<span>${label(b)}</span>`, () => `<span id="soal-${t}">${label(b)}<a class="ke" href="#bahas-${t}">Lihat pembahasan</a></span>`)}\n</div>\n<!--${t}:selesai-->`,
    `<!--${t}-bahas:mulai-->\n  <h3 id="bahas-${t}">Pembahasan Pertanyaan Pembuka</h3>\n<div class="bahas-pembuka">\n${soal.replace(g, "").trimEnd()}${bahas}\n  <p class="balik"><a class="ke" href="#soal-${t}">Kembali ke soal</a></p>\n</div>\n<!--${t}-bahas:selesai-->\n\n`];
  return `<!--${t}:mulai-->\n<div data-soal="${b.id}" data-target="${b.target_detik}">\n${soal}${bahas}\n</div>\n<!--${t}:selesai-->`;
}
let beda = 0;
const LB = { 6: [], 7: [], 8: [], 9: [], 10: [] };
for (const bab of [6, 7, 8, 9, 10]) {
  const f = join(AKAR, SRC[bab]);
  let html = readFileSync(f, "utf8");
  for (const b of data.butir.filter((x) => x.bab === bab)) {
    const t = b.id.replace("HB-TIU-", "");
    let baru = blok(b);
    if (Array.isArray(baru)) {
      const [soalP, bahasP] = baru; baru = soalP;
      // Bab 6: judul Contoh berada di dalam <div class="utuh"> (Contoh 1 utuh satu halaman, T4-14); pembahasan pembuka ditaruh sebelum div itu
      const CT = html.includes('  <div class="utuh">\n  <h3>Contoh Soal dan Pembahasan</h3>') ? '  <div class="utuh">\n  <h3>Contoh Soal dan Pembahasan</h3>' : "  <h3>Contoh Soal dan Pembahasan</h3>";
      const ada = new RegExp(`<!--${t}-bahas:mulai-->[\\s\\S]*?<!--${t}-bahas:selesai-->\\n\\n`);
      if (ada.test(html)) { if (html.match(ada)[0] !== bahasP) beda++; html = html.replace(ada, () => bahasP); }
      else { ok(html.split(CT).length === 2, `${b.id}: judul Contoh Soal dan Pembahasan tidak tunggal di ${SRC[bab]}`); beda++; html = html.replace(CT, () => bahasP + CT); }
    }
    const terisi = new RegExp(`<!--${t}:mulai-->[\\s\\S]*?<!--${t}:selesai-->`);
    const kosong = new RegExp(`  <div class="slot" data-slot="${b.id}" data-target="${b.target_detik}">[\\s\\S]*?<div class="guru">[\\s\\S]*?</div>\\n  </div>`);
    if (terisi.test(html)) { if (html.match(terisi)[0] !== baru) beda++; html = html.replace(terisi, () => baru); }
    else { ok(kosong.test(html), `${b.id}: slot kosong (target ${b.target_detik}) tidak ditemukan di ${SRC[bab]}`); beda++; html = html.replace(kosong, () => baru); }
  }
  if (TULIS) writeFileSync(f, html);
}
if (!lampiranB(AKAR, "B06-10", [6, 7, 8, 9, 10].map((bab) => [`Bab ${bab} · ${judulBab(readFileSync(join(AKAR, SRC[bab]), "utf8"))}`, LB[bab]]), TULIS)) beda++;
ok(TULIS || beda === 0, `${beda} blok src berbeda dari hasil render (jalankan --tulis)`);

if (TULIS) {
  for (const b of data.butir) b.bukti = bukti[b.id];
  writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  // teks buta: pecahan campuran "3 2/5", pecahan "11/5", pangkat "x²", entitas dibuka, tag dibuang (revisi cek buta 1)
  const SUP = { 2: "²", 3: "³" };
  const bersih = (t) => String(t ?? "").replace(/(\d)\{(\d+)\/(\d+)\}/g, "$1 $2/$3").replace(/\{(\d+)\/(\d+)\}/g, "$1/$2").replace(/<sup>(\d)<\/sup>/g, (_, d) => SUP[d] ?? `^${d}`)
    .replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  const plain = (b) => { const m = M[b.id]; const t = m.tabel ? JSON.parse(JSON.stringify(m.tabel)) : null; return { id: b.id, bab: b.bab, target_detik: b.target_detik, soal: { pengantar: bersih(b.soal.pengantar) || undefined, tabel: t ?? undefined, tanya: bersih(b.soal.tanya) }, opsi: Object.fromEntries(Object.entries(b.opsi).map(([h, v]) => [h, bersih(v)])) }; };
  writeFileSync(BUTA, JSON.stringify(data.butir.map(plain), null, 2) + "\n");
  writeFileSync(BUTA.replace("_buta.json", "_buta4.json"), JSON.stringify(data.butir.filter((b) => b.revisi3).map(plain), null, 2) + "\n");   // cek buta ke-4: soal yang diubah sesudah cek buta 3 (buta2/buta3 tidak ditulis ulang)
} else for (const b of data.butir) ok(JSON.stringify(b.bukti) === JSON.stringify(bukti[b.id]), `${b.id}: field bukti usang (jalankan --tulis)`);

console.log(`soal_numerik: semua assert lulus · ${n} butir dicek · 45 soal · ${rantai} rantai hitung pembahasan · kunci ${seq.join("")} · ${JSON.stringify(hit)}${TULIS ? " · src + data + buta ditulis" : ""}`);
