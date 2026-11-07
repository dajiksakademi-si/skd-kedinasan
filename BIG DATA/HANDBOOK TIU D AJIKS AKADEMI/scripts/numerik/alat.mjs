// Handbook TIU · Tahap 5 numerik · alat bersama: pecahan tepat (BigInt), pembaca ungkapan hitung Indonesia,
// format angka Indonesia, pencari rumus lain ≤ 3 operasi (pola TO Paket 1 build_numerik.mjs ekspresi()), uji bentuk opsi.
import assert from "node:assert/strict";

// ── pecahan tepat ──
const g = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
export class Q {
  constructor(n, d = 1n) { n = BigInt(n); d = BigInt(d); assert.ok(d !== 0n, "bagi nol"); if (d < 0n) { n = -n; d = -d; } const k = g(n, d) || 1n; this.n = n / k; this.d = d / k; }
  static of(x) { return x instanceof Q ? x : typeof x === "number" && !Number.isInteger(x) ? Q.dari(String(x)) : new Q(x); }
  static dari(s) { const [i, f = ""] = s.split("."); return new Q(BigInt(i + f) , 10n ** BigInt(f.length)); }
  add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Q.of(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.of(o); return new Q(this.n * o.d, this.d * o.n); }
  eq(o) { o = Q.of(o); return this.n === o.n && this.d === o.d; }
  get bulat() { return this.d === 1n; }
  get num() { return Number(this.n) / Number(this.d); }
}

// ── pembaca ungkapan: 1.188 · 0,75 · 36% · {2/3} · 3{2/5} · × : + − ( ) ; "−" di awal / sesudah "(" = negatif ──
export function hitung(teks) {
  const t = teks.replace(/\s+/g, "");
  let i = 0;
  const lihat = () => t[i];
  function angka() {
    let m = t.slice(i).match(/^(\d+(?:\.\d{3})*(?:,\d+)?)(%?)/);
    let v = null;
    if (m) { i += m[0].length; v = Q.dari(m[1].replace(/\./g, "").replace(",", ".")); if (m[2]) v = v.div(100); }
    const f = t.slice(i).match(/^\{(\d+)\/(\d+)\}/);
    if (f) { i += f[0].length; const p = new Q(BigInt(f[1]), BigInt(f[2])); v = v ? v.add(p) : p; }
    assert.ok(v, `ungkapan tidak terbaca di "${t.slice(i)}" (${teks})`);
    return v;
  }
  function faktor() {
    if (lihat() === "−" || lihat() === "-") { i++; return faktor().mul(-1); }
    if (lihat() === "(") { i++; const v = jumlah(); assert.equal(t[i], ")", `kurung ${teks}`); i++; return v; }
    return angka();
  }
  function kali() { let v = faktor(); while ("×:".includes(lihat() ?? "_")) { const o = t[i++]; const w = faktor(); v = o === "×" ? v.mul(w) : v.div(w); } return v; }
  function jumlah() { let v = kali(); while ("+−-".includes(lihat() ?? "_")) { const o = t[i++]; const w = kali(); v = o === "+" ? v.add(w) : v.sub(w); } return v; }
  const v = jumlah();
  assert.equal(i, t.length, `sisa ungkapan "${t.slice(i)}" (${teks})`);
  return v;
}

// ── format Indonesia ──
export const fmt = (x) => {
  const q = Q.of(x);
  if (!q.bulat) {                                         // desimal berhingga saja
    const s = String(q.num); assert.ok(Q.dari(s.replace("-", "")).mul(q.n < 0n ? -1 : 1).eq(q), `bukan desimal berhingga: ${s}`);
    const [a, b] = s.replace("-", "").split(".");
    return (q.n < 0n ? "−" : "") + a.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + b;
  }
  const n = q.n < 0n ? -q.n : q.n;
  return (q.n < 0n ? "−" : "") + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const rp = (x) => "Rp" + fmt(x);
export const jamMenit = (jam) => {                       // jam (Q atau angka) → "4 jam 40 menit"
  const m = Q.of(jam).mul(60); assert.ok(m.bulat, "menit tidak bulat"); const j = m.n / 60n, s = m.n % 60n;
  return s ? (j ? `${j} jam ${s} menit` : `${s} menit`) : `${j} jam`;
};
export const pukul = (menitSejak0) => { const h = Math.floor(menitSejak0 / 60), m = menitSejak0 % 60; return `${String(h).padStart(2, "0")}.${String(m).padStart(2, "0")}`; };
export const sisa9 = (x) => { const q = Q.of(x); assert.ok(q.bulat); return Number(((q.n % 9n) + 9n) % 9n); };
export const HURUF = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const huruf = (no) => HURUF[(((no - 1) % 26) + 26) % 26];

// ── pencari rumus lain: daun a, b, 1, 2, 3 · operasi + − × ^ (pangkat 0–5) · ≤ 3 operasi (sama dengan TO Paket 1) ──
let EKSPRESI;
export function ekspresi() {
  if (EKSPRESI) return EKSPRESI;
  const daun = [["a", (a) => a], ["b", (a, b) => b], ...[1, 2, 3].map((k) => [String(k), () => k])];
  const ops = [["+", (x, y) => x + y], ["−", (x, y) => x - y], ["×", (x, y) => x * y], ["^", (x, y) => (Number.isInteger(y) && y >= 0 && y <= 5 ? x ** y : NaN)]];
  const lv = [daun];
  for (let k = 1; k <= 3; k++) {
    const baru = [];
    for (let i = 0; i < k; i++) for (const [ns, fs] of lv[i]) for (const [nt, ft] of lv[k - 1 - i]) for (const [o, fo] of ops) baru.push([`(${ns}${o}${nt})`, (a, b) => fo(fs(a, b), ft(a, b))]);
    lv.push(baru);
  }
  return (EKSPRESI = lv.flat());
}
// soal tabel dari bank D'Ajiks "GENERATE SOAL TERBARU SKD 2026" (T6-6): pemeriksa rumus lain build-deret-tabel-lv56.js aturanLain(), disalin apa adanya.
// tahu = satuan lengkap [masukan…, hasil]; uji = per pilihan salah, satuan berisi pilihan itu. Daun: masukan, kuadrat masukan, 1–12; operasi + − × :
// (≤ 2 operasi dengan bilangan tetap, atau 3 operasi tanpa bilangan tetap). Hasil: rumus yang cocok di semua satuan lengkap dan membenarkan pilihan salah.
export function aturanLainSumber(tahu, uji) {
  const n = tahu[0].length - 1;
  const inp = [...Array(n).keys()].flatMap((i) => [["abc"[i], (u) => u[i]], ["abc"[i] + "²", (u) => u[i] * u[i]]]);
  const daun = [...inp, ...[...Array(12).keys()].map((k) => [String(k + 1), () => k + 1])];
  const OPS = [["+", (x, y) => x + y], ["−", (x, y) => x - y], ["×", (x, y) => x * y], [":", (x, y) => x / y]];
  const pas = (f, us) => us.every((u) => Math.abs(f(u) - u[n]) < 1e-9);
  const bentrok = [];
  const cek = ([nama, f]) => { if (pas(f, tahu)) uji.forEach((us, k) => pas(f, us) && bentrok.push(`${nama} → pilihan ${k}`)); };
  const gabung = (A, B, fn) => { for (const [na, fa] of A) for (const [nb, fb] of B) for (const [o, op] of OPS) fn([`(${na} ${o} ${nb})`, (u) => op(fa(u), fb(u))]); };
  const satu = []; gabung(daun, daun, (e) => { satu.push(e); cek(e); });
  for (const e of satu) gabung([e], daun, cek), gabung(daun, [e], cek);
  const satuI = []; gabung(inp, inp, (e) => satuI.push(e)); gabung(satuI, satuI, cek);
  const duaI = []; for (const e of satuI) gabung([e], inp, (x) => duaI.push(x)), gabung(inp, [e], (x) => duaI.push(x));
  for (const e of duaI) gabung([e], inp, cek), gabung(inp, [e], cek);
  return bentrok;
}
// semua rumus ≤ 3 operasi yang cocok di setiap titik [[a, b, hasil], …] → himpunan nilai di titik tanya
export function rumusLain(titik, tanya) {
  const hasil = new Map();
  for (const [nama, f] of ekspresi()) if (titik.every(([a, b, c]) => f(a, b) === c)) { const v = f(...tanya); if (!hasil.has(v)) hasil.set(v, nama); }
  return hasil;
}
// deret sebaris: keluarga aturan lain (aritmetika, geometri, k·U + c, selisih bertingkat ≤ 3, dua deret berselang, rekursif dua suku)
export function deretLain(u) {
  const out = new Set(), n = u.length;
  for (let k = -5; k <= 5; k++) for (let c = -20; c <= 20; c++) if (u.slice(1).every((x, i) => x === k * u[i] + c)) out.add(k * u[n - 1] + c);
  const pts = u.map((y, i) => [i, y]), d = derajat(pts);                     // selisih bertingkat ≤ 3 = polinom berderajat ≤ 3
  if (d <= 3 && n >= d + 2) out.add(Number(lagrange(pts, n).n));
  if (n >= 5) { const ga = u.filter((_, i) => i % 2 === 0), ge = u.filter((_, i) => i % 2 === 1); const da = ga.slice(1).map((x, i) => x - ga[i]), de = ge.slice(1).map((x, i) => x - ge[i]);
    if (da.every((x) => x === da[0]) && de.every((x) => x === de[0]) && de.length) out.add(n % 2 === 0 ? ga.at(-1) + da[0] : ge.at(-1) + de[0]); }
  for (let p = -3; p <= 3; p++) for (let q = -3; q <= 3; q++) for (let c = -10; c <= 10; c++) if (n >= 4 && u.slice(2).every((x, i) => x === p * u[i + 1] + q * u[i] + c)) out.add(p * u[n - 1] + q * u[n - 2] + c);
  return out;
}
// interpolasi Lagrange tepat (BigInt) → nilai di x; derajat terendah yang cocok di semua titik
export function lagrange(pts, x) {
  let s = new Q(0);
  pts.forEach(([xi, yi], i) => { let p = new Q(yi); pts.forEach(([xj], j) => { if (j !== i) p = p.mul(new Q(x - xj)).div(new Q(xi - xj)); }); s = s.add(p); });
  return s;
}
export function derajat(pts) { for (let d = 0; d < pts.length; d++) { const dasar = pts.slice(0, d + 1); if (pts.every(([x, y]) => lagrange(dasar, x).eq(y))) return d; } return Infinity; }

// ── uji bentuk opsi angka (engine v0.4.3 Pilar 4/5/6 + pelajaran Handbook): ──
//  urut naik; kunci bukan pencilan (jarak ke opsi terdekat ≤ median jarak bertetangga);
//  ciri kunci (angka satuan, genap-ganjil, banyak angka, tanda, kelipatan 5) tidak menyendiri:
//  bocor bila nilai ciri kunci tunggal DAN keempat pilihan lain hanya memakai ≤ 2 nilai ciri itu.
export function ujiAngka(id, nilai, kunci, { urut = true } = {}) {
  const H = ["A", "B", "C", "D", "E"].slice(0, nilai.length), v = nilai.map((x) => Q.of(x).num);
  if (urut) assert.ok(v.every((x, i) => !i || x > v[i - 1]), `${id}: opsi tidak urut naik (${v})`);
  assert.equal(new Set(v).size, v.length, `${id}: opsi kembar`);
  const k = v[H.indexOf(kunci)], so = [...v].sort((a, b) => a - b), gap = so.slice(1).map((x, i) => x - so[i]).sort((a, b) => a - b);
  const med = gap.length % 2 ? gap[(gap.length - 1) / 2] : (gap[gap.length / 2 - 1] + gap[gap.length / 2]) / 2;
  const i = so.indexOf(k), dk = Math.min(i ? k - so[i - 1] : Infinity, i < so.length - 1 ? so[i + 1] - k : Infinity);
  assert.ok(dk <= med + 1e-9, `${id}: kunci pencilan (jarak ${dk} > median ${med})`);
  // revisi cek buta 1: tidak ada pilihan terpencil (dapat dicoret tanpa menghitung): jarak tiap pilihan ke tetangga terdekatnya ≤ 3 × median
  const nn = so.map((x, j) => Math.min(j ? x - so[j - 1] : Infinity, j < so.length - 1 ? so[j + 1] - x : Infinity));
  assert.ok(Math.max(...nn) <= 3 * med + 1e-9, `${id}: ada pilihan terpencil (jarak ${Math.max(...nn)} > 3 × median ${med})`);
  const lain = v.filter((x) => x !== k);
  const bulat = v.every(Number.isInteger);
  const ciri = { satuan: (x) => Math.abs(x) % 10, paritas: (x) => Math.abs(x) % 2, panjang: (x) => String(Math.abs(Math.trunc(x))).length, tanda: Math.sign, lima: (x) => Math.abs(x) % 5 === 0 };
  const bocor = [];
  for (const [nm, f] of Object.entries(ciri)) {
    if (!bulat && (nm === "satuan" || nm === "paritas" || nm === "lima")) continue;
    if (!lain.some((x) => f(x) === f(k)) && new Set(lain.map(f)).size <= 2) bocor.push(nm);
  }
  assert.deepEqual(bocor, [], `${id}: ciri kunci menyendiri: ${bocor}`);
  return { jarak: dk, median: med, terpencil: +(Math.max(...nn) / med).toFixed(2), letak: "ABCDE"[i] };
}
