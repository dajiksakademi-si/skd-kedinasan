// Handbook TIU · Bab 3–5 · status logika di narasi Bab 4 (dan ingkaran "lebih" Bab 5) dihitung di sini, lalu dicek muncul di src.
// Bukan pembuat soal: tidak ada soal, opsi, atau kunci di berkas ini. Bab 3 tanpa angka/logika yang dapat dihitung.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/cek_bab03_05.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const bab4 = readFileSync(join(AKAR, "src/14_bab04.html"), "utf8");
const bab5 = readFileSync(join(AKAR, "src/15_bab05.html"), "utf8");
const ada = (html, s, ket) => assert.ok(html.includes(s), `tidak ditemukan di src: "${s}" (${ket})`);

// ── dunia himpunan: n kelompok → 2^n daerah; satu dunia = daerah mana yang berisi ──
function dunia(n, tidakKosong) {
  const D = 1 << n, hasil = [];
  for (let w = 0; w < 1 << D; w++) {
    const isi = [...Array(D).keys()].filter((r) => (w >> r) & 1);
    if (tidakKosong && ![...Array(n).keys()].every((k) => isi.some((r) => (r >> k) & 1))) continue;
    hasil.push(isi);
  }
  return hasil;
}
const di = (r, k) => (r >> k) & 1;
const semua = (a, b) => (isi) => isi.every((r) => !di(r, a) || di(r, b));
const tidakAda = (a, b) => (isi) => isi.every((r) => !(di(r, a) && di(r, b)));
const sebagian = (a, b) => (isi) => isi.some((r) => di(r, a) && di(r, b));
const sebagianBukan = (a, b) => (isi) => isi.some((r) => di(r, a) && !di(r, b));
const bukanKeBukan = (a, b) => (isi) => isi.every((r) => di(r, a) || !di(r, b)); // yang bukan a bukan b

function status(n, premis, simpul) {
  const hasil = [false, true].map((tk) => {          // dua bacaan: himpunan boleh kosong / pasti beranggota
    const sah = dunia(n, tk).filter((w) => premis.every((p) => p(w)));
    assert.ok(sah.length, "premis tidak dapat dipenuhi bersama");
    const nilai = sah.map(simpul);
    return nilai.every(Boolean) ? "pasti benar" : nilai.some(Boolean) ? "tidak dapat dipastikan" : "pasti salah";
  });
  return hasil;
}
const tetap = (n, premis, simpul) => {
  const [a, b] = status(n, premis, simpul);
  assert.equal(a, b, "status berubah menurut bacaan himpunan kosong");
  return a;
};

// uji diri: pola sah lolos, pola sesat gugur
const [A, B, C] = [0, 1, 2];
assert.equal(tetap(3, [semua(A, B), semua(B, C)], semua(A, C)), "pasti benar");
assert.equal(tetap(3, [semua(A, B), tidakAda(B, C)], tidakAda(A, C)), "pasti benar");
assert.equal(tetap(2, [semua(A, B)], semua(B, A)), "tidak dapat dipastikan");

// ── Bab 4 · gambar himpunan: "sebagian" = paling sedikit satu, mungkin semua ──
assert.ok(dunia(2, false).some((w) => semua(A, B)(w) && sebagian(A, B)(w)));
ada(bab4, "tetap benar walaupun ternyata semua A adalah B", "sebagian mungkin semua");

// Catatan: semua A adalah B → sebagian B adalah A hanya bila A beranggota
assert.deepEqual(status(2, [semua(A, B)], sebagian(B, A)), ["tidak dapat dipastikan", "pasti benar"]);
ada(bab4, "Hanya bila kelompok A beranggota", "catatan himpunan kosong");

// ── Bab 4 · satu premis, tiga kesimpulan (P = paduan suara, X = kelas XI) ──
const [P, X] = [0, 1];
const premis1 = [semua(P, X)];
const T1 = [
  ["Semua siswa kelas XI adalah anggota paduan suara.", semua(X, P), "tidak dapat dipastikan"],
  ["Siswa yang bukan kelas XI bukan anggota paduan suara.", bukanKeBukan(X, P), "pasti benar"],
  ["Ada anggota paduan suara yang bukan siswa kelas XI.", sebagianBukan(P, X), "pasti salah"],
];
for (const [kal, f, st] of T1) {
  assert.equal(tetap(2, premis1, f), st, kal);
  ada(bab4, `<td>${kal}</td><td>${st}</td>`, "tabel tiga kesimpulan");
}

// ── Bab 4 · premis berantai ──
assert.equal(tetap(3, [semua(A, B), semua(B, C)], semua(A, C)), "pasti benar");
assert.equal(tetap(3, [semua(A, B), semua(B, C)], semua(C, A)), "tidak dapat dipastikan");
ada(bab4, "<b>semua A adalah C</b> pasti benar", "rantai");
ada(bab4, "\"semua C adalah A\" tidak dapat dipastikan", "rantai dibalik");

// ── Bab 4 · ingkaran "semua" ──
for (const w of dunia(2, false)) assert.equal(!semua(A, B)(w), sebagianBukan(A, B)(w));
assert.ok(dunia(2, false).some((w) => !semua(A, B)(w) && !tidakAda(A, B)(w)));   // "semua A bukan B" bukan ingkarannya
ada(bab4, "<td>Ada A yang bukan B</td>", "ingkaran semua");

// ── Bab 4 · tabel kebenaran ──
const K = [[true, true], [true, false], [false, true], [false, false]];
const jika = (p, q) => !p || q;
const kata = (b) => (b ? "benar" : "salah");
for (const [p, q] of K) {
  ada(bab4, `<tr><td>${kata(p)}</td><td>${kata(q)}</td><td>${kata(jika(p, q))}</td>`, "baris tabel kebenaran");
  assert.equal(jika(!q, !p), jika(p, q));             // kontraposisi setara
  assert.equal(!p || q, jika(p, q));                   // tidak p atau q setara
  assert.equal(jika(q, p), jika(!p, !q));              // konvers = "tidak" di dua sisi (kembar)
  assert.equal(p && !q, !jika(p, q));                  // ingkaran = keadaan terlarang
  assert.equal(!p || !q, !(p && q));                   // ingkaran "dan"
  assert.equal(!p && !q, !(p || q));                   // ingkaran "atau"
}
assert.equal(K.filter(([p, q]) => !jika(p, q)).length, 1);           // satu keadaan terlarang
assert.ok(K.some(([p, q]) => jika(q, p) !== jika(p, q)));            // konvers tidak setara
assert.ok(K.some(([p, q]) => jika(!p, !q) !== jika(p, q)));          // "tidak-tidak" tidak setara
assert.equal(true || true, true);                                     // "atau" inklusif: benar bila keduanya benar

// ── Bab 4 · empat cara membaca "jika hujan turun, maka lapangan basah" (h, b) ──
const fakta = { "Hujan turun.": ([h]) => h, "Lapangan tidak basah.": ([, b]) => !b, "Lapangan basah.": ([, b]) => b, "Hujan tidak turun.": ([h]) => !h };
const simpul = { "Lapangan basah.": ([, b]) => b, "Hujan tidak turun.": ([h]) => !h, "Hujan turun.": ([h]) => h, "Lapangan tidak basah.": ([, b]) => !b };
const T2 = [
  ["Hujan turun.", "Lapangan basah.", "pasti benar"],
  ["Lapangan tidak basah.", "Hujan tidak turun.", "pasti benar"],
  ["Lapangan basah.", "Hujan turun.", "tidak dapat dipastikan"],
  ["Hujan tidak turun.", "Lapangan tidak basah.", "tidak dapat dipastikan"],
];
for (const [f, s, st] of T2) {
  const nilai = K.filter(([h, b]) => jika(h, b) && fakta[f]([h, b])).map(simpul[s]);
  assert.equal(nilai.every(Boolean) ? "pasti benar" : nilai.some(Boolean) ? "tidak dapat dipastikan" : "pasti salah", st, f);
  ada(bab4, `<td>${f}</td><td>${s}</td><td>${st}</td>`, "tabel hujan");
}
// contoh penyangkal dua baris terakhir: hujan tidak turun, lapangan basah (disiram)
const siram = [false, true];
assert.ok(jika(...siram) && fakta["Lapangan basah."](siram) && !simpul["Hujan turun."](siram));
assert.ok(fakta["Hujan tidak turun."](siram) && !simpul["Lapangan tidak basah."](siram));
ada(bab4, "lapangan disiram petugas", "penyangkal");

// ── Bab 5 · ingkaran "lebih": tidak lebih = sama atau kurang ──
const tidakLebih = (x, y) => !(x > y);
assert.ok(tidakLebih(5, 5) && tidakLebih(4, 5) && !tidakLebih(6, 5));
ada(bab5, "Ingkaran \"lebih bugar\" adalah \"tidak lebih bugar\", yaitu sama bugar atau kurang bugar", "ingkaran lebih");

console.log("cek_bab03_05: semua assert lulus ·", { dunia2: dunia(2, false).length, dunia3: dunia(3, false).length });
