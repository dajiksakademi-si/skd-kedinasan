// Handbook TIU · Bab 6 · Contoh 1 (slot C1 laporan tahap2_C_numerik.md). Izin Gusti 2026-10-30: satu soal ini saja.
// Revisi 1 (cek buta 2026-10-30): versi 2,875 × 2.120 gugur karena apit 2,75–3 sudah menyisakan kunci saja.
// Pembuat + pemeriksa: semua angka dihitung di sini; satu assert gagal = berhenti, berkas tidak ditulis.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/contoh_bab6_c1.mjs
//   → scripts/data/bab6_c1.json, scripts/data/bab6_c1_buta.json, blok C1 di prototipe/gaya_halaman_tiu.html
// PDF (cara Handbook TWK/TKP):
//   NODE_PATH=~/.npm/_npx/7d92d9a2d2ccc630/node_modules node "../HANDBOOK TKP D AJIKS AKADEMI/prototipe/buat_pdf.js" \
//     prototipe/gaya_halaman_tiu.html prototipe/gaya_halaman_tiu.pdf
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const TO = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/paket/paket-1/paket_tiu_1.json");
const HTML = join(AKAR, "prototipe/gaya_halaman_tiu.html");
const HURUF = "ABCDE";

const fmt = (n) => (n < 0 ? "−" : "") + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const angka = (s) => [...String(s)].filter((c) => /\d/.test(c)).map(Number);
const jumlahAngka = (s) => angka(s).reduce((x, y) => x + y, 0);
const jA = (s) => angka(s).join(" + ");
const fr = (a, b) => `<span class="fr"><sup>${a}</sup>⁄<sub>${b}</sub></span>`;  // pecahan sebaris, garis miring U+2044
const campuran = (w, a, b) => `${w} ${fr(a, b)}`;
const des = (n, k) => { const s = String(n).padStart(k + 1, "0"); return `${s.slice(0, -k)},${s.slice(-k)}`.replace(/,?0+$/, ""); };
const kaliD = (d, k, n) => { assert.equal((d * n) % 10 ** k, 0, `${d}e-${k} × ${n} tidak bulat`); return (d * n) / 10 ** k; };

// ── 1. Soal: desimal × bilangan, N kelipatan penyebut, hasil bulat ──
const D = "3,975", N = 1400;
const [bulat, koma] = D.split(","), K = koma.length, d = Number(bulat + koma);   // d = 3975 (×10⁻³)
const g = gcd(d, 10 ** K);
const p = d / g, q = 10 ** K / g;                                 // 159/40
const w = Math.floor(p / q), a = p % q, c = w + 1;                // 3 39/40, bilangan bulat terdekat di atas: 4
assert.ok(N % q === 0, "N harus kelipatan penyebut");
const m = N / q;                                                  // 35
const KUNCI = p * m;
assert.equal(BigInt(d) * BigInt(N), BigInt(KUNCI) * 10n ** BigInt(K), "kunci ≠ hasil tepat");
const soal = `<mark>Hasil dari</mark> ${D} × ${fmt(N)} adalah …`;
const sisih = (q - a) * m;                                        // 0,025 × 1.400 = 35
const e = des(10 ** K - Number(koma), K);                         // "0,025"
const d2 = Math.round(d / 10);                                    // 3,975 → 3,98 (398 ×10⁻²)

// ── 2. Jalur salah: tiap pengecoh = satu kekeliruan bernama, nilainya dari fungsi ──
const persen = des(10 ** K - Number(koma), K - 2);                // 0,025 dibaca 2,5%
const jalur = [
  { kode: "J-BASIS", fungsi: "selisihDibacaPersen", nilai: c * a * m,      // 4 × (1 − 2,5%) × N
    nama: "Persen dihitung dari bilangan yang salah.",
    teks: `${D} dibaca “${c} dikurangi ${persen}%”, sehingga yang dikurangkan ${persen}% × ${fmt(c * N)} = ${fmt(c * N - c * a * m)}. Padahal ${e} adalah selisih dari ${c}; yang dikurangkan cukup ${e} × ${fmt(N)} = ${sisih}.` },
  { kode: "J-SEDERHANA", fungsi: "campuranKeliru", nilai: (w * a + q) * m,
    nama: "Pecahan campuran diubah dengan keliru.",
    teks: `${campuran(w, a, q)} ditulis (${w} × ${a} + ${q}) : ${q} = ${fr(w * a + q, q)}, lalu ${w * a + q} × ${m} = ${fmt((w * a + q) * m)}. Bilangan bulat dikalikan penyebut: (${w} × ${q} + ${a}) : ${q} = ${fr(p, q)}.` },
  { kode: "J-BULAT", fungsi: "bulatDuaDesimal", nilai: kaliD(d2, K - 1, N),
    nama: "Desimal dibulatkan sebelum dihitung.",
    teks: `${D} dibulatkan menjadi ${des(d2, K - 1)} agar bisa dihitung ${c} − ${des(c * 10 ** (K - 1) - d2, K - 1)}: ${fmt(c * N)} − ${fmt(c * N - kaliD(d2, K - 1, N))} = ${fmt(kaliD(d2, K - 1, N))}. Selisih ${des(d2 * 10 - d, K)} ikut terbuang.` },
  { kode: "J-LANGKAH", fungsi: "lupaMengurangi", nilai: c * N,
    nama: "Berhenti satu langkah sebelum selesai.",
    teks: `${fmt(c * N)} belum dikurangi ${e} × ${fmt(N)} = ${sisih}.` },
];

// ── 3. Opsi urut naik + kunci tunggal ──
const opsi = [{ nilai: KUNCI, kode: null }, ...jalur].sort((x, y) => x.nilai - y.nilai);
assert.equal(new Set(opsi.map((o) => o.nilai)).size, 5, "opsi kembar");
assert.ok(opsi.every((o) => Number.isInteger(o.nilai) && o.nilai > 0), "opsi harus bilangan bulat positif");
const KH = HURUF[opsi.findIndex((o) => o.kode === null)];
assert.equal(KH, "C", "kunci rencana C");
assert.equal(opsi.filter((o) => BigInt(o.nilai) * 10n ** BigInt(K) === BigInt(d) * BigInt(N)).length, 1, "kunci tidak tunggal");
const H = Object.fromEntries(opsi.map((o, i) => [HURUF[i], o]));
const huruf = (arr) => arr.map((o) => HURUF[opsi.indexOf(o)]).join(", ").replace(/, ([^,]+)$/, " dan $1");

// ── 4. Syarat (slot C1 + koreksi cek buta) ──
// (a) taksiran wajar: apit satu desimal [3,9; 4] dan apit perempat [3,75; 4] — tiap apit menyisakan ≥ 3 opsi
const apit = (lo, hi) => opsi.filter((o) => o.nilai * 10 ** K > lo * N && o.nilai * 10 ** K < hi * N);   // lo, hi dalam ×10⁻ᴷ
const step1 = 10 ** (K - 1), stepQ = 10 ** K / 4;
const lo1 = Math.floor(d / step1) * step1, hi1 = Math.ceil(d / step1) * step1;
const loQ = Math.floor(d / stepQ) * stepQ, hiQ = Math.ceil(d / stepQ) * stepQ;
const S1 = apit(lo1, hi1), SQ = apit(loQ, hiQ);
assert.ok(S1.length >= 3 && S1.length < 5, `apit satu desimal menyisakan ${S1.length}`);
assert.ok(SQ.length >= 3, `apit perempat menyisakan ${SQ.length}`);
const BAWAH = kaliD(lo1, K, N), ATAS = kaliD(hi1, K, N);           // 5.460 dan 5.600
// pilihan terdekat di bawah patokan bulat 4 × N bukan kunci (tebakan "sedikit di bawah 5.600" gagal)
assert.notEqual(opsi.filter((o) => o.nilai < c * N).at(-1).kode, null, "kunci = opsi terdekat di bawah c × N");
// (b) angka satuan dari p × m, diterapkan pada sisa taksiran: ≥ 2 tersisa, ≥ 1 gugur
const SATUAN = ((p % 10) * (m % 10)) % 10;
assert.equal(SATUAN, KUNCI % 10);
const S2 = S1.filter((o) => o.nilai % 10 === SATUAN);
assert.ok(S2.length >= 2 && S2.length < S1.length, `uji satuan menyisakan ${S2.length} dari ${S1.length}`);
// (c) sisa 9 dari angka soal (koma diabaikan) menyisakan tepat kunci, dari kelima opsi
const rD = jumlahAngka(D) % 9, rN = jumlahAngka(N) % 9, SISA = (rD * rN) % 9;
assert.equal(SISA, KUNCI % 9);
for (const j of jalur) assert.notEqual((j.nilai - KUNCI) % 9, 0, `selisih ${j.nilai} − kunci kelipatan 9`);
assert.deepEqual(opsi.filter((o) => o.nilai % 9 === SISA).map((o) => o.nilai), [KUNCI], "uji sisa 9 harus menyisakan satu opsi");
// (d) pencilan v0.4.3: jarak kunci ke opsi terdekat ≤ median jarak antaropsi bertetangga
const jarak = opsi.slice(1).map((o, i) => o.nilai - opsi[i].nilai);
const urut = [...jarak].sort((x, y) => x - y), t = urut.length >> 1;
const median = urut.length % 2 ? urut[t] : (urut[t - 1] + urut[t]) / 2;
const dekat = Math.min(...jalur.map((j) => Math.abs(j.nilai - KUNCI)));
assert.ok(dekat <= median, `kunci pencilan: jarak ${dekat} > median ${median}`);
// (e) tidak semua opsi kelipatan N/q (pola itu membocorkan langkah "bagi q"), jarak tidak seragam
const fpb = opsi.map((o) => o.nilai).reduce(gcd);
assert.ok(fpb < m && new Set(jarak).size > 1, `opsi berpola: FPB ${fpb}, jarak ${jarak}`);
// revisi 2 (Gusti 2026-10-31): pembahasan memakai cara cepat c × N − selisih; label tiap pengecoh = berapa yang dikurangkan dari c × N
assert.ok(opsi.every((o) => o.nilai <= c * N), "semua opsi harus ≤ c × N");
const uji = (o) => (o.nilai === c * N ? "Tidak dikurangi" : `Dikurangi ${fmt(c * N - o.nilai)}`);
assert.equal(c * N - KUNCI, sisih, "kunci = c × N − selisih");
// cara lain: N = 1.000 + sisanya
assert.ok(N > 1000);
const ribu = kaliD(d, K, 1000), sisaN = kaliD(d, K, N - 1000);
assert.equal(ribu + sisaN, KUNCI);

// ── 5. Beda dari TO Paket 1 TIU ──
const to = JSON.parse(readFileSync(TO, "utf8")).butir;
const toHit = to.filter((b) => b.keluarga === "HIT");
assert.ok(toHit.length && toHit.every((b) => /paling mendekati/.test(b.soal)), "HIT TO harus berbentuk perkiraan");
assert.ok(!to.some((b) => /^Hasil dari [\d.]+,\d+ × [\d.]+/.test(b.soal)), "TO memuat kerangka desimal × bilangan tepat");
assert.ok(!to.some((b) => Object.values(b.opsi).includes(fmt(KUNCI))), "kunci muncul di TO");

// ── 6. Angka halaman 1 (pembuka, konsep inti, Catatan) ──
assert.ok(30 * 60 < 37 * 64 && 37 * 64 < 40 * 70 && 37 * 64 === 2368 && (7 * 4) % 10 === 2368 % 10 && ((37 % 9) * (64 % 9)) % 9 === 1 && 2368 % 9 === 1);
assert.ok(47 * 38 === 1786 && (7 * 8) % 10 === 6 && 1786 % 10 === 6);
assert.ok(jumlahAngka(47) === 11 && 11 % 9 === 2 && jumlahAngka(38) === 11 && (2 * 2) % 9 === 1786 % 9 && jumlahAngka(1786) === 22 && 22 % 9 === 4);
assert.ok(jumlahAngka(5732) === 17 && 17 % 9 === 8 && 5732 % 9 === 8);
assert.ok(2368 % 9 === 1 && 2638 % 9 === 1 && 23680 % 9 === 1 && (2638 - 2368) % 9 === 0 && (23680 - 2368) % 9 === 0);
const halaman1 = ["37 × 64", "1.800", "2.800", "7 × 4 = 28", "2.368", "47 × 38", "56", "1.786", "4 + 7 = 11", "3 + 8 = 11",
  "1 + 7 + 8 + 6 = 22", "5.732", "5 + 7 + 3 + 2 = 17", "2.638", "23.680"];

// ── 7. Pembahasan 7 langkah (angka dari variabel di atas) ──
const lolos = S2.filter((o) => o.kode);                           // pengecoh yang lolos satuan, gugur di sisa 9
const bahas = {
  ditanya: `Soal menanyakan nilai tepat ${D} × ${fmt(N)}. Kalimat penentunya “Hasil dari”: tidak tertulis “paling mendekati”, jadi jawaban harus sama persis, padahal pilihan yang bersebelahan hanya berselisih ${Math.min(...jarak)} sampai ${Math.max(...jarak)}.`,
  cepat: `${D} = ${c} − ${e}. Hitung ${c} × ${fmt(N)} = ${fmt(c * N)}, lalu ${e} × ${fmt(N)} = ${sisih}. Hasilnya ${fmt(c * N)} − ${sisih} = ${fmt(KUNCI)}.`,
  lain: `${fmt(N)} = 1.000 + ${fmt(N - 1000)}. Hitung ${D} × 1.000 = ${fmt(ribu)} dan ${D} × ${fmt(N - 1000)} = ${fmt(sisaN)}, lalu jumlahkan: ${fmt(ribu)} + ${fmt(sisaN)} = ${fmt(KUNCI)}.`,
  cek: `Sisa pembagian oleh 9, koma diabaikan: ${fmt(d)} bersisa ${rD} (${jA(D)} = ${jumlahAngka(D)}) dan ${fmt(N)} bersisa ${rN}, jadi hasilnya bersisa ${rD * rN}, yaitu ${SISA}. ${fmt(KUNCI)} juga bersisa ${SISA} (${jA(KUNCI)} = ${jumlahAngka(KUNCI)}). Cocok.`,
  kunci: `Hasilnya ${sisih} di bawah ${fmt(c * N)}, yaitu ${fmt(KUNCI)}, dan sisa pembagiannya oleh 9 cocok.`,
  analogi: `Seperti membeli barang seharga Rp${fmt(d)} dengan uang Rp${fmt(c * 10 ** K)}: kamu menerima kembalian Rp${fmt(c * 10 ** K - d)}. Membeli ${fmt(N)} barang berarti membayar ${fmt(N)} × Rp${fmt(c * 10 ** K)}, lalu menerima kembalian ${fmt(N)} × Rp${fmt(c * 10 ** K - d)}. Harga totalnya Rp${fmt(d * N)}.`,
  waspada: `Melihat ${D} hampir ${c}, lalu memilih pilihan terdekat di bawah ${fmt(c * N)}. Pilihan itu ${fmt(H.D.nilai)}, hasil dari ${des(d2, K - 1)}, bukan ${D}. Selisih ${des(d2 * 10 - d, K)} memang kecil, tetapi soal meminta hasil tepat.`,
  gugur: Object.fromEntries(opsi.filter((o) => o.kode).map((o) => [HURUF[opsi.indexOf(o)], { nama: o.nama, teks: o.teks, uji: uji(o) }])),
};
assert.equal(KUNCI / m, p);
assert.equal(H.D.kode, "J-BULAT", "Kekeliruan yang Mungkin Terjadi merujuk pilihan D");

// ── 8. Bahasa (root CLAUDE.md + memory wording): frasa terlarang, istilah dapur, maka/karena itu ≤ 1 ──
const semua = JSON.stringify(bahas).replace(/<[^>]+>/g, " ").toLowerCase();
const LARANGAN = ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya",
  "sekaligus", "tidak hanya", "dibedah", "jinak", "jebakan", "stem", "distraktor", "hots", "level", "kok", "nggak"];
for (const k of LARANGAN) assert.ok(!new RegExp(`\\b${k}\\b`).test(semua), `frasa terlarang: ${k}`);
assert.ok(!/\bj-[a-z]+|\bjf-/i.test(semua), "kode kesalahan bocor ke pembahasan siswa");
assert.ok((semua.match(/\bmaka\b|karena itu/g) || []).length <= 1, "maka/karena itu > 1");

// ── 9. Keluaran ──
const butir = {
  id: "HB-TIU-B06-C01", bab: 6, slot: "contoh", urut: 1, subbagian: "Angka Satuan dan Sisa Pembagian oleh Sembilan",
  keluarga: "HIT", bentuk: "desimal-kali-bilangan-rapat", level: "Standar", target_detik: 45, revisi: 2,
  soal: soal.replace(/<[^>]+>/g, ""), kalimat_penentu: "Hasil dari",
  opsi: Object.fromEntries(opsi.map((o, i) => [HURUF[i], fmt(o.nilai)])), kunci: KH,
  pembahasan: bahas,
  reviu: {
    jebakan: Object.fromEntries(opsi.map((o, i) => [HURUF[i], o.kode ?? "kunci"])),
    fungsi: Object.fromEntries(opsi.map((o, i) => [HURUF[i], o.fungsi ?? "p/q × N"])),
    kerangka: "HIT tepat · desimal tiga angka dekat bilangan bulat (per-empat puluh) × bilangan 4 angka, hasil bulat · opsi rapat urut naik · taksiran → satuan → sisa 9 masing-masing menggugurkan · J-BASIS, J-SEDERHANA, J-BULAT, J-LANGKAH",
    catatan_slot: "Laporan C memasang J-NOL; tidak dipakai karena nol/koma bergeser selalu berselisih kelipatan 9 dari kunci (bertentangan dengan syarat sisa 9 pemisah). Revisi 2 (Gusti 2026-10-31): pembahasan diringkas ke cara cepat c × N − selisih (cara tentor), cara lain N = 1.000 + sisa, cek balik sisa 9; taksiran, cara pecahan, dan uji angka satuan dikeluarkan dari pembahasan (uji soal di atas tetap di-assert). Revisi 1 mengganti 2,875 × 2.120 (apit 2,75–3 menyisakan kunci saja; semua opsi kelipatan 265).",
    bukti: {
      metode: `hasil tepat BigInt (${d} × ${N} = ${KUNCI} × ${10 ** K}), tiap opsi dicek; taksiran, satuan, sisa 9, pencilan, FPB opsi di-assert`,
      pecahan: `${p}/${q}`, N_bagi_q: m, satuan_kunci: SATUAN, sisa9_kunci: SISA,
      sisa9_opsi: Object.fromEntries(opsi.map((o, i) => [HURUF[i], o.nilai % 9])),
      satuan_opsi: Object.fromEntries(opsi.map((o, i) => [HURUF[i], o.nilai % 10])),
      tersisa: { taksiran_satu_desimal: S1.map((o) => fmt(o.nilai)), taksiran_perempat: SQ.map((o) => fmt(o.nilai)),
        angka_satuan: S2.map((o) => fmt(o.nilai)), sisa9: [fmt(KUNCI)] },
      jarak_bertetangga: jarak, median_jarak: median, jarak_kunci_terdekat: dekat, fpb_opsi: fpb,
      beda_TO: `TO Paket 1 TIU: ${toHit.length} butir HIT (no. ${toHit.map((b) => b.no).join(", ")}), semuanya "paling mendekati" (perkiraan + akar); tidak ada butir "Hasil dari desimal × bilangan" dan kunci ${fmt(KUNCI)} tidak muncul di opsi TO.`,
    },
  },
};
writeFileSync(join(AKAR, "scripts/data/bab6_c1.json"), JSON.stringify(butir, null, 2) + "\n");
writeFileSync(join(AKAR, "scripts/data/bab6_c1_buta.json"),
  JSON.stringify({ id: butir.id, bab: 6, target_detik: 45, soal: butir.soal, opsi: butir.opsi }, null, 2) + "\n");

// ── 10. Isi blok C1 di prototipe (satu sumber: data di atas) ──
const jam = '<svg class="ico"><use href="#jam"/></svg>';
const blok = `<section class="hal hal2">
  <h3>Contoh Soal dan Pembahasan</h3>
  <div class="soal">
    <div class="meta"><span>Contoh 1</span><span class="waktu">${jam}Target 45 detik</span></div>
    <p class="stem">${soal}</p>
    <div class="opsi5">${opsi.map((o, i) => `<div><span class="h">${HURUF[i]}</span><b>${fmt(o.nilai)}</b></div>`).join("")}</div>
  </div>
  <div class="kotak inti"><b class="lbl">Inti pertanyaan</b><p>${bahas.ditanya}</p></div>
  <div class="kotak langkah"><b class="lbl">Langkah penyelesaian</b><dl class="tahap">
    <div><dt>Cara cepat<small>paling lama 30 detik</small></dt><dd>${bahas.cepat}</dd></div>
    <div><dt>Cara lain</dt><dd>${bahas.lain}</dd></div>
    <div><dt>Cek balik</dt><dd>${bahas.cek}</dd></div>
  </dl></div>
  <div class="gugur"><b class="lbl">Pilihan yang gugur</b>${Object.entries(bahas.gugur).map(([h, x]) =>
    `<div class="g"><span class="h">${h}</span><span class="v">${fmt(H[h].nilai)}<span class="uji">${x.uji}</span></span><div class="x"><b>${x.nama}</b> ${x.teks}</div></div>`).join("")}</div>
  <div class="jwb"><span>${KH}</span><p><b>Jawaban: ${KH}.</b> ${bahas.kunci}</p></div>
  <div class="duo"><div class="il"><b>Ilustrasi</b><span>${bahas.analogi}</span></div><div><b>Kekeliruan yang Mungkin Terjadi</b><span>${bahas.waspada}</span></div></div>
</section>`;
let html = readFileSync(HTML, "utf8");
const teksHal1 = html.split("<!--C1:mulai-->")[0].replace(/<[^>]+>/g, " ");
for (const s of halaman1) assert.ok(teksHal1.includes(s), `angka halaman 1 tidak ada di HTML: ${s}`);
html = html.replace(/<!--C1:mulai-->[\s\S]*<!--C1:selesai-->/, `<!--C1:mulai-->\n${blok}\n<!--C1:selesai-->`);
writeFileSync(HTML, html);

console.log(`soal    : ${butir.soal}`);
console.log(`opsi    : ${Object.entries(butir.opsi).map(([h, v]) => `${h} ${v}`).join(" · ")} · kunci ${KH}`);
console.log(`jalur   : ${opsi.map((o, i) => `${HURUF[i]} ${o.kode ?? "kunci"}`).join(" · ")}`);
console.log(`tersisa : taksiran ${S1.length} (perempat ${SQ.length}) → satuan ${S2.length} → sisa 9: 1 (${fmt(KUNCI)})`);
console.log(`pola    : jarak ${jarak.join("/")} · median ${median} · kunci-terdekat ${dekat} · FPB opsi ${fpb} (N/q = ${m})`);
console.log("semua assert lulus; data + blok HTML ditulis");
