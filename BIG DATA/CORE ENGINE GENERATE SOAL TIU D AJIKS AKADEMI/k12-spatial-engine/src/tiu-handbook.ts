/**
 * Handbook TIU D'Ajiks — 10 contoh soal figural Bab 14–18 (putusan T6-5 + T6-8, 2026-11-03). Berkas baru; PAKET/PETA/JENIS
 * tidak disentuh, jadi keluaran TO (.test-out-paket) tetap identik.
 *   npx tsx src/tiu-handbook.ts <out-dir>   → <out>/items.json + <out>/img/*.svg (semua gaya siluet)
 * Pemeriksa (assert, soal gagal = tidak ditulis):
 *   T2-6  keluarga hanya keluarga berparameter TO, benih ≥ 900, pasangan jenis × keluarga tidak ada di PETA Paket 1–3,
 *         kerangka spesifikasi (tanpa nama, benih, kunci) tidak sama dengan soal TO sejenis; satu keluarga ≤ 8 soal;
 *         per bab `cekPaket`.
 *   T5-19 bocor bentuk (`bocor`): kunci bukan pilihan paling lain / paling rata-rata dilihat utuh, bukan pencilan tunggal
 *         jumlah tinta, jumlah bagian, atau rasio lebar-tinggi; kunci tidak sama dengan gambar yang terlihat di soal.
 *   Kunci: 2 per huruf, ≤ 2 berturut. Kunci tunggal = assert di pembuat soal generator (+ `ana1` di bawah).
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Fig, type Key, KEYS, sig } from "./figural-lib";
import { type Draft, layout, optSvg } from "./k12-spasial-core";
import { type T, BENTUK, HITAM, apAll, cekBedaObjek, comp, geser, PETAK, T_ALL, T_NAME, ap, beda, cekPaket, cekSekilas, ciriDari, keluarga, kotak, kiral, pasang, siluet, tata, tinta } from "./tiu-bentuk";
import { teks } from "./tiu-fig-beda-seri";
import { JENIS } from "./tiu-jenis";
import { PAKET } from "./tiu-paket";
import { PETA } from "./tiu-peta-paket";

// ── FIG-ANA-OBJ satu objek (G5): pilih() butuh ≥ 2 atribut, jadi pengecoh satu objek dirakit langsung dari delapan gerak ──
type Ana1 = { tier: 2; key: Key; a: string; c: string; t: T; salah: [T, string][] };
function ana1(s: Ana1): Draft {
  const A = BENTUK[s.a], C = BENTUK[s.c], sel = (f: Fig) => tata([f], HITAM, "tetap", PETAK[1][0]);
  [A, C].forEach((f) => assert.ok(kiral(f), "bentuk harus kiral"));
  assert.equal(T_ALL.filter((u) => sig(ap(u, A)) === sig(ap(s.t, A))).length, 1, "perubahan (1)→(2) tidak tunggal");
  const cel = [sel(A), sel(ap(s.t, A)), sel(C)], kunci = sel(ap(s.t, C));
  const { opts, gugur } = pasang(kunci, s.salah.map(([u, why]) => ({ fig: sel(ap(u, C)), isi: `gambar (3) ${T_NAME[u]}`, alasan: why })), s.key);
  return {
    sub_type: "FIG-ANA-OBJ", tier: s.tier, instruksi: "Perhatikan hubungan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?", key: s.key, opts, siluet: true,
    ciri: ciriDari([s.a, s.c], "petak1-0"),
    stemSvg: layout([[...cel, null]], { size: 104, gap: 40, seps: [":", "=", ":"] }),
    pembahasan: teks({ tanya: "gambar (4) supaya hubungan (1):(2) sama dengan (3):(4).", cara: [`Gambar (1) ke (2): ${T_NAME[s.t]}.`, `Kenakan gerak yang sama pada gambar (3).`], gugur, key: s.key,
      alasan: `Opsi ${s.key} adalah gambar (3) yang ${T_NAME[s.t]}.`, analogi: "-", jebakan: "-" }),
    pbhSvg: layout([[...cel, kunci]], { size: 104, gap: 40, seps: [":", "=", ":"], hl: [0, 3], foot: [`Gerak: ${T_NAME[s.t]}`] }),
  };
}

// ── 10 slot (urut buku). `kode` = kode kekeliruan per pengecoh (dari kalimat gugur generator, lihat KODE). ──
type Slot = { id: string; bab: number; jenis: string; spec: Record<string, unknown>; target: number };
export const SLOT: Slot[] = [
  { id: "B14-C01", bab: 14, jenis: "FIG-ANA-OBJ", target: 45, spec: { satu: true, tier: 2, key: "D", a: "tanduk5-901", c: "helai4-903", t: "md1",
    salah: [["md2", "garis cerminnya salah"], ["r90", "putaran dikira cermin"], ["mkk", "hanya cermin kiri-kanan"], ["tetap", "gambar (3) disalin tanpa diubah"]] } },
  { id: "B14-C02", bab: 14, jenis: "FIG-ANA-OBJ", target: 60, spec: {"tier":3,"key":"A","a":["tanduk4-951","cakar3-952"],"c":["tanduk5-955","cakar4-956"],"ts":["mkk","tetap"],"q":2,"tukar":[0,1],"siluet":true,"petak":1} },
  { id: "B15-C01", bab: 15, jenis: "FIG-SERI-P3", target: 40, spec: { tier: 2, key: "E", bentuk: ["pakis5-902", "cakar4-901", "helai4-902"], t: "mab", rupa: ["hitam", "hitam", "hitam"] } },
  { id: "B15-C02", bab: 15, jenis: "FIG-SERI-P3", target: 55, spec: {"tier":3,"key":"E","bentuk":["cakar3-961","pakis4-962","tanduk6-963"],"t":"md2","siluet":true,"bintik":3} },
  { id: "B16-C01", bab: 16, jenis: "FIG-ANA-OBJ", target: 45, spec: { tier: 2, key: "B", a: ["helai5-921", "cakar4-922"], c: ["helai4-923", "cakar3-924"], ts: ["mab", "mab"], q: 2, siluet: true, petak: 1 } },
  { id: "B16-C02", bab: 16, jenis: "FIG-ANA-UBAH", target: 70, spec: {"tier":3,"key":"D","a":[{"jenis":"tanduk","n":5,"seed":1031},{"jenis":"helai","n":3,"seed":1032},"cakar4-1003"],"c":[{"jenis":"tanduk","n":6,"seed":1034},{"jenis":"helai","n":3,"seed":1035},"cakar3-1004"],"dn":[-1,2],"tukar":true,"t":"mab","q":1,"siluet":true} },
  { id: "B17-C01", bab: 17, jenis: "FIG-BEDA-PUTAR", target: 45, spec: {"tier":3,"key":"C","bentuk":["tanduk5-991","helai4-992"],"petak":1,"cermin":1,"seed":993,"acak":true} },
  { id: "B17-C02", bab: 17, jenis: "FIG-BEDA-HITUNG", target: 55, spec: { tier: 3, key: "A", siluet: true, seed: 959, butir: ["cakar3-951", "pakis3-952", "tanduk3-953"], namaButir: ["cakar", "pakis", "tanduk"] } },
  { id: "B18-C01", bab: 18, jenis: "FIG-MTX-PUTAR", target: 60, spec: { tier: 3, key: "C", bentuk: ["tanduk5-961", "helai4-962", "cakar3-966"], arah: "kolom", t1: "mab", t2: "r270", sudut: false, siluet: true, awal: ["r90", "tetap", "r180"] } },
  { id: "B18-C02", bab: 18, jenis: "FIG-MTX-HITUNG", target: 45, spec: { tier: 3, key: "B", cabang: 3, tambahBaris: 0, kecil: 2, kecilBaris: 1, seed: 972, siluet: true, pusat: "helai", kecilBentuk: ["cakar3-900", "tanduk3-901", "cakar4-902"] } },
];

// Kode kekeliruan (engine v0.4.3 Pilar 3) per pilihan salah, ditetapkan penyusun dari kalimat gugur generator
// (urutan huruf deterministik). Kode hanya untuk lembar reviu, tidak tampil di buku siswa.
const KODE: Record<string, Record<string, string>> = {
  "B14-C01": { A: "JF-SUMBU", B: "JF-PUTCER", C: "JF-SUMBU", E: "JF-SALIN" },
  "B14-C02": { B: "J-LANGKAH+JF-SUMBU", C: "JF-SUMBU+JF-WARNA", D: "JF-WARNA+JF-TUKAR", E: "JF-WARNA" },
  "B15-C01": { A: "JF-PUTCER", B: "JF-SUMBU", C: "JF-SALIN", D: "JF-PUTCER" },
  "B15-C02": { A: "JF-PUTCER+J-LANGKAH", B: "JF-PUTCER+JF-OBJEK", C: "JF-PUTCER", D: "JF-OBJEK" },
  "B16-C01": { A: "JF-SUMBU+JF-WARNA", C: "J-LANGKAH+JF-PUTCER", D: "JF-SATU", E: "JF-PUTCER" },
  "B16-C02": { A: "J-LANGKAH", B: "JF-HITUNG+JF-PUTCER", C: "JF-HITUNG+JF-SUMBU", E: "JF-TUKAR+JF-PUTCER" },
  "B17-C01": { A: "J-PENGALIH", B: "J-PENGALIH", D: "J-PENGALIH", E: "J-PENGALIH" },
  "B17-C02": { B: "J-PENGALIH", C: "J-PENGALIH", D: "J-PENGALIH", E: "J-PENGALIH" },
  "B18-C01": { A: "J-LANGKAH", B: "JF-AWAL", D: "JF-ARAH", E: "JF-SUMBU" },
  "B18-C02": { A: "JF-HITUNG", C: "JF-HITUNG", D: "JF-HITUNG", E: "JF-HITUNG" },
};

// ── pemeriksa T2-6 ──
const NAMA = /^(tunas|sabit|pita|rantai|ikalkembar|molekul|awan|keris|padi|ranting|kerang|gulung|teratai|batu|sayap|cakar|pakis|tanduk|helai)(\d*)-(\d+)(u?)$/;
/** Keluarga khusus handbook (T6-10): bentuk dasar digambar codex CLI (tiu-pola-hb.ts). */
const HB_KELUARGA = new Set(["cakar", "pakis", "tanduk", "helai"]);
const TO_KELUARGA = new Set(Object.values(PETA).flatMap((p) => p.slot.flatMap((s) => [...s.bentuk, ...(s.hitung ?? [])].map(keluarga))));
const TO_PASANGAN = new Set(Object.values(PETA).flatMap((p) => p.slot.flatMap((s) => [...s.bentuk, ...(s.hitung ?? [])].map((b) => `${s.jenis}|${keluarga(b)}`))));
const kerangka = (x: unknown): unknown => (typeof x === "string" ? (NAMA.test(x) ? "_" : x) : Array.isArray(x) ? x.map(kerangka)
  : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).filter(([k]) => !["key", "seed", "satu", "salah"].includes(k)).map(([k, v]) => [k, kerangka(v)])) : x);
const TO_KERANGKA = new Set(Object.values(PAKET).flatMap((p) => p.map(([j, s]) => `${j}|${JSON.stringify(kerangka(s))}`)));
function cekTO(s: Slot, d: Draft) {
  const nama = JSON.stringify(s.spec).match(/"[a-z]+\d*-\d+u?"/g)!.map((x) => x.slice(1, -1)).filter((x) => NAMA.test(x));
  nama.forEach((n) => assert.ok(+n.match(NAMA)![3] >= 900, `${s.id}: ${n} benih < 900`));
  JSON.stringify(s.spec).match(/"seed":\d+/g)?.forEach((x) => assert.ok(+x.split(":")[1] >= 900, `${s.id}: ${x} < 900`));
  d.ciri!.keluarga.forEach((k) => {
    assert.ok(TO_KELUARGA.has(k) || HB_KELUARGA.has(k), `${s.id}: keluarga ${k} bukan keluarga TO/handbook`);
    assert.ok(!(HB_KELUARGA.has(k) && TO_KELUARGA.has(k)), `${s.id}: keluarga handbook ${k} dipakai TO`);
    assert.ok(!TO_PASANGAN.has(`${s.jenis}|${k}`), `${s.id}: pasangan ${s.jenis} × ${k} sudah dipakai TO`);
  });
  assert.ok(!TO_KERANGKA.has(`${s.jenis}|${JSON.stringify(kerangka(s.spec))}`), `${s.id}: kerangka spesifikasi sama dengan soal TO`);
}

// ── pemeriksa bocor bentuk (T5-19, versi gambar) ──
const pencilan = (v: (string | number)[]) => { const c = new Map<string, number>(); v.forEach((x) => c.set(String(x), (c.get(String(x)) ?? 0) + 1)); return c.size === 2 && [...c.values()].includes(1) ? v.findIndex((x) => c.get(String(x)) === 1) : -1; };
/** Kunci tidak boleh ekstrem sendirian dengan selisih > `batas` (relatif) dari pilihan terdekat berikutnya. */
const ekstrem = (v: number[], ki: number, batas: number) => { const lain = v.filter((_, i) => i !== ki); return v[ki] > Math.max(...lain) * (1 + batas) || v[ki] < Math.min(...lain) * (1 - batas); };
/** Ciri satu pilihan = tiap objek (primitif yang kotaknya bersinggungan digabung): rupa+arah+warna tanpa letak, letak,
 *  ditambah banyak objek dan banyak objek kecil (bintik, butir). Skor = rata-rata banyak pilihan lain yang punya ciri itu. */
export function ciriOpsi(f: Fig) {
  const B = f.map((q) => kotak([q])), induk = f.map((_, i) => i), akar = (i: number): number => (induk[i] === i ? i : (induk[i] = akar(induk[i])));
  B.forEach((a, i) => B.forEach((b, j) => { if (j > i && a[0] <= b[2] + 1 && b[0] <= a[2] + 1 && a[1] <= b[3] + 1 && b[1] <= a[3] + 1) induk[akar(i)] = akar(j); }));
  const grup = new Map<number, Fig>(); f.forEach((q, i) => grup.set(akar(i), [...(grup.get(akar(i)) ?? []), q]));
  const obj = [...grup.values()].map((g) => { const [x0, y0, x1, y1] = kotak(g), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; return { g, cx, cy, kecil: Math.max(x1 - x0, y1 - y0) < 14 }; });
  return new Set([...obj.flatMap((o) => [`S${sig(geser(o.g, [-o.cx, -o.cy]))}`, `P${Math.round(o.cx / 12)},${Math.round(o.cy / 12)}`]), `K${obj.length}`, `N${obj.filter((o) => o.kecil).length}`]);
}
/** Sumbu ciri (cek buta 2): tiap objek dikenali menurut bentuknya tanpa arah dan warna (identitas = sig terkecil dari 8 gerak,
 *  semua isi dihitamkan); untuk tiap identitas dibaca tiga sumbu: arah, warna, letak. Ditambah sumbu tata letak (identitas di tiap
 *  letak), banyak objek, dan banyak objek kecil. Objek yang tidak ada di sebuah pilihan bernilai "∅". */
/** Objek satu pilihan: primitif yang kotaknya berjarak ≤ 4 satuan digabung (batu bertumpuk = satu objek); isi dihitamkan, digeser ke pusat kotaknya. */
function objekOpsi(f: Fig) {
  const B = f.map((q) => kotak([q])), induk = f.map((_, i) => i), akar = (i: number): number => (induk[i] === i ? i : (induk[i] = akar(induk[i])));
  B.forEach((a, i) => B.forEach((b, j) => { if (j > i && a[0] <= b[2] + 4 && b[0] <= a[2] + 4 && a[1] <= b[3] + 4 && b[1] <= a[3] + 4) induk[akar(i)] = akar(j); }));
  const grup = new Map<number, Fig>(); f.forEach((q, i) => grup.set(akar(i), [...(grup.get(akar(i)) ?? []), q]));
  return [...grup.values()].map((g) => { const [x0, y0, x1, y1] = kotak(g), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return { g: geser(g, [-cx, -cy]).map((q) => ({ ...q, fill: "b" }) as typeof q), garis: g.some((q) => q.fill === "w"), pos: `${Math.round(cx / 12)},${Math.round(cy / 12)}`, kecil: Math.max(x1 - x0, y1 - y0) < 14 }; });
}
/** Sumbu ciri tiap pilihan. Objek dikenali lintas pilihan menurut bentuknya tanpa arah dan warna (beda piksel ≤ 0,12 dengan
 *  salah satu dari 8 gerak wakil identitas); per identitas dibaca sumbu arah (gerak terhadap wakil), warna, dan letak; ditambah
 *  tata letak, banyak objek, banyak objek kecil. Objek yang tidak ada bernilai "∅". */
export function sumbuSemua(o: Fig[]): Map<string, string>[] {
  const wakil: Fig[] = [];
  return o.map((f) => {
    const m = new Map<string, string>(), letak: string[] = [], ob = objekOpsi(f);
    for (const x of ob.filter((y) => !y.kecil)) {
      let id = -1, arah = "tetap";
      for (let w = 0; w < wakil.length && id < 0; w++) for (const t of T_ALL) if (beda(ap(t, wakil[w]), x.g) <= 0.12) { id = w; arah = t; break; }
      if (id < 0) { wakil.push(x.g); id = wakil.length - 1; }
      m.set(`${id}:arah`, arah); m.set(`${id}:warna`, x.garis ? "garis" : "hitam"); m.set(`${id}:letak`, x.pos); letak.push(`${x.pos}=${id}`);
    }
    m.set("tata", letak.sort().join("|")); m.set("banyak", String(ob.filter((y) => !y.kecil).length)); m.set("kecil", String(ob.filter((y) => y.kecil).length));
    return m;
  });
}
export function pilihanTengah(o: Fig[]) {
  const S = sumbuSemua(o), sumbu = [...new Set(S.flatMap((x) => [...x.keys()]))], nilai = (i: number, k: string) => S[i].get(k) ?? "∅";
  // (a) semua sumbu pilihan i dimiliki ≥ 1 pilihan lain; (b) di setiap sumbu nilai pilihan i = mayoritas (≥ 2, tidak kalah) di 4 pilihan lain
  const semua = o.map((_, i) => sumbu.every((k) => o.some((__, j) => j !== i && nilai(j, k) === nilai(i, k))));
  const mayor = o.map((_, i) => sumbu.every((k) => { const c = new Map<string, number>(); o.forEach((__, j) => j !== i && c.set(nilai(j, k), (c.get(nilai(j, k)) ?? 0) + 1));
    const v = c.get(nilai(i, k)) ?? 0; return v >= 2 && v >= Math.max(...c.values()); }));
  return { semua, mayor };
}
export const skorCiri = (o: Fig[]) => { const C = o.map(ciriOpsi); return C.map((S, i) => [...S].reduce((t, c) => t + C.filter((T, k) => k !== i && T.has(c)).length, 0) / S.size); };
/** Uji 7: kunci = pilihan tengah bila (a) skornya tertinggi sendirian, atau (b) usul koordinator: setiap ciri kunci dimiliki
 *  pilihan lain dan setiap pengecoh punya ciri yang tidak dimiliki pilihan lain. */
export function irisanCiri(o: Fig[], ki: number) {
  const sk = skorCiri(o), C = o.map(ciriOpsi), lain = (i: number, c: string) => C.some((T, k) => k !== i && T.has(c));
  const tengah = sk[ki] > Math.max(...sk.filter((_, i) => i !== ki)) + 1e-9;
  const irisan = [...C[ki]].every((c) => lain(ki, c)) && C.every((S, i) => i === ki || [...S].some((c) => !lain(i, c)));
  // (c) sumbu ciri, cek buta 2: kunci = mayoritas di setiap sumbu, atau kunci termasuk ≤ 2 pilihan yang semua cirinya dimiliki
  //     pilihan lain (pilihan dengan ciri menyendiri digugurkan, sisa ≤ 2 → tebakan 50%).
  const pt = pilihanTengah(o);
  return tengah || irisan || pt.mayor[ki] || (pt.semua[ki] && pt.semua.filter(Boolean).length <= 2);
}
export function bocor(d: Draft, id: string, terlihat: Fig[] = []) {
  const ki = KEYS.indexOf(d.key), o = d.opts;
  cekSekilas(o, d.key, id);                                                     // 1. kunci paling lain dilihat utuh (≤ 15%)
  const m = o.map((a, i) => o.reduce((t, b, k) => t + (i === k ? 0 : beda(a, b)), 0) / 4);
  assert.ok(m[ki] >= Math.min(...m.filter((_, i) => i !== ki)) * 0.98, `${id}: kunci paling mirip ke semua pilihan (${m.map((x) => x.toFixed(2)).join(" ")})`); // 1b. paling rata-rata
  const tintaN = o.map((f) => tinta(f).size), bagian = o.map((f) => f.length), kt = o.map((f) => { const [x0, y0, x1, y1] = kotak(f); return Math.round(((x1 - x0) / (y1 - y0)) * 10) / 10; });
  assert.ok(!ekstrem(tintaN, ki, 0.08), `${id}: kunci paling banyak/sedikit tintanya sendirian (${tintaN.join(" ")})`); // 2. tinta
  assert.notEqual(pencilan(bagian), ki, `${id}: kunci satu-satunya dengan jumlah bagian ${bagian[ki]}`);               // 3. jenis/jumlah bagian
  assert.notEqual(pencilan(kt), ki, `${id}: kunci satu-satunya dengan rasio lebar-tinggi ${kt[ki]}`);                  // 4. rasio
  terlihat.forEach((f) => assert.notEqual(sig(f), sig(o[ki]), `${id}: kunci sama dengan gambar yang terlihat`));      // 5. salinan
  // 7. irisan ciri (temuan cek buta 1, 2026-11-04): ciri = tiap bagian gambar beserta letak dan arahnya (sig satu primitif).
  //    Bocor bila setiap ciri kunci juga ada di pilihan lain, sedangkan setiap pengecoh punya ciri yang tidak dimiliki
  //    pilihan lain: kunci = "pilihan tengah" yang tertebak dengan mencari bagian yang paling sering muncul.
  assert.ok(!irisanCiri(o, ki), `${id}: kunci = irisan ciri pilihan lain`);
  return { sekilas: m.map((x) => +x.toFixed(2)), tinta: tintaN, bagian, rasio: kt, irisan: "lulus" };
}

/** MTX-PUTAR: arah satu ujung bentuk (titik atas) per sel. Bila baris 1 dan 2 memuat tiga arah yang sama (urutan lain),
 *  siswa membaca "persegi latin arah" dan mencari arah yang hilang di baris 3 (cek buta 1, B18-C01 lama) → tolak. */
function cekLatin(sp: Record<string, unknown>, id: string) {
  const arah = (t: T[]) => { const [q] = t.reduce((f, u) => ap(u, f), [{ k: "circ", c: [0, -30], r: 1, fill: "b" }] as Fig); return q.k === "circ" ? q.c.join() : ""; };
  const aw = sp.awal as T[], st = [[], [sp.t1], [sp.t1, sp.t2]] as T[][];
  const baris = (r: number) => new Set([0, 1, 2].map((c) => (sp.arah === "baris" ? arah([aw[c], ...st[r]]) : arah([aw[r], ...st[c]]))));
  const [a, b] = [baris(0), baris(1)];
  assert.ok(!(a.size === 3 && [...a].every((x) => b.has(x))), `${id}: arah sel baris 1 dan 2 sama (terbaca persegi latin)`);
  // Cek buta 2: bacaan "deret k = satu gerak dari deret j" (j < k) tiap pasangan deret. Gerak lain yang di semua sel terlihat
  // berbeda ≤ 0,5 piksel dari sel sebenarnya terbaca cocok oleh mata (bagian berat di tempat yang sama) → soal ambigu.
  const sel = (r: number, c: number) => (sp.arah === "baris" ? apAll(st[r], ap(aw[c], BENTUK[(sp.bentuk as string[])[c]])) : apAll(st[c], ap(aw[r], BENTUK[(sp.bentuk as string[])[r]])));
  const at = (k: number, i: number) => (sp.arah === "baris" ? sel(k, i) : sel(i, k));
  for (const [j, k] of [[0, 1], [0, 2], [1, 2]]) {
    const benar = st[k].slice(st[j].length).reduce((x: T, y: T) => comp(x, y), "tetap" as T);
    for (const u of T_ALL) if (u !== benar) {
      const vis = [0, 1, 2].filter((i) => !(k === 2 && i === 2));
      assert.ok(!vis.every((i) => beda(ap(u, at(j, i)), at(k, i)) <= 0.5), `${id}: deret ${k + 1} terbaca deret ${j + 1} ${T_NAME[u]} (bacaan kedua)`);
    }
  }
}
export const buat = (s: Slot): Draft => (s.jenis === "FIG-MTX-PUTAR" && cekLatin(s.spec, s.id), s.jenis === "FIG-SERI-P3" && cekBedaObjek(s.spec.bentuk as string[], s.id), s.spec.satu ? ana1(s.spec as unknown as Ana1) : JENIS[s.jenis].buat(s.spec as never));
const ciriSlot = (s: Slot, d: Draft) => d.ciri ?? ciriDari(s.spec.bentuk as string[], "seri6");

if (process.argv[1]?.endsWith("tiu-handbook.ts")) {
  const out = process.argv[2];
  assert.ok(out, "pakai: npx tsx src/tiu-handbook.ts <out-dir>");
  mkdirSync(join(out, "img"), { recursive: true });
  const drafts = SLOT.map((s) => { try { const d = buat(s); d.ciri = ciriSlot(s, d); return d; } catch (e) { throw new Error(`${s.id}: ${(e as Error).message}`); } });
  // kunci: 2 per huruf, ≤ 2 berturut
  const seq = drafts.map((d) => d.key).join("");
  KEYS.forEach((k) => assert.equal(seq.split(k).length - 1, 2, `kunci ${k} tidak 2× (${seq})`));
  assert.ok(!/(.)\1\1/.test(seq), `kunci berderet > 2 (${seq})`);
  // keluarga ≤ 8 soal seluruh buku; per bab cekPaket
  const kel = new Map<string, number>(); drafts.forEach((d) => d.ciri!.keluarga.forEach((k) => kel.set(k, (kel.get(k) ?? 0) + 1)));
  kel.forEach((n, k) => assert.ok(n <= 8, `keluarga ${k} ${n} soal`));
  [14, 15, 16, 17, 18].forEach((b) => cekPaket(SLOT.flatMap((s, i) => (s.bab === b ? [{ id: s.id, ...drafts[i].ciri! }] : []))));
  const items = SLOT.map((s, i) => {
    const d = drafts[i];
    cekTO(s, d);
    const ukur = bocor(d, s.id);
    assert.deepEqual(Object.keys(KODE[s.id]), KEYS.filter((k) => k !== d.key), `${s.id}: kode tidak sesuai pilihan salah`);
    const kode = { ...KODE[s.id], [d.key]: "kunci" };
    const f: Record<string, string> = { ...(d.stemSvg ? { [`img/${s.id}.svg`]: d.stemSvg } : {}), [`img/${s.id}-pembahasan.svg`]: d.pbhSvg, ...Object.fromEntries(d.opts.map((o, j) => [`img/${s.id}-${KEYS[j]}.svg`, optSvg(o)])) };
    for (const [p, c] of Object.entries(f)) writeFileSync(join(out, p), siluet(c));
    return { id: `HB-TIU-${s.id}`, bab: s.bab, jenis: s.jenis, tier: d.tier, target_detik: s.target, instruksi: d.instruksi, tanya: d.stem,
      gambar: d.stemSvg ? `img/${s.id}.svg` : null, opsi_gambar: Object.fromEntries(KEYS.map((k) => [k, `img/${s.id}-${k}.svg`])), kunci: d.key, kode,
      keluarga: d.ciri!.keluarga, bentuk: d.ciri!.bentuk, spec: s.spec, bocor: ukur, bahan_pembahasan: d.pembahasan, gambar_pembahasan: `img/${s.id}-pembahasan.svg` };
  });
  writeFileSync(join(out, "items.json"), JSON.stringify(items, null, 2) + "\n");
  console.log(`tiu-handbook: 10 soal lulus (T2-6, bocor bentuk, kunci tunggal) · kunci ${seq} · keluarga ${JSON.stringify(Object.fromEntries(kel))} -> ${out}`);
}
