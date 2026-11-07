// Handbook TIU · Bab 11–13 · semua angka dan status logika di narasi dihitung di sini (pemeriksaan semua kemungkinan),
// lalu dicek muncul persis di src. Bukan pembuat soal: tidak ada soal, opsi, atau kunci di berkas ini.
// Dua gambar Bab 12 (kursi melingkar, panah urutan) dibangkitkan di sini dan harus sama persis dengan yang di src.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/cek_bab11_13.mjs   (--svg mencetak kedua gambar)
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const [b11, b12, b13] = ["21_bab11", "22_bab12", "23_bab13"].map((n) => (existsSync(join(AKAR, `src/${n}.html`)) ? readFileSync(join(AKAR, `src/${n}.html`), "utf8") : ""));
let n = 0;
const buka = (html) => html.replace(/<span class="m">([^<]*(?:<(?!\/span>)[^<]*)*)<\/span>/g, "$1");
const CETAK = process.argv.includes("--svg");
const ada = (html, s, ket) => { if (CETAK) return; n++; assert.ok(html.includes(s) || buka(html).includes(s), `tidak ditemukan di src: "${s}" (${ket})`); };
const fmt = (x) => (x < 0 ? "−" : "") + String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const rp = (x) => `Rp${fmt(x)}`;
const des = (x) => String(x).replace(".", ",");
const rentang = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const perm = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p])));
const unik = (xs) => [...new Set(xs)];

// ════════ BAB 11 · KECUKUPAN DATA ════════
// a, b bilangan bulat positif; dunia dibatasi B (dua batas dipakai untuk membuktikan "tak terhingga")
const dunia = (B) => rentang(1, B).flatMap((a) => rentang(1, B).map((b) => ({ a, b })));
const s1 = (w) => w.a + w.b === 7, s2 = (w) => w.a - w.b === 3;
const nilaiA = (B, f) => unik(dunia(B).filter(f).map((w) => w.a));
assert.deepEqual(nilaiA(100, s1), [1, 2, 3, 4, 5, 6]);
assert.deepEqual(nilaiA(200, s1), [1, 2, 3, 4, 5, 6]);                       // tidak bergantung batas dunia
assert.ok(nilaiA(200, s2).length > nilaiA(100, s2).length);                  // (2) saja: terus bertambah = tak terhingga
assert.deepEqual(nilaiA(100, s2).slice(0, 3), [4, 5, 6]);
assert.deepEqual(dunia(200).filter((w) => s1(w) && s2(w)), [{ a: 5, b: 2 }]);
ada(b11, "<tr><td>(1) saja</td><td>6 keadaan</td><td>1 sampai 6</td></tr>", "tabel (1)");
ada(b11, "<tr><td>(2) saja</td><td>tak terhingga</td><td>4, 5, 6, …</td></tr>", "tabel (2)");
ada(b11, "<tr class=\"uji\"><td>(1) dan (2)</td><td>1 keadaan</td><td>5</td></tr>", "tabel gabungan");
ada(b11, "(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), dan (6, 1)", "enam keadaan");
ada(b11, "hanya <i>a</i> = 5 dan <i>b</i> = 2", "gabungan");
ada(b11, "keadaan (1, 6) dan (2, 5)", "dua keadaan bantahan");
// ya/tidak: "a > 6" pasti tidak; "a ≥ 6" tidak tentu
const jwb = (f, q) => unik(dunia(100).filter(f).map(q));
assert.deepEqual(jwb(s1, (w) => w.a > 6), [false]);
assert.deepEqual(jwb(s1, (w) => w.a >= 6).sort(), [false, true]);
ada(b11, "Apakah <i>a</i> &gt; 6?", "tanya ya/tidak");
ada(b11, "paling besar 6", "a maksimum");
ada(b11, "keadaan (6, 1) menjawab \"ya\", sedangkan (5, 2) menjawab \"tidak\"", "a ≥ 6 tidak cukup");
// perkirakan dulu: tiga pengecualian
assert.equal(21 / 3, 7);
ada(b11, "3<i>a</i> + 3<i>b</i> = 21", "bentuk gabungan");
ada(b11, "<i>a</i> + <i>b</i> = 7 tanpa", "bentuk gabungan hasil");
const kembar = dunia(100).filter((w) => w.a + 2 * w.b === 8);
assert.deepEqual(kembar, dunia(100).filter((w) => 2 * w.a + 4 * w.b === 16));
assert.deepEqual(kembar.map((w) => [w.a, w.b]), [[2, 3], [4, 2], [6, 1]]);
ada(b11, "<i>a</i> + 2<i>b</i> = 8 dan 2<i>a</i> + 4<i>b</i> = 16", "persamaan kembar");
ada(b11, "(2, 3), (4, 2), dan (6, 1)", "tiga keadaan kembar");
const akar = rentang(-50, 50).filter((x) => x * x === 16);
assert.deepEqual(akar, [-4, 4]);
assert.deepEqual(akar.filter((x) => x > 0), [4]);
ada(b11, "<i>x</i><sup>2</sup> = 16 dipenuhi <i>x</i> = 4 dan <i>x</i> = −4", "akar kembar");
// membuktikan: x > 6 dan y > 5 → x + y > 11 (diuji di kisi bilangan positif berlangkah 0,25)
const kisi = rentang(1, 120).map((i) => i / 4);
assert.ok(kisi.filter((x) => x > 6).every((x) => kisi.filter((y) => y > 5).every((y) => x + y > 11)));
assert.ok(7 + 4 > 10 && !(7 + 1 > 10));
ada(b11, "keadaan <i>x</i> = 7, <i>y</i> = 4 memberi 11, jawabannya \"ya\"; keadaan <i>x</i> = 7, <i>y</i> = 1 memberi 8, jawabannya \"tidak\"", "satu contoh bukan bukti");
ada(b11, "<i>x</i> + <i>y</i> &gt; 6 + 5 = 11", "alasan umum");
// tiga pernyataan: 7 himpunan, 3 pasangan
assert.equal(2 ** 3 - 1, 7);
ada(b11, "tujuh himpunan: tiga pernyataan tunggal, tiga pasangan, dan ketiganya bersama", "kck3");
// perbandingan bernilai huruf: P = x² + 1, Q = 2x, x bulat
const P = (x) => x * x + 1, Q = (x) => 2 * x, rel = (x) => (P(x) > Q(x) ? "&gt;" : P(x) < Q(x) ? "&lt;" : "=");
for (const x of rentang(1, 5)) ada(b11, `<tr><td>${x}</td><td>${P(x)}</td><td>${Q(x)}</td><td>P ${rel(x)} Q</td></tr>`, `pvq x=${x}`);
assert.deepEqual(unik(rentang(1, 5).map(rel)), ["=", "&gt;"]);
assert.deepEqual(unik(rentang(2, 5).map(rel)), ["&gt;"]);
assert.ok(rentang(-100, 100).every((x) => P(x) - Q(x) === (x - 1) ** 2));
ada(b11, "P − Q = (<i>x</i> − 1)<sup>2</sup>", "alasan umum pvq");

// ════════ BAB 12 · PENALARAN ANALITIS ════════
const lima = perm(["A", "B", "C", "D", "E"]);
const pos = (p, x) => p.indexOf(x);
const syarat = [
  ["A di urutan ke-2", (p) => pos(p, "A") === 1],
  ["B tepat setelah A", (p) => pos(p, "B") === pos(p, "A") + 1],
  ["A dan B bersebelahan", (p) => Math.abs(pos(p, "A") - pos(p, "B")) === 1],
  ["A sebelum B", (p) => pos(p, "A") < pos(p, "B")],
  ["A tidak di urutan ke-1", (p) => pos(p, "A") !== 0],
];
assert.equal(lima.length, 120);
ada(b12, "5 × 4 × 3 × 2 × 1 = 120", "5!");
const sisa = syarat.map(([s, f]) => [s, lima.filter(f).length]);
assert.deepEqual(sisa.map((x) => x[1]), [24, 24, 48, 60, 96]);
assert.equal(4 * 3 * 2 * 1, 24); assert.equal(48 / 2, 24); assert.equal(120 - 96, 24);
ada(b12, "empat tempat: 4 × 3 × 2 × 1", "posisi tetap"); ada(b12, "masing-masing 24", "AB atau BA"); ada(b12, "yaitu 24 susunan", "diawali A");
for (const [s, k] of sisa) ada(b12, `<td>${s}</td><td class="n">${k}</td>`, `sisa ${s}`);
ada(b12, "\"B setelah A\" menyisakan 60 susunan, sedangkan \"B tepat setelah A\" hanya 24", "tepat setelah");
// melingkar 6: putaran kembar dibuang dengan mengunci satu orang
const enam = perm([1, 2, 3, 4, 5, 6]);
const baku = (p) => { const i = p.indexOf(1); return [...p.slice(i), ...p.slice(0, i)].join(""); };
assert.equal(unik(enam.map(baku)).length, 120);
ada(b12, "6 × 5 × 4 × 3 × 2 × 1 = 720", "6!");
ada(b12, "720 : 6 = 120", "putaran kembar");
// kursi bernomor searah jarum jam (dilihat dari atas), kursi 1 di bawah; semua menghadap ke tengah
const R = 38, CX = 80, CY = 62;
const sudut = (k) => Math.PI / 2 + ((k - 1) * Math.PI) / 3;                 // layar: y ke bawah, +sudut = searah jarum jam
const titik = (k) => [CX + R * Math.cos(sudut(k)), CY + R * Math.sin(sudut(k))];
const kanan = (k) => {
  const [x, y] = titik(k), hadap = [CX - x, CY - y], ka = [-hadap[1], hadap[0]];  // di layar: putar 90° searah jarum jam
  return [1, 2, 3, 4, 5, 6].filter((j) => j !== k).map((j) => [j, Math.hypot(...titik(j).map((v, i) => v - titik(k)[i]))])
    .filter(([j]) => { const d = titik(j).map((v, i) => v - titik(k)[i]); return Math.abs(Math.hypot(...d) - R) < 1e-6; })
    .find(([j]) => { const d = titik(j).map((v, i) => v - titik(k)[i]); return d[0] * ka[0] + d[1] * ka[1] > 0; })[0];
};
assert.equal(kanan(1), 6);
assert.ok([1, 2, 3, 4, 5, 6].every((k) => kanan(k) === ((k + 4) % 6) + 1));  // kanan = nomor turun = berlawanan jarum jam
const hadapan = (k) => ((k + 2) % 6) + 1;
assert.equal(hadapan(1), 4);
ada(b12, "tetangga kanan orang di kursi 1 adalah kursi 6, bukan kursi 2", "kanan");
ada(b12, "kursi 1 berhadapan dengan kursi 4", "hadapan");
const r1 = (v) => Math.round(v * 10) / 10;
const kursiSvg = () => {
  const kursi = [1, 2, 3, 4, 5, 6].map((k) => { const [x, y] = titik(k).map(r1); return `<circle class="k${k === 1 ? " t" : ""}" cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${r1(y + 3.4)}">${k}</text>`; }).join("");
  const [x1, y1] = titik(1).map(r1), [x6, y6] = titik(6).map(r1);
  return `<svg viewBox="0 0 160 124" role="img" aria-label="Enam kursi melingkar bernomor searah jarum jam; orang di kursi 1 menghadap ke tengah, tetangga kanannya di kursi 6">`
    + `<defs><marker id="ujung" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z"/></marker></defs>`
    + `<circle class="meja" cx="${CX}" cy="${CY}" r="${R - 14}"/>`
    + `<path class="pn" marker-end="url(#ujung)" d="M${x1} ${r1(y1 - 11)}V${r1(CY + 8)}"/>`
    + `<path class="pn ka" marker-end="url(#ujung)" d="M${r1(x1 + 11)} ${r1(y1 + 2)}Q${r1((x1 + x6) / 2 + 10)} ${r1(y1 + 2)} ${r1(x6 + 6)} ${r1(y6 + 8)}"/>`
    + kursi + `<text class="ket" x="${r1(x1 + 30)}" y="${r1(y1 + 15)}">kanan</text></svg>`;
};
// urutan parsial (penanda ujung panah dipakai bersama gambar kursi di atasnya): P→Q, P→R, Q→S, R→S, T→R
const panah = [["P", "Q"], ["P", "R"], ["Q", "S"], ["R", "S"], ["T", "R"]];
const urut = perm(["P", "Q", "R", "S", "T"]).filter((p) => panah.every(([x, y]) => pos(p, x) < pos(p, y)));
assert.equal(urut.length, 5);
assert.deepEqual(unik(urut.map((p) => p[4])), ["S"]);
assert.deepEqual(unik(urut.map((p) => p[0])).sort(), ["P", "T"]);
assert.deepEqual(unik(panah.map(([x]) => x)).sort(), ["P", "Q", "R", "T"]);  // hanya S tanpa panah keluar
ada(b12, "hanya lima susunan", "banyak susunan");
ada(b12, `${urut[0].join(" ")} dan ${urut[3].join(" ")}`, "dua susunan bantahan urutan pertama");
const N = { P: [16, 22], T: [16, 82], Q: [76, 22], R: [76, 82], S: [136, 52] };
const panahSvg = () => {
  const garis = panah.map(([a, b]) => { const [x1, y1] = N[a], [x2, y2] = N[b], d = Math.hypot(x2 - x1, y2 - y1), u = [(x2 - x1) / d, (y2 - y1) / d];
    return `<path class="pn" marker-end="url(#ujung)" d="M${r1(x1 + u[0] * 10)} ${r1(y1 + u[1] * 10)}L${r1(x2 - u[0] * 12)} ${r1(y2 - u[1] * 12)}"/>`; }).join("");
  const simpul = Object.entries(N).map(([k, [x, y]]) => `<circle class="k${k === "S" ? " t" : ""}" cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y + 3.4}">${k}</text>`).join("");
  return `<svg viewBox="0 0 152 104" role="img" aria-label="Panah urutan: P ke Q, P ke R, Q ke S, R ke S, T ke R; hanya S tanpa panah keluar">`
    + garis + simpul + `</svg>`;
};
if (process.argv.includes("--svg")) { console.log(kursiSvg()); console.log(panahSvg()); process.exit(0); }
ada(b12, kursiSvg(), "gambar kursi = hasil script");
ada(b12, panahSvg(), "gambar panah = hasil script");
// pencocokan: 3 orang × 3 tugas
const tugas = ["notulen", "moderator", "penerima tamu"];
const cocok = perm(tugas).map(([d, e, f]) => ({ Dika: d, Eka: e, Fajar: f }))
  .filter((m) => m.Eka !== "notulen" && m.Eka !== "moderator" && m.Dika !== "moderator");
assert.deepEqual(cocok, [{ Dika: "notulen", Eka: "penerima tamu", Fajar: "moderator" }]);
assert.equal(perm(tugas).length, 6);
ada(b12, "3 × 2 × 1 = 6 pemetaan", "pemetaan");
ada(b12, "Dika notulen, Eka penerima tamu, dan Fajar moderator", "hasil pencocokan");
// jadwal: 6 orang ke 3 hari, 2 orang per hari
const jadwal = unik(perm([0, 1, 2, 3, 4, 5]).map((p) => [0, 2, 4].map((i) => [p[i], p[i + 1]].sort().join("")).join("|")));
assert.equal(jadwal.length, 90);
ada(b12, "ada 90 cara", "jadwal");

// ════════ BAB 13 · OPTIMASI TABEL ════════
const kemas = [{ l: 2, h: 34000 }, { l: 5, h: 80000 }, { l: 10, h: 165000 }];
const satuan = kemas.map((k) => k.h / k.l);
assert.deepEqual(satuan, [17000, 16000, 16500]);
for (const [i, k] of kemas.entries()) ada(b13, `<tr><td>${k.l} liter</td><td class="n">${rp(k.h)}</td><td class="n">${rp(satuan[i])}</td></tr>`, `tabel ${k.l} L`);
const kombi = (batas) => { const out = []; for (let a = 0; a <= 15; a++) for (let b = 0; b <= 6; b++) for (let c = 0; c <= 3; c++) out.push({ a, b, c, L: 2 * a + 5 * b + 10 * c, H: 34000 * a + 80000 * b + 165000 * c }); return out.filter(batas); };
const sah = kombi((k) => k.L >= 21 && k.L <= 24).sort((x, y) => x.H - y.H);
assert.equal(sah.length, 18);
assert.ok(sah[0].H < sah[1].H);                                                // optimum tunggal
assert.deepEqual([sah[0].a, sah[0].b, sah[0].c, sah[0].L, sah[0].H], [3, 3, 0, 21, 342000]);
const bawah = 21 * Math.min(...satuan);
assert.equal(bawah, 336000);
ada(b13, `21 × ${rp(16000)} = ${rp(bawah)}`, "batas bawah");
ada(b13, "Ada 18 kombinasi sah", "banyak kombinasi");
ada(b13, `tiga kemasan 5 liter dan tiga kemasan 2 liter: 21 liter seharga ${rp(342000)}`, "optimum");
ada(b13, `hanya ${rp(342000 - bawah)} di atas batas bawah`, "selisih batas");
ada(b13, "total isi harus 21 sampai 24 liter", "rentang sah"); assert.equal(21 + 3, 24);
// daftar teratur: kemasan 5 L dikurangi satu per satu, sisanya ditambal kemasan 2 L sesedikit mungkin (tanpa 10 L)
for (const b of [4, 3, 2, 1]) {
  const a = rentang(0, 15).find((a) => 5 * b + 2 * a >= 21 && 5 * b + 2 * a <= 24), L = 5 * b + 2 * a, H = 80000 * b + 34000 * a;
  assert.ok(sah.some((k) => k.a === a && k.b === b && k.c === 0 && k.H === H));
  ada(b13, `<tr${b === 3 ? ' class="jml"' : ""}><td class="n">${b}</td><td class="n">${a}</td><td class="n">${L} liter</td><td class="n">${rp(H)}</td></tr>`, `daftar b=${b}`);
}
const pakai10 = Math.min(...sah.filter((k) => k.c > 0).map((k) => k.H));
assert.equal(pakai10, 347000);
ada(b13, `paling murah ${rp(pakai10)}`, "dengan 10 L");
const hemat5 = kombi((k) => k.a === 0 && k.c === 0).map((k) => k.L);
assert.ok(!hemat5.some((L) => L >= 21 && L <= 24));                              // kemasan 5 L saja: 20 atau 25
ada(b13, "Empat kemasan 5 liter baru 20 liter, sedangkan lima kemasan sudah 25 liter", "paling hemat saja");
const besar = sah.find((k) => k.c === 2);
assert.deepEqual([besar.a, besar.b, besar.L, besar.H], [1, 0, 22, 364000]);
ada(b13, `dua kemasan 10 liter ditambah satu kemasan 2 liter: 22 liter seharga ${rp(364000)}`, "paket besar");
assert.equal(sah.findIndex((k) => k === besar), 5);
ada(b13, "urutan keenam dari yang termurah", "peringkat paket besar");
// terbanyak dengan anggaran Rp250.000
const atas = 250000 / 16000;
assert.equal(atas, 15.625);
const maks = Math.max(...kombi((k) => k.H <= 250000).map((k) => k.L));
assert.equal(maks, Math.floor(atas));
ada(b13, `${rp(250000)} : ${rp(16000)} = ${des(atas)}`, "batas atas");
ada(b13, `tiga kemasan 5 liter seharga ${rp(240000)}`, "terbanyak");
assert.equal(3 * 80000, 240000);
// membaca data: dua angkatan
const ang = [{ p: 40, l: 30 }, { p: 50, l: 35 }];
const pr = ang.map((a) => (a.l / a.p) * 100);
assert.deepEqual(pr, [75, 70]);
for (const [i, a] of ang.entries()) ada(b13, `<td class="n">${a.p}</td><td class="n">${a.l}</td><td class="n">${pr[i]}%</td>`, `angkatan ${i + 1}`);
ada(b13, "35 lebih dari 30", "jumlah lulus");
ada(b13, "70% kurang dari 75%", "persen lulus");
// lulusan perempuan tidak ada di tabel: dua keadaan sah dengan urutan berbeda
const bisa = rentang(0, 30).flatMap((x) => rentang(0, 35).map((y) => Math.sign(y - x)));
assert.deepEqual(unik(bisa).sort(), [-1, 0, 1]);
ada(b13, "10 dan 20, atau 20 dan 10", "dua keadaan perempuan");

console.log(`cek_bab11_13: semua assert lulus · ${n} angka/status dicek di src · 2 gambar Bab 12 = hasil script`);
