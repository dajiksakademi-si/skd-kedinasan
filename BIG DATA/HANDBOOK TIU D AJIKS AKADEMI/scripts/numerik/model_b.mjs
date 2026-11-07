// Handbook TIU · Tahap 5 numerik · model Bab 8–10 (SUK, TBD, CRT). Pola sama dengan model_a.mjs.
import assert from "node:assert/strict";
import { Q, hitung, fmt, rp, jamMenit, pukul, huruf, HURUF, rumusLain, deretLain, lagrange, derajat, aturanLainSumber } from "./alat.mjs";

const H = ["A", "B", "C", "D", "E"];
// pilihan dari nilai: { h: [nilai, kode, fungsi] } (format f)
function pilih(peta, f = fmt) {
  const nilai = {}, teks = {}, kode = {}, fungsi = {};
  for (const [h, [v, k, fn]] of Object.entries(peta)) { nilai[h] = Q.of(v); teks[h] = f(v); kode[h] = k; fungsi[h] = fn; }
  return { nilai, teks, kode, fungsi };
}
const kunciDari = (j) => H.find((h) => j.kode[h] === "kunci");
// tabel suku: titik [n, U] → rumus lain ≤ 3 operasi + derajat polinom terendah
function ujiSuku(id, U, titik, tanya, derajatHarap) {
  const pts = titik.map((n) => [n, U(n)]);
  assert.equal(derajat(pts), derajatHarap, `${id}: derajat polinom terendah`);
  assert.ok(pts.length >= derajatHarap + 2, `${id}: titik ≥ banyak bilangan rumus + 1`);
  const urut = [...titik].sort((a, b) => a - b), jarak = urut.slice(1).map((x, i) => x - urut[i]);
  assert.ok(new Set(jarak).size > 1, `${id}: jarak nomor berpola`);
  assert.ok(lagrange(pts, tanya).eq(U(tanya)), `${id}: interpolasi = rumus`);
  const lain = rumusLain(pts.map(([n, u]) => [n, 0, u]), [tanya, 0]);
  for (const v of lain.keys()) assert.ok(Number.isNaN(v) || v === U(tanya), `${id}: rumus lain ${lain.get(v)} memberi ${v}`);
  return { titik: pts, lain: [...lain.values()] };
}
// tabel dua masukan: rumus lain ≤ 3 operasi yang cocok di semua petak terisi wajib memberi X yang sama
function ujiTabel(id, petak, tanya, X) {
  const lain = rumusLain(petak, tanya);
  for (const v of lain.keys()) assert.ok(Number.isNaN(v) || v === X, `${id}: rumus lain ${lain.get(v)} memberi ${v}`);
  assert.ok(lain.has(X) || lain.size === 0, `${id}: aturan tidak ditemukan pencari`);
  return [...lain.values()];
}

// soal tabel dari bank D'Ajiks (T6-6): aturan berlaku di setiap satuan lengkap, X tunggal (brute force −2000…2000),
// pilihan salah tidak memenuhi aturan dan tidak dibenarkan rumus lain (pemeriksa sumber, alat.mjs aturanLainSumber)
function ujiSumber(id, satuan, ok, nilai, X) {
  const isi = (x) => satuan.map((u) => u.map((v) => (v === "X" ? x : v)));
  const sah = []; for (let x = -2000; x <= 2000; x++) if (isi(x).every((u) => ok(...u))) sah.push(x);
  assert.deepEqual(sah, [X], `${id}: X tidak tunggal ${sah}`);
  const tahu = satuan.filter((u) => !u.includes("X")), tanya = satuan.filter((u) => u.includes("X"));
  const bentrok = aturanLainSumber(tahu, nilai.filter((v) => v !== X).map((p) => tanya.map((u) => u.map((v) => (v === "X" ? p : v)))));
  assert.deepEqual(bentrok, [], `${id}: rumus lain membenarkan pilihan salah`);
}
export const MODEL = {
  // ════════ BAB 8 ════════
  "HB-TIU-B08-P01"() {
    const U = (n) => 8 * n - 3, titik = [6, 3, 14, 11], N = 50, u = ujiSuku("B08-P01", U, titik, N, 1);
    const j = pilih({ A: [U(N - 1), "J-NOMOR", "langkahKurangSatu"], B: [U(N), "kunci", "8n − 3"], C: [8 * N, "J-KONST", "lupaKonstanta"], D: [8 * N + 3, "J-TANDA", "tandaKonstanta"], E: [U(N + 1), "J-NOMOR", "langkahLebihSatu"] });
    return { ...j, kunci: "B", urut: true, tabel: { suku: titik.map((n) => [n, U(n)]) }, bukti: { metode: "polinom derajat 1 tepat di 4 titik; rumus lain ≤ 3 operasi diperiksa", rumus: "8n − 3", lain: u.lain },
      angka: [N - 1, N + 1, N - 14 - 1, N - 14 + 1].map(fmt) };
  },
  "HB-TIU-B08-C01"() {
    const U = (n) => 4 * n - 8, titik = [3, 7, 10, 16], V = 180, N = (V + 8) / 4, u = ujiSuku("B08-C01", U, titik, N, 1);
    assert.equal(U(N), V);
    const j = pilih({ A: [(V - 8) / 4, "J-TANDA", "tandaKonstanta"], B: [(V - U(3)) / 4, "J-NOMOR", "langkahDikiraNomor"], C: [V / 4, "J-KONST", "lupaKonstanta"], D: [N, "kunci", "4n − 8 = 180"], E: [16 + (V - U(16)) / 4 + 1, "J-NOMOR", "titikDihitung"] });
    return { ...j, kunci: "D", urut: true, tabel: { suku: titik.map((n) => [n, U(n)]) }, bukti: { metode: "barisan linear; nomor dari nilai dihitung tepat", rumus: "4n − 8", lain: u.lain },
      angka: [] };
  },
  "HB-TIU-B08-C02"() {
    const U = (n) => (n * n + n) / 2 + 4, titik = [2, 5, 6, 9], N = 30, u = ujiSuku("B08-C02", U, titik, N, 2);
    const j = pilih({ A: [U(9) + 21 * ((U(5) - U(2)) / 3), "J-RATA", "linearDuaTitikAwal"], B: [U(9) + 21 * ((U(9) - U(6)) / 3), "J-RATA", "linearDuaTitikAkhir"],
      C: [U(N - 1), "J-NOMOR", "sukuTetangga"], D: [(N * N + N) / 2, "J-KONST", "lupaKonstanta"], E: [U(N), "kunci", "½n² + ½n + 4"] });
    return { ...j, kunci: "E", urut: true, tabel: { suku: titik.map((n) => [n, U(n)]) }, bukti: { metode: "derajat 2 (selisih tingkat dua tetap 1); linear gagal; rumus lain ≤ 3 operasi diperiksa", rumus: "(n² + n) : 2 + 4", lain: u.lain },
      angka: [10, 11, N - 1].map(fmt) };
  },
  "HB-TIU-B08-C03"() {
    const u = [2, 4, 10, 28, 82], k = 3, c = -2, berikut = k * u.at(-1) + c;
    assert.ok(u.slice(1).every((x, i) => x === k * u[i] + c), "aturan kali 3 kurang 2 di semua suku");
    const lain = deretLain(u); assert.deepEqual([...lain], [berikut], "aturan lain deret memberi suku berikut lain");
    const d = u.slice(1).map((x, i) => x - u[i]), d2 = d.slice(1).map((x, i) => x - d[i]);
    const j = pilih({ A: [2 * u.at(-1), "J-TIGA", "kali2DariDuaSukuAwal"], B: [u.at(-1) + d.at(-1) + d2.at(-1), "J-RATA", "selisihKeduaTetap"], C: [berikut, "kunci", "3U − 2"],
      D: [k * u.at(-1), "J-LANGKAH", "lupaDikurangi2"], E: [k * u.at(-1) - c, "J-TANDA", "kali3Tambah2"] });
    return { ...j, kunci: "C", urut: true, deret: u, bukti: { metode: "aturan kali 3 kurang 2 cocok di 4 langkah; aturan lain (aritmetika, geometri, kU + c, selisih bertingkat ≤ 3, berselang, rekursif dua suku) hanya memberi 244", selisih: d }, angka: [...d, ...d2].map(fmt) };
  },
  "HB-TIU-B08-C04"() {
    const no = [2, 5, 10, 17, 26], ang = [3, 6, 12, 24, 48], nB = 37, aB = 96;
    assert.ok(no.every((x, i) => x === (i + 1) ** 2 + 1) && ang.every((x, i) => x === 3 * 2 ** i), "pola nomor n² + 1 dan angka × 2");
    assert.equal(huruf(nB), "K");
    const suku = no.map((x, i) => `${huruf(x)}${ang[i]}`);
    // tiap pilihan salah = satu kekeliruan yang dikenakan pada huruf dan angka bersamaan bila kekeliruannya berlaku untuk keduanya
    // revisi cek buta 3: gabungan bagian terbanyak per posisi (K dan 72) = K72, pilihan salah; setiap pilihan berbagi bagian
    const j = { teks: { A: `K${aB}`, B: `K${48}`, C: `${huruf(26 + 9)}${48 + (48 - 24)}`, D: `K${48 + (48 - 24)}`, E: `K${48 + 3}` },
      kode: { A: "kunci", B: "J-LANGKAH", C: "J-RATA", D: "J-RATA", E: "J-TIGA" }, fungsi: { B: "angka belum dikali 2", C: "selisih terakhir dianggap tetap untuk huruf dan angka (+9, +24)", D: "selisih angka terakhir dianggap tetap (+24)", E: "aturan angka dari dua suku awal (+3)" } };
    assert.deepEqual(Object.values(j.teks), ["K96", "K48", "I72", "K72", "K51"]);
    return { ...j, kunci: "A", urut: false, deret: suku, bukti: { metode: "huruf: nomor 2, 5, 10, 17, 26 selisih 3, 5, 7, 9 (atau n² + 1) → 37 − 26 = 11; angka × 2" },
      angka: [...no, ...no.slice(1).map((x, i) => x - no[i]), nB, nB - 26, 25, 27].map(String) };
  },
  "HB-TIU-B08-L01"() {
    const u = [3, 5, null, 15, 23, 33], kunci = 9;
    const sah = [];                                 // celah: nilai yang membuat deret utuh mengikuti satu aturan sederhana
    for (let m = -50; m <= 100; m++) { const s = u.map((x) => x ?? m); if (deretLain(s.slice(0, 5)).has(s[5])) sah.push(m); }
    assert.deepEqual(sah, [kunci], "celah tunggal");
    const j = pilih({ A: [5 + 2, "J-RATA", "selisihPertamaTetap"], B: [kunci, "kunci", "selisih 2, 4, 6, 8, 10"], C: [5 + (15 - 5) / 2, "J-RATA", "nilaiTengah"], D: [5 + 6, "J-NOMOR", "selisihSalahLetak"], E: [(3 + 23) / 2, "J-TIGA", "dibacaBerselang"] });
    return { ...j, kunci: "B", urut: true, deret: u, bukti: { metode: "isian −50…100 dicoba: hanya 9 membuat deret mengikuti aturan sederhana", sah }, angka: [] };
  },
  "HB-TIU-B08-L02"() {
    const U = (n) => 9 * n + 10, titik = [3, 8, 12, 17], p = 75, q = 40, u = ujiSuku("B08-L02", U, titik, p, 1);
    const K = U(p) - U(q);
    const j = pilih({ A: [(9 * p - 10) - (9 * q + 10), "J-TANDA", "tandaKonstantaSatuSuku"], B: [9 * (p - q - 1), "J-NOMOR", "langkahKurangSatu"], C: [K, "kunci", "9 × 35"], D: [9 * (p - q + 1), "J-NOMOR", "langkahLebihSatu"], E: [K + 10, "J-PENGALIH", "konstantaIkutDitambah"] });
    return { ...j, kunci: "C", urut: true, tabel: { suku: titik.map((n) => [n, U(n)]) }, bukti: { metode: "Up − Uq = 9 × (75 − 40); bilangan tetap saling menghapus", lain: u.lain }, angka: [] };
  },
  "HB-TIU-B08-L03"() {
    const a = [13, 16, 20, 25], suku = a.map((x) => huruf(x) + huruf(27 - x)), nB = 25 + 6, K = huruf(nB) + huruf(27 - nB + 26);
    assert.deepEqual(suku, ["MN", "PK", "TG", "YB"]); assert.equal(K, "EV");
    // revisi cek buta 3: huruf kedua dihitung dari polanya sendiri (N, K, G, B: −3, −4, −5 → −6) atau dari cermin huruf pertama;
    // gabungan bagian terbanyak per posisi (D/F dengan V) = pilihan salah, huruf E kunci tidak terbanyak
    const kedua = huruf(2 - 6), keduaTetap = huruf(2 - 5);
    assert.equal(kedua, huruf(27 - (nB - 26)), "huruf kedua: pola sendiri = cermin");
    const j = { teks: { A: K, B: HURUF[nB - 27 - 1] + kedua, C: huruf(nB - 25) + huruf(27 - (nB - 25)), D: huruf(25 + 5) + keduaTetap, E: huruf(nB - 25) + kedua },
      kode: { A: "kunci", B: "J-NOMOR", C: "J-NOMOR", D: "J-RATA", E: "J-NOMOR" }, fungsi: { B: "31 − 27 (meleset satu huruf), huruf kedua dari polanya", C: "31 − 25 (meleset satu huruf), cermin ikut", D: "selisih terakhir dianggap tetap untuk kedua huruf (+5, −5)", E: "31 − 25 (meleset satu huruf), huruf kedua dari polanya" } };
    assert.deepEqual(Object.values(j.teks), ["EV", "DV", "FU", "DW", "FV"]);
    return { ...j, kunci: "A", urut: false, deret: suku, bukti: { metode: "huruf pertama 13, 16, 20, 25 selisih 3, 4, 5 → 31 − 26 = 5 (E); huruf kedua = 27 − nomor huruf pertama (V)" }, angka: [] };
  },
  "HB-TIU-B08-L04"() {
    // revisi cek buta 1: nomor 1 dimuat agar sidik bagi n (4, 7, 19, 28, 67 = n² + 3) terbaca langsung; target tetap 90 detik
    const U = (n) => n * (n * n + 3), titik = [1, 2, 4, 5, 8], N = 12, u = ujiSuku("B08-L04", U, titik, N, 3);
    const tigaAkhir = lagrange([[4, U(4)], [5, U(5)], [8, U(8)]], N);
    const j = pilih({ A: [U(8) + 4 * ((U(8) - U(5)) / 3), "J-RATA", "linearDuaTitikAkhir"], B: [U(N - 1), "J-NOMOR", "sukuTetangga"], C: [tigaAkhir, "J-TIGA", "kuadratTigaTitikAkhir"], D: [N ** 3, "J-KONST", "lupaKonstanta3"], E: [U(N), "kunci", "n(n² + 3)"] });
    return { ...j, kunci: "E", urut: true, tabel: { suku: titik.map((n) => [n, U(n)]) }, bukti: { metode: "derajat 3 tepat di 5 titik; kuadrat gagal; sidik bagi n: n² + 3", lain: u.lain }, angka: [] };
  },

  // ════════ BAB 9 ════════
  "HB-TIU-B09-P01"() {   // T6-6: Soal 7 bank deret tabel D'Ajiks, apa adanya (tabel, aturan, kelima pilihan)
    const ok = (a, b, c) => a / b + b === c, baris = [[36, 4], [35, 5], [48, 6]].map(([a, b]) => [a, b, a / b + b]), [a, b] = [63, 7], X = a / b + b;
    assert.ok(36 / 3 + 1 === 13 && 35 % 3 !== 0, "bagi 3 tambah 1 cocok di baris 1 saja");
    const j = pilih({ A: [a / b, "J-LANGKAH", "lupa + b"], B: [X, "kunci", "a : b + b"], C: [a / 3 + 1, "J-TIGA", "a : 3 + 1 dari baris 1"], D: [a - b, "J-PENGALIH", "a − b"], E: [a + b, "J-PENGALIH", "a + b"] });
    ujiSumber("B09-P01", [...baris, [a, b, "X"]], ok, H.map((h) => j.nilai[h].num), X);
    return { ...j, kunci: "B", urut: true, tabel: { kisi: [...baris, [a, b, "X"]] }, bukti: { metode: "bank D'Ajiks GENERATE SOAL TERBARU SKD 2026, Deret Tabel Level 5–6 Soal 7; X tunggal (brute force); rumus lain sumber tidak membenarkan pilihan salah" }, angka: [] };
  },
  "HB-TIU-B09-C01"() {
    const f = (k) => k * k + 9, kiri = [7, 3, 10, 4], N = 13;
    const pts = kiri.map((k) => [k, f(k)]); assert.equal(derajat(pts), 2);
    const lain = ujiTabel("B09-C01", pts.map(([k, v]) => [k, 0, v]), [N, 0], f(N));
    const j = pilih({ A: [f(10) + 3 * (f(4) - f(3)), "J-RATA", "kenaikanDariKiri3ke4"], B: [f(N - 1), "J-NOMOR", "kiriKurangSatu"], C: [f(10) + 3 * ((f(10) - f(7)) / 3), "J-RATA", "kenaikanDariKiri7ke10"], D: [N * N, "J-KONST", "lupaKonstanta"], E: [f(N), "kunci", "kiri² + 9"] });
    return { ...j, kunci: "E", urut: true, tabel: { duaKolom: pts }, bukti: { metode: "derajat 2 di 4 baris; rumus lain ≤ 3 operasi", lain }, angka: [] };
  },
  "HB-TIU-B09-C02"() {   // T6-6: Soal 11 bank deret tabel D'Ajiks; pilihan 5 (13 − 8) diganti 31 (atas dan bawah tertukar) agar kunci A
    const ok = (a, b, c) => 3 * a - b === c, atas = [7, 5, 9, 8], tengah = [4, 6, 10, "X"], bawah = [17, 9, 17, 13], X = 3 * 8 - 13;
    const j = pilih({ A: [X, "kunci", "3 × atas − tengah"], B: [10 + 6, "J-RATA", "baris tengah naik 2, 4, lalu 6"], C: [8 + 13, "J-PENGALIH", "atas + bawah"], D: [3 * 13 - 8, "J-BALIK", "atas dan bawah tertukar"], E: [3 * 8 + 13, "J-TANDA", "pengurang dicari dengan menjumlah"] });
    ujiSumber("B09-C02", atas.map((x, i) => [x, tengah[i], bawah[i]]), ok, H.map((h) => j.nilai[h].num), X);
    return { ...j, kunci: "A", urut: true, tabel: { kisiKolom: [atas, tengah, bawah] }, bukti: { metode: "bank D'Ajiks GENERATE SOAL TERBARU SKD 2026, Deret Tabel Level 5–6 Soal 11 (pilihan 5 diganti 31); X tunggal (brute force); rumus lain sumber tidak membenarkan pilihan salah" }, angka: [] };
  },
  "HB-TIU-B09-C03"() {
    const R = [2, 4, 5], C = [1, 3, 6], sel = (r, c) => 3 * r + c * c, X = sel(5, 6);
    const petak = []; for (const r of R) for (const c of C) if (!(r === 5 && c === 6)) petak.push([r, c, sel(r, c)]);
    const lain = ujiTabel("B09-C03", petak, [5, 6], X);
    for (const r of R) assert.deepEqual([sel(r, 3) - sel(r, 1), sel(r, 6) - sel(r, 3)], [8, 27], "uji pemisahan: selisih antarkolom tetap");
    const j = pilih({ A: [sel(5, 3) + (sel(5, 3) - sel(5, 1)), "J-RATA", "selisihSebarisTetap"], B: [5 + 36, "J-LANGKAH", "lupaKali3"], C: [36 + 6, "J-TIGA", "aturanBarisPertama c² + 6"], D: [X, "kunci", "3 × baris + kolom²"], E: [sel(4, 6) + (sel(4, 6) - sel(2, 6)), "J-RATA", "selisih antarbaris dianggap tetap"] });
    return { ...j, kunci: "D", urut: true, tabel: { acuan: { R, C, sel: R.map((r) => C.map((c) => (r === 5 && c === 6 ? "X" : sel(r, c)))) } }, bukti: { metode: "uji pemisahan + rumus lain ≤ 3 operasi atas (acuan baris, acuan kolom)", lain }, angka: [fmt(6 * 6)] };
  },
  "HB-TIU-B09-C04"() {
    const atas = [3, 7, 13, 21, 31], bawah = atas.map((x) => 2 * x - 1);
    assert.deepEqual([...deretLain(atas)], [43], "baris atas: aturan lain memberi X lain");
    const lainB = ujiTabel("B09-C04", atas.map((x, i) => [x, 0, bawah[i]]), [43, 0], 85);
    const X = 43, Y = 2 * X - 1;
    // revisi cek buta 3: gabungan bagian terbanyak per posisi (43 dengan 81 atau 89) = pilihan salah; kunci memegang Y = 85 yang tidak terbanyak
    const lajuBawah = (lompat) => bawah.at(-1) + (bawah.at(-1) - bawah.at(-2)) + (lompat ? 8 : 0);   // selisih bawah tetap 20 / dilompati 28
    const c = { A: [41, 2 * 41 - 1, "J-RATA"], B: [43, lajuBawah(false), "J-RATA"], C: [X, Y, "kunci"], D: [43, lajuBawah(true), "J-NOMOR"], E: [45, 2 * 45 - 1, "J-NOMOR"] };
    assert.deepEqual(H.map((h) => c[h].slice(0, 2).join(" dan ")), ["41 dan 81", "43 dan 81", "43 dan 85", "43 dan 89", "45 dan 89"], "jalur X-Y dihitung");
    const semua = H.flatMap((h) => [c[h][0], c[h][1]]), frek = (v) => semua.filter((u) => u === v).length, skor = Object.fromEntries(H.map((h) => [h, frek(c[h][0]) + frek(c[h][1])]));
    assert.ok(H.filter((h) => skor[h] >= skor.C).length >= 2, "kunci = skor frekuensi tertinggi tunggal");
    assert.ok(!H.some((h) => h !== "C" && ((c[h][0] === Y && c[h][1] === X) || (c[h][0] === X && c[h][1] === -Y))), "X-Y tertukar / cermin tanda");
    const teks = Object.fromEntries(H.map((h) => [h, `${c[h][0]} dan ${c[h][1]}`])), kode = Object.fromEntries(H.map((h) => [h, c[h][2]]));
    return { teks, kode, fungsi: { A: "selisih atas tetap 10, bawah dari atas", B: "X benar, selisih bawah dianggap tetap 20", D: "X benar, selisih bawah dilompati (28)", E: "selisih atas dilompati (14), bawah dari atas" }, kunci: "C", urut: false,
      tabel: { xy: [[...atas, "X"], [...bawah, "Y"]] }, bukti: { metode: "atas: selisih 4, 6, 8, 10 (aturan lain hanya 43); bawah = 2 × atas − 1 (rumus lain hanya 85); skor frekuensi", skor, lainB }, angka: [...bawah.slice(1).map((x, i) => x - bawah[i]), 14].map(fmt) };
  },
  "HB-TIU-B09-L01"() {
    const f = (k) => 4 * k - 5, kiri = [5, 2, 9, 7], N = 20, pts = kiri.map((k) => [k, f(k)]);
    const lain = ujiTabel("B09-L01", pts.map(([k, v]) => [k, 0, v]), [N, 0], f(N));
    const j = pilih({ A: [f(N - 1), "J-NOMOR", "kiriKurangSatu"], B: [f(N), "kunci", "4 × kiri − 5"], C: [f(N + 1), "J-NOMOR", "kiriLebihSatu"], D: [4 * N, "J-KONST", "lupaKonstanta"], E: [4 * N + 5, "J-TANDA", "tandaKonstanta"] });
    return { ...j, kunci: "B", urut: true, tabel: { duaKolom: pts }, bukti: { metode: "linear di 4 baris; rumus lain ≤ 3 operasi", lain }, angka: [] };
  },
  "HB-TIU-B09-L02"() {
    const f = (k) => k * (2 * k - 1), kiri = [3, 5, 8, 6], N = 11, pts = kiri.map((k) => [k, f(k)]);
    const lain = ujiTabel("B09-L02", pts.map(([k, v]) => [k, 0, v]), [N, 0], f(N));
    assert.equal(3 * 5, f(3), "kiri × (kiri + 2) cocok di baris pertama"); assert.notEqual(5 * 7, f(5));
    const j = pilih({ A: [N * (N + 2), "J-TIGA", "kiri × (kiri + 2)"], B: [f(N - 1), "J-NOMOR", "kiriKurangSatu"], C: [f(8) + 3 * ((f(8) - f(6)) / 2), "J-RATA", "linearDuaBarisAkhir"], D: [f(N), "kunci", "kiri × (2 × kiri − 1)"], E: [N * 2 * N, "J-KONST", "lupaKurang1"] });
    return { ...j, kunci: "D", urut: true, tabel: { duaKolom: pts }, bukti: { metode: "kanan : kiri = 2 × kiri − 1; rumus lain ≤ 3 operasi", lain }, angka: [] };
  },
  "HB-TIU-B09-L03"() {
    const atas = [5, 6, 4, 7], kiri = [5, 3, 8, 2], G = [atas];
    for (let i = 1; i < 4; i++) { G[i] = [kiri[i]]; for (let k = 1; k < 4; k++) G[i][k] = G[i][k - 1] + G[i - 1][k] - 2; }
    const petak = []; for (let i = 1; i < 4; i++) for (let k = 1; k < 4; k++) if (!(i === 3 && k === 3)) petak.push([G[i][k - 1], G[i - 1][k], G[i][k]]);
    const X = G[3][3], lain = ujiTabel("B09-L03", petak, [G[3][2], G[2][3]], X);
    assert.equal(G[1][1], G[0][1] + 1, "atas + 1 cocok di petak pertama");
    const j = pilih({ A: [G[2][3] + 1, "J-TIGA", "atas + 1 dari petak pertama"], B: [G[3][2] + (G[3][2] - G[3][1]), "J-RATA", "selisihSebarisTetap"], C: [X, "kunci", "kiri + atas − 2"], D: [G[3][2] + G[2][3], "J-LANGKAH", "lupaDikurangi2"], E: [G[3][2] + G[2][3] + 2, "J-TANDA", "ditambah2"] });
    return { ...j, kunci: "C", urut: true, tabel: { tetangga: G.map((r, i) => r.map((v, k) => (i === 3 && k === 3 ? "X" : v))) }, bukti: { metode: "8 petak isian dicek; rumus lain ≤ 3 operasi atas (kiri, atas)", lain }, angka: [] };
  },
  "HB-TIU-B09-L04"() {   // T6-6: Soal 2 bank deret tabel D'Ajiks; pilihan 51 (pencilan jarak) diganti 7 (c² − 2, cocok di baris 1 saja) agar kunci C
    const ok = (a, b, c, d) => a + b * c === d, baris = [[3, 4, 5], [6, 2, 7], [5, 3, 4]].map(([a, b, c]) => [a, b, c, a + b * c]), [a, b, c] = [8, 6, 3], X = a + b * c;
    assert.ok(5 * 5 - 2 === 23 && 7 * 7 - 2 !== 20, "c² − 2 cocok di baris 1 saja");
    const j = pilih({ A: [c * c - 2, "J-TIGA", "c² − 2 dari baris 1"], B: [b * c, "J-LANGKAH", "lupa + a"], C: [X, "kunci", "a + b × c"], D: [a * c + b, "J-PENGALIH", "a × c + b"], E: [(a + b) * c, "J-URUTAN", "(a + b) × c"] });
    ujiSumber("B09-L04", [...baris, [a, b, c, "X"]], ok, H.map((h) => j.nilai[h].num), X);
    return { ...j, kunci: "C", urut: true, tabel: { kisi: [...baris, [a, b, c, "X"]] }, bukti: { metode: "bank D'Ajiks GENERATE SOAL TERBARU SKD 2026, Deret Tabel Level 5–6 Soal 2 (pilihan 51 diganti 7); X tunggal (brute force); rumus lain sumber tidak membenarkan pilihan salah" }, angka: [] };
  },

  // ════════ BAB 10 ════════
  "HB-TIU-B10-P01"() {
    const V = 18, ani = V / 6, budi = V / 9, t1 = 2, sisa = V - (ani + budi) * t1, t2 = new Q(sisa, ani), total = t2.add(t1);
    assert.ok(total.num < 6 && total.num > V / (ani + budi), "masuk akal: lebih cepat dari Ani sendiri, lebih lambat dari berdua penuh");
    const j = pilih({ A: [t2, "J-LANGKAH", "lamaTahapAkhir"], B: [new Q(V, ani + budi), "J-ASUMSI", "BudiTerusBekerja"], C: [new Q(t1 * 60 + 2 * 60 + 24, 60), "J-SATUAN", "2,40 jam dibaca 2 jam 24 menit"], D: [new Q(t1 * 60 + 2 * 60 + 36, 60), "J-SATUAN", "⅔ jam dibaca 0,6 jam"], E: [total, "kunci", "2 jam + 8 : 3 jam"] }, jamMenit);
    return { ...j, kunci: "E", urut: true, bukti: { metode: "kapasitas 18 bagian (KPK 6, 9); tahap 1: 10 bagian, tahap 2: 8 bagian : 3", total: total.num }, angka: ["18", "6", "9", "3", "2", "5", "10", "8", "40", "60", "4", "36", "24", "1", "2,40", "4,40", "0,40"] };
  },
  "HB-TIU-B10-C01"() {
    const satuPersen = 360 / (75 - 45), kap = satuPersen * 100, isi = 45 * satuPersen, target = 90 * satuPersen, K = target - isi;
    const j = pilih({ A: [K / 10, "J-NOL", "kurangSatuNol"], B: [(90 - 75) * satuPersen, "J-PENGALIH", "keadaanAwal75%"], C: [45 * 75 * satuPersen / 100, "J-BASIS", "45% dari isi awal"], D: [45 * target / 100, "J-BASIS", "45% dari target isi"], E: [K, "kunci", "45% × kapasitas"] });
    return { ...j, kunci: "E", urut: true, bukti: { metode: "30% = 360 liter → kapasitas 1.200 liter; tambahan 45% × 1.200", kap }, angka: [fmt(360 / 300), "300"] };
  },
  "HB-TIU-B10-C02"() {
    const P = 20, R = 28, d = 8, h = 4, total = P * R, sisaKerja = total - P * d, sisaHari = R - d - h, perlu = sisaKerja / sisaHari;
    assert.ok(Number.isInteger(perlu)); const K = perlu - P;
    const j = pilih({ A: [P - P * sisaHari / (R - d), "J-SEARAH", "dihitungSenilai"], B: [K, "kunci", "400 : 16 − 20"], C: [total / sisaHari - P, "J-LANGKAH", "seluruhPekerjaanDianggapSisa"], D: [P * h / h, "J-ASUMSI", "tambahanHanyaEmpatHari"], E: [perlu, "J-LANGKAH", "jumlahBukanTambahan"] });
    return { ...j, kunci: "B", urut: true, bukti: { metode: "pekerja-hari tetap: 560; sisa 400 dalam 16 hari", perlu }, angka: [] };
  },
  "HB-TIU-B10-C03"() {
    const V = 30, a = V / 6, b = V / 10, c = V / 10, t1 = 2, d1 = (a + b - c) * t1, t2 = (V - d1) / (a - c), K = t1 + t2;
    assert.ok(K > V / (a + b - c), "masuk akal: lebih lama daripada bila B tetap terbuka");
    const tanda = (() => { const s = (a + b + c) * t1; return t1 + (V - s) / (a + c); })();
    const j = pilih({ A: [tanda, "J-TANDA", "pembuangDijumlah"], B: [V / (a + b - c), "J-ASUMSI", "BTetapTerbuka"], C: [t1 + (V - (a + b) * t1) / (a - c), "J-ASUMSI", "CBaruDibukaSaatBDitutup"], D: [t2, "J-LANGKAH", "lamaTahapKedua"], E: [K, "kunci", "2 jam + 20 : 2 jam"] }, jamMenit);
    return { ...j, kunci: "E", urut: true, bukti: { metode: "kapasitas 30 bagian; tahap 1 laju 5 + 3 − 3; tahap 2 laju 5 − 3" }, angka: [] };
  },
  "HB-TIU-B10-C04"() {
    const v1 = 18, v2 = 42, jeda = 20, berangkat2 = 7 * 60 + 35, jarak = new Q(v1 * jeda, 60), t = jarak.div(v2 - v1).mul(60);
    assert.ok(t.bulat); const K = berangkat2 + Number(t.n);
    const j = pilih({ A: [7 * 60 + 15 + Number(t.n), "J-LANGKAH", "lamaDitambahKePukulDika"], B: [berangkat2 + Number(jarak.div(v1 + v2).mul(60).n), "J-TANDA", "lajuDijumlah"],
      C: [berangkat2 + Number(new Q(v1 * 2, 10).div(v2 - v1).mul(60).n), "J-SATUAN", "20 menit dibaca 0,2 jam"], D: [K, "kunci", "6 km : 24 km/jam"], E: [berangkat2 + Number(jarak.div(v1).mul(60).n), "J-LAJU", "memakaiLajuDika"] }, pukul);
    for (const h of H) assert.ok(Number.isInteger(j.nilai[h].num));
    return { ...j, kunci: "D", urut: true, bukti: { metode: "jarak awal 18 × 20 : 60 = 6 km; laju relatif 42 − 18 = 24 km/jam" }, angka: [] };
  },
  "HB-TIU-B10-C05"() {
    const k = 300, T = 1200, v = 90 * 1000 / 3600, K = (T + k) / v;
    const j = pilih({ A: [(T - k) / v, "J-TANDA", "panjangKeretaDikurangkan"], B: [T / v, "J-LANGKAH", "panjangKeretaTerlupa"], C: [(T + k) / (90 / 3), "J-SATUAN", "dibagi3"], D: [K, "kunci", "1.500 : 25"], E: [(T + 2 * k) / v, "J-ASUMSI", "keretaDihitungDuaKali"] });
    return { ...j, kunci: "D", urut: true, bukti: { metode: "90 km/jam = 25 m/detik; jarak = 1.200 + 300" }, angka: [] };
  },
  "HB-TIU-B10-C06"() {
    const p = 3, q = 2, r = 7, s = 5, t = 5, b = t * (r - s) / (s * p - r * q), Ra = p * b, Di = q * b;
    assert.ok(Number.isInteger(b) && (Ra + t) * s === (Di + t) * r, "umur memenuhi kedua perbandingan");
    const j = pilih({ A: [p, "J-RASIO", "perbandinganDibacaUmur"], B: [p * (t / ((r - s) - (p - q))), "J-BASIS", "bagianTidakDisamakan"], C: [Di, "J-LANGKAH", "umurDimas"], D: [Di + t, "J-LANGKAH", "umurDimasLimaTahunLagi"], E: [Ra, "kunci", "selisih 10 tahun"] });
    return { ...j, kunci: "E", urut: true, bukti: { metode: "selisih tetap: 3 : 2 = 6 : 4 dan 7 : 5 → 1 bagian berubah = 5 tahun", Ra, Di }, angka: [] };
  },
  "HB-TIU-B10-C07"() {
    const L = 200000, beli = 80000, jual = L * 60 * 90 / 10000, persen = (x) => ((x - beli) / beli) * 100;
    const j = pilih({ A: [(jual - beli) * 100 / L, "J-BASIS", "untungDariHargaLabel"], B: [persen(L * 50 / 100), "J-BASIS", "diskonDijumlah"], C: [(jual - beli) / 1000, "J-SATUAN", "untungRupiahDibacaPersen"], D: [persen(jual), "kunci", "28.000 : 80.000"], E: [persen(L * 60 / 100), "J-LANGKAH", "hanyaDiskonPertama"] }, (x) => fmt(x) + "%");
    return { ...j, kunci: "D", urut: true, bukti: { metode: "jual 200.000 × 60% × 90% = 108.000; untung 28.000 dari 80.000", jual }, angka: [(jual - beli) / 1000, beli / 1000, L / 1000].map(fmt) };
  },
  "HB-TIU-B10-L01"() {
    const p = 5, q = 3, S = 30, u = S / (p - q), K = (p + q) * u;
    const j = pilih({ A: [p + q, "J-RASIO", "jumlahAngkaPerbandingan"], B: [p * u, "J-LANGKAH", "hanyaMilikAdi"], C: [(S / q) * (p + q), "J-BASIS", "selisihDikiraBagianBanu"], D: [K, "kunci", "8 × 15"], E: [S * (p + q), "J-BASIS", "selisihDikiraSatuBagian"] });
    return { ...j, kunci: "D", urut: true, bukti: { metode: "2 bagian = 30 → 1 bagian 15; jumlah 8 bagian" }, angka: [] };
  },
  "HB-TIU-B10-L02"() {
    const d = 90, v1 = 20, v2 = 60, t = d / v1 + d / v2, K = (2 * d) / t;
    const j = pilih({ A: [d / t, "J-LANGKAH", "jarakPulangTerlupa"], B: [K, "kunci", "180 : 6"], C: [(v1 + v2) / 2, "J-LAJU", "rataRataDuaLaju"], D: [(2 * d) / Math.floor(d / v1), "J-SATUAN", "4,5 jam dihitung 4 jam"], E: [(2 * d) / (t / 2), "J-LAJU", "dibagiRataRataWaktu"] });
    return { ...j, kunci: "B", urut: true, bukti: { metode: "total jarak 180 km : total waktu 4,5 + 1,5 jam" }, angka: [] };
  },
  "HB-TIU-B10-L03"() {
    const d = 60, hilir = d / 2, hulu = d / 3, perahu = (hilir + hulu) / 2, arus = (hilir - hulu) / 2;
    const j = pilih({ A: [arus, "J-PERINTAH", "menjawabLajuArus"], B: [hilir - hulu, "J-TANDA", "selisihHilirHulu"], C: [(2 * d) / 5, "J-LAJU", "kecepatanRataRataPulangPergi"], D: [perahu, "kunci", "(30 + 20) : 2"], E: [hilir, "J-LANGKAH", "lajuHilirDikiraLajuPerahu"] });
    return { ...j, kunci: "D", urut: true, bukti: { metode: "hilir 30 = perahu + arus, hulu 20 = perahu − arus" }, angka: [] };
  },
  "HB-TIU-B10-L04"() {
    const peti = 5, bruto = 40, tara = 5, harga = 15000, ongkos = 50000, neto = bruto * (100 - tara) / 100, K = peti * neto * harga;
    const j = pilih({ A: [peti * (bruto - tara) * harga, "J-SATUAN", "taraDibacaKilogram"], B: [peti * (bruto - 2 * (bruto - neto)) * harga, "J-LANGKAH", "taraDikurangkanDuaKali"], C: [K, "kunci", "190 kg × 15.000"], D: [K + ongkos, "J-PENGALIH", "ongkosSatuPetiIkutDihitung"], E: [peti * bruto * harga, "J-BASIS", "hargaDariBruto"] }, rp);
    return { ...j, kunci: "C", urut: true, bukti: { metode: "neto 38 kg per peti × 5 peti × Rp15.000" }, angka: [] };
  },
  "HB-TIU-B10-L05"() {
    const M = 2400000, r = 10, bulan = 18, bunga = M * r / 100 * bulan / 12, K = M + bunga;
    const j = pilih({ A: [M + M * r / 100 * 6 / 12, "J-LANGKAH", "hanyaEnamBulan"], B: [M + M * r / 100, "J-LANGKAH", "hanyaSatuTahun"], C: [K, "kunci", "modal + 10% × 1,5"], D: [M * 110 / 100 + M * 110 / 100 * r / 100 / 2, "J-BASIS", "bungaDibungakan"], E: [M + M * r / 100 * 16 / 10, "J-SATUAN", "1 tahun 6 bulan = 1,6 tahun"] }, rp);
    return { ...j, kunci: "C", urut: true, bukti: { metode: "bunga tunggal 2.400.000 × 10% × 18 : 12" }, angka: [] };
  },
};
