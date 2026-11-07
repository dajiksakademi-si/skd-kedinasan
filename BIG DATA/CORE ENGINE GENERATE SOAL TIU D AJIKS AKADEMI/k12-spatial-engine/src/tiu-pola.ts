import { type Fig, type Prim, type Pt, r1, tf } from "./figural-lib";
import { goresan, lengkung } from "./tiu-gaya";

// TIU SKD — keluarga bentuk berparameter (logika gambar Al Faiz tambahan 2026-10-28, dimodifikasi supaya tidak identik):
//   molekul = bola-bola menyatu (medan bola) dengan siku bersudut, spiral = spiral kotak bersudut lengkung dan tebal berubah,
//   ikal = garis dengan n ikal (ujung meruncing), lekuk = gumpal n kelopak tidak sama besar.
// Satu fungsi = bentuk tak terbatas; jumlah ikal/kelopak/bola bisa dipakai sebagai aturan hitung.

type Bola = [number, number, number];
/** Kontur medan bola Σ r²/d² = 1 (marching squares), dirangkai jadi poligon; lubang jadi poligon putih. */
export function molekul(bola: Bola[], h = 1.5): Fig {
  const f = (x: number, y: number) => bola.reduce((s, [cx, cy, r]) => s + (r * r) / ((x - cx) ** 2 + (y - cy) ** 2 + 1e-6), 0) - 1;
  const N = Math.ceil(96 / h), X = (i: number) => -48 + i * h, v: number[][] = [];
  for (let i = 0; i <= N; i++) { v.push([]); for (let j = 0; j <= N; j++) v[i].push(f(X(i), X(j))); }
  const titik = new Map<string, Pt>(), tetangga = new Map<string, string[]>();
  const sisi = (k: string, a: Pt, va: number, b: Pt, vb: number) => { if (!titik.has(k)) { const t = va / (va - vb); titik.set(k, [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]); } return k; };
  const hubung = (p: string, q: string) => { tetangga.set(p, [...(tetangga.get(p) ?? []), q]); tetangga.set(q, [...(tetangga.get(q) ?? []), p]); };
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const [a, b, c, d] = [v[i][j], v[i + 1][j], v[i + 1][j + 1], v[i][j + 1]], [x0, x1, y0, y1] = [X(i), X(i + 1), X(j), X(j + 1)];
    const kode = (a > 0 ? 8 : 0) | (b > 0 ? 4 : 0) | (c > 0 ? 2 : 0) | (d > 0 ? 1 : 0);
    if (kode === 0 || kode === 15) continue;
    const T = () => sisi(`h${i},${j}`, [x0, y0], a, [x1, y0], b), R = () => sisi(`v${i + 1},${j}`, [x1, y0], b, [x1, y1], c);
    const B = () => sisi(`h${i},${j + 1}`, [x0, y1], d, [x1, y1], c), L = () => sisi(`v${i},${j}`, [x0, y0], a, [x0, y1], d);
    const tengah = f((x0 + x1) / 2, (y0 + y1) / 2) > 0;
    const pasangan: Record<number, [() => string, () => string][]> = {
      1: [[L, B]], 2: [[B, R]], 3: [[L, R]], 4: [[T, R]], 6: [[T, B]], 7: [[T, L]], 8: [[T, L]], 9: [[T, B]], 11: [[T, R]], 12: [[L, R]], 13: [[B, R]], 14: [[L, B]],
      5: tengah ? [[T, L], [B, R]] : [[T, R], [L, B]], 10: tengah ? [[T, R], [L, B]] : [[T, L], [B, R]],
    };
    for (const [p, q] of pasangan[kode]) hubung(p(), q());
  }
  const lingkar: Pt[][] = [], sudah = new Set<string>();
  for (const awal of tetangga.keys()) {
    if (sudah.has(awal)) continue;
    const L: Pt[] = []; let prev = "", cur = awal;
    while (!sudah.has(cur)) { sudah.add(cur); L.push(titik.get(cur)!); const nx = tetangga.get(cur)!.find((k) => k !== prev && !sudah.has(k)); if (!nx) break; prev = cur; cur = nx; }
    if (L.length > 8) lingkar.push(L.filter((_, k) => k % 2 === 0).map(([x, y]): Pt => [r1(x), r1(y)]));
  }
  const luas = (P: Pt[]) => Math.abs(P.reduce((s, [x, y], k) => { const [u, w] = P[(k + 1) % P.length]; return s + x * w - u * y; }, 0)) / 2;
  const dalam = (P: Pt[], [x, y]: Pt) => { let c = false; for (let a = 0, b = P.length - 1; a < P.length; b = a++) { const [xa, ya] = P[a], [xb, yb] = P[b]; if (ya > y !== yb > y && x < ((xb - xa) * (y - ya)) / (yb - ya) + xa) c = !c; } return c; };
  const urut = lingkar.filter((P) => luas(P) > 12).sort((p, q) => luas(q) - luas(p));
  return urut.map((P, k): Prim => ({ k: "poly", pts: P, fill: urut.slice(0, k).some((Q) => dalam(Q, P[0])) ? "w" : "b" }));
}
/** Molekul acak: jalan berbelok (siku bersudut, bukan lurus) dengan bola beda ukuran; dipusatkan ke kotak. */
export function molekulAcak(n: number, seed: number): Fig {
  let x = seed;
  const acak = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
  const pts: Bola[] = [[0, 0, 7 + 2.5 * acak()]];
  let arah = acak() * 2 * Math.PI;
  for (let i = 1; i < n; i++) {
    arah += (acak() < 0.5 ? -1 : 1) * (0.7 + 1.2 * acak());
    // Jarak ≈ 1,38 × (jari-jari kedua bola): leher menyempit tapi tidak putus (medan tengah 8r²/L² sedikit di atas 1).
    const [px, py, pr] = pts[i - 1], r = 6.5 + 3 * acak(), L = 1.38 * (pr + r);
    pts.push([px + L * Math.cos(arah), py + L * Math.sin(arah), r]);
  }
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const k = Math.min(1.6, 62 / Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 30));
  return molekul(pts.map(([a, b, r]): Bola => [(a - cx) * k, (b - cy) * k, r * k]));
}
/** Spiral kotak: sudut dilengkungkan, tebal bertambah ke luar, ekor keluar ke satu sisi. */
export function spiral(sisi: number, langkah = 8.5): Fig {
  const ctrl: Pt[] = [[0, 0]], arah: Pt[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  // Sisi terakhir dipanjangkan jadi ekor: tanpa ekor, spiral diputar 90° hampir sama dengan dirinya sendiri.
  for (let i = 0; i < sisi; i++) { const [px, py] = ctrl[i], L = langkah * (Math.floor(i / 2) + 1) * (i === sisi - 1 ? 1.7 : 1), [dx, dy] = arah[i % 4]; ctrl.push([px + dx * L, py + dy * L]); }
  const xs = ctrl.map((p) => p[0]), ys = ctrl.map((p) => p[1]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const tebal = ctrl.map((_, i) => langkah * (0.38 + (0.24 * i) / sisi));
  return [{ k: "poly", pts: goresan(ctrl.map(([a, b]): Pt => [a - cx, b - cy]), tebal), fill: "b" }];
}
/** Garis dengan n ikal (sikloid diperpanjang), tebal meruncing ke ujung, lalu dimiringkan. */
export function ikal(n: number, miring = -18): Fig {
  const ctrl: Pt[] = [];
  for (let t = -Math.PI / 2; t <= 2 * Math.PI * n + Math.PI / 2 + 1e-9; t += Math.PI / 3) ctrl.push([5.6 * t - 15 * Math.sin(t), -15 * Math.cos(t)]);
  const x0 = ctrl[0][0], x1 = ctrl[ctrl.length - 1][0], k = Math.min(1, 70 / (x1 - x0));
  const tebal = ctrl.map((_, i) => 7 - (3.5 * i) / ctrl.length);
  return tf([{ k: "poly", pts: goresan(ctrl.map(([a, b]): Pt => [(a - (x0 + x1) / 2) * k, b * k]), tebal), fill: "b" }], miring);
}
/** Gumpal n kelopak tidak sama besar + tangkai di antara dua kelopak (tanpa tangkai, putar 90° nyaris sama).
 *  `tangkai = false` untuk objek hitung yang tidak diputar: tangkai bisa ikut terhitung sebagai kelopak. */
export function lekuk(n: number, seed: number, R = 32, tangkai = true): Fig {
  let x = seed;
  const acak = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
  const ctrl: Pt[] = [], sudut = Array.from({ length: n }, () => 0.75 + 0.5 * acak()), total = sudut.reduce((a, b) => a + b, 0);
  let a = -Math.PI / 2;
  for (let i = 0; i < n; i++) {
    const w = (2 * Math.PI * sudut[i]) / total, r = R * (0.72 + 0.28 * acak()), lebar = w * 0.32;
    ctrl.push([r * 0.92 * Math.cos(a - lebar), r * 0.92 * Math.sin(a - lebar)], [r * Math.cos(a), r * Math.sin(a)], [r * 0.92 * Math.cos(a + lebar), r * 0.92 * Math.sin(a + lebar)]);
    const b = a + w / 2, d = R * 0.42;
    ctrl.push([d * Math.cos(b), d * Math.sin(b)]);
    a += w;
  }
  const t = -Math.PI / 2 + (2 * Math.PI * sudut[0]) / total / 2;
  if (!tangkai) return [{ k: "poly", pts: lengkung(ctrl, 5), fill: "b" }];
  return [{ k: "poly", pts: lengkung(ctrl, 5), fill: "b" }, { k: "poly", pts: goresan([[R * 0.3 * Math.cos(t), R * 0.3 * Math.sin(t)], [R * 0.95 * Math.cos(t + 0.15), R * 0.95 * Math.sin(t + 0.15)], [R * 1.25 * Math.cos(t + 0.45), R * 1.25 * Math.sin(t + 0.45)]], [7, 6, 4]), fill: "b" }];
}

/** Bintang n cabang, panjang tidak sama. Lancip = ujung runcing; tumpul = ujung membulat (Al Faiz no. 65: lancip → tumpul).
 *  `dalam` = jari-jari lekuk antarcabang ÷ R (kecil = cabang ramping seperti bintang kilau). */
export function bintang(n: number, seed: number, tumpul = false, R = 32, dalam = 0.3): Fig {
  let x = seed;
  const acak = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
  const pts: Pt[] = [], a0 = (acak() * 2 * Math.PI) / n, rv = R * dalam, rho = R * 0.2;
  for (let i = 0; i < n; i++) {
    const a = a0 + (2 * Math.PI * (i + 0.2 * (acak() - 0.5))) / n, L = R * (0.78 + 0.22 * acak()), v = a0 + (2 * Math.PI * (i + 0.5)) / n;
    if (!tumpul) pts.push([r1(L * Math.cos(a)), r1(L * Math.sin(a))]);
    // Ujung tumpul = setengah lingkaran di ujung cabang (panjang cabang tetap sama dengan versi lancip).
    else for (let k = -3; k <= 3; k++) { const f = a + (k * Math.PI) / 6, c = L - rho; pts.push([r1(c * Math.cos(a) + rho * Math.cos(f)), r1(c * Math.sin(a) + rho * Math.sin(f))]); }
    pts.push([r1(rv * Math.cos(v)), r1(rv * Math.sin(v))]);
  }
  return [{ k: "poly", pts, fill: "b" }];
}

// ── keluarga bentuk berparameter putaran 2 (langkah 1 "di atas Al Faiz", disetujui Gusti 2026-10-29) ──────────
// Setiap fungsi = bentuk tak terbatas dari (n, seed). `urat` = guratan putih tanpa garis tepi di sepanjang garis tengah
// (detail khas siluet Al Faiz, dibuat lewat kode, bukan digambar). Urat hanya untuk objek besar (lihat cek mata).
const acakDari = (seed: number) => { let x = seed * 7919 + 13; return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648); };
/** Guratan putih di sepanjang garis tengah, dari `a` sampai `b` (0–1), tebal `t`. */
const urat = (ctrl: Pt[], t: number, a = 0.18, b = 0.82): Prim => {
  const i0 = Math.round(a * (ctrl.length - 1)), i1 = Math.round(b * (ctrl.length - 1));
  return { k: "poly", pts: goresan(ctrl.slice(i0, i1 + 1), [t * 0.5, t, t, t * 0.5]), fill: "u" };
};
/** Tunas berbuku: batang melengkung dengan n daun berselang-seling, ujung atas mengait. */
export function tunas(n: number, seed: number, dgnUrat = false): Fig {
  const r = acakDari(seed), fase = r() * 6, amp = 6 + 12 * r(), gel = 1.5 + 2 * r(), kiri = r() < 0.5, kait = r() < 0.5 ? 1 : -1, out: Prim[] = [];
  const batang: Pt[] = Array.from({ length: n + 3 }, (_, i) => { const t = i / (n + 2); return [r1(amp * Math.sin(t * gel + fase)), r1(40 - 80 * t)]; });
  const [tx, ty] = batang[batang.length - 1];
  const ujung: Pt[] = [[tx, ty], [tx + 8 * kait, ty - 4], [tx + 11 * kait, ty + 4], [tx + 5 * kait, ty + 6]];
  out.push({ k: "poly", pts: goresan([...batang, ...ujung.slice(1)], [7, 6.5, 6, 5, 4, 3]), fill: "b" });
  for (let i = 1; i <= n; i++) {
    const [x, y] = batang[i], sisi = (i % 2 === 0) === kiri ? -1 : 1, L = 18 + 12 * r() - (6 * i) / n, naik = 0.25 + 0.8 * r();
    const tip: Pt = [x + sisi * L, y - L * naik], tengah: Pt = [x + sisi * L * 0.5, y - L * naik * 0.5];
    const w = 5 + 4 * r(), nx = -(tip[1] - y) / L, ny = (tip[0] - x) / L;
    out.push({ k: "poly", pts: lengkung([[x, y], [tengah[0] + nx * w, tengah[1] + ny * w], tip, [tengah[0] - nx * w * 0.6, tengah[1] - ny * w * 0.6]], 6), fill: "b" });
  }
  if (dgnUrat) out.push(urat(batang, 2.2, 0.08, 0.7));
  return out;
}
/** Sabit bergerigi: lengkung tebal tidak sama (lebih gemuk di satu ujung) dengan n gerigi tidak sama di tepi luar. */
export function sabit(n: number, seed: number, dgnUrat = false): Fig {
  const r = acakDari(seed), R = 30, a0 = -2.4, a1 = 2.0, N = 60;
  const posG = Array.from({ length: n }, (_, k) => 0.15 + (0.7 * (k + 0.3 + 0.4 * r())) / n), tinggi = posG.map(() => 6 + 7 * r());
  const w = (t: number) => 26 * Math.pow(Math.sin(Math.PI * t), 0.75) * (0.75 + 0.5 * t);
  const luar: Pt[] = [], dalam: Pt[] = [], tengah: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, a = a0 + (a1 - a0) * t, c = Math.cos(a), sn = Math.sin(a);
    const g = posG.reduce((m, p, k) => Math.max(m, tinggi[k] * Math.max(0, 1 - Math.abs(t - p) * 28)), 0);
    luar.push([r1((R + w(t) / 2 + g) * c), r1((R + w(t) / 2 + g) * sn)]);
    dalam.push([r1((R - w(t) / 2) * c), r1((R - w(t) / 2) * sn)]);
    tengah.push([R * c, R * sn]);
  }
  const out: Prim[] = [{ k: "poly", pts: [...luar, ...dalam.reverse()], fill: "b" }];
  if (dgnUrat) out.push(urat(tengah.filter((_, i) => i % 4 === 0), 2.4, 0.2, 0.75));
  return out;
}
/** Pita berlipat: jalur zigzag n lipatan dengan panjang tidak sama; lebar menyempit di lipatan, ujung meruncing. */
export function pita(n: number, seed: number, dgnUrat = false): Fig {
  const r = acakDari(seed), ctrl: Pt[] = [[0, 0]], tebal: number[] = [5];
  let arah = r() * Math.PI;
  for (let i = 0; i < n; i++) {
    const [px, py] = ctrl[ctrl.length - 1], L = 22 + 14 * r(), b = arah + (i % 2 ? 1 : -1) * (1.3 + 0.6 * r());
    ctrl.push([px + (L / 2) * Math.cos(arah), py + (L / 2) * Math.sin(arah)], [px + L * Math.cos(arah), py + L * Math.sin(arah)]);
    tebal.push(9 + 4 * r(), 4);
    arah = b;
  }
  tebal[tebal.length - 1] = 2;
  const out: Prim[] = [{ k: "poly", pts: goresan(ctrl, tebal), fill: "b" }];
  if (dgnUrat) out.push(urat(ctrl, 2.2, 0.1, 0.9));
  return out;
}
/** Rantai bersiku: n manik persegi membulat (ukuran tidak sama) di jalur yang berbelok 90°, disambung leher. */
export function rantai(n: number, seed: number): Fig {
  const r = acakDari(seed), D: Pt[] = [[1, 0], [0, 1], [-1, 0], [0, -1]], pos: Pt[] = [[0, 0]], pakai = new Set(["0,0"]);
  let d = Math.floor(r() * 4);
  for (let i = 1; i < n; i++) {
    const coba = [d, (d + 1) % 4, (d + 3) % 4].sort(() => r() - 0.5).sort((a, b) => (a === d ? 1 : 0) - (b === d ? 1 : 0));
    const ok = coba.find((k) => !pakai.has(`${pos[i - 1][0] + D[k][0]},${pos[i - 1][1] + D[k][1]}`));
    if (ok === undefined) throw new Error(`rantai${n}-${seed}: jalur buntu, jumlah manik tidak pas`);
    d = ok; pos.push([pos[i - 1][0] + D[d][0], pos[i - 1][1] + D[d][1]]); pakai.add(pos[i].join());
  }
  const S = 20, out: Prim[] = [];
  // Manik kecil + leher ramping: manik besar menyatu jadi gumpal kotak (cek mata 2026-10-29).
  pos.forEach(([x, y], i) => {
    const h = 4.8 + 2.2 * r() + (i === 0 ? 1.5 : 0), cx = x * S, cy = y * S;
    out.push({ k: "poly", pts: lengkung([[cx - h, cy - h], [cx, cy - h * 1.05], [cx + h, cy - h], [cx + h * 1.05, cy], [cx + h, cy + h], [cx, cy + h * 1.05], [cx - h, cy + h], [cx - h * 1.05, cy]], 4), fill: "b" });
    if (i) out.push({ k: "poly", pts: goresan([[pos[i - 1][0] * S, pos[i - 1][1] * S], [cx, cy]], [4.5, 4.5]), fill: "b" });
  });
  return out;
}
/** Ikal ganda: spiral besar ke satu arah, menyambung ke spiral kecil ke arah sebaliknya; tebal naik-turun. */
export function ikalGanda(seed: number, dgnUrat = false): Fig {
  const r = acakDari(seed), putA = 1.4 + 0.4 * r(), putB = 0.9 + 0.3 * r(), ctrl: Pt[] = [];
  for (let t = putA; t >= 0; t -= 0.1) { const a = t * 2 * Math.PI, rr = 4 + 15 * (t / putA); ctrl.push([-16 + rr * Math.cos(a), rr * Math.sin(a)]); }
  for (let t = 0; t <= putB; t += 0.1) { const a = Math.PI + t * 2 * Math.PI, rr = 10 * (1 - t / putB) + 3; ctrl.push([18 + rr * Math.cos(-a), 4 + rr * Math.sin(-a)]); }
  const tebal = ctrl.map((_, i) => 2.5 + 7 * Math.sin((Math.PI * i) / (ctrl.length - 1)));
  const out: Prim[] = [{ k: "poly", pts: goresan(ctrl, tebal), fill: "b" }];
  if (dgnUrat) out.push(urat(ctrl, 1.8, 0.3, 0.7));
  return out;
}

// ── keluarga bercita rasa nusantara (langkah 1b, 2026-10-29) — semua punya angka bawaan n untuk soal hitung ─────────
const skalaKe = (P: Pt[], [cx, cy]: Pt, k: number): Pt[] => P.map(([x, y]): Pt => [r1(cx + (x - cx) * k), r1(cy + (y - cy) * k)]);
/** Awan mega mendung: gumpal awan berlekuk besar tidak sama dengan ikal di satu ujung; n garis putih berlapis
 *  mengecil ke arah pangkal ikal (bukan ke tengah, supaya tidak terbaca sebagai garis kontur). */
export function awan(n: number, seed: number): Fig {
  const r = acakDari(seed), ctrl: Pt[] = [], m = 4 + Math.floor(r() * 2);
  for (let i = 0; i <= m; i++) { const a = Math.PI + (Math.PI * i) / m, R = 26 + 14 * r(); ctrl.push([R * 1.3 * Math.cos(a), 6 + R * Math.sin(a) * (1 + 0.25 * Math.sin(i * 1.7))]); }
  ctrl.push([42, 10], [36, 22], [16, 20], [-10, 26], [-36, 18]);
  const luar = lengkung(ctrl, 7), pusat: Pt = [30, 14], out: Prim[] = [];
  for (let k = 0; k <= n; k++) {
    const f = 1 - (0.72 * k) / (n + 0.5);
    out.push({ k: "poly", pts: skalaKe(luar, pusat, f), fill: "b" });
    if (k < n) out.push({ k: "poly", pts: skalaKe(luar, pusat, f - 0.045), fill: "u" });
  }
  const sp: Pt[] = []; for (let t = 0; t <= 1.5; t += 0.1) { const a = t * 2 * Math.PI, rr = 11 * (1 - t / 1.9); sp.push([30 + rr * Math.cos(a), 26 + rr * Math.sin(a)]); }
  out.push({ k: "poly", pts: goresan(sp, sp.map((_, i) => 6 - (4 * i) / sp.length)), fill: "b" });
  return out;
}
/** Keris: bilah ber-luk n (gelombang) meruncing, ganja melebar ke satu sisi, hulu membengkok. `urat` = garis pamor. */
export function keris(n: number, seed: number, dgnUrat = false): Fig {
  const r = acakDari(seed), A = 4 + 2 * r(), N = 40, ctrl: Pt[] = [], tb: number[] = [];
  for (let i = 0; i <= N; i++) { const t = i / N; ctrl.push([r1(A * Math.sin(Math.PI * n * t) * (1 - 0.35 * t)), r1(26 - 70 * t)]); tb.push(13 * Math.pow(1 - t, 0.6) + 1); }
  const bilah = goresan(ctrl.filter((_, i) => i % 2 === 0), tb.filter((_, i) => i % 2 === 0));
  const sisi = r() < 0.5 ? 1 : -1, ganja: Pt[] = lengkung([[-9 * sisi, 24], [16 * sisi, 22], [20 * sisi, 27], [6 * sisi, 31], [-9 * sisi, 30]], 5);
  const hulu = goresan([[0, 30], [2 * sisi, 38], [8 * sisi, 44], [14 * sisi, 45]], [8, 9, 9, 7]);
  const out: Prim[] = [{ k: "poly", pts: bilah, fill: "b" }, { k: "poly", pts: ganja, fill: "b" }, { k: "poly", pts: hulu, fill: "b" }];
  if (dgnUrat) out.push(urat(ctrl.filter((_, i) => i % 2 === 0), 1.8, 0.1, 0.75));
  return out;
}
/** Padi: tangkai tebal melengkung merunduk dengan n bulir lonjong besar (mengecil ke ujung) dan satu daun di pangkal. */
export function padi(n: number, seed: number): Fig {
  const r = acakDari(seed), lengk = 0.9 + 0.4 * r(), ctrl: Pt[] = [];
  for (let i = 0; i <= 8; i++) { const t = i / 8, a = -Math.PI / 2 + lengk * 2.4 * t; ctrl.push([r1(-14 + 30 * Math.cos(a) * t * 1.3), r1(40 - 62 * Math.sin(-a) * 0.95 - 6 * t)]); }
  const out: Prim[] = [{ k: "poly", pts: goresan(ctrl, [7, 6.5, 6, 5.5, 5, 4, 3]), fill: "b" }];
  out.push({ k: "poly", pts: goresan([ctrl[1], [ctrl[1][0] - 12, ctrl[1][1] - 16], [ctrl[1][0] - 16 - 6 * r(), ctrl[1][1] - 38]], [7, 6, 1]), fill: "b" });
  for (let j = 0; j < n; j++) {
    const t = 0.3 + (0.66 * j) / Math.max(n - 1, 1), i = Math.min(Math.floor(t * 8), 7), u = t * 8 - i;
    const [x, y] = [ctrl[i][0] + (ctrl[i + 1][0] - ctrl[i][0]) * u, ctrl[i][1] + (ctrl[i + 1][1] - ctrl[i][1]) * u];
    const sisi = j % 2 ? 1 : -1, L = 17 - (6 * j) / n + 2 * r(), a = Math.atan2(ctrl[i + 1][1] - ctrl[i][1], ctrl[i + 1][0] - ctrl[i][0]) + sisi * 0.9;
    const tip: Pt = [x + L * Math.cos(a), y + L * Math.sin(a)], q: Pt = [-Math.sin(a) * 5.5, Math.cos(a) * 5.5];
    out.push({ k: "poly", pts: lengkung([[x, y], [(x + tip[0]) / 2 + q[0], (y + tip[1]) / 2 + q[1]], tip, [(x + tip[0]) / 2 - q[0], (y + tip[1]) / 2 - q[1]]], 6), fill: "b" });
  }
  return out;
}
/** Ranting: batang dari dasar, n cabang meruncing tidak sama panjang, berselang-seling di ketinggian berbeda. */
export function ranting(n: number, seed: number): Fig {
  const r = acakDari(seed), miring = (r() - 0.5) * 0.5, batang: Pt[] = [];
  for (let i = 0; i <= 6; i++) { const t = i / 6; batang.push([r1(Math.sin(t * 2 + miring * 6) * 6 + miring * 40 * t), r1(42 - 84 * t)]); }
  const out: Prim[] = [{ k: "poly", pts: goresan(batang, [10, 9, 7.5, 6, 4.5, 3, 1.5]), fill: "b" }];
  const awal = r() < 0.5 ? 1 : -1;
  for (let j = 0; j < n; j++) {
    const t = 0.18 + (0.62 * (j + 0.3 * r())) / n, i = Math.min(Math.floor(t * 6), 5), u = t * 6 - i;
    const [x, y] = [batang[i][0] + (batang[i + 1][0] - batang[i][0]) * u, batang[i][1] + (batang[i + 1][1] - batang[i][1]) * u];
    const sisi = (j % 2 ? -1 : 1) * awal, L = 30 - (12 * j) / n + 8 * r(), a = -Math.PI / 2 + sisi * (0.7 + 0.5 * r());
    const tengah: Pt = [x + L * 0.55 * Math.cos(a) + sisi * 3, y + L * 0.55 * Math.sin(a) + 4], ujung: Pt = [x + L * Math.cos(a), y + L * Math.sin(a)];
    out.push({ k: "poly", pts: goresan([[x, y], tengah, ujung], [7 - (3 * j) / n, 4, 1]), fill: "b" });
  }
  return out;
}
/** Kerang kipas miring: n rusuk membulat di tepi (lebar tidak sama), garis rusuk putih menuju engsel yang bergeser ke satu
 *  sisi, dua telinga engsel jauh berbeda besar — supaya putar dan cermin jelas berbeda. */
export function kerang(n: number, seed: number): Fig {
  const r = acakDari(seed), engsel: Pt = [-12, 30], a0 = -Math.PI * 0.95, a1 = -Math.PI * (0.18 + 0.08 * r()), tepi: Pt[] = [], garis: Prim[] = [];
  const lebar = Array.from({ length: n }, (_, j) => 0.7 + 0.6 * ((j + 1) / n) + 0.2 * r()), total = lebar.reduce((a, b) => a + b, 0);
  const batas = lebar.reduce<number[]>((acc, w) => [...acc, acc[acc.length - 1] + w / total], [0]);
  for (let k = 0; k <= 120; k++) {
    const t = k / 120, a = a0 + (a1 - a0) * t, j = Math.min(batas.findIndex((b) => b > t) - 1, n - 1), u = (t - batas[j]) / (batas[j + 1] - batas[j]);
    const R = 46 + 10 * t + 6 * Math.sin(Math.PI * Math.max(0, Math.min(1, u)));
    tepi.push([r1(engsel[0] + R * Math.cos(a)), r1(engsel[1] + R * Math.sin(a))]);
  }
  for (let j = 1; j < n; j++) { const a = a0 + (a1 - a0) * batas[j], R = 44 + 10 * batas[j]; garis.push({ k: "poly", pts: goresan([[engsel[0] + 8 * Math.cos(a), engsel[1] + 8 * Math.sin(a)], [engsel[0] + R * Math.cos(a), engsel[1] + R * Math.sin(a)]], [1, 2.6]), fill: "u" }); }
  const telinga: Prim[] = [{ k: "poly", pts: lengkung([[-14, 30], [-34, 24], [-36, 36], [-16, 39]], 5), fill: "b" }, { k: "poly", pts: lengkung([[-10, 30], [-2, 29], [-2, 34], [-9, 35]], 5), fill: "b" }];
  return [{ k: "poly", pts: [...tepi, engsel], fill: "b" }, ...telinga, ...garis];
}
/** Gulung ombak: n gelombang tebal yang ujungnya menggulung besar ke satu arah (ikal terbuka, bukan gumpal),
 *  makin ke belakang makin kecil; tanpa badan padat supaya gulungannya terbaca. */
export function gulung(n: number, seed: number): Fig {
  const r = acakDari(seed), out: Prim[] = [];
  for (let j = 0; j < n; j++) {
    const s = 1 - (0.3 * j) / Math.max(n - 1, 1), x0 = 26 - (60 * j) / Math.max(n - 1, 1), y0 = 34 - 6 * j * r(), R = 16 * s, path: Pt[] = [];
    path.push([x0 - 34 * s, y0], [x0 - 22 * s, y0 - 4 * s], [x0 - 8 * s, y0 - 16 * s]);
    for (let t = 0; t <= 1.35; t += 0.08) { const a = Math.PI + t * 2 * Math.PI, rr = R * (1 - t / 1.7); path.push([x0 + rr * Math.cos(a) * -1 + R * 0.2, y0 - 22 * s + rr * Math.sin(a)]); }
    out.push({ k: "poly", pts: goresan(path, path.map((_, i) => (i < 3 ? 9 * s : 9 * s * (1 - (i - 3) / (path.length - 2)) + 1.2))), fill: "b" });
  }
  return out;
}

// ── keluarga gemuk mudah-lacak (langkah 1b, untuk Paket 3, 2026-10-29) ──────────────────────────────────────────
/** Teratai: n kelopak runcing mengipas dari pangkal (panjang dan miring tidak sama) + satu daun bulat bertakik di satu sisi. */
export function teratai(n: number, seed: number): Fig {
  const r = acakDari(seed), out: Prim[] = [], pangkal: Pt = [2, 22], miring = (r() - 0.5) * 0.5;
  for (let j = 0; j < n; j++) {
    const a = -Math.PI / 2 + miring + (j - (n - 1) / 2) * (1.9 / n), L = 30 + 14 * Math.cos((j - (n - 1) / 2) / n * 2.4) + 6 * r(), w = 7 + 3 * r();
    const d: Pt = [Math.cos(a), Math.sin(a)], q: Pt = [-d[1], d[0]], at = (s: number, t: number): Pt => [pangkal[0] + d[0] * s + q[0] * t, pangkal[1] + d[1] * s + q[1] * t];
    out.push({ k: "poly", pts: lengkung([at(0, w * 0.4), at(L * 0.45, w), at(L, 0), at(L * 0.45, -w), at(0, -w * 0.4)], 6), fill: "b" });
  }
  const sisi = r() < 0.5 ? 1 : -1, cx = 24 * sisi, cy = 32;
  out.push({ k: "poly", pts: lengkung([[cx - 14, cy], [cx - 10, cy - 8], [cx, cy - 10], [cx + 12, cy - 6], [cx + 15, cy + 2], [cx + 4, cy + 9], [cx - 2, cy + 3], [cx - 8, cy + 8]], 6), fill: "b" });
  return out;
}
/** Batu bersusun: n batu membulat tidak beraturan, mengecil ke atas, bergeser kiri-kanan; ada celah supaya bisa dihitung. */
export function batu(n: number, seed: number): Fig {
  const r = acakDari(seed), out: Prim[] = [];
  let y = 40, x = 0;
  for (let j = 0; j < n; j++) {
    // Batu bulat-lonjong miring (bukan pipih), bergeser kiri-kanan tidak sama: versi pertama terlihat seperti tumpukan pipih (cek mata).
    const w = 24 - (10 * j) / n + 6 * r(), h = (22 - (8 * j) / n) * (0.8 + 0.35 * r()), cy = y - h / 2, tilt = (r() - 0.5) * 0.6;
    x += (j % 2 ? -1 : 1) * (4 + 8 * r());
    const ctrl: Pt[] = Array.from({ length: 7 }, (_, k) => { const a = (2 * Math.PI * k) / 7 + r() * 0.4, f = 0.8 + 0.3 * r(), px = Math.cos(a) * w * f, py = Math.sin(a) * (h / 2) * f; return [x + px * Math.cos(tilt) - py * Math.sin(tilt), cy + px * Math.sin(tilt) + py * Math.cos(tilt)]; });
    out.push({ k: "poly", pts: lengkung(ctrl, 5), fill: "b" });
    y -= h + 2.5;
  }
  return out;
}
/** Sayap berbulu: tulang sayap melengkung + n bulu membulat menggantung, makin ke ujung makin panjang dan miring. */
export function sayap(n: number, seed: number): Fig {
  const r = acakDari(seed), tulang: Pt[] = [], out: Prim[] = [];
  for (let i = 0; i <= 6; i++) { const t = i / 6; tulang.push([-34 + 68 * t, -18 - 14 * Math.sin(Math.PI * t * 0.9) + 8 * t]); }
  out.push({ k: "poly", pts: goresan(tulang, [9, 8.5, 8, 7, 6, 4.5, 3]), fill: "b" });
  for (let j = 0; j < n; j++) {
    const t = 0.08 + (0.84 * j) / Math.max(n - 1, 1), i = Math.min(Math.floor(t * 6), 5), u = t * 6 - i;
    const x = tulang[i][0] + (tulang[i + 1][0] - tulang[i][0]) * u, y = tulang[i][1] + (tulang[i + 1][1] - tulang[i][1]) * u;
    // Bulu ramping berujung bulat dan mengipas lebar: versi pertama (bulu lebar, sudut sempit) menyatu jadi blok (cek mata).
    const L = 20 + 26 * t + 4 * r(), a = Math.PI / 2 - 0.2 + 1.0 * t + 0.08 * r(), w = 3.2 + 0.8 * r(), ujung: Pt = [x + L * Math.cos(a), y + L * Math.sin(a)];
    out.push({ k: "poly", pts: goresan([[x, y], [x + L * 0.5 * Math.cos(a), y + L * 0.5 * Math.sin(a)], ujung], [w * 1.6, w * 2, w * 1.8]), fill: "b" }, { k: "circ", c: [r1(ujung[0]), r1(ujung[1])], r: r1(w * 0.9), fill: "b" });
  }
  return out;
}

/** Contoh siap pakai (seed dipilih yang lolos kiral + beda putar/cermin ≥ 0,35). */
export const POLA: Record<string, Fig> = {
  molekul3: molekulAcak(3, 5), molekul4: molekulAcak(4, 2), molekul5: molekulAcak(5, 12),
  spiral7: spiral(7, 9.5), spiral9: spiral(9, 7.5),
  ikal2: ikal(2), ikal3: ikal(3, 14),
  lekuk3: lekuk(3, 4), lekuk4: lekuk(4, 2), lekuk5: lekuk(5, 1),
  // Gaya siluet (2026-10-28): molekul bersiku yang lolos cek mata; yang lurus memanjang (seed 22, 52, 9, 29) lemah.
  molekul3b: molekulAcak(3, 31), molekul3c: molekulAcak(3, 14), molekul4b: molekulAcak(4, 59), molekul4c: molekulAcak(4, 21), molekul5b: molekulAcak(5, 6), molekul5c: molekulAcak(5, 39),
};
