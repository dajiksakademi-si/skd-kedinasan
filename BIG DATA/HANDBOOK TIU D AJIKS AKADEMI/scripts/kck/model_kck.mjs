// Handbook TIU · Tahap 5 · model Bab 11 Kecukupan Data. Setiap soal: dunia keadaan (skala 1 = batas soal, skala 2 = diperlebar),
// predikat tiap pernyataan, jawaban per keadaan → makna kunci + huruf dari urutan bunyi; kode tiap pilihan salah per makna.
// angka = bilangan yang boleh muncul di pembahasan selain angka soal; wajib = penggalan yang harus ada di teks soal.
import assert from "node:assert/strict";
import { Q, fmt } from "../numerik/alat.mjs";
import { kck2, kck3, pvq, status, rentang, unik, H } from "./alat_kck.mjs";

const pasang = (W, f) => W.flatMap((a) => W.map((b) => f(a, b))).filter(Boolean);
const ringkas = (r) => `(1) ${r.s1.cukup ? "cukup" : "tidak cukup"} · (2) ${r.s2.cukup ? "cukup" : "tidak cukup"} · gabungan ${r.gab.cukup ? "cukup" : "tidak cukup"}`;

export const MODEL = {
  // P01 · ya/tidak + laju, dua mesin berlaju beda, gabungan pasti "tidak"
  "HB-TIU-B11-P01"() {
    const dunia = (sk) => pasang(rentang(100, 4000 * sk, 100), (p, q) => ({ p, q }));
    const jawab = (w) => 4800 / (w.p + w.q) <= 2;
    const m = kck2("B11-P01", dunia, jawab, (w) => w.p === 1200, (w) => 2 * w.q === w.p,
      { kode: { 1: "J-ASUMSI", 2: "J-RASIO", M: "J-MUNGKIN", X: "J-TENTU" } });
    assert.equal(m.makna, "G");
    const t = new Q(4800).div(1200 + 600);                                      // 8/3 jam = 2 jam 40 menit
    assert.ok(t.eq(new Q(8, 3)) && m.r.gab.jawaban[0] === false);
    return { ...m, bukti: { metode: `semua laju P, Q 100–4.000 lembar/jam (diperlebar 8.000); ${ringkas(m.r)}; gabungan 4.800 : 1.800 = 2 jam 40 menit, pasti tidak` },
      wajib: ["4.800 lembar", "paling lama 2 jam", "4 jam", "setengah"], angka: ["1.200", "600", "1.800", "2.400", "40", "1.600", "800", "8", "3", "2,4"] };
  },
  // B01 · Latihan Bukti: perbandingan saja → dua keadaan
  "HB-TIU-B11-B01"() {
    const W = pasang(rentang(1, 200), (j, m) => (4 * j === 3 * m ? { j, m } : null));
    const s = status(W, (w) => w.m);
    assert.ok(!s.cukup);
    const [a, b] = W.slice(0, 2);
    assert.deepEqual([a, b], [{ j: 3, m: 4 }, { j: 6, m: 8 }]);
    return { bukti: { metode: "semua pasangan jahe–mint 1–200 yang berbanding 3 : 4; dua keadaan paling sederhana (3, 4) dan (6, 8)" }, contoh: [a, b] };
  },
  // B02 · Latihan Bukti: persen yang cukup → alasan umum
  "HB-TIU-B11-B02"() {
    const W = pasang(rentang(1, 300), (r, s) => (2 * s === 3 * r ? { r, s } : null));
    const s = status(W, (w) => { const q = new Q(w.r).div(w.r + w.s).mul(100); return `${q.n}/${q.d}`; });
    assert.ok(s.cukup && s.jawaban[0] === "40/1");
    return { bukti: { metode: "semua suara Rani 1–300 dengan Sigit = 1,5 × Rani: persentase Rani selalu 40%" } };
  },
  // C01 · aljabar, bentuk gabungan x + y lewat pemfaktoran
  "HB-TIU-B11-C01"() {
    const dunia = (sk) => pasang(rentang(-60 * sk, 60 * sk), (x, y) => ({ x, y }));
    const m = kck2("B11-C01", dunia, (w) => w.x + w.y, (w) => w.x * w.x - w.y * w.y === 48, (w) => w.x - w.y === 6,
      { kode: { 1: "J-MUNGKIN", 2: "J-PERSAMAAN", M: "J-PERSAMAAN", X: "J-TANDA" } });
    assert.equal(m.makna, "G");
    assert.deepEqual(m.r.s1.jawaban.sort((a, b) => a - b), [-24, -12, -8, -6, -4, -2, 2, 4, 6, 8, 12, 24]);
    assert.deepEqual(m.r.gab.contoh, [{ x: 7, y: 1 }]);
    return { ...m, bukti: { metode: `semua x, y bulat −60…60 (diperlebar −120…120); ${ringkas(m.r)}; x + y di (1): ±2, ±4, ±6, ±8, ±12, ±24; gabungan x = 7, y = 1` },
      wajib: ["<i>x</i><sup>2</sup> − <i>y</i><sup>2</sup> = 48", "<i>x</i> − <i>y</i> = 6", "bilangan bulat"], angka: ["7", "1", "13", "11", "24", "12", "8", "4", "2", "−8", "49", "144", "121", "64", "16", "6", "48", "14", "10", "48.000", "6.000"] };
  },
  // C02 · nilai dari tabel, rata-rata = jumlah tersamar, kolom lama kerja tidak dipakai
  "HB-TIU-B11-C02"() {
    const tabel = [["Akasia", 6, 3, 54], ["Beringin", 8, 4, 70], ["Cendana", 7, null, null], ["Damar", 5, 2, 48]];
    const lain = 54 + 70 + 48;
    const dunia = (sk) => pasang(rentang(0, 300 * sk), (c, t) => (t >= 1 && t <= 10 * sk ? { c, t } : null));
    const m = kck2("B11-C02", dunia, (w) => w.c, (w) => lain + w.c === 4 * 57, (w) => w.c === 7 * 8,
      { kode: { 1: "J-BERHENTI", 2: "J-LANGKAH", G: "J-PENGALIH", X: "J-PENGALIH" } });
    assert.equal(m.makna, "M");
    assert.equal(4 * 57 - lain, 7 * 8);                                             // kedua pernyataan memberi 56
    const tabelSoal = { kepala: ["Kelompok", "Banyak anggota", "Lama kerja (jam)", "Bibit yang ditanam"], baris: tabel.map((r) => r.map((x) => (x == null ? "…" : String(x)))) };
    return { ...m, tabelSoal, bukti: { metode: `bibit Cendana 0–300 × lama kerja 1–10 jam (diperlebar); ${ringkas(m.r)}; (1) 4 × 57 − 172 = 56, (2) 7 × 8 = 56` },
      wajib: ["rata-rata", "57", "8 bibit"], angka: ["228", "172", "56", "4", "7"] };
  },
  // C03 · ya/tidak + laju, pekerjaan berbeda menggugurkan (1), laju dari kemajuan kerja
  "HB-TIU-B11-C03"() {
    const dunia = (sk) => rentang(1, 40 * sk - 1).map((k) => ({ r: new Q(k, sk) }));       // laju tim A, pagar belum selesai: 3r < 120
    const jawab = (w) => new Q(120).sub(w.r.mul(3)).div(w.r).num <= 3;
    const m = kck2("B11-C03", dunia, jawab, () => true, (w) => w.r.mul(3).eq(new Q(48)),
      { kode: { 1: "J-ASUMSI", G: "J-PENGALIH", M: "J-ASUMSI", X: "J-TENTU" } });
    assert.equal(m.makna, "2");
    assert.equal(m.r.s2.jawaban[0], false);                                          // sisa 72 m : 16 m/jam = 4,5 jam → pukul 14.30
    return { ...m, bukti: { metode: `laju tim A 1–39 m/jam dengan pagar belum selesai (diperlebar ke langkah 0,5); ${ringkas(m.r)}; (2) 48 : 3 = 16 m/jam, sisa 72 m perlu 4,5 jam` },
      wajib: ["120 meter", "3 jam", "pekerjaan yang berbeda", "40%", "13.00"], angka: ["48", "16", "72", "4,5", "14.30", "25", "75", "45", "1,8", "60%", "2", "24", "30", "90"] };
  },
  // C04 · rasio, dua bentuk perbandingan yang sama tanpa ukuran
  "HB-TIU-B11-C04"() {
    const dunia = (sk) => pasang(rentang(1, 300 * sk), (m, j) => ({ m, j }));
    const k = kck2("B11-C04", dunia, (w) => w.j, (w) => 2 * w.m === 3 * w.j, (w) => 2 * w.m === 3 * w.j,
      { kode: { 1: "J-RASIO", 2: "J-RASIO", G: "J-PERSAMAAN", M: "J-MUNGKIN" } });
    assert.equal(k.makna, "X");
    return { ...k, bukti: { metode: `semua pasangan mangga–jambu 1–300 (diperlebar 600); ${ringkas(k.r)}; kedua pernyataan sama-sama 2m = 3j` },
      wajib: ["3 : 2", "1,5 kali"], angka: ["2", "4", "6", "3", "30", "20", "45"] };
  },
  // C05 · persen, yang ditanya persentase: perbandingan sudah cukup
  "HB-TIU-B11-C05"() {
    const dunia = (sk) => pasang(rentang(1, 300 * sk), (s, t) => ({ s, t }));
    const pr = (w) => { const q = new Q(w.t).div(w.s + w.t).mul(100); return `${q.n}/${q.d}`; };
    const m = kck2("B11-C05", dunia, pr, (w) => 3 * w.s === 7 * w.t, (w) => w.t === 36,
      { kode: { 2: "J-ASUMSI", G: "J-PENGALIH", M: "J-ASUMSI", X: "J-BASIS" } });
    assert.equal(m.makna, "1");
    assert.deepEqual(m.r.s1.jawaban, ["30/1"]);
    return { ...m, bukti: { metode: `semua pasangan SMP–MTs 1–300 (diperlebar 600); ${ringkas(m.r)}; (1) 3 : (7 + 3) = 30%` },
      wajib: ["7 : 3", "36"], angka: ["10", "30%", "3", "7", "84", "120", "70", "30", "14", "6", "36%", "50", "72%"] };
  },
  // C06 · tiga pernyataan, hanya pasangan (1) + (3)
  "HB-TIU-B11-C06"() {
    const dunia = (sk) => { const W = []; for (const p of rentang(0, 100 * sk)) for (const q of rentang(0, 100 * sk)) for (const r of rentang(0, 100 * sk)) if (p + q <= 100 * sk) W.push({ p, q, r }); return W; };
    const S = [(w) => w.p + w.q === 45, (w) => w.q + w.r === 52, (w) => w.p + w.q + w.r === 80];
    const tunggal = (p) => !p[1] && !p[2] && !p[4];
    const opsi = {
      A: (p) => p[4],
      B: (p) => p[3] && !p[5] && !p[6] && tunggal(p),
      C: (p) => p[5] && !p[3] && !p[6] && tunggal(p),
      D: (p) => p[6] && !p[3] && !p[5] && tunggal(p),
      E: (p) => p[7] && !p[3] && !p[5] && !p[6],
    };
    const k = kck3("B11-C06", dunia, (w) => w.r, S, opsi);
    assert.equal(k.kunci, "C");
    const teks = {
      A: "Pernyataan (3) SAJA cukup untuk menjawab pertanyaan.",
      B: "Pernyataan (1) dan (2) bersama-sama cukup, tetapi pasangan lain dan setiap pernyataan SAJA tidak cukup.",
      C: "Pernyataan (1) dan (3) bersama-sama cukup, tetapi pasangan lain dan setiap pernyataan SAJA tidak cukup.",
      D: "Pernyataan (2) dan (3) bersama-sama cukup, tetapi pasangan lain dan setiap pernyataan SAJA tidak cukup.",
      E: "Ketiga pernyataan bersama-sama cukup, tetapi setiap pasangan pernyataan tidak cukup.",
    };
    const kode = { A: "J-ASUMSI", B: "J-PERSAMAAN", C: "kunci", D: "J-BALIK", E: "J-PERSAMAAN" };
    return { teks, kunci: "C", kode, bukti: { metode: `semua isi kotak 0–100 (diperlebar 200), tujuh himpunan pernyataan: hanya {1, 3} dan {1, 2, 3} cukup; ${k.monoton} peta monoton diuji, tiap peta paling banyak satu pilihan benar` },
      wajib: ["45", "52", "80"], angka: ["35", "28", "80", "45", "52", "7", "17", "8", "27", "25", "20", "10"] };
  },
  // C07 · P vs Q berpeubah: x = 3 memberi P = Q, sisanya P < Q
  "HB-TIU-B11-C07"() {
    const P = (x) => x * x - 4 * x + 10, Q_ = (x) => 7 * x - 14;
    const r = pvq(rentang(3, 7), P, Q_);
    assert.deepEqual(r, ["<", "="]);
    assert.deepEqual(pvq(rentang(4, 7), P, Q_), ["<"]);                                // ujung kiri dibaca "tidak termasuk" → P < Q (pilihan B)
    assert.deepEqual(pvq(rentang(3, 6), P, Q_), ["<", "="]);                           // ujung kanan tidak menentukan
    assert.ok(rentang(3, 7).every((x) => Q_(x) - P(x) === -(x - 3) * (x - 8)));
    const tabel = rentang(3, 7).map((x) => [x, P(x), Q_(x)]);
    return { teks: { A: "P > Q", B: "P < Q", C: "P = Q", D: "Hubungan P dan Q tidak dapat ditentukan" }, kunci: "D", empat: true,
      kode: { A: "J-TANDA", B: "J-BATAS", C: "J-MUNGKIN", D: "kunci" }, tabel,
      bukti: { metode: "semua x bulat 3–7: P = Q di x = 3, P < Q di x = 4–7; ujung kiri dibalik (4–7) → hanya P < Q (pilihan B); P − Q = (x − 3)(x − 8)" },
      wajib: ["3 ≤ <i>x</i> ≤ 7", "P = <i>x</i><sup>2</sup> − 4<i>x</i> + 10", "Q = 7<i>x</i> − 14"], angka: [...tabel.flat().map(String), "8", "11", "24", "−2", "−4", "−6", "−8", "0"] };
  },
  // L01 · nilai dari cerita, data hari lain sebagai pengalih
  "HB-TIU-B11-L01"() {
    const dunia = (sk) => pasang(rentang(0, 60 * sk), (p, e) => (2500 * p + 1500 * e === 44000 ? { p, e } : null));
    const m = kck2("B11-L01", dunia, (w) => w.p, (w) => w.e === 2 * w.p, () => true,
      { kode: { 2: "J-PENGALIH", G: "J-PENGALIH", M: "J-ASUMSI", X: "J-PERSAMAAN" } });
    assert.equal(m.makna, "1");
    assert.deepEqual(m.r.s1.jawaban, [8]);
    return { ...m, bukti: { metode: `semua banyak pensil–penghapus yang memberi Rp44.000; ${ringkas(m.r)}; (1) 2.500p + 3.000p = 44.000 → p = 8` }, wajib: ["Rp2.500", "Rp1.500", "Rp44.000", "dua kali", "6 pensil"] };
  },
  // L02 · rasio + tambahan anggota; urutan bunyi diacak (T2-7(7)), "BERSAMA-SAMA cukup" di B
  "HB-TIU-B11-L02"() {
    const dunia = (sk) => pasang(rentang(1, 200 * sk), (a, r) => ({ a, r }));
    const m = kck2("B11-L02", dunia, (w) => w.r, (w) => 3 * w.a === 5 * w.r, (w) => 4 * w.a === 5 * (w.r + 6),
      { urutan: ["2", "G", "X", "1", "M"], kode: { 1: "J-RASIO", 2: "J-ASUMSI", M: "J-RASIO", X: "J-PERSAMAAN" } });
    assert.equal(m.makna, "G"); assert.equal(m.kunci, "B");
    assert.deepEqual(m.r.gab.contoh, [{ a: 30, r: 18 }]);
    return { ...m, bukti: { metode: `semua pasangan anak–remaja 1–200 (diperlebar 400); ${ringkas(m.r)}; gabungan 5k : (3k + 6) = 5 : 4 → k = 6, remaja 18; urutan bunyi 2 · G · X · 1 · M` }, wajib: ["5 : 3", "6 anggota remaja", "5 : 4"] };
  },
  // L03 · ya/tidak + laju: batas laju seluruh troli → waktu terkecil pun di atas batas
  "HB-TIU-B11-L03"() {
    const dunia = (sk) => { const L = unik([...rentang(10 * sk, 300 * sk, 10 * sk), 130, 140]), W = []; for (const a of L) for (const b of L) for (const c of L) for (const d of L) W.push([a, b, c, d]); return W; };
    const m = kck2("B11-L03", dunia, (w) => w[0] + w[1] + w[2] + w[3] > 600, (w) => w.filter((x) => x === 130).length >= 2, (w) => w.every((x) => x <= 140),
      { kode: { 1: "J-ASUMSI", G: "J-BATAS", M: "J-ASUMSI", X: "J-TENTU" } });
    assert.equal(m.makna, "2");
    assert.equal(m.r.s2.jawaban[0], false);
    return { ...m, bukti: { metode: `laju tiap troli 10–300 kursi/jam (diperlebar 20–600); ${ringkas(m.r)}; (2) paling banyak 4 × 140 = 560 < 600` }, wajib: ["600 kursi", "4 troli", "kurang dari 1 jam", "130 kursi", "paling banyak 140"] };
  },
  // L04 · persen + "lebih banyak p% daripada" dengan dasar diketahui
  "HB-TIU-B11-L04"() {
    const dunia = () => { const W = []; for (const a of rentang(0, 480)) for (const r of rentang(0, 480 - a)) W.push({ a, r, d: 480 - a - r }); return W; };
    const m = kck2("B11-L04", dunia, (w) => w.r, (w) => 100 * w.r === 35 * 480, (w) => w.a === 120 && 100 * w.r === 140 * w.a,
      { kode: { 1: "J-BERHENTI", 2: "J-PENGALIH", G: "J-BASIS", X: "J-PENGALIH" } });
    assert.equal(m.makna, "M");
    assert.deepEqual([m.r.s1.jawaban, m.r.s2.jawaban], [[168], [168]]);
    return { ...m, bukti: { metode: `semua pembagian 480 buku ke tiga golongan (total tertulis, tanpa rentang buatan); ${ringkas(m.r)}; (1) 35% × 480 = 168, (2) 140% × 120 = 168` }, wajib: ["480 buku", "35%", "120 buku anak", "40% lebih banyak"] };
  },
  // L05 · aljabar: (2) hanya bentuk kuadrat dari (1) untuk bilangan positif
  "HB-TIU-B11-L05"() {
    const dunia = (sk) => pasang(rentang(1, 50 * sk), (a, b) => ({ a, b }));
    const s1 = (w) => w.a + w.b === 12, s2 = (w) => w.a * w.a + 2 * w.a * w.b + w.b * w.b === 144;
    const m = kck2("B11-L05", dunia, (w) => w.a, s1, s2, { kode: { 1: "J-ASUMSI", 2: "J-MUNGKIN", G: "J-ULANG", M: "J-PERSAMAAN" } });
    assert.equal(m.makna, "X");
    const W = dunia(1); assert.ok(W.every((w) => s1(w) === s2(w)), "(2) setara (1) untuk bilangan bulat positif");
    return { ...m, bukti: { metode: `semua a, b bulat positif 1–50 (diperlebar 100); ${ringkas(m.r)}; uji coret: (2) benar tepat di keadaan yang sama dengan (1), karena (a + b)² = 144 dan a + b positif` }, wajib: ["bilangan bulat positif", "<i>a</i> + <i>b</i> = 12", "= 144"], ulang: true };
  },
};
export const fmtQ = fmt;
