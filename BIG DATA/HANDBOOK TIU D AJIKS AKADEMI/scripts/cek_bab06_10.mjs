// Handbook TIU · Bab 6–10 · semua angka di narasi dan tabel penjelas dihitung di sini, lalu dicek muncul persis di src.
// Bukan pembuat soal: tidak ada soal, opsi, atau kunci baru di berkas ini. Pengecualian yang diperiksa (bukan dibuat):
// Contoh 1 Bab 6 (disetujui T3-f) harus sama persis dengan blok di prototipe dan cocok dengan scripts/data/bab6_c1.json.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/cek_bab06_10.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const baca = (p) => readFileSync(join(AKAR, p), "utf8");
const [b6, b7, b8, b9, b10] = ["16_bab06", "17_bab07", "18_bab08", "19_bab09", "20_bab10"].map((n) => baca(`src/${n}.html`));
let n = 0;
// span.m (ungkapan tidak dipenggal) boleh membungkus bagian kalimat: cek di teks asli atau setelah span.m dibuka
const buka = (html) => html.replace(/<span class="m">([^<]*(?:<(?!\/span>)[^<]*)*)<\/span>/g, "$1");
const ada = (html, s, ket) => { n++; assert.ok(html.includes(s) || buka(html).includes(s), `tidak ditemukan di src: "${s}" (${ket})`); };

// format Indonesia: titik ribuan, koma desimal, minus U+2212
const fmt = (x) => (x < 0 ? "−" : "") + String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const des = (x, k = 1) => (x < 0 ? "−" : "") + Math.abs(x).toFixed(k).replace(".", ",").replace(/,0+$/, "");
const persen = (rasio, k = 1) => des(Math.abs(rasio - 1) * 100, k) + "%";             // geseran relatif
const fr = (a, b) => `<span class="fr"><sup>${a}</sup>⁄<sub>${b}</sub></span>`;
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const kpk = (...xs) => xs.reduce((a, b) => (a * b) / gcd(a, b));
const sisa9 = (x) => [...String(x)].filter((c) => /\d/.test(c)).reduce((s, c) => s + +c, 0) % 9;
const jml = (x) => [...String(x)].filter((c) => /\d/.test(c)).reduce((s, c) => s + +c, 0);
const jA = (x) => [...String(x)].filter((c) => /\d/.test(c)).join(" + ");

// ════════ BAB 6 ════════
// paragraf pembuka (prototipe): 37 × 64
assert.equal(37 * 64, 2368);
ada(b6, `30 × 60 = ${fmt(30 * 60)}`, "batas bawah");
ada(b6, `40 × 70 = ${fmt(40 * 70)}`, "batas atas");
ada(b6, `7 × 4 = ${7 * 4}; dan sisanya ${(sisa9(37) * sisa9(64)) % 9} bila dibagi 9`, "satuan + sisa");
assert.equal(sisa9(2368), (sisa9(37) * sisa9(64)) % 9);
ada(b6, `Hasil sebenarnya, ${fmt(37 * 64)}`, "hasil");
// konsep inti angka satuan + sisa 9 (prototipe): 47 × 38
assert.equal(47 * 38, 1786);
ada(b6, `<td>7 × 8 = ${7 * 8}</td><td>${(7 * 8) % 10}</td>`, "satuan 47 × 38");
ada(b6, `<td>${fmt(1786)}</td><td>uji kembali</td><td>${1786 % 10}</td>`, "uji satuan");
for (const x of [47, 38]) ada(b6, `<td>${x}</td><td>${jA(x)} = ${jml(x)}</td><td>${sisa9(x)}</td>`, `sisa ${x}`);
ada(b6, `<td>${fmt(1786)}</td><td>${jA(1786)} = ${jml(1786)}</td><td>${sisa9(1786)}</td>`, "sisa 1.786");
assert.equal(sisa9(1786), (sisa9(47) * sisa9(38)) % 9);
ada(b6, `${jA(5732)} = ${jml(5732)}, yaitu ${sisa9(5732)}`, "sisa 5.732");
assert.ok([2368, 2638, 23680].every((x) => sisa9(x) === 1));                          // catatan: tertukar + nol bergeser
ada(b6, "misalnya 2.368 dan 2.638", "catatan tertukar");
// banyak angka hasil
for (const [a, b] of [[12, 34], [37, 64], [125, 80]]) {
  const h = a * b, m = String(a).length, k = String(b).length, d = String(h).length;
  assert.ok(d === m + k || d === m + k - 1);
  ada(b6, `<td>${a} × ${b}</td><td>${m} dan ${k}</td><td class="n">${fmt(h)}</td><td class="n">${d}</td>`, "banyak angka");
}
assert.equal((12 * 34) / 1000, 0.408);
ada(b6, "0,12 × 3,4 memuat tiga angka di belakang koma, sehingga hasilnya 0,408", "koma");
ada(b6, "0,12 × 3,4 ditulis 4,08", "kekeliruan nol");
// jarak antarpilihan
const P1 = [1200, 1500, 1800, 2100, 2400];
ada(b6, `<td>${P1.map(fmt).join(" · ")}</td><td>${P1[1] - P1[0]}</td><td>±${Math.round((300 / 1800) * 100)}% di sekitar ${fmt(1800)}</td>`, "jarak jauh");
const C1 = JSON.parse(baca("scripts/data/bab6_c1.json"));
const opsiC1 = Object.values(C1.opsi).map((s) => +s.replace(/\./g, ""));
const jarak = opsiC1.slice(1).map((x, i) => x - opsiC1[i]);
const kunciC1 = +C1.opsi[C1.kunci].replace(/\./g, "");
ada(b6, `<td>${opsiC1.map(fmt).join(" · ")}</td><td>${Math.min(...jarak)} sampai ${Math.max(...jarak)}</td><td>paling besar ±${des((Math.max(...jarak) / kunciC1) * 100)}%</td>`, "jarak rapat = opsi Contoh 1");
// pembulatan berlawanan arah: 46 × 76
assert.equal(46 * 76, 3496);
ada(b6, `46 × 76 = ${fmt(3496)}`, "hasil");
ada(b6, `<td>naik ke 50</td><td>+${persen(50 / 46)}</td>`, "46 naik");
ada(b6, `<td>turun ke 70</td><td>−${persen(70 / 76)}</td>`, "76 turun");
ada(b6, `<td>naik ke 80</td><td>+${persen(80 / 76)}</td>`, "76 naik");
ada(b6, `50 × 70 = ${fmt(3500)}, hanya meleset ±${persen(3500 / 3496)}`, "berlawanan");
ada(b6, `<td>berlawanan</td><td>+${persen(3500 / 3496)}</td>`, "tabel berlawanan");
ada(b6, `50 × 80 = ${fmt(4000)}, meleset ±${persen(4000 / 3496, 0)}`, "searah");
ada(b6, `<td>searah</td><td>+${persen(4000 / 3496, 0)}</td>`, "tabel searah");
// pembagian searah: 588 : 21
assert.equal(588 / 21, 28);
ada(b6, `580 : 20 = ${580 / 20} meleset ±${persen(29 / 28)}`, "bagi searah");
ada(b6, `600 : 20 = ${600 / 20} meleset ±${persen(30 / 28)}`, "bagi berlawanan");
assert.ok(Math.abs(29 / 28 - 1) < Math.abs(30 / 28 - 1));
// pecahan ramah
for (const [a, b] of [[1, 8], [1, 5], [1, 4], [3, 8], [1, 2], [5, 8], [3, 4], [7, 8]]) {
  const d = String(a / b).replace(".", ",");
  ada(b6, `<td>${d}</td><td>${des((a / b) * 100)}%</td><td>${fr(a, b)}</td>`, `pecahan ${a}/${b}`);
}
assert.equal(0.375 * 1600, (3 * 1600) / 8);
ada(b6, `1.600 : 8 = ${1600 / 8}, lalu kalikan, 3 × ${1600 / 8} = ${0.375 * 1600}`, "bagi dulu");
assert.equal(Math.round((1 - 0.02) * 100) / 100, 0.98);
assert.equal((18 * 50) / 100, (50 * 18) / 100);
ada(b6, `18% dari 50 sama dengan 50% dari 18, yaitu ${(18 * 50) / 100}`, "tukar persen");
// distributif
ada(b6, `47 × 99 = 47 × 100 − 47 = ${fmt(47 * 99)}`, "distributif 99");
ada(b6, `36 × 101 = ${fmt(3600)} + 36 = ${fmt(36 * 101)}`, "distributif 101");
assert.equal(13 * 27 + 13 * 73, 1300);
ada(b6, `13 × 27 + 13 × 73 = 13 × 100 = ${fmt(1300)}`, "distributif balik");
// urutan operasi: [bentuk, benar, keliru]
const urutan = [
  ["48 : 6 × 2", `${48 / 6} × 2 = ${(48 / 6) * 2}`, `48 : 12 = ${48 / (6 * 2)}`],
  ["20 − 8 + 3", `${20 - 8} + 3 = ${20 - 8 + 3}`, `20 − 11 = ${20 - (8 + 3)}`],
  ["5 + 3 × 4", `5 + ${3 * 4} = ${5 + 3 * 4}`, `8 × 4 = ${(5 + 3) * 4}`],
  ["7 − (−5)", `7 + 5 = ${7 - -5}`, `7 − 5 = ${7 - 5}`],
];
for (const [b, ok, salah] of urutan) ada(b6, `<td><b>${b}</b></td><td>${ok}</td><td>${salah}</td>`, `urutan ${b}`);
ada(b6, `5 + 3 × 4 dihitung ${(5 + 3) * 4}`, "kekeliruan urutan");
ada(b6, `7 − (−5) dihitung ${7 - 5}`, "kekeliruan tanda");
// kekeliruan pecahan campuran + persen (angka Contoh 1)
assert.equal(3 * 39 + 40, 157); assert.equal(3 * 40 + 39, 159);
ada(b6, `3 ${fr(39, 40)} ditulis ${fr(157, 40)}`, "kekeliruan sederhana");
ada(b6, `${fmt(5600)} belum dikurangi ${(25 * 1400) / 1000}`, "kekeliruan langkah");
assert.equal((25 * 5600) / 1000, 140);
// perbandingan kuantitatif
assert.ok(7 * 9 < 8 * 8);                                                        // 7/8 < 8/9
ada(b6, `${fr(7, 8)} = 1 − ${fr(1, 8)} dan ${fr(8, 9)} = 1 − ${fr(1, 9)}`, "pku pecahan");
assert.equal(49 * 51, 2500 - 1);
ada(b6, `49 × 51 = (50 − 1)(50 + 1) = ${fmt(2500)} − 1 = ${fmt(49 * 51)}`, "pku selisih kuadrat");
const relasi = (p, q) => (p > q ? ">" : p < q ? "<" : "=");
const pkuX = [1, 2, 3].map((x) => relasi(x * x, 3 * x - 2));
assert.deepEqual(pkuX, ["=", "=", ">"]);
assert.ok(new Set(pkuX).size > 1);                                               // → tidak dapat ditentukan
ada(b6, `memberi P = ${3 * 3} dan Q = ${3 * 3 - 2}`, "pku berpeubah");
// Contoh 1: sama persis dengan prototipe + cocok dengan data
const pro = baca("prototipe/gaya_halaman_tiu.html");
const blokPro = pro.match(/<!--C1:mulai-->\n<section class="hal hal2">\n  <h3>Contoh Soal dan Pembahasan<\/h3>\n([\s\S]*?)\n<\/section>\n<!--C1:selesai-->/)[1];
const blokSrc = b6.match(/<!--B06-C01:mulai-->\n<div data-soal="HB-TIU-B06-C01" data-target="45">\n([\s\S]*?)\n<\/div>\n<!--B06-C01:selesai-->/)[1];
assert.equal(blokSrc, blokPro, "Contoh 1 di buku berbeda dari prototipe yang disetujui");
assert.equal(C1.id, "HB-TIU-B06-C01"); assert.equal(C1.target_detik, 45);
ada(blokSrc, C1.soal.replace("Hasil dari", "<mark>Hasil dari</mark>"), "soal Contoh 1");
for (const [h, v] of Object.entries(C1.opsi)) ada(blokSrc, `<span class="h">${h}</span><b>${v}</b>`, `opsi ${h}`);
ada(blokSrc, `<div class="jwb"><span>${C1.kunci}</span>`, "kunci Contoh 1");
for (const k of ["cepat", "lain", "cek", "analogi", "waspada"]) ada(blokSrc, C1.pembahasan[k], `pembahasan ${k}`);

// ════════ BAB 7 ════════
const faktor = (x) => { const f = {}; for (let p = 2; x > 1; p++) while (x % p === 0) { f[p] = (f[p] || 0) + 1; x /= p; } return f; };
const tulisF = (f) => Object.entries(f).map(([p, e]) => (e > 1 ? `${p}<sup>${e}</sup>` : p)).join(" × ");
const gabung = (a, b) => { const f = faktor(a); for (const [p, e] of Object.entries(faktor(b))) f[p] = (f[p] || 0) + e; return f; };
for (const [a, b] of [[24, 35], [28, 30], [21, 40], [26, 32]]) {
  ada(b7, `<td><b>${a} × ${b}</b></td><td>${a} = ${tulisF(faktor(a))}; ${b} = ${tulisF(faktor(b))}</td><td>${tulisF(gabung(a, b))}</td><td class="n">${a * b}</td>`, `faktor ${a} × ${b}`);
}
assert.ok(832 % 13 === 0 && 840 % 13 !== 0);
ada(b7, `18 × 45 = (18 : 2) × (45 × 2) = 9 × 90 = ${18 * 45}`, "pindah faktor");
assert.ok(24 / gcd(24, 28) === 6 && 28 / gcd(24, 28) === 7 && 30 / gcd(30, 35) === 6 && 35 / gcd(30, 35) === 7);
ada(b7, "perbandingan 24 : 28 dan 30 : 35 sama-sama 6 : 7", "uji perbandingan");
ada(b7, `672 × 14 = ${fmt(672 * 14)}</span> dan <span class="m">16 × 588 = ${fmt(16 * 588)}`, "kali silang");
assert.equal(672 / 16, 588 / 14);
ada(b7, `yaitu ${672 / 16}.`, "hasil bagi");
ada(b7, `672 : 16 = 336 : 8 = ${336 / 8} dan 588 : 14 = 294 : 7 = ${294 / 7}`, "coret faktor");
assert.equal(6 * 15, 9 * 10); ada(b7, `keduanya ${6 * 15}`, "hitung langsung");
// cermin sejati vs cermin semu
assert.equal(17 * 230, 23 * 170);
ada(b7, `17 × 230 dan 23 × 170, keduanya ${fmt(17 * 230)}`, "cermin sejati");
const angka = (...xs) => xs.join("").split("").sort().join("");
assert.equal(angka(17, 230), angka(27, 130));
ada(b7, `nilainya ${fmt(17 * 230)} dan ${fmt(27 * 130)}`, "cermin semu");
for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (let c = 1; c <= 9; c++) for (let d = 1; d <= 9; d++)
  assert.equal((10 * a + b) * (10 * c + d) - (10 * b + a) * (10 * d + c), 99 * (a * c - b * d));
for (const [a, b, c, d] of [[1, 2, 4, 2], [1, 2, 4, 3]]) {
  const kiri = (10 * a + b) * (10 * c + d), kanan = (10 * b + a) * (10 * d + c);
  const sisa = kiri === kanan ? "" : `, berselisih 99 × ${b * d - a * c} = ${kanan - kiri}`;
  ada(b7, `<td><b>${10 * a + b} × ${10 * c + d} dan ${10 * b + a} × ${10 * d + c}</b></td><td>${a} × ${c} = ${a * c}</td><td>${b} × ${d} = ${b * d}</td><td>${kiri} dan ${kanan}${sisa}</td>`, `ab×cd ${a}${b}${c}${d}`);
}
assert.equal(0.25 * 36, 1.5 * 6);
ada(b7, `25% × 36 = 36 : 4 = ${36 / 4} dan 1,5 × 6 = ${1.5 * 6}`, "persen");
assert.equal(12 + 8, 5 + 15);
ada(b7, `hasilnya ${(12 + 8) * 15} dan ${(5 + 15) * 14}`, "isi kurung");
assert.notEqual(1 / 5, 0.25);

// ════════ BAB 8 ════════
const lin = (k) => 5 * k + 2;
const titik = [3, 7, 10, 15];
ada(b8, `<td class="n">${titik[0]}</td><td class="n">${lin(titik[0])}</td>`, "titik awal");
for (let i = 1; i < titik.length; i++) {
  const dv = lin(titik[i]) - lin(titik[i - 1]), dn = titik[i] - titik[i - 1];
  assert.equal(dv / dn, 5);
  ada(b8, `<td class="n">${titik[i]}</td><td class="n">${lin(titik[i])}</td><td class="n">${dv}</td><td class="n">${dn}</td><td class="n"><b>${dv / dn}</b></td>`, `kenaikan ${titik[i]}`);
}
assert.ok(new Set(titik.slice(1).map((x, i) => x - titik[i])).size > 1);             // jarak nomor tak berpola
ada(b8, `40 − 3 = ${40 - 3} langkah, sehingga U<sub>40</sub> = 17 + 37 × 5 = ${lin(40)}`, "suku ke-40");
assert.equal(17 + 37 * 5, lin(40));
assert.equal((152 - 2) / 5, 30);
ada(b8, `yaitu <i>n</i> = ${(152 - 2) / 5}`, "nomor dari nilai");
ada(b8, `(152 − 17) : 5 = ${(152 - 17) / 5} langkah, jadi nomornya 3 + ${(152 - 17) / 5} = ${3 + (152 - 17) / 5}`, "banyak langkah");
ada(b8, `beda dianggap ${lin(7) - lin(3)} dari suku ke-3 ke suku ke-7`, "kekeliruan selisih mentah");
// selisih bertingkat: n² + n
const kua = [1, 2, 3, 4, 5].map((k) => k * k + k);
const s1 = kua.slice(1).map((x, i) => x - kua[i]), s2 = s1.slice(1).map((x, i) => x - s1[i]);
assert.ok(s2.every((x) => x === 2));
ada(b8, `<td><b>Suku</b></td>${kua.map((x) => `<td class="n">${x}</td>`).join("")}`, "baris suku");
ada(b8, `<td><b>Selisih pertama</b></td><td class="n"></td>${s1.map((x) => `<td class="n">${x}</td>`).join("")}`, "selisih 1");
ada(b8, `<td><b>Selisih kedua</b></td><td class="n"></td><td class="n"></td>${s2.map((x) => `<td class="n">${x}</td>`).join("")}`, "selisih 2");
ada(b8, `<i>a</i> = 2 : 2 = ${s2[0] / 2}`, "a");
ada(b8, kua.map((x, i) => `${x} − ${(i + 1) ** 2}`).join(", ").replace(/, ([^,]+)$/, ", dan $1") + ` menghasilkan ${kua.map((x, i) => x - (i + 1) ** 2).join(", ")}`, "kurangi n²");
ada(b8, `${kua.slice(0, 4).join(", ")} dilanjutkan dengan ${kua[3] + s1[2]}`, "kekeliruan selisih rata");
assert.equal(kua[4], 30); assert.notEqual(kua[3] + s1[2], kua[4]);
// tiga titik 1, 2, 4
assert.equal(4 * 2, 8); assert.equal(4 + 3, 7);
ada(b8, "barisan 1, 2, 4 dapat dilanjutkan dengan 8, bila setiap suku dikali 2, atau dengan 7, bila selisihnya 1, 2, 3", "penyangkal");
// catatan 4, 9, 16 → kuadrat 25 (linear gagal)
assert.notEqual(9 - 4, 16 - 9); assert.equal((16 - 9) - (9 - 4), 2); assert.equal(16 + (16 - 9) + 2, 25);
ada(b8, "di sini kuadrat dengan suku berikutnya 25", "tiga titik");
// deret sebaris
assert.equal(14 + 3, 17); assert.equal(24 * 2, 48); assert.equal(6 + 2, 8);
ada(b8, `<td><b>5, 8, 11, 14, …</b></td><td>selisih tetap 3</td><td class="n">${14 + 3}</td>`, "selisih");
ada(b8, `<td><b>3, 6, 12, 24, …</b></td><td>hasil bagi tetap 2</td><td class="n">${24 * 2}</td>`, "rasio");
ada(b8, `<td class="n">${6 + 2}</td>`, "selang-seling");
// kali lalu tambah
const dk = [3]; while (dk.length < 6) dk.push(2 * dk.at(-1) + 1);
assert.deepEqual(dk, [3, 7, 15, 31, 63, 127]);
ada(b8, `deret ${dk.slice(0, 5).join(", ")}, selisihnya ${dk.slice(1, 5).map((x, i) => x - dk[i]).join(", ")}`, "deret kali tambah");
ada(b8, `7 = 2 × 3 + <i>c</i>, sehingga <i>c</i> = ${7 - 2 * 3}`, "c");
for (let i = 1; i < 4; i++) ada(b8, `2 × ${dk[i]} + 1 = ${dk[i + 1]}`, `uji ${dk[i]}`);
ada(b8, `2 × 63 + 1 = ${dk[5]}`, "suku berikutnya");
ada(b8, `2 × 63 = ${2 * 63} tanpa ditambah 1`, "kekeliruan langkah");
// deret huruf
const HURUF = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nomorH = [3, 6, 10, 15, 21, 28];
const hurufH = nomorH.map((x) => HURUF[((x - 1) % 26)]);
assert.deepEqual(hurufH, ["C", "F", "J", "O", "U", "B"]);
ada(b8, `<td><b>Huruf</b></td>${hurufH.slice(0, 5).map((h) => `<td class="n">${h}</td>`).join("")}<td class="n"><b>B</b></td>`, "baris huruf");
ada(b8, `<td><b>Nomor</b></td>${nomorH.slice(0, 5).map((x) => `<td class="n">${x}</td>`).join("")}<td class="n">28 − 26 = ${28 - 26}</td>`, "baris nomor");
ada(b8, `21 + 7 = ${21 + 7}`, "suku keenam");
assert.equal(HURUF.indexOf("D") + 1 + HURUF.indexOf("W") + 1, 27);
assert.equal(HURUF.indexOf("A") + 1 + HURUF.indexOf("Z") + 1, 27);
// catatan jumlah n suku + sisipan
const ar = []; for (let x = 3; x <= 39; x += 4) ar.push(x);
assert.equal(ar.length, 10); assert.equal(ar.reduce((s, x) => s + x, 0), 210);
ada(b8, `(39 − 3) : 4 + 1 = ${(39 - 3) / 4 + 1} suku, yang membentuk ${ar.length / 2} pasangan berjumlah 3 + 39 = ${3 + 39}; jumlahnya ${ar.length / 2} × ${3 + 39} = ${(ar.length / 2) * 42}`, "jumlah n suku");
const naik = (29 - 5) / (3 + 1), sis = [0, 1, 2, 3, 4].map((i) => 5 + i * naik);
ada(b8, `(29 − 5) : 4 = ${naik}, sehingga barisannya ${sis.join(", ")}`, "sisipan");
// pengajar: kenaikan a(p + q) + b
assert.equal((30 - 6) / 3, 1 * (2 + 5) + 1);
ada(b8, `(30 − 6) : 3 = ${(30 - 6) / 3} = 1 × (2 + 5) + 1`, "rumus kenaikan");

// ════════ BAB 9 ════════
const kiri = [2, 3, 5, 7], kanan = kiri.map((x) => x * x + 1);
for (let i = 0; i < 4; i++) ada(b9, `<td>${kiri[i]}</td><td>${kanan[i]}</td><td>${kanan[i] - kiri[i] ** 2}</td>`, `dua kolom ${kiri[i]}`);
const kn = kiri.slice(1).map((x, i) => (kanan[i + 1] - kanan[i]) / (x - kiri[i]));
assert.equal(new Set(kn).size, 3);
ada(b9, `kenaikan per suku ${kn[0]}, ${kn[1]}, dan ${kn[2]} tidak tetap`, "kenaikan");
const kiri2 = [2, 4, 5, 8], kanan2 = kiri2.map((x) => x * (x + 3));
ada(b9, kiri2.map((x, i) => `${x} → ${kanan2[i]}`).join(", ").replace(/, ([^,]+)$/, ", dan $1") + `, hasil baginya ${kiri2.map((x) => x + 3).join(", ").replace(/, ([^,]+)$/, ", dan $1")}`, "sidik faktor");
// 3 × 3 per baris
const atur1 = (a, b) => a + b + 2, atur2 = (a, b) => a * (b - 1);
assert.equal(atur1(3, 4), 9); assert.equal(atur2(3, 4), 9); assert.notEqual(atur1(5, 2), 5); assert.equal(atur2(5, 2), 5);
ada(b9, `<td>3 + 4 + 2 = ${atur1(3, 4)}, cocok</td><td>3 × 3 = ${atur2(3, 4)}, cocok</td>`, "baris 1");
ada(b9, `<td>5 + 2 + 2 = ${atur1(5, 2)}, gagal</td><td>5 × 1 = ${atur2(5, 2)}, cocok</td>`, "baris 2");
ada(b9, `<td>X = 6 × 2 = ${atur2(6, 3)}</td>`, "X");
ada(b9, `jadi X = ${atur2(6, 3)}`, "X narasi");
assert.equal(9 + 9, 18); assert.equal(9 * 9, 81);
ada(b9, "paling besar berjumlah 18 dan paling besar berhasil kali 81", "ukuran hasil");
// model kotak beracuan: sel = r² + 2c
const R = [2, 3, 5], Ck = [1, 4, 6], sel = (r, c) => r * r + 2 * c;
ada(b9, `<th>${Ck.join(" · ")}</th>`, "acuan kolom");
for (const r of R) {
  const isi = Ck.map((c) => sel(r, c)), sl = isi.slice(1).map((x, i) => x - isi[i]);
  assert.deepEqual(sl, [6, 4]);
  ada(b9, `<td>${r}</td><td>${isi.join(" · ")}</td><td>${sl.join(" · ")}</td>`, `kotak baris ${r}`);
}
ada(b9, `6 = 2 × (4 − 1) dan 4 = 2 × (6 − 4)`, "pemisahan");
ada(b9, R.map((r) => `${sel(r, 1)} − 2 = ${r * r}`).join(", ").replace(/, ([^,]+)$/, ", dan $1"), "sisa baris");
// negatif, FPB, KPK
ada(b9, `baris (3, 7) menghasilkan ${fmt(3 - 7)}`, "negatif");
ada(b9, `KPK dari 4 dan 6 adalah ${kpk(4, 6)}, FPB dari 12 dan 18 adalah ${gcd(12, 18)}`, "FPB KPK");
// dua aturan sama-sama cocok
const r1 = (a, b) => a * b, r2 = (a, b) => a + 2 * b - 2;
for (const [a, b, c] of [[2, 3, 6], [4, 1, 4]]) { assert.equal(r1(a, b), c); assert.equal(r2(a, b), c); ada(b9, `<td>${a}, ${b}, ${c}</td><td>${c}, cocok</td><td>${c}, cocok</td>`, `dua aturan ${a}`); }
assert.notEqual(r1(5, 3), r2(5, 3));
ada(b9, `<td>X = ${r1(5, 3)}</td><td>X = ${r2(5, 3)}</td>`, "X berbeda");

// ════════ BAB 10 ════════
ada(b10, `3 kg seharga Rp${fmt(45000)} berarti Rp${fmt(45000 / 3)} per kg, tetap, sehingga 5 kg seharga Rp${fmt((45000 / 3) * 5)}`, "senilai");
ada(b10, `bernilai ${6 * 10} pekerja-hari, tetap, sehingga 4 pekerja memerlukan 60 : 4 = ${60 / 4} hari`, "berbalik");
const V = kpk(4, 6, 12), lA = V / 4, lB = V / 6, lC = -V / 12;
assert.equal(V, 12);
ada(b10, `Laju A ${lA} bagian per jam, laju B ${lB} bagian per jam, dan laju C ${fmt(lC)} bagian per jam`, "laju");
ada(b10, `${lA + lB} bagian per jam, sehingga kolam penuh dalam 12 : 5 = ${des(V / (lA + lB))} jam, yaitu 2 jam ${Math.round(((V / (lA + lB)) % 1) * 60)} menit`, "A + B");
ada(b10, `lajunya ${lA + lB + lC} bagian per jam dan kolam penuh dalam ${V / (lA + lB + lC)} jam`, "A + B + C");
ada(b10, `<td>A + B</td><td>${des(V / (lA + lB))} jam</td><td>${lA + lB}</td>`, "tabel A + B");
ada(b10, `<td>C</td><td>12 jam</td><td>${fmt(lC)}</td>`, "tabel C");
assert.ok(V / (lA + lB) < 4 && V / (lA + lB + lC) > V / (lA + lB));             // uji masuk akal
assert.equal((4 * 6) / (4 + 6), 12 / 5);                                        // 1 : (1/4 + 1/6)
ada(b10, `${fr(1, 4)} + ${fr(1, 6)}) = ${fr(12, 5)} jam`, "V saling menghapus");
ada(b10, `${lA} + ${lB} + ${-lC} bagian per jam`, "kekeliruan pengosong");
// laju relatif
ada(b10, `150 : 100 = ${des(150 / 100)} jam`, "berpapasan");
assert.equal(40 * 0.5, 20); assert.equal(60 - 40, 20);
ada(b10, `Jarak awal ${40 * 0.5} km, disusul dalam 20 : 20 = ${20 / 20} jam`, "menyusul");
assert.equal((72 * 1000) / 3600, 20);
ada(b10, `72 km/jam = ${(72 * 5) / 18} m/detik: 900 : 20 = ${(700 + 200) / 20} detik`, "kereta");
ada(b10, `72 × 5 : 18 = ${(72 * 5) / 18}`, "konversi");
ada(b10, `(24 + 16) : 2 = ${(24 + 16) / 2} km/jam, laju arus (24 − 16) : 2 = ${(24 - 16) / 2} km/jam`, "sungai");
const tPergi = 120 / 60, tPulang = 120 / 40;
ada(b10, `${tPergi} + ${tPulang} = ${tPergi + tPulang} jam untuk 240 km`, "rata-rata waktu");
ada(b10, `240 : 5 = ${240 / (tPergi + tPulang)} km/jam, bukan ${(60 + 40) / 2} km/jam`, "rata-rata");
// umur
const bag = 28 / (7 - 3), ayah = 7 * bag, anak = 3 * bag;
ada(b10, `satu bagian ${bag} tahun: ayah ${ayah} tahun dan anak ${anak} tahun`, "umur");
const g5 = gcd(ayah + 5, anak + 5);
ada(b10, `umur mereka ${ayah + 5} dan ${anak + 5} tahun; selisihnya tetap ${ayah + 5 - (anak + 5)}, tetapi perbandingannya kini ${(ayah + 5) / g5} : ${(anak + 5) / g5}`, "umur 5 tahun lagi");
ada(b10, `jumlah umur sekarang ${7 + 3} bagian, yaitu ${ayah + anak} tahun`, "jumlah");
// persen
assert.equal(50 / (65 - 40), 2);
ada(b10, `${65 - 40}% = 50 liter, jadi 1% = ${50 / 25} liter dan kapasitasnya ${(50 / 25) * 100} liter`, "kapasitas");
ada(b10, `dibeli Rp${fmt(80000)}, untung 25%: dijual Rp${fmt(80000 * 1.25)}. Untung Rp${fmt(20000)} itu hanya ${(20000 / 100000) * 100}% dari harga jual`, "untung");
assert.equal(Math.round(0.8 * 0.9 * 100), 72);
ada(b10, `80% × 90% = ${Math.round(0.8 * 0.9 * 100)}%, jadi potongan totalnya ${100 - 72}%, bukan ${20 + 10}%`, "diskon");
ada(b10, `bruto 50 kg dengan tara 4%: tara ${(50 * 4) / 100} kg dan neto ${50 - (50 * 4) / 100} kg`, "bruto");
assert.equal((2000000 * 6 * 8) / (100 * 12), 80000);
ada(b10, `= Rp${fmt((2000000 * 6 * 8) / (100 * 12))}`, "bunga");

console.log(`cek_bab06_10: semua assert lulus · ${n} angka dicek di src · Contoh 1 Bab 6 = prototipe`);
