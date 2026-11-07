import assert from "node:assert/strict";
import { type Fig, type Key, type Pt, KEYS, sig } from "./figural-lib";
import { type Draft, layout } from "./k12-spasial-core";
import { type Salah, type T, type Ubah, BENTUK, HITAM, KUADRAN, NAMA_PETAK, PETAK, SLOT, cekBedaObjek, T_ALL, T_NAME, ap, calonDari, ciriDari, comp, kiral, muat, pasang, pick, pilih, rng, tata } from "./tiu-bentuk";
import { ABC, nomor, teks } from "./tiu-fig-beda-seri";

// TIU SKD — versi gaya siluet yang anti-tebak sekilas (putusan Gusti 2026-10-28: versi pertama BEDA-PUTAR dan SERI-KUADRAN
// ditolak karena gambar utuhnya bisa dicocokkan sekali lihat).
//   FIG-BEDA-PUTAR  : letak objek sama, tetapi SETIAP objek diputar sendiri-sendiri di setiap pilihan, jadi tidak ada pilihan
//                     yang merupakan putaran utuh pilihan lain; kunci = satu objek (bukan yang terbesar) dicermin.
//   FIG-SERI-KUADRAN: tanda tanya di gambar terakhir; dua kelompok aturan berperiode beda — tiga objek bergilir di tiga kotak
//                     (periode 3), satu objek diam di kotaknya dan berputar 90° (periode 4). Jawaban ≠ gambar mana pun.

const BEDA = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };
const SERI = { instruksi: "Perhatikan urutan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const PUTAR: T[] = ["tetap", "r90", "r180", "r270"];

// ── FIG-BEDA-PUTAR (siluet, putar per objek) ────────────────────────────────────────────────
export type BedaPutarS = { tier: 3; key: Key; bentuk: string[]; petak: number; cermin: number; seed: number; acak: true };
export const BEDA_PUTAR_S: BedaPutarS[] = [{ tier: 3, key: "D", bentuk: ["pucuk", "kawung", "sulur"], petak: 1, cermin: 2, seed: 15, acak: true }];
export function bedaPutarS(s: BedaPutarS): Draft {
  const n = s.bentuk.length, tempat = PETAK[n][s.petak], posisi = NAMA_PETAK[n][s.petak], objs = s.bentuk.map((x) => BENTUK[x]), ki = KEYS.indexOf(s.key);
  objs.forEach((o, j) => assert.ok(kiral(o), `${s.bentuk[j]} tidak kiral`));
  cekBedaObjek(s.bentuk, "FIG-BEDA-PUTAR");
  assert.ok(tempat[s.cermin][1] < Math.max(...tempat.map((t) => t[1])), "objek yang dicermin jangan yang terbesar: terlalu mudah terlihat");
  for (let seed = s.seed; seed < s.seed + 500; seed++) {
    const r = rng(seed);
    const ts = KEYS.map((_, i) => objs.map((_, j) => (i === ki && j === s.cermin ? comp("mkk", pick(r, PUTAR)) : pick(r, PUTAR))));
    // Setiap letak memakai minimal tiga arah berbeda di antara empat pilihan salah, supaya gambar utuh tidak bisa dicocokkan.
    if (objs.some((_, j) => new Set(ts.filter((_, i) => i !== ki).map((t) => t[j])).size < 3)) continue;
    const figs = ts.map((t) => tata(objs.map((o, j) => ap(t[j], o)), HITAM, "tetap", tempat));
    if (new Set(figs.map(sig)).size < 5) continue;
    // Tidak ada pilihan yang sama dengan pilihan lain yang diputar/dicermin utuh.
    if (figs.some((f, i) => figs.some((g, k) => i !== k && T_ALL.some((t) => sig(ap(t, f)) === sig(g))))) continue;
    const salah: Salah[] = figs.filter((_, i) => i !== ki).map((f) => ({ fig: f, isi: `${n === 3 ? "ketiga" : "keempat"} objeknya hanya diputar`, alasan: "tidak ada yang dibalik, jadi masih sekelompok" }));
    const { opts, gugur } = pasang(figs[ki], salah, s.key);
    return {
      sub_type: "FIG-BEDA-PUTAR", tier: s.tier, ...BEDA, key: s.key, opts, siluet: true, stemSvg: "",
      ciri: ciriDari(s.bentuk, `petak${n}-${s.petak}`),
      pembahasan: teks({
        tanya: "satu gambar yang salah satu objeknya tidak bisa didapat hanya dengan memutar.",
        cara: ["Letak objek sama di kelima gambar, tetapi setiap objek diputar sendiri-sendiri. Gambar utuhnya tidak akan cocok satu sama lain, jadi jangan mencocokkan gambar sekaligus.", `Periksa per letak. Bandingkan objek ${posisi[0]} di kelima gambar, lalu objek ${posisi.slice(1).join(", lalu objek ")}.`, "Di setiap letak, pilih satu ujung yang khas, lalu lihat apakah sisi kiri dan kanannya tertukar. Objek yang diputar tetap punya urutan sisi yang sama; objek yang dicermin urutannya terbalik."],
        gugur, key: s.key,
        alasan: `Objek ${posisi[s.cermin]} di opsi ${s.key} dibalik seperti bayangan cermin. Diputar ke arah mana pun, ia tidak bisa sama dengan objek ${posisi[s.cermin]} di empat gambar lain.`,
        analogi: "Seperti memeriksa lima tumpukan sarung tangan kanan yang diletakkan miring ke berbagai arah: arahnya boleh beda-beda, yang dicari satu sarung tangan kiri.",
        jebakan: "Karena semua gambar tampak berbeda, mata mudah memilih gambar yang paling aneh susunannya. Yang menentukan hanya satu objek, dan objek itu bukan yang terbesar.",
      }),
      pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5), extra: () => "", extraH: 34, foot: ["Setiap objek diputar sendiri-sendiri", `Opsi ${s.key}: objek ${posisi[s.cermin]} dicermin`] }),
    };
  }
  throw new Error("FIG-BEDA-PUTAR siluet: tidak ketemu susunan arah yang lolos");
}

// ── FIG-SERI-KUADRAN (siluet, dua kelompok gerak) ───────────────────────────────────────────
// Objek ke-i mulai di kuadran ke-i (urutan KUADRAN). Objek `diam` tidak pindah dan berputar `putar` tiap langkah;
// tiga objek lain bergilir di tiga kotak sisanya, `arah` 1 = searah jarum jam.
export type SeriKuadranS = { tier: 3; key: Key; bentuk: [string, string, string, string]; diam: number; arah: 1 | -1; putar: "r90" | "r270"; dua: true };
export const SERI_KUADRAN_S: SeriKuadranS[] = [{ tier: 3, key: "A", bentuk: ["daun", "tunas", "ombak", "biji"], diam: 1, arah: 1, putar: "r90", dua: true }];
const UKUR4 = [42, 36, 40, 38];
type SelK = { geser: number; rot: T; tukar: number };
export function seriKuadranS(s: SeriKuadranS): Draft {
  cekBedaObjek(s.bentuk, "FIG-SERI-KUADRAN");
  const C = [0, 1, 2, 3].filter((q) => q !== s.diam), md = (a: number, m: number) => ((a % m) + m) % m;
  const rotKe = (p: number): T => (s.putar === "r90" ? PUTAR[md(p, 4)] : PUTAR[md(-p, 4)]);
  const sel = (x: SelK): Fig => {
    const tempat = [0, 1, 2, 3].map((i) => (i === s.diam ? i : C[md(C.indexOf(i) + x.geser, 3)]));
    // tukar 1/2 = pasangan objek bergilir yang tertukar (dua pilihan supaya susunan pilihan salah tidak kembar).
    if (x.tukar) { const [a, b] = x.tukar === 1 ? [C[0], C[1]] : [C[1], C[2]]; [tempat[a], tempat[b]] = [tempat[b], tempat[a]]; }
    return [0, 1, 2, 3].flatMap((i) => muat(i === s.diam ? ap(x.rot, BENTUK[s.bentuk[i]]) : BENTUK[s.bentuk[i]], SLOT[4][tempat[i]], UKUR4[i]));
  };
  const langkah = (p: number): SelK => ({ geser: md(s.arah * p, 3), rot: rotKe(p), tukar: 0 });
  const Q = 4, frames = [0, 1, 2, 3].map((p) => sel(langkah(p))), K = langkah(Q), kunci = sel(K);
  frames.forEach((f) => assert.notEqual(sig(f), sig(kunci), "jawaban sama dengan gambar yang terlihat"));
  const nd = `objek ${KUADRAN[s.diam]}`, arahK = s.arah === 1 ? "searah" : "berlawanan arah";
  const ubah: Ubah<SelK>[] = [
    { grup: 0, ke: (x) => ({ ...x, geser: md(-s.arah * Q, 3) }), isi: "tiga objek bergilir ke arah sebaliknya", nama: "salah arah perpindahan" },
    { grup: 0, ke: (x) => ({ ...x, geser: langkah(Q - 1).geser }), isi: "susunan tiga objek sama dengan gambar (4)", nama: "lupa memindahkan objek satu langkah lagi" },
    { grup: 1, ke: (x) => ({ ...x, rot: rotKe(Q - 1) }), isi: `${nd} sama dengan gambar (4)`, nama: `lupa memutar ${nd}` },
    { grup: 1, ke: (x) => ({ ...x, rot: rotKe(Q + 1) }), isi: `${nd} diputar satu kali terlalu banyak`, nama: "salah hitung putaran" },
    { grup: 1, ke: (x) => ({ ...x, rot: "mkk" }), isi: `${nd} dicermin, bukan diputar`, nama: "mengganti putar dengan cermin" },
    ...[1, 2].map((t): Ubah<SelK> => ({ grup: 2, ke: (x) => ({ ...x, tukar: t }), isi: "dua objek yang bergilir bertukar tempat", nama: "urutan giliran ikut berubah" })),
  ];
  const attr = (x: SelK) => [`g${x.geser}`, x.rot, `t${x.tukar}`];
  const salah = pilih(attr(K), kunci, calonDari(K, ubah, attr, sel, () => true), s.diam * 13 + 7);
  const { opts, gugur } = pasang(kunci, salah, s.key);
  const urut = [0, 1, 2].map((k) => KUADRAN[C[md(s.arah * k, 3)]]).join(" → ");
  return {
    sub_type: "FIG-SERI-KUADRAN", tier: s.tier, ...SERI, key: s.key, opts, siluet: true,
    ciri: ciriDari(s.bentuk, "kuadran4"),
    stemSvg: layout([[...frames, null]], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30 }),
    pembahasan: teks({
      tanya: "gambar (5). Ada dua kelompok objek, dan masing-masing punya aturan sendiri.",
      cara: [`Kelompok pertama: ${nd} tidak pernah pindah kotak. Ia hanya berputar 90° ${s.putar === "r90" ? "searah" : "berlawanan arah"} jarum jam setiap langkah.`,
        `Kelompok kedua: tiga objek lain bergilir di tiga kotak sisanya (${urut}), satu kotak setiap langkah, melompati kotak objek yang diam. Susunannya kembali seperti semula setiap tiga langkah.`,
        `Gambar (5) adalah langkah keempat. Susunan tiga objek itu sama dengan gambar (2), sedangkan ${nd} sudah berputar penuh sehingga kembali seperti di gambar (1).`],
      gugur, key: s.key, alasan: `Opsi ${s.key} memenuhi kedua kelompok aturan: susunan tiga objek seperti gambar (2) dan ${nd} kembali ke arah awal.`,
      analogi: "Seperti tiga orang yang bergiliran duduk di tiga kursi, sementara orang keempat tetap di kursinya dan hanya memutar badan seperempat putaran setiap kali.",
      jebakan: "Jawabannya tidak sama dengan gambar mana pun yang terlihat. Kalau kamu menyalin gambar yang paling mirip, salah satu kelompok pasti keliru.",
    }),
    pbhSvg: layout([[...frames, kunci]], { size: 96, gap: 12, hl: [0, Q], ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30, foot: [`${nd}: diam, berputar 90° tiap langkah`, `Tiga objek lain: bergilir ${arahK} jarum jam (${urut})`] }),
  };
}
