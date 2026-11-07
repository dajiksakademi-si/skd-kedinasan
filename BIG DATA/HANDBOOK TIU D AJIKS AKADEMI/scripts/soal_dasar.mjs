// Handbook TIU · Tahap 6 · contoh soal Bab 1, 2, 19 (T6-5, T6-12; 6 butir) · pemeriksa + perender dari satu sumber data.
// Sumber teks: scripts/data/dasar_b01_02_19.json. Kunci dan nilai pilihan dihitung model di berkas ini:
//   B01-C01 ambang (Kepmen 406/2026) · B01-C02 aturan melompati soal (tabel waktu Bab 1) · B02-C01 dunia himpunan 4 istilah × 4 bacaan
//   B02-C02 orang-hari (pecahan tepat) · B19-C01 dua perubahan persen · B19-C02 semua 120 urutan (pilih() model_ana).
// Bentuk: pilihan angka = ujiAngka (T5-16); pilihan kalimat: kunci bukan terpanjang/terpendek tunggal; sebaran A–E, ≤ 2 berturut.
// Pembahasan (bila ada): 7 langkah, rantai hitung dihitung ulang, larangan kata, "maka"/"karena itu" ≤ 1.
// Pakai: node scripts/soal_dasar.mjs          → memeriksa (src harus sama dengan hasil render)
//        node scripts/soal_dasar.mjs --tulis  → menulis blok src, field bukti, dan berkas buta
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { Q, hitung, ujiAngka, fmt } from "./numerik/alat.mjs";
import { perm } from "./kck/alat_kck.mjs";
import { pilih } from "./kck/model_ana.mjs";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(AKAR, "scripts/data/dasar_b01_02_19.json"), BUTA = join(AKAR, "scripts/data/dasar_b01_02_19_buta.json");
const ENGINE = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md");
const SRC = { 1: "src/11_bab01.html", 2: "src/12_bab02.html", 19: "src/29_bab19.html" };
const TULIS = process.argv.includes("--tulis");
const H = ["A", "B", "C", "D", "E"];
const data = JSON.parse(readFileSync(DATA, "utf8"));
const bab1 = readFileSync(join(AKAR, SRC[1]), "utf8");
let n = 0;
const ok = (c, m) => { n++; assert.ok(c, m); };
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// ════════ 1. model ════════
const PB = "pasti benar", TDP = "tidak dapat dipastikan", PS = "pasti salah";
const has = (t, a) => (a < 0 ? !((t >> ~a) & 1) : !!((t >> a) & 1));      // a < 0: bukan istilah ~a
const ada = (a, b) => (T) => T.some((t) => has(t, a) && has(t, b));
const semua = (a, b) => (T) => T.every((t) => !has(t, a) || has(t, b));
// dunia = himpunan jenis anggota yang tidak dilarang premis umum; bacaan: himpunan kosong boleh/tidak × "sebagian" ≥ 1 / "sebagian, tidak semua"
function silogisme(id, m, umum, eks, opsi) {
  const izin = [...Array(1 << m).keys()].filter((t) => umum.every((p) => p([t])));
  const W = []; for (let s = 1; s < 1 << izin.length; s++) W.push(izin.filter((_, k) => (s >> k) & 1));
  const status = (f) => {
    const per = [];
    for (const kosong of [true, false]) for (const ketat of [false, true]) {
      const sah = W.filter((T) => (kosong || [...Array(m).keys()].every((k) => T.some((t) => has(t, k)))) && eks.every((p) => p(T, ketat)));
      ok(sah.length, `${id}: premis tidak dapat dipenuhi`);
      const v = sah.map((T) => f(T)); per.push(v.every(Boolean) ? PB : v.some(Boolean) ? TDP : PS);
    }
    ok(per.every((x) => x === per[0]), `${id}: status berubah menurut bacaan ${per}`);
    return per[0];
  };
  return { st: Object.fromEntries(Object.entries(opsi).map(([h, f]) => [h, status(f)])), dunia: W.length, izin: izin.length, status };
}

const MODEL = {
  "HB-TIU-B01-C01"() {                       // Diktum KELIMA a (bobot 5/0), KEDELAPAN b (ambang 65 · 80 · 156)
    const BOBOT = 5, AMB = { TWK: 65, TIU: 80, TKP: 156 }, NILAI = { TWK: 95, TIU: 70, TKP: 180 };
    ok(bab1.includes("65 untuk TWK, 80 untuk TIU, dan 156 untuk TKP") && bab1.includes("jawaban benar bernilai 5"), "B01-C01: angka resmi = Bab 1");
    ok(NILAI.TWK >= AMB.TWK && NILAI.TKP >= AMB.TKP && NILAI.TIU < AMB.TIU && NILAI.TIU % BOBOT === 0, "B01-C01: hanya TIU belum lolos");
    const benar = NILAI.TIU / BOBOT, perlu = Math.ceil(AMB.TIU / BOBOT), kunci = perlu - benar;
    ok(NILAI.TWK - AMB.TWK + NILAI.TKP - AMB.TKP >= AMB.TIU - NILAI.TIU, "B01-C01: kelebihan TWK + TKP tampak menutupi TIU (A menggoda)");
    let lebih = 0; while ((benar + lebih) * BOBOT <= AMB.TIU) lebih++;
    const nilai = [0, kunci, lebih, AMB.TIU - NILAI.TIU, perlu];           // A total menutupi · B kunci · C melebihi · D lupa bobot · E jumlah akhir
    return { nilai, kunci: "B", bukti: { metode: `TIU ${NILAI.TIU} = ${benar} benar; ambang ${AMB.TIU} = ${perlu} benar; tambahan ${kunci}; melebihi ambang ${lebih}` },
      angka: [benar, perlu, kunci, lebih, BOBOT, AMB.TIU - NILAI.TIU, (benar + kunci) * BOBOT, NILAI.TWK - AMB.TWK, NILAI.TKP - AMB.TKP, (benar + lebih) * BOBOT, (benar - 1) * BOBOT].map(String) };
  },
  "HB-TIU-B01-C02"() {                       // tabel waktu Bab 1 + aturan "Tertinggal di titik periksa"
    const PATOKAN = { "38–45": 75, "46–52": 90 };
    for (const [no, d] of Object.entries(PATOKAN)) ok(new RegExp(`<td>${no}</td><td>\\d+</td><td>${d}</td>`).test(bab1), `B01-C02: patokan ${no} = Bab 1`);
    const MULAI = (100 - 27) * 60, rencana = MULAI - (6 * 60 + 30 + 8 * 75), layar = 53 * 60 + 40;   // selesai nomor 45 = 16:30 sejak mulai TIU
    ok(mmss(rencana) === "56:30" && bab1.includes(`<td>45</td><td>16:30</td><td>${mmss(rencana)}</td>`), "B01-C02: rencana nomor 45 = lembar Bab 1");
    const telat = rencana - layar, BATAS = 120;                      // jam hitung mundur: sisa lebih kecil = tertinggal
    ok(telat > BATAS, "B01-C02: tertinggal lebih dari 2 menit");
    const batas = (t) => (t > BATAS ? 1 : 2) * PATOKAN["46–52"];     // aturan tertinggal: tandai setelah 1 × patokan, bukan 2 ×
    const sudah = PATOKAN["46–52"] + 1;                               // "lebih dari 90 detik"
    const tindak = (o) => (o.lanjut ? o.sampai > sudah && o.sampai <= batas(telat) : o.isi && o.tandai);
    const O = { A: { lanjut: 1, sampai: batas(0) }, B: { tandai: 1, isi: 0 }, C: { lanjut: 1, sampai: 2 * PATOKAN["38–45"] }, D: { lanjut: 1, sampai: batas(-telat) }, E: { tandai: 1, isi: 1 } };
    const benar = H.filter((h) => tindak(O[h]));
    ok(benar.join() === "E", `B01-C02: tindakan sah = ${benar}`);
    const mnt = `${Math.floor(telat / 60)} menit ${telat % 60} detik`;
    return { kunci: "E", wajib: { A: [String(batas(0)), "90"], C: [String(2 * PATOKAN["38–45"]), "75"], D: [mnt] }, bukti: { metode: `rencana ${mmss(rencana)}, layar 53:40, tertinggal ${telat} detik > 120 → batas nomor 46 = ${batas(telat)} detik; tanpa aturan tertinggal ${batas(0)}; patokan blok lama ×2 = ${2 * PATOKAN["38–45"]}` },
      angka: [mmss(rencana), "53:40", String(telat), mnt, String(Math.floor((MULAI - layar) / 60)), String((MULAI - layar) % 60), "16:30", "73:00", "120", "2", String(batas(0)), String(2 * PATOKAN["38–45"]), "75", "90", "100:00", "27"] };
  },
  "HB-TIU-B02-C01"() {                       // 0 petugas · 1 pelatihan · 2 mahasiswa · 3 paruh waktu
    const P1 = semua(0, 1), P2 = (T, ketat) => ada(0, 2)(T) && (!ketat || ada(0, ~2)(T));
    const opsi = { A: ada(2, 1), B: semua(2, 1), C: ada(0, 3), D: semua(1, 0), E: ada(2, ~0) };
    const s = silogisme("B02-C01", 4, [P1], [P2], opsi);
    ok(JSON.stringify(s.st) === JSON.stringify({ A: PB, B: TDP, C: TDP, D: TDP, E: TDP }), `B02-C01: status ${JSON.stringify(s.st)}`);
    ok(silogisme("B02-C01·tanpa P1", 4, [], [P2], { A: opsi.A }).st.A !== PB && silogisme("B02-C01·tanpa P2", 4, [P1], [], { A: opsi.A }).st.A !== PB, "B02-C01: kedua premis perlu");
    return { kunci: "A", bukti: { metode: `dunia himpunan 4 istilah, daerah sah ${s.izin}, ${s.dunia} dunia × 4 bacaan (kosong · sebagian); kedua premis perlu`, status: s.st }, angka: ["1", "2"] };
  },
  "HB-TIU-B02-C02"() {                       // orang-hari tetap
    const N = 12, HARI = 10, JALAN = 4, PINDAH = 4, sisaN = N - PINDAH;
    const total = Q.of(N * HARI), selesai = Q.of(N * JALAN), sisa = total.sub(selesai).div(sisaN);
    const nilai = [Q.of(JALAN).add(Q.of(HARI - JALAN).mul(sisaN).div(N)), sisa, sisa.add(JALAN), total.div(sisaN), total.div(sisaN).add(JALAN)];
    ok(nilai.every((x) => x.bulat), "B02-C02: semua pilihan bulat");
    return { nilai: nilai.map((x) => x.num), kunci: "C", bukti: { metode: `${N} × ${HARI} = ${total.num} orang-hari; selesai ${selesai.num}; sisa ${total.sub(selesai).num} : ${sisaN} = ${sisa.num} hari; seluruhnya ${sisa.add(JALAN).num}` },
      angka: [N * HARI, N * JALAN, total.sub(selesai).num, sisaN, sisa.num, HARI - JALAN, total.div(sisaN).num, Q.of(HARI - JALAN).mul(sisaN).div(N).num, sisa.add(JALAN).num, N * (HARI - JALAN), PINDAH * (HARI - JALAN)].map(String) };
  },
  "HB-TIU-B19-C01"() {                       // turun 10% lalu naik 25% dari tahun sebelumnya; 3.200 kg benih = pengalih
    const AWAL = Q.of(48000), TURUN = Q.dari("0.1"), NAIK = Q.dari("0.25"), BENIH = Q.of(3200);
    const t25 = AWAL.sub(AWAL.mul(TURUN)), t26 = t25.add(t25.mul(NAIK));
    const nilai = [t25, t25.add(t25.mul(NAIK).div(10)), t25.sub(BENIH).mul(Q.of(1).add(NAIK)), t26, t25.add(AWAL.mul(NAIK))];
    ok(nilai[4].eq(AWAL.mul(Q.of(1).add(NAIK).sub(TURUN))), "B19-C01: jalan selisih persen (−10% + 25%) = basis salah");
    return { nilai: nilai.map((x) => x.num), kunci: "D", bukti: { metode: `48.000 × 90% = ${fmt(t25)}; × 125% = ${fmt(t26)}; benih tidak mengubah hasil panen` },
      angka: [t25, t26, t25.mul(NAIK), AWAL.mul(TURUN), AWAL.mul(NAIK), t25.mul(NAIK).div(10), t25.sub(BENIH), nilai[2], nilai[4], AWAL.mul(Q.of(1).add(NAIK).sub(TURUN))].map((x) => fmt(x)).concat(["10", "25", "90", "125", "15", "115"]) };
  },
  "HB-TIU-B19-C02"() {                       // B batik · G gerabah · K keripik · M madu · T tenun; K, M makanan
    const MAKAN = new Set(["K", "M"]), p = (s, x) => s.indexOf(x);
    const S = [(s) => !MAKAN.has(s[0]) && !MAKAN.has(s[4]), (s) => p(s, "G") === p(s, "B") + 1, (s) => Math.abs(p(s, "T") - p(s, "K")) === 2];
    const opsi = Object.fromEntries(Object.entries({ A: "TMKGB", B: "BGTMK", C: "BGMKT", D: "BMKGT", E: "TMKBG" }).map(([h, s]) => [h, s.split("")]));
    const pk = pilih("B19-C02", opsi, S, "E");
    const sah = perm("BGKMT".split("")).filter((s) => S.every((f) => f(s))).map((s) => s.join(""));
    ok(sah.length === 2 && sah.includes("TMKBG"), `B19-C02: susunan sah ${sah}`);
    const nama = { B: "batik", G: "gerabah", K: "keripik", M: "madu", T: "tenun" };
    const teks = Object.fromEntries(H.map((h) => [h, opsi[h].map((x, i) => (i ? nama[x] : nama[x][0].toUpperCase() + nama[x].slice(1))).join(", ")]));
    return { teks, kunci: "E", bukti: { metode: `120 urutan; sah 2 (${sah.join(", ")}); syarat 1–3 menggugurkan ${Object.values(pk.gugur).join(" · ")}; tiap pilihan salah melanggar tepat satu syarat; skor unsur bersama ${JSON.stringify(pk.skor)}` },
      angka: ["1", "2", "3", "4", "5", "120"] };
  },
};

// ════════ 2. data = model, kode, bentuk ════════
const engine = readFileSync(ENGINE, "utf8");
const KODE = new Set([...engine.matchAll(/^\| K\d \| (JF?-[A-Z]+)/gm)].map((m) => m[1]));
const polos = (s) => String(s).replace(/<[^>]+>/g, "");
const soalTeks = (b) => [b.soal.pengantar, ...(b.soal.butir ?? []).map((x) => x[1]), ...(b.soal.syarat ?? []), b.soal.tanya].join(" ");
const M = {}, bukti = {};
ok(data.butir.map((b) => b.id).join() === ["B01-C01", "B01-C02", "B02-C01", "B02-C02", "B19-C01", "B19-C02"].map((x) => `HB-TIU-${x}`).join(), "urutan butir");
for (const b of data.butir) {
  const m = (M[b.id] = MODEL[b.id]());
  bukti[b.id] = m.bukti;
  ok(b.jenis && b.bentuk && b.kerangka && b.to_terdekat && b.catatan_reviu && soalTeks(b).includes(b.kalimat_penentu), `${b.id}: field wajib / kalimat penentu`);
  ok(Object.keys(b.opsi).join("") === "ABCDE" && b.kunci === m.kunci, `${b.id}: kunci data ${b.kunci} ≠ model ${m.kunci}`);
  if (m.nilai) H.forEach((h, i) => ok(b.opsi[h] === fmt(m.nilai[i]), `${b.id} ${h}: data ${b.opsi[h]} ≠ model ${fmt(m.nilai[i])}`));
  if (m.teks) H.forEach((h) => ok(b.opsi[h] === m.teks[h], `${b.id} ${h}: data ≠ model`));
  for (const [h, ws] of Object.entries(m.wajib ?? {})) ws.forEach((w) => ok(b.opsi[h].includes(w), `${b.id} ${h}: pilihan tanpa angka model "${w}"`));
  ok(new Set(Object.values(b.opsi)).size === 5, `${b.id}: pilihan kembar`);
  H.forEach((h) => ok(h === b.kunci ? b.kode[h] === "kunci" && !b.nama[h] : KODE.has(b.kode[h]) && b.nama[h], `${b.id} ${h}: kode/nama`));
  if (m.nilai) bukti[b.id].bentuk = ujiAngka(b.id, m.nilai, b.kunci);
  else if (!m.teks) {   // pilihan kalimat; pilih susunan dinilai pilih()
    const pj = H.map((h) => b.opsi[h].length), k = pj[H.indexOf(b.kunci)];
    ok(!(k === Math.max(...pj) && pj.filter((x) => x === k).length === 1) && !(k === Math.min(...pj) && pj.filter((x) => x === k).length === 1), `${b.id}: kunci terpanjang/terpendek (${pj})`);
  }
}
const seq = data.butir.map((b) => b.kunci).join("");
const hit = Object.fromEntries(H.map((h) => [h, [...seq].filter((x) => x === h).length]));
ok(!/(.)\1\1/.test(seq) && Math.max(...Object.values(hit)) - Math.min(...Object.values(hit)) <= 1, `sebaran kunci ${seq}`);

// ════════ 3. bahasa + pembahasan ════════
const LARANGAN = ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus",
  "tidak hanya", "jebakan", "pengecoh", "stem", "distraktor", "konstruk", "kutub", "hots", "level", "kode", "kok", "nggak", "enggak", "di era"];
const NUM = String.raw`\d[\d.,]*%?`, E = String.raw`[−(]*${NUM}\)*(?:\s+[×:+−]\s+[−(]*${NUM}\)*)*`;
const RANTAI = new RegExp(`${E}(?:\\s*=\\s*${E})+`, "g");
let rantai = 0;
for (const b of data.butir) {
  const P = b.pembahasan;
  const siswa = JSON.stringify([b.soal, b.opsi, b.nama, P ?? {}]).toLowerCase();
  for (const k of LARANGAN) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(siswa), `${b.id}: kata terlarang "${k}"`);
  ok(!/\bjf?-[a-z]+|\bk[1-7]\b/i.test(siswa), `${b.id}: kode bocor ke teks siswa`);
  if (!P) continue;
  const salah = H.filter((h) => h !== b.kunci);
  ok(["ditanya", "cepat", "lain", "cek", "kunci", "analogi", "waspada"].every((k) => P[k]) && salah.every((h) => P.gugur?.[h]?.teks && P.gugur[h].uji) && !P.gugur[b.kunci], `${b.id}: 7 langkah lengkap`);
  ok(/[“"]/.test(P.ditanya), `${b.id}: kalimat penentu dikutip`);
  ok(P.kunci.split(/(?<=[.!?])\s+(?=[A-Z])/).length <= 2, `${b.id}: alasan kunci terlalu panjang`);
  const semuaP = [P.ditanya, P.cepat, P.lain, P.cek, P.kunci, P.analogi, P.waspada, ...salah.flatMap((h) => [P.gugur[h].teks, P.gugur[h].uji])];
  ok((semuaP.join(" ").toLowerCase().match(/\bmaka\b|karena itu/g) || []).length <= 1, `${b.id}: maka/karena itu > 1`);
  // angka di pembahasan wajib berasal dari soal, pilihan, model, atau sisi rantai hitung yang sudah dicek
  const tok = (s) => polos(s).match(/\d+(?:[.:]\d{2,3})*(?:,\d+)?/g) || [];
  const boleh = new Set([...tok(soalTeks(b)), ...Object.values(b.opsi).flatMap(tok), ...M[b.id].angka, ...["0", "1", "2", "3", "4", "5", "6", "7", "10", "100"]]);   // 1–7 juga nomor kelompok kekeliruan
  for (const t of semuaP) for (const ch of polos(t).matchAll(RANTAI)) {
    const sisi = ch[0].split(/\s*=\s*/).map((x) => x.replace(/[.,]$/, "").trim());
    if (sisi.every((x) => !/[×:+−]/.test(x))) continue;
    const v = sisi.map((x) => hitung(x));
    ok(v.every((x) => x.eq(v[0])), `${b.id}: hitungan salah "${ch[0]}"`);
    sisi.flatMap(tok).forEach((k) => boleh.add(k));
    rantai++;
  }
  const asing = semuaP.flatMap(tok).filter((k) => !boleh.has(k));
  ok(!asing.length, `${b.id}: angka pembahasan tanpa asal: ${[...new Set(asing)]}`);
}

// ════════ 4. render ════════
const jam = '<svg class="ico"><use href="#jam"/></svg>';
function stem(b) {
  let sudah = false;
  const tandai = (t) => { if (sudah || !t.includes(b.kalimat_penentu)) return t; sudah = true; return t.replace(b.kalimat_penentu, `<mark>${b.kalimat_penentu}</mark>`); };
  const s = b.soal, out = [`<p class="stem">${tandai(s.pengantar)}</p>`];
  if (s.butir) out.push(`<dl class="premis">${s.butir.map(([d, t]) => `<div><dt>${d}</dt><dd>${tandai(t)}</dd></div>`).join("")}</dl>`);
  if (s.syarat) out.push(`<dl class="premis syarat">${s.syarat.map((t, i) => `<div><dt>${i + 1}.</dt><dd>${tandai(t)}</dd></div>`).join("")}</dl>`);
  out.push(`<p class="stem">${tandai(s.tanya)}</p>`);
  ok(sudah, `${b.id}: kalimat penentu tidak tertandai`);
  return out.join("\n    ");
}
function blok(b) {
  const P = b.pembahasan, t = b.id.replace("HB-TIU-", "");
  const opsi = Object.values(b.opsi).every((x) => x.length <= 11)
    ? `<div class="opsi5">${H.map((h) => `<div><span class="h">${h}</span><b>${b.opsi[h]}</b></div>`).join("")}</div>`
    : `<ol class="opsiv">${H.map((h) => `<li><span class="h">${h}</span><span>${b.opsi[h]}</span></li>`).join("")}</ol>`;
  const g = `<div class="guru"><b>${b.jenis}, ${b.bentuk}.</b> Kunci ${b.kunci}. Kode: ${H.map((h) => `${h} ${b.kode[h] === "kunci" ? "<b>kunci</b>" : b.kode[h]}`).join(" · ")}. Kerangka: ${b.kerangka}. TO terdekat: ${b.to_terdekat}. Bukti: ${bukti[b.id].metode}${bukti[b.id].bentuk ? `; jarak kunci ke pilihan terdekat ${String(bukti[b.id].bentuk.jarak).replace(".", ",")}, median jarak ${String(bukti[b.id].bentuk.median).replace(".", ",")}` : ""}. ${b.catatan_reviu}</div>`;
  let bahas = "";
  if (P) bahas = `
  <div class="kotak inti"><b class="lbl">Inti pertanyaan</b><p>${P.ditanya}</p></div>
  <div class="kotak langkah"><b class="lbl">Langkah penyelesaian</b><dl class="tahap">
    <div><dt>Cara cepat</dt><dd>${P.cepat}</dd></div>
    <div><dt>Cara lain</dt><dd>${P.lain}</dd></div>
    <div><dt>Cek balik</dt><dd>${P.cek}</dd></div>
  </dl></div>
  <div class="gugur vb"><b class="lbl">Pilihan yang gugur</b>${H.filter((h) => h !== b.kunci).map((h) => `<div class="g"><span class="h">${h}</span><div class="x"><span class="uji">${P.gugur[h].uji}</span><b>${b.nama[h]}.</b> ${P.gugur[h].teks}</div></div>`).join("")}</div>
  <div class="jwb"><span>${b.kunci}</span><p><b>Jawaban: ${b.kunci}.</b> ${P.kunci}</p></div>
  <div class="duo"><div class="il"><b>Ilustrasi</b><span>${P.analogi}</span></div><div><b>Kekeliruan yang Mungkin Terjadi</b><span>${P.waspada}</span></div></div>`;
  return `<!--${t}:mulai-->
<div data-soal="${b.id}" data-target="${b.target_detik}">
  <div class="soal">
    <div class="meta"><span>Contoh ${+t.slice(-2)}</span><span class="waktu">${jam}Target ${b.target_detik} detik</span></div>
    ${stem(b)}
    ${opsi}
  </div>
  ${g}${bahas}
</div>
<!--${t}:selesai-->`;
}
let beda = 0;
for (const [bab, f] of Object.entries(SRC)) {
  let html = readFileSync(join(AKAR, f), "utf8");
  for (const b of data.butir.filter((x) => x.bab === +bab)) {
    const t = b.id.replace("HB-TIU-", ""), re = new RegExp(`<!--${t}:mulai-->[\\s\\S]*?<!--${t}:selesai-->`), baru = blok(b);
    ok(re.test(html), `${b.id}: penanda tidak ada di ${f}`);
    if (html.match(re)[0] !== baru) { beda++; html = html.replace(re, () => baru); }
  }
  if (TULIS) writeFileSync(join(AKAR, f), html);
}
ok(TULIS || beda === 0, `${beda} blok src berbeda dari hasil render (jalankan --tulis)`);
if (TULIS) {
  for (const b of data.butir) b.bukti = bukti[b.id];
  writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  writeFileSync(BUTA, JSON.stringify(data.butir.map((b) => ({ id: b.id, target_detik: b.target_detik, soal: b.soal, opsi: b.opsi })), null, 2) + "\n");
} else for (const b of data.butir) ok(JSON.stringify(b.bukti) === JSON.stringify(bukti[b.id]), `${b.id}: field bukti usang (jalankan --tulis)`);

console.log(`soal_dasar: semua assert lulus · ${n} butir dicek · 6 contoh Bab 1, 2, 19 · ${rantai} rantai hitung pembahasan · kunci ${seq} · ${JSON.stringify(hit)}${TULIS ? " · src + data + buta ditulis" : ""}`);
