/**
 * TIU SKD — peta keluarga bentuk figural per paket (langkah 1b, 2026-10-29). Belum soal: hanya palet keluarga tiap slot
 * (pola nomor 57–65: seri 2, analogi 2, gambar berbeda 2, matriks 3), diperiksa mesin lalu ditampilkan sebagai papan visual.
 *
 *   npx tsx src/tiu-peta-paket.ts <out.html>
 */
import { writeFileSync } from "node:fs";
import { cellS } from "./figural-lib";
import { svg } from "./k12-spasial-core";
import { BENTUK, type Ciri, buatHitung, cekBedaObjek, cekPaket, ciriDari, keluarga, muat, siluet } from "./tiu-bentuk";

// lacak = objek yang harus diikuti siswa antarsel, jadi wajib mudah dibedakan (cekBedaObjek).
type Slot = { jenis: string; bentuk: string[]; hitung?: string[]; lain?: string[]; lacak?: boolean; catatan: string };
export const PETA: Record<string, { tema: string; slot: Slot[] }> = {
  "Paket 1": { tema: "tinta, molekul, sulur (10 sampel yang sudah disetujui)", slot: [
    { jenis: "FIG-BEDA-PUTAR", bentuk: ["pucuk", "kawung", "sulur"], catatan: "putar per objek" },
    { jenis: "FIG-BEDA-HITUNG", bentuk: [], lain: ["molekul"], catatan: "butir molekul 1/2/3 bulatan" },
    { jenis: "FIG-SERI-P3", bentuk: ["akantus", "kuncup", "pita"], lacak: true, catatan: "selang tiga + bintik" },
    { jenis: "FIG-SERI-KUADRAN", bentuk: ["daun", "tunas", "ombak", "biji"], lacak: true, catatan: "dua kelompok gerak" },
    { jenis: "FIG-ANA-OBJ", bentuk: ["tetes", "ikalg", "gelombangtinta", "sabitgerigi", "kelopak3", "panahlengkung"], catatan: "putar, balik warna, tukar" },
    { jenis: "FIG-ANA-UBAH", bentuk: ["ikal3", "ikal2"], lain: ["pola"], catatan: "kelopak + bintang dihitung" },
    { jenis: "FIG-MTX-PUTAR", bentuk: ["lidahapi", "sulurpojok", "ikalganda"], catatan: "dua langkah + titik pojok" },
    { jenis: "FIG-MTX-HITUNG", bentuk: ["koma", "kait", "zigzag"], lain: ["gumpal"], catatan: "cabang gumpal + objek kecil" },
    { jenis: "FIG-MTX-GABUNG", bentuk: [], lain: ["gabung: puncak, kelopak, lengkung"], catatan: "gabung + ujung tumpul" },
  ] },
  "Paket 2": { tema: "laut dan tumbuhan: ikal kembar, kerang, pita, tunas, rantai, sabit, gulung ombak", slot: [
    { jenis: "FIG-BEDA-PUTAR", bentuk: ["ikalkembar-1u", "ikalkembar-5", "ikalkembar-8"], catatan: "putar per objek" },
    { jenis: "FIG-BEDA-TUMPUK", bentuk: ["kerang4-1", "kerang6-6", "kerang8-12", "kerang5-3", "kerang7-2", "ikalkembar-3"], catatan: "kerang garis + hitam polos kecil, hiasan ikal kembar (gulung kecil terbaca dua benda, cek mata 2026-10-29)" },
    { jenis: "FIG-SERI-P3", bentuk: ["pita3-1u", "pita4-7u", "pita5-11u"], lacak: true, catatan: "selang tiga + bintik" },
    { jenis: "FIG-SERI-KUADRAN", bentuk: ["tunas3-1", "tunas5-12", "tunas4-6", "tunas7-20"], lacak: true, catatan: "dua kelompok gerak" },
    { jenis: "FIG-ANA-OBJ", bentuk: ["rantai4-2", "rantai6-11", "rantai5-6", "rantai6-12", "rantai4-9", "rantai5-14"], lacak: true, catatan: "putar, balik warna, tukar" },
    { jenis: "FIG-ANA-UBAH", bentuk: ["gulung2-1", "gulung3-2"], hitung: ["kerang", "tunas"], catatan: "rusuk kerang + daun tunas dihitung" },
    { jenis: "FIG-MTX-PUTAR", bentuk: ["sabit4-1u", "sabit5-2u", "sabit3-5u"], catatan: "dua langkah + titik pojok" },
    { jenis: "FIG-MTX-HITUNG", bentuk: ["sabit4-5", "sabit5-8", "sabit3-9"], hitung: ["rantai"], catatan: "manik rantai + objek kecil" },
    { jenis: "FIG-MTX-GABUNG", bentuk: [], lain: ["gabung: kelopak, sinar, lengkung"], catatan: "gabung + ujung tumpul" },
  ] },
  "Paket 3": { tema: "taman batu dan pusaka: ranting, batu, molekul, keris, teratai, sayap, awan", slot: [
    { jenis: "FIG-BEDA-HITUNG", bentuk: ["teratai3-41", "sayap4-45", "keris3-41"], catatan: "butir teratai/sayap/keris, tanpa putar 90° (cek mata 2026-10-29: susunan batu kecil menyatu)" },
    { jenis: "FIG-BEDA-TUMPUK", bentuk: ["molekul3", "molekul4b", "molekul3c", "molekul5c", "molekul3b", "parang"], catatan: "aturan berpasangan" },
    { jenis: "FIG-SERI-P3", bentuk: ["ranting3-100", "ranting5-123", "ranting4-110"], lacak: true, catatan: "selang tiga + bintik" },
    { jenis: "FIG-SERI-KUADRAN", bentuk: ["batu3-100", "batu6-130", "batu5-120", "batu4-112"], lacak: true, catatan: "dua kelompok gerak" },
    { jenis: "FIG-ANA-OBJ", bentuk: ["molekul4-20", "molekul3-21", "molekul5-24", "molekul4-22", "molekul3-45", "molekul5-30"], lacak: true, catatan: "putar, balik warna, tukar; keris/padi (tipis, kembar sekilas) dan teratai (0,15) ditolak" },
    { jenis: "FIG-ANA-UBAH", bentuk: ["awan2-61", "awan3-63"], hitung: ["sayap", "teratai"], catatan: "bulu sayap + kelopak teratai dihitung, awan di bawah" },
    { jenis: "FIG-MTX-PUTAR", bentuk: ["awan2-70", "awan3-71", "awan4-70"], catatan: "dua langkah + titik pojok; keris dicermin kiri-kanan hampir sama dengan aslinya (cek mata 2026-10-29)" },
    { jenis: "FIG-MTX-HITUNG", bentuk: ["batu2-51", "batu2-52", "batu2-53"], hitung: ["ranting"], catatan: "cabang ranting + batu kecil (keris kecil = coretan tipis, cek mata 2026-10-29)" },
    { jenis: "FIG-MTX-GABUNG", bentuk: [], lain: ["gabung: puncak, kelopak, sinar"], catatan: "gabung + ujung tumpul" },
  ] },
};
const ciri = (s: Slot): Ciri => ciriDari(s.bentuk, s.jenis, [...(s.hitung ?? []), ...(s.lain ?? [])]);
/** Periksa peta: per paket (cekPaket) + objek lacak mudah dibedakan; kembalikan tumpang tindih keluarga antarpaket. */
export function cekPeta() {
  for (const [p, { slot }] of Object.entries(PETA)) {
    slot.forEach((s) => s.lacak && (s.jenis === "FIG-ANA-OBJ" ? [s.bentuk.slice(0, 3), s.bentuk.slice(3)] : [s.bentuk]).forEach((x) => cekBedaObjek(x, `${p} ${s.jenis}`)));
    cekPaket(slot.map((s) => ({ id: `${p} ${s.jenis}`, ...ciri(s) })));
  }
  // Nama bentuk tidak boleh dipakai ulang antarpaket (dasar daftar lintas paket, langkah 2).
  const dipakai = new Map<string, string>();
  for (const [p, { slot }] of Object.entries(PETA)) slot.flatMap((s) => s.bentuk).forEach((b) => { if (dipakai.has(b) && dipakai.get(b) !== p) throw new Error(`${b} dipakai ulang: ${dipakai.get(b)} dan ${p}`); dipakai.set(b, p); });
  const kel = Object.fromEntries(Object.entries(PETA).map(([p, { slot }]) => [p, new Set(slot.flatMap((s) => ciri(s).keluarga))]));
  return kel;
}
if (process.argv[1]?.endsWith("tiu-peta-paket.ts")) {
  const kel = cekPeta(), P = Object.keys(PETA);
  const gb = (n: string) => siluet(svg(64, 64, cellS(muat(BENTUK[n], [0, 0], 84), 32, 32, 60)));
  const gh = (j: string) => siluet(svg(64, 64, cellS(muat(buatHitung(j, j === "awan" ? 3 : j === "batu" ? 4 : 5, 1), [0, 0], 84), 32, 32, 60)));
  const sama = P.flatMap((a, i) => P.slice(i + 1).map((b) => `${a} – ${b}: ${[...kel[a]].filter((k) => kel[b].has(k)).join(", ") || "tidak ada"}`));
  writeFileSync(process.argv[2], `<!doctype html><meta charset="utf-8"><title>Peta keluarga 3 paket</title><style>body{font:14px Arial;max-width:1100px;margin:16px auto;color:#111}h2{margin:28px 0 4px}.t{color:#555;margin-bottom:8px}.r{display:flex;align-items:center;gap:6px;border-bottom:1px solid #ddd;padding:4px 0}.r b{width:170px;font-size:13px}.r i{width:220px;font-size:12px;color:#555;font-style:normal}</style><h1>Peta keluarga bentuk: 3 paket figural</h1><p>Lolos pemeriksaan mesin: satu keluarga paling banyak 2 soal per paket, tidak ada bentuk dipakai ulang dalam paket, objek yang dilacak cukup berbeda. Keluarga yang sama antarpaket:<br>${sama.join("<br>")}</p>` +
    Object.entries(PETA).map(([p, { tema, slot }]) => `<h2>${p}</h2><div class="t">Tema: ${tema}</div>` + slot.map((s) => `<div class="r"><b>${s.jenis}</b><i>${s.catatan}</i>${s.bentuk.map(gb).join("")}${(s.hitung ?? []).map(gh).join("")}${(s.lain ?? []).map((x) => `<span style="font-size:12px;color:#555">${x}</span>`).join(" ")}</div>`).join("")).join(""));
  console.log(sama.join("\n"));
}
