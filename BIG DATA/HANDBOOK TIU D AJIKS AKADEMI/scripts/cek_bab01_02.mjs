// Handbook TIU · Bab 1–2 · semua angka ilustrasi di narasi dihitung di sini, lalu dicek muncul di src.
// Bukan pembuat soal: tidak ada soal, opsi, atau kunci di berkas ini.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/cek_bab01_02.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const bab1 = readFileSync(join(AKAR, "src/11_bab01.html"), "utf8");
const bab2 = readFileSync(join(AKAR, "src/12_bab02.html"), "utf8");
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const ada = (html, s, ket) => assert.ok(html.includes(s), `tidak ditemukan di src: "${s}" (${ket})`);

// ── Bab 1 · angka Kepmen 406/2026 (Diktum KEEMPAT b, KELIMA a, KEENAM b, KEDELAPAN b, KESEPULUH b) ──
const SOAL = 35, BOBOT = 5, AMBANG = 80, AFIRMASI = 55, MAKS = 175;
assert.equal(SOAL * BOBOT, MAKS);
assert.equal(AMBANG % BOBOT, 0);
const minBenar = AMBANG / BOBOT;                       // 16
assert.equal(minBenar, 16);
assert.ok((minBenar - 1) * BOBOT < AMBANG);            // 15 benar = 75
ada(bab1, `${minBenar} × ${BOBOT} = ${AMBANG}`, "ambang");
ada(bab1, `${minBenar - 1} × ${BOBOT} = ${(minBenar - 1) * BOBOT}`, "satu kurang");
assert.equal(AFIRMASI / BOBOT, 11);
ada(bab1, `${AFIRMASI / BOBOT} jawaban benar`, "afirmasi");
ada(bab1, `${SOAL - minBenar} soal`, "boleh salah");    // 19
// tebakan 5 pilihan: harapan nilai 5 × 1/5 = 1
assert.equal(BOBOT * (1 / 5), 1);
ada(bab1, "5 × <span class=\"fr\"><sup>1</sup>⁄<sub>5</sub></span> = 1", "tebakan");

// ── Bab 1 · susunan 35 soal (rekonstruksi tryout rujukan) ──
const SUSUN = [
  ["Verbal", 31, 36, 6], ["Numerik", 37, 45, 9], ["Kecukupan data", 46, 52, 7],
  ["Penalaran analitis", 53, 55, 3], ["Optimasi", 56, 56, 1], ["Figural", 57, 65, 9],
];
for (const [, a, b, n] of SUSUN) assert.equal(b - a + 1, n);
assert.equal(SUSUN.reduce((s, r) => s + r[3], 0), SOAL);
assert.equal(SUSUN.at(-1)[2], 30 + SOAL);
const RINCI = { verbal: [2, 2, 2], numerik: [1, 3, 3, 2], figural: [2, 2, 2, 3] };
assert.equal(RINCI.verbal.reduce((a, b) => a + b), 6);
assert.equal(RINCI.numerik.reduce((a, b) => a + b), 9);
assert.equal(RINCI.figural.reduce((a, b) => a + b), 9);

// ── Bab 1 · patokan waktu (usulan D'Ajiks, Tabel 2C) ──
const TOTAL = (100 - 27 - 22.5) * 60;                  // 50,5 menit = 3.030 detik
assert.equal(TOTAL, 3030);
assert.equal(Math.round(TOTAL / SOAL), 87);            // 86,57 → ditulis "±86 detik" (dibulatkan ke bawah, mengikuti putusan)
assert.ok(TOTAL / SOAL > 86 && TOTAL / SOAL < 87);
const BLOK = [ // [nama, nomor, soal, detik/soal, titik periksa?]
  ["Verbal", "31–36", 6, 60, true], ["Hitung cepat", "37", 1, 30, false], ["Numerik lain", "38–45", 8, 75, true],
  ["Kecukupan data", "46–52", 7, 90, true], ["Penalaran analitis", "53–55", 3, 120, true],
  ["Optimasi", "56", 1, 120, true], ["Figural", "57–65", 9, 60, true],
];
assert.equal(BLOK.reduce((s, b) => s + b[2], 0), SOAL);
let t = 0;
const TITIK = [];
for (const [nama, no, n, d, periksa] of BLOK) {
  t += n * d;
  ada(bab1, `<td>${no}</td><td>${n}</td><td>${d}</td><td>${mmss(n * d)}</td>`, `baris ${nama}`);
  if (periksa) TITIK.push([no.split("–").at(-1), t]);
}
const CADANGAN = TOTAL - t;
assert.equal(CADANGAN, 390);                           // 6:30
ada(bab1, mmss(CADANGAN), "cadangan");
const PATOKAN_MAKS = Math.max(...BLOK.map((b) => b[3]));    // soal macet di batas 2× patokan memakan 1× patokan dari cadangan
assert.ok(PATOKAN_MAKS < CADANGAN / 3);
ada(bab1, `${PATOKAN_MAKS} detik dari cadangan ${CADANGAN} detik`, "batas dua kali patokan");
assert.deepEqual(TITIK.map((x) => mmss(x[1])), ["6:00", "16:30", "27:00", "33:00", "35:00", "44:00"]);
// contoh lembar: TWK dikerjakan dulu, selesai menit ke-27, jam layar menghitung mundur dari 100:00 (andaian)
const MULAI = (100 - 27) * 60;
for (const [no, s] of TITIK) ada(bab1, `<td>${no}</td><td>${mmss(s)}</td><td>${mmss(MULAI - s)}</td>`, `lembar no ${no}`);
ada(bab1, `<td>${mmss(TOTAL)}</td><td>${mmss(MULAI - TOTAL)}</td>`, "lembar akhir");
assert.equal(mmss(MULAI - TOTAL), "22:30");            // = jatah TKP

// ── Bab 2 · contoh penyangkal: titik pada lingkaran ──
const C = (n, k) => (k < 0 || k > n ? 0 : k === 0 ? 1 : (C(n - 1, k - 1) * n) / k);
function daerah(sudut) {               // banyak daerah = 1 + banyak tali busur + Σ(tali busur lewat titik potong − 1)
  const P = sudut.map((a) => [Math.cos(a), Math.sin(a)]);
  const n = P.length, tali = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) tali.push([i, j]);
  const titik = new Map();
  for (let x = 0; x < tali.length; x++) for (let y = x + 1; y < tali.length; y++) {
    const [a, b] = tali[x], [c, d] = tali[y];
    if (new Set([a, b, c, d]).size < 4) continue;
    if ((a < c && c < b) === (a < d && d < b)) continue;          // tidak bersilangan di dalam lingkaran
    const [p1, p2, p3, p4] = [P[a], P[b], P[c], P[d]];
    const den = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    const u = ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) / den;
    const q = [p1[0] + u * (p2[0] - p1[0]), p1[1] + u * (p2[1] - p1[1])];
    const k = q.map((v) => v.toFixed(7)).join();
    (titik.get(k) ?? titik.set(k, new Set()).get(k)).add(x).add(y);
  }
  return 1 + tali.length + [...titik.values()].reduce((s, t) => s + t.size - 1, 0);
}
const ACAK = [0.3, 1.1, 2.0, 2.6, 3.9, 5.2];           // titik tidak beraturan (urut naik)
const hasil = [1, 2, 3, 4, 5, 6].map((n) => daerah(ACAK.slice(0, n)));
assert.deepEqual(hasil, [1, 2, 4, 8, 16, 31]);
for (let n = 1; n <= 6; n++) assert.equal(hasil[n - 1], C(n, 4) + C(n, 2) + 1);
assert.deepEqual([1, 2, 3, 4, 5, 6].map((n) => 2 ** (n - 1)), [1, 2, 4, 8, 16, 32]);
const SEGI6 = daerah([0, 1, 2, 3, 4, 5].map((i) => (i * Math.PI) / 3));
assert.equal(SEGI6, 30);
assert.equal(daerah([0.3, 1.1, 2.0, 2.6, 3.9, 4.6, 5.6]), 57);  // tujuh titik (catatan pengajar)
ada(bab2, "1, 2, 4, 8, 16, 31, 57", "rumus di catatan pengajar");                               // tiga diagonal panjang bertemu di pusat
ada(bab2, "1, 2, 4, 8, 16", "barisan daerah");
ada(bab2, "32", "tebakan berlipat dua");
ada(bab2, "31 daerah", "hitungan enam titik");
ada(bab2, "30 daerah", "segi enam beraturan");
// bilangan prima genap: 2
const prima = (n) => n > 1 && [...Array(n).keys()].slice(2).every((d) => n % d);
assert.ok(prima(2) && 2 % 2 === 0);
assert.deepEqual([...Array(20).keys()].filter((n) => prima(n) && n % 2 === 0), [2]);

// ── Bab 2 · empat prinsip ──
assert.equal(36 * 25, (36 * 100) / 4);                 // prinsip 1: ×25 = ×100 lalu ÷4
ada(bab2, `36 × 25 = ${fmt(36 * 100)} : 4 = ${fmt(36 * 25)}`, "kali 25");
assert.equal(24 * 50, 12 * 100);                       // prinsip 2: hasil kali tetap
ada(bab2, `24 × 50 = 12 × 100 = ${fmt(1200)}`, "hasil kali tetap");
assert.equal(7 ** 2, 49); assert.equal((-7) ** 2, 49);  // prinsip 3: x² = 49
ada(bab2, "(−7)² = 49", "contoh penyangkal kuadrat");
const lo = 190 * 50, hi = 200 * 52, tepat = 198 * 51;   // prinsip 4: batas bawah–atas
assert.ok(lo < tepat && tepat < hi);
assert.deepEqual([lo, hi, tepat], [9500, 10400, 10098]);
ada(bab2, `190 × 50 = ${fmt(lo)}`, "batas bawah");
ada(bab2, `200 × 52 = ${fmt(hi)}`, "batas atas");
ada(bab2, `198 × 51 = ${fmt(tepat)}`, "hasil tepat");

console.log("cek_bab01_02: semua assert lulus ·", { minBenar, cadangan: mmss(CADANGAN), daerah: hasil, segi6: SEGI6 });
