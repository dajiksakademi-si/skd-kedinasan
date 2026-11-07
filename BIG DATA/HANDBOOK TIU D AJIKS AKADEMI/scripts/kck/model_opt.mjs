// Handbook TIU · Tahap 5 · model Bab 13 Optimasi Tabel. Semua kombinasi dicacah; optimum global wajib tunggal dan ada di pilihan (B-15);
// tiap pilihan salah = kombinasi tidak sah (syarat yang dilanggar dicatat) atau sah tetapi lebih buruk (selisih dicatat), atau hitungan
// jalur kekeliruan bernama. Membaca data: status tiap pernyataan (pasti benar / pasti salah / tidak dapat ditentukan) dari tabel.
import assert from "node:assert/strict";
import { fmt, rp } from "../numerik/alat.mjs";
import { kombinasi, total, H } from "./alat_kck.mjs";

const isiDari = (p, v) => total(p, v, (x) => x.isi), hargaDari = (p, v) => total(p, v, (x) => x.harga);
const vek = (p, peta) => p.map((x) => peta[x.isi] ?? 0);
const kalimat = (p, v, satuan) => { const b = p.map((x, i) => [v[i], x.isi]).filter(([k]) => k); const s = b.map(([k, i]) => `${k} kemasan isi ${i}${satuan ? " " + satuan : ""}`); return s.length < 3 ? s.join(" dan ") : `${s.slice(0, -1).join(", ")}, dan ${s.at(-1)}`; };
// status pernyataan data: angka → benar/salah dari tabel; luar → data tidak ada di tabel (dua keadaan); sebab → bagian angka f, sebabnya tidak ada di tabel
const tPaket = (p, sat, stok) => ({ kepala: ["Kemasan", "Harga", ...(stok ? ["Stok"] : [])], baris: p.map((x) => [`isi ${x.isi} ${sat}`, rp(x.harga), ...(stok ? [`${x.stok} kemasan`] : [])]) });
const STATUS = (o, t) => (o.luar ? "tidak dapat ditentukan" : o.sebab ? (o.f(t) ? "tidak dapat ditentukan" : "pasti salah") : o.f(t) ? "pasti benar" : "pasti salah");

export const MODEL = {
  // P01 · termurah, empat kemasan, optimum tepat di batas bawah, pilihan kombinasi
  "HB-TIU-B13-P01"() {
    const p = [{ isi: 8, harga: 20000 }, { isi: 12, harga: 28800 }, { isi: 15, harga: 34500 }, { isi: 24, harga: 57600 }], MIN = 90;
    const K = kombinasi(p, p.map((x) => Math.ceil(MIN / x.isi) + 1)).map((v) => ({ v, L: isiDari(p, v), Hg: hargaDari(p, v) }));
    const sah = K.filter((k) => k.L >= MIN).sort((a, b) => a.Hg - b.Hg);
    assert.ok(sah[0].Hg < sah[1].Hg, "optimum tunggal");
    const bawah = MIN * Math.min(...p.map((x) => x.harga / x.isi));
    assert.equal(sah[0].Hg, bawah, "optimum tepat di batas bawah");
    assert.equal(Math.max(...p.map((x) => x.isi)), 24); assert.ok(57600 / 24 > 34500 / 15, "kemasan terbesar bukan yang paling hemat");
    const pil = { A: { 15: 5, 12: 1 }, B: { 8: 12 }, C: { 24: 3, 12: 1, 8: 1 }, D: { 15: 6 }, E: { 24: 4 } };
    const v = Object.fromEntries(H.map((h) => [h, vek(p, pil[h])]));
    assert.deepEqual(v.D, sah[0].v);
    const info = Object.fromEntries(H.map((h) => [h, { isi: isiDari(p, v[h]), biaya: hargaDari(p, v[h]), sah: isiDari(p, v[h]) >= MIN }]));
    assert.ok(!info.A.sah && info.A.biaya < info.D.biaya, "pilihan termurah tidak sah");
    for (const h of ["B", "C", "E"]) assert.ok(info[h].sah && info[h].biaya > info.D.biaya);
    return { teks: Object.fromEntries(H.map((h) => [h, kalimat(p, v[h])])), kunci: "D", kode: { A: "J-BATAS", B: "J-LANGKAH", C: "J-HEMAT", D: "kunci", E: "J-HEMAT" }, tabelSoal: tPaket(p, "botol"), info,
      bukti: { metode: `${K.length} kombinasi; ${sah.length} memenuhi ≥ 90 botol; optimum tunggal 6 kemasan isi 15 = ${rp(sah[0].Hg)} = batas bawah 90 × Rp2.300; pilihan: ${H.map((h) => `${h} ${info[h].isi} botol ${rp(info[h].biaya)}${info[h].sah ? "" : " (tidak sah)"}`).join(", ")}` },
      angka: ["2.500", "2.400", "2.300", "207.000", "90", "87", "96", "92", "201.300", "240.000", "221.600", "230.400", "172.800", "34.500", "28.800", "20.000", "57.600", "72", "18", "6", "14.600"] };
  },
  // C01 · termurah + stok terbatas + kelebihan maksimal, pilihan biaya
  "HB-TIU-B13-C01"() {
    const p = [{ isi: 5, harga: 27000, stok: 6 }, { isi: 8, harga: 41600, stok: 4 }, { isi: 12, harga: 63600, stok: 6 }, { isi: 20, harga: 110000, stok: 3 }], MIN = 64, MAKS = 70;
    const semua = kombinasi(p.map((x) => ({ ...x, stok: undefined })), [16, 10, 7, 4]).map((v) => ({ v, L: isiDari(p, v), Hg: hargaDari(p, v), stok: v.every((k, i) => k <= p[i].stok) }));
    const urut = (f) => semua.filter(f).sort((a, b) => a.Hg - b.Hg);
    const sah = urut((k) => k.L >= MIN && k.L <= MAKS && k.stok);
    assert.ok(sah[0].Hg < sah[1].Hg, "optimum tunggal");
    const key = sah[0], tanpaStok = urut((k) => k.L >= MIN && k.L <= MAKS)[0], lebih = urut((k) => k.L > MAKS && k.stok)[0];
    const bawah = MIN * 5200;
    assert.ok(!tanpaStok.stok && tanpaStok.Hg === bawah && key.Hg > bawah, "stok membuat batas bawah tak tersentuh");
    const langkah = { v: [4, 4, 1, 0] }, hemat = { v: [0, 4, 3, 0] };                 // stok isi 8 dihabiskan, sisa ditambal termurah, isi 8 tidak dicoba dikurangi · urut harga satuan termurah
    for (const x of [langkah, hemat]) { x.L = isiDari(p, x.v); x.Hg = hargaDari(p, x.v); assert.ok(x.L >= MIN && x.L <= MAKS && x.Hg > key.Hg); }
    const nilai = [tanpaStok.Hg, key.Hg, langkah.Hg, hemat.Hg, lebih.Hg];
    assert.deepEqual(nilai, [332800, 337600, 338000, 357200, 374600]);
    const teratur = [4, 3, 2, 1, 0].map((k8) => sah.filter((k) => k.v[1] === k8)[0].Hg);
    assert.deepEqual(teratur, [338000, 342600, 337600, 340400, 345000]);
    assert.equal(langkah.Hg, teratur[0], "C = termurah dengan stok isi 8 habis");
    return { nilai, teks: Object.fromEntries(H.map((h, i) => [h, rp(nilai[i])])), kunci: "B", kode: { A: "J-SYARAT", B: "kunci", C: "J-LANGKAH", D: "J-HEMAT", E: "J-BATAS" }, urut: true, tabelSoal: tPaket(p, "buku", true),
      kombinasi: { A: tanpaStok.v, B: key.v, C: langkah.v, D: hemat.v, E: lebih.v },
      bukti: { metode: `${semua.length} kombinasi; ${sah.length} sah (64–70 buku, stok dipatuhi); optimum tunggal ${key.v} = ${rp(key.Hg)}; batas bawah ${rp(bawah)} hanya dicapai 8 paket isi 8 (stok 4)` },
      angka: ["5.200", "5.300", "5.400", "5.500", "64", "70", "332.800", "8", "4", "32", "2", "16", "48", "83.200", "254.400", "166.400", "190.800", "36", "68", "110.000", "63.600", "71", "76", "40", "24", "3", "20", "12", "6", "41.600", "27.000", "15", "81.000", "127.200", "1", "60", "44", "124.800", "220.000", "344.800", "338.000", "342.600", "340.400", "345.000", "108.000"] };
  },
  // C02 · terbanyak dengan anggaran, sisa uang boleh, pilihan isi
  "HB-TIU-B13-C02"() {
    const p = [{ isi: 3, harga: 33000 }, { isi: 5, harga: 50000 }, { isi: 8, harga: 104000 }], A = 320000;
    const semua = kombinasi(p, [12, 8, 4]).map((v) => ({ v, L: isiDari(p, v), Hg: hargaDari(p, v) }));
    const ok = semua.filter((k) => k.Hg <= A), maks = Math.max(...ok.map((k) => k.L));
    const atas = A / 10000;
    assert.equal(maks, 31); assert.equal(atas, 32);
    const tepat = Math.max(...semua.filter((k) => k.Hg === A).map((k) => k.L));
    const hemat = Math.floor(A / 50000) * 5, murah = Math.floor(A / 33000) * 3;
    const nilai = [murah, tepat, hemat, maks, atas];
    assert.deepEqual(nilai, [27, 29, 30, 31, 32]);
    const cara = ok.filter((k) => k.L === maks).map((k) => k.v);
    return { nilai, teks: Object.fromEntries(H.map((h, i) => [h, `${nilai[i]} pot`])), kunci: "D", kode: { A: "J-HEMAT", B: "J-BATAS", C: "J-LANGKAH", D: "kunci", E: "J-HEMAT" }, urut: true, tabelSoal: tPaket(p, "pot"),
      bukti: { metode: `${semua.length} kombinasi; ${ok.length} dalam anggaran; isi terbanyak 31 pot (${cara.map((v) => v.join(",")).join(" atau ")}); batas atas 320.000 : 10.000 = 32 tidak tercapai; habis tepat Rp320.000 paling banyak 29 pot` },
      angka: ["11.000", "10.000", "13.000", "32", "31", "6", "300.000", "20.000", "316.000", "4.000", "250.000", "66.000", "16.000", "9", "297.000", "2", "1", "25", "312.000", "8.000", "29", "320.000", "70.000"] };
  },
  // C03 · membaca data dua semester, pasti benar
  "HB-TIU-B13-C03"() {
    const t = [["Melati", 3, 240, 300], ["Kenari", 4, 400, 480], ["Seroja", 5, 150, 135]];
    const naik = (r) => (r[3] - r[2]) / r[2] * 100;
    assert.deepEqual(t.map(naik), [25, 20, -10]);
    const O = {
      A: { f: (t) => naik(t[0]) > naik(t[1]) },
      B: { f: (t) => naik(t[1]) === Math.max(...t.map(naik)) },
      C: { luar: true },
      D: { f: (t) => { const p = t.reduce((a, b) => (b[1] > a[1] ? b : a)); return p[3] === Math.max(...t.map((r) => r[3])); } },
      E: { f: (t) => t.reduce((s, r) => s + r[3], 0) < t.reduce((s, r) => s + r[2], 0) },
    };
    const st = Object.fromEntries(H.map((h) => [h, STATUS(O[h], t)]));
    assert.deepEqual(H.filter((h) => st[h] === "pasti benar"), ["A"]);
    assert.equal(st.E, "pasti salah", "total dijumlahkan: naik");
    return { teks: { A: "Persentase kenaikan pengunjung Pustaka Melati lebih besar daripada Pustaka Kenari.", B: "Pustaka Kenari mengalami persentase kenaikan pengunjung terbesar.", C: "Pengunjung Pustaka Seroja turun karena jadwal kunjungannya dikurangi.", D: "Perpustakaan yang petugasnya paling banyak juga paling banyak pengunjungnya pada Semester 2.", E: "Pengunjung ketiga perpustakaan pada Semester 2 lebih sedikit daripada pengunjung pada Semester 1." },
      kunci: "A", kode: { A: "kunci", B: "J-BASIS", C: "J-AKAL", D: "J-PENGALIH", E: "J-LANGKAH" }, status: st,
      tabelSoal: { kepala: ["Perpustakaan keliling", "Petugas", "Pengunjung Semester 1", "Pengunjung Semester 2"], baris: t.map((r) => [`Pustaka ${r[0]}`, ...r.slice(1).map(String)]) },
      bukti: { metode: `status dari tabel: ${H.map((h) => `${h} ${st[h]}`).join(" · ")}; kenaikan 25%, 20%, −10%; jumlah 790 → 915` },
      angka: ["60", "80", "15", "25%", "20%", "10%", "790", "915", "125", "4", "5", "1", "5.000", "20.000", "8.000", "40.000"] };
  },
  // L01 · membaca data satu periode, tidak dapat dipastikan
  "HB-TIU-B13-L01"() {
    const t = [["Las", 30, 24], ["Listrik", 40, 30], ["Otomotif", 25, 22], ["Tata Boga", 35, 28]];
    const pr = (r) => r[2] / r[1];
    const O = {
      A: { f: (t) => { const g = (r) => r[1] - r[2]; return t.every((r) => g(r) <= g(t[1])); } },
      B: { f: (t) => t.every((r) => r[2] <= t[1][2]) },
      C: { luar: true },
      D: { sebab: true, f: (t) => pr(t[1]) === Math.max(...t.map(pr)) },
      E: { f: (t) => { const k = t.reduce((a, b) => (b[1] < a[1] ? b : a)); return k[2] === Math.min(...t.map((r) => r[2])); } },
    };
    const st = Object.fromEntries(H.map((h) => [h, STATUS(O[h], t)]));
    assert.deepEqual(H.filter((h) => st[h] === "tidak dapat ditentukan"), ["C"]);
    assert.equal(st.D, "pasti salah", "pilihan berkata sebab gugur karena angkanya salah");
    return { teks: { A: "Peserta yang mengikuti uji ulang paling banyak berasal dari kelompok Listrik.", B: "Kelompok Listrik meluluskan peserta paling banyak.", C: "Semua peserta kelompok Otomotif yang mengikuti uji ulang dinyatakan lulus.", D: "Karena pesertanya paling banyak, kelompok Listrik memiliki persentase kelulusan tertinggi.", E: "Kelompok yang pesertanya paling sedikit juga meluluskan peserta paling sedikit." },
      kunci: "C", kode: { A: "J-LANGKAH", B: "J-BASIS", C: "kunci", D: "J-TENTU", E: "J-AKAL" }, status: st,
      tabelSoal: { kepala: ["Kelompok", "Peserta", "Lulus"], baris: t.map((r) => r.map(String)) },
      bukti: { metode: `status dari tabel: ${H.map((h) => `${h} ${st[h]}`).join(" · ")}; tidak lulus 6, 10, 3, 7 (uji ulang); persentase 80%, 75%, 88%, 80%` } };
  },
  // L02 · termurah + ongkos kirim per jenis kemasan, pilihan biaya
  "HB-TIU-B13-L02"() {
    const p = [{ isi: 5, harga: 50000 }, { isi: 10, harga: 90000 }, { isi: 25, harga: 200000 }], MIN = 40, ONG = 15000;
    const semua = kombinasi(p, [9, 5, 2]).map((v) => ({ v, L: isiDari(p, v), Hg: hargaDari(p, v), j: v.filter(Boolean).length })).map((k) => ({ ...k, T: k.Hg + ONG * k.j }));
    const sah = semua.filter((k) => k.L >= MIN).sort((a, b) => a.T - b.T);
    assert.ok(sah[0].T < sah[1].T, "optimum tunggal");
    const tanpa = semua.filter((k) => k.L >= MIN).sort((a, b) => a.Hg - b.Hg);
    assert.ok(tanpa[0].Hg < tanpa[1].Hg && tanpa[0].v.join() !== sah[0].v.join(), "ongkos mengubah pilihan termurah");
    const kurang = semua.filter((k) => k.L < MIN && k.L >= MIN - 5).sort((a, b) => b.T - a.T)[0];
    const nilai = [MIN * 8000 + ONG, tanpa[0].Hg, kurang.T, sah[0].T, tanpa[0].T];   // E: kombinasi termurah tanpa ongkos, ongkos ditambahkan belakangan
    assert.ok(tanpa[0].T > sah[0].T, "E sah tetapi lebih mahal");
    assert.deepEqual(nilai, [335000, 340000, 370000, 375000, 385000]);
    return { nilai, teks: Object.fromEntries(H.map((h, i) => [h, rp(nilai[i])])), kunci: "D", kode: { A: "J-HEMAT", B: "J-LANGKAH", C: "J-BATAS", D: "kunci", E: "J-HEMAT" }, urut: true, tabelSoal: tPaket(p, "kg"),
      bukti: { metode: `${semua.length} kombinasi; optimum dengan ongkos ${sah[0].v} = ${rp(sah[0].T)}; tanpa ongkos ${tanpa[0].v} = ${rp(tanpa[0].Hg)}; C = ${kurang.v} (${kurang.L} kg, kurang); E = ${tanpa[0].v} + 3 ongkos = ${rp(tanpa[0].T)}` } };
  },
  // L03 · termurah, dua jenis barang dalam paket campuran, pilihan kombinasi
  "HB-TIU-B13-L03"() {
    const P = [{ n: "X", a: 3, b: 1, h: 40000 }, { n: "Y", a: 1, b: 3, h: 38000 }, { n: "Z", a: 2, b: 2, h: 41000 }], NA = 9, NB = 11;
    const ev = (v) => ({ a: v.reduce((s, k, i) => s + k * P[i].a, 0), b: v.reduce((s, k, i) => s + k * P[i].b, 0), Hg: v.reduce((s, k, i) => s + k * P[i].h, 0) });
    const semua = kombinasi(P, [8, 8, 8]).map((v) => ({ v, ...ev(v) }));
    const sah = semua.filter((k) => k.a >= NA && k.b >= NB).sort((x, y) => x.Hg - y.Hg);
    assert.ok(sah[0].Hg < sah[1].Hg, "optimum tunggal");
    const pil = { A: [1, 4, 0], B: [4, 1, 0], C: [0, 3, 1], D: [0, 1, 4], E: [2, 3, 0] };
    assert.deepEqual(pil.E, sah[0].v);
    const info = Object.fromEntries(H.map((h) => [h, { ...ev(pil[h]) }]));
    assert.ok(info.A.a < NA && info.A.a + info.A.b >= NA + NB, "A: hanya jumlah seluruh barang yang cukup");
    assert.ok(info.B.a >= NA && info.B.b < NB && info.C.b >= NB && info.C.a < NA, "B, C: satu jenis terlewat");
    assert.ok(info.D.a >= NA && info.D.b >= NB && info.D.Hg > info.E.Hg, "D sah tetapi lebih mahal");
    const teks = Object.fromEntries(H.map((h) => [h, pil[h].map((k, i) => (k ? `${k} paket ${P[i].n}` : "")).filter(Boolean).join(" dan ")]));
    return { teks, kunci: "E", kode: { A: "J-BATAS", B: "J-SYARAT", C: "J-SYARAT", D: "J-HEMAT", E: "kunci" }, info,
      tabelSoal: { kepala: ["Paket", "Isi buku", "Isi pulpen", "Harga"], baris: P.map((x) => [`Paket ${x.n}`, String(x.a), String(x.b), rp(x.h)]) },
      bukti: { metode: `${semua.length} kombinasi; ${sah.length} memenuhi ≥ 9 buku dan ≥ 11 pulpen; optimum tunggal 2 X + 3 Y = ${rp(sah[0].Hg)}; ${H.map((h) => `${h} ${info[h].a} buku ${info[h].b} pulpen ${rp(info[h].Hg)}`).join(", ")}` } };
  },
};
export { fmt };
