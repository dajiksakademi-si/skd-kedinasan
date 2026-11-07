/**
 * TIU SKD — spesifikasi 3 paket figural (langkah 3, 2026-10-29), mengikuti PETA di tiu-peta-paket.ts.
 * Urutan soal = nomor Al Faiz 57–65: seri 2, analogi 2, gambar berbeda 2, matriks 3.
 * Paket 1 = sampel siluet yang disetujui Gusti 2026-10-28 (BEDA-TUMPUK pindah ke Paket 3).
 */
import type { Draft } from "./k12-spasial-core";
import { type Ciri, keluarga } from "./tiu-bentuk";
import { BEDA_HITUNG_S, SERI_P3 } from "./tiu-fig-beda-seri";
import { MTX_HITUNG } from "./tiu-fig-baru";
import { ANA_OBJ, MTX_PUTAR } from "./tiu-fig-ana-mtx";
import { BEDA_PUTAR_S, SERI_KUADRAN_S } from "./tiu-fig-siluet";
import { ANA_UBAH, MTX_GABUNG } from "./tiu-fig-ubah";
import { JENIS } from "./tiu-jenis";
import { PETA } from "./tiu-peta-paket";

type Soal = [jenis: string, spec: object];
const sil = <X extends { siluet?: boolean }>(xs: X[]) => xs.find((x) => x.siluet)!;
export const PAKET: Record<string, Soal[]> = {
  "Paket 1": [
    ["FIG-SERI-KUADRAN", SERI_KUADRAN_S[0]],
    ["FIG-SERI-P3", sil(SERI_P3)],
    ["FIG-ANA-UBAH", sil(ANA_UBAH)],
    ["FIG-ANA-OBJ", sil(ANA_OBJ)],
    ["FIG-BEDA-HITUNG", BEDA_HITUNG_S[0]],
    ["FIG-BEDA-PUTAR", BEDA_PUTAR_S[0]],
    ["FIG-MTX-PUTAR", sil(MTX_PUTAR)],
    ["FIG-MTX-HITUNG", sil(MTX_HITUNG)],
    ["FIG-MTX-GABUNG", sil(MTX_GABUNG)],
  ],
  "Paket 2": [
    ["FIG-SERI-P3", { tier: 3, key: "B", bentuk: ["pita3-1u", "pita4-7u", "pita5-11u"], t: "mab", siluet: true, bintik: 2 }],
    ["FIG-SERI-KUADRAN", { tier: 3, key: "D", bentuk: ["tunas3-1", "tunas5-12", "tunas4-6", "tunas7-20"], diam: 2, arah: -1, putar: "r270", dua: true }],
    ["FIG-ANA-OBJ", { tier: 3, key: "A", a: ["rantai4-2", "rantai6-11", "rantai5-6"], c: ["rantai6-12", "rantai4-9", "rantai5-14"], ts: ["mkk", "r180", "r90"], q: 2, tukar: [1, 2], siluet: true }],
    ["FIG-ANA-UBAH", { tier: 3, key: "E", a: [{ jenis: "kerang", n: 4, seed: 1 }, { jenis: "tunas", n: 4, seed: 2 }, "gulung2-1"], c: [{ jenis: "kerang", n: 5, seed: 3 }, { jenis: "tunas", n: 6, seed: 4 }, "gulung3-2"], dn: [2, -1], tukar: false, t: "r180", q: 1, siluet: true }],
    ["FIG-BEDA-PUTAR", { tier: 3, key: "C", bentuk: ["ikalkembar-1u", "ikalkembar-5", "ikalkembar-8"], petak: 0, cermin: 1, seed: 21, acak: true }],
    ["FIG-BEDA-TUMPUK", { tier: 3, key: "B", bentuk: ["kerang4-1", "kerang6-6", "kerang8-12", "kerang5-3", "kerang7-2"], hiasan: "ikalkembar-3", seed: 34, siluet: true }],
    ["FIG-MTX-PUTAR", { tier: 3, key: "E", bentuk: ["sabit4-1u", "sabit5-2u", "sabit3-5u"], arah: "baris", t1: "mkk", t2: "r90", sudut: true, siluet: true, awal: ["tetap", "r90", "mab"] }],
    ["FIG-MTX-HITUNG", { tier: 3, key: "A", cabang: 3, tambahBaris: 1, kecil: 1, kecilBaris: 2, seed: 51, siluet: true, pusat: "rantai", kecilBentuk: ["sabit4-5", "sabit5-8", "sabit3-9"] }],
    ["FIG-MTX-GABUNG", { tier: 3, key: "D", baris: [{ pola: "kelopak", seed: 12, kecil: [4, 6], pojok: 1 }, { pola: "sinar", seed: 11, kecil: [6, 4], pojok: 1 }, { pola: "lengkung", seed: 5, kecil: [5, 7], pojok: 0 }], siluet: true }],
  ],
  "Paket 3": [
    ["FIG-SERI-P3", { tier: 3, key: "C", bentuk: ["ranting3-100", "ranting5-123", "ranting4-110"], t: "r90", siluet: true, bintik: 3 }],
    ["FIG-SERI-KUADRAN", { tier: 3, key: "E", bentuk: ["batu3-100", "batu6-130", "batu5-120", "batu4-112"], diam: 3, arah: -1, putar: "r90", dua: true }],
    ["FIG-ANA-OBJ", { tier: 3, key: "D", a: ["molekul4-20", "molekul3-21", "molekul5-24"], c: ["molekul4-22", "molekul3-45", "molekul5-30"], ts: ["r270+warna", "mkk", "mab"], q: 0, tukar: [1, 2], siluet: true, petak: 1 }],
    ["FIG-ANA-UBAH", { tier: 3, key: "B", a: [{ jenis: "sayap", n: 3, seed: 5 }, { jenis: "teratai", n: 6, seed: 6 }, "awan2-61"], c: [{ jenis: "sayap", n: 4, seed: 7 }, { jenis: "teratai", n: 4, seed: 8 }, "awan3-63"], dn: [2, -1], tukar: true, t: "mkk", q: 3, siluet: true }],
    ["FIG-BEDA-HITUNG", { tier: 3, key: "A", siluet: true, seed: 61, butir: ["teratai3-41", "sayap4-45", "keris3-41"], namaButir: ["teratai", "sayap", "keris"] }],
    ["FIG-BEDA-TUMPUK", { tier: 3, key: "C", bentuk: ["molekul3", "molekul4b", "molekul3c", "molekul5c", "molekul3b"], hiasan: "parang", seed: 35, siluet: true }],
    ["FIG-MTX-PUTAR", { tier: 3, key: "B", bentuk: ["awan2-70", "awan3-71", "awan4-70"], arah: "kolom", t1: "r270", t2: "mkk", sudut: true, siluet: true, awal: ["r180", "tetap", "r90"] }],
    ["FIG-MTX-HITUNG", { tier: 3, key: "E", cabang: 3, tambahBaris: 1, kecil: 2, kecilBaris: 1, seed: 71, siluet: true, pusat: "ranting", kecilBentuk: ["batu2-51", "batu2-52", "batu2-53"] }],
    ["FIG-MTX-GABUNG", { tier: 3, key: "A", baris: [{ pola: "puncak", seed: 13, kecil: [6, 8], pojok: 0 }, { pola: "kelopak", seed: 14, kecil: [7, 5], pojok: 1 }, { pola: "sinar", seed: 15, kecil: [5, 7], pojok: 0 }], siluet: true }],
  ],
};
export const buatPaket = (p: string): Draft[] => PAKET[p].map(([j, s]) => JENIS[j].buat(s as never));

/** Langkah 2 — daftar lintas paket: dalam 3 paket berturut-turut tidak ada nama bentuk yang dipakai ulang,
 *  setiap soal sesuai jenis di PETA, dan keluarga tiap paket hanya dari palet petanya. Kembalikan daftar bentuk per paket. */
export function cekLintas(hasil: Record<string, Draft[]>, jendela = 3) {
  const P = Object.keys(hasil), daftar: Record<string, Ciri[]> = {};
  P.forEach((p) => {
    const jenisPeta = PETA[p]?.slot.map((s) => s.jenis).sort().join();
    if (jenisPeta) { const j = hasil[p].map((d) => d.sub_type).sort().join(); if (j !== jenisPeta) throw new Error(`${p}: jenis soal tidak sesuai peta (${j})`); }
    const palet = new Set(PETA[p]?.slot.flatMap((s) => [...s.bentuk, ...(s.hitung ?? [])].map(keluarga).concat(s.lain ?? [])));
    hasil[p].forEach((d) => d.ciri!.keluarga.forEach((k) => { if (palet.size && !palet.has(k) && !["gabung", "pola", "gumpal", "molekul"].includes(k)) throw new Error(`${p} ${d.sub_type}: keluarga ${k} di luar peta`); }));
    daftar[p] = hasil[p].map((d) => d.ciri!);
  });
  P.forEach((p, i) => {
    const dekat = P.slice(Math.max(0, i - jendela + 1), i);
    const lama = new Map(dekat.flatMap((q) => daftar[q].flatMap((c) => c.bentuk.map((b): [string, string] => [b, q]))));
    daftar[p].forEach((c) => c.bentuk.forEach((b) => { if (lama.has(b)) throw new Error(`bentuk ${b} dipakai ulang: ${lama.get(b)} dan ${p}`); }));
  });
  return Object.fromEntries(P.map((p) => [p, hasil[p].map((d, i) => ({ no: 57 + i, jenis: d.sub_type, kunci: d.key, ...d.ciri! }))]));
}
