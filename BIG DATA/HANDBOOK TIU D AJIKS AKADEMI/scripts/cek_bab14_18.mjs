// Handbook TIU · Bab 14–18 (figural) · gabungan perubahan, periode, sisa pembagian, jam di cermin, dan angka narasi
// dihitung di sini lalu dicek muncul persis di src. Judul bab, slot (ID, target), dan pita dicek
// terhadap T4-22 + T6-5. Bukan pembuat soal: tidak ada soal, gambar soal, opsi, atau kunci di berkas ini,
// dan generator figural k12-spatial-engine tidak dipanggil. Bagan urutan keliling Bab 14 dibangkitkan di sini.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/cek_bab14_18.mjs   (--svg mencetak bagan Bab 14)
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const baca = (n) => (existsSync(join(AKAR, `src/${n}.html`)) ? readFileSync(join(AKAR, `src/${n}.html`), "utf8") : "");
const [b14, b15, b16, b17, b18] = ["24_bab14", "25_bab15", "26_bab16", "27_bab17", "28_bab18"].map(baca);
const b01 = baca("11_bab01");
const CETAK = process.argv.includes("--svg");
let n = 0;
const ada = (html, s, ket) => { if (CETAK) return; n++; assert.ok(html.includes(s), `tidak ditemukan di src: "${s}" (${ket})`); };

// ════════ GERAK KOTAK: matriks 2 × 2 pada koordinat (x ke kanan, y ke atas) ════════
// "A lalu B" = B·A. Putar 90° searah jarum jam: (x, y) → (y, −x).
const G = {
  tetap: [1, 0, 0, 1], r90: [0, 1, -1, 0], r180: [-1, 0, 0, -1], r270: [0, -1, 1, 0],
  kk: [-1, 0, 0, 1], ab: [1, 0, 0, -1], m1: [0, 1, 1, 0], m2: [0, -1, -1, 0],
};
const NAMA = {
  tetap: "tidak diputar", r90: "diputar 90° searah jarum jam", r180: "diputar 180°", r270: "diputar 90° berlawanan arah jarum jam",
  kk: "cermin kiri-kanan", ab: "cermin atas-bawah", m1: "cermin garis miring /", m2: "cermin garis miring \\",
};
const kali = ([a, b, c, d], [e, f, g, h]) => [a * e + b * g, a * f + b * h, c * e + d * g, c * f + d * h];
const lalu = (...k) => k.reduce((m, x) => kali(G[x], m), G.tetap);           // dikerjakan urut kiri ke kanan
const nama = (m) => Object.keys(G).find((k) => G[k].join() === m.join());
const det = ([a, b, c, d]) => a * d - b * c;
const CERMIN = ["kk", "ab", "m1", "m2"];
// delapan gerak tertutup: setiap gabungan dua gerak jatuh ke salah satu dari delapan
for (const x in G) for (const y in G) assert.ok(nama(lalu(x, y)), `gabungan ${x} lalu ${y} di luar delapan gerak`);
// aturan banyak cermin: genap → putaran (det +1), ganjil → cermin (det −1), diuji untuk semua rangkaian ≤ 3 langkah
const semua = Object.keys(G);
for (const a of semua) for (const b of semua) for (const c of semua) {
  const k = [a, b, c].filter((x) => CERMIN.includes(x)).length;
  assert.equal(CERMIN.includes(nama(lalu(a, b, c))), k % 2 === 1);
}
CERMIN.forEach((x) => assert.equal(det(G[x]), -1));
// penanda di atas (0, 1): ke mana ia berpindah; urutan keliling tetap/terbalik = tanda det
const arah = ([x, y]) => ({ "0,1": "atas", "1,0": "kanan", "0,-1": "bawah", "-1,0": "kiri" })[`${x},${y}`];
const pindah = ([a, b, c, d]) => arah([b, d]);
for (const k of semua) {
  const baris = `<tr><td>${NAMA[k]}</td><td>${pindah(G[k])}</td><td>${det(G[k]) > 0 ? "tetap" : "terbalik"}</td></tr>`;
  ada(b14, baris, `tabel delapan gerak ${k}`);
}
assert.equal(pindah(G.r90), pindah(G.m1));                                   // satu penanda tidak membedakan
assert.equal(pindah(G.r270), pindah(G.m2));
// tabel gabungan Bab 14
const GAB = [
  [["r90", "r90", "r90"], "diputar 90° searah jarum jam tiga kali", "r270"],
  [["kk", "ab"], "cermin kiri-kanan lalu cermin atas-bawah", "r180"],
  [["kk", "m1"], "cermin kiri-kanan lalu cermin garis miring /", "r90"],
  [["kk", "r90"], "cermin kiri-kanan lalu diputar 90° searah jarum jam", "m1"],
  [["r90", "kk"], "diputar 90° searah jarum jam lalu cermin kiri-kanan", "m2"],
];
for (const [k, teks, hasil] of GAB) {
  assert.equal(nama(lalu(...k)), hasil);
  const c = k.filter((x) => CERMIN.includes(x)).length;
  ada(b14, `<tr><td>${teks}</td><td class="n">${c}</td><td>${NAMA[hasil]}</td></tr>`, `gabungan ${k}`);
}
assert.notEqual(nama(lalu("kk", "r90")), nama(lalu("r90", "kk")));          // urutan berpengaruh bila ada cermin
for (const x of ["r90", "r180", "r270"]) for (const y of ["r90", "r180", "r270"]) assert.equal(nama(lalu(x, y)), nama(lalu(y, x)));
// pembatal: r90 ↔ r270, sisanya dirinya sendiri; dua langkah dibatalkan dari belakang
const batal = (x) => semua.find((y) => nama(lalu(x, y)) === "tetap");
assert.equal(batal("r90"), "r270");
for (const x of ["r180", ...CERMIN]) assert.equal(batal(x), x);
assert.equal(nama(lalu("ab", "r90", "r270", "ab")), "tetap");
assert.notEqual(nama(lalu("ab", "r90", "ab", "r270")), "tetap");             // urutan pembatal tidak boleh dibalik
ada(b14, "dikembalikan dengan memutarnya 90° berlawanan arah jarum jam, baru kemudian mencerminnya atas-bawah", "pembatal dua langkah");
// bentuk simetris kiri-kanan: cermin atas-bawah tampak sama dengan putar 180°
assert.equal(nama(lalu("kk", "ab")), "r180");
ada(b14, "cermin atas-bawah menghasilkan tampilan yang sama dengan putaran 180°", "simetris");
// putaran 45°
assert.equal(8 * 45, 360); assert.equal(2 * 45, 90);
ada(b14, "8 × 45° = 360°", "45 derajat");
// ════════ JAM DI CERMIN (cermin kiri-kanan): sudut θ → 360° − θ, waktu t → 12 jam − t ════════
const jam = (h, m) => { const T = (720 - (60 * h + m)) % 720; const hh = Math.floor(T / 60) || 12; return [hh, T % 60]; };
const pad = (x) => String(x).padStart(2, "0");
const JAM = [[3, 0], [2, 20], [4, 15], [10, 50], [11, 35], [6, 0]];
for (const [h, m] of JAM) {
  // bukti sudut: jarum menit 6m dan jarum jam 30h + m/2 dicerminkan menjadi 360 − sudut, dan cocok dengan waktu bayangan
  const [h2, m2] = jam(h, m);
  assert.equal((360 - 6 * m) % 360, (6 * m2) % 360);
  assert.equal((360 - (30 * (h % 12) + m / 2)) % 360, (30 * (h2 % 12) + m2 / 2) % 360);
  ada(b14, `<tr><td>${pad(h)}.${pad(m)}</td><td>${pad(h2)}.${pad(m2)}</td></tr>`, `jam ${h}.${m}`);
}
ada(b14, "12.00 − 11.35 = 00.25", "jam lewat tengah");

// ════════ BAB 15 · PERIODE ════════
const periode = (m) => { let p = G.tetap, k = 0; do { p = kali(m, p); k++; } while (p.join() !== G.tetap.join()); return k; };
assert.equal(periode(G.r90), 4); assert.equal(periode(G.r270), 4); assert.equal(periode(G.r180), 2);
CERMIN.forEach((x) => assert.equal(periode(G[x]), 2));
const gilir = (k) => { let p = [...Array(k).keys()], i = 0; do { p = p.map((x) => (x + 1) % k); i++; } while (p.some((x, j) => x !== j)); return i; };
assert.equal(gilir(3), 3); assert.equal(gilir(4), 4);
for (const [teks, p] of [["diputar 90° (searah atau berlawanan)", 4], ["diputar 180°", 2], ["dicermin pada garis apa pun", 2], ["dibalik warnanya", 2], ["tiga objek bergilir di tiga tempat", 3], ["empat objek bergilir di empat kotak", 4]])
  ada(b15, `<tr><td>${teks}</td><td class="n">${p}</td>`, `periode ${teks}`);
// gambar ke-10, putar 90° searah tiap langkah
assert.equal((10 - 1) % 4, 1);
ada(b15, "Gambar ke-10 memerlukan 9 langkah, dan 9 dibagi 4 bersisa 1", "gambar ke-10");
assert.deepEqual([1, 5, 9].map((g) => (g - 1) % 4), [0, 0, 0]);
ada(b15, "Gambar ke-1, ke-5, dan ke-9 sama persis", "sisa nol");
// dua kelompok: periode 4 dan 3
const fpb = (a, b) => (b ? fpb(b, a % b) : a), kpk = (a, b) => (a * b) / fpb(a, b);
assert.equal(kpk(4, 3), 12);
const st = (g) => [(g - 1) % 4, (g - 1) % 3];
for (const g of [1, 2, 3, 4, 5]) ada(b15, `<tr${g === 5 ? ' class="jml"' : ""}><td class="n">${g}</td><td class="n">${st(g)[0]}</td><td class="n">${st(g)[1]}</td></tr>`, `dua kelompok g${g}`);
assert.ok([1, 2, 3, 4].every((g) => st(g).join() !== st(5).join()));        // gambar 5 tidak sama dengan gambar terlihat
assert.equal(st(13).join(), st(1).join());
assert.ok([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((g) => st(g).join() !== st(1).join()));
ada(b15, "KPK dari 4 dan 3, yaitu 12 langkah", "kpk");
ada(b15, "Gambar ke-13 adalah gambar pertama kembali", "gambar 13");
// selang tiga: gambar 6 dari gambar 3
assert.equal(6 - 3, 3);
// "?" di gambar 4: maju dari gambar 3 (putar 90° searah) = mundur dari gambar 5 (putar 90° berlawanan)
const keadaan = (g) => (g - 1) % 4;
assert.equal((keadaan(3) + 1) % 4, keadaan(4)); assert.equal((keadaan(5) + 3) % 4, keadaan(4));
// tabel periksa: objek 1 hanya menggugurkan B; setelah dua objek tersisa tiga pilihan
const PERIKSA = { A: [1, 1, 0], B: [0, 1, 0], C: [1, 1, 1], D: [1, 0, 1], E: [1, 1, 0] };
const lolos = (k) => Object.keys(PERIKSA).filter((h) => PERIKSA[h].slice(0, k).every(Boolean));
assert.deepEqual(lolos(1), ["A", "C", "D", "E"]); assert.deepEqual(lolos(2), ["A", "C", "E"]); assert.deepEqual(lolos(3), ["C"]);
assert.equal(Object.values(PERIKSA).filter((o) => !o[2]).length, 3);
for (const [h, o] of Object.entries(PERIKSA))
  ada(b15, `<tr><td><b>${h}</b></td>${o.map((v) => `<td>${v ? "ya" : "×"}</td>`).join("")}<td>${o.every(Boolean) ? "bertahan" : "gugur"}</td></tr>`, `tabel periksa ${h}`);
ada(b15, "masih tersisa tiga pilihan", "berhenti dua objek");

// ════════ BAB 16 · TAMBAH ATAU KALI (tafsir sama dengan generator tiu-fig-ubah.ts) ════════
const tafsir = (a, b, x) => { const o = new Set([x + b - a]); if (b % a === 0 && b !== a) o.add((x * b) / a); return [...o].sort((p, q) => p - q); };
assert.deepEqual(tafsir(2, 4, 3), [5, 6]);
assert.deepEqual(tafsir(2, 4, 2), [4]);
ada(b16, "bacaan pertama memberi 5 dan bacaan kedua memberi 6", "dua bacaan");
// putaran 90° searah dibatalkan putaran 90° berlawanan; bentuk simetris atas-bawah: cermin kiri-kanan = putar 180°
assert.equal(nama(lalu("ab", "kk")), "r180");
ada(b16, "memutar (4) 90° berlawanan arah jarum jam", "pembatal analogi");

// ════════ BAB 17 · HUBUNGAN DUA JUMLAH ════════
const DAUN = { A: [3, 5], B: [1, 3], C: [4, 6], D: [2, 5], E: [5, 7] };
const sel = Object.fromEntries(Object.entries(DAUN).map(([h, [d, b]]) => [h, b - d]));
assert.deepEqual(Object.keys(sel).filter((h) => sel[h] !== 2), ["D"]);
assert.equal(new Set(Object.values(DAUN).map((x) => x[0])).size, 5);       // banyak daun berbeda semua
const bintik = Object.values(DAUN).map((x) => x[1]);
assert.ok(bintik.filter((x) => x === 5).length === 2);                       // banyak bintik tidak menunjuk satu gambar
for (const [h, [d, b]] of Object.entries(DAUN)) ada(b17, `<tr${h === "D" ? ' class="jml"' : ""}><td><b>${h}</b></td><td class="n">${d}</td><td class="n">${b}</td><td class="n">${b - d}</td></tr>`, `daun ${h}`);
ada(b17, `banyaknya ${bintik.join(", ").replace(/, (\d+)$/, ", dan $1")}`, "bintik saja");

// ════════ BAB 18 · MATRIKS ════════
const M = [[1, 3, 5], [2, 4, 6], [3, 5, null]];
const lewatBaris = M[2][1] + (M[0][2] - M[0][1]), lewatKolom = M[1][2] + (M[1][2] - M[0][2]);
assert.equal(lewatBaris, 7); assert.equal(lewatKolom, 7);
ada(b18, "<tr><td><b>Baris 3</b></td><td class=\"n\">3</td><td class=\"n\">5</td><td class=\"n\">?</td></tr>", "matriks hitung");
ada(b18, "5 + 2 = 7", "jalan baris"); ada(b18, "6 + 1 = 7", "jalan kolom");
assert.equal(nama(lalu("r90", "kk")), "m2");
ada(b18, "Gerak gabungannya cermin garis miring \\", "gerak gabungan matriks");
assert.equal(nama(lalu("r90", "r90")), "r180");
// gabung (ada di salah satu) vs buang yang sama (ada di tepat satu) = gabungan warna
const GB = [[1, 1], [1, 0], [0, 1], [0, 0]];
const kata = (v) => (v ? "ada" : "tidak ada"), w = (v) => (v ? "hitam" : "putih");
for (const [p, q] of GB) {
  ada(b18, `<tr><td>${kata(p)}</td><td>${kata(q)}</td><td>${kata(p || q)}</td><td>${kata(p !== q)}</td></tr>`, `gabung ${p}${q}`);
}
assert.deepEqual(GB.map(([p, q]) => w(p !== q)), ["putih", "hitam", "hitam", "putih"]);   // gabungan warna = buang yang sama
ada(b18, "hitam dengan hitam menjadi putih, hitam dengan putih menjadi hitam, dan putih dengan putih tetap putih", "gabungan warna");
// persegi latin
const L = [["daun", "bulan", "bintang"], ["bulan", "bintang", "daun"], ["bintang", "daun", null]];
const isi = ["daun", "bulan", "bintang"].find((x) => !L[2].includes(x));
assert.equal(isi, "bulan");
L[2][2] = isi;
assert.ok(L.every((r) => new Set(r).size === 3) && [0, 1, 2].every((j) => new Set(L.map((r) => r[j])).size === 3));

// ════════ BAGAN URUTAN KELILING BAB 14 (tiga panel) ════════
// titik pada sudut θ (dari atas, searah jarum jam); gerak dikenakan pada vektor (sin θ, cos θ) lalu digambar
const r1 = (x) => Math.round(x * 10) / 10;
const TITIK = [0, 115, 235], BUSUR = [20, 250];
const kena = (m, th) => { const v = [Math.sin((th * Math.PI) / 180), Math.cos((th * Math.PI) / 180)]; return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]]; };
const layar = ([x, y], R) => [r1(50 + R * x), r1(48 - R * y)];
const orient = (m) => { const [p, q, r] = TITIK.map((t) => kena(m, t)); return Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); };
assert.equal(orient(G.tetap), -1);                                            // 1 → 2 → 3 searah jarum jam
assert.equal(orient(G.r90), orient(G.tetap));                                 // putar: urutan tetap
assert.equal(orient(G.kk), -orient(G.tetap));                                 // cermin: urutan terbalik
for (const k of semua) assert.equal(orient(G[k]), orient(G.tetap) * det(G[k]));
const panel = (k, label) => {
  const m = G[k], [a, b] = BUSUR.map((t) => layar(kena(m, t), 15)), sapu = det(m) > 0 ? 1 : 0, id = `ujung14${k}`;
  const titik = TITIK.map((t, i) => { const [x, y] = layar(kena(m, t), 31); return `<circle class="k${i ? "" : " t"}" cx="${x}" cy="${y}" r="8.5"/><text x="${x}" y="${r1(y + 3.4)}">${i + 1}</text>`; }).join("");
  return `<svg viewBox="0 0 100 96" role="img" aria-label="${label}"><defs><marker id="${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z"/></marker></defs>`
    + `<circle class="meja" cx="50" cy="48" r="41"/><path class="pn ka" marker-end="url(#${id})" d="M${a[0]} ${a[1]}A15 15 0 1 ${sapu} ${b[0]} ${b[1]}"/>${titik}</svg>`;
};
const SVG = [
  panel("tetap", "Gambar asal: titik 1, 2, 3 berurutan searah jarum jam"),
  panel("r90", "Diputar 90° searah jarum jam: titik 1, 2, 3 tetap berurutan searah jarum jam"),
  panel("kk", "Dicermin kiri-kanan: titik 1, 2, 3 berurutan berlawanan arah jarum jam"),
];
if (CETAK) { console.log(SVG.join("\n")); process.exit(0); }
SVG.forEach((s, i) => ada(b14, s, `bagan urutan keliling ${i + 1}`));

// ════════ JUDUL, SLOT, PITA (T4-22 + T6-5: 2 contoh per bab, pembuka dan latihan ditiadakan; gambar penjelas tetap) ════════
// Slot = tempat kosong (gambar penjelas) atau soal terisi (<div data-soal>, scripts/soal_figural.mjs), urut muncul.
const RENCANA = {
  14: [b14, "Perubahan Gambar", { I01: 0, I05: 0, I06: 0, I07: 0, I08: 0, I09: 0, C01: 45, C02: 60 }, 45],
  15: [b15, "Seri Gambar", { I01: 0, C01: 40, C02: 55 }, 40],
  16: [b16, "Analogi Gambar", { C01: 45, C02: 70 }, 45],
  17: [b17, "Gambar Berbeda", { C01: 45, C02: 55 }, 45],
  18: [b18, "Matriks", { I01: 0, I02: 0, C01: 60, C02: 45 }, 60],
};
let slotTotal = 0;
for (const [bab, [html, judul, slot, pita]] of Object.entries(RENCANA)) {
  assert.ok(html, `src Bab ${bab} belum ada`);
  assert.equal((html.match(/<h2>([^<]*)<\/h2>/g) || []).join(), `<h2>${judul}</h2>`, `judul Bab ${bab}`);
  assert.ok(html.includes(`<section class="bab fig" data-bab="${bab}">`) && html.includes(`<div class="no">${bab}</div>`), `kepala Bab ${bab}`);
  const s = [...html.matchAll(/<div (?:class="slot" )?data-s(?:lot|oal)="([^"]+)"(?: data-target="(\d+)")?>/g)].map((m) => [m[1], m[2] ? +m[2] : 0]);
  assert.deepEqual(s.map((x) => x[0]), Object.keys(slot).map((k) => `HB-TIU-B${bab}-${k}`), `urutan/ID slot Bab ${bab}`);
  for (const [id, t] of s) {
    assert.equal(t, slot[id.slice(-3)], `target ${id}`);
    if (id.includes("-I")) assert.ok(!t, `${id}: gambar penjelas tanpa target`);
    else assert.ok(Number.isInteger(t) && t >= 25 && t <= 70 && t % 5 === 0, `${id}: target tidak sah`);
  }
  const tg = s.map((x) => x[1]).filter(Boolean), hit = new Map();
  tg.forEach((t) => hit.set(t, (hit.get(t) || 0) + 1));
  const modus = [...hit].reduce((a, b) => (b[1] > a[1] ? b : a))[0];           // seri: yang lebih dulu muncul (sama dengan build.py)
  assert.equal(modus, pita, `pita Bab ${bab}`);
  assert.ok(html.includes("{{TARGET}}") && !html.includes("{{WAKTU_LATIHAN}}"), `penanda pita Bab ${bab}`);
  assert.ok(!/<h3>Latihan<\/h3>|pertanyaan pembuka|-P01"|-L0\d"|-C03"/i.test(html), `sisa pembuka/latihan/contoh 3 di Bab ${bab} (T6-5)`);
  assert.ok(!/satu-satunya/i.test(html), `"satu-satunya" di Bab ${bab}`);
  slotTotal += s.length;
}
// T2-2: tingkat 2 (satu aturan) hanya di contoh pertama
const tingkat = (html, id) => +(html.match(new RegExp(`data-s(?:lot|oal)="${id}"[\\s\\S]*?tingkat (\\d)`)) || [])[1];
for (const [bab, [html, , slot]] of Object.entries(RENCANA)) {
  for (const k of Object.keys(slot).filter((k) => !k.startsWith("I"))) {
    const t = tingkat(html, `HB-TIU-B${bab}-${k}`);
    assert.ok([1, 2, 3].includes(t), `tingkat ${bab}-${k} tidak tertulis di catatan pengajar`);
    if (t < 3) assert.equal(k, "C01", `${bab}-${k}: satu aturan di luar contoh pertama`);
  }
}
// tabel bab di Bab 1 memakai nama bab gambar yang sama dengan judul
ada(b01, "perubahan gambar, seri gambar, analogi gambar, gambar berbeda, matriks", "tabel Bab 1");

console.log(`cek_bab14_18: semua assert lulus · ${n} angka/status dicek di src · ${slotTotal} slot (10 contoh + 9 gambar penjelas) · bagan Bab 14 = hasil script`);
