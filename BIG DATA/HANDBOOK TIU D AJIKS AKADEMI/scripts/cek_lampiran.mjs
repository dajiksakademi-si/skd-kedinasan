// Handbook TIU · Lampiran (siswa A–D, pengajar L1–L6) · semua angka tabel dihitung di sini.
// Tabel angka (D1–D10, L5, L6) ditulis di src di antara <!--GEN:nama--> … <!--/GEN:nama-->:
//   node scripts/cek_lampiran.mjs           → memeriksa isi src sama persis dengan hasil script (galat bila beda)
//   node scripts/cek_lampiran.mjs --tulis   → menulis ulang blok GEN dari hasil script
// Bagian bertulis tangan (Lampiran C, L4, tindakan L5) dicek terhadap Bab 19, engine, dan slot di src.
// Juga: 47 kode L5 = engine v0.4.3 Pilar 3, L6 = semua slot, nama tryout/bimbel hanya di L1 dan L6.
// Bukan pembuat soal: tidak ada soal, opsi, atau kunci di berkas ini.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(AKAR, "src");
const ENGINE = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md");
const TULIS = process.argv.includes("--tulis");
const baca = (f) => readFileSync(join(SRC, f), "utf8");
const bab = Object.fromEntries(readdirSync(SRC).filter((f) => /^\d\d_bab\d\d\.html$/.test(f)).map((f) => [+f.slice(6, 8), baca(f)]));
const LAMP = ["90_lampiran_siswa.html", "91_lampiran_tabel.html", "95_lampiran_pengajar.html", "96_lampiran_l6.html"];
const lamp = Object.fromEntries(LAMP.map((f) => [f, baca(f)]));
const polos = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const K7 = ["K1", "K2", "K3", "K4", "K5", "K6", "K7"];
let n = 0;
const sama = (a, b, ket) => { n++; assert.equal(a, b, ket); };
const ada = (html, s, ket) => { n++; assert.ok(html.includes(s), `tidak ditemukan: "${s}" (${ket})`); };

// ════════ bantu tulis angka ════════
const rb = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fr = (a, b) => `<span class="fr"><sup>${a}</sup>⁄<sub>${b}</sub></span>`;
const fpb = (a, b) => (b ? fpb(b, a % b) : a);
function desimal(a, b, maks = 4) {                       // pembagian bersusun a : b (0 < a), koma Indonesia
  let bulat = Math.floor(a / b), sisa = a % b, d = "";
  while (sisa && d.length < maks) { sisa *= 10; d += Math.floor(sisa / b); sisa %= b; }
  return { s: rb(bulat) + (d ? "," + d : "") + (sisa ? "…" : ""), habis: !sisa };
}
function persen(a, b) {                                   // a/b × 100 sebagai desimal habis atau bilangan campuran
  const p = desimal(100 * a, b, 3);
  if (p.habis) return p.s + "%";
  const q = Math.floor((100 * a) / b), r = (100 * a) % b, g = fpb(r, b);
  return `${q || ""}${fr(r / g, b / g)}%`;
}
const menit = (d) => { const m = Math.floor(d / 60), s = d % 60; return s ? `${m} menit ${s} detik` : `${m} menit`; };
const rentang = (xs) => { const s = [...new Set(xs)].sort((a, b) => a - b), o = []; for (const x of s) { const l = o.at(-1); if (l && x === l[1] + 1) l[1] = x; else o.push([x, x]); } return o.map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`)).join(", "); };
const td = (x, c = "") => `<td${c ? ` class="${c}"` : ""}>${x}</td>`;
const tabel = (kelas, kepala, baris) => `<table class="${kelas}">\n  <thead><tr>${kepala.join("")}</tr></thead>\n  <tbody>\n${baris.map((b) => `    <tr>${b.join("")}</tr>`).join("\n")}\n  </tbody>\n</table>`;
const th = (x, c = "", w = "") => `<th${c ? ` class="${c}"` : ""}${w ? ` style="width:${w}"` : ""}>${x}</th>`;
const kenapa = (s) => `<p class="kenapa"><b>Mengapa benar.</b> ${s}</p>`;

// ════════ blok GEN ════════
const hasil = {};
function gen(f, nama, isi) {
  const pola = new RegExp(`(<!--GEN:${nama}-->\\n)([\\s\\S]*?)(<!--/GEN:${nama}-->)`);
  const m = lamp[f].match(pola);
  assert.ok(m, `${f}: penanda GEN:${nama} tidak ada`);
  hasil[nama] = isi;
  if (TULIS) lamp[f] = lamp[f].replace(pola, (_, a, __, c) => `${a}${isi}\n${c}`);
  else sama(m[2], `${isi}\n`, `${f}: blok ${nama} tidak sama dengan hasil script (jalankan --tulis)`);
}

// ════════ D1 kuadrat 1–30 ════════
const kuad = [0, 1];
for (let i = 1; i < 30; i++) kuad.push(kuad[i] + 2 * i + 1);   // (n + 1)² = n² + 2n + 1
for (let i = 1; i <= 30; i++) sama(kuad[i], i * i, `kuadrat ${i}`);
gen("91_lampiran_tabel.html", "D1", tabel("tb rujuk", [0, 1, 2].flatMap(() => [th("<i>n</i>", "n"), th("<i>n</i><sup>2</sup>", "n")]),
  Array.from({ length: 10 }, (_, r) => [1, 11, 21].flatMap((a) => [td(a + r, "n k"), td(rb(kuad[a + r]), "n")]))) + "\n" +
  kenapa(`(<i>n</i> + 1)<sup>2</sup> = <i>n</i><sup>2</sup> + 2<i>n</i> + 1. Kuadrat berikutnya sama dengan kuadrat sekarang ditambah dua kali bilangannya, lalu ditambah 1: 26<sup>2</sup> = ${kuad[25]} + 50 + 1 = ${kuad[26]}.`));

// ════════ D2 pangkat ════════
const pang = (b, k) => Array.from({ length: k }).reduce((x) => x * b, 1);   // kali berulang
for (let k = 1; k <= 12; k++) { sama(pang(k, 3), k ** 3, `pangkat tiga ${k}`); sama(pang(2, k), 2 ** k, `2^${k}`); }
gen("91_lampiran_tabel.html", "D2", tabel("tb rujuk", [th("<i>n</i>", "n"), th("<i>n</i><sup>3</sup>", "n"), th("2<sup><i>n</i></sup>", "n"), th("3<sup><i>n</i></sup>", "n")],
  Array.from({ length: 12 }, (_, i) => [td(i + 1, "n k"), td(rb(pang(i + 1, 3)), "n"), td(rb(pang(2, i + 1)), "n"), td(i < 7 ? rb(pang(3, i + 1)) : "", "n")])) + "\n" +
  kenapa(`pangkat adalah perkalian berulang, jadi setiap baris sama dengan baris di atasnya dikali bilangan pokoknya: 2<sup>10</sup> = 2 × ${rb(pang(2, 9))} = ${rb(pang(2, 10))}, dan 3<sup>7</sup> = 3 × ${rb(pang(3, 6))} = ${rb(pang(3, 7))}.`));

// ════════ D3 pecahan ↔ desimal ↔ persen ════════
const PEC = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [1, 8],
  [3, 8], [5, 8], [7, 8], [1, 9], [1, 10], [1, 12], [1, 16], [1, 20], [1, 25], [1, 40], [1, 50], [1, 125]];
for (const [a, b] of PEC) {
  const d = desimal(a, b, 6);
  if (d.habis) { const [, k = ""] = d.s.split(","); sama((+k.padEnd(6, "0")) * b, a * 1e6, `${a}/${b} desimal`); }   // desimal × penyebut = pembilang
  else sama(d.s, `0,${String(Math.floor((a * 1e6) / b)).padStart(6, "0")}…`, `${a}/${b} desimal berulang`);
  let c = b; while (c % 2 === 0) c /= 2; while (c % 5 === 0) c /= 5;
  sama(d.habis, c === 1, `${a}/${b}: habis tepat bila penyebut hanya berfaktor 2 dan 5`);
}
const sel3 = ([a, b]) => [td(fr(a, b), "k"), td(desimal(a, b).s, "n"), td(persen(a, b), "n")];
gen("91_lampiran_tabel.html", "D3", tabel("tb rujuk", [0, 1].flatMap(() => [th("Pecahan"), th("Desimal", "n"), th("Persen", "n")]),
  Array.from({ length: 12 }, (_, r) => [...sel3(PEC[r]), ...sel3(PEC[r + 12])])) + "\n" +
  kenapa(`persen berarti per seratus, jadi <i>a</i>/<i>b</i> = (100<i>a</i> : <i>b</i>)%: ${fr(3, 8)} = 300 : 8 = 37,5%. Tanda … berarti angkanya berulang tanpa henti, misalnya ${fr(1, 3)} = 0,333… = 33${fr(1, 3)}%.`));
// tabel Bab 6 harus termuat di D3
for (const [, d, p, a, b] of bab[6].split("<h3>Pecahan, Desimal")[1].split("</tbody>")[0].matchAll(/<td>([\d,]+)<\/td><td>([\d,]+)%<\/td><td><span class="fr"><sup>(\d+)<\/sup>⁄<sub>(\d+)<\/sub><\/span><\/td>/g)) {
  assert.ok(PEC.some(([x, y]) => x === +a && y === +b), `Bab 6 ${a}/${b} tidak ada di D3`);
  sama(desimal(+a, +b).s, d, `Bab 6 desimal ${a}/${b}`); sama(persen(+a, +b), `${p}%`, `Bab 6 persen ${a}/${b}`);
}

// ════════ D4 cara cepat perkalian ════════
const sebelas = (x) => { const a = Math.floor(x / 10), b = x % 10; return 100 * a + 10 * (a + b) + b; };
const lima = (a) => 100 * a * (a + 1) + 25;
const D4 = [
  ["× 5", "kalikan 10, lalu bagi 2", 468, 5, `468 × 10 = ${rb(4680)}; ${rb(4680)} : 2 = ${rb(4680 / 2)}`, "5 = 10 : 2"],
  ["× 25", "kalikan 100, lalu bagi 4", 36, 25, `36 × 100 = ${rb(3600)}; ${rb(3600)} : 4 = ${rb(3600 / 4)}`, "25 = 100 : 4"],
  ["× 125", "kalikan 1.000, lalu bagi 8", 56, 125, `56 × ${rb(1000)} = ${rb(56000)}; ${rb(56000)} : 8 = ${rb(56000 / 8)}`, "125 = 1.000 : 8"],
  ["× 11 (dua angka)", "tulis angka puluhan, jumlah kedua angka, angka satuan; lebihnya disimpan ke kiri", 47, 11, `4 · (4 + 7 = 11) · 7 → ${rb(sebelas(47))}`, "11 × (10<i>a</i> + <i>b</i>) = 100<i>a</i> + 10(<i>a</i> + <i>b</i>) + <i>b</i>"],
  ["kuadrat berakhiran 5", "kalikan angka depannya dengan bilangan berikutnya, lalu tulis 25 di belakang", 65, 65, `6 × 7 = 42 → ${rb(lima(6))}`, "(10<i>a</i> + 5)<sup>2</sup> = 100<i>a</i>(<i>a</i> + 1) + 25"],
];
for (const [, , x, y, cth] of D4) sama(cth.split(/→|= /).at(-1).trim(), rb(x * y), `D4 ${x} × ${y}`);
sama(sebelas(47), 47 * 11, "×11"); sama(lima(6), 65 * 65, "kuadrat 65");
for (let a = 1; a <= 9; a++) for (let b = 0; b <= 9; b++) sama(sebelas(10 * a + b), (10 * a + b) * 11, `×11 ${a}${b}`);
for (let a = 1; a <= 19; a++) sama(lima(a), (10 * a + 5) ** 2, `kuadrat ${a}5`);
gen("91_lampiran_tabel.html", "D4", tabel("tb rujuk kata", [th("Bentuk", "", "17%"), th("Cara", "", "30%"), th("Contoh", "", "27%"), th("Mengapa benar")],
  D4.map(([nm, cara, x, y, cth, why]) => [td(`<b>${nm}</b>`), td(cara), td(`${x === y ? `${x}<sup>2</sup>` : `${x} ${nm.split(" ").slice(0, 2).join(" ")}`}: ${cth}`), td(why)])));

// ════════ D5 pasangan faktor yang hasilnya bulat ════════
const D5 = [1, 2, 3, 4, 5, 6].map((k) => [k, 2 ** k, 5 ** k]);
D5.forEach(([k, a, b]) => sama(a * b, 10 ** k, `2^${k} × 5^${k}`));
const turunan = [[75, 4], [375, 8], [875, 8], [1875, 16]];
turunan.forEach(([a, b]) => assert.ok(a % 5 ** Math.log2(b) === 0 && (a * b) % 10 ** Math.log2(b) === 0, `turunan ${a} × ${b}`));
gen("91_lampiran_tabel.html", "D5", tabel("tb rujuk", [th("<i>k</i>", "n"), th("2<sup><i>k</i></sup>", "n"), th("5<sup><i>k</i></sup>", "n"), th("Hasil kali", "n")],
  D5.map(([k, a, b]) => [td(k, "n k"), td(rb(a), "n"), td(rb(b), "n"), td(rb(a * b), "n")])) + "\n" +
  kenapa(`2<sup><i>k</i></sup> × 5<sup><i>k</i></sup> = (2 × 5)<sup><i>k</i></sup> = 10<sup><i>k</i></sup>. Kelipatannya ikut bulat: ${turunan.map(([a, b]) => `${rb(a)} × ${b} = ${rb(a * b)}`).join(", ")}.`));

// ════════ D6 rumus barisan (contoh = angka Bab 8) ════════
const U = (u1, b) => (k) => u1 + (k - 1) * b;
sama(17 + 37 * 5, 202, "linear U40"); sama(U(7, 5)(40), 202, "U40 dari rumus 5n + 2"); sama(U(7, 5)(3), 17, "U3 = 17");
sama((39 - 3) / 4 + 1, 10, "banyak suku"); sama(Array.from({ length: 10 }, (_, i) => 3 + 4 * i).reduce((a, b) => a + b), 210, "jumlah 10 suku");
const kuadU = (k) => 2 + (k - 1) * 4 + ((k - 1) * (k - 2) / 2) * 2;
[2, 6, 12, 20, 30].forEach((v, i) => sama(kuadU(i + 1), v, `rumus kuadrat titik ${i + 1}`)); sama(kuadU(10), 110, "U10"); sama(kuadU(10), 10 ** 2 + 10, "U10 = n² + n");
sama(3 * 2 ** 7, 384, "geometri U8"); sama((29 - 5) / 4, 6, "sisipan");
ada(bab[8], "U<sub>40</sub> = 17 + 37 × 5 = 202", "Bab 8 linear"); ada(bab[8], "(39 − 3) : 4 + 1 = 10", "Bab 8 banyak suku");
ada(bab[8], "5 × 42 = 210", "Bab 8 jumlah"); ada(bab[8], "(29 − 5) : 4 = 6", "Bab 8 sisipan"); ada(bab[8], "<td><b>Suku</b></td><td class=\"n\">2</td><td class=\"n\">6</td><td class=\"n\">12</td>", "Bab 8 kuadrat");
const S = (x) => `U<sub>${x}</sub>`;
gen("91_lampiran_tabel.html", "D6", tabel("tb rujuk kata", [th("Bentuk", "", "20%"), th("Rumus", "", "38%"), th("Contoh")], [
  [td("<b>Linear</b>"), td(`${S("<i>q</i>")} = ${S("<i>p</i>")} + (<i>q</i> − <i>p</i>) × beda`), td(`${S(3)} = 17, beda 5: ${S(40)} = 17 + 37 × 5 = 202`)],
  [td("<b>Banyak suku</b>"), td(`(suku terakhir − suku pertama) : beda + 1`), td(`3, 7, …, 39: (39 − 3) : 4 + 1 = 10 suku`)],
  [td("<b>Jumlah suku linear</b>"), td(`banyak pasangan × (suku pertama + suku terakhir)`), td(`3 + 7 + … + 39 = 5 × 42 = 210`)],
  [td("<b>Sisipan <i>k</i> bilangan</b>"), td(`beda baru = selisih kedua ujung : (<i>k</i> + 1)`), td(`3 bilangan di antara 5 dan 29: (29 − 5) : 4 = 6`)],
  [td("<b>Kuadrat</b>"), td(`${S("<i>n</i>")} = ${S(1)} + (<i>n</i> − 1)<i>s</i> + <span class="fr"><sup>(<i>n</i> − 1)(<i>n</i> − 2)</sup>⁄<sub>2</sub></span> × <i>t</i>; <i>s</i> = selisih pertama awal, <i>t</i> = selisih kedua`), td(`2, 6, 12, 20, 30: ${S(10)} = 2 + 9 × 4 + 36 × 2 = ${kuadU(10)}`)],
  [td("<b>Rasio tetap</b>"), td(`${S("<i>n</i>")} = ${S(1)} × <i>r</i><sup><i>n</i> − 1</sup>`), td(`3, 6, 12, 24: ${S(8)} = 3 × 2<sup>7</sup> = ${3 * 2 ** 7}`)],
]) + "\n" + kenapa("suku ke-<i>n</i> sama dengan suku pertama ditambah jumlah semua selisih dari suku pertama sampai suku ke-<i>n</i>. Pada pola linear selisihnya sama semua; pada pola kuadrat selisihnya sendiri membentuk pola linear."));

// ════════ D7 huruf ↔ nomor ════════
const AB = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
AB.forEach((h, i) => sama(h.charCodeAt(0) - 64 + (27 - (i + 1)), 27, `pasangan ${h}`));
ada(bab[8], "selalu berjumlah nomor 27", "Bab 8 pasangan 27"); ada(bab[8], "A = 1 sampai Z = 26", "Bab 8 nomor huruf");
const sel7 = (i) => [td(`<b>${AB[i]}</b>`, "k"), td(i + 1, "n"), td(26 - i, "n")];
gen("91_lampiran_tabel.html", "D7", tabel("tb rujuk", [0, 1].flatMap(() => [th("Huruf"), th("Nomor", "n"), th("Dari belakang", "n")]),
  Array.from({ length: 13 }, (_, r) => [...sel7(r), ...sel7(r + 13)])) + "\n" +
  kenapa("nomor dari belakang = 27 − nomor, sebab huruf pertama dan huruf terakhir berpasangan, begitu pula huruf kedua dan huruf kedua dari belakang. Nomor yang melewati 26 dikurangi 26, sehingga sesudah Z kembali ke A."));

// ════════ D8 waktu dan laju (contoh = angka Bab 10) ════════
const MNT = [6, 12, 15, 20, 24, 30, 40, 45, 50, 72];
const jamPec = (m) => { const g = fpb(m, 60), a = m / g, b = 60 / g; return a > b ? `1${fr(a - b, b)}` : fr(a, b); };
MNT.forEach((m) => { const g = fpb(m, 60); sama((m / g) * 60, (60 / g) * m, `${m} menit`); });
const KMJ = [18, 36, 54, 60, 72, 90, 108, 120];
const lajuS = (k) => { const a = 5 * k, b = 18, g = fpb(a, b); return a % b ? `${Math.floor(a / b)}${fr((a % b) / g, b / g)}` : rb(a / b); };
KMJ.forEach((k) => { sama((k * 1000) % 60, 0, `${k} km/jam ke m/menit`); sama(5 * k * 3600, k * 1000 * 18, `${k} km/jam 5 : 18`); });
sama(72 * 5 / 18, 20, "72 km/jam"); sama((700 + 200) / 20, 45, "kereta"); sama((24 + 16) / 2, 20, "laju perahu"); sama((24 - 16) / 2, 4, "laju arus"); sama(240 / (120 / 60 + 120 / 40), 48, "rata-rata");
["<span class=\"m\">900 : 20 = 45 detik</span>", "<span class=\"m\">(24 + 16) : 2 = 20 km/jam</span>", "<span class=\"m\">(24 − 16) : 2 = 4 km/jam</span>", "240 : 5 = 48 km/jam", "1.000 : 3.600 = 5 : 18"].forEach((s) => ada(bab[10], s, "Bab 10"));
gen("91_lampiran_tabel.html", "D8", `<div class="duaT">\n` +
  tabel("tb rujuk", [th("Menit", "n"), th("Jam, pecahan", "n"), th("Jam, desimal", "n")], MNT.map((m) => [td(m, "n k"), td(jamPec(m), "n"), td(desimal(m, 60, 3).s, "n")])) + "\n" +
  tabel("tb rujuk", [th("km/jam", "n"), th("m/menit", "n"), th("m/detik", "n")], KMJ.map((k) => [td(k, "n k"), td(rb((k * 1000) / 60), "n"), td(lajuS(k), "n")])) +
  `\n</div>\n` + tabel("tb rujuk kata", [th("Keadaan", "", "24%"), th("Hitungan", "", "38%"), th("Contoh (Bab 10)")], [
  [td("<b>Kereta melintas</b>"), td("jarak = panjang terowongan atau jembatan + panjang kereta"), td(`(700 + 200) : 20 = ${(700 + 200) / 20} detik pada 72 km/jam = 20 m/detik`)],
  [td("<b>Perahu di sungai</b>"), td("laju perahu = (hilir + hulu) : 2; laju arus = (hilir − hulu) : 2"), td(`hilir 24, hulu 16: perahu ${(24 + 16) / 2} km/jam, arus ${(24 - 16) / 2} km/jam`)],
  [td("<b>Kecepatan rata-rata</b>"), td("total jarak : total waktu"), td(`240 km dalam 2 + 3 = 5 jam: ${240 / 5} km/jam`)],
]) + "\n" + kenapa("1 jam = 60 menit dan 1 km = 1.000 m. Karena itu km/jam dikali 1.000 : 60 menjadi m/menit, dan dikali 1.000 : 3.600 = 5 : 18 menjadi m/detik."));

// ════════ D9 lima pilihan kecukupan data (bunyi = Bab 11) ════════
const b11 = bab[11].split("<h3>Lima Pilihan Baku</h3>")[1];
const bunyi = [...b11.split("</tbody>")[0].matchAll(/<tr><td><b>([A-E])<\/b><\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g)];
const langkah = [...b11.split("</tbody>")[1].matchAll(/<tr><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td><b>([A-E])<\/b><\/td><\/tr>/g)];
sama(bunyi.map((m) => m[1]).join(""), "ABCDE", "Bab 11 lima bunyi"); sama(langkah.map((m) => m[4]).join(""), "ABCDE", "Bab 11 tiga langkah");
// hasil tiga langkah: (1), (2), gabungan bila keduanya tidak cukup → tepat lima keadaan, masing-masing satu pilihan
const keadaan = [];
for (const p of [1, 0]) for (const q of [1, 0]) for (const g of p || q ? [null] : [1, 0]) keadaan.push([p, q, g]);
sama(keadaan.length, 5, "lima keadaan");
const pilih = ([p, q, g]) => (p && q ? "D" : p ? "A" : q ? "B" : g ? "C" : "E");
sama(new Set(keadaan.map(pilih)).size, 5, "pilihan saling meniadakan");
const kata = (x) => (x === null ? "tidak perlu diperiksa" : x ? "cukup" : "tidak cukup");
for (const k of keadaan) { const m = langkah.find((r) => r[4] === pilih(k)); sama([m[1], m[2], m[3]].join(), k.map(kata).join(), `langkah ${pilih(k)}`); }
gen("91_lampiran_tabel.html", "D9", tabel("tb rujuk kata", [th("", "", "6%"), th("Bunyi pilihan"), th("(1) saja", "", "12%"), th("(2) saja", "", "12%"), th("Gabungan", "", "15%")],
  bunyi.map(([, h, b]) => { const m = langkah.find((r) => r[4] === h); return [td(`<b>${h}</b>`), td(b), td(m[1]), td(m[2]), td(m[3])]; })) + "\n" +
  kenapa("hasil tiga pemeriksaan, yaitu (1) saja, (2) saja, dan gabungan bila keduanya tidak cukup, hanya dapat berupa lima keadaan, dan setiap keadaan cocok dengan tepat satu bunyi. Cocokkan bunyinya, bukan hurufnya, sebab urutan di ujian dapat berbeda."));

// ════════ D10 putar dan cermin (matriks 2 × 2, sama dengan cek_bab14_18.mjs) ════════
const G = { tetap: [1, 0, 0, 1], r90: [0, 1, -1, 0], r180: [-1, 0, 0, -1], r270: [0, -1, 1, 0], kk: [-1, 0, 0, 1], ab: [1, 0, 0, -1], m1: [0, 1, 1, 0], m2: [0, -1, -1, 0] };
const NAMA = { tetap: "tidak diputar", r90: "diputar 90° searah jarum jam", r180: "diputar 180°", r270: "diputar 90° berlawanan arah jarum jam", kk: "cermin kiri-kanan", ab: "cermin atas-bawah", m1: "cermin garis miring /", m2: "cermin garis miring \\" };
const kali = ([a, b, c, d], [e, f, g, h]) => [a * e + b * g, a * f + b * h, c * e + d * g, c * f + d * h];
const lalu = (...k) => k.reduce((m, x) => kali(G[x], m), G.tetap);
const nama = (m) => Object.keys(G).find((k) => G[k].join() === m.join());
const dt = ([a, b, c, d]) => a * d - b * c;
const arah = ([, b, , d]) => ({ "0,1": "atas", "1,0": "kanan", "0,-1": "bawah", "-1,0": "kiri" })[`${b},${d}`];
const CERMIN = ["kk", "ab", "m1", "m2"], semua = Object.keys(G);
const batal = (x) => semua.find((y) => nama(lalu(x, y)) === "tetap");
for (const k of semua) ada(bab[14], `<tr><td>${NAMA[k]}</td><td>${arah(G[k])}</td><td>${dt(G[k]) > 0 ? "tetap" : "terbalik"}</td></tr>`, `Bab 14 delapan gerak ${k}`);
for (const x of CERMIN) for (const y of CERMIN) assert.ok(!CERMIN.includes(nama(lalu(x, y))), `dua cermin ${x} ${y} = putaran`);
sama(nama(lalu("kk", "ab")), "r180", "dua cermin = putar 180°");
const pendek = { kk: "kiri-kanan", ab: "atas-bawah", m1: "garis /", m2: "garis \\" };
gen("91_lampiran_tabel.html", "D10", tabel("tb rujuk kata", [th("Gerak", "", "40%"), th("Penanda di atas ke"), th("Urutan keliling"), th("Dibatalkan oleh", "", "30%")],
  semua.map((k) => [td(NAMA[k]), td(arah(G[k])), td(dt(G[k]) > 0 ? "tetap" : "terbalik"), td(NAMA[batal(k)])])) + "\n" +
  tabel("tb rujuk", [th("Cermin pertama, lalu", "", "24%"), ...CERMIN.map((y) => th(pendek[y], "", "19%"))], CERMIN.map((x) => [td(`<b>${pendek[x]}</b>`), ...CERMIN.map((y) => td(NAMA[nama(lalu(x, y))].replace("diputar ", "").replace(" jarum jam", "").replace("tidak diputar", "tetap")))])) + "\n" +
  tabel("tb rujuk", [th("Cermin", "", "40%"), th("cermin lalu putar 90° searah", "", "30%"), th("putar 90° searah lalu cermin")], CERMIN.map((x) => [td(`<b>${pendek[x]}</b>`), td(pendek[nama(lalu(x, "r90"))]), td(pendek[nama(lalu("r90", x))])])) +
  "\n" + kenapa("putaran menjaga urutan keliling searah jarum jam, sedangkan setiap cermin membaliknya. Dua cermin membalik dua kali, jadi hasilnya selalu putaran: cermin kiri-kanan lalu cermin atas-bawah sama dengan diputar 180°. Gerak yang memuat satu cermin bergantung pada urutan, seperti terlihat pada dua kolom terakhir."));
for (const x of CERMIN) assert.notEqual(nama(lalu(x, "r90")), nama(lalu("r90", x)), `urutan ${x}`);

// ════════ engine Pilar 3 + tabel kekeliruan Bab 3–18 (cara baca = cek_bab19.mjs) ════════
const eng = readFileSync(ENGINE, "utf8");
const KODE = [...eng.matchAll(/^\| (K[1-7]) \| (JF?-[A-Z]+)(?: \(baru\))? \| ([^|]+) \| ([^|]+) \|/gm)].map((m) => ({ K: m[1], kode: m[2], kamus: m[3].trim(), guru: m[4].trim() }));
sama(KODE.length, 47, "engine 47 kode"); sama(new Set(KODE.map((x) => x.kode)).size, 47, "kode unik");
const namaK = Object.fromEntries([...eng.match(/K1 Data[^\n]*/)[0].matchAll(/(K[1-7]) ([^·]+?)(?= ·|\.$)/g)].map((m) => [m[1], m[2].trim()]));
const baris = [];
for (let b = 3; b <= 18; b++) {
  const sek = bab[b].split("<h3>Kekeliruan pada")[1].split("<h3>Contoh Soal")[0];
  const nm = [...sek.match(/<tbody>([\s\S]*?)<\/tbody>/)[1].matchAll(/<tr><td>(\d+)<\/td><td><b>([\s\S]*?)<\/b><\/td>/g)];
  const pad = polos(sek.match(/<h4>Padanan[^<]*<\/h4>\s*<p>([\s\S]*?)<\/p>/)[1]);
  const k = {};
  for (const it of pad.split(" · ")) {
    const m = it.match(/^(\d+)(?:–(\d+))? ([\s\S]*?)\(([^)]*?)\b(K[1-7])/);
    for (let i = +m[1]; i <= +(m[2] || m[1]); i++) k[i] = m[3].match(/JF?-[A-Z]+/)[0];
  }
  for (const [, no, nama2] of nm) baris.push({ bab: b, no: +no, nama: nama2, kode: k[no] });
}
sama(baris.length, 136, "136 baris Bab 3–18");
const babKode = (c) => rentang(baris.filter((r) => r.kode === c).map((r) => r.bab));
KODE.forEach((x) => assert.ok(babKode(x.kode), `${x.kode} tidak dipakai di Bab 3–18`));

// ════════ L5: 47 baris ════════
const l5rows = tabel("tb pecah rujuk kata l5", [th("Kel.", "", "6%"), th("Kalimat guru (buku siswa)", "", "36%"), th("Kode", "", "15%"), th("Nama kamus", "", "25%"), th("Bab")],
  KODE.map((x) => [td(x.K), td(x.guru), td(`<code>${x.kode}</code>`), td(x.kamus), td(babKode(x.kode))])).split("\n");
let kSebelum = null;   // baris pertama tiap kelompok diberi garis atas tipis
gen("95_lampiran_pengajar.html", "L5", l5rows.map((l) => { const k = l.match(/^    <tr><td>(K\d)<\/td>/)?.[1]; if (!k) return l; const awal = kSebelum && k !== kSebelum; kSebelum = k; return awal ? l.replace("<tr>", '<tr class="awal">') : l; }).join("\n"));
const l5 = lamp["95_lampiran_pengajar.html"];
const tindak = [...l5.split('data-tindak="kelompok"')[1].split("</tbody>")[0].matchAll(/<tr data-k="(K\d)"><td>(\d)<\/td><td><b>([^<]+)<\/b><\/td><td>([^<]+)<\/td><\/tr>/g)];
sama(tindak.map((m) => m[1]).join(), K7.join(), "L5 tindakan tujuh kelompok");
tindak.forEach(([, k, no, nm]) => { sama(`K${no}`, k, `nomor ${k}`); sama(nm, namaK[k], `nama ${k}`); });

// ════════ semua slot di src (Bab 1–19) ════════
const slot = [];
for (const [b, h] of Object.entries(bab)) {
  for (const m of h.matchAll(/<div class="slot" data-slot="([^"]+)"(?: data-target="(\d+)")?>[\s\S]*?<div class="guru"><b>([^<]*)<\/b>/g)) slot.push({ bab: +b, id: m[1], t: m[2] ? +m[2] : null, ket: m[3] });
  // soal terisi (Tahap 5): jenis dari catatan pengajar di blok; Contoh 1 Bab 6 (prototipe T3) tanpa catatan pengajar
  for (const m of h.matchAll(/<div data-soal="([^"]+)"(?: data-target="(\d+)")?>([\s\S]*?)<!--[A-Z0-9-]+:selesai-->/g))   // Latihan Bukti terisi tanpa data-target
    slot.push({ bab: +b, id: m[1], t: m[2] ? +m[2] : null, ket: m[3].match(/<div class="guru"><b>([^<]*)<\/b>/)?.[1] ?? "HIT perkiraan", isi: true });
}
const urut = (s) => s.id.replace(/-([A-Z])(\d\d)$/, (_, j, x) => `-${"PICBL".indexOf(j)}${x}`);
slot.sort((a, b) => a.bab - b.bab || urut(a).localeCompare(urut(b)));
sama(slot.length, 125, "125 slot (T6-5, T6-12: pembuka, latihan, contoh 3 figural, Tes Awal, Latihan B ditiadakan; lembar Bab 1 bukan soal)");
sama(new Set(slot.map((s) => s.id)).size, 125, "ID slot unik");
const PERAN = { P: "Pembuka", C: "Contoh", L: "Latihan", B: "Latihan Bukti", I: "Gambar penjelas" };
const peran = (s) => PERAN[s.id.match(/-([A-Z])\d\d$/)[1]];
const jenis = (s) => {
  const f = s.ket.match(/FIG-[A-Z]+-[A-Z0-9]+/g);
  if (f) return f.map((x, i) => (i ? x.split("-").at(-1) : x)).join("/");
  if (/^Latihan Bukti/.test(s.ket)) return "KCK";
  if (/^(Sebutkan|Kenakan)/.test(s.ket)) return "FIG teks";
  return s.ket.match(/^(ILUS|[A-Z]{3})\b/)[1];
};
const judul = (b) => bab[b].match(/<h2>([^<]+)<\/h2>/)[1];
const c1 = JSON.parse(readFileSync(join(AKAR, "scripts/data/bab6_c1.json"), "utf8"));
const numerik = Object.fromEntries(JSON.parse(readFileSync(join(AKAR, "scripts/data/numerik_b06_10.json"), "utf8")).butir.map((x) => [x.id, x]));
const verbal = Object.fromEntries(JSON.parse(readFileSync(join(AKAR, "scripts/data/verbal_b03_05.json"), "utf8")).butir.map((x) => [x.id, x]));
const kck = Object.fromEntries(JSON.parse(readFileSync(join(AKAR, "scripts/data/kck_b11_13.json"), "utf8")).butir.map((x) => [x.id, x]));
const dasar = Object.fromEntries(JSON.parse(readFileSync(join(AKAR, "scripts/data/dasar_b01_02_19.json"), "utf8")).butir.map((x) => [x.id, x]));
const fig = Object.fromEntries(JSON.parse(readFileSync(join(AKAR, "aset/figural/items.json"), "utf8")).map((x) => [x.id, x]));
const asal = (s) => {                                   // kolom Pembuat · Bukti · Kerangka · TO terdekat untuk soal terisi
  if (s.id === "HB-TIU-B06-C01") return [td("<code>contoh_bab6_c1.mjs</code>"), td("assert script: sisa bagi 9, apit, jarak opsi"), td(c1.reviu.kerangka.split(" · ").slice(0, 2).join(" · ")), td("TO P1 no. 37 (perkiraan)")];
  const u = numerik[s.id];
  if (u) return [td("<code>soal_numerik.mjs</code>"), td(u.bukti.metode.split(/[;(]/)[0].split(",")[0].trim()), td(u.kerangka.split(" · ").slice(0, 2).join(" · ")), td(u.to_terdekat.split(";")[0])];
  const k = kck[s.id];
  if (k) return [td("<code>soal_kck.mjs</code>"), td(k.bukti.metode.split(/[;(]/)[0].split(",")[0].trim()), td(k.kerangka.split(" · ").slice(0, 2).join(" · ")), td(k.to_terdekat.split(";")[0])];
  const d = dasar[s.id];
  if (d) return [td("<code>soal_dasar.mjs</code>"), td(d.bukti.metode.split(/[;(]/)[0].split(",")[0].trim()), td(d.kerangka.split(" · ").slice(0, 2).join(" · ")), td(d.to_terdekat.split(";")[0])];
  const f = fig[s.id];
  if (f) return [td("<code>tiu-handbook.ts</code>"), td("assert generator"), td(`${f.jenis.replace("FIG-", "")} · ${f.keluarga.join(" + ")}`), td("bukan TO (benih ≥ 900)")];
  if (s.id.includes("-I")) return [td("<code>tiu-ilustrasi.ts</code>"), td("assert gambar"), td("gambar penjelas"), td("bukan soal")];
  const v = verbal[s.id];
  assert.ok(v, `${s.id}: soal terisi tanpa data sumber`);
  return [td(`<code>soal_verbal.mjs</code>${v.bab === 4 ? "" : " + tulis tangan"}`), td(v.bukti.metode.split(" (")[0].split(",")[0]), td(v.kerangka.split(" · ").slice(0, 2).join(" · ")), td(v.to_terdekat.split(";")[0])];
};
const l6 = [];
for (let b = 1; b <= 19; b++) {
  l6.push(`    <tr class="grp"><td colspan="8">Bab ${b} · ${judul(b)}</td></tr>`);
  for (const s of slot.filter((x) => x.bab === b))
    l6.push(`    <tr>${[td(s.id.replace("HB-TIU-", ""), "id"), td(peran(s), "nw"), td(jenis(s), "nw"), td(s.t ?? "", "n"),
      ...(s.isi ? asal(s) : ["", "", "", ""].map((x) => td(x)))].join("")}</tr>`);
}
gen("96_lampiran_l6.html", "L6", `<table class="tb pecah rujuk l6">\n  <thead><tr>${[th("ID", "", "10%"), th("Peran", "", "13%"), th("Jenis", "", "18%"), th("Detik", "n", "6%"), th("Pembuat", "", "13%"), th("Bukti kunci tunggal", "", "13%"), th("Kerangka", "", "13%"), th("TO terdekat · pola rujukan")].join("")}</tr></thead>\n  <tbody>\n${l6.join("\n")}\n  </tbody>\n</table>`);
const l6teks = polos(lamp["96_lampiran_l6.html"]);
ada(l6teks, `${slot.length} butir`, "L6 jumlah butir di narasi");

// ════════ Lampiran A: angka di narasi ════════
const latPG = slot.filter((s) => s.bab >= 2 && s.id.includes("-L") && s.t).length, bukti = slot.filter((s) => /-B\d\d$/.test(s.id)).length;
sama(latPG, 41, "41 latihan pilihan ganda (T6-5, T6-12: Tes Awal dan Latihan B ditiadakan)"); sama(bukti, 2, "2 Latihan Bukti");
const siswa = lamp["90_lampiran_siswa.html"];
ada(polos(siswa), `${latPG} latihan pilihan ganda dan ${bukti} Latihan Bukti`, "Lampiran A");   // daftar kunci dihapus (T6-3); pembahasan kini Lampiran A

// ════════ Lampiran C = Latihan A Bab 19 ════════
const la = [...bab[19].matchAll(/<tr data-rujuk="([^"]+)" data-k="(K\d)" data-kode="([^"]+)" data-ref="(\d+):(\d+)">[\s\S]*?<span class="guru">([^<]+) \(Bab \d+ no\. \d+\)<\/span>/g)];
sama(la.length, 14, "Latihan A 14 butir");
const lc = [...siswa.split('data-jawab="latihan-a"')[1].split("</tbody>")[0].matchAll(/<tr data-kode="([^"]+)"><td>(\d+)<\/td><td><b>([^<]+)\.<\/b> ([^<]+)<\/td><td>(\d) · ([^<]+)<span class="guru"> · ([^<]+)<\/span><\/td><td>Bab (\d+)<\/td><\/tr>/g)];
sama(lc.length, 14, "Lampiran C 14 butir");
lc.forEach(([, kode, no, nm, isi, kn, kel, kode2, b], i) => {
  const [, , K, kodeA, rb2, , namaA] = la[i];
  sama(+no, i + 1, `Lampiran C nomor ${i + 1}`);
  sama(kode, kodeA, `Lampiran C ${no}: kode`); sama(kode2, kodeA, `Lampiran C ${no}: kode guru`);
  sama(nm, namaA, `Lampiran C ${no}: nama = Bab 19`); sama(`K${kn}`, K, `Lampiran C ${no}: kelompok`);
  sama(kel, namaK[K], `Lampiran C ${no}: nama kelompok`); sama(b, rb2, `Lampiran C ${no}: bab`);
  const kal = isi.split(/(?<=\.)\s+/).length; assert.ok(kal >= 1 && kal <= 2, `Lampiran C ${no}: ${kal} kalimat`);
});

// ════════ L4: sepuluh pertemuan, angka latihan dari slot ════════
const l4 = [...l5.split('data-l4="pertemuan"')[1].split("</tbody>")[0].matchAll(/<tr data-bab="([\d,]+)"><td class="n">(\d+)<\/td><td>Bab ([^<]+)<\/td><td class="n">(\d+)<\/td><td class="n">([^<]+)<\/td><td>/g)];
sama(l4.length, 10, "L4 sepuluh pertemuan");
const dipakai = [];
l4.forEach(([, bb, no, label, nl, w], i) => {
  const bs = bb.split(",").map(Number); dipakai.push(...bs);
  sama(+no, i + 1, `pertemuan ${i + 1}`); sama(label, rentang(bs), `pertemuan ${no}: label bab`);
  const lat = slot.filter((s) => bs.includes(s.bab) && s.id.includes("-L") && s.t);
  sama(+nl, lat.length, `pertemuan ${no}: banyak latihan`); sama(w, menit(lat.reduce((a, s) => a + s.t, 0)), `pertemuan ${no}: waktu`);
});
sama(dipakai.join(), Array.from({ length: 19 }, (_, i) => i + 1).join(), "L4 Bab 1–19 tepat sekali, urut");

// ════════ nama tryout/bimbel hanya di L1 dan L6; L1–L6 hanya edisi pengajar ════════
const TRYOUT = /Al Faiz|Paket 41|Part 39|TIU002|Pejuang/;
const semuaSrc = Object.fromEntries(readdirSync(SRC).filter((f) => f.endsWith(".html")).map((f) => [f, f in lamp ? lamp[f] : baca(f)]));
for (const [f, h] of Object.entries(semuaSrc)) {
  const luar = h.replace(/<!--L([16]):mulai-->[\s\S]*?<!--L\1:selesai-->/g, "");
  const m = luar.match(TRYOUT); assert.ok(!m, `${f}: nama "${m?.[0]}" di luar L1/L6`); n++;
}
for (const f of ["95_lampiran_pengajar.html", "96_lampiran_l6.html"]) {
  const h = lamp[f].replace(/<!--[\s\S]*?-->/g, "");
  assert.ok(/^\s*<section class="bab lamp guru"[^>]*>/.test(h) && h.trim().endsWith("</section>") && h.split("<section").length === 2, `${f}: harus satu <section class="bab lamp guru">`);
}
ada(lamp["95_lampiran_pengajar.html"], "<!--L1:mulai-->", "penanda L1"); ada(lamp["96_lampiran_l6.html"], "<!--L6:mulai-->", "penanda L6");
for (const L of ["L1", "L2", "L3", "L4", "L5"]) ada(l5, `<h3 data-l="${L}">${L} · `, `judul ${L}`);
ada(lamp["96_lampiran_l6.html"], '<h3 data-l="L6">L6 · ', "judul L6");
for (const f of Object.keys(lamp)) assert.ok(!/satu-satunya/i.test(lamp[f]), `${f}: "satu-satunya"`);
// rujukan lampiran di bab tidak lagi "belum ditulis"
for (const [b, h] of Object.entries(bab)) assert.ok(!/Lampiran [A-DL][1-6]?[^<]{0,40}belum ditulis/.test(h), `Bab ${b}: rujukan lampiran "belum ditulis"`);

if (TULIS) for (const f of LAMP) writeFileSync(join(SRC, f), lamp[f]);
console.log(`cek_lampiran: semua assert lulus · ${n} butir dicek · D1–D10 dari script · L5 47 kode = engine · L6 ${slot.length} butir · Lampiran C 14 = Bab 19 · L4 10 pertemuan${TULIS ? " · blok GEN ditulis" : ""}`);
