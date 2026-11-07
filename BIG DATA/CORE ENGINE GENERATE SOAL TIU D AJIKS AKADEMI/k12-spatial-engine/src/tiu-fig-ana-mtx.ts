import assert from "node:assert/strict";
import { type Fig, type Key, type Prim, type Pt, KEYS, sig } from "./figural-lib";
import { type Draft, layout } from "./k12-spasial-core";
import { type Rupa, type Salah, type T, type Ubah, BENTUK, HITAM, KUADRAN, NAMA_PETAK, PETAK, TEBAL_MIN, cekBedaObjek, ciriDari, tebal, RUPA, TATA, T_ALL, T_NAME, ap, beri, calonDari, cekKecil, comp, geser, inv, pasang, pilih, tata } from "./tiu-bentuk";
import { teks } from "./tiu-fig-beda-seri";
import { balikWarna } from "./tiu-gaya";

// TIU SKD — analogi per objek (Al Faiz Paket 41 no. 59–60) dan matriks putar/cermin (Part 39 no. 64–65, Paket 41 no. 63).
// Bukti kunci: semua tafsir transformasi yang cocok dengan sel terlihat harus memberi jawaban yang sama.

const ANALOGI = { instruksi: "Perhatikan hubungan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const POLA = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const lawan = (t: T): T => ({ tetap: "mkk", r90: "r270", r270: "r90", r180: "tetap", mkk: "mab", mab: "mkk", md1: "md2", md2: "md1" } as Record<T, T>)[t];

// ── FIG-ANA-OBJ: (1):(2) = (3):(4), setiap objek dalam sel punya perubahan sendiri ──────────────
// Perubahan = transformasi persegi, bisa ditambah "+warna" (hitam penuh ↔ garis, Al Faiz no. 59).
// `tukar` = dua objek bertukar tempat di sel hasil (Al Faiz no. 65: objek kiri pindah ke kanan).
export type Op = T | `${T}+warna`;
const pecah = (o: Op): [T, boolean] => [o.split("+")[0] as T, o.endsWith("+warna")];
const apOp = (o: Op, f: Fig) => { const [t, w] = pecah(o); const g = ap(t, f); return w ? balikWarna(g) : g; };
const invOp = (o: Op): Op => { const [t, w] = pecah(o); return (w ? `${inv(t)}+warna` : inv(t)) as Op; };
const OP_ALL: Op[] = T_ALL.flatMap((t) => [t, `${t}+warna` as Op]);
const namaOp = (o: Op) => { const [t, w] = pecah(o); return w ? (t === "tetap" ? "hanya dibalik warnanya" : `${T_NAME[t]} lalu dibalik warnanya`) : T_NAME[t]; };
export type AnaObj = { tier: 2 | 3; key: Key; a: string[]; c: string[]; ts: Op[]; q: 0 | 1 | 2 | 3; tukar?: [number, number]; rupa?: Rupa[]; siluet?: boolean; petak?: number };
export const ANA_OBJ: AnaObj[] = [
  { tier: 2, key: "C", a: ["daun", "sulur"], c: ["kait", "koma"], ts: ["mkk", "mab"], q: 3 },
  { tier: 3, key: "A", a: ["ombak", "pucuk", "zigzag"], c: ["sulur", "daun", "koma"], ts: ["r90", "tetap", "mkk"], q: 1 },
  { tier: 3, key: "D", a: ["kait", "kawung", "koma"], c: ["pucuk", "ombak", "sulur"], ts: ["mab", "r180", "tetap"], q: 2 },
  { tier: 3, key: "B", a: ["biji", "parang", "bulu"], c: ["daun", "pucuk", "kawung"], ts: ["tetap+warna", "mab", "tetap+warna"], q: 3 },
  { tier: 3, key: "E", a: ["tunas", "koma", "biji"], c: ["ombak", "kait", "parang"], ts: ["mab", "tetap", "mkk+warna"], q: 1, tukar: [1, 2] },
  { tier: 3, key: "A", a: ["kura", "palu", "kail"], c: ["payung", "kunci", "ikan"], ts: ["r90", "mab", "tetap+warna"], q: 3 },
  { tier: 3, key: "B", a: ["spiral7", "molekul3", "tetes"], c: ["ikal2", "lekuk5", "molekul4"], ts: ["mkk", "r270", "mab"], q: 2 },
  { tier: 3, key: "B", a: ["tetes", "ikalg", "gelombangtinta"], c: ["sabitgerigi", "kelopak3", "panahlengkung"], ts: ["r90", "mab+warna", "mkk"], q: 1, tukar: [0, 2], siluet: true },
];
export function anaObj(s: AnaObj): Draft {
  const n = s.a.length, T0 = s.siluet ? PETAK[n][s.petak ?? 0] : TATA[n];
  if (!s.siluet) [s.a, s.c].forEach((x) => cekKecil(x, T0.map((t) => t[1])));
  // Rupa: objek yang dibalik warnanya hitam (atau garis), objek lain bergantian hitam/arsir/garis; gaya siluet semua hitam.
  const rupa = s.a.map((_, i): Rupa => s.rupa?.[i] ?? (pecah(s.ts[i])[1] || s.siluet ? "hitam" : RUPA[i]));
  s.ts.forEach((o, i) => assert.ok(!(pecah(o)[1] && rupa[i] === "arsir"), "objek yang dibalik warnanya tidak boleh berarsir"));
  // Gaya siluet: bentuk tipis yang dibalik warnanya jadi garis kusut, jadi balik warna hanya untuk bentuk gemuk.
  if (s.siluet) [s.a, s.c].forEach((x) => cekBedaObjek(x, "FIG-ANA-OBJ"));
  if (s.siluet) s.ts.forEach((o, i) => pecah(o)[1] && [s.a[i], s.c[i]].forEach((x) => assert.ok(tebal(BENTUK[x]) >= TEBAL_MIN, `${x} terlalu tipis untuk dibalik warnanya`)));
  if (s.tukar) { const [u, v] = [T0[s.tukar[0]][1], T0[s.tukar[1]][1]]; assert.ok(Math.abs(u - v) / Math.max(u, v) <= 0.15, "tukar hanya antar-objek yang ukurannya mirip"); }
  // Tukar = pindah tempat saja; ukuran tetap ikut objeknya.
  const tempat = (hasil: boolean): [Pt, number][] => { const p = T0.map((x) => x[0]); if (hasil && s.tukar) { const [i, j] = s.tukar; [p[i], p[j]] = [p[j], p[i]]; } return p.map((q, i) => [q, T0[i][1]]); };
  const cel = (names: string[], ops?: Op[]) => tata(names.map((x, i) => (ops ? apOp(ops[i], BENTUK[x]) : BENTUK[x])), rupa, "tetap", tempat(!!ops));
  const sel = [cel(s.a), cel(s.a, s.ts), cel(s.c), cel(s.c, s.ts)];
  // Pasangan lengkap memperlihatkan aturan per objek; aturannya harus tunggal (bentuk kiral, warna terlihat).
  const contoh = s.q < 2 ? s.c : s.a;
  contoh.forEach((x, i) => assert.equal(OP_ALL.filter((u) => sig(apOp(u, BENTUK[x])) === sig(apOp(s.ts[i], BENTUK[x]))).length, 1, "aturan objek tidak tunggal"));
  const dasar = s.q < 2 ? s.a : s.c, keDepan = s.q % 2 === 1;
  const posisi = s.siluet ? NAMA_PETAK[n][s.petak ?? 0] : n === 2 ? ["besar", "kecil"] : ["besar", "kecil kanan atas", "kecil kanan bawah"];
  // Gaya siluet: objek disebut menurut letaknya, karena nama aset (tetes, ikalg, …) bukan kata yang dipakai siswa.
  const sebutO = (j: number) => (s.siluet ? `objek ${posisi[j]}` : dasar[j]);
  // Opsi = sel "?" menurut tafsir perubahan `ops` (dan tempat yang salah bila `salahTempat`). Pengecoh salah di 1–2 hal,
  // dipilih `pilih` supaya kunci tidak bisa ditebak sebagai opsi yang paling banyak berbagi ciri dengan opsi lain.
  type SelO = { ops: Op[]; salahTempat: boolean };
  const figO = (x: SelO) => tata(dasar.map((nm, i) => (keDepan ? apOp(x.ops[i], BENTUK[nm]) : apOp(invOp(x.ops[i]), apOp(s.ts[i], BENTUK[nm])))), rupa, "tetap", tempat(keDepan !== x.salahTempat));
  const K: SelO = { ops: [...s.ts], salahTempat: false };
  const salahUbah: [(o: Op) => Op, string][] = [
    [(o) => { const [t, w] = pecah(o); return (w ? t : `${t}+warna`) as Op; }, "salah soal balik warna"],
    [(o) => { const [t, w] = pecah(o); return (w ? `${lawan(t)}+warna` : lawan(t)) as Op; }, "salah arah putar atau cermin"],
    [(o) => { const [t, w] = pecah(o); return (w ? `${comp(t, "mkk")}+warna` : comp(t, "mkk")) as Op; }, "ikut dicermin kiri-kanan"],
    [() => "tetap", "objeknya dibiarkan tidak berubah"], [invOp, "arah perubahannya terbalik"],
  ];
  const ubah: Ubah<SelO>[] = [];
  dasar.forEach((nm, j) => {
    const pakai = new Set<Op>([s.ts[j]]);
    for (const [f, nama] of salahUbah) {
      const u = f(s.ts[j]);
      if (pakai.has(u) || (rupa[j] === "arsir" && pecah(u)[1])) continue;
      pakai.add(u);
      // Beberapa kesalahan bisa berujung sama (cermin dua kali = tidak berubah); nama mengikuti hasil yang terlihat.
      const nm = u === "tetap" ? "objeknya dibiarkan tidak berubah" : nama;
      ubah.push({ grup: j, ke: (x) => ({ ...x, ops: x.ops.map((o, i) => (i === j ? u : o)) }), isi: `${sebutO(j)} ${namaOp(u)} (harusnya ${namaOp(s.ts[j])})`, nama: nm });
    }
  });
  if (s.tukar) ubah.push({ grup: n, ke: (x) => ({ ...x, salahTempat: true }), isi: `${sebutO(s.tukar[0])} dan ${sebutO(s.tukar[1])} ada di tempat yang salah`, nama: "salah menerapkan tukar tempat" });
  const attrO = (x: SelO) => (s.tukar ? [...x.ops, String(x.salahTempat)] : [...x.ops]);
  const salah = pilih(attrO(K), sel[s.q], calonDari(K, ubah, attrO, figO, () => true), n * 7 + s.q);
  const { opts, gugur } = pasang(sel[s.q], salah, s.key);
  const grid = sel.map((f, i) => (i === s.q ? null : f));
  const adaWarna = s.ts.some((o) => pecah(o)[1]);
  return {
    sub_type: "FIG-ANA-OBJ", tier: s.tier, ...ANALOGI, key: s.key, opts, siluet: s.siluet, ciri: ciriDari([...s.a, ...s.c], `petak${n}-${s.petak ?? 0}`),
    stemSvg: layout([grid], { size: 104, gap: 40, seps: [":", "=", ":"] }),
    pembahasan: teks({
      tanya: `gambar (${s.q + 1}) supaya hubungan (1):(2) sama dengan (3):(4).`,
      cara: [`Lihat pasangan yang lengkap, (${s.q < 2 ? "3):(4" : "1):(2"}). Periksa setiap objek sendiri-sendiri, jangan sekaligus.`, ...posisi.map((p, i) => `Objek ${p}: ${namaOp(s.ts[i])}.`), ...(s.tukar ? [`Selain itu, objek ${posisi[s.tukar[0]]} dan ${posisi[s.tukar[1]]} bertukar tempat.`] : []), keDepan ? "Terapkan perubahan yang sama ke setiap objek di sel lawannya." : "Karena tanda tanya ada di sebelah kiri, balik perubahannya: mulai dari gambar kanan lalu kembalikan setiap objek."],
      gugur, key: s.key, alasan: `Opsi ${s.key} satu-satunya gambar yang setiap objeknya berubah persis seperti pasangan contoh${s.tukar ? ", termasuk tempatnya" : ""}.`,
      analogi: adaWarna ? "Seperti foto dan klisenya: bentuknya sama, terang dan gelapnya bertukar." : "Seperti resep untuk tiga bahan: tiap bahan punya perlakuannya sendiri, ada yang dipotong, ada yang dibiarkan utuh.",
      jebakan: adaWarna ? "Mata cepat menangkap perubahan warna lalu lupa memeriksa arah bentuknya. Cek dua hal itu di setiap objek." : "Opsi yang salah hanya keliru di satu objek. Kalau kamu berhenti setelah objek pertama cocok, kamu bisa terkecoh.",
    }),
    pbhSvg: layout([sel], { size: 104, gap: 40, seps: [":", "=", ":"], hl: [0, s.q], foot: posisi.map((p, i) => `Objek ${p}: ${namaOp(s.ts[i])}`) }),
  };
}

// ── FIG-MTX-PUTAR: matriks 3×3 bentuk kiral; kolom (atau baris) berubah dengan aturan tetap ──────
// `awal` = arah awal tiap bentuk. Wajib bila ketiga bentuk satu keluarga (cek mata 2026-10-29): tanpa itu deret yang belum diubah
// tampak kembar, dan jawaban bisa disalin dari dua sel sebelahnya tanpa memahami aturannya.
export type MtxPutar = { tier: 2 | 3; key: Key; bentuk: [string, string, string]; arah: "kolom" | "baris"; t1: T; t2: T; sudut?: boolean; rupa?: Rupa[]; siluet?: boolean; awal?: [T, T, T] };
export const MTX_PUTAR: MtxPutar[] = [
  { tier: 2, key: "B", bentuk: ["koma", "daun", "kait"], arah: "kolom", t1: "r90", t2: "mab" },
  { tier: 3, key: "E", bentuk: ["sulur", "zigzag", "pucuk"], arah: "kolom", t1: "mkk", t2: "r270", sudut: true },
  { tier: 3, key: "C", bentuk: ["ombak", "kawung", "daun"], arah: "baris", t1: "r90", t2: "r90" },
  { tier: 3, key: "A", bentuk: ["kupu", "palu", "kura"], arah: "kolom", t1: "mkk", t2: "r90" },
  { tier: 3, key: "E", bentuk: ["spiral9", "molekul5", "ikal3"], arah: "baris", t1: "r90", t2: "mkk" },
  { tier: 3, key: "A", bentuk: ["lidahapi", "sulurpojok", "ikalganda"], arah: "kolom", t1: "r90", t2: "mab", sudut: true, siluet: true },
];
const POJOK: [number, number][] = [[-38, -38], [38, -38], [38, 38], [-38, 38]];
const titik = (k: number): Prim[] => [{ k: "circ", c: POJOK[k], r: 5, fill: "b" }];
export function mtxPutar(s: MtxPutar) {
  // sel(r,c): arah kolom = baris r memakai bentuk r, kolom berikut kena t1 lalu t2; arah baris = kolom c memakai bentuk c, baris berikut kena t1 lalu t2.
  const ubah = (i: number, a: T, b: T): T[] => (i === 0 ? [] : i === 1 ? [a] : [a, b]);
  // Rupa per bentuk (hitam/arsir/garis), diberikan sesudah diputar supaya arah arsir tetap. `lebih` = perubahan tambahan (pengecoh).
  const rupa = s.rupa ?? (s.siluet ? HITAM : RUPA);
  const selOf = (r: number, c: number, a = s.t1, b = s.t2, k?: number, lebih: T = "tetap"): Fig => {
    const [j, i] = s.arah === "kolom" ? [r, c] : [c, r];
    const f = beri(rupa[j], ap(lebih, ubah(i, a, b).reduce((g, t) => ap(t, g), geser(ap(s.awal?.[j] ?? "tetap", BENTUK[s.bentuk[j]]), [0, 0], s.sudut ? 0.72 : 0.9))));
    return s.sudut ? [...f, ...titik(k ?? (r + c) % 4)] : f;
  };
  const grid = [0, 1, 2].map((r) => [0, 1, 2].map((c) => selOf(r, c)));
  const kunci = grid[2][2];
  // Bukti: setiap pasangan (a, b) yang cocok dengan 8 sel terlihat memberi jawaban yang sama.
  for (const a of T_ALL) for (const b of T_ALL) {
    const ok = [0, 1, 2].every((r) => [0, 1, 2].every((c) => (r === 2 && c === 2) || sig(selOf(r, c, a, b)) === sig(grid[r][c])));
    if (ok) assert.equal(sig(selOf(2, 2, a, b)), sig(kunci), "matriks punya tafsir lain dengan jawaban berbeda");
  }
  const kiri = s.arah === "kolom" ? grid[2][1] : grid[1][2];
  const cand: [Fig, string, string][] = [
    [selOf(2, 2, s.t1, "tetap"), "langkah kedua tidak dikerjakan", `padahal langkah kedua ${T_NAME[s.t2]}`],
    [selOf(2, 2, "tetap", "tetap"), "bentuk dianggap kembali ke posisi awal", "padahal perubahan terus berlanjut sampai sel terakhir"],
    [selOf(2, 2, s.t1, lawan(s.t2)), `langkah kedua ${T_NAME[lawan(s.t2)]}`, `padahal langkah kedua ${T_NAME[s.t2]}`],
    [selOf(2, 2, inv(s.t1) === s.t1 ? lawan(s.t1) : inv(s.t1), s.t2), "langkah pertama salah arah", `padahal langkah pertama ${T_NAME[s.t1]}`],
    [kiri, "hanya menyalin sel sebelumnya", "padahal sel terakhir masih kena satu perubahan lagi"],
    [selOf(2, 2, s.t1, s.t2, undefined, "mkk"), "jawaban yang dicermin kiri-kanan", "bentuknya terbalik sisi"],
    [selOf(2, 2, s.t1, s.t2, undefined, s.t2), "perubahan dikerjakan satu kali terlalu banyak", "sel terakhir cukup kena dua langkah"],
    [selOf(2, 2, s.t1, s.t2, undefined, "mab"), "jawaban yang dicermin atas-bawah", "bentuknya terbalik atas-bawah"],
  ];
  if (s.sudut) cand.unshift([selOf(2, 2, s.t1, s.t2, 1), "bentuk benar, tetapi titik di pojok yang salah", `titik pindah satu pojok searah jarum jam, jadi berada di ${KUADRAN[0]}`]);
  const salah: Salah[] = [], seen = new Set([sig(kunci)]);
  for (const [f, isi, alasan] of cand) if (!seen.has(sig(f)) && salah.length < 4) { seen.add(sig(f)); salah.push({ fig: f, isi, alasan }); }
  const { opts, gugur } = pasang(kunci, salah, s.key);
  const lewat = s.arah === "kolom" ? ["kolom 1 ke kolom 2", "kolom 2 ke kolom 3"] : ["baris 1 ke baris 2", "baris 2 ke baris 3"];
  const sama = s.t1 === s.t2;
  return {
    sub_type: "FIG-MTX-PUTAR", tier: s.tier, ...POLA, key: s.key, opts, siluet: s.siluet, ciri: ciriDari(s.bentuk, "tunggal-titik"),
    stemSvg: layout([grid[0], grid[1], [grid[2][0], grid[2][1], null]], { size: 100, gap: 8 }),
    pembahasan: teks({
      tanya: "sel kanan bawah matriks 3×3.",
      cara: [`Setiap ${s.arah === "kolom" ? "baris" : "kolom"} memakai satu bentuk, jadi bandingkan sel dalam ${s.arah === "kolom" ? "baris" : "kolom"} yang sama.`, sama ? `Dari ${lewat[0]} dan dari ${lewat[1]} bentuk sama-sama ${T_NAME[s.t1]}.` : `Dari ${lewat[0]}: ${T_NAME[s.t1]}. Dari ${lewat[1]}: ${T_NAME[s.t2]}.`, "Cek aturan itu di dua deret yang lengkap sebelum dipakai ke deret yang ada tanda tanyanya.", ...(s.sudut ? ["Titik hitam punya aturan sendiri: pindah satu pojok searah jarum jam setiap sel."] : [])],
      gugur, key: s.key, alasan: `Opsi ${s.key} mengikuti ${sama ? "perubahan yang sama" : "kedua langkah perubahan"} sampai sel terakhir${s.sudut ? ", dan titiknya ada di pojok yang benar" : ""}.`,
      analogi: "Seperti jarum jam yang terus maju: di jam ketiga jarumnya tidak kembali ke angka awal.",
      jebakan: sama ? "Banyak orang mengira bentuk di deret terakhir kembali tegak. Perubahan tetap berlanjut, jadi sel terakhir terputar dua kali." : "Cermin atas-bawah dan cermin kiri-kanan mudah tertukar. Ikuti satu ujung bentuk: pada cermin atas-bawah ujung itu pindah dari atas ke bawah.",
    }),
    pbhSvg: layout(grid, { size: 100, gap: 8, hl: [2, 2], minW: 600, foot: sama ? [`Setiap langkah: ${T_NAME[s.t1]}`] : [`Langkah 1: ${T_NAME[s.t1]}`, `Langkah 2: ${T_NAME[s.t2]}`] }),
  } as Draft;
}

