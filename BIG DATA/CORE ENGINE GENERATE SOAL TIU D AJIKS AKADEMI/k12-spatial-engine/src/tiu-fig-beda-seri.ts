import assert from "node:assert/strict";
import { type Fig, type Key, type Prim, type Pt, KEYS, RED, sig, text, textC } from "./figural-lib";
import { type Draft, layout } from "./k12-spasial-core";
import { type Rupa, type Salah, type T, type Ubah, BENTUK, KUADRAN, RUPA, SLOT, TATA, T_ALL, T_NAME, ap, beri, calonDari, cekKecil, cekPisah, comp, geser, inv, kiral, muat, pasang, pick, pilih, rng, shuffle, tata, cekBedaObjek, ciriDari } from "./tiu-bentuk";
import { molekul } from "./tiu-pola";

// TIU SKD — gambar berbeda (putar vs cermin, hitung jenis) dan seri (selang 3, empat kuadran).
// Pembahasan gaya guru TIU SKD (aturan C-1a): yang ditanya, cara cepat, kenapa tiap opsi gugur, kunci, analogi, jebakan.

const BEDA = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };
const SERI = { instruksi: "Perhatikan urutan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
export const ABC = (at: (r: number, c: number) => Pt, s: number, n: number) => Array.from({ length: n }, (_, c) => text(at(0, c)[0], at(0, c)[1] + s / 2 + 26, KEYS[c], 22)).join("");
export const nomor = (at: (r: number, c: number) => Pt, s: number, n: number) => Array.from({ length: n }, (_, c) => text(at(0, c)[0], at(0, c)[1] + s / 2 + 24, `(${c + 1})`, 18)).join("");
export const teks = (o: { tanya: string; cara: string[]; gugur: string[]; key: Key; alasan: string; analogi: string; jebakan: string }) =>
  [`Yang ditanya: ${o.tanya}`, `Cara cepat: ${o.cara.join(" ")}`, "Kenapa opsi lain gugur:", ...o.gugur, `Jawaban: Opsi ${o.key}. ${o.alasan}`, `Analogi: ${o.analogi}`, `Kekeliruan yang Mungkin Terjadi: ${o.jebakan}`].join("\n");

// ── FIG-BEDA-PUTAR: empat gambar = satu bentuk diputar, satu gambar dicermin ───────────────────
export type BedaPutar = { tier: 2 | 3; key: Key; bentuk: string[]; rupa?: Rupa[]; seed: number };
export const BEDA_PUTAR: BedaPutar[] = [
  { tier: 2, key: "C", bentuk: ["daun", "biji"], seed: 11 },
  { tier: 3, key: "E", bentuk: ["sulur", "koma", "kawung"], seed: 12 },
  { tier: 3, key: "A", bentuk: ["payung", "kail", "palu"], seed: 13 },
];
export function bedaPutar(s: BedaPutar): Draft {
  const tempat = TATA[s.bentuk.length];
  cekKecil(s.bentuk, tempat.map((t) => t[1]));
  const r = rng(s.seed), objs = s.bentuk.map((n) => BENTUK[n]), rupa = s.rupa ?? RUPA;
  assert.ok(kiral(tata(objs, [], "tetap", tempat)), "gambar dasar harus kiral");
  const putar = shuffle(r, ["tetap", "r90", "r180", "r270"] as T[]);
  const cermin = comp(pick(r, ["tetap", "r90", "r180", "r270"] as T[]), "mkk");
  // Rupa (arsir) diberikan sesudah diputar, jadi arah arsir sama di semua opsi dan tidak membocorkan kunci.
  const kunci = tata(objs, rupa, cermin, tempat), lain = putar.map((t) => tata(objs, rupa, t, tempat));
  const ref = lain[0], dari = (t: T) => comp(inv(putar[0]), t);
  const salah: Salah[] = lain.map((f, i) => ({ fig: f, isi: i === 0 ? "ACUAN" : `sama dengan gambar acuan yang ${T_NAME[dari(putar[i])]}`, alasan: "jadi masih bentuk yang sama, hanya posisinya berubah" }));
  const { opts, gugur } = pasang(kunci, salah, s.key);
  const acuan = KEYS[opts.findIndex((f) => sig(f) === sig(ref))];
  const g = gugur.map((x) => (x.includes("ACUAN") ? `Opsi ${acuan} gugur: ini acuannya, dan tiga opsi lain bisa didapat dengan memutarnya.` : x.replace("gambar acuan", `opsi ${acuan}`)));
  const tc = dari(cermin);
  return {
    sub_type: "FIG-BEDA-PUTAR", tier: s.tier, ...BEDA, key: s.key, opts,
    stemSvg: "",
    pembahasan: teks({
      tanya: "satu gambar yang tidak bisa dibuat hanya dengan memutar gambar lain.",
      cara: [`Ambil opsi ${acuan} sebagai acuan.`, "Putar acuan itu dalam bayangan 90°, 180°, dan 270°, lalu cocokkan dengan opsi lain.", s.tier === 3 ? "Perhatikan semua objek sekaligus: letak objek kecil terhadap objek besar ikut berputar." : "Pilih satu ujung objek besar yang paling khas, lalu lihat di sisi mana ujung itu dan objek kecilnya berada setelah diputar.", "Arsir dan warna objek tidak ikut berubah, jadi abaikan."],
      gugur: g, key: s.key,
      alasan: `Opsi ${s.key} baru cocok dengan acuan bila ${T_NAME[tc]}, artinya gambar itu dibalik seperti bayangan cermin, bukan diputar.`,
      analogi: "Sarung tangan kanan bisa kamu putar ke mana saja, tetap tidak akan menjadi sarung tangan kiri.",
      jebakan: "Gambar yang terbalik 180° terlihat paling aneh, padahal itu tetap bentuk yang sama. Yang berbeda adalah gambar yang sisinya tertukar.",
    }),
    pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, KEYS.indexOf(s.key)], ann: (at, sz) => ABC(at, sz, 5), extra: () => "", extraH: 34, foot: ["Empat gambar = satu bentuk yang diputar", `Opsi ${s.key} = bentuk yang dicermin`] }),
  };
}

// ── FIG-BEDA-HITUNG: grid 3×3 berisi beberapa jenis bulatan; empat gambar jumlahnya sama ─────────
type Jenis = "hitam" | "putih" | "bertitik";
const token = (j: Jenis, [x, y]: Pt): Prim[] =>
  j === "hitam" ? [{ k: "circ", c: [x, y], r: 11, fill: "b" }] : j === "putih" ? [{ k: "circ", c: [x, y], r: 11, fill: "w" }] : [{ k: "circ", c: [x, y], r: 11, fill: "w" }, { k: "circ", c: [x, y], r: 3.5, fill: "b" }];
const POS: Pt[] = [-28, 0, 28].flatMap((y) => [-28, 0, 28].map((x): Pt => [x, y]));
export type BedaHitung = { tier: 2 | 3; key: Key; jenis: Jenis[]; target: Jenis; n: number; beda: number; seed: number };
export const BEDA_HITUNG: BedaHitung[] = [
  { tier: 2, key: "B", jenis: ["hitam", "putih", "bertitik"], target: "putih", n: 4, beda: 1, seed: 21 },
  { tier: 3, key: "D", jenis: ["hitam", "putih", "bertitik"], target: "bertitik", n: 3, beda: -1, seed: 22 },
];
/** Ciri lain yang mungkin dipakai siswa. Tidak boleh ada ciri yang menunjuk tepat satu opsi selain kunci. */
const CIRI: [string, (g: Jenis[]) => string][] = [
  ["bulatan tengah", (g) => g[4]],
  ["jumlah hitam di pojok", (g) => String([0, 2, 6, 8].filter((i) => g[i] === "hitam").length)],
  ["baris tengah", (g) => g.slice(3, 6).join()],
  ["simetri kiri-kanan", (g) => String([0, 3, 6].every((i) => g[i] === g[i + 2]))],
  ["simetri atas-bawah", (g) => String([0, 1, 2].every((i) => g[i] === g[i + 6]))],
  ["diagonal sama", (g) => String(g[0] === g[4] && g[4] === g[8])],
];
const pencilan = (v: string[]) => { const c = new Map<string, number>(); v.forEach((x) => c.set(x, (c.get(x) ?? 0) + 1)); return c.size === 2 && [...c.values()].includes(1) ? v.findIndex((x) => c.get(x) === 1) : -1; };
// Gaya siluet: 9 molekul hitam (1, 2, atau 3 bulatan) arah acak. Aturan relasional, bukan jumlah tetap: di empat gambar
// jumlah molekul 2 bulatan = jumlah molekul 3 bulatan (jumlahnya sendiri berubah-ubah); di kunci selisih satu.
export type BedaHitungS = { tier: 2 | 3; key: Key; siluet: true; seed: number; butir?: [string, string, string]; namaButir?: [string, string, string] };
export const BEDA_HITUNG_S: BedaHitungS[] = [{ tier: 3, key: "C", siluet: true, seed: 23 }];
const MOL: Fig[] = [[{ k: "circ", c: [0, 0], r: 8.5, fill: "b" }], molekul([[-9.5, 0, 7.5], [9.5, 0, 7.5]]), molekul([[-10, -6, 6.8], [8, -7, 6.8], [9, 11, 6.8]])];
// Butir berparameter tidak diputar 90°: susunan batu mendatar vs tegak terbaca sebagai dua jenis butir (cek mata 2026-10-29).
const BUTIR_T: T[] = ["tetap", "mkk", "mab", "r180"];
const POS_S: Pt[] = [-30, 0, 30].flatMap((y) => [-30, 0, 30].map((x): Pt => [x, y]));
function bedaHitungS(s: BedaHitungS): Draft {
  const ki = KEYS.indexOf(s.key), nama = s.namaButir ?? ["molekul 1 bulatan", "molekul 2 bulatan", "molekul 3 bulatan"];
  // `butir` (langkah 1b) = tiga bentuk satu keluarga sebagai jenis butir; bawaan = molekul 1/2/3 bulatan.
  const tok = (j: number) => (s.butir ? BENTUK[s.butir[j]] : MOL[j]), ukur = (j: number) => (s.butir ? 24 : j === 0 ? 17 : 26);
  for (let seed = s.seed; seed < s.seed + 5000; seed++) {
    const r = rng(seed);
    const n23 = KEYS.map((_, i) => { const a = pick(r, [2, 3, 4]); return i === ki ? (r() < 0.5 ? [a, a - 1] : [a - 1, a]) : [a, a]; });
    if (n23[ki].some((v) => v < 1)) continue;
    const grids = n23.map(([b, c]) => shuffle(r, [...Array(9 - b - c).fill(0), ...Array(b).fill(1), ...Array(c).fill(2)] as number[]));
    if (new Set(grids.map((g) => g.join())).size < 5) continue;
    const jml = (g: number[], j: number) => g.filter((x) => x === j).length;
    // Tidak ada jumlah yang tetap di empat gambar lain (aturan "jumlah tetap" akan lebih mudah dari aturan relasional).
    if ([0, 1, 2].some((j) => new Set(grids.filter((_, i) => i !== ki).map((g) => jml(g, j))).size === 1)) continue;
    const ciri: ((g: number[]) => string)[] = [(g) => String(g[4]), (g) => g.slice(3, 6).join(), (g) => String([0, 3, 6].every((i) => g[i] === g[i + 2])), (g) => String([0, 1, 2].every((i) => g[i] === g[i + 6])),
      (g) => String(g[0] === g[4] && g[4] === g[8]), (g) => String(jml(g, 0) === jml(g, 1)), (g) => String(jml(g, 0) === jml(g, 2)), ...[0, 1, 2].map((j) => (g: number[]) => String(jml(g, j))), (g) => String([0, 2, 6, 8].filter((i) => g[i] === 2).length)];
    if (ciri.some((f) => { const p = pencilan(grids.map(f)); return p >= 0 && p !== ki; })) continue;
    const bola = grids.map((g) => g.reduce((t, x) => t + x + 1, 0));
    if (bola.every((v, i) => i === ki || v < bola[ki]) || bola.every((v, i) => i === ki || v > bola[ki])) continue;
    const figs = grids.map((g) => { const t = g.map((j, i) => muat(ap(pick(r, s.butir ? BUTIR_T : T_ALL), tok(j)), POS_S[i], ukur(j))); cekPisah(t); return t.flat(); });
    const hitung = (g: number[]) => `${jml(g, 1)} ${nama[1]} dan ${jml(g, 2)} ${nama[2]}`;
    return {
      sub_type: "FIG-BEDA-HITUNG", tier: s.tier, ...BEDA, key: s.key, opts: figs, siluet: true, ciri: s.butir ? ciriDari(s.butir, "kisi9") : { keluarga: ["molekul"], susunan: "kisi9", bentuk: ["molekul-butir"] },
      stemSvg: "",
      pembahasan: teks({
        tanya: "satu gambar yang isinya tidak mengikuti aturan keempat gambar lain.",
        cara: ["Letak dan arah butir diacak di setiap gambar, jadi jangan mencari pola posisi atau putaran.", "Hitung tiap jenis butir. Jumlah satu jenis saja ternyata berubah-ubah di semua gambar, jadi aturannya bukan jumlah tetap.", `Bandingkan dua jenis sekaligus: di empat gambar, jumlah ${nama[1]} selalu sama dengan jumlah ${nama[2]}.`],
        gugur: grids.map((g, i) => (i === ki ? "" : `Opsi ${KEYS[i]} gugur: ada ${hitung(g)}, jumlahnya sama.`)).filter(Boolean),
        key: s.key, alasan: `Hanya opsi ${s.key} yang jumlahnya tidak sama: ${hitung(grids[ki])}.`,
        analogi: "Seperti memeriksa pasangan sepatu di rak: jumlah sepatunya boleh berbeda di tiap rak, yang dicek apakah kiri dan kanannya selalu berpasangan.",
        jebakan: "Kalau kamu hanya menghitung satu jenis, angkanya berubah-ubah dan kamu akan mengira soal ini tanpa pola. Polanya ada pada hubungan dua jenis.",
      }),
      pbhSvg: layout([figs], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5) + grids.map((g, i) => textC(at(0, i)[0], at(0, i)[1] + sz / 2 + 52, `${jml(g, 1)} dan ${jml(g, 2)}`, 16, RED)).join(""), extra: () => "", extraH: 60, foot: [`Angka merah = ${nama[1]} dan ${nama[2]}`] }),
    };
  }
  throw new Error("FIG-BEDA-HITUNG siluet: tidak ketemu susunan tanpa ciri pencilan lain");
}
export function bedaHitung(s: BedaHitung | BedaHitungS): Draft {
  if ("siluet" in s) return bedaHitungS(s);
  const ki = KEYS.indexOf(s.key);
  // Dua jenis saja atau target hitam: kunci = gambar paling gelap/terang, tertebak sekilas tanpa menghitung (audit 2026-10-28).
  assert.ok(s.jenis.length >= 3 && s.target !== "hitam", "pakai 3 jenis bulatan dan target bukan hitam");
  for (let seed = s.seed; seed < s.seed + 5000; seed++) {
    const r = rng(seed), lain = s.jenis.filter((j) => j !== s.target);
    const grids = KEYS.map((_, i) => {
      const nt = i === ki ? s.n + s.beda : s.n;
      return shuffle(r, [...Array(nt).fill(s.target), ...Array.from({ length: 9 - nt }, () => pick(r, lain))] as Jenis[]);
    });
    if (new Set(grids.map((g) => g.join())).size < 5) continue;
    const ciriLain: [string, (g: Jenis[]) => string][] = [...CIRI, ...lain.map((j): [string, (g: Jenis[]) => string] => [`jumlah ${j}`, (g) => String(g.filter((x) => x === j).length)])];
    if (ciriLain.some(([, f]) => { const p = pencilan(grids.map(f)); return p >= 0 && p !== ki; })) continue;
    const gelap = grids.map((g) => g.filter((x) => x === "hitam").length);
    if (gelap.every((v, i) => i === ki || v < gelap[ki]) || gelap.every((v, i) => i === ki || v > gelap[ki])) continue;
    const figs = grids.map((g) => g.flatMap((j, i) => token(j, POS[i])));
    const hitung = (g: Jenis[]) => s.jenis.map((j) => `${g.filter((x) => x === j).length} ${j}`).join(", ");
    return {
      sub_type: "FIG-BEDA-HITUNG", tier: s.tier, ...BEDA, key: s.key, opts: figs,
      stemSvg: "",
      pembahasan: teks({
        tanya: "satu gambar yang isinya tidak mengikuti aturan keempat gambar lain.",
        cara: ["Letak bulatan diacak di setiap gambar, jadi jangan mencari pola posisi.", `Hitung tiap jenis bulatan. Jumlah bulatan ${s.target} sama di empat gambar, yaitu ${s.n}.`],
        gugur: grids.map((g, i) => (i === ki ? "" : `Opsi ${KEYS[i]} gugur: ${hitung(g)}; bulatan ${s.target} tetap ${s.n}, sama dengan kelompoknya.`)).filter(Boolean),
        key: s.key, alasan: `Hanya opsi ${s.key} yang punya ${s.n + s.beda} bulatan ${s.target} (${hitung(grids[ki])}).`,
        analogi: "Seperti memeriksa lima kantong permen: susunannya boleh acak, yang dicek isinya.",
        jebakan: s.jenis.length === 3 ? "Jumlah jenis yang lain memang berubah-ubah di semua gambar, jadi itu bukan petunjuk. Cari jenis yang jumlahnya tetap." : "Mata tertarik pada gambar yang susunannya paling rapi atau paling acak. Susunan bukan aturannya.",
      }),
      pbhSvg: layout([figs], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5) + grids.map((g, i) => textC(at(0, i)[0], at(0, i)[1] + sz / 2 + 52, `${g.filter((x) => x === s.target).length} ${s.target}`, 16, RED)).join(""), extra: () => "", extraH: 60 }),
    };
  }
  throw new Error("FIG-BEDA-HITUNG: tidak ketemu susunan tanpa ciri pencilan lain");
}

// ── FIG-SERI-P3: gambar 1→4 dan 2→5 memakai satu transformasi, jadi 3→? memakai yang sama ────────
// Gaya siluet + `bintik`: dua aturan dengan periode berbeda. Bentuk besar berubah selang tiga ((1)→(4)), bintik kecil
// bertambah satu setiap langkah, mulai dari `bintik` di gambar (1).
export type SeriP3 = { tier: 2 | 3; key: Key; bentuk: [string, string, string]; rupa?: Rupa[]; t: T; siluet?: boolean; bintik?: number };
export const SERI_P3: SeriP3[] = [
  { tier: 2, key: "D", bentuk: ["biji", "ombak", "pucuk"], t: "r90" },
  { tier: 3, key: "A", bentuk: ["zigzag", "sulur", "kawung"], t: "mab" },
  { tier: 3, key: "C", bentuk: ["ikan", "kunci", "burung"], t: "md1" },
  { tier: 3, key: "E", bentuk: ["akantus", "kuncup", "pita"], t: "r270", siluet: true, bintik: 1 },
];
const kandidat = (t: T): [T, string][] => [
  [inv(t), "arah putarnya terbalik"], [comp(t, "mkk"), "sesudah diubah, gambar ikut dicermin kiri-kanan"],
  [isMirror(t) ? (t === "mab" ? "mkk" : t === "mkk" ? "mab" : t === "md1" ? "md2" : "md1") : comp(t, "mab"), isMirror(t) ? "garis cerminnya salah" : "sesudah diputar, gambar ikut dicermin atas-bawah"],
  ["r180", "diputar 180°"], ["tetap", "hanya menyalin gambar (3)"], ["mkk", "dicermin kiri-kanan"], ["r270", "diputar 90° berlawanan arah"],
];
const isMirror = (t: T) => t.startsWith("m");
function pengecohT(t: T, base: Fig, rupa: Rupa) {
  const out: Salah[] = [], seen = new Set([sig(ap(t, base))]);
  for (const [u, why] of kandidat(t)) {
    const f = ap(u, base);
    if (u === t || seen.has(sig(f))) continue;
    seen.add(sig(f));
    out.push({ fig: beri(rupa, f), isi: `gambar (3) ${T_NAME[u]}`, alasan: `${why}; aturan di soal ${T_NAME[t]}` });
    if (out.length === 4) break;
  }
  return out;
}
const BINTIK: Pt[] = [[35, -36], [35, -17], [35, 2], [35, 20], [35, 38], [16, 38], [-3, 38], [-22, 38], [-40, 38]];
const selBintik = (f: Fig, n: number, seed: number): Fig => [...muat(f, [-10, -10], 68), ...shuffle(rng(seed), BINTIK).slice(0, n).map((c): Prim => ({ k: "circ", c, r: 5.5, fill: "b" }))];
function seriP3Bintik(s: SeriP3, raw: Fig[], c: Fig): Draft {
  const b0 = s.bintik!, n = (i: number) => b0 + i, cel = raw.map((f, i) => selBintik(f, n(i), 50 + i));
  type SelP = { t: T; n: number };
  const K: SelP = { t: s.t, n: n(5) }, fig = (x: SelP) => selBintik(ap(x.t, c), x.n, 90 + x.n), jawab = fig(K);
  const ubah: Ubah<SelP>[] = [
    ...kandidat(s.t).filter(([u]) => u !== s.t && sig(ap(u, c)) !== sig(ap(s.t, c))).slice(0, 3).map(([u, why]): Ubah<SelP> => ({ grup: 0, ke: (x) => ({ ...x, t: u }), isi: `gambar (3) ${T_NAME[u]}`, nama: why })),
    { grup: 1, ke: (x) => ({ ...x, n: n(4) }), isi: `bintiknya ${n(4)}, sama dengan gambar (5)`, nama: "lupa menambah bintik" },
    { grup: 1, ke: (x) => ({ ...x, n: n(6) }), isi: `bintiknya ${n(6)}`, nama: "salah hitung lebih satu" },
    { grup: 1, ke: (x) => ({ ...x, n: n(2) }), isi: `bintiknya ${n(2)}, disalin dari gambar (3)`, nama: "bintik ikut pola selang tiga, padahal bintik bertambah satu tiap langkah" },
  ];
  const attr = (x: SelP) => [x.t, String(x.n)];
  const salah = pilih(attr(K), jawab, calonDari(K, ubah, attr, fig, (x) => x.n <= BINTIK.length), b0 * 11 + s.bentuk.length);
  const { opts, gugur } = pasang(jawab, salah, s.key);
  return {
    sub_type: "FIG-SERI-P3", tier: s.tier, ...SERI, key: s.key, opts, siluet: s.siluet, ciri: ciriDari(s.bentuk, "seri6-bintik"),
    stemSvg: layout([[...cel, null]], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30 }),
    pembahasan: teks({
      tanya: "gambar (6). Ada dua hal yang berubah, dan keduanya punya irama sendiri.",
      cara: ["Bentuk besar (1), (2), (3) berbeda semua, jadi bentuk besar dibandingkan selang tiga: (1) dengan (4), (2) dengan (5).", `Keduanya ${T_NAME[s.t]}, jadi bentuk besar di (6) = bentuk (3) yang ${T_NAME[s.t]}.`, `Bintik dihitung berurutan: ${[0, 1, 2, 3, 4].map(n).join(", ")}. Bertambah satu setiap langkah, jadi gambar (6) punya ${n(5)} bintik.`, "Letak bintik berpindah-pindah; yang dihitung hanya jumlahnya."],
      gugur, key: s.key, alasan: `Opsi ${s.key} satu-satunya yang bentuk besarnya ${T_NAME[s.t]} dari gambar (3) dan bintiknya ${n(5)}.`,
      analogi: "Seperti jadwal piket tiga hari yang berulang, sementara tanggal di kalender tetap maju satu hari setiap hari.",
      jebakan: "Setelah menemukan pola selang tiga, banyak orang ikut menerapkannya pada bintik. Bintik punya irama sendiri: maju satu setiap langkah.",
    }),
    pbhSvg: layout([[...cel, jawab]], { size: 96, gap: 12, hl: [0, 5], ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30, foot: [`Bentuk besar (1)→(4), (2)→(5), (3)→(6): ${T_NAME[s.t]}`, `Bintik: ${[0, 1, 2, 3, 4, 5].map(n).join(", ")}`] }),
  };
}
export function seriP3(s: SeriP3): Draft {
  const [a, b, c] = s.bentuk.map((n) => BENTUK[n]);
  const raw = [a, b, c, ap(s.t, a), ap(s.t, b)];
  T_ALL.forEach((u) => { if (u !== s.t) assert.ok(sig(ap(u, a)) !== sig(raw[3]) || sig(ap(u, b)) !== sig(raw[4]), "aturan seri tidak tunggal"); });
  if (s.bintik !== undefined) { cekBedaObjek(s.bentuk, "FIG-SERI-P3"); return seriP3Bintik(s, raw, c); }
  // Rupa ikut gambar asalnya: (1)/(4) sama rupa, (2)/(5) sama rupa, (3)/(6) sama rupa.
  const rupa = s.rupa ?? RUPA, row = raw.map((f, i) => beri(rupa[i % 3], f)), jawab = beri(rupa[2], ap(s.t, c));
  const { opts, gugur } = pasang(jawab, pengecohT(s.t, c, rupa[2]), s.key);
  return {
    sub_type: "FIG-SERI-P3", tier: s.tier, ...SERI, key: s.key, opts,
    stemSvg: layout([[...row, null]], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30 }),
    pembahasan: teks({
      tanya: "gambar (6), lanjutan dari pola selang tiga.",
      cara: ["Bentuk (1), (2), (3) berbeda semua, jadi jangan membandingkan gambar yang bersebelahan.", `Bandingkan (1) dengan (4) dan (2) dengan (5). Keduanya ${T_NAME[s.t]}.`, `Gambar (6) = gambar (3) yang ${T_NAME[s.t]}.`],
      gugur, key: s.key, alasan: `Opsi ${s.key} adalah gambar (3) yang ${T_NAME[s.t]}, sama dengan perubahan (1)→(4) dan (2)→(5).`,
      analogi: "Seperti jadwal piket tiga hari: hari keempat mengulang hari pertama, hari keenam mengulang hari ketiga.",
      jebakan: isMirror(s.t) ? "Dicermin dan diputar 180° sering terlihat mirip. Cek satu ujung bentuk: pada cermin, ujung itu tetap di sisi yang sama." : "Arah putar sering terbalik. Ikuti satu ujung bentuk dari (1) ke (4), lalu arahkan ujung yang sama di gambar (3).",
    }),
    pbhSvg: layout([[...row, jawab]], { size: 96, gap: 12, hl: [0, 5], ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30, foot: [`(1)→(4), (2)→(5), (3)→(6): ${T_NAME[s.t]}`] }),
  };
}

// ── FIG-SERI-KUADRAN: empat objek berpindah bersama; satu objek juga berubah setiap langkah ───────
export type SeriKuadran = { tier: 2 | 3; key: Key; bentuk: [string, string, string, string]; rupa?: Rupa[]; arah: 1 | -1; khusus: number; t: "r90" | "mkk" };
/** Ukuran tetap per objek (bukan per kotak), supaya tiap kotak punya objek besar dan kecil. */
const SKALA4 = [0.48, 0.32, 0.42, 0.3];
export const SERI_KUADRAN: SeriKuadran[] = [
  { tier: 2, key: "B", bentuk: ["daun", "koma", "sulur", "bulu"], arah: 1, khusus: 1, t: "mkk" },
  { tier: 3, key: "E", bentuk: ["ombak", "kait", "zigzag", "daun"], arah: -1, khusus: 2, t: "r90" },
  { tier: 3, key: "D", bentuk: ["kucing", "kail", "gasing", "layang"], arah: 1, khusus: 3, t: "mkk" },
  { tier: 3, key: "C", bentuk: ["molekul3", "ikalg", "lekuk4", "panahlengkung"], arah: -1, khusus: 0, t: "r90" },
];
function kuadran(s: SeriKuadran, langkah: number, o: { arah?: number; ubah?: T | null; tukar?: boolean } = {}): Fig {
  const arah = o.arah ?? s.arah, pos = [0, 1, 2, 3].map((i) => (((i + arah * langkah) % 4) + 4) % 4);
  if (o.tukar) { const [x, y] = [0, 1, 2, 3].filter((i) => i !== s.khusus).slice(0, 2); [pos[x], pos[y]] = [pos[y], pos[x]]; }
  return s.bentuk.flatMap((n, i) => {
    let f = BENTUK[n];
    if (i === s.khusus) {
      const u = o.ubah !== undefined ? o.ubah : s.t === "mkk" ? (langkah % 2 ? "mkk" : "tetap") : (["tetap", "r90", "r180", "r270"] as T[])[langkah % 4];
      if (u) f = ap(u, f);
    }
    return beri((s.rupa ?? RUPA)[i], geser(f, SLOT[4][pos[i]], SKALA4[i]));
  });
}
export function seriKuadran(s: SeriKuadran): Draft {
  cekKecil(s.bentuk, SKALA4);
  const Q = 3, frames = [0, 1, 2, 3, 4].map((t) => kuadran(s, t)), kunci = frames[Q];
  frames.slice(0, Q).concat(frames.slice(Q + 1)).forEach((f) => assert.notEqual(sig(f), sig(kunci), "jawaban sama dengan gambar yang terlihat"));
  const nk = s.bentuk[s.khusus];
  // Pengecoh salah di 1–2 hal (arah pindah, perubahan objek khusus, urutan objek), dipilih anti-tebak oleh `pilih`.
  type SelK = { arah: number; ubah: T; tukar: boolean };
  const uK: T = s.t === "mkk" ? (Q % 2 ? "mkk" : "tetap") : (["tetap", "r90", "r180", "r270"] as T[])[Q % 4];
  const K: SelK = { arah: s.arah, ubah: uK, tukar: false };
  const ubahK: [T, string, string][] = s.t === "mkk"
    ? [["tetap", `${nk} tidak ikut berubah`, `lupa mencermin ${nk}`], ["mab", `${nk} dicermin atas-bawah`, "salah arah cermin"]]
    : [["tetap", `${nk} tidak ikut berubah`, `lupa memutar ${nk}`], ["r90", `${nk} diputar ke arah yang salah`, "salah arah putar"], ["r180", `${nk} baru diputar dua kali`, "kurang satu langkah putaran"]];
  const ubah: Ubah<SelK>[] = [
    { grup: 0, ke: (x) => ({ ...x, arah: -s.arah }), isi: "objek bergerak ke arah sebaliknya", nama: "salah arah perpindahan" },
    ...ubahK.filter(([u]) => u !== uK).map(([u, isi, nama]): Ubah<SelK> => ({ grup: 1, ke: (x) => ({ ...x, ubah: u }), isi, nama })),
    { grup: 2, ke: (x) => ({ ...x, tukar: true }), isi: "dua objek lain bertukar tempat", nama: "urutan objek ikut berubah" },
  ];
  const attrK = (x: SelK) => [String(x.arah), x.ubah, String(x.tukar)];
  const salah = pilih(attrK(K), kunci, calonDari(K, ubah, attrK, (x) => kuadran(s, Q, x), () => true), s.khusus * 13 + s.bentuk.length);
  const { opts, gugur } = pasang(kunci, salah, s.key);
  return {
    sub_type: "FIG-SERI-KUADRAN", tier: s.tier, ...SERI, key: s.key, opts,
    stemSvg: layout([frames.map((f, i) => (i === Q ? null : f))], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30 }),
    pembahasan: teks({
      tanya: "gambar (4) pada deret empat kuadran. Gambar (5) ikut membantu memastikan aturannya.",
      cara: [`Ikuti satu objek dulu, misalnya ${s.bentuk[(s.khusus + 1) % 4]}: ia pindah satu kotak ${s.arah === 1 ? "searah" : "berlawanan arah"} jarum jam setiap langkah, begitu juga objek lain.`, `Lalu periksa bentuk tiap objek. Hanya ${nk} yang berubah: ${s.t === "mkk" ? "dicermin kiri-kanan bolak-balik" : "berputar 90° searah jarum jam"} setiap langkah.`, `Di gambar (4), ${nk} berada di kotak ${KUADRAN[(((s.khusus + Q * s.arah) % 4) + 4) % 4]}.`],
      gugur, key: s.key, alasan: `Opsi ${s.key} memenuhi dua aturan sekaligus: posisi semua objek dan bentuk ${nk}.`,
      analogi: "Seperti empat orang yang berjalan memutari meja, lalu satu di antaranya membalikkan topinya setiap kali melangkah.",
      jebakan: "Opsi yang posisinya benar belum tentu jawaban. Periksa bentuk setiap objek satu per satu.",
    }),
    pbhSvg: layout([frames], { size: 96, gap: 12, hl: [0, Q], ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30, foot: [`Semua objek pindah 1 kotak ${s.arah === 1 ? "searah" : "berlawanan arah"} jarum jam`, `${nk}: ${s.t === "mkk" ? "dicermin bolak-balik" : "berputar 90° tiap langkah"}`] }),
  };
}

