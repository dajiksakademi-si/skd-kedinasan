// Handbook TIU · Tahap 5 · alat bersama Bab 11–13: pemeriksaan semua keadaan (KCK dua/tiga pernyataan, P vs Q berpeubah),
// semua susunan (garis, lingkar, pembagian, pemetaan), semua kombinasi (optimasi). Dipakai model_kck/ana/opt.mjs.
import assert from "node:assert/strict";

export const H = ["A", "B", "C", "D", "E"];
export const unik = (xs) => [...new Map(xs.map((x) => [JSON.stringify(x), x])).values()];
export const rentang = (a, b, s = 1) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);
export const perm = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p])));

// ════════ KCK dua pernyataan ════════
// bunyi templat Pilar 5 engine v0.4.3; makna: 1 hanya (1) · 2 hanya (2) · G gabungan · M masing-masing · X digabung pun tidak
export const BUNYI = {
  1: "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.",
  2: "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.",
  G: "Pernyataan (1) dan (2) BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi satu pernyataan SAJA tidak cukup.",
  M: "Pernyataan (1) SAJA cukup DAN pernyataan (2) SAJA cukup untuk menjawab pertanyaan.",
  X: "Pernyataan (1) dan (2) BERSAMA-SAMA tidak cukup untuk menjawab pertanyaan.",
};
export const BAKU = ["1", "2", "G", "M", "X"];
// status satu himpunan keadaan: cukup ⇔ semua keadaan memberi satu jawaban; bila tidak, dua keadaan pembantah (yang pertama ditemukan)
export function status(W, jawab) {
  assert.ok(W.length > 0, "pernyataan bertentangan / tanpa keadaan");
  const peta = new Map();
  for (const w of W) { const j = JSON.stringify(jawab(w)); if (!peta.has(j)) peta.set(j, w); }
  return { cukup: peta.size === 1, jawaban: [...peta.keys()].map((x) => JSON.parse(x)), contoh: [...peta.values()].slice(0, 2), banyak: W.length };
}
// dunia: fungsi (skala) → keadaan; skala 1 = dunia soal, skala 2 = batas diperlebar (uji rentang: makna wajib tetap)
export function kck2(id, dunia, jawab, s1, s2, { urutan = BAKU, kode } = {}) {
  const hasil = [1, 2].map((sk) => {
    const W = dunia(sk);
    const soal = status(W, jawab);
    assert.ok(!soal.cukup, `${id}: kalimat soal saja sudah menjawab`);
    const a = status(W.filter(s1), jawab), b = status(W.filter(s2), jawab), g = status(W.filter((w) => s1(w) && s2(w)), jawab);
    const makna = a.cukup && b.cukup ? "M" : a.cukup ? "1" : b.cukup ? "2" : g.cukup ? "G" : "X";
    return { makna, s1: a, s2: b, gab: g, soal };
  });
  assert.equal(hasil[0].makna, hasil[1].makna, `${id}: makna berubah bila batas dunia diperlebar (rentang buatan menentukan kunci)`);
  const r = hasil[0];
  assert.equal(urutan.length, 5); assert.equal(new Set(urutan).size, 5);
  const teks = Object.fromEntries(H.map((h, i) => [h, BUNYI[urutan[i]]]));
  const kunci = H[urutan.indexOf(r.makna)];
  const kd = Object.fromEntries(H.map((h, i) => [h, urutan[i] === r.makna ? "kunci" : kode[urutan[i]]]));
  for (const h of H) assert.ok(kd[h], `${id}: kode makna ${urutan[H.indexOf(h)]} belum ada`);
  return { teks, kunci, kode: kd, makna: r.makna, r, urutan };
}

// ════════ KCK tiga pernyataan ════════
// himpunan pernyataan = bitmask 1..7; opsi = predikat atas peta cukup(mask). Uji: di peta soal tepat satu opsi benar,
// di setiap peta monoton (himpunan cukup ⇒ setiap himpunan yang memuatnya cukup) paling banyak satu opsi benar.
export function kck3(id, dunia, jawab, S, opsi) {
  const peta = (sk) => { const W = dunia(sk); const m = {}; for (let k = 1; k < 8; k++) m[k] = status(W.filter((w) => S.every((f, i) => !((k >> i) & 1) || f(w))), jawab).cukup; return m; };
  const p1 = peta(1), p2 = peta(2);
  assert.deepEqual(p1, p2, `${id}: peta cukup berubah bila batas dunia diperlebar`);
  const benar = (p) => H.filter((h) => opsi[h](p));
  assert.equal(benar(p1).length, 1, `${id}: opsi benar di peta soal ${benar(p1)}`);
  let monoton = 0;
  for (let f = 0; f < 1 << 7; f++) {
    const p = {}; for (let k = 1; k < 8; k++) p[k] = !!((f >> (k - 1)) & 1);
    if (![...Array(7).keys()].every((a) => [...Array(7).keys()].every((b) => !p[a + 1] || ((a + 1) & (b + 1)) !== a + 1 || p[b + 1]))) continue;
    monoton++;
    assert.ok(benar(p).length <= 1, `${id}: dua opsi benar di peta ${JSON.stringify(p)}`);
  }
  return { kunci: benar(p1)[0], peta: p1, monoton };
}

// ════════ P dan Q berpeubah ════════
export function pvq(xs, P, Q) {
  const rel = (x) => { const d = P(x) - Q(x); return d > 0 ? ">" : d < 0 ? "<" : "="; };
  return unik(xs.map(rel)).sort();
}

// ════════ susunan ════════
// lingkar n kursi bernomor 0..n−1 searah jarum jam dilihat dari atas; orang pertama dikunci di kursi 0 (putaran kembar terbuang).
// menghadap ke tengah: kanan = kursi i − 1 (berlawanan arah jarum jam), kiri = i + 1. balik = konvensi kanan terbalik (uji J-BALIK).
export function lingkar(nama, balik = false) {
  const n = nama.length, s = balik ? 1 : -1;
  const W = perm(rentang(1, n - 1)).map((p) => Object.fromEntries([[nama[0], 0], ...nama.slice(1).map((x, i) => [x, p[i]])]));
  const ka = (i) => (((i + s) % n) + n) % n, ki = (i) => (((i - s) % n) + n) % n;
  const hd = (i) => (n % 2 ? null : (i + n / 2) % n), seb = (a, b) => ka(a) === b || ki(a) === b;
  const jarak = (a, b) => Math.min((((a - b) % n) + n) % n, (((b - a) % n) + n) % n);
  return { W, n, ka, ki, hd, seb, jarak };
}
export const garis = (nama) => perm(rentang(1, nama.length)).map((p) => Object.fromEntries(nama.map((x, i) => [x, p[i]])));
// kata tanya atas susunan sah: pasti (semua), mungkin (≥ 1), tidak mungkin (0)
export function tanya(id, sah, opsi, jenis) {
  assert.ok(sah.length > 0, `${id}: tanpa susunan sah`);
  const hit = Object.fromEntries(H.map((h) => [h, sah.filter(opsi[h]).length]));
  const ok = { pasti: (c) => c === sah.length, mungkin: (c) => c > 0, "tidak mungkin": (c) => c === 0 }[jenis];
  const benar = H.filter((h) => ok(hit[h]));
  assert.equal(benar.length, 1, `${id}: opsi yang memenuhi "${jenis}" = ${benar} (${JSON.stringify(hit)})`);
  return { kunci: benar[0], hit, sah: sah.length };
}
// tiap syarat perlu: syarat dibuang → susunan sah bertambah DAN status pilihan berubah (kata tanya "pasti");
// untuk "mungkin"/"tidak mungkin" cukup banyak susunan yang membenarkan suatu pilihan berubah (pilihan salah di sana selalu tetap mungkin/mustahil)
export function perlu(id, semua, S, opsi, jenis) {
  const sah = semua.filter((w) => S.every((f) => f(w)));
  const vek = (W) => H.map((h) => W.filter(opsi[h]).length === W.length ? "P" : W.some(opsi[h]) ? "M" : "T").join("");
  const hit = (W) => H.map((h) => W.filter(opsi[h]).length).join();
  const out = [];
  S.forEach((_, k) => {
    const W = semua.filter((w) => S.every((f, j) => j === k || f(w)));
    assert.ok(W.length > sah.length, `${id}: syarat ${k + 1} tidak memangkas susunan`);
    const st = vek(W) !== vek(sah);
    if (jenis === "pasti") assert.ok(st, `${id}: syarat ${k + 1} tidak mengubah status pilihan (pajangan)`);
    else assert.ok(st || hit(W) !== hit(sah), `${id}: syarat ${k + 1} tidak menyentuh pilihan mana pun (pajangan)`);
    out.push(`${W.length}${st ? "" : "*"}`);
  });
  return out;
}

// ════════ kombinasi optimasi ════════
// paket [{isi, harga, stok?}] → semua vektor banyak paket 0..batas
export function kombinasi(paket, batas) {
  const out = [];
  const rek = (i, v) => { if (i === paket.length) return out.push(v); for (let k = 0; k <= Math.min(batas[i], paket[i].stok ?? Infinity); k++) rek(i + 1, [...v, k]); };
  rek(0, []);
  return out;
}
export const total = (paket, v, f) => v.reduce((s, k, i) => s + k * f(paket[i]), 0);
