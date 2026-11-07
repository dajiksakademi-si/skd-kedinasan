import assert from "node:assert/strict";
import { type Fig, type Key, type Pt, KEYS, r1, sig, tf } from "./figural-lib";
import { BENDA, TEMA } from "./tiu-aset";
import { POLA, awan, batu, gulung, sayap, teratai, ikalGanda, kerang, keris, molekulAcak, padi, pita, rantai, ranting, sabit, tunas } from "./tiu-pola";
import { GAYA as GAYA_LAMA, arsir, balikWarna } from "./tiu-gaya";
import { bulu, cakar, sulur, tanduk } from "./tiu-pola-hb";

// TIU SKD (D'Ajiks): bentuk kiral + 8 transformasi persegi. Bentuk kiral = kedelapan hasil transformasinya
// berbeda, jadi "diputar" tidak pernah sama dengan "dicermin" (pelajaran Al Faiz Part 39 no. 58, Paket 41 no. 60/63).

// ── 8 transformasi persegi (tf: cermin sumbu tegak dulu, lalu putar searah jarum jam) ──────────────
export type T = "tetap" | "r90" | "r180" | "r270" | "mkk" | "mab" | "md1" | "md2";
export const T_ALL: T[] = ["tetap", "r90", "r180", "r270", "mkk", "mab", "md1", "md2"];
const TF: Record<T, [number, boolean]> = { tetap: [0, false], r90: [90, false], r180: [180, false], r270: [270, false], mkk: [0, true], mab: [180, true], md1: [90, true], md2: [270, true] };
export const T_NAME: Record<T, string> = {
  tetap: "tidak berubah", r90: "diputar 90° searah jarum jam", r180: "diputar 180°", r270: "diputar 90° berlawanan arah jarum jam",
  mkk: "dicermin kiri-kanan", mab: "dicermin atas-bawah", md1: "dicermin pada garis miring /", md2: "dicermin pada garis miring \\",
};
export const ap = (t: T, f: Fig): Fig => tf(f, ...TF[t]);
export const apAll = (ts: T[], f: Fig) => ts.reduce((g, t) => ap(t, g), f);
/** Satu transformasi yang sama dengan menjalankan a lalu b. */
export const comp = (a: T, b: T): T => { const s = sig(ap(b, ap(a, ACUAN))); return T_ALL.find((t) => sig(ap(t, ACUAN)) === s)!; };
export const inv = (t: T): T => T_ALL.find((u) => comp(t, u) === "tetap")!;
const ACUAN: Fig = [{ k: "poly", pts: [[-6, -36], [6, -36], [6, 18], [16, 18], [16, 4], [28, 4], [28, 30], [-6, 30]], fill: "b" }];
export const isRot = (t: T) => t === "tetap" || t[0] === "r";

// ── bentuk: tiga gaya organik (tiu-gaya.ts); nama unik lintas gaya ─────────────────────────────
/** Semua gaya: tiga gaya organik + benda (tiu-aset.ts) + pola berparameter (tiu-pola.ts). */
export const GAYA: Record<string, Record<string, Fig>> = { ...GAYA_LAMA, benda: BENDA, pola: POLA };
/** Keluarga berparameter (langkah 1, 2026-10-29): nama "<keluarga><n>-<seed>[u]" dibuat saat diminta, mis. "tunas5-3u"
 *  = tunas 5 daun, varian 3, dengan guratan putih. Bentuk tanpa batas; tiap nama baru langsung diuji kiral + beda putar/cermin. */
const POLA_FN: Record<string, (n: number, seed: number, u: boolean) => Fig> = {
  tunas: (n, s, u) => tunas(n || 4, s, u), sabit: (n, s, u) => sabit(n || 4, s, u), pita: (n, s, u) => pita(n || 4, s, u),
  rantai: (n, s) => rantai(n || 5, s), ikalkembar: (_, s, u) => ikalGanda(s, u), molekul: (n, s) => molekulAcak(n || 4, s),
  awan: (n, s) => awan(n || 3, s), keris: (n, s, u) => keris(n || 5, s, u), padi: (n, s) => padi(n || 6, s), ranting: (n, s) => ranting(n || 4, s),
  kerang: (n, s) => kerang(n || 5, s), gulung: (n, s) => gulung(n || 3, s),
  teratai: (n, s) => teratai(n || 5, s), batu: (n, s) => batu(n || 4, s), sayap: (n, s) => sayap(n || 5, s),
  // Khusus handbook (T6-10, 2026-11-04): digambar codex CLI di tiu-pola-hb.ts (fungsi sulur→pakis, bulu→helai: nama sulur/bulu sudah dipakai bentuk lama TO); tidak dipakai TO.
  cakar: (n, s) => cakar(n || 4, s), pakis: (n, s) => sulur(n || 4, s), tanduk: (n, s) => tanduk(n || 5, s), helai: (n, s) => bulu(n || 4, s),
};
/** Keluarga yang boleh jadi objek HITUNG: [batas jumlah yang masih bisa dihitung mata, nama objek, nama bagian].
 *  Sabit dan padi tidak masuk: gerigi/bulir bisa berimpit sehingga hitungan meragukan (cek mata 2026-10-29). */
export const HITUNG_JENIS: Record<string, { batas: [number, number]; nama: [string, string] }> = {
  keris: { batas: [3, 9], nama: ["keris", "luk"] }, ranting: { batas: [3, 7], nama: ["ranting", "cabang"] }, kerang: { batas: [4, 9], nama: ["kerang", "rusuk"] },
  tunas: { batas: [3, 7], nama: ["tunas", "daun"] }, teratai: { batas: [3, 7], nama: ["teratai", "kelopak"] }, batu: { batas: [2, 6], nama: ["susunan batu", "batu"] },
  sayap: { batas: [3, 7], nama: ["sayap", "bulu"] }, awan: { batas: [2, 5], nama: ["awan", "lapis"] }, rantai: { batas: [3, 7], nama: ["rantai", "manik"] },
  // Handbook (T6-10): batas atas dipotong dari cek mata lembar codex (pakis/helai ≥ 6 daun menipis, cakar ≥ 5 jari berimpit).
  cakar: { batas: [3, 4], nama: ["cakar", "jari"] }, pakis: { batas: [3, 5], nama: ["pakis", "daun"] }, tanduk: { batas: [3, 7], nama: ["tanduk", "cincin"] }, helai: { batas: [3, 5], nama: ["bulu", "helai"] },
};
/** Objek hitung keluarga `jenis` dengan tepat n bagian (tanpa uji kiral: objek hitung tidak diputar). */
export const buatHitung = (jenis: string, n: number, seed: number): Fig => {
  const [lo, hi] = HITUNG_JENIS[jenis].batas;
  assert.ok(n >= lo && n <= hi, `${jenis}: ${n} di luar batas hitung ${lo}–${hi}`);
  return muat(POLA_FN[jenis](n, seed, false), [0, 0], 80);
};
const NAMA_POLA = /^(tunas|sabit|pita|rantai|ikalkembar|molekul|awan|keris|padi|ranting|kerang|gulung|teratai|batu|sayap|cakar|pakis|tanduk|helai)(\d*)-(\d+)(u?)$/;
function buatPola(nama: string): Fig | undefined {
  const m = nama.match(NAMA_POLA);
  if (!m) return undefined;
  // Diseragamkan ke kotak ±40 di tengah, seperti bentuk lama (generator gaya lama memakai skala langsung).
  const f = muat(POLA_FN[m[1]](+m[2], +m[3], m[4] === "u"), [0, 0], 80);
  assert.ok(kiral(f), `bentuk ${nama} tidak kiral; pakai varian lain`);
  assert.ok(bedaMin(f) >= BEDA_MIN, `bentuk ${nama}: putar dan cermin terlalu mirip (${bedaMin(f).toFixed(2)}); pakai varian lain`);
  return f;
}
// ponytail: Proxy supaya semua pemanggil BENTUK[nama] otomatis mengenal nama berparameter tanpa diubah satu per satu.
export const BENTUK: Record<string, Fig> = new Proxy(Object.assign({}, ...Object.values(GAYA)) as Record<string, Fig>, {
  get: (t, k) => (typeof k !== "string" || k in t ? t[k as string] : (t[k] = buatPola(k)!)),
});
export const GAYA_DARI: Record<string, string> = Object.fromEntries(Object.entries(GAYA).flatMap(([g, m]) => Object.keys(m).map((n) => [n, g])));
export const NAMA = Object.keys(BENTUK);
/** Keluarga bentuk untuk pemeriksa paket: tema benda (sulur, tinta, …), molekul, atau gaya lama (alam, nusantara, kuas, pola). */
/** `jumlah` nama varian yang lolos uji, mulai dari seed `dari` (varian gagal dilewati), mis. varian("sabit", 4, 3). */
export function varian(kel: string, n: number, jumlah: number, dari = 1, u = false): string[] {
  const out: string[] = [];
  for (let sd = dari; out.length < jumlah && sd < dari + 200; sd++) { const nm = `${kel}${n || ""}-${sd}${u ? "u" : ""}`; try { if (BENTUK[nm]) out.push(nm); } catch { /* varian gagal uji, lewati */ } }
  assert.equal(out.length, jumlah, `varian ${kel}${n}: kurang dari ${jumlah} yang lolos`);
  return out;
}
export const keluarga = (n: string) => n.match(NAMA_POLA)?.[1] ?? (n.startsWith("molekul") ? "molekul" : GAYA_DARI[n] === "benda" ? TEMA[n] : GAYA_DARI[n] ?? n);
/** Ciri tampilan satu soal (keluarga bentuk, susunan, nama bentuk) — dipakai `cekPaket` supaya soal satu paket tidak identik. */
export type Ciri = { keluarga: string[]; susunan: string; bentuk: string[] };
export const ciriDari = (bentuk: string[], susunan: string, lain: string[] = []): Ciri => ({ keluarga: [...new Set([...bentuk.map(keluarga), ...lain])], susunan, bentuk });
export function kiral(f: Fig) { return new Set(T_ALL.map((t) => sig(ap(t, f)))).size === 8; }
/** Piksel hitam (grid 2 satuan) — untuk mengukur beda yang terlihat mata, bukan hanya beda koordinat. */
const pip = (P: Pt[], [x, y]: Pt) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
/** Piksel hitam di tempat aslinya (tanpa digeser ke tengah) — untuk mengukur tumpang tindih dua objek. */
export function tinta(f: Fig): Set<string> {
  const out = new Set<string>();
  for (let x = -47; x <= 47; x += 2) for (let y = -47; y <= 47; y += 2) {
    let ink = false;
    for (const q of f) { const isi = q.k === "poly" ? pip(q.pts, [x, y]) : q.k === "circ" ? Math.hypot(x - q.c[0], y - q.c[1]) <= q.r : false; if (isi) ink = q.fill === "b"; }
    if (ink) out.add(`${x},${y}`);
  }
  return out;
}
export function piksel(f: Fig): Set<string> {
  const out = tinta(f);
  // Geser ke tengah kotak pembatas: mata membandingkan bentuk, bukan letaknya di sel.
  const xs = [...out].map((p) => +p.split(",")[0]), ys = [...out].map((p) => +p.split(",")[1]);
  const dx = Math.round((Math.min(...xs) + Math.max(...xs)) / 4) * 2, dy = Math.round((Math.min(...ys) + Math.max(...ys)) / 4) * 2;
  return new Set([...out].map((p) => { const [x, y] = p.split(",").map(Number); return `${x - dx},${y - dy}`; }));
}
/** Penyaring kasar (bukan pengganti cek mata): beda dua gambar = piksel yang tidak sama ÷ gabungan piksel (0 = sama persis). */
const bedaP = (A: Set<string>, B: Set<string>) => { let x = 0; A.forEach((p) => B.has(p) || x++); B.forEach((p) => A.has(p) || x++); return x / new Set([...A, ...B]).size; };
export const beda = (a: Fig, b: Fig) => bedaP(piksel(a), piksel(b));
/** Beda terkecil di antara 8 transformasi bentuk itu (piksel tiap transformasi dihitung sekali). */
export const bedaMin = (f: Fig) => { const P = T_ALL.map((t) => piksel(ap(t, f))); return Math.min(...P.flatMap((A, i) => P.slice(i + 1).map((B) => bedaP(A, B)))); };
export const BEDA_MIN = 0.3;
export const ukur = () => Object.fromEntries(Object.entries(BENTUK).map(([n, f]) => [n, Math.round(bedaMin(f) * 100) / 100]));
export function cekBentuk() { for (const [n, f] of Object.entries(BENTUK)) { assert.ok(kiral(f), `bentuk ${n} tidak kiral`); assert.ok(bedaMin(f) >= BEDA_MIN, `bentuk ${n}: putar dan cermin terlalu mirip (${bedaMin(f).toFixed(2)})`); } }
if (!(globalThis as { SKIP_CEK?: boolean }).SKIP_CEK) cekBentuk();

// ── komposisi beberapa objek dalam satu sel ──────────────────────────────────────────────────
export const geser = (f: Fig, [dx, dy]: Pt, s = 1): Fig => f.map((q) => {
  const p = ([x, y]: Pt): Pt => [r1(x * s + dx), r1(y * s + dy)];
  return q.k === "poly" ? { ...q, pts: q.pts.map(p) } : q.k === "circ" ? { ...q, c: p(q.c), r: r1(q.r * s) } : { ...q, a: p(q.a), b: p(q.b) };
});
/** Pusat slot dalam sel: 2 objek (kiri, kanan), 3 objek (kiri atas, kanan atas, bawah), 4 = kuadran. */
export const SLOT: Record<number, Pt[]> = { 2: [[-22, 0], [22, 0]], 3: [[-22, -20], [22, -20], [0, 22]], 4: [[-22, -22], [22, -22], [22, 22], [-22, 22]] };
export const KUADRAN = ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"];
export const susun = (objs: Fig[], slots: Pt[], s = 0.46): Fig => objs.flatMap((o, i) => geser(o, slots[i], s));
/** Rupa objek (Al Faiz mencampur hitam, garis, dan tekstur dalam satu kotak). Diberikan paling akhir, setelah geser/putar. */
export type Rupa = "hitam" | "garis" | "arsir";
// Arsir hanya untuk objek besar (indeks 0): pada objek kecil garisnya terlalu rapat dan terlihat seperti noda.
export const RUPA: Rupa[] = ["arsir", "hitam", "garis", "hitam"];
export const beri = (r: Rupa, f: Fig): Fig => (r === "garis" ? balikWarna(f) : r === "arsir" ? arsir(f) : f);
/** Bentuk berdetail halus: hanya boleh jadi objek besar; pada skala ≤ 0,34 detailnya jadi noda (cek mata 2026-10-28). */
export const RINCI = new Set(["kupu", "kucing", "kura", "burung", "bolakisi", "obor", "sayapbulu", "rajawali", "spiral7", "spiral9", "ikal2", "ikal3"]);
export const cekKecil = (nama: string[], skala: number[]) => nama.forEach((n, i) => assert.ok(!(RINCI.has(n) && skala[i] <= 0.34), `${n} terlalu rinci untuk objek kecil; jadikan objek besar`));
/** Susunan hidup: satu objek dominan + pendamping lebih kecil, letak tidak simetris. [pusat, skala] per objek. */
export const TATA: Record<number, [Pt, number][]> = {
  1: [[[0, 0], 0.9]], 2: [[[-12, -8], 0.62], [[28, 26], 0.32]], 3: [[[-14, -12], 0.56], [[28, -26], 0.3], [[22, 26], 0.34]],
};
/** Objek ke-i: geser ke tempatnya, (opsional) seluruh sel diputar/dicermin `t`, lalu diberi rupa.
 *  Angka tempat > 1 = ukuran petak gaya siluet (dimuat lewat `muat`), ≤ 1 = skala lama. */
export const tata = (objs: Fig[], rupa: Rupa[], t: T = "tetap", tempat = TATA[objs.length]) => {
  if (tempat[0][1] <= 1) return objs.flatMap((o, i) => beri(rupa[i] ?? "hitam", ap(t, geser(o, ...tempat[i]))));
  // Guratan putih pada objek kecil terlalu halus dan hilang di layar (cek mata 2026-10-29): hanya untuk petak ≥ 36.
  objs.forEach((o, i) => assert.ok(!(o.some((q) => q.fill === "u") && tempat[i][1] < 36), "guratan putih hanya untuk objek besar (petak ≥ 36)"));
  const isi = objs.map((o, i) => muat(o, ...tempat[i]));
  cekPisah(isi);
  return isi.flatMap((o, i) => beri(rupa[i] ?? "hitam", ap(t, o)));
};
/** Rupa gaya siluet: semua hitam pekat (garis putih hanya lewat aturan balik warna). */
export const HITAM: Rupa[] = ["hitam", "hitam", "hitam", "hitam"];

// ── gaya siluet D'Ajiks (2026-10-28): objek besar mengisi sel, hitam pekat tanpa garis tepi, satu keluarga bentuk ──
/** Kotak pembatas [xmin, ymin, xmax, ymax]. */
export function kotak(f: Fig): [number, number, number, number] {
  const P = f.flatMap((q): Pt[] => (q.k === "poly" ? q.pts : q.k === "circ" ? [[q.c[0] - q.r, q.c[1] - q.r], [q.c[0] + q.r, q.c[1] + q.r]] : [q.a, q.b]));
  const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}
/** Muat objek ke petak persegi: sisi terpanjang = `ukuran`, pusat kotak pembatas di `pusat`.
 *  Skala tidak berubah oleh putar/cermin persegi, jadi objek yang sama tetap sama besar di semua sel.
 *  `tinggi` = petak melebar (lebar `ukuran`); skala hanya tetap bila lebar-tinggi objek tidak tertukar (tanpa putar 90°). */
export const muat = (f: Fig, [cx, cy]: Pt, ukuran: number, tinggi?: number): Fig => {
  const [x0, y0, x1, y1] = kotak(f), s = tinggi ? Math.min(ukuran / (x1 - x0), tinggi / (y1 - y0)) : ukuran / Math.max(x1 - x0, y1 - y0);
  return geser(f, [cx - (s * (x0 + x1)) / 2, cy - (s * (y0 + y1)) / 2], s);
};
/** Petak isi penuh per jumlah objek: [pusat, ukuran]; ukuran beragam, tidak simetris. Indeks = pilihan susunan. */
export const PETAK: Record<number, [Pt, number][][]> = {
  1: [[[[0, 0], 84]]],
  2: [[[[-15, -13], 58], [[26, 26], 34]], [[[-21, -7], 44], [[23, 13], 40]]],
  3: [[[[-21, -21], 42], [[23, -22], 38], [[2, 23], 40]], [[[-14, -10], 58], [[29, -27], 28], [[26, 28], 32]]],
  4: [[[[-22, -22], 42], [[23, -21], 38], [[22, 23], 40], [[-22, 22], 36]], [[[-20, -24], 38], [[22, -20], 42], [[24, 24], 36], [[-21, 21], 40]]],
};
/** Nama letak tiap petak untuk pembahasan siswa (nama aset tidak dipakai di depan siswa). */
export const NAMA_PETAK: Record<number, string[][]> = {
  1: [["tengah"]], 2: [["besar", "kecil"], ["kiri", "kanan"]], 3: [["kiri atas", "kanan atas", "bawah"], ["besar di kiri", "kecil kanan atas", "kecil kanan bawah"]],
  4: [["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"], ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"]],
};
/** Ketebalan bentuk: bagian tinta yang masih tersisa bila tepinya dikikis ±4 satuan (bentuk dimuat ke 84).
 *  Tipis (< 0,2: pita, sulur, ikal) → versi garis putihnya kusut (cek mata 2026-10-29), jadi tidak boleh dibalik warnanya. */
export function tebal(f: Fig): number {
  const T = tinta(muat(f, [0, 0], 84)), D = [[4, 0], [-4, 0], [0, 4], [0, -4], [4, 4], [-4, 4], [4, -4], [-4, -4]];
  let k = 0;
  T.forEach((p) => { const [x, y] = p.split(",").map(Number); if (D.every(([a, b]) => T.has(`${x + a},${y + b}`))) k++; });
  return k / T.size;
}
export const TEBAL_MIN = 0.2;
/** Objek yang harus dilacak siswa dalam satu soal wajib mudah dibedakan: beda terkecil antar-dua objek (dengan putar/cermin
 *  apa pun) ≥ 0,3. Patokan 2026-10-29: set yang disetujui 0,41–0,54; empat sabit bergerigi 0,19 (sulit diikuti, ditolak). */
export function cekBedaObjek(nama: string[], soal: string) {
  const f = (n: string) => muat(BENTUK[n], [0, 0], 60);
  nama.forEach((a, i) => nama.slice(i + 1).forEach((b) => {
    const m = Math.min(...T_ALL.map((t) => beda(ap(t, f(a)), f(b))));
    assert.ok(m >= 0.3, `${soal}: ${a} dan ${b} terlalu mirip untuk dilacak (${m.toFixed(2)})`);
  }));
}
/** Objek dalam satu sel tidak boleh saling menempel (siluet hitam yang menempel terbaca satu bentuk). */
export function cekPisah(objs: Fig[]) {
  const T = objs.map(tinta);
  T.forEach((A, i) => T.slice(i + 1).forEach((B) => A.forEach((p) => assert.ok(!B.has(p), "dua objek dalam satu sel saling menempel"))));
}
/** Hitam pekat tanpa garis tepi: lepas garis tepi bentuk hitam (garis tepi bentuk putih tetap, itu rupa "garis"). */
export const siluet = (svg: string) => svg.replace(/fill="#111" stroke="#111" stroke-width="[\d.]+"( stroke-linejoin="round")?/g, 'fill="#111"');

// ── pemeriksa paket gaya siluet (usul A–B disetujui Gusti 2026-10-28) ─────────────────────────────
/** Uji sekilas: kunci tidak boleh satu-satunya pilihan yang "tampak lain" dilihat utuh — rata-rata beda pikselnya
 *  ke pilihan lain tidak boleh lebih dari 15% di atas pilihan terjauh berikutnya. */
export function cekSekilas(opts: Fig[], key: Key, nama: string) {
  const m = opts.map((a, i) => opts.reduce((t, b, k) => t + (i === k ? 0 : beda(a, b)), 0) / (opts.length - 1));
  const ki = KEYS.indexOf(key), lain = Math.max(...m.filter((_, i) => i !== ki));
  assert.ok(m[ki] <= lain * 1.15, `${nama}: kunci tampak paling lain sekilas (${m[ki].toFixed(2)} vs ${lain.toFixed(2)})`);
}
/** Satu paket: keluarga bentuk ≤ 2 soal, bentuk tidak dipakai ulang antarsoal, tidak ada dua soal dengan keluarga + susunan sama. */
export function cekPaket(ciri: (Ciri & { id: string })[]) {
  const hitung = new Map<string, string[]>(), pakai = new Map<string, string>(), pola = new Map<string, string>();
  for (const c of ciri) {
    c.keluarga.forEach((k) => hitung.set(k, [...(hitung.get(k) ?? []), c.id]));
    c.bentuk.forEach((b) => { assert.ok(!pakai.has(b), `bentuk ${b} dipakai ulang: ${pakai.get(b)} dan ${c.id}`); pakai.set(b, c.id); });
    const k = `${[...c.keluarga].sort().join("+")}|${c.susunan}`;
    assert.ok(!pola.has(k), `${pola.get(k)} dan ${c.id}: keluarga dan susunan sama`); pola.set(k, c.id);
  }
  hitung.forEach((ids, k) => assert.ok(ids.length <= 2, `keluarga ${k} dipakai ${ids.length} soal (${ids.join(", ")}); paling banyak 2`));
}

// ── acak terkendali (seed tetap ⇒ keluaran tetap) ────────────────────────────────────────────
export function rng(seed: number) { let x = seed >>> 0 || 1; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 2 ** 32); }
export const pick = <X>(r: () => number, xs: X[]) => xs[Math.floor(r() * xs.length)];
export function shuffle<X>(r: () => number, xs: X[]) { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/** Taruh kunci di `key`; pengecoh {fig, nama, alasan} mengisi sisanya. Tolak opsi kembar. */
export type Salah = { fig: Fig; isi: string; alasan: string };
export function pasang(kunci: Fig, salah: Salah[], key: Key, tanda: (f: Fig) => string = sig) {
  assert.equal(salah.length, 4, "pengecoh harus 4");
  const all: (Salah | null)[] = [...salah];
  all.splice(KEYS.indexOf(key), 0, null);
  const opts = all.map((s) => (s ? s.fig : kunci));
  assert.equal(new Set(opts.map(tanda)).size, 5, "opsi kembar secara geometris");
  const gugur = all.map((s, i) => (s ? `Opsi ${KEYS[i]} gugur: ${s.isi}, ${s.alasan}.` : "")).filter(Boolean);
  return { opts, gugur };
}

// ── pengecoh anti-tebak (dipakai jenis yang pengecohnya dirakit dari ciri) ────────────────────
/** Calon pengecoh: ciri per atribut + gambar + kalimat. Kesalahan dinamai seperti guru bicara. */
export type Ubah<S> = { grup: number; ke: (x: S) => S; isi: string; nama: string };
export type Calon = { attr: string[]; fig: Fig; isi: string; alasan: string };
export function calonDari<S>(kunci: S, ubah: Ubah<S>[], attr: (x: S) => string[], fig: (x: S) => Fig, sah: (x: S) => boolean): Calon[] {
  const satu = ubah.map((u) => [u]), dua = ubah.flatMap((u, i) => ubah.slice(i + 1).filter((w) => w.grup !== u.grup).map((w) => [u, w]));
  return [...satu, ...dua].flatMap((us) => {
    const x = us.reduce((s, u) => u.ke(s), kunci);
    return sah(x) ? [{ attr: attr(x), fig: fig(x), isi: us.map((u) => u.isi).join(" dan "), alasan: `kesalahannya: ${us.length === 2 && us[0].nama === us[1].nama ? `${us[0].nama} di dua objek` : us.map((u) => u.nama).join(" sekaligus ")}` }] : [];
  });
}
/** Pilih 4 pengecoh: tidak kembar, setiap atribut pernah salah, setiap ciri kunci juga dimiliki minimal satu pengecoh
 *  (kalau tidak, kunci = satu-satunya opsi "paling lengkap", cek mata MTX-GABUNG 2026-10-28), dan kunci tidak unggul
 *  sendirian dalam jumlah ciri bersama, dan kunci bukan satu-satunya opsi bernilai tengah di semua hitungan. */
export function pilih(kunciAttr: string[], kunciFig: Fig, calon: Calon[], seed: number): Salah[] {
  const sama = (a: string[], b: string[]) => a.filter((v, i) => v === b[i]).length;
  const unik = new Map<string, Calon>();
  for (const c of shuffle(rng(seed), calon)) if (sama(c.attr, kunciAttr) < kunciAttr.length && sig(c.fig) !== sig(kunciFig)) unik.set(c.attr.join("|"), c);
  const C = [...unik.values()], n = C.length, sg = C.map((c) => sig(c.fig)), sk = sig(kunciFig);
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) for (let d = c + 1; d < n; d++) {
    const D = [C[a], C[b], C[c], C[d]];
    if (!kunciAttr.every((v, i) => D.some((x) => x.attr[i] !== v) && D.some((x) => x.attr[i] === v))) continue;
    const semua = [kunciAttr, ...D.map((x) => x.attr)], skor = semua.map((p, i) => semua.reduce((s, q, j) => s + (i === j ? 0 : sama(p, q)), 0));
    if (Math.max(...skor.slice(1)) < skor[0]) continue;
    // Angka tengah: kunci tidak boleh satu-satunya opsi yang semua hitungannya = nilai tengah kelima opsi.
    const angka = kunciAttr.map((_, i) => semua.every((p) => p[i] !== "" && !isNaN(+p[i])));
    if (angka.some(Boolean)) {
      const tengah = semua.map((p) => angka.every((ya, i) => !ya || +p[i] === semua.map((q) => +q[i]).sort((x, y) => x - y)[2]));
      if (tengah[0] && tengah.filter(Boolean).length === 1) continue;
    }
    if (new Set([sk, sg[a], sg[b], sg[c], sg[d]]).size < 5) continue;
    return D.map((x) => ({ fig: x.fig, isi: x.isi, alasan: x.alasan }));
  }
  assert.fail("tidak ada 4 pengecoh yang menutup kunci dari tebakan 'opsi paling mirip'");
}
