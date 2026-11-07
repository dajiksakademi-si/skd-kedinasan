// Handbook TIU · Tahap 5 numerik · model hitung Bab 6–7 (HIT, PKU, PAS).
// Setiap butir: kunci dihitung, setiap pilihan salah = jalur kesalahan bernama yang dihitung (ungkapan dievaluasi tepat),
// kunci tunggal dibuktikan. Teks pilihan dibentuk di sini; data JSON wajib sama persis (diperiksa soal_numerik.mjs).
import assert from "node:assert/strict";
import { Q, hitung, fmt } from "./alat.mjs";

const H = ["A", "B", "C", "D", "E"];
// pilihan angka: { huruf: [ungkapan jalur, kode, fungsi] } → nilai, teks, kode
function jalur(peta) {
  const nilai = {}, teks = {}, kode = {}, fungsi = {};
  for (const [h, [u, k, f]] of Object.entries(peta)) { nilai[h] = hitung(u); teks[h] = fmt(nilai[h]); kode[h] = k; fungsi[h] = `${f}: ${u}`; }
  return { nilai, teks, kode, fungsi };
}
const PKU = { A: "P > Q", B: "P < Q", C: "P = Q", D: "Hubungan P dan Q tidak dapat ditentukan" };
const rel = (p, q) => (p.num > q.num ? "A" : p.num < q.num ? "B" : "C");

// pasangan: "x dan y" → nilai kedua ruas
const ruas = (s) => s.split(" dan ").map(hitung);
const digit = (u) => u.replace(/[^\d]/g, "").split("").sort().join("");
function pasangan(id, opsi, kode, { tidak = false } = {}) {
  const sama = H.filter((h) => { const [x, y] = ruas(opsi[h]); return x.eq(y); });
  const kunci = tidak ? H.filter((h) => !sama.includes(h)) : sama;
  assert.equal(kunci.length, 1, `${id}: pasangan ${tidak ? "TIDAK " : ""}sama tidak tunggal (${kunci})`);
  // lintCermin: bentuk a × 10^k b dan b × 10^k a (selalu sama) dilarang sebagai pilihan salah; J-CERMIN wajib angka susun ulang + nilai beda
  for (const h of H) {
    const [kiri, kanan] = opsi[h].split(" dan ");
    const m = [kiri, kanan].map((s) => s.match(/^(\d+) × (\d+)$/));
    if (m[0] && m[1]) {
      const [a, b] = [m[0][1], m[0][2]], [c, d] = [m[1][1], m[1][2]];
      const tanpa0 = (x) => x.replace(/0+$/, "");
      const cerminSejati = tanpa0(a) === tanpa0(d) && tanpa0(b) === tanpa0(c);
      if (cerminSejati && h !== kunci[0]) assert.fail(`${id} ${h}: cermin sejati sebagai pilihan salah`);
    }
    if (kode[h] === "J-CERMIN") { const [x, y] = ruas(opsi[h]); assert.ok(digit(kiri) === digit(kanan) && !x.eq(y), `${id} ${h}: J-CERMIN bukan susun ulang angka`); }
  }
  const nilai = Object.fromEntries(H.map((h) => [h, ruas(opsi[h]).map(fmt).join(" dan ")]));
  return { kunci: kunci[0], nilai, sama, kode };
}

export const MODEL = {
  // ════════ BAB 6 ════════
  "HB-TIU-B06-P01"() {                       // perkiraan (a × b) : c
    const tepat = hitung("647 × 87 : 21");
    const j = jalur({ A: ["600 × 90 : 30", "J-BULAT", "pembagiBerlawanan"], B: ["700 × 90 : 30", "J-BULAT", "semuaNaik"], C: ["600 × 80 : 20", "J-BULAT", "keduaFaktorTurun"],
      D: ["600 × 90 : 20", "kunci", "berlawananPembagiSearah"], E: ["600 × 100 : 20", "J-BULAT", "87DibulatkanKeRatusan"] });
    assert.ok(600 < 647 && 90 > 87 && 600 * 90 < 647 * 87 && 20 < 21, "arah pembulatan kunci");
    const jarak = Object.fromEntries(H.map((h) => [h, Math.abs(j.nilai[h].num - tepat.num)]));
    const dekat = H.reduce((a, h) => (jarak[h] < jarak[a] ? h : a), "A");
    assert.equal(dekat, "D", "nilai tepat terdekat ke kunci");
    const v = H.map((h) => j.nilai[h].num), gapMin = Math.min(...v.slice(1).map((x, i) => x - v[i]));
    assert.ok(jarak.D < gapMin / 2, "selisih nilai tepat < setengah jarak terkecil antarpilihan");
    return { ...j, kunci: "D", urut: true, bukti: { metode: "nilai tepat 56.289 : 21 = 2.680,43 terdekat ke D; tiap jalur pembulatan menunjuk pilihannya", tepat: tepat.num.toFixed(2) },
      angka: [...new Set(H.slice(1).map((h, i) => fmt(j.nilai[h].sub(j.nilai[H[i]]))))].concat(["647", "87", "21", "600", "90", "20", "54.000", "56.289", "2.680", "2.700", "84", "4", "2.588", "56.700", "30", "700", "80", "7%", "3%", "5%", "1%", Math.round((100 / 87 - 1) * 100) + "%"]) };
  },
  "HB-TIU-B06-C02"() {                       // hitung campuran tepat
    const j = jalur({ A: ["125% × 96 − (36 : 1,5 + 3{2/5} × 10)", "J-URUTAN", "kurangSesudahTambah"], B: ["(125% × 96 − 36) : 1,5 + 3{2/5} × 10", "J-URUTAN", "kurangSebelumBagi"],
      C: ["125% × 96 − 36 × 1,5 + 3{2/5} × 10", "J-SEDERHANA", "bagiDesimalJadiKali"], D: ["125% × 96 − 36 : 1,5 + {11/5} × 10", "J-SEDERHANA", "campuranKeliru"],
      E: ["125% × 96 − 36 : 1,5 + 3{2/5} × 10", "kunci", "urutanBenar"] });
    return { ...j, kunci: "E", urut: true, sisa9: true, bukti: { metode: "pecahan tepat; tiap jalur salah dievaluasi; sisa bagi 9 kunci tunggal" },
      angka: ["125%", "96", "36", "1,5", "3", "2", "5", "10", "120", "24", "34", "130", "4", "17", "5", "100", "1.000", "12", "8", "120", "96", "3", "2", "1", "9", "13", "11", "22", "54", "84", "56", "6"] };
  },
  "HB-TIU-B06-C03"() {                       // tukar persen + distributif
    const j = jalur({ A: ["36% × 175 + 63 × 98", "kunci", "tukarPersenDistributif"], B: ["36% × 100 + 75 + 63 × 98", "J-BASIS", "persenHanya100"],
      C: ["63 × 100", "J-LANGKAH", "lupaDikurangi63"], D: ["63 × 100 + 63", "J-TANDA", "tandaTerbalik"], E: ["63 × 100 + 63 × 2 + 63", "J-TANDA", "tandaDistributifTerbalik"] });
    assert.ok(hitung("36% × 175").eq(hitung("175% × 36")) && hitung("36% × 175").eq(63), "36% dari 175 = 175% dari 36 = 63");
    return { ...j, kunci: "A", urut: true, bukti: { metode: "pecahan tepat: 36% × 175 = 63, 63 + 63 × 98 = 63 × 99" },
      angka: ["36%", "175", "175%", "36", "63", "98", "99", "100", "6.300", "6.237", "6.174", "126", "27", "75%", "0", "9", "18", "1", "75", "111", "630", "6.804", "6.285", "6.363", "2"] };
  },
  "HB-TIU-B06-C04"() {                       // perbandingan kuantitatif, dua bilangan
    const P = hitung("103 × 97"), Q_ = hitung("101 × 99");
    const kunci = rel(P, Q_);
    assert.equal(kunci, "B");
    assert.equal(rel(hitung("103 × 100"), hitung("101 × 100")), "A", "pembulatan sepihak membalik hubungan");
    assert.equal(rel(hitung("100 × 100"), hitung("100 × 100")), "C", "semua dibulatkan → dikira sama");
    assert.ok(Math.abs(P.num - Q_.num) / Q_.num < 0.05, "selisih relatif < 5%");
    return { teks: { ...PKU }, kode: { A: "J-BULAT", B: "kunci", C: "J-BULAT", D: "J-TENTU" }, fungsi: { A: "pembulatanSepihak: 103 × 100 dan 101 × 100", C: "semuaKe100: 100 × 100", D: "dikiraTakTentu" },
      kunci, urut: false, empat: true, bukti: { metode: "P = 9.991, Q = 9.999 dihitung tepat", P: P.num, Q: Q_.num },
      angka: ["103", "97", "101", "99", "100", "3", "1", "10.000", "9", "9.991", "9.999", "8", "10.300", "10.100", "2", "200"] };
  },
  "HB-TIU-B06-L01"() {
    const j = jalur({ A: ["54 : (−9) − 7 × (2 − (−3))", "J-TANDA", "bagiNegatifJadiNegatif"], B: ["−54 : (−9) − 7 × (2 − (−3))", "kunci", "benar"],
      C: ["(−54 : (−9) − 7) × (2 − (−3))", "J-URUTAN", "kurangSebelumKali"], D: ["−54 : (−9) − (2 − (−3))", "J-LANGKAH", "kali7Terlewat"], E: ["−54 : (−9) − 7 × (2 − 3)", "J-TANDA", "kurangNegatifDibacaKurang"] });
    return { ...j, kunci: "B", urut: true, bukti: { metode: "pecahan tepat; tiap jalur dievaluasi" }, angka: [] };
  },
  "HB-TIU-B06-L02"() {
    const tepat = hitung("1.987 : {5/8}");
    const j = jalur({ A: ["200 × 8 : 5", "J-NOL", "kurangSatuNol"], B: ["2.000 : 5", "J-LANGKAH", "lupaKali8"], C: ["2.000 × 5 : 8", "J-SEDERHANA", "dikaliBukanDibagi"],
      D: ["2.000 × 8 : 5", "kunci", "bagiPecahan"], E: ["2.000 : {1/2}", "J-BULAT", "lima8Jadi1per2"] });
    const jarak = Object.fromEntries(H.map((h) => [h, Math.abs(j.nilai[h].num - tepat.num)]));
    assert.equal(H.reduce((a, h) => (jarak[h] < jarak[a] ? h : a), "A"), "D");
    return { ...j, kunci: "D", urut: true, bukti: { metode: "nilai tepat 3.179,2 terdekat ke D", tepat: tepat.num }, angka: [] };
  },
  "HB-TIU-B06-L03"() {                       // PKU berpeubah: hubungan pasti untuk setiap x (T4-13)
    const P = (x) => x * x + 3, Qx = (x) => 8 * x - 9, R = [7, 8, 9, 10];
    const hub = new Set(R.map((x) => (P(x) > Qx(x) ? "A" : P(x) < Qx(x) ? "B" : "C")));
    assert.deepEqual([...hub], ["A"], "P > Q untuk setiap x di 6 < x < 11");
    assert.equal(P(6), Qx(6), "x = 6 (di luar rentang) memberi P = Q");
    assert.ok(P(7) < 8 * 7 + 9, "tanda −9 dibaca +9 di x = 7 memberi P < Q");
    return { teks: { ...PKU }, kode: { A: "kunci", B: "J-TANDA", C: "J-BATAS", D: "J-TENTU" }, fungsi: { B: "Q = 8x + 9 di x = 7", C: "x = 6 ikut dihitung", D: "dikiraTakTentu" },
      kunci: "A", urut: false, empat: true, bukti: { metode: "semua x bulat 7–10 dihitung: P > Q di keempatnya; P − Q = (x − 2)(x − 6)", nilai: R.map((x) => [x, P(x), Qx(x)]) }, angka: [] };
  },

  // ════════ BAB 7 ════════
  "HB-TIU-B07-P01"(b) {
    const p = pasangan("B07-P01", b.opsi, b.kode);
    const V = hitung("27 × 56");
    for (const h of ["A", "B", "E"]) assert.ok(ruas(b.opsi[h])[0].eq(V), `B07-P01 ${h}: ruas kiri = nilai kunci`);
    assert.ok(hitung("84 : 2").num !== 44 && hitung("18 × 2").eq(36), "B07-P01 E: faktor dipindah keliru (84 : 2 ditulis 44)");
    const [x, y] = ruas(b.opsi.D); assert.ok(Math.abs(x.num - y.num) <= 2, "B07-P01 D: dua ruas berdekatan");
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas tiap pilihan dihitung tepat", nilai: p.nilai },
      angka: ["27", "56", "36", "42", "2", "3", "7", "1.512", "28", "54", "32", "48", "1.536", "24", "63", "12", "125", "1.500", "31", "49", "33", "46", "1.519", "1.518", "18", "84", "280", "15.120", "4", "6", "9", "14", "0"] };
  },
  "HB-TIU-B07-C01"(b) {
    const p = pasangan("B07-C01", b.opsi, b.kode);
    assert.ok(ruas(b.opsi.C)[0].eq(hitung("34 × 260")), "B07-C01 C: ruas kiri = nilai kunci");
    assert.ok(ruas(b.opsi.E)[0].eq(hitung("34 × 260")), "B07-C01 E: ruas kiri = nilai kunci");
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas tiap pilihan dihitung tepat; lintCermin", nilai: p.nilai }, angka: [] };
  },
  "HB-TIU-B07-C02"(b) {
    const p = pasangan("B07-C02", b.opsi, b.kode);
    assert.ok(hitung("1.188 : 11").eq(108) && hitung("33 : 11").eq(3) && hitung("792 : 11").eq(72) && hitung("22 : 11").eq(2), "B07-C02: coret 11");
    for (const h of ["A", "C"]) assert.ok(ruas(b.opsi[h])[0].eq(36), `B07-C02 ${h}: ruas kiri = 36`);
    assert.ok(hitung("1.008 : 4").eq(252) && hitung("56 : 8").eq(7), "B07-C02 B: coret 4 dan 8 menghasilkan 252 : 7");
    assert.ok(ruas(b.opsi.D)[0].eq(36), "B07-C02 D: ruas kiri = 36");
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas tiap pilihan dihitung tepat; kali silang kunci", nilai: p.nilai }, angka: ["11"] };
  },
  "HB-TIU-B07-C03"(b) {
    const p = pasangan("B07-C03", b.opsi, b.kode);
    assert.ok(hitung("120 : (6 × 2)").eq(hitung("5 × 8 : 4")), "B07-C03 C: urutan keliru membuat kedua ruas tampak sama");
    for (const h of ["B", "E"]) assert.ok(ruas(b.opsi[h])[0].eq(54), `B07-C03 ${h}: ruas kiri = 54`);
    assert.ok(ruas(b.opsi.D)[1].eq(54), "B07-C03 D: ruas kanan = 54");
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas dihitung kiri ke kanan; jalur urutan keliru diuji", nilai: p.nilai }, angka: [] };
  },
  "HB-TIU-B07-L01"(b) {
    const p = pasangan("B07-L01", b.opsi, b.kode);
    for (const h of ["A", "C", "D", "E"]) assert.ok(ruas(b.opsi[h])[0].eq(1080), `B07-L01 ${h}: ruas kiri = nilai kunci`);
        const pola = (h) => { const [[a, b], [c, d]] = b2(h); return [c / a, d / b]; };
    const b2 = (h) => b.opsi[h].split(" dan ").map((t) => t.split(" × ").map((x) => +x.replace(/\./g, "")));
    // revisi cek buta 3: kelima pilihan berpola pindah faktor yang rapi; hanya kunci yang pengali dan pembaginya sama (÷3 ×3)
    assert.deepEqual(["A", "B", "C", "D", "E"].map(pola), [[1 / 3, 2], [1 / 3, 3], [3, 1 / 2], [2, 1 / 3], [1 / 2, 1 / 2]], "B07-L01: pola faktor tepat di semua pilihan");
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas tiap pilihan dihitung tepat", nilai: p.nilai }, angka: [] };
  },
  "HB-TIU-B07-L02"(b) {
    const p = pasangan("B07-L02", b.opsi, b.kode, { tidak: true });
    assert.equal(p.sama.length, 4, "B07-L02: empat pasangan sama");
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas tiap pilihan dihitung tepat; tepat satu pasangan tidak sama", nilai: p.nilai }, angka: [] };
  },
  "HB-TIU-B07-L03"(b) {
    const p = pasangan("B07-L03", b.opsi, b.kode);
    for (const h of H) {                     // semua pilihan berbentuk ab × cd dan ba × dc; sama ⟺ a·c = b·d
      const m = b.opsi[h].match(/^(\d)(\d) × (\d)(\d) dan (\d)(\d) × (\d)(\d)$/); assert.ok(m && m[1] === m[6] && m[2] === m[5] && m[3] === m[8] && m[4] === m[7], `B07-L03 ${h}: bentuk ab × cd dan ba × dc`);
      assert.equal(+m[1] * +m[3] === +m[2] * +m[4], h === p.kunci, `B07-L03 ${h}: uji a·c = b·d`);
    }
    for (const h of ["C", "E"]) assert.ok(ruas(b.opsi[h])[0].eq(2016), `B07-L03 ${h}: ruas kiri = nilai kunci`);
    return { ...p, teks: b.opsi, urut: false, bukti: { metode: "kedua ruas dihitung tepat + uji a·c = b·d", nilai: p.nilai }, angka: [] };
  },
};
export { PKU };
