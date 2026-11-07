import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Fig, type Prim, type Pt, draw, r1, sig, tf } from "./figural-lib";
import { BENTUK, T_ALL, ap, geser, kiral, kotak, muat, siluet, tinta } from "./tiu-bentuk";
import { balikWarna, goresan, lengkung } from "./tiu-gaya";

const [folder, nama] = process.argv.slice(2);
assert.ok(folder && nama, "Pemakaian: node --import tsx src/tiu-ilustrasi.ts <folder-keluaran> <nama-bentuk>");
assert.equal(T_ALL.length, 8, "T_ALL harus berisi tepat 8 gerak");
assert.equal(new Set(T_ALL).size, 8, "T_ALL memuat kode gerak kembar");

function delapan(namaBentuk: string) {
  const sumber = BENTUK[namaBentuk];
  assert.ok(sumber, `bentuk ${namaBentuk} tidak ditemukan di BENTUK`);
  assert.ok(kiral(sumber), `bentuk ${namaBentuk} tidak kiral`);
  // Muat sekali: ukuran dan pusat tetap sama untuk seluruh putaran/cermin.
  const bentuk = muat(sumber, [0, 0], 96);
  assert.ok(kiral(bentuk), `bentuk ${namaBentuk} tidak kiral setelah dimuat`);
  const gerak = T_ALL.map((t) => ap(t, bentuk));
  assert.equal(new Set(gerak.map(sig)).size, 8, `bentuk ${namaBentuk}: kedelapan gambar tidak berbeda`);
  return gerak;
}

const svg = (lebar: number, tinggi: number, isi: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lebar} ${tinggi}">${isi}</svg>\n`;

const gambar = delapan(nama);
const namaLembar = ["rajawali", "sayapbulu", "obor", "bolakisi"];
// Periksa seluruh bentuk sebelum menulis keluaran apa pun.
const baris = namaLembar.map((n) => ({ nama: n, gerak: n === nama ? gambar : delapan(n) }));

const NAVY = "#0c2350", EMAS = "#f2b705";
const poly = (pts: Pt[]): Prim => ({ k: "poly", pts, fill: "b" });
const bingkai = (w = 120, h = 120) =>
  `<rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="6" fill="none" stroke="${NAVY}" stroke-width="1.6"/>`;
const hitam = (f: Fig, x = 60, y = 60) => siluet(draw(f, x, y));
const garis = ([x1, y1]: Pt, [x2, y2]: Pt, w = 1.6) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${NAVY}" stroke-width="${w}" stroke-linecap="round"/>`;
const panah = garis([113, 60], [130, 60], 2.4) +
  `<path d="M126 54L134 60L126 66Z" fill="${NAVY}"/>`;
const baru = new Map<string, string>();
const simpan = (n: string, w: number, h: number, isi: string) => baru.set(`${n}.svg`, svg(w, h, isi));
const diDalam = (f: Fig, w: number, h: number, margin = 2) => {
  const [x0, y0, x1, y1] = kotak(f);
  assert.ok(x0 >= margin && y0 >= margin && x1 <= w - margin && y1 <= h - margin, "bentuk keluar bingkai/viewBox");
};
// Urutan lintasan tidak memengaruhi kesamaan titik setelah pembulatan.
const titikSama = (f: Fig) => f.map((p) => {
  assert.equal(p.k, "poly");
  return p.k === "poly" ? p.pts.map(([x, y]) => `${r1(x)},${r1(y)}`).sort().join(";") : "";
}).sort().join("|");

// Bentuk lokal handbook; tidak dimasukkan ke BENTUK.
const bilah: Fig = [poly(lengkung([[0, -42], [23, -23], [29, 0], [18, 23],
  [0, 31], [-18, 23], [-29, 0], [-23, -23]]))];
const daun = muat([...bilah, poly(goresan([[0, 26], [0, 38], [0, 43]], [7, 7, 7]))], [0, 0], 96);
const bulan: Fig = [poly(lengkung([[15, -40], [-14, -40], [-35, -19], [-35, 17],
  [-14, 39], [15, 39], [0, 24], [-7, 0], [0, -25]]))];
const sudut: Pt[] = Array.from({ length: 10 }, (_, i) => {
  const a = (-90 + i * 36) * Math.PI / 180, r = i % 2 ? 23 : 44;
  return [r * Math.cos(a), r * Math.sin(a)];
});
// Dua titik dekat setiap sudut menjaga ujung bintang sedikit tumpul.
const bintang: Fig = [poly(lengkung(sudut.flatMap((p, i): Pt[] =>
  [sudut[(i + 9) % 10], sudut[(i + 1) % 10]].map((q): Pt =>
    [p[0] * 0.9 + q[0] * 0.1, p[1] * 0.9 + q[1] * 0.1])), 4))];
assert.equal(titikSama(ap("mkk", daun)), titikSama(daun), "daun harus simetris kiri-kanan");
assert.equal(titikSama(ap("mab", daun)), titikSama(ap("r180", daun)), "cermin atas-bawah daun = putar 180°");
for (const [n, f] of [["asal", daun], ["mab", ap("mab", daun)], ["r180", ap("r180", daun)]] as const) {
  diDalam(geser(f, [60, 60]), 120, 120);
  simpan(`B14-I05-daun-${n}`, 120, 120, hitam(f));
}

const rajawali = BENTUK.rajawali, namaTanduk = "tanduk5-1";
const tanduk = BENTUK[namaTanduk], namaHelai = ["helai3-1", "helai5-1"];
const helai = namaHelai.map((n) => BENTUK[n]);
assert.ok([rajawali, tanduk, ...helai].every(kiral), "rajawali, tanduk dan helai wajib kiral");
const balik = balikWarna(muat(rajawali, [0, 0], 96));
assert.ok(balik.some((p) => p.k !== "line" && p.fill === "w"), "balik warna harus berisi putih bergaris");
simpan("B14-I06-balik", 120, 120, draw(balik, 60, 60));

const rajawaliPolos = rajawali.filter((p) => p.k === "line" || p.fill !== "u");
const tandukPolos = tanduk.filter((p) => p.k === "line" || p.fill !== "u");
const A = muat(rajawaliPolos, [0, 0], 74), B = muat(tandukPolos, [0, 0], 74);
const asal = [...geser(A, [-50, 0]), ...geser(B, [50, 0])];
const pasangan: [string, Fig][] = [
  ["asal", asal], ["tukar", [...geser(B, [-50, 0]), ...geser(A, [50, 0])]],
  ["seluruh", ap("mkk", asal)],
  ["tiap", [...geser(ap("mkk", A), [-50, 0]), ...geser(ap("mkk", B), [50, 0])]],
];
assert.equal(new Set(pasangan.map(([, f]) => titikSama(f))).size, 4, "empat susunan harus berbeda");
assert.ok(kotak(geser(A, [-50, 0]))[2] < kotak(geser(B, [50, 0]))[0], "dua objek harus terpisah");
pasangan.forEach(([n, f]) => {
  diDalam(geser(f, [100, 60]), 200, 120, 5);
  simpan(`B14-I07-${n}`, 200, 120, bingkai(200) + hitam(f, 100, 60));
});

// Helai berasal dari satu seed; n menyatakan tepat 3 atau 5 cuping.
const bagian = helai.map((f) => muat(f, [0, 0], 90));
simpan("B14-I08-bagian", 240, 120, hitam(bagian[0], 56) + panah + hitam(bagian[1], 184));
const kecilA = muat(rajawaliPolos, [0, 0], 44), kecilB = muat(tandukPolos, [0, 0], 44);
const gabungA = muat(rajawaliPolos, [-21, 0], 62), gabungB = muat(tandukPolos, [23, 0], 62);
const [ax0, , ax1] = kotak(gabungA), [bx0, , bx1] = kotak(gabungB);
const tumpang = (Math.min(ax1, bx1) - Math.max(ax0, bx0)) / Math.min(ax1 - ax0, bx1 - bx0);
assert.ok(tumpang >= 0.2 && tumpang <= 0.3, "tumpang tindih harus sekitar seperempat lebar");
const tintaA = tinta(gabungA), tintaB = tinta(gabungB);
assert.ok([...tintaA].some((p) => tintaB.has(p)), "gabungan harus bertindih nyata");
const tambah = garis([53, 60], [61, 60], 2.4) + garis([57, 56], [57, 64], 2.4);
simpan("B14-I08-gabung", 240, 120, hitam(kecilA, 26) + tambah + hitam(kecilB, 86) + panah + hitam([...gabungA, ...gabungB], 184));
const ukuran = [56, 96];
const besar = ukuran.map((s) => muat(rajawaliPolos, [0, 0], s));
const sisi = besar.map((f) => { const [x0, y0, x1, y1] = kotak(f); return Math.max(x1 - x0, y1 - y0); });
assert.ok(sisi[1] / sisi[0] >= 1.35, "beda skala harus sedikitnya 35%");
simpan("B14-I08-besar", 240, 120, hitam(besar[0], 56) + panah + hitam(besar[1], 184));
for (const [f, x] of [[bagian[0], 56], [bagian[1], 184], [kecilA, 26], [kecilB, 86],
  [gabungA, 184], [gabungB, 184], [besar[0], 56], [besar[1], 184]] as [Fig, number][]) diDalam(geser(f, [x, 60]), 240, 120);

for (const deg of [0, 45, 90]) {
  const f = tf(muat(rajawali, [0, 0], 78), deg);
  diDalam(geser(f, [60, 60]), 120, 120);
  simpan(`B14-I09-${deg}`, 120, 120, hitam(f));
}

const bentuk = { daun, bulan, bintang };
type Bentuk = keyof typeof bentuk;
const kisi: (Bentuk | null)[][] = [["daun", "bulan", "bintang"], ["bulan", "bintang", "daun"], ["bintang", "daun", null]];
const unik = (xs: (Bentuk | null)[]) => {
  const ada = xs.filter((x) => x !== null);
  assert.equal(new Set(ada).size, ada.length, "baris/kolom memuat bentuk kembar");
};
kisi.forEach(unik);
for (let c = 0; c < 3; c++) unik(kisi.map((row) => row[c]));
assert.equal(kisi.flat().filter((x) => x === null).length, 1, "hanya satu sel kosong");
const sisa = Object.keys(bentuk).filter((n) => !kisi[2].includes(n as Bentuk) && !kisi.map((r) => r[2]).includes(n as Bentuk));
assert.deepEqual(sisa, ["bulan"], "sisa baris dan kolom harus bulan");
let isiKisi = bingkai(300, 300);
for (const p of [100, 200]) isiKisi += garis([p, 3], [p, 297]) + garis([3, p], [297, p]);
kisi.forEach((row, r) => row.forEach((n, c) => {
  const x = c * 100 + 50, y = r * 100 + 50;
  if (n) {
    const f = muat(bentuk[n], [x, y], 72);
    diDalam(geser(f, [-c * 100, -r * 100]), 100, 100, 8);
    isiKisi += hitam(f, 0, 0);
  } else isiKisi += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="bold" fill="${NAVY}">?</text>`;
}));
simpan("B18-I01", 300, 300, isiKisi);

// Dua busur parabola bertemu di ujung lancip; panjang 92, lebar sepertiganya.
const bersih: Fig = [poly([1, -1].flatMap((sisi) => Array.from({ length: 33 }, (_, i): Pt => {
  const t = sisi * (i / 16 - 1);
  return [r1(sisi * 92 / 6 * (1 - t * t)), r1(46 * t)];
})))];
const miringA = tf(bersih, 45), miringB = tf(bersih, -45);
assert.notEqual(sig(miringA), sig(miringB), "daun a dan b harus berbeda");
const tA = tinta(miringA), tB = tinta(miringB);
assert.ok(tA.has("1,1") && tB.has("1,1"), "kedua daun harus berpotongan di pusat");
assert.ok([...tA].some((p) => !tB.has(p)) && [...tB].some((p) => !tA.has(p)), "kedua daun harus tetap terlihat");
const pathDaun = [...miringA, ...miringB].map((p) => {
  assert.equal(p.k, "poly");
  return p.k === "poly" ? `M${p.pts.map(([x, y]) => `${r1(x + 60)},${r1(y + 60)}`).join("L")}Z` : "";
}).join("");
for (const f of [miringA, miringB]) diDalam(geser(f, [60, 60]), 120, 120, 5);
simpan("B18-I02-a", 120, 120, bingkai() + hitam(miringA));
simpan("B18-I02-b", 120, 120, bingkai() + hitam(miringB));
simpan("B18-I02-gabung", 120, 120, bingkai() + hitam([...miringA, ...miringB]));
simpan("B18-I02-warna", 120, 120, bingkai() + `<path d="${pathDaun}" fill="#111" fill-rule="evenodd"/>`);

// Enam titik pada lingkaran: cari konfigurasi deterministik tanpa perpotongan rapat.
const ruas: [number, number][] = [];
for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) ruas.push([i, j]);
assert.equal(ruas.length, 15);
const silang = (a: Pt, b: Pt) => a[0] * b[1] - a[1] * b[0];
const kurang = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
function perpotongan(titik: Pt[]) {
  const hasil: { p: Pt; ruas: [number, number] }[] = [];
  ruas.forEach(([a, b], i) => ruas.slice(i + 1).forEach(([c, d], j) => {
    if ([a, b].includes(c) || [a, b].includes(d)) return;
    const u = kurang(titik[b], titik[a]), v = kurang(titik[d], titik[c]);
    const den = silang(u, v);
    if (Math.abs(den) < 1e-9) return;
    const delta = kurang(titik[c], titik[a]), t = silang(delta, v) / den, s = silang(delta, u) / den;
    if (t <= 0 || t >= 1 || s <= 0 || s >= 1) return;
    hasil.push({ p: [titik[a][0] + t * u[0], titik[a][1] + t * u[1]], ruas: [i, i + 1 + j] });
  }));
  return hasil;
}
let seed = 271828;
const acak = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
let titik: Pt[] = [], potong: ReturnType<typeof perpotongan> = [], jarak = 0;
for (let coba = 0; coba < 10000; coba++) {
  titik = Array.from({ length: 6 }, (_, i): Pt => {
    const a = (-90 + i * 60 + (acak() - 0.5) * 42) * Math.PI / 180;
    return [+(120 + 100 * Math.cos(a)).toFixed(6), +(120 + 100 * Math.sin(a)).toFixed(6)];
  });
  potong = perpotongan(titik);
  jarak = Math.min(...potong.flatMap(({ p }, i) => potong.slice(i + 1).map(({ p: q }) => Math.hypot(...kurang(p, q)))));
  if (potong.length === 15 && jarak >= 4) break;
}
assert.equal(potong.length, 15, "harus ada 15 perpotongan dalam");
assert.ok(jarak >= 4, "jarak perpotongan minimal 4; tidak boleh ada tiga garis bertemu di dalam");
assert.equal(new Set(potong.map(({ p }) => p.map((v) => v.toFixed(5)).join(","))).size, 15);
assert.ok(potong.every(({ p }) => Math.hypot(p[0] - 120, p[1] - 120) < 100));
assert.ok(titik.every(([x, y]) => Math.abs(Math.hypot(x - 120, y - 120) - 100) < 1e-5));
const celah = titik.map(([x, y]) => Math.atan2(y - 120, x - 120)).map((a, i, as) => (as[(i + 1) % 6] - a + 2 * Math.PI) % (2 * Math.PI));
assert.ok(Math.max(...celah) - Math.min(...celah) > 0.1, "jarak sudut harus tidak beraturan");
const daerah = 1 + ruas.reduce((n, _, i) => n + 1 + potong.filter((p) => p.ruas[1] === i).length, 0);
assert.equal(daerah, 1 + 15 + 15);
assert.equal(daerah, 31);
const lingkaran = `<circle cx="120" cy="120" r="100" fill="none" stroke="${NAVY}" stroke-width="1.6"/>`;
simpan("B02-I01", 240, 240, lingkaran + ruas.map(([a, b]) => garis(titik[a], titik[b], 1)).join("") +
  titik.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${EMAS}" stroke="${NAVY}" stroke-width="1.6"/>`).join(""));
assert.equal(baru.size, 20, "harus ada 20 ilustrasi tambahan");
baru.forEach((isi, n) => {
  assert.equal((isi.match(/<text\b/g) ?? []).length, n === "B18-I01.svg" ? 1 : 0, "teks hanya boleh tanda tanya B18-I01");
  assert.ok(!isi.match(/#[\da-f]{3,8}/gi)?.some((c) => !["#111", NAVY, EMAS].includes(c)), "warna di luar palet");
});

mkdirSync(folder, { recursive: true });
gambar.forEach((f, i) => {
  writeFileSync(join(folder, `B14-I01-${T_ALL[i]}.svg`), svg(120, 120, siluet(draw(f, 60, 60))));
});

const lembar = baris.map(({ nama: n, gerak }, r) => {
  const cy = r * 120 + 60;
  return `<text x="12" y="${cy}" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#111">${n}</text>` +
    gerak.map((f, c) => siluet(draw(f, 160 + c * 120 + 60, cy))).join("");
}).join("");
writeFileSync(join(folder, "lembar.svg"), svg(1120, 480, lembar));
baru.forEach((isi, n) => writeFileSync(join(folder, n), isi));

console.log(`Dibuat: 8 SVG B14-I01 (${nama}) dan ${join(folder, "lembar.svg")}.`);
console.log(`Assert lulus: 8 gerak unik, kiral, 8 gambar berbeda (${[...new Set([nama, ...namaLembar])].join(", ")}).`);
console.log(`Dibuat: ${baru.size} SVG tambahan; tanduk: ${namaTanduk}; helai: ${namaHelai.join(" → ")}.`);
console.log(`Assert lulus: simetri daun, 4 susunan unik, tumpang tindih, skala +${Math.round((sisi[1] / sisi[0] - 1) * 100)}%, batas gambar, kisi Latin, palet/teks; B02: 15 perpotongan unik, jarak minimum ${jarak.toFixed(3)}, ${daerah} daerah.`);
