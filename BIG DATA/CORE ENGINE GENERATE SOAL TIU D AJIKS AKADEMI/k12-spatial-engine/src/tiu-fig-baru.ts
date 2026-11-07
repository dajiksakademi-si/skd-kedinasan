import assert from "node:assert/strict";
import { type Fig, type Key, type Pt, KEYS, RED, draw, text, textC } from "./figural-lib";
import { type Draft, layout } from "./k12-spasial-core";
import { type Salah, type T, type Ubah, BENTUK, HITUNG_JENIS, ap, buatHitung, calonDari, ciriDari, muat, geser, pasang, pick, pilih, rng, shuffle, tinta } from "./tiu-bentuk";
import { balikWarna } from "./tiu-gaya";
import { teks } from "./tiu-fig-beda-seri";
import { arsir, gumpal } from "./tiu-gaya";

// TIU SKD — jenis dari logika penyusun Al Faiz Paket 41:
//   FIG-BEDA-TUMPUK (no. 62): gambar berbeda di DUA ciri sekaligus — susunan depan/belakang + ukuran hiasan pojok.
//   FIG-MTX-HITUNG  (no. 64): dua hitungan sekaligus — cabang objek tengah dan objek kecil di pinggir, +1 tiap kolom;
//                            bentuk dan letak objek kecil sengaja diacak (bukan aturan).

const BEDA = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };
const POLA = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
const ABC = (at: (r: number, c: number) => Pt, s: number, n: number) => Array.from({ length: n }, (_, c) => text(at(0, c)[0], at(0, c)[1] + s / 2 + 26, KEYS[c], 22)).join("");
/** Tanda yang peka urutan gambar (sig mengurutkan primitif, jadi depan/belakang tidak terbaca di sana). */
const tandaUrut = (f: Fig) => draw(f, 0, 0);

// ── FIG-BEDA-TUMPUK ─────────────────────────────────────────────────────────
// Gaya siluet: bentuk besar bergaris putih (seperti Al Faiz no. 62) dan lebih besar; bentuk kecil hitam pekat.
export type BedaTumpuk = { tier: 2 | 3; key: Key; bentuk: string[]; hiasan: string; seed: number; siluet?: boolean };
export const BEDA_TUMPUK: BedaTumpuk[] = [
  { tier: 3, key: "D", bentuk: ["daun", "biji", "pucuk", "kawung", "parang"], hiasan: "koma", seed: 31 },
  { tier: 3, key: "B", bentuk: ["bulu", "ombak", "biji", "daun", "pucuk"], hiasan: "tunas", seed: 32 },
  { tier: 3, key: "E", bentuk: ["molekul3", "molekul4b", "molekul3c", "molekul5c", "molekul3b"], hiasan: "parang", seed: 33, siluet: true },
];
/** Letak bentuk kecil: bagian yang tertutup bentuk besar 20–70% (cek mata 2026-10-28: tanpa tumpang tindih,
 *  depan/belakang tidak terlihat; tertutup penuh, bentuk kecil hilang). */
// Skala [besar, kecil]: gaya lama 0,62/0,36; gaya siluet 0,72/0,4 (objek mengisi sel).
const SK: Record<"lama" | "siluet", [number, number]> = { lama: [0.62, 0.36], siluet: [0.72, 0.4] };
// Gaya siluet: target tertutup 0,25 (bukan 0,4) supaya bentuk hitam yang di depan tidak tampak jauh lebih besar
// daripada yang di belakang — uji sekilas 2026-10-28 menangkap kunci 29% lebih "lain" pada target 0,4.
function letakKecil(nama: string, [sb, sk] = SK.lama, target = 0.4): Pt {
  const besar = tinta(geser(BENTUK[nama], [-6, -4], sb)), calon: [Pt, number][] = [];
  for (let x = -28; x <= 28; x += 4) for (let y = -28; y <= 28; y += 4) {
    const k = [...tinta(geser(BENTUK[nama], [x, y], sk))], tutup = k.filter((q) => besar.has(q)).length / k.length;
    if (tutup >= 0.2 && tutup <= 0.7) calon.push([[x, y], Math.abs(tutup - target) * 60 + Math.hypot(x - 16, y - 14)]);
  }
  assert.ok(calon.length, `${nama}: tidak ada letak bentuk kecil yang menempel sebagian`);
  return calon.sort((p, q) => p[1] - q[1])[0][0];
}
function tumpuk(nama: string, hiasan: string, depan: boolean, ukur: [number, number], rot: T, siluet = false): Fig {
  const [sb, sk] = SK[siluet ? "siluet" : "lama"], g = geser(BENTUK[nama], [-6, -4], sb);
  const besar = siluet ? balikWarna(g) : arsir(g), kecil = geser(BENTUK[nama], letakKecil(nama, [sb, sk], siluet ? 0.25 : 0.4), sk)
    // Siluet: bentuk kecil hitam polos. Guratan putihnya (rusuk kerang) bercampur dengan garis bentuk besar, jadi depan/belakang
    // tidak terbaca (cek mata 2026-10-29).
    .filter((q) => !siluet || q.fill === "b");
  const h1 = geser(ap(rot, BENTUK[hiasan]), [-34, 34], ukur[0]), h2 = geser(ap(rot, BENTUK[hiasan]), [34, -34], ukur[1]);
  // Hiasan yang menempel bentuk besar ikut terbaca "di depan/di belakang" dan mengaburkan aturan (cek mata 2026-10-28).
  const tb = tinta([...g, ...kecil]);
  [h1, h2].forEach((h) => tinta(h).forEach((q) => assert.ok(!tb.has(q), `${nama}: hiasan pojok menempel bentuk tengah`)));
  return [...h1, ...h2, ...(depan ? [...besar, ...kecil] : [...kecil, ...besar])];
}
// Gaya siluet: aturan berpasangan, bukan dua ciri yang sama di empat gambar. Uji sekilas 2026-10-28: bentuk hitam di depan
// selalu tampak sebagai gumpal utuh, jadi kalau hanya kunci yang "di depan", kunci tertebak sekilas. Kini di empat gambar
// berlaku "hitam di depan ⇔ hiasan sama besar"; dua pilihan salah di depan, dua di belakang; kunci melanggar pasangan itu.
function bedaTumpukS(s: BedaTumpuk): Draft {
  const r = rng(s.seed), ki = KEYS.indexOf(s.key), rot = pick(r, ["tetap", "r90", "r270"] as T[]);
  const SAMA: [number, number][] = [[0.24, 0.24], [0.3, 0.3]], BEDA_U: [number, number][] = [[0.2, 0.34], [0.34, 0.2], [0.18, 0.3], [0.3, 0.18]];
  const depanK = r() < 0.5, depan = shuffle(r, [true, true, false, false]);
  const ciriOpsi = s.bentuk.map((_, i) => (i === ki ? { depan: depanK, sama: depanK ? false : true } : (() => { const d = depan[i < ki ? i : i - 1]; return { depan: d, sama: d }; })()));
  const figs = s.bentuk.map((n, i) => tumpuk(n, s.hiasan, ciriOpsi[i].depan, pick(r, ciriOpsi[i].sama ? SAMA : BEDA_U), rot, true));
  const kata = (c: { depan: boolean; sama: boolean }) => `bentuk hitam kecil ada di ${c.depan ? "depan" : "belakang"} dan dua hiasan pojoknya ${c.sama ? "sama besar" : "beda ukuran"}`;
  const salah: Salah[] = figs.flatMap((f, i) => (i === ki ? [] : [{ fig: f, isi: kata(ciriOpsi[i]), alasan: "pasangannya cocok dengan aturan" }]));
  const { opts, gugur } = pasang(figs[ki], salah, s.key, tandaUrut);
  return {
    sub_type: "FIG-BEDA-TUMPUK", tier: s.tier, ...BEDA, key: s.key, opts, stemSvg: "", siluet: true, ciri: ciriDari([...s.bentuk, s.hiasan], "tumpuk"),
    pembahasan: teks({
      tanya: "satu gambar yang aturannya berbeda dari empat gambar lain.",
      cara: ["Bentuk di tengah berbeda di setiap gambar, jadi bentuk bukan petunjuknya.", "Catat dua ciri di setiap gambar: bentuk hitam kecil ada di depan atau di belakang bentuk bergaris, dan dua hiasan pojok sama besar atau tidak.", "Satu ciri saja tidak cukup, karena keduanya muncul di beberapa gambar. Lihat pasangannya: di empat gambar, bila hitam di depan, hiasannya sama besar; bila hitam di belakang, hiasannya beda ukuran."],
      gugur, key: s.key, alasan: `Opsi ${s.key}: ${kata(ciriOpsi[ki])}. Pasangan ini melanggar aturan yang berlaku di empat gambar lain.`,
      analogi: "Seperti aturan lampu lalu lintas: merah selalu berpasangan dengan berhenti. Yang salah bukan warnanya, tetapi pasangan warna dan tindakannya.",
      jebakan: "Gambar yang hitamnya di depan terlihat paling mencolok, tetapi ada beberapa gambar seperti itu. Yang dicari pasangan yang tidak cocok.",
    }),
    pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5), extra: () => "", extraH: 34, foot: ["Aturan: hitam di depan = hiasan sama besar; di belakang = beda ukuran", `Opsi ${s.key}: ${depanK ? "di depan, tetapi hiasan beda ukuran" : "di belakang, tetapi hiasan sama besar"}`] }),
  };
}
export function bedaTumpuk(s: BedaTumpuk): Draft {
  if (s.siluet) return bedaTumpukS(s);
  const r = rng(s.seed), ki = KEYS.indexOf(s.key);
  assert.equal(new Set(s.bentuk).size, 5, "bentuk tengah tiap opsi harus beda (bentuk = bukan aturan)");
  const rot = pick(r, ["tetap", "r90", "r270"] as T[]);
  const figs = s.bentuk.map((n, i) => {
    const beda: [number, number] = pick(r, [[0.2, 0.34], [0.34, 0.2], [0.18, 0.3], [0.3, 0.18]] as [number, number][]);
    return i === ki ? tumpuk(n, s.hiasan, true, [0.27, 0.27], rot) : tumpuk(n, s.hiasan, false, beda, rot);
  });
  const salah: Salah[] = figs.filter((_, i) => i !== ki).map((f) => ({ fig: f, isi: "bentuk hitam kecil ada di belakang dan dua hiasan pojoknya beda ukuran", alasan: "sama dengan tiga opsi lain" }));
  const { opts, gugur } = pasang(figs[ki], salah, s.key, tandaUrut);
  return {
    sub_type: "FIG-BEDA-TUMPUK", tier: s.tier, ...BEDA, key: s.key, opts, stemSvg: "",
    pembahasan: teks({
      tanya: "satu gambar yang aturannya berbeda dari empat gambar lain.",
      cara: ["Bentuk di tengah berbeda di setiap gambar, jadi bentuk bukan petunjuknya.", "Bandingkan dua ciri yang muncul di semua gambar: bentuk hitam kecil ada di depan atau di belakang bentuk berarsir, dan dua hiasan pojok sama besar atau tidak."],
      gugur, key: s.key, alasan: `Hanya opsi ${s.key} yang bentuk hitam kecilnya ada di depan dan dua hiasan pojoknya sama besar.`,
      analogi: "Seperti lima kartu remi bergambar beda: yang kamu cari bukan gambarnya, tetapi kartu yang dicetak dengan cara lain.",
      jebakan: "Mata langsung tertuju pada bentuk tengah yang paling unik. Bentuk tengah memang dibuat berbeda semua, jadi itu bukan aturannya.",
    }),
    pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5), extra: () => "", extraH: 34, foot: ["Empat gambar: hitam kecil di belakang, hiasan pojok beda ukuran", `Opsi ${s.key}: hitam kecil di depan, hiasan pojok sama besar`] }),
  };
}

// ── FIG-MTX-HITUNG ──────────────────────────────────────────────────────────
export type MtxHitung = { tier: 2 | 3; key: Key; cabang: number; tambahBaris: number; kecil: number; kecilBaris: number; seed: number; siluet?: boolean; pusat?: string; kecilBentuk?: string[] };
export const MTX_HITUNG: MtxHitung[] = [
  { tier: 3, key: "C", cabang: 4, tambahBaris: 1, kecil: 1, kecilBaris: 2, seed: 41 },
  // Desain dipertahankan (putusan Gusti 2026-10-28); versi siluet hanya melepas garis tepi.
  { tier: 3, key: "B", cabang: 3, tambahBaris: 1, kecil: 2, kecilBaris: 2, seed: 44, siluet: true },
];
const PINGGIR: Pt[] = [[-38, -38], [0, -40], [38, -38], [40, 0], [38, 38], [0, 40], [-38, 38], [-40, 0], [-20, -40], [20, 40], [40, -20], [-40, 20]];
// Gaya siluet: objek kecil satu keluarga (kuas) supaya biji bisa dipakai soal lain tanpa melanggar `cekPaket`.
function selHitung(nc: number, nk: number, seed: number, siluet = false, pusat?: string, kecilB?: string[]): Fig {
  const r = rng(seed), kecil = kecilB ?? (siluet ? ["koma", "kait", "zigzag"] : ["koma", "biji", "kait"]);
  const tempat = shuffle(r, PINGGIR).slice(0, nk);
  return [...(pusat ? muat(buatHitung(pusat, nc, seed), [0, 0], 66) : geser(gumpal(nc, seed), [0, 0], 0.9)), ...tempat.flatMap((p) => (r() < 0.4 ? [{ k: "circ" as const, c: p, r: 4.5, fill: "b" as const }] : geser(ap(pick(r, ["tetap", "r90", "r180"] as T[]), BENTUK[pick(r, kecil)]), p, 0.13)))];
}
export function mtxHitung(s: MtxHitung): Draft {
  // Objek tengah bisa bergilir keluarga (`pusat`, langkah 1b): luk keris, cabang ranting, rusuk kerang, … ; bawaan = gumpal bercabang.
  const [o, u] = s.pusat ? HITUNG_JENIS[s.pusat].nama : ["gumpal", "cabang"];
  const nc = (r: number, c: number) => s.cabang + r * s.tambahBaris + c, nk = (r: number, c: number) => s.kecil + r * s.kecilBaris + c;
  // Bukti dua arah: aturan baris (+1 tiap kolom) dan aturan kolom (selisih antarbaris tetap) memberi angka yang sama.
  assert.equal(nc(2, 2), nc(1, 2) + (nc(1, 2) - nc(0, 2)), "hitungan cabang tidak konsisten antar-arah");
  assert.equal(nk(2, 2), nk(1, 2) + (nk(1, 2) - nk(0, 2)), "hitungan objek kecil tidak konsisten antar-arah");
  assert.ok(nk(2, 2) <= PINGGIR.length && nc(2, 2) <= 9, "terlalu banyak untuk satu sel");
  const grid = [0, 1, 2].map((r) => [0, 1, 2].map((c) => selHitung(nc(r, c), nk(r, c), s.seed + r * 3 + c, s.siluet, s.pusat, s.kecilBentuk)));
  const C = nc(2, 2), K = nk(2, 2), cari = (a: number, b: number, sd: number) => selHitung(a, b, s.seed + 100 + sd, s.siluet, s.pusat, s.kecilBentuk);
  const kunci = cari(C, K, 0);
  // Pengecoh salah hitung di 1–2 hal; `pilih` menolak susunan yang membuat kunci = nilai tengah atau opsi paling mirip.
  type SelH = { c: number; k: number };
  const ubah: Ubah<SelH>[] = [
    ...([[-1, "kurang satu"], [1, "lebih satu"], [2, "lebih dua"]] as [number, string][]).flatMap(([d, kata]): Ubah<SelH>[] => [
      { grup: 0, ke: (x) => ({ ...x, c: C + d }), isi: `${u} ${C + d} (harusnya ${C})`, nama: `hitungan ${u} ${kata}` },
      { grup: 1, ke: (x) => ({ ...x, k: K + d }), isi: `objek kecil ${K + d} (harusnya ${K})`, nama: `hitungan objek kecil ${kata}` },
    ]),
  ];
  const attrH = (x: SelH) => [String(x.c), String(x.k)];
  const salah = pilih(attrH({ c: C, k: K }), kunci, calonDari({ c: C, k: K }, ubah, attrH, (x) => cari(x.c, x.k, x.c * 20 + x.k), (x) => x.c >= (s.pusat ? HITUNG_JENIS[s.pusat].batas[0] : 3) && x.c <= (s.pusat ? HITUNG_JENIS[s.pusat].batas[1] : 9) && x.k <= PINGGIR.length), s.seed);
  const { opts, gugur } = pasang(kunci, salah, s.key);
  const tulis = (r: number, c: number) => `${nc(r, c)}/${nk(r, c)}`;
  return {
    sub_type: "FIG-MTX-HITUNG", tier: s.tier, ...POLA, key: s.key, opts, siluet: s.siluet, ciri: ciriDari(s.kecilBentuk ?? ["koma", "kait", "zigzag"], "hitung", [s.pusat ?? "gumpal"]),
    stemSvg: layout([grid[0], grid[1], [grid[2][0], grid[2][1], null]], { size: 100, gap: 8 }),
    pembahasan: teks({
      tanya: "sel kanan bawah. Bentuk dan letak objek kecil diacak, jadi yang dihitung hanya jumlahnya.",
      cara: [`Hitung dua hal di setiap sel: ${u} ${o} di tengah dan objek kecil di pinggir.`, `Baris 1: ${tulis(0, 0)}, ${tulis(0, 1)}, ${tulis(0, 2)} (${u}/objek kecil). Keduanya bertambah satu tiap kolom.`, `Baris 3 mulai dari ${tulis(2, 0)}, ${tulis(2, 1)}, jadi sel terakhir ${C} ${u} dan ${K} objek kecil.`, `Cek lewat kolom 3: ${tulis(0, 2)}, ${tulis(1, 2)}, lalu ${C}/${K}. Selisihnya tetap, hasilnya sama.`],
      gugur, key: s.key, alasan: `Opsi ${s.key} satu-satunya yang punya ${C} ${u} dan ${K} objek kecil.`,
      analogi: "Seperti menghitung uang di dompet: bentuk koin dan letaknya tidak penting, jumlahnya yang dicek.",
      jebakan: "Objek kecil berbentuk macam-macam supaya kamu sibuk mencari pola bentuk. Hitung saja semuanya, apa pun bentuknya.",
    }),
    pbhSvg: layout(grid.map((row, r) => row.map((f, c) => (r === 2 && c === 2 ? kunci : f))), { size: 100, gap: 8, hl: [2, 2], minW: 600,
      ann: (at, sz) => [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => textC(at(r, c)[0], at(r, c)[1] + sz / 2 - 4, tulis(r, c), 13, RED))).join(""),
      foot: [`Angka merah = ${u}/objek kecil`, "Keduanya +1 tiap kolom"] }),
  };
}

