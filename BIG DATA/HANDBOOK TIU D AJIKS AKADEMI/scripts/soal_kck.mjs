// Handbook TIU · Tahap 5 · soal Bab 11–13 (kecukupan data, penalaran analitis, optimasi tabel; 31 butir) · pemeriksa + perender
// dari satu sumber data (pola soal_numerik.mjs). Sumber teks: scripts/data/kck_b11_13.json. Kunci, pilihan, tabel: scripts/kck/model_*.mjs.
//   1. Model memeriksa semua keadaan / susunan / kombinasi; teks pilihan, kunci, dan kode di data wajib sama dengan model.
//   2. Bentuk: pilihan angka urut naik + jarak (alat.mjs ujiAngka, T5-16); kunci bukan terpanjang/terpendek tunggal (di luar bunyi baku);
//      bentuk kalimat kunci dimiliki ≥ 1 pilihan lain; kunci tidak di pasangan cermin tunggal; sebaran A–E kelompok, ≤ 2 berturut.
//   3. Bahasa + pembahasan: larangan kata, kode tidak bocor, 7 langkah, rantai hitung dihitung ulang, angka lain wajib berasal dari soal/model.
//   4. Render ke src/21–23 (pembuka dua blok + tautan dua arah, T5-4/T5-18); pembahasan latihan dan Latihan Bukti ke Lampiran B (T6, lampiran_b.mjs).
// Pakai: node scripts/soal_kck.mjs          → memeriksa (src harus sama dengan hasil render)
//        node scripts/soal_kck.mjs --tulis  → menulis blok src, field bukti, dan berkas buta
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { hitung, ujiAngka } from "./numerik/alat.mjs";
import { H } from "./kck/alat_kck.mjs";
import { MODEL as M11 } from "./kck/model_kck.mjs";
import { MODEL as M12 } from "./kck/model_ana.mjs";
import { MODEL as M13 } from "./kck/model_opt.mjs";
import { namaTabel, kutip, judulBab, keBahas, potongan, lampiranB } from "./lampiran_b.mjs";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(AKAR, "scripts/data/kck_b11_13.json"), BUTA = join(AKAR, "scripts/data/kck_b11_13_buta.json");
const ENGINE = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md");
const SRC = { 11: "src/21_bab11.html", 12: "src/22_bab12.html", 13: "src/23_bab13.html" };
const TULIS = process.argv.includes("--tulis");
const MODEL = { ...M11, ...M12, ...M13 };
const data = JSON.parse(readFileSync(DATA, "utf8"));
let n = 0;
const ok = (c, m) => { n++; assert.ok(c, m); };
const polos = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const fr = (t) => String(t).replace(/(\d?)\{(\d+)\/(\d+)\}/g, (_, w, a, b) => `${w}<span class="fr"><sup>${a}</sup>⁄<sub>${b}</sub></span>`);
const esc = (t) => fr(t).replace(/ < /g, " &lt; ").replace(/ > /g, " &gt; ");

// ════════ 1. model, kunci, kode ════════
const engine = readFileSync(ENGINE, "utf8");
const KODE = new Set([...engine.matchAll(/^\| K\d \| (J-[A-Z]+)/gm)].map((m) => m[1]));
ok(KODE.size >= 30, "kode engine terbaca");
ok(data.butir.length === 31, "31 butir");
const URUT = { 11: ["P01", "B01", "B02", "C01", "C02", "C03", "C04", "C05", "C06", "C07", "L01", "L02", "L03", "L04", "L05"], 12: ["P01", "C01", "C02", "C03", "C04", "L01", "L02", "L03", "L04"], 13: ["P01", "C01", "C02", "C03", "L01", "L02", "L03"] };
ok(data.butir.map((b) => b.id).join() === Object.entries(URUT).flatMap(([bab, xs]) => xs.map((x) => `HB-TIU-B${bab}-${x}`)).join(), "urutan butir = urutan slot di src");
const M = {}, bukti = {};
const PG = data.butir.filter((b) => b.peran !== "bukti");
for (const b of data.butir) {
  const f = MODEL[b.id]; ok(f, `${b.id}: model tidak ada`);
  const m = (M[b.id] = f());
  bukti[b.id] = { ...m.bukti };
  ok(b.alasan_kunci && b.kerangka && b.to_terdekat && b.kalimat_penentu && b.jenis && b.bentuk && b.catatan_reviu, `${b.id}: field wajib`);
  for (const w of m.wajib ?? []) ok(soalTeks(b).includes(w), `${b.id}: teks soal tanpa "${w}"`);
  if (b.peran === "bukti") {   // Latihan Bukti: tanpa pilihan; contoh jawaban + syarat jawaban sah
    ok(!b.opsi && b.contoh_jawaban && b.syarat_jawaban && !b.target_detik, `${b.id}: Latihan Bukti`);
    if (m.contoh) for (const w of m.contoh) ok(b.contoh_jawaban.includes(`${w.j}`) && b.contoh_jawaban.includes(`${w.m}`), `${b.id}: contoh jawaban ≠ model`);
    continue;
  }
  const Hs = Object.keys(b.opsi);
  ok(Hs.join("") === (m.empat ? "ABCD" : "ABCDE"), `${b.id}: huruf pilihan`);
  for (const h of Hs) ok(b.opsi[h] === m.teks[h], `${b.id} ${h}: data "${b.opsi[h]}" ≠ model "${m.teks[h]}"`);
  ok(b.kunci === m.kunci, `${b.id}: kunci data ${b.kunci} ≠ model ${m.kunci}`);
  for (const h of Hs) ok(b.kode[h] === m.kode[h], `${b.id} ${h}: kode data ${b.kode[h]} ≠ model ${m.kode[h]}`);
  for (const h of Hs.filter((x) => x !== b.kunci)) ok(KODE.has(b.kode[h]) && b.nama[h], `${b.id} ${h}: kode/nama`);
  ok(new Set(Hs.map((h) => b.opsi[h])).size === Hs.length, `${b.id}: pilihan kembar`);
  if (m.urut) bukti[b.id].bentuk = ujiAngka(b.id, m.nilai, b.kunci);
  if (m.urutan) bukti[b.id].urutan = m.urutan.join(" · ");
}
function soalTeks(b) { const s = b.soal; return [s.pengantar, ...(s.pernyataan ?? []), ...(s.syarat ?? []), s.tanya].filter(Boolean).join(" "); }

// ════════ 2. bentuk pilihan ════════
const BAKU = (b) => M[b.id].urutan || M[b.id].empat || M[b.id].urut;   // bunyi templat Pilar 5 / PKU / pilihan angka: dinilai aturan lain
const NAMA = /\b(Laras|Maya|Nanda|Oki|Prita|Arif|Bunga|Candra|Dewi|Erlan|Fitri|Andi|Beni|Cahya|Dina|Eva|Farhan|Gani|Hesti|Ilham|Juwita|Kevin|Lestari|Galih|Hana|Irfan|Jihan|Kirana|Lutfi|Mira|Tito|Umar|Vina|Wulan|Yoga|Zahra|Aldi|Bella|Ciko|Dara|Elang|Fani|Galuh|Bogor|Cirebon|Garut|Serang)\b/g;
const pola = (t) => polos(t).replace(NAMA, "@").replace(/\bsurat [A-G]\b/gi, "surat @").replace(/\b(paket|Pustaka) [A-Z][a-z]*\b/g, "$1 @").replace(/\d+/g, "#")
  .replace(/\b(pertama|kedua|ketiga|keempat|kelima|keenam|ketujuh|paling awal)\b/g, "#").replace(/\b(kanan|kiri)\b/g, "~").replace(/\b(Senin|Selasa|Rabu|motor|bus|mobil|kereta)\b/g, "&");
const STOP = new Set("duduk tepat di sebelah dengan yang dan pada hari dari berasal naik surat diarsipkan sebelum bertugas bersama tinggal lantai".split(" "));
const kata = (t) => polos(t).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));
const cermin = (a, c) => { const x = kata(a), y = kata(c); return x.length > 1 && x.join() !== y.join() && [...x].sort().join() === [...y].sort().join(); };
for (const b of PG) {
  if (BAKU(b) || b.jenis.includes("pilih susunan")) continue;
  const Hs = Object.keys(b.opsi), pj = Hs.map((h) => polos(b.opsi[h]).length), k = pj[Hs.indexOf(b.kunci)];
  ok(!(k === Math.max(...pj) && pj.filter((x) => x === k).length === 1), `${b.id}: kunci = pilihan terpanjang (${pj})`);
  ok(!(k === Math.min(...pj) && pj.filter((x) => x === k).length === 1), `${b.id}: kunci = pilihan terpendek (${pj})`);
  const pk = pola(b.opsi[b.kunci]);
  if (!M[b.id].status) ok(Hs.some((h) => h !== b.kunci && pola(b.opsi[h]) === pk), `${b.id}: bentuk kalimat kunci tidak dimiliki pilihan lain ("${pk}")`);   // membaca data: kalimat bebas
  const P = []; for (let i = 0; i < Hs.length; i++) for (let j = i + 1; j < Hs.length; j++) if (cermin(b.opsi[Hs[i]], b.opsi[Hs[j]])) P.push(Hs[i] + Hs[j]);
  ok(!P.some((p) => p.includes(b.kunci)) || P.some((p) => !p.includes(b.kunci)), `${b.id}: kunci di pasangan cermin tunggal (${P})`);
  bukti[b.id].pola = pk;
}
// sebaran kunci kelompok (urutan buku, Latihan Bukti tanpa huruf)
const seq = PG.map((b) => b.kunci);
ok(!/(.)\1\1/.test(seq.join("")), `kunci sama > 2 berturut (${seq.join("")})`);
const hit = Object.fromEntries(H.map((h) => [h, seq.filter((x) => x === h).length]));
ok(Math.max(...Object.values(hit)) - Math.min(...Object.values(hit)) <= 1, `sebaran kunci tidak seimbang ${JSON.stringify(hit)}`);
// rujukan Latihan A Bab 19: pilihan berkode itu harus ada di soal rujukan
for (const [id, kode] of [["HB-TIU-B11-L01", "J-ASUMSI"], ["HB-TIU-B11-L05", "J-ULANG"], ["HB-TIU-B12-L03", "J-MUNGKIN"]])
  ok(Object.values(data.butir.find((b) => b.id === id).kode).includes(kode), `${id}: rujukan Bab 19 butuh ${kode}`);

// ════════ 3. bahasa + pembahasan ════════
const LARANGAN = ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus",
  "tidak hanya", "dibedah", "jebakan", "pengecoh", "stem", "distraktor", "konstruk", "kutub", "hots", "level", "kode", "kok", "nggak", "enggak", "di era", "maka", "karena itu"];
const tok = (s) => (polos(fr(s)).replace(/\b\d{2}\.\d{2}\b/g, (x) => ` ${x.replace(".", "·")} `).match(/\d+(?:\.\d{3})*(?:,\d+)?|\d{2}·\d{2}/g) || []);
const NUM = String.raw`(?:\d[\d.,]*(?:\s?\{\d+\/\d+\})?|\{\d+\/\d+\})%?`;
const E = String.raw`[−(]*${NUM}\)*(?:\s+[×:+−]\s+[−(]*${NUM}\)*)*`;
const RANTAI = new RegExp(`${E}(?:\\s*=\\s*${E})+`, "g");
const SMALL = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "100"]);
let rantai = 0;
const HILANG = [];
const TABEL = Object.fromEntries(Object.entries(SRC).map(([k, f]) => [k, namaTabel(readFileSync(join(AKAR, f), "utf8"))]));
// ponytail: nama kekeliruan latihan yang belum punya baris di tabel bab (jalurnya tidak terwakili nama tabel) — menunggu putusan Gusti (T6)
const NAMA_LUAR = new Set(["B12-L04 A", "B12-L04 D", "B13-L01 B", "B13-L01 E"]);
function ujiTeks(b, teks, boleh, cekToken) {
  const t0 = fr(teks).replace(/<span class="fr"><sup>(\d+)<\/sup>⁄<sub>(\d+)<\/sub><\/span>/g, "{$1/$2}").replace(/<[^>]+>/g, "");
  if (!cekToken) for (const ch of t0.matchAll(RANTAI)) {
    const imbang = (x) => { const c = (k) => x.split(k).length - 1; while (x.startsWith("(") && c("(") > c(")")) x = x.slice(1); while (x.endsWith(")") && c(")") > c("(")) x = x.slice(0, -1); return x.trim(); };
    const sisi = ch[0].split(/\s*=\s*/).map((x) => imbang(x.replace(/[.,]$/, "").trim()));
    if (sisi.some((x) => !/[×:+−]/.test(x)) && sisi.every((x) => !/[×:+−]/.test(x))) continue;   // "a = 5" bukan rantai hitung
    const v = sisi.map((x) => { try { return hitung(x); } catch { return null; } });
    ok(v.every(Boolean), `${b.id}: rantai hitung tidak terbaca "${ch[0]}"`);
    ok(v.every((x) => x.eq(v[0])), `${b.id}: hitungan salah "${ch[0]}"`);
    rantai++;
    for (const s of sisi) for (const k of tok(s)) boleh.add(k);
  }
  else for (const k of tok(teks)) { n++; if (!boleh.has(k) && !SMALL.has(k)) HILANG.push(`${b.id.slice(7)} "${k}"`); }
}
for (const b of data.butir) {
  const m = M[b.id];
  const siswa = [b.soal, b.opsi ?? {}, b.nama ?? {}, b.pembahasan ?? {}].map((x) => JSON.stringify(x)).join(" ").toLowerCase();
  for (const k of LARANGAN) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(siswa), `${b.id}: kata terlarang "${k}"`);
  ok(!/\bj-[a-z]+|\bjf-|\bk[1-7]\b/i.test(siswa), `${b.id}: kode bocor ke teks siswa`);
  const guru = [b.jenis, b.bentuk, b.kerangka, b.to_terdekat, b.catatan_reviu, b.alasan_kunci, b.contoh_jawaban, b.syarat_jawaban].join(" ").toLowerCase();
  for (const k of ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus", "di era", "tidak hanya", "kok", "nggak", "enggak"]) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(guru), `${b.id}: kata terlarang di catatan pengajar "${k}"`);
  const P = b.pembahasan, Hs = b.opsi ? Object.keys(b.opsi) : [];
  ok(P && ["ditanya", "cepat", "lain", "cek", "kunci", "analogi", "waspada"].every((k) => P[k]), `${b.id}: 7 langkah lengkap`);
  ok(/[“"]/.test(P.ditanya), `${b.id}: kalimat penentu dikutip di Inti pertanyaan`);
  if (b.peran === "bukti") {   // T6: Latihan Bukti → jawaban yang belum sah (nama tabel bab) + contoh jawaban sah
    ok(P.salah?.length >= 2 && P.salah.every((x) => x.nama && x.uji && x.teks && TABEL[b.bab].has(kutip(x.nama))), `${b.id}: jawaban belum sah (nama tabel Bab ${b.bab})`);
    ok((m.contoh ?? []).every((w) => P.kunci.includes(`${w.j} permen jahe dan ${w.m} permen mint`)) && /40%|sah/.test(P.kunci), `${b.id}: contoh jawaban ≠ model`);
  } else {
    ok(Hs.filter((h) => h !== b.kunci).every((h) => P.gugur[h]?.teks && P.gugur[h]?.uji) && !P.gugur[b.kunci], `${b.id}: gugur tiap pilihan salah`);
    ok(P.kunci.split(/(?<=[.!?])\s+(?=[A-Z])/).length <= 2, `${b.id}: alasan kunci terlalu panjang`);
  }
  if (b.peran === "latihan") for (const h of Hs.filter((x) => x !== b.kunci))   // T6: nama kekeliruan latihan = tabel bab
    ok(TABEL[b.bab].has(kutip(b.nama[h])) !== NAMA_LUAR.has(`${b.id.slice(7)} ${h}`), `${b.id} ${h}: nama "${b.nama[h]}" ${NAMA_LUAR.has(`${b.id.slice(7)} ${h}`) ? "sudah ada di tabel (hapus dari NAMA_LUAR)" : `tidak ada di tabel kekeliruan Bab ${b.bab}`}`);
  const tb = m.tabelSoal ? m.tabelSoal.baris.flat().join(" ") : "";
  const boleh = new Set([...tok(soalTeks(b)), ...Object.values(b.opsi ?? {}).flatMap(tok), ...(m.angka ?? []).flatMap(tok), ...tok(tb), ...tok(b.contoh_jawaban ?? "")]);
  const teksP = Object.entries(P).flatMap(([k, v]) => (k === "gugur" ? Object.values(v).flatMap((g) => [g.teks, g.uji]) : k === "salah" ? v.flatMap((g) => [g.teks, g.uji]) : [v]));
  for (const t of teksP) ujiTeks(b, t, boleh, false);
  for (const t of teksP) ujiTeks(b, t, boleh, true);
}
ok(HILANG.length === 0, `angka pembahasan tidak berasal dari soal/pilihan/model/rantai hitung: ${HILANG.join(", ")}`);

// ════════ 4. render ════════
const jam = '<svg class="ico"><use href="#jam"/></svg>';
const urut = (id) => +id.slice(-2);
const label = (b) => ({ pembuka: "Pertanyaan Pembuka", contoh: `Contoh ${urut(b.id)}`, latihan: `Latihan ${urut(b.id)}`, bukti: `Latihan Bukti ${urut(b.id)}` })[b.peran];
const tabelHTML = (t) => (t ? `<table class="tb soal-data"><thead><tr>${t.kepala.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${t.baris.map((r) => `<tr>${r.map((x, i) => `<td${i ? ' class="n"' : ""}>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>` : "");
function stem(b, m) {
  let sudah = false;
  const tandai = (t) => { if (sudah || !t.includes(b.kalimat_penentu)) return esc(t); sudah = true; return esc(t).replace(esc(b.kalimat_penentu), `<mark>${esc(b.kalimat_penentu)}</mark>`); };
  const s = b.soal, out = [];
  if (s.pengantar) out.push(`<p class="stem">${tandai(s.pengantar)}</p>`);
  const tb = tabelHTML(m.tabelSoal); if (tb) out.push(tb);
  if (s.syarat) out.push(`<dl class="premis syarat">${s.syarat.map((t, i) => `<div><dt>${i + 1}.</dt><dd>${tandai(t)}</dd></div>`).join("")}</dl>`);
  if (s.pernyataan) out.push(`<dl class="premis">${s.pernyataan.map((t, i) => `<div><dt>(${i + 1})</dt><dd>${tandai(t)}</dd></div>`).join("")}</dl>`);
  out.push(`<p class="stem">${tandai(s.tanya)}</p>`);
  ok(sudah, `${b.id}: kalimat penentu "${b.kalimat_penentu}" tidak ditemukan di soal`);
  return out.join("\n    ");
}
const pendek = (b) => Object.values(b.opsi).every((x) => polos(x).length <= 11);
const kodeTeks = (b) => Object.keys(b.opsi).map((h) => `${h} ${b.kode[h] === "kunci" ? "<b>kunci</b>" : b.kode[h]}`).join(" · ");
const ringkasBukti = (id) => bukti[id].metode + (bukti[id].bentuk ? `. Jarak kunci ke pilihan terdekat ${String(bukti[id].bentuk.jarak).replace(".", ",")}, median jarak ${String(bukti[id].bentuk.median).replace(".", ",")}.` : ".");
function blok(b) {
  const m = M[b.id];
  const g = b.peran === "bukti"
    ? `<div class="guru"><b>${esc(b.jenis)}, ${esc(b.bentuk)}.</b> Contoh jawaban: ${esc(b.contoh_jawaban)} Syarat jawaban sah: ${esc(b.syarat_jawaban)} Kerangka: ${esc(b.kerangka)}. TO terdekat: ${esc(b.to_terdekat)}. Bukti: ${esc(ringkasBukti(b.id))} ${esc(b.catatan_reviu)}</div>`
    : `<div class="guru"><b>${esc(b.jenis)}, ${esc(b.bentuk)}.</b> Kunci ${b.kunci}. Kode: ${kodeTeks(b)}. Kerangka: ${esc(b.kerangka)}. TO terdekat: ${esc(b.to_terdekat)}. Bukti: ${esc(ringkasBukti(b.id))} ${esc(b.catatan_reviu)}</div>`;
  const Hs = b.opsi ? Object.keys(b.opsi) : [];
  const opsi = !b.opsi ? "" : pendek(b)
    ? `<div class="opsi5">${Hs.map((h) => `<div><span class="h">${h}</span><b>${esc(b.opsi[h])}</b></div>`).join("")}</div>`
    : `<ol class="opsiv">${Hs.map((h) => `<li><span class="h">${h}</span><span>${esc(b.opsi[h])}</span></li>`).join("")}</ol>`;
  const waktu = b.target_detik ? `<span class="waktu">${jam}Target ${b.target_detik} detik</span>` : `<span class="waktu">Tanpa pilihan</span>`;
  const soal = `  <div class="soal">
    <div class="meta"><span>${label(b)}</span>${waktu}</div>
    ${stem(b, m)}${opsi ? `\n    ${opsi}` : ""}
  </div>
  ${g}`;
  let bahas = "";
  if (b.pembahasan) {
    const P = b.pembahasan, salah = Hs.filter((h) => h !== b.kunci), bukti = b.peran === "bukti";
    const gugur = bukti
      ? `<div class="gugur vb"><b class="lbl">Jawaban yang belum sah</b>${P.salah.map((x, i) => `<div class="g"><span class="h">${i + 1}</span><div class="x"><span class="uji">${esc(x.uji)}</span><b>${x.nama}.</b> ${esc(x.teks)}</div></div>`).join("")}</div>`
      : `<div class="gugur vb"><b class="lbl">Pilihan yang gugur</b>${salah.map((h) => `<div class="g"><span class="h">${h}</span><div class="x"><span class="uji">${esc(P.gugur[h].uji)}</span><b>${b.nama[h]}.</b> ${esc(P.gugur[h].teks)}</div></div>`).join("")}</div>`;
    const jwb = bukti ? `<div class="jwb"><p><b>Contoh jawaban sah.</b> ${esc(P.kunci)}</p></div>` : `<div class="jwb"><span>${b.kunci}</span><p><b>Jawaban: ${b.kunci}.</b> ${esc(P.kunci)}</p></div>`;
    bahas = `
  <div class="kotak inti"><b class="lbl">Inti pertanyaan</b><p>${esc(P.ditanya)}</p></div>
  <div class="kotak langkah"><b class="lbl">Langkah penyelesaian</b><dl class="tahap">
    <div><dt>Cara cepat</dt><dd>${esc(P.cepat)}</dd></div>
    <div><dt>Cara lain</dt><dd>${esc(P.lain)}</dd></div>
    <div><dt>Cek balik</dt><dd>${esc(P.cek)}</dd></div>
  </dl></div>
  ${gugur}
  ${jwb}
  <div class="duo"><div class="il"><b>Ilustrasi</b><span>${esc(P.analogi)}</span></div><div><b>Kekeliruan yang Mungkin Terjadi</b><span>${esc(P.waspada)}</span></div></div>`;
  }
  const t = b.id.replace("HB-TIU-", ""), attr = b.target_detik ? ` data-target="${b.target_detik}"` : "";
  if (b.peran === "latihan" || b.peran === "bukti") {   // T6: pembahasan di Lampiran B (soal diulang tanpa catatan pengajar) + tautan dua arah
    LB[b.bab].push(potongan(t, soal.replace(g, "").trimEnd().replace(`<span>${label(b)}</span>`, () => `<span>Bab ${b.bab} · ${label(b)}</span>`), bahas));
    return `<!--${t}:mulai-->\n<div data-soal="${b.id}"${attr}>\n${soal.replace(`<span>${label(b)}</span>`, () => keBahas(label(b), t))}\n</div>\n<!--${t}:selesai-->`;
  }
  if (b.peran === "pembuka") return [`<!--${t}:mulai-->\n<div data-soal="${b.id}"${attr}>\n${soal.replace(`<span>${label(b)}</span>`, () => `<span id="soal-${t}">${label(b)}<a class="ke" href="#bahas-${t}">Lihat pembahasan</a></span>`)}\n</div>\n<!--${t}:selesai-->`,
    `<!--${t}-bahas:mulai-->\n  <h3 id="bahas-${t}">Pembahasan Pertanyaan Pembuka</h3>\n<div class="bahas-pembuka">\n${soal.replace(g, "").trimEnd()}${bahas}\n  <p class="balik"><a class="ke" href="#soal-${t}">Kembali ke soal</a></p>\n</div>\n<!--${t}-bahas:selesai-->\n\n`];
  return `<!--${t}:mulai-->\n<div data-soal="${b.id}"${attr}>\n${soal}${bahas}\n</div>\n<!--${t}:selesai-->`;
}
let beda = 0;
const LB = { 11: [], 12: [], 13: [] };
for (const bab of [11, 12, 13]) {
  const f = join(AKAR, SRC[bab]);
  let html = readFileSync(f, "utf8");
  for (const b of data.butir.filter((x) => x.bab === bab)) {
    const t = b.id.replace("HB-TIU-", "");
    let baru = blok(b);
    if (Array.isArray(baru)) {
      const [soalP, bahasP] = baru; baru = soalP;
      const ada = new RegExp(`<!--${t}-bahas:mulai-->[\\s\\S]*?<!--${t}-bahas:selesai-->\\n\\n`), CT = "  <h3>Contoh Soal dan Pembahasan</h3>";
      if (ada.test(html)) { if (html.match(ada)[0] !== bahasP) beda++; html = html.replace(ada, () => bahasP); }
      else { ok(html.split(CT).length === 2, `${b.id}: judul Contoh Soal dan Pembahasan tidak tunggal di ${SRC[bab]}`); beda++; html = html.replace(CT, () => bahasP + CT); }
    }
    const terisi = new RegExp(`<!--${t}:mulai-->[\\s\\S]*?<!--${t}:selesai-->`);
    const kosong = new RegExp(`  <div class="slot" data-slot="${b.id}"${b.target_detik ? ` data-target="${b.target_detik}"` : ""}>[\\s\\S]*?<div class="guru">[\\s\\S]*?</div>\\n  </div>`);
    if (terisi.test(html)) { if (html.match(terisi)[0] !== baru) beda++; html = html.replace(terisi, () => baru); }
    else { ok(kosong.test(html), `${b.id}: slot kosong (target ${b.target_detik}) tidak ditemukan di ${SRC[bab]}`); beda++; html = html.replace(kosong, () => baru); }
  }
  if (TULIS) writeFileSync(f, html);
}
if (!lampiranB(AKAR, "B11-13", [11, 12, 13].map((bab) => [`Bab ${bab} · ${judulBab(readFileSync(join(AKAR, SRC[bab]), "utf8"))}`, LB[bab]]), TULIS)) beda++;
ok(TULIS || beda === 0, `${beda} blok src berbeda dari hasil render (jalankan --tulis)`);

if (TULIS) {
  for (const b of data.butir) b.bukti = bukti[b.id];
  writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  // teks buta: pangkat x², entitas dibuka, tag dibuang; tabel dari model; tanpa kunci/kode/nama/pembahasan
  const SUP = { 2: "²", 3: "³" };
  const bersih = (t) => String(t ?? "").replace(/<sup>(\d)<\/sup>/g, (_, d) => SUP[d] ?? `^${d}`).replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  const plain = (b) => ({ id: b.id, bab: b.bab, target_detik: b.target_detik ?? undefined, soal: { pengantar: bersih(b.soal.pengantar) || undefined, tabel: M[b.id].tabelSoal ?? undefined,
    syarat: b.soal.syarat?.map(bersih), pernyataan: b.soal.pernyataan?.map(bersih), tanya: bersih(b.soal.tanya) }, opsi: b.opsi ? Object.fromEntries(Object.entries(b.opsi).map(([h, v]) => [h, bersih(v)])) : undefined });
  writeFileSync(BUTA, JSON.stringify(data.butir.map(plain), null, 2) + "\n");
} else for (const b of data.butir) ok(JSON.stringify(b.bukti) === JSON.stringify(bukti[b.id]), `${b.id}: field bukti usang (jalankan --tulis)`);

console.log(`soal_kck: semua assert lulus · ${n} butir dicek · 31 soal (29 pilihan ganda + 2 Latihan Bukti) · ${rantai} rantai hitung pembahasan · kunci ${seq.join("")} · ${JSON.stringify(hit)}${TULIS ? " · src + data + buta ditulis" : ""}`);
