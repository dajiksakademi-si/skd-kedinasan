/**
 * Jenis soal figural bertema (Paket figural kerja ulang 2026-11-08). Satu fungsi per jenis; keadaan = parameter, gambar = aset tiu-tema.
 */
import assert from "node:assert/strict";
import type { Key } from "./figural-lib";
import { rng, shuffle } from "./tiu-bentuk";
import { type AturanPilih, type Calon, type Keadaan, analogi, anotasi, aset, bahas, deret, draft, letakkan, lingkari, matriks, opsiSvg, pilihPengecoh, taruh } from "./tiu-tema";

const md = (a: number, m: number) => ((a % m) + m) % m;
const SERI = { instruksi: "Perhatikan urutan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const kap = (t: string) => t[0].toUpperCase() + t.slice(1);
const gugurDari = (c: Calon) => `${c.n.join("; ")}.`;

/* ---------- FIG-SERI-KUADRAN bertema (prototipe bahari v3) ----------
 * Objek diam di satu kuadran, putaran bertambah 45° tiap langkah; tiga objek lain bergilir searah jarum jam melompati kotaknya;
 * objek bergilir ke-3 putar 90° berlawanan arah; objek ke-1 dicermin bolak-balik; objek ke-2 isi berganti pekat ↔ garis. */
export type SeriKuadranT = { key: Key; tema: string; diam: string; gilir: [string, string, string]; pekat: string; nama: { diam: string; gilir: [string, string, string] } };
export function seriKuadranT(s: SeriKuadranT) {
  const POS: [number, number][] = [[50, 50], [150, 50], [150, 150], [50, 150]];
  const C = [0, 2, 3]; // kotak bergilir; objek diam di kanan atas (1)
  const [A, B, Cc] = s.gilir.map((n) => aset(s.tema, n)), D = aset(s.tema, s.diam), Bp = aset(s.tema, s.pekat);
  const [nA, nB, nC] = s.nama.gilir, nD = s.nama.diam;
  const sel = (x: Keadaan) => {
    const t = [0, 1, 2].map((j) => C[md(j + +x.g, 3)]);
    const at = (q: number, body: string, p = {}) => taruh(body, POS[q][0], POS[q][1], 102, p);
    return at(1, D, { r: +x.k }) + at(t[0], A, { c: x.i ? "kk" : "" }) + at(t[1], x.o ? Bp : B) + at(t[2], Cc, { r: +x.b });
  };
  const putK = (p: number) => md((45 * p * (p + 1)) / 2, 360);
  const langkah = (p: number): Keadaan => ({ g: md(p, 3), k: putK(p), b: md(-90 * p, 360), i: p % 2, o: p % 2 });
  const N = 5, frames = [...Array(N).keys()].map(langkah), K = langkah(N);
  const SALAH: Record<string, [number, string][]> = {
    g: [[md(N - 1, 3), `${nA}, ${nB}, dan ${nC} belum dipindah satu kotak`], [md(-N, 3), "arah perpindahan terbalik"]],
    k: [[md(putK(N - 1) + 45 * (N - 1), 360), `${nD} diputar sama besar dengan langkah sebelumnya, padahal putarannya terus bertambah 45°`], [md(putK(N - 1) + 90, 360), `${nD} dianggap selalu berputar 90°`]],
    b: [[md(90 * N, 360), `${nC} diputar searah jarum jam, padahal berlawanan`], [md(-90 * (N - 1), 360), `${nC} lupa diputar`]],
    i: [[1 - +K.i, `${nA} tidak dicermin pada langkah terakhir`]],
    o: [[1 - +K.o, `isi ${nB} tidak diganti pada langkah terakhir`]],
  };
  const peng = pilihPengecoh(K, SALAH, { mudah: ["g", "k"], terlihat: frames });
  const opsi = letakkan<Calon>({ x: K, n: [] }, peng, s.key);
  const gugur = Object.fromEntries(opsi.map((o, i) => ["ABCDE"[i], o.n.length ? kap(gugurDari(o)) : ""]).filter(([, v]) => v));
  return draft({
    sub_type: "FIG-SERI-KUADRAN", ...SERI, key: s.key, tema: s.tema, aset: [s.diam, ...s.gilir, s.pekat], pbhSvg: anotasi(sel(K), POS.map(([x, y]) => [x, y, 46] as [number, number, number])),
    stemSvg: deret(frames.map(sel)), optSvgs: opsi.map((o) => opsiSvg(sel(o.x))),
    ciri: { keluarga: [s.tema], susunan: "kuadran", bentuk: [s.diam, ...s.gilir].map((n) => `${s.tema}/${n}`) },
    pembahasan: bahas({
      key: s.key,
      ditanya: "gambar (6). Empat objek, dan tiap objek punya aturannya sendiri. Periksa satu per satu.",
      langkah: [
        `${kap(nD)} tidak pernah pindah dari kanan atas, tetapi putarannya bertambah: 45°, 90°, 135°, 180° searah jarum jam. Langkah ke (6) berputar 225° lagi dari gambar (5).`,
        `${kap(nA)}, ${nB}, dan ${nC} pindah satu kotak searah jarum jam tiap langkah dan melompati kotak ${nD}.`,
        `Sambil pindah, ${nC} berputar 90° berlawanan arah jarum jam, ${nA} dicermin kiri-kanan bolak-balik, dan isi ${nB} berganti hitam pekat ↔ garis.`,
        `Letak dan ${nD} saja belum cukup, karena hampir semua opsi benar di situ. Penentunya ada di ${nA}, ${nB}, dan ${nC}.`,
      ],
      gugur,
      alasan: `hanya opsi ${s.key} yang benar di kelima aturan: letak, putaran ${nD}, putaran ${nC}, cermin ${nA}, dan isi ${nB}.`,
    }),
  });
}

export const SAWAH: SeriKuadranT = { key: "B", tema: "sawah", diam: "kerbau", gilir: ["bebek", "padi", "keong"], pekat: "padi-pekat", nama: { diam: "kerbau", gilir: ["bebek", "padi", "keong"] } };
export const BAHARI: SeriKuadranT = { key: "D", tema: "bahari", diam: "kapal", gilir: ["ikan", "ombak", "bintanglaut"], pekat: "ombak-pekat", nama: { diam: "kapal", gilir: ["ikan", "ombak", "bintang laut"] } };

/* ---------- FIG-SERI-P3 bertema ----------
 * Objek besar selang tiga: (4)=(1), (5)=(2), (6)=(3), tetapi diputar 90° berlawanan arah jarum jam.
 * Butir kecil bertambah satu tiap langkah (letak acak). Objek pojok pindah satu pojok searah jarum jam dan dicermin kiri-kanan bolak-balik. */
export type SeriP3T = { key: Key; tema: string; besar: [string, string, string]; butir: string; pojok: string; seed: number;
  nama: { besar: [string, string, string]; butir: string; pojok: string } };
export function seriP3T(s: SeriP3T) {
  const BESAR = s.besar.map((n) => aset(s.tema, n)), BUTIR = aset(s.tema, s.butir), POJOK = aset(s.tema, s.pojok);
  const PJ: [number, number][] = [[30, 30], [170, 30], [170, 170], [30, 170]];
  const SLOT: [number, number][] = [[72, 14], [100, 14], [128, 14], [186, 72], [186, 100], [186, 128], [128, 186], [100, 186], [72, 186], [14, 128], [14, 100], [14, 72]];
  const r = rng(s.seed);
  const sel = (x: Keadaan) => taruh(BESAR[+x.o], 100, 100, 144, { r: +x.r }) + taruh(POJOK, PJ[+x.q][0], PJ[+x.q][1], 54, { c: x.s ? "kk" : "" }) +
    shuffle(r, SLOT).slice(0, +x.n).map(([a, b]) => taruh(BUTIR, a, b, 22, { r: Math.floor(r() * 4) * 45 })).join("");
  const langkah = (p: number): Keadaan => ({ o: p % 3, r: p < 3 ? 0 : 270, n: p + 1, q: p % 4, s: p % 2 });
  const N = 5, frames = [...Array(N).keys()].map(langkah), K = langkah(N);
  const [b1, b2, b3] = s.nama.besar, nb = s.nama.butir, np = s.nama.pojok;
  const SALAH: Record<string, [number, string][]> = {
    o: [[0, `${b1} diambil dari gambar (4), padahal (6) berpasangan dengan (3)`], [1, `${b2} diambil dari gambar (5), padahal (6) berpasangan dengan (3)`]],
    r: [[90, `${b3} diputar searah jarum jam, padahal berlawanan`], [0, `${b3} lupa diputar`], [180, `${b3} diputar dua kali`]],
    n: [[N, `${nb} lupa ditambah, jumlahnya masih ${N}`], [N + 2, `${nb} ditambah dua, jumlahnya ${N + 2}`]],
    q: [[md(N - 1, 4), `${np} belum pindah pojok`], [md(N - 2, 4), `${np} pindah ke arah sebaliknya`]],
    s: [[1 - +K.s, `${np} tidak dicermin pada langkah terakhir`]],
  };
  const peng = pilihPengecoh(K, SALAH, { mudah: ["o", "q"], terlihat: frames });
  const opsi = letakkan<Calon>({ x: K, n: [] }, peng, s.key);
  const gugur = Object.fromEntries(opsi.map((o, i) => ["ABCDE"[i], o.n.length ? kap(gugurDari(o)) : ""]).filter(([, v]) => v));
  return draft({
    sub_type: "FIG-SERI-P3", ...SERI, key: s.key, tema: s.tema, aset: [...s.besar, s.butir, s.pojok],
    stemSvg: deret(frames.map(sel)), optSvgs: opsi.map((o) => opsiSvg(sel(o.x))),
    ciri: { keluarga: [s.tema], susunan: "selang tiga", bentuk: [...s.besar, s.pojok].map((n) => `${s.tema}/${n}`) },
    pembahasan: bahas({
      key: s.key,
      ditanya: `gambar (6). Ada tiga hal yang berubah: benda besar di tengah, ${nb}, dan ${np} di pojok.`,
      langkah: [
        `Benda besar (1), (2), (3) berbeda semua, jadi bandingkan selang tiga: (1) dengan (4), (2) dengan (5). Keduanya diputar 90° berlawanan arah jarum jam. Gambar (6) = ${b3} dari gambar (3), diputar 90° berlawanan arah jarum jam.`,
        `Hitung ${nb}: 1, 2, 3, 4, 5. Bertambah satu tiap langkah, jadi gambar (6) punya ${N + 1}. Letaknya acak, yang dihitung hanya jumlahnya.`,
        `${kap(np)} pindah satu pojok searah jarum jam tiap langkah dan dicermin kiri-kanan bolak-balik. Di gambar (6) ia ada di kanan atas dan menghadap seperti gambar (2).`,
      ],
      gugur,
      alasan: `hanya opsi ${s.key} yang benar di semua aturan: ${b3} terputar 90° berlawanan arah, ${N + 1} ${nb}, dan ${np} di kanan atas yang sudah dicermin.`,
    }),
  });
}
export const DAPUR: SeriP3T = { key: "B", tema: "dapur", besar: ["teko", "wajan", "cangkir"], butir: "bijikopi", pojok: "sendok", seed: 58, nama: { besar: ["teko", "wajan", "cangkir"], butir: "biji kopi", pojok: "sendok" } };

/** Pilih pengecoh, letakkan di huruf kunci, susun alasan tiap opsi gugur. */
function rakit(key: Key, K: Keadaan, SALAH: Record<string, [string | number, string][]>, a: AturanPilih) {
  const opsi = letakkan<Calon>({ x: K, n: [] }, pilihPengecoh(K, SALAH, a), key);
  const gugur = Object.fromEntries(opsi.map((o, i) => ["ABCDE"[i], o.n.length ? kap(gugurDari(o)) : ""]).filter(([, v]) => v));
  return { opsi, gugur };
}
const tukarWarna = (s: string) => s.replace(/#111/g, "@").replace(/#fff/g, "#111").replace(/@/g, "#fff");

/* ---------- FIG-SERI-SIFAT bertema (Al Faiz P41 no. 57, jenis baru) ----------
 * Bentuk tengah berganti-ganti tanpa urutan, yang tetap hanya SIFATnya (selalu lima lengan). Latar bergantian hitam/putih,
 * isi motif bergilir pekat-garis-bintik (periode 3), tanda kecil pindah satu pojok searah jarum jam. */
export type SeriSifatT = { key: Key; n: number; tema?: string; bentuk?: string[] };
export function seriSifatT(s: SeriSifatT) {
  const BENTUK = s.bentuk ?? ["bintang", "bunga", "tombak", "baling", "tetes"], ISI = ["pekat", "garis", "bintik"], tema = s.tema ?? "ubin", N = 5;
  const PJ: [number, number][] = [[24, 24], [176, 24], [176, 176], [24, 176]];
  const NPJ = ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"];
  const sel = (x: Keadaan, b: string) => {
    const m = aset(tema, `${b}-${x.n}-${ISI[+x.t]}`);
    return taruh(aset(tema, x.u ? "latar-putih" : "latar"), 100, 100, 192) + taruh(x.u ? m : tukarWarna(m), 100, 100, 138) + taruh(aset(tema, "tanda"), PJ[+x.q][0], PJ[+x.q][1], 34, { r: [-45, 45, 135, 225][+x.q] });
  };
  const langkah = (p: number): Keadaan => ({ u: p % 2, n: s.n, t: p % 3, q: p % 4 });
  const frames = [...Array(N).keys()].map(langkah), K = langkah(N);
  const SALAH: Record<string, [number, string][]> = {
    u: [[1 - +K.u, `latarnya ${K.u ? "hitam" : "putih"}, padahal gambar (6) giliran latar ${K.u ? "putih" : "hitam"}`]],
    n: [[s.n - 1, `motifnya punya ${s.n - 1} lengan, padahal semua gambar punya ${s.n} lengan`], [s.n + 1, `motifnya punya ${s.n + 1} lengan, padahal semua gambar punya ${s.n} lengan`]],
    t: [[md(N - 2, 3), `isi motif masih ${ISI[md(N - 2, 3)]}, seperti gambar (4)`], [md(N - 1, 3), `isi motif masih ${ISI[md(N - 1, 3)]}, seperti gambar (5)`]],
    q: [[md(N - 1, 4), "tanda kecil belum dipindah"], [md(N + 1, 4), "tanda kecil dipindah dua pojok"]],
  };
  const { opsi, gugur } = rakit(s.key, K, SALAH, { mudah: ["u", "q"], terlihat: frames });
  const bOpsi = opsi.map((_, i) => BENTUK[(i + 2) % 5]), bKunci = bOpsi["ABCDE".indexOf(s.key)];
  const pj = PJ[+K.q];
  return draft({
    sub_type: "FIG-SERI-SIFAT", ...SERI, key: s.key, tema, aset: BENTUK, stemSvg: deret(frames.map((x, i) => sel(x, BENTUK[i]))), optSvgs: opsi.map((o, i) => opsiSvg(sel(o.x, bOpsi[i]))),
    pbhSvg: anotasi(sel(K, bKunci), [[100, 100, 74], [pj[0], pj[1], 22]]),
    ciri: { keluarga: [tema], susunan: "seri sifat", bentuk: BENTUK.map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key: s.key, ditanya: "gambar (6). Bentuk tengahnya berganti-ganti tanpa urutan, jadi jangan mencari urutan bentuk. Cari yang tetap.",
      langkah: [
        `Pola warna: latar hitam dan putih bergantian. Gambar (6) berlatar ${K.u ? "putih" : "hitam"}.`,
        `Pola bentuk: jenis bentuknya tidak diperhitungkan. Yang sama dari kelima gambar adalah jumlah lengannya, selalu ${s.n}. Hitung lengan di tiap opsi.`,
        `Pola isi: pekat, garis, bintik, lalu berulang. Sesudah garis pada gambar (5), gambar (6) berisi ${ISI[+K.t]}.`,
        `Pola letak: tanda kecil pindah satu pojok searah jarum jam tiap langkah. Di gambar (6) ia ada di ${NPJ[+K.q]}.`,
      ],
      gugur, alasan: `hanya opsi ${s.key} yang berlatar ${K.u ? "putih" : "hitam"}, berlengan ${s.n}, berisi ${ISI[+K.t]}, dan tanda kecilnya di ${NPJ[+K.q]}.`,
    }),
  });
}

const ANA = { instruksi: "Perhatikan hubungan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };

/* ---------- FIG-ANA-UBAH bertema (Al Faiz P41 no. 59) ----------
 * Dua gugus benda kecil berubah jumlah (+a dan -b) lalu bertukar sisi; benda besar bawah dicermin kiri-kanan di layar. */
export type AnaUbahT = { key: Key; seed: number; tema: string; kiri: string; kanan: string; besar: string; nama: { kiri: string; kanan: string; besar: string }; a: [number, number]; b: [number, number]; c: [number, number]; cermin: string };
export function anaUbahT(s: AnaUbahT) {
  const { tema, nama: N } = s, W_ = aset(tema, s.kiri), C_ = aset(tema, s.kanan), SK = aset(tema, s.besar);
  const SLOT: [number, number][] = [[-30, -18], [0, -18], [30, -18], [-30, 18], [0, 18], [30, 18]];
  const POSE: Record<string, { r: number; c: "kk" | "" }> = { "0|": { r: 0, c: "" }, "0|kk": { r: 0, c: "kk" }, "90|": { r: 90, c: "" }, "270|kk": { r: 270, c: "kk" }, "90|kk": { r: 90, c: "kk" } };
  const r = rng(s.seed), urut = (n: number) => shuffle(r, SLOT).slice(0, n);
  const gugus = (body: string, cx: number, n: number) => urut(n).map(([a, b]) => taruh(body, cx + a, 50 + b, 34)).join("");
  const sel = (x: Keadaan) => gugus(W_, x.t ? 148 : 52, +x.w) + gugus(C_, x.t ? 52 : 148, +x.c) + taruh(SK, 100, 150, 96, POSE[String(x.m)]);
  const dW = s.b[0] - s.a[0], dC = s.a[1] - s.b[1], wK = s.c[0] + dW, cK = s.c[1] - dC;
  assert.ok(dW > 1 && dC > 1 && s.b[0] % s.a[0] !== 0 && s.a[1] % s.b[1] !== 0, "tafsir kali/bagi tidak gugur");
  const a: Keadaan = { w: s.a[0], c: s.a[1], t: 0, m: "0|" }, b: Keadaan = { w: s.b[0], c: s.b[1], t: 1, m: "0|kk" }, c: Keadaan = { w: s.c[0], c: s.c[1], t: 0, m: "90|" }, K: Keadaan = { w: wK, c: cK, t: 1, m: "270|kk" };
  const SALAH: Record<string, [string | number, string][]> = {
    w: [[s.c[0], `${N.kiri} lupa ditambah, masih ${s.c[0]}`], [wK - 1, `${N.kiri} hanya ditambah ${dW - 1}`], [wK + 1, `${N.kiri} ditambah ${dW + 1}`]],
    c: [[s.c[1], `${N.kanan} lupa dikurangi, masih ${s.c[1]}`], [cK + 1, `${N.kanan} hanya dikurangi ${dC - 1}`], [cK - 1, `${N.kanan} dikurangi ${dC + 1}`]],
    t: [[0, `${N.kiri} dan ${N.kanan} belum bertukar sisi`]],
    m: [["90|", `${N.besar} belum dicermin`], ["90|kk", `${N.besar} dibalik atas-bawah, padahal yang benar dicermin kiri-kanan`]],
  };
  const { opsi, gugur } = rakit(s.key, K, SALAH, { mudah: ["t", "m"], terlihat: [a, b, c] });
  return draft({
    sub_type: "FIG-ANA-UBAH", ...ANA, key: s.key, tema, aset: [s.kiri, s.kanan, s.besar], stemSvg: analogi(sel(a), sel(b), sel(c)), optSvgs: opsi.map((o) => opsiSvg(sel(o.x))),
    pbhSvg: anotasi(sel(K), [[148, 50, 44], [52, 50, 44], [100, 150, 46]]),
    ciri: { keluarga: [tema], susunan: "analogi ubah", bentuk: [s.besar, s.kiri, s.kanan].map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key: s.key, ditanya: "gambar (4). Bandingkan (1) dengan (2) per benda, lalu pakai perubahan yang sama pada (3).",
      langkah: [
        `Pola jumlah: ${N.kiri} dari ${s.a[0]} menjadi ${s.b[0]}, berarti ditambah ${dW}. ${kap(N.kanan)} dari ${s.a[1]} menjadi ${s.b[1]}, berarti dikurangi ${dC}. Susunan butirnya tidak diperhitungkan, yang dihitung jumlahnya.`,
        `Di gambar (3) ada ${s.c[0]} ${N.kiri} dan ${s.c[1]} ${N.kanan}, jadi gambar (4) berisi ${wK} ${N.kiri} dan ${cK} ${N.kanan}.`,
        `Pola letak: ${N.kiri} dan ${N.kanan} bertukar sisi. ${kap(N.kiri)} sekarang di kanan atas, ${N.kanan} di kiri atas.`,
        `Pola cermin: ${N.besar} dicermin kiri-kanan. ${s.cermin}`,
      ],
      gugur, alasan: `hanya opsi ${s.key} yang berisi ${wK} ${N.kiri} di kanan, ${cK} ${N.kanan} di kiri, dan ${N.besar} yang sudah dicermin kiri-kanan.`,
    }),
  });
}
const KEBUN: AnaUbahT = { key: "A", seed: 59, tema: "kebun", kiri: "wortel", kanan: "cabai", besar: "sekop", nama: { kiri: "wortel", kanan: "cabai", besar: "sekop" }, a: [3, 5], b: [5, 3], c: [2, 6], cermin: "Mata sekop di gambar (3) menghadap kiri atas, jadi di gambar (4) menghadap kanan atas." };
const HUTAN: AnaUbahT = { key: "D", seed: 159, tema: "hutan", kiri: "buahpinus", kanan: "bulu", besar: "kapak", nama: { kiri: "buah pinus", kanan: "bulu", besar: "kapak" }, a: [2, 6], b: [5, 4], c: [1, 5], cermin: "Kepala kapak di gambar (3) ada di kanan bawah, jadi di gambar (4) ada di kiri bawah." };

/* ---------- FIG-ANA-OBJ bertema (Al Faiz P41 no. 60) ----------
 * Empat satwa di kuadran. Dua satwa diagonal bertukar tempat (burung dicermin sekaligus), siput berganti isi, kura berputar 90° searah jarum jam. */
export type AnaObjT = { key: Key; tema: string; a: string; s: string; k: string; t: string; nama: { a: string; s: string; k: string; t: string }; cermin: string; hasil: string };
export function anaObjT(o: AnaObjT) {
  const { key, tema, nama: N } = o, POS: [number, number][] = [[52, 52], [148, 52], [52, 148], [148, 148]];
  const at = (q: number, n: string, p = {}) => taruh(aset(tema, n), POS[q][0], POS[q][1], 92, p);
  const sel = (x: Keadaan) => at(x.p ? 3 : 0, o.a, { c: x.b ? "kk" : "" }) + at(1, x.s ? `${o.s}-garis` : o.s) + at(2, o.k, { r: +x.k }) + at(x.p ? 0 : 3, o.t);
  const a: Keadaan = { p: 0, b: 0, s: 0, k: 0 }, b: Keadaan = { p: 1, b: 1, s: 1, k: 90 }, c: Keadaan = { p: 0, b: 1, s: 1, k: 180 }, K: Keadaan = { p: 1, b: 0, s: 0, k: 270 };
  const SALAH: Record<string, [number, string][]> = {
    p: [[0, `${N.a} dan ${N.t} belum bertukar tempat`]],
    b: [[1, `${N.a} tidak dicermin`]],
    s: [[1, `isi ${N.s} tidak diganti`]],
    k: [[180, `${N.k} lupa diputar`], [90, `${N.k} diputar berlawanan arah jarum jam`]],
  };
  const { opsi, gugur } = rakit(key, K, SALAH, { mudah: ["p"], terlihat: [a, b, c] });
  const daftar = [o.a, o.s, o.k, o.t];
  return draft({
    sub_type: "FIG-ANA-OBJ", ...ANA, key, tema, aset: daftar, stemSvg: analogi(sel(a), sel(b), sel(c)), optSvgs: opsi.map((x) => opsiSvg(sel(x.x))),
    pbhSvg: anotasi(sel(K), [[148, 148, 45], [148, 52, 45], [52, 148, 45]]),
    ciri: { keluarga: [tema], susunan: "analogi objek", bentuk: daftar.map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key, ditanya: "gambar (4). Ada empat benda, dan tiap benda punya perubahannya sendiri dari (1) ke (2).",
      langkah: [
        `Pola letak: ${N.a} dan ${N.t} bertukar tempat pada garis miring. ${kap(N.s)} dan ${N.k} tidak pindah.`,
        `Pola cermin: ${N.a} dicermin kiri-kanan. ${o.cermin}`,
        `Pola isi: isi ${N.s} berganti antara hitam pekat dan garis. ${kap(N.s)} di gambar (3) bergaris, jadi di gambar (4) pekat.`,
        `Pola putar: ${N.k} berputar 90° searah jarum jam. ${kap(N.t)} hanya pindah, bentuknya tidak diperhitungkan.`,
      ],
      gugur, alasan: `hanya opsi ${key} yang ${o.hasil}, ${N.s}nya pekat, dan ${N.k}nya terputar 90° searah jarum jam dari gambar (3).`,
    }),
  });
}
const SATWA_OBJ: AnaObjT = { key: "E", tema: "satwa", a: "burung", s: "siput", k: "kura", t: "tupai", nama: { a: "burung", s: "siput", k: "kura-kura", t: "tupai" }, cermin: "Burung di gambar (3) menghadap kiri, jadi di gambar (4) menghadap kanan.", hasil: "burungnya pindah dan menghadap kanan" };
const TUMBUHAN_OBJ: AnaObjT = { key: "C", tema: "tumbuhan", a: "kaktus", s: "daun", k: "tulip", t: "jamur", nama: { a: "kaktus", s: "daun", k: "tulip", t: "jamur" }, cermin: "Lengan tinggi kaktus di gambar (3) ada di kiri, jadi di gambar (4) ada di kanan.", hasil: "kaktusnya pindah dan lengan tingginya di kanan" };

const BEDA = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };

/* ---------- FIG-BEDA-HITUNG bertema (Al Faiz P41 no. 61) ----------
 * Empat opsi: jumlah apel = jumlah pisang. Satu opsi tidak sama. Manggis dan letak buah hanya pengalih. */
export type BedaHitungT = { tema: string; a: string; p: string; m: string; na: string; np: string; nm: string; sama: [number, number, number][]; kunci: [number, number, number] };
const BUAH: BedaHitungT = { tema: "buah", a: "apel", p: "pisang", m: "manggis", na: "apel", np: "pisang", nm: "manggis", sama: [[2, 2, 5], [3, 3, 2], [4, 4, 3], [3, 3, 4]], kunci: [3, 4, 2] };
const BIJI: BedaHitungT = { tema: "biji", a: "kacang", p: "jagung", m: "kenari", na: "kacang", np: "jagung", nm: "kenari", sama: [[3, 3, 4], [2, 2, 3], [4, 4, 2], [3, 3, 1]], kunci: [4, 3, 3] };
export function bedaHitungT(key: Key, seed: number, s: BedaHitungT = BUAH) {
  const tema = s.tema, r = rng(seed);
  const SLOT: [number, number][] = [31, 77, 123, 169].flatMap((y) => [31, 77, 123, 169].map((x) => [x, y] as [number, number]));
  const SAMA = s.sama, KUNCI = s.kunci;
  const semua = [...SAMA, KUNCI], ciri: ((t: number[]) => number)[] = [(t) => t[0], (t) => t[1], (t) => t[2], (t) => t[0] + t[1] + t[2], (t) => (t[0] + t[1] + t[2]) % 2, (t) => t[2] % 2];
  for (const f of ciri) assert.ok(semua.filter((t) => f(t) === f(KUNCI)).length > 1, "ciri sederhana menyendirikan opsi berbeda");
  const atur = ([a, p, m]: number[]) => {
    const jenis = [...Array(a).fill(s.a), ...Array(p).fill(s.p), ...Array(m).fill(s.m)] as string[];
    const tempat = shuffle(r, SLOT).slice(0, jenis.length);
    return jenis.map((n, i) => ({ n, x: tempat[i][0] + Math.round(r() * 6 - 3), y: tempat[i][1] + Math.round(r() * 6 - 3), u: Math.floor(r() * 8) * 45 }));
  };
  const lukis = (b: ReturnType<typeof atur>) => b.map((o) => taruh(aset(tema, o.n), o.x, o.y, 45, { r: o.u })).join("");
  const opsi = letakkan(KUNCI as number[], SAMA as number[][], key), isi = opsi.map(atur);
  const gugur = Object.fromEntries(opsi.map(([a], i) => ["ABCDE"[i], `${kap(s.na)} dan ${s.np}nya sama banyak, masing-masing ${a}.`]).filter((_, i) => "ABCDE"[i] !== key));
  const kk = isi["ABCDE".indexOf(key)];
  return draft({
    sub_type: "FIG-BEDA-HITUNG", ...BEDA, key, tema, aset: [s.a, s.p, s.m], stemSvg: "", optSvgs: isi.map((b) => opsiSvg(lukis(b))),
    pbhSvg: anotasi(lukis(kk), kk.filter((o) => o.n !== s.m).map((o) => [o.x, o.y, 25, o.n === s.a ? "#d92d20" : "#1570ef"])),
    ciri: { keluarga: [tema], susunan: "beda hitung", bentuk: [s.a, s.p, s.m].map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key, ditanya: "satu gambar yang aturannya lain dari empat gambar lainnya.",
      langkah: [
        `Pola jumlah: hitung ${s.na} dan ${s.np} di tiap gambar, lalu bandingkan keduanya. Di empat gambar jumlahnya sama.`,
        `${kap(s.nm)}, letak benda, dan arah miringnya tidak diperhitungkan. Jumlah seluruh benda juga bukan penentunya, karena ada gambar lain yang jumlah seluruh bendanya sama.`,
      ],
      gugur, alasan: `hanya opsi ${key} yang jumlahnya tidak sama: ${s.na} ${KUNCI[0]} dan ${s.np} ${KUNCI[1]}.`,
    }),
  });
}

/* ---------- FIG-BEDA-TUMPUK bertema (Al Faiz P41 no. 62, aturan pasangan versi D'Ajiks) ----------
 * Benda besar bergaris + kembarannya yang kecil pekat, dua hiasan di pojok berseberangan.
 * Empat opsi taat pasangan: kecil di depan <-> hiasan sama besar; kecil di belakang <-> hiasan beda besar. Tiap ciri sendiri tidak menyendirikan opsi berbeda. */
export type BedaTumpukT = { tema: string; bentuk: string[]; ges: [number, number][]; kata: string };
const TUKANG: BedaTumpukT = { tema: "tukang", bentuk: ["palu", "tang", "kunci", "gergaji", "obeng"], ges: [[12, 28], [26, 30], [20, 28], [-24, -14], [26, -20]], kata: "alat" };
const GERABAH: BedaTumpukT = { tema: "gerabah", bentuk: ["kendi", "guci", "vas", "periuk", "labu"], ges: [[44, 26], [36, -16], [38, 22], [30, 46], [32, -18]], kata: "gerabah" };
export function bedaTumpukT(key: Key, s: BedaTumpukT = TUKANG) {
  const tema = s.tema, BENTUK = s.bentuk, NAMA: Record<number, string> = { 1: "di depan", 0: "di belakang" };
  type O = { d: number; h: number; p: number };
  const K: O = { d: 1, h: 0, p: 1 }, LAIN: O[] = [{ d: 1, h: 1, p: 0 }, { d: 0, h: 0, p: 1 }, { d: 1, h: 1, p: 1 }, { d: 0, h: 0, p: 0 }];
  const opsi = letakkan<O>(K, LAIN, key);
  for (const f of ["d", "h", "p"] as const) assert.ok(opsi.filter((o) => o[f] === K[f]).length > 1, `ciri ${f} menyendirikan opsi berbeda`);
  const GES = s.ges; // tepat di garis tepi benda besar, urut BENTUK
  const PJ: [number, number, number][][] = [[[30, 30, 0], [170, 170, 180]], [[170, 30, 90], [30, 170, 270]]];
  const sel = (o: O, i: number) => {
    const b = BENTUK[i], [gx, gy] = GES[i], kecil = taruh(aset(tema, b), 100 + gx, 100 + gy, 72), besar = taruh(aset(tema, `${b}-garis`), 100, 100, 140);
    const [u1, u2] = o.h ? [42, 42] : [54, 30];
    const hias = PJ[o.p].map(([x, y, r], j) => taruh(aset(tema, "sulur"), x, y, j ? u2 : u1, { r })).join("");
    return (o.d ? besar + kecil : kecil + besar) + hias;
  };
  const ki = "ABCDE".indexOf(key), [gx, gy] = GES[ki];
  const gugur = Object.fromEntries(opsi.map((o, i) => ["ABCDE"[i], `Benda kecil ${NAMA[o.d]} dan hiasannya ${o.h ? "sama besar" : "beda besar"}, jadi mengikuti pasangan yang berlaku.`]).filter((_, i) => i !== ki));
  return draft({
    sub_type: "FIG-BEDA-TUMPUK", ...BEDA, key, tema, aset: BENTUK, stemSvg: "", optSvgs: opsi.map((o, i) => opsiSvg(sel(o, i))),
    pbhSvg: anotasi(sel(K, ki), [[100 + gx, 100 + gy, 40], ...PJ[K.p].map(([x, y]) => [x, y, 26] as [number, number, number])]),
    ciri: { keluarga: [tema], susunan: "beda tumpuk", bentuk: BENTUK.map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key, ditanya: `satu gambar yang aturannya lain dari empat gambar lainnya. Jenis ${s.kata}nya berbeda semua, jadi jangan melihat jenisnya.`,
      langkah: [
        "Pola tumpuk: lihat benda kecil yang hitam. Ada yang di depan benda besar, ada yang di belakang.",
        "Pola ukuran: lihat dua hiasan di pojok. Ada yang sama besar, ada yang beda besar.",
        "Gabungkan keduanya. Kalau benda kecil di depan, hiasannya sama besar. Kalau di belakang, hiasannya beda besar. Letak pojok hiasan tidak diperhitungkan.",
      ],
      gugur, alasan: `hanya opsi ${key} yang benda kecilnya di depan, tetapi hiasannya beda besar.`,
    }),
  });
}

const POLA = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };

/* ---------- FIG-MTX-PUTAR bertema (Al Faiz P41 no. 63) ----------
 * Tiap baris satu benda besar. Kolom 1->2 putar 90 derajat searah jarum jam, kolom 2->3 dibalik atas-bawah.
 * Tetes di pojok: pindah satu pojok searah jarum jam (baris maupun kolom), jumlah = nomor kolom, isi berganti pekat/garis. */
export type MtxPutarT = { tema: string; besar: [string, string, string]; nama: [string, string, string]; dasar: [number, number, number]; butir: string; nb: string };
const CUACA: MtxPutarT = { tema: "cuaca", besar: ["awanpetir", "payung", "kincir"], nama: ["awan petir", "payung", "kincir angin"], dasar: [0, 90, 180], butir: "tetes", nb: "tetes" };
const ALAM: MtxPutarT = { tema: "alam", besar: ["gunung", "pohonmiring", "karang"], nama: ["gunung", "pohon", "karang"], dasar: [90, 0, 270], butir: "kerikil", nb: "kerikil" };
export function mtxPutarT(key: Key, s: MtxPutarT = CUACA) {
  const { tema, besar: BESAR, dasar: DASAR, nama: NAMA, nb } = s, n3 = NAMA[2];
  const poseStr = (r: number, c: number) => { const rb = DASAR[r]; return c === 0 ? `${rb}|` : c === 1 ? `${md(rb + 90, 360)}|` : `${md(-(rb + 90), 360)}|ab`; };
  const urai = (x: string | number) => { const [r, c] = String(x).split("|"); return { r: +r, c: c as "" | "ab" | "kk" }; };
  const pos = (q: number, k: number): [number, number] => { const atas = q < 2, kiri = q === 0 || q === 3; return [kiri ? 20 + k * 24 : 180 - k * 24, atas ? 20 : 180]; };
  const sel = (o: number, x: Keadaan) => taruh(aset(tema, BESAR[o]), 100, 100, 128, urai(x.p)) + Array.from({ length: +x.n }, (_, k) => { const [a, b] = pos(+x.q, k); return taruh(aset(tema, x.i ? `${s.butir}-garis` : s.butir), a, b, 25); }).join("");
  const keadaan = (r: number, c: number): Keadaan => ({ p: poseStr(r, c), q: md(r + c, 4), i: (r + c) % 2, n: c + 1 });
  const K = keadaan(2, 2), SALAH: Record<string, [string | number, string][]> = {
    p: [[poseStr(2, 1), `${n3} belum dibalik atas-bawah, masih seperti kolom 2`], [`${md(-(DASAR[2] + 90), 360)}|kk`, `${n3} dicermin kiri-kanan, padahal seharusnya dibalik atas-bawah`], [`${DASAR[2]}|ab`, `${n3} dibalik atas-bawah tanpa diputar dulu`]],
    q: [[md(K.q as number - 1, 4), `${nb} belum pindah pojok`], [md(K.q as number + 1, 4), `${nb} pindah ke arah sebaliknya`]],
    i: [[1 - +K.i, `isi ${nb} salah giliran`]],
    n: [[2, `${nb} hanya 2, padahal jumlahnya sama dengan nomor kolom`], [4, `${nb} 4, padahal kolom 3 berisi 3`]],
  };
  const terlihat = [0, 1].map((c) => keadaan(2, c));
  const { opsi, gugur } = rakit(key, K, SALAH, { mudah: ["q"], terlihat });
  const NPJ = ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"][+K.q];
  return draft({
    sub_type: "FIG-MTX-PUTAR", ...POLA, key, tema, aset: [...BESAR],
    stemSvg: matriks([0, 1, 2].map((r) => [0, 1, 2].map((c) => (r === 2 && c === 2 ? "" : sel(r, keadaan(r, c)))))), optSvgs: opsi.map((o) => opsiSvg(sel(2, o.x))),
    pbhSvg: anotasi(sel(2, K), [[100, 100, 66], [pos(+K.q, 1)[0], pos(+K.q, 1)[1], 26]]),
    ciri: { keluarga: [tema], susunan: "matriks putar", bentuk: BESAR.map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key, ditanya: `gambar di baris 3 kolom 3. Baca per baris. Tiap baris punya satu benda besar: ${NAMA.join(", ")}.`,
      langkah: [
        "Pola putar: dari kolom 1 ke kolom 2, benda besar berputar 90° searah jarum jam.",
        "Pola cermin: dari kolom 2 ke kolom 3, benda besar dibalik atas-bawah.",
        `Pola letak: ${nb} pindah satu pojok searah jarum jam tiap kolom dan tiap baris. Di baris 3 kolom 3 ${nb} ada di ${NPJ}.`,
        `Pola jumlah: banyak ${nb} sama dengan nomor kolom, jadi kolom 3 berisi 3. Pola isi: pekat dan garis bergantian, jadi di sini ${K.i ? "garis" : "pekat"}.`,
      ],
      gugur, alasan: `hanya opsi ${key} yang ${n3}nya sudah diputar lalu dibalik atas-bawah, dengan 3 ${nb} ${K.i ? "garis" : "pekat"} di ${NPJ}.`,
    }),
  });
}

/* ---------- FIG-MTX-HITUNG bertema (Al Faiz P41 no. 64) ----------
 * Per baris ke kanan: kupu +1, kumbang -1, daun +2. Letak dan arah acak, tidak diperhitungkan. */
export type MtxHitungT = { tema: string; a: string; b: string; c: string; na: string; nb: string; nc: string; b0: number[][] };
const SERANGGA: MtxHitungT = { tema: "serangga", a: "kupu", b: "kumbang", c: "daun", na: "kupu", nb: "kumbang", nc: "daun", b0: [[1, 6, 1], [2, 5, 2], [3, 4, 0]] };
const KOLAM: MtxHitungT = { tema: "kolam", a: "ikanmas", b: "capung", c: "teratai", na: "ikan", nb: "capung", nc: "teratai", b0: [[2, 6, 0], [1, 5, 3], [2, 5, 1]] };
export function mtxHitungT(key: Key, seed: number, s: MtxHitungT = SERANGGA) {
  const { tema, b0: B0, na, nb, nc } = s, r = rng(seed);
  const SLOT: [number, number][] = [31, 77, 123, 169].flatMap((y) => [31, 77, 123, 169].map((x) => [x, y] as [number, number]));
  const keadaan = (b: number, k: number): Keadaan => ({ n: B0[b][0] + k, m: B0[b][1] - k, d: B0[b][2] + 2 * k });
  const WARNA: Record<string, string> = { [s.a]: "#d92d20", [s.b]: "#1570ef", [s.c]: "#079455" };
  const atur = (x: Keadaan) => {
    const jenis = [...Array(+x.n).fill(s.a), ...Array(+x.m).fill(s.b), ...Array(+x.d).fill(s.c)] as string[], t = shuffle(r, SLOT);
    assert.ok(jenis.length <= SLOT.length, "benda melebihi tempat");
    return jenis.map((n, i) => ({ n, x: t[i][0] + Math.round(r() * 6 - 3), y: t[i][1] + Math.round(r() * 6 - 3), u: Math.floor(r() * 8) * 45 }));
  };
  const lukis = (b: ReturnType<typeof atur>) => b.map((o) => taruh(aset(tema, o.n), o.x, o.y, 42, { r: o.u })).join("");
  const K = keadaan(2, 2), r0 = keadaan(2, 0), r1 = keadaan(2, 1), n = +K.n, m = +K.m, d = +K.d;
  const SALAH: Record<string, [number, string][]> = {
    n: [[n - 1, `${na} belum ditambah, masih ${n - 1}`], [n + 1, `${na} ditambah 2, padahal hanya 1`]],
    m: [[m + 1, `${nb} belum dikurangi, masih ${m + 1}`], [m - 1, `${nb} dikurangi 2, padahal hanya 1`], [m + 2, `${nb} malah ditambah, padahal berkurang`]],
    d: [[d - 2, `${nc} belum ditambah, masih ${d - 2}`], [d - 1, `${nc} hanya ditambah 1, padahal 2`], [d + 2, `${nc} ditambah 4, padahal 2`]],
  };
  const { opsi, gugur } = rakit(key, K, SALAH, { mudah: [], terlihat: [r0, r1] });
  const kk = atur(K), isi = opsi.map((o) => (o.n.length ? atur(o.x) : kk));
  return draft({
    sub_type: "FIG-MTX-HITUNG", ...POLA, key, tema, aset: [s.a, s.b, s.c],
    stemSvg: matriks([0, 1, 2].map((b) => [0, 1, 2].map((k) => (b === 2 && k === 2 ? "" : lukis(atur(keadaan(b, k))))))), optSvgs: isi.map((b) => opsiSvg(lukis(b))),
    pbhSvg: anotasi(lukis(kk), kk.map((o) => [o.x, o.y, 22, WARNA[o.n]])),
    ciri: { keluarga: [tema], susunan: "matriks hitung", bentuk: [s.a, s.b, s.c].map((x) => `${tema}/${x}`) },
    pembahasan: bahas({
      key, ditanya: "gambar di baris 3 kolom 3. Baca per baris dari kiri ke kanan, lalu hitung tiap jenis benda.",
      langkah: [
        `Pola jumlah ${na}: bertambah 1 tiap kolom. Baris 3 berisi ${r0.n}, ${r1.n}, jadi kolom 3 berisi ${n}.`,
        `Pola jumlah ${nb}: berkurang 1 tiap kolom. Baris 3 berisi ${r0.m}, ${r1.m}, jadi kolom 3 berisi ${m}.`,
        `Pola jumlah ${nc}: bertambah 2 tiap kolom. Baris 3 berisi ${r0.d}, ${r1.d}, jadi kolom 3 berisi ${d}.`,
        "Letak dan arah benda tidak diperhitungkan, yang dihitung hanya jumlahnya.",
      ],
      gugur, alasan: `hanya opsi ${key} yang berisi ${n} ${na}, ${m} ${nb}, dan ${d} ${nc}.`,
    }),
  });
}

/* ---------- FIG-MTX-GESER bertema (Al Faiz P41 no. 65, jenis baru) ----------
 * Tiga kelompok (dua bangunan kembar + benda kecil) bergeser satu kolom tiap baris. Tiap kelompok berubah tepat sekali;
 * sel berubah tersebar satu per baris dan per kolom. Berubah = bangunan atas dibalik atas-bawah + benda kecil pindah kiri->kanan dan dicermin. */
export type MtxGeserT = { tema: string; g: string[][]; nama: string[][]; q: [number, number]; lain: [number, number][] };
const KAMPUNG: MtxGeserT = { tema: "kampung", g: [["rumah", "pohon"], ["lumbung", "sumur"], ["pondok", "ayam"]], nama: [["rumah", "pohon kelapa"], ["lumbung", "sumur"], ["pondok", "ayam"]], q: [1, 0], lain: [[0, 2], [2, 1]] };
const TAMAN: MtxGeserT = { tema: "taman", g: [["cemara", "batu"], ["beringin", "semak"], ["palem", "rumput"]], nama: [["cemara", "batu"], ["beringin", "semak"], ["palem", "rumput"]], q: [0, 1], lain: [[1, 2], [2, 0]] };
export function mtxGeserT(key: Key, s: MtxGeserT = KAMPUNG) {
  const { tema, g: G, nama: NAMA, q: Q } = s, WARNA = ["#d92d20", "#f79009", "#079455"], grup = (b: number, k: number) => (b + k) % 3;
  const berubah = [Q, ...s.lain], UBAH = new Set(berubah.map(([b, k]) => `${b},${k}`));
  assert.equal(new Set(berubah.map(([b]) => b)).size, 3, "sel berubah harus satu per baris");
  assert.equal(new Set(berubah.map(([, k]) => k)).size, 3, "sel berubah harus satu per kolom");
  assert.equal(new Set(berubah.map(([b, k]) => grup(b, k))).size, 3, "tiap kelompok berubah tepat sekali");
  const sel = (g: number, x: Keadaan) => taruh(aset(tema, G[g][0]), 100, 54, 80, { c: x.a ? "ab" : "" }) + taruh(aset(tema, G[g][0]), 100, 146, 80, { c: x.b ? "ab" : "" }) + taruh(aset(tema, G[g][1]), x.s ? 172 : 28, 100, 50, { c: x.m ? "kk" : "" });
  const tetap: Keadaan = { a: 0, b: 0, s: 0, m: 0 }, K: Keadaan = { a: 1, b: 0, s: 1, m: 1 };
  const SALAH: Record<string, [number, string][]> = {
    a: [[0, "benda besar atas tidak dibalik"]], b: [[1, "benda besar bawah ikut dibalik, padahal tetap tegak"]],
    s: [[0, "benda kecil tidak pindah ke kanan"]], m: [[0, "benda kecil tidak dicermin"]],
  };
  const { opsi, gugur } = rakit(key, K, SALAH, { mudah: ["s"] });
  const gKunci = grup(...Q), [nb, nk] = NAMA[gKunci];
  const stem = (b: number, k: number) => sel(grup(b, k), UBAH.has(`${b},${k}`) ? K : tetap);
  const anot = (b: number, k: number) => stem(b, k) + lingkari([[100, 100, 90, WARNA[grup(b, k)]], ...(UBAH.has(`${b},${k}`) ? [[100, 54, 42, "#1570ef"], [172, 100, 26, "#1570ef"]] as [number, number, number, string][] : [])]);
  const sudah = s.lain.map(([b, k]) => `${kap(NAMA[grup(b, k)][0])} berubah di baris ${b + 1} kolom ${k + 1}`).join(", dan ");
  return draft({
    sub_type: "FIG-MTX-GESER", ...POLA, key, tema, aset: G.flat(), stemSvg: matriks([0, 1, 2].map((b) => [0, 1, 2].map((k) => stem(b, k))), Q), optSvgs: opsi.map((o) => opsiSvg(sel(gKunci, o.x))),
    pbhSvg: matriks([0, 1, 2].map((b) => [0, 1, 2].map((k) => anot(b, k))), null),
    ciri: { keluarga: [tema], susunan: "matriks geser", bentuk: G.flat().map((n) => `${tema}/${n}`) },
    pembahasan: bahas({
      key, ditanya: `gambar di baris ${Q[0] + 1} kolom ${Q[1] + 1}. Semua opsi berisi ${nb} dan ${nk}, jadi yang menentukan adalah keadaannya.`,
      langkah: [
        `Pola geser: ada tiga kelompok, yaitu ${NAMA.map(([x, y]) => `${x} dengan ${y}`).join(", ")}. Tiap baris memuat ketiganya, dan letaknya bergeser satu kolom tiap baris. Tanda tanya berisi kelompok ${nb}.`,
        `Pola perubahan: tiap kelompok muncul tiga kali, dua kali tetap dan satu kali berubah. ${sudah}. ${kap(nb)} belum pernah berubah, jadi tanda tanya harus yang berubah.`,
        "Cara berubah: benda besar atas dibalik atas-bawah, benda besar bawah tetap tegak, dan benda kecil pindah dari kiri ke kanan lalu dicermin kiri-kanan.",
      ],
      gugur, alasan: `hanya opsi ${key} yang ${nb} atasnya terbalik, ${nb} bawahnya tegak, dan ${nk} sudah pindah ke kanan dalam keadaan tercermin.`,
    }),
  });
}

/** Paket figural bertema (no. 57–65). Diisi bertahap; urutan = urutan soal. */
export const PAKET_TEMA: Record<string, () => ReturnType<typeof draft>[]> = {
  "Paket 1": () => [seriSifatT({ key: "C", n: 5 }), seriKuadranT(BAHARI), anaUbahT(KEBUN), anaObjT(SATWA_OBJ), bedaHitungT("B", 61), bedaTumpukT("D"), mtxPutarT("A"), mtxHitungT("C", 64), mtxGeserT("E")],
  "Paket 2": () => [seriSifatT({ key: "A", n: 6, tema: "mozaik", bentuk: ["gumpal", "ikal", "gelombang", "tetes", "lonjong"] }), seriKuadranT(SAWAH), anaUbahT(HUTAN), anaObjT(TUMBUHAN_OBJ), bedaHitungT("E", 161, BIJI), bedaTumpukT("A", GERABAH), mtxPutarT("B", ALAM), mtxHitungT("E", 164, KOLAM), mtxGeserT("D", TAMAN)],
};
