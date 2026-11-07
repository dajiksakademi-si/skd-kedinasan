import assert from "node:assert/strict";
import { type Fig, type Key, type Pt, RED, sig, textC } from "./figural-lib";
import { type Draft, layout } from "./k12-spasial-core";
import { type T, type Ubah, BENTUK, HITUNG_JENIS, buatHitung, T_ALL, T_NAME, ap, calonDari, cekPisah, ciriDari, comp, geser, inv, muat, pasang, pilih } from "./tiu-bentuk";
import { teks } from "./tiu-fig-beda-seri";
import { goresan, lengkung } from "./tiu-gaya";
import { bintang, lekuk } from "./tiu-pola";

// TIU SKD — jenis dari pembahasan resmi Al Faiz (dikirim Gusti 2026-10-28), dimodifikasi supaya tidak identik:
//   FIG-ANA-UBAH   (no. 59): tiap objek punya perubahan sendiri — jumlah kelopak/cabang ±k, dua objek atas bertukar tempat,
//                            objek bawah diputar/dicermin.
//   FIG-MTX-GABUNG (no. 65): per baris, objek besar kolom 1 + kolom 2 digabung jadi kolom 3; objek kecil kolom 2 → kolom 3
//                            hanya ujungnya berubah, lancip → tumpul.
// Pengecoh salah di satu atau dua hal, dipilih lewat `pilih` (tiu-bentuk.ts) supaya kunci tidak bisa ditebak dari bentuk opsi.

const ANALOGI = { instruksi: "Perhatikan hubungan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const POLA = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const lawan = (t: T): T => ({ tetap: "mkk", r90: "r270", r270: "r90", r180: "tetap", mkk: "mab", mab: "mkk", md1: "md2", md2: "md1" } as Record<T, T>)[t];

// ── FIG-ANA-UBAH: (1):(2) = (3):(4) ──────────────────────────────────────────────────────────
type Hitung = { jenis: string; n: number; seed: number };
export type AnaUbah = { tier: 2 | 3; key: Key; a: [Hitung, Hitung, string]; c: [Hitung, Hitung, string]; dn: [number, number]; tukar: boolean; t: T; q: 1 | 3; siluet?: boolean };
export const ANA_UBAH: AnaUbah[] = [
  { tier: 3, key: "D", a: [{ jenis: "lekuk", n: 3, seed: 7 }, { jenis: "bintang", n: 8, seed: 3 }, "ikal2"], c: [{ jenis: "lekuk", n: 4, seed: 11 }, { jenis: "bintang", n: 9, seed: 5 }, "molekul4"], dn: [2, -2], tukar: true, t: "mab", q: 1 },
  { tier: 3, key: "B", a: [{ jenis: "bintang", n: 5, seed: 8 }, { jenis: "lekuk", n: 6, seed: 2 }, "sulur"], c: [{ jenis: "bintang", n: 4, seed: 13 }, { jenis: "lekuk", n: 7, seed: 9 }, "ombak"], dn: [3, -2], tukar: false, t: "mkk", q: 3 },
  { tier: 3, key: "C", a: [{ jenis: "lekuk", n: 6, seed: 5 }, { jenis: "bintang", n: 5, seed: 6 }, "ikal3"], c: [{ jenis: "lekuk", n: 5, seed: 3 }, { jenis: "bintang", n: 7, seed: 9 }, "ikal2"], dn: [-2, 3], tukar: true, t: "mab", q: 3, siluet: true },
];
const BATAS: Record<string, [number, number]> = { lekuk: [3, 8], bintang: [4, 10], ...Object.fromEntries(Object.entries(HITUNG_JENIS).map(([k, v]) => [k, v.batas])) };
const NAMA_H: Record<string, [string, string]> = { lekuk: ["gumpal berkelopak", "kelopak"], bintang: ["bintang bercabang", "cabang"], ...Object.fromEntries(Object.entries(HITUNG_JENIS).map(([k, v]) => [k, v.nama])) };
type SelU = { n: [number, number]; tukar: boolean; t: T };
const ATAS: Pt[] = [[-23, -22], [23, -22]];
const rupaH = (h: Hitung, n: number) => (h.jenis === "lekuk" ? lekuk(n, h.seed, 32, false) : h.jenis === "bintang" ? bintang(n, h.seed, false, 34, 0.32) : buatHitung(h.jenis, n, h.seed));
// Gaya siluet: dua objek atas 42, objek bawah selebar sel (dimuat lewat `muat`, jadi ukurannya tetap walau diputar).
const ATAS_S: Pt[] = [[-23, -21], [23, -21]];
function gambarU(p: AnaUbah["a"], s: SelU, siluet = false): Fig {
  if (!siluet) return [...geser(rupaH(p[0], s.n[0]), ATAS[s.tukar ? 1 : 0], 0.6), ...geser(rupaH(p[1], s.n[1]), ATAS[s.tukar ? 0 : 1], 0.6), ...geser(ap(s.t, BENTUK[p[2]]), [0, 25], 0.68)];
  const isi = [muat(rupaH(p[0], s.n[0]), ATAS_S[s.tukar ? 1 : 0], 42), muat(rupaH(p[1], s.n[1]), ATAS_S[s.tukar ? 0 : 1], 42), muat(ap(s.t, BENTUK[p[2]]), [0, 26], 84, 34)];
  cekPisah(isi);
  return isi.flat();
}
/** Semua tafsir hitung yang cocok dengan pasangan contoh (tambah d, kali/bagi bilangan bulat), diterapkan ke x. */
function tafsir(sebelum: number, sesudah: number, x: number) {
  const out = new Set([x + sesudah - sebelum]);
  if (sesudah % sebelum === 0 && sesudah !== sebelum) out.add((x * sesudah) / sebelum);
  if (sebelum % sesudah === 0 && sesudah !== sebelum && x % (sebelum / sesudah) === 0) out.add(x / (sebelum / sesudah));
  return out;
}
export function anaUbah(s: AnaUbah): Draft {
  [0, 1].forEach((i) => assert.equal(s.a[i].jenis, s.c[i].jenis, "objek ke-i harus sejenis di kedua pasangan"));
  assert.notEqual(s.a[0].jenis, s.a[1].jenis, "dua objek atas harus beda jenis supaya tetap terlacak saat bertukar tempat");
  s.dn.forEach((d) => assert.ok(d !== 0, "jumlah kelopak/cabang harus berubah"));
  if (s.siluet) assert.ok(["mkk", "mab", "r180"].includes(s.t), "gaya siluet: objek bawah selebar sel, jadi tidak boleh diputar 90°");
  const awal = (p: AnaUbah["a"]): SelU => ({ n: [p[0].n, p[1].n], tukar: false, t: "tetap" });
  const akhir = (p: AnaUbah["a"]): SelU => ({ n: [p[0].n + s.dn[0], p[1].n + s.dn[1]], tukar: s.tukar, t: s.t });
  const P = [s.a, s.a, s.c, s.c], S = [awal(s.a), akhir(s.a), awal(s.c), akhir(s.c)];
  const sah = (p: AnaUbah["a"], x: SelU) => [0, 1].every((i) => x.n[i] >= BATAS[p[i].jenis][0] && x.n[i] <= BATAS[p[i].jenis][1]);
  S.forEach((x, i) => assert.ok(sah(P[i], x), "jumlah kelopak/cabang di luar batas yang masih bisa dihitung mata"));
  // Bukti kunci tunggal: setiap tafsir hitung dari pasangan lengkap memberi jumlah yang sama; objek bawah kiral → satu perubahan.
  const [l0, l1] = s.q === 1 ? [2, 3] : [0, 1], dasar = S[s.q - 1], K = S[s.q], p = P[s.q];
  [0, 1].forEach((i) => assert.deepEqual([...tafsir(S[l0].n[i], S[l1].n[i], dasar.n[i])], [K.n[i]], "jumlah punya tafsir lain"));
  const B = BENTUK[P[l0][2]];
  assert.equal(T_ALL.filter((u) => sig(ap(u, B)) === sig(ap(s.t, B))).length, 1, "perubahan objek bawah tidak tunggal");
  const sel = S.map((x, i) => gambarU(P[i], x, s.siluet)), kunci = sel[s.q];
  sel.forEach((f, i) => i === s.q || assert.notEqual(sig(f), sig(kunci), "jawaban sama dengan gambar yang terlihat"));

  const ubah: Ubah<SelU>[] = [];
  [0, 1].forEach((i) => {
    const nm = NAMA_H[p[i].jenis][1], ganti = (v: number) => (x: SelU): SelU => ({ ...x, n: (i === 0 ? [v, x.n[1]] : [x.n[0], v]) as [number, number] });
    const pakai = new Set([K.n[i]]);
    const coba = (v: number, isi: string, nama: string) => { if (!pakai.has(v)) { pakai.add(v); ubah.push({ grup: i, ke: ganti(v), isi, nama }); } };
    coba(dasar.n[i] - s.dn[i], `ada ${dasar.n[i] - s.dn[i]} ${nm} (harusnya ${K.n[i]})`, `arah hitung ${nm} terbalik`);
    coba(dasar.n[i], `${nm} tetap ${dasar.n[i]}`, `lupa mengubah jumlah ${nm}`);
    coba(K.n[i] + 1, `ada ${K.n[i] + 1} ${nm} (harusnya ${K.n[i]})`, "salah hitung lebih satu");
    coba(K.n[i] - 1, `ada ${K.n[i] - 1} ${nm} (harusnya ${K.n[i]})`, "salah hitung kurang satu");
  });
  ubah.push(s.tukar
    ? { grup: 2, ke: (x) => ({ ...x, tukar: false }), isi: "dua objek atas tidak bertukar tempat", nama: "lupa menukar tempat" }
    : { grup: 2, ke: (x) => ({ ...x, tukar: true }), isi: "dua objek atas ditukar tempatnya", nama: "menukar tempat yang seharusnya tetap" });
  for (const u of [...new Set([lawan(s.t), "tetap" as T, comp(s.t, "mkk"), inv(s.t)])].filter((u) => u !== s.t))
    ubah.push({ grup: 3, ke: (x) => ({ ...x, t: u }), isi: `objek bawah ${T_NAME[u]}`, nama: u === "tetap" ? "lupa mengubah objek bawah" : "salah arah putar atau cermin" });
  const attr = (x: SelU) => [String(x.n[0]), String(x.n[1]), String(x.tukar), x.t];
  const salah = pilih(attr(K), kunci, calonDari(K, ubah, attr, (x) => gambarU(p, x, s.siluet), (x) => sah(p, x)), s.a[0].seed * 31 + s.c[1].seed);
  const { opts, gugur } = pasang(kunci, salah, s.key);

  const lengkap = `(${l0 + 1}):(${l1 + 1})`, kata = (d: number) => (d > 0 ? `bertambah ${d}` : `berkurang ${-d}`);
  const baris = [0, 1].map((i) => `${NAMA_H[p[i].jenis][0][0].toUpperCase()}${NAMA_H[p[i].jenis][0].slice(1)}: ${S[l0].n[i]} menjadi ${S[l1].n[i]} ${NAMA_H[p[i].jenis][1]}, jadi ${kata(s.dn[i])}.`);
  return {
    sub_type: "FIG-ANA-UBAH", tier: s.tier, ...ANALOGI, key: s.key, opts, siluet: s.siluet, ciri: ciriDari([s.a[2], s.c[2]], "dua-atas-satu-lebar", [0, 1].map((i) => (["lekuk", "bintang"].includes(s.a[i].jenis) ? "pola" : s.a[i].jenis))),
    stemSvg: layout([sel.map((f, i) => (i === s.q ? null : f))], { size: 104, gap: 40, seps: [":", "=", ":"] }),
    pembahasan: teks({
      tanya: `gambar (${s.q + 1}) supaya hubungan (1):(2) sama dengan (3):(4).`,
      cara: [`Lihat pasangan yang lengkap, ${lengkap}. Ada tiga objek, dan setiap objek punya perubahannya sendiri.`, ...baris,
        s.tukar ? "Dua objek atas juga bertukar tempat: yang tadinya di kiri pindah ke kanan." : "Dua objek atas tetap di tempatnya.",
        `Objek bawah ${T_NAME[s.t]}.`,
        `Terapkan ke gambar (${s.q}): ${NAMA_H[p[0].jenis][1]} ${dasar.n[0]} menjadi ${K.n[0]}, ${NAMA_H[p[1].jenis][1]} ${dasar.n[1]} menjadi ${K.n[1]}${s.tukar ? ", tukar tempatnya" : ""}, lalu ubah objek bawah dengan cara yang sama.`],
      gugur, key: s.key, alasan: `Opsi ${s.key} satu-satunya yang jumlah ${NAMA_H[p[0].jenis][1]} dan ${NAMA_H[p[1].jenis][1]}nya tepat, tempat objek atasnya benar, dan objek bawahnya ${T_NAME[s.t]}.`,
      analogi: "Seperti tiga orang yang diberi tugas berbeda: satu menambah kelereng, satu membuang kelereng, satu hanya membalik badan. Tugas mereka tidak tertukar.",
      jebakan: `Rupa ${NAMA_H[p[0].jenis][1]} dan ${NAMA_H[p[1].jenis][1]} ikut berubah ketika jumlahnya berubah, jadi jangan mencocokkan rupa, cukup hitung. Opsi yang salah sering benar di dua hal dan keliru di hal lain, jadi periksa ketiga objek sampai selesai.`,
    }),
    pbhSvg: layout([sel], { size: 104, gap: 40, seps: [":", "=", ":"], hl: [0, s.q], foot: [...[0, 1].map((i) => `${NAMA_H[p[i].jenis][1]}: ${kata(s.dn[i])}`), s.tukar ? "dua objek atas bertukar tempat" : "objek atas tetap di tempat", `objek bawah: ${T_NAME[s.t]}`] }),
  };
}

// ── FIG-MTX-GABUNG: kolom 3 = gabungan objek besar kolom 1 + 2; objek kecil kolom 2 ditumpulkan ──────
// Tiap baris memakai keluarga bentuk sendiri. Bagian "inti" (alas mahkota, pusat bunga) ada di kolom 1 dan 2 sekaligus,
// sehingga tafsir "bagian yang sama dibuang" (XOR) gugur oleh baris contoh.
type Keluarga = "lengkung" | "puncak" | "kelopak" | "sinar" | "ranting";
type BarisG = { pola: Keluarga; seed: number; kecil: [number, number]; pojok: 0 | 1 };
export type MtxGabung = { tier: 2 | 3; key: Key; baris: [BarisG, BarisG, BarisG]; siluet?: boolean };
export const MTX_GABUNG: MtxGabung[] = [
  { tier: 3, key: "B", baris: [{ pola: "lengkung", seed: 3, kecil: [8, 6], pojok: 1 }, { pola: "puncak", seed: 5, kecil: [4, 5], pojok: 0 }, { pola: "kelopak", seed: 2, kecil: [6, 4], pojok: 0 }] },
  { tier: 3, key: "E", baris: [{ pola: "kelopak", seed: 9, kecil: [5, 8], pojok: 1 }, { pola: "puncak", seed: 4, kecil: [6, 4], pojok: 1 }, { pola: "lengkung", seed: 6, kecil: [4, 7], pojok: 0 }] },
  { tier: 3, key: "D", baris: [{ pola: "puncak", seed: 7, kecil: [7, 5], pojok: 0 }, { pola: "kelopak", seed: 8, kecil: [5, 8], pojok: 1 }, { pola: "lengkung", seed: 4, kecil: [4, 6], pojok: 1 }], siluet: true },
];
type Bagian = { semua: Fig[]; inti: number[]; k1: number[]; k2: number[] };
const busur = (cx: number, w: number, h: number, t: number, sd: number): Fig => [{ k: "poly", fill: "b", pts: goresan(
  [[cx - w, 42], [cx - w * 0.92, 42 - h * 0.62], [cx - w * 0.5, 42 - h * 0.96], [cx + w * 0.08, 42 - h], [cx + w * 0.6, 42 - h * 0.82], [cx + w * 0.94, 42 - h * 0.4], [cx + w, 42]],
  [t * 0.85, t, t * 1.1, t * 1.15, t * 1.05, t, t * 0.85], 0.22, sd) }];
/** Puncak mahkota: sisi melengkung ke dalam, ujung runcing. */
function runcing(x: number, h: number, w: number, m: number): Fig {
  const sisi = ([bx, by]: Pt, [qx, qy]: Pt, [ax, ay]: Pt) => Array.from({ length: 7 }, (_, k): Pt => { const u = k / 6; return [(1 - u) ** 2 * bx + 2 * u * (1 - u) * qx + u * u * ax, (1 - u) ** 2 * by + 2 * u * (1 - u) * qy + u * u * ay]; });
  const A: Pt = [x + m, 31 - h], kiri = sisi([x - w, 31], [x - w * 0.25, 31 - h * 0.3], A), kanan = sisi([x + w, 31], [x + w * 0.25, 31 - h * 0.3], A).reverse();
  return [{ k: "poly", fill: "b", pts: [...kiri, ...kanan.slice(1)].map(([a, b]): Pt => [Math.round(a * 10) / 10, Math.round(b * 10) / 10]) }];
}
const PUSAT: Pt = [-2, 12];
function daunan(a: number, L: number, w: number): Fig {
  const [cx, cy] = PUSAT, d = [Math.cos(a), Math.sin(a)], q = [-d[1], d[0]], at = (s: number, t: number): Pt => [cx + d[0] * s + q[0] * t, cy + d[1] * s + q[1] * t];
  return [{ k: "poly", fill: "b", pts: lengkung([at(0, w * 0.35), at(L * 0.55, w), at(L, w * 0.45), at(L * 1.04, -w * 0.1), at(L * 0.6, -w * 0.9), at(0, -w * 0.35)], 6) }];
}
function bagian(b: BarisG): Bagian {
  let x = b.seed;
  const acak = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648), j = () => acak() - 0.5;
  if (b.pola === "lengkung") {
    // Dua lengkung saja: lengkung kecil di dalam lengkung besar terbaca sebagai satu "jembatan" (cek mata 2026-10-28).
    const semua = [busur(-6 + 6 * j(), 30, 26 + 6 * j(), 12, b.seed), busur(15, 13, 44 + 4 * j(), 10, b.seed + 1)];
    return acak() < 0.5 ? { semua, inti: [], k1: [0], k2: [1] } : { semua, inti: [], k1: [1], k2: [0] };
  }
  // Langkah 1b (2026-10-29): dua keluarga bagian baru supaya matriks gabung tidak berulang antarpaket.
  if (b.pola === "sinar") {
    // Inti = alas setengah lingkaran; bagian = sinar berujung bulat (bukan runcing, jadi aman di baris 3).
    const alas: Fig = [{ k: "poly", fill: "b", pts: lengkung([[-20, 40], [-17, 30], [0, 24], [17, 30], [20, 40], [0, 42]], 6) }];
    // Jangkauan sinar ≤ 44 dari pusat (0, 36): sinar mendatar versi pertama menembus bingkai sel (cek mata 2026-10-29).
    const sudut = [-150, -118, -90, -62, -30].map((d) => ((d + 6 * j()) * Math.PI) / 180);
    const semua = [alas, ...sudut.map((a, i): Fig => { const L = 16 + 8 * Math.abs(Math.sin(i * 2.1 + b.seed)), p0: Pt = [20 * Math.cos(a), 36 + 20 * Math.sin(a)], p1: Pt = [(20 + L) * Math.cos(a), 36 + (20 + L) * Math.sin(a)]; return [{ k: "poly", fill: "b", pts: goresan([p0, p1], [7, 6]) }, { k: "circ", c: p1, r: 3, fill: "b" }]; })];
    const ambil = [1, 2, 3, 4, 5].sort(() => acak() - 0.5);
    return { semua, inti: [0], k1: ambil.slice(0, 3).sort(), k2: ambil.slice(3).sort() };
  }
  if (b.pola === "ranting") {
    // Inti = batang; bagian = cabang berselang-seling di ketinggian berbeda.
    const batang: Fig = [{ k: "poly", fill: "b", pts: goresan([[-4, 44], [-2, 14], [2, -14], [4, -40]], [9, 7.5, 5.5, 3]) }];
    const cab = [[-2, 22, -1], [0, 4, 1], [1, -10, -1], [3, -26, 1]].map(([x, y, sisi], i): Fig => {
      const L = 22 + 6 * Math.abs(Math.sin(i * 1.7 + b.seed)), a = -Math.PI / 2 + sisi * (0.95 + 0.15 * j());
      return [{ k: "poly", fill: "b", pts: goresan([[x, y], [x + L * 0.55 * Math.cos(a) + sisi * 3, y + L * 0.55 * Math.sin(a) + 3], [x + L * Math.cos(a), y + L * Math.sin(a)]], [6, 4.5, 2.5]) }];
    });
    const ambil = [1, 2, 3, 4].sort(() => acak() - 0.5);
    return { semua: [batang, ...cab], inti: [0], k1: ambil.slice(0, 2).sort(), k2: ambil.slice(2).sort() };
  }
  if (b.pola === "puncak") {
    const alas: Fig = [{ k: "poly", fill: "b", pts: lengkung([[-34, 30], [0, 27], [34, 29], [35, 38], [0, 41], [-33, 39]], 5) }];
    const semua = [alas, runcing(-22, 30 + 6 * j(), 11, -3), runcing(0, 42 + 4 * j(), 11, 2), runcing(22, 26 + 6 * j(), 11, 4)];
    const satu = 1 + Math.floor(acak() * 3);
    return { semua, inti: [0], k1: [1, 2, 3].filter((i) => i !== satu), k2: [satu] };
  }
  const sudut = [-140, -40, 60, 150].map((d) => ((d + 14 * j()) * Math.PI) / 180);
  const semua: Fig[] = [[{ k: "circ", c: PUSAT, r: 9, fill: "b" }], ...sudut.map((a, i) => daunan(a, 31 + 5 * j() - (i === 3 ? 4 : 0), 11))];
  return acak() < 0.5 ? { semua, inti: [0], k1: [1, 2], k2: [3] } : { semua, inti: [0], k1: [1, 2], k2: [3, 4] };
}
// Pojok ±30 dan R 13: ujung cabang terpanjang tetap di dalam bingkai sel (±46).
const POJOK_K: Pt[] = [[-30, -30], [30, -30]];
type SelG = { besar: number[]; src: 1 | 2; tumpul: boolean };
export function mtxGabung(s: MtxGabung): Draft {
  assert.notEqual(s.baris[2].pola, "puncak", "puncak runcing jangan di baris 3: siswa tidak bisa melihat apakah ujung objek besar ikut ditumpulkan");
  assert.equal(new Set(s.baris.map((b) => b.pola)).size, 3, "tiap baris memakai keluarga bentuk berbeda");
  s.baris.forEach((b) => assert.notEqual(b.kecil[0], b.kecil[1], "objek kecil kolom 1 dan 2 harus beda jumlah cabang"));
  const B = s.baris.map(bagian), dalam = s.baris.map((b) => 0.26 + 0.16 * ((b.seed * 7) % 5) / 4);
  const kecil = (r: number, src: 1 | 2, tumpul: boolean) => geser(bintang(s.baris[r].kecil[src - 1], s.baris[r].seed + src, tumpul, 13, dalam[r]), POJOK_K[s.baris[r].pojok]);
  const gambar = (r: number, x: SelG): Fig => [...x.besar.flatMap((i) => B[r].semua[i]), ...kecil(r, x.src, x.tumpul)];
  const kol = (r: number): SelG[] => [{ besar: [...B[r].inti, ...B[r].k1], src: 1, tumpul: false }, { besar: [...B[r].inti, ...B[r].k2], src: 2, tumpul: false }, { besar: [...B[r].inti, ...B[r].k1, ...B[r].k2].sort(), src: 2, tumpul: true }];
  const grid = [0, 1, 2].map((r) => kol(r).map((x) => gambar(r, x))), K = kol(2)[2], kunci = grid[2][2];
  // Bukti kunci tunggal: setiap aturan gabung (dan aturan objek kecil) yang cocok dengan baris 1–2 memberi jawaban yang sama.
  const ATURAN: [string, (a: Set<number>, b: Set<number>) => number[]][] = [
    ["gabung", (a, b) => [...new Set([...a, ...b])]], ["beda", (a, b) => [...a, ...b].filter((i) => !(a.has(i) && b.has(i)))], ["irisan", (a, b) => [...a].filter((i) => b.has(i))],
    ["kolom1", (a) => [...a]], ["kolom2", (_, b) => [...b]], ["kurang1", (a, b) => [...b].filter((i) => !a.has(i))], ["kurang2", (a, b) => [...a].filter((i) => !b.has(i))],
  ];
  const kunciSet = (xs: number[]) => [...new Set(xs)].sort().join(",");
  const jawabBesar = new Set(ATURAN.filter(([, f]) => [0, 1].every((r) => kunciSet(f(new Set(kol(r)[0].besar), new Set(kol(r)[1].besar))) === kunciSet(kol(r)[2].besar)))
    .map(([, f]) => kunciSet(f(new Set(kol(2)[0].besar), new Set(kol(2)[1].besar)))));
  assert.deepEqual([...jawabBesar], [kunciSet(K.besar)], "aturan objek besar punya tafsir lain");
  // Objek kecil: hanya "ambil kolom 2, tumpulkan" yang cocok, karena objek kecil kolom 1 beda jumlah cabang.
  grid.forEach((row, r) => row.forEach((f, c) => (r === 2 && c === 2) || assert.notEqual(sig(f), sig(kunci), "jawaban sama dengan sel yang terlihat")));

  const k1 = B[2].k1, k2 = B[2].k2, inti = B[2].inti, U = K.besar;
  const ubah: Ubah<SelG>[] = [
    ...[...k1, ...k2].map((i): Ubah<SelG> => {
      const sisa = U.filter((v) => v !== i), salin = kunciSet(sisa) === kunciSet(kol(2)[0].besar) ? 1 : kunciSet(sisa) === kunciSet(kol(2)[1].besar) ? 2 : 0;
      return { grup: 0, ke: (x) => ({ ...x, besar: sisa }), isi: salin ? `objek besarnya hanya salinan kolom ${salin}` : "objek besarnya kurang satu bagian", nama: salin ? `lupa menambahkan bagian dari kolom ${3 - salin}` : "ada bagian yang tertinggal saat digabung" };
    }),
    { grup: 0, ke: (x) => ({ ...x, besar: kol(2)[0].besar }), isi: "objek besarnya hanya salinan kolom 1", nama: "lupa menambahkan bagian dari kolom 2" },
    { grup: 0, ke: (x) => ({ ...x, besar: kol(2)[1].besar }), isi: "objek besarnya hanya salinan kolom 2", nama: "lupa menambahkan bagian dari kolom 1" },
    ...(inti.length ? [{ grup: 0, ke: (x: SelG) => ({ ...x, besar: U.filter((v) => !inti.includes(v)) }), isi: "bagian yang ada di kolom 1 dan kolom 2 ikut dibuang", nama: "membuang bagian yang sama, padahal digabung" }] : []),
    { grup: 2, ke: (x) => ({ ...x, tumpul: false }), isi: "ujung bintang kecilnya masih lancip", nama: "lupa menumpulkan ujung" },
    { grup: 1, ke: (x) => ({ ...x, src: 1 }), isi: "bintang kecilnya diambil dari kolom 1", nama: "salah ambil kolom" },
  ];
  const attr = (x: SelG) => [kunciSet(x.besar), String(x.src), String(x.tumpul)];
  const salah = pilih(attr(K), kunci, calonDari(K, ubah, attr, (x) => gambar(2, x), () => true), s.baris[0].seed * 17 + s.baris[2].seed);
  const { opts, gugur } = pasang(kunci, salah, s.key);
  const tanda = (at: (r: number, c: number) => Pt, sz: number) => [0, 1, 2].map((r) => [0, 1].map((c) => textC((at(r, c)[0] + at(r, c + 1)[0]) / 2, at(r, c)[1] + 7, c ? "=" : "+", 22, RED)).join("")).join("");
  return {
    sub_type: "FIG-MTX-GABUNG", tier: s.tier, ...POLA, key: s.key, opts, siluet: s.siluet, ciri: { keluarga: ["gabung"], susunan: "gabung", bentuk: [] },
    stemSvg: layout([grid[0], grid[1], [grid[2][0], grid[2][1], null]], { size: 100, gap: 8 }),
    pembahasan: teks({
      tanya: "sel kanan bawah matriks 3×3.",
      cara: ["Bandingkan per baris. Setiap sel punya satu objek besar dan satu bintang kecil, dan keduanya punya aturan sendiri.",
        "Objek besar: kolom 3 adalah gabungan objek besar kolom 1 dan kolom 2, ditumpuk di tempat yang sama. Bagian yang muncul di dua kolom sekaligus tetap ada, cukup sekali.",
        "Bintang kecil: kolom 3 memakai bintang kecil kolom 2, hanya ujungnya yang berubah dari lancip menjadi tumpul. Bintang kecil kolom 1 tidak dipakai.",
        "Cek dua aturan itu di baris 1 dan baris 2, lalu terapkan ke baris 3."],
      gugur, key: s.key, alasan: `Opsi ${s.key} satu-satunya yang objek besarnya gabungan utuh kolom 1 dan kolom 2, dan bintang kecilnya bintang kolom 2 yang ujungnya sudah tumpul.`,
      analogi: "Seperti menumpuk dua lembar plastik bening bergambar: semua gambar dari kedua lembar terlihat bersama dalam satu tumpukan.",
      jebakan: "Bintang kecil kolom 1 dan kolom 2 sama-sama lancip dan mirip, jadi mudah salah ambil. Hitung cabangnya: yang dipakai selalu bintang kolom 2.",
    }),
    pbhSvg: layout(grid.map((row, r) => row.map((f, c) => (r === 2 && c === 2 ? kunci : f))), { size: 100, gap: 26, hl: [2, 2], minW: 600, ann: tanda,
      foot: ["Objek besar: kolom 1 + kolom 2 = kolom 3", "Bintang kecil kolom 2: ujung lancip jadi tumpul"] }),
  };
}
