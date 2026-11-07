import { type Fig, type Fill, type Prim, type Pt, r1 } from "./figural-lib";

// TIU SKD — aset bentuk organik dalam tiga gaya (putusan Gusti 2026-10-28: gabungan, supaya tidak monoton):
//   alam     = potongan kertas: daun, biji, tunas, ombak, bulu (siluet tebal bertepi lembut)
//   nusantara= potongan motif: pucuk rebung, sulur, parang, kawung (dipotong tidak simetris)
//   kuas     = goresan kuas: tepi tidak rata, tebal berubah
// Semua bentuk = poligon rapat hasil penghalusan titik kendali, jadi putar/cermin/sig tetap eksak.

type P2 = Pt;
const cr = (p0: P2, p1: P2, p2: P2, p3: P2, t: number): P2 => {
  const t2 = t * t, t3 = t2 * t;
  const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
  return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])];
};
/** Lengkung tertutup halus melewati titik kendali. */
export function lengkung(ctrl: P2[], k = 7): P2[] {
  const n = ctrl.length, out: P2[] = [];
  for (let i = 0; i < n; i++) for (let s = 0; s < k; s++) out.push(cr(ctrl[(i - 1 + n) % n], ctrl[i], ctrl[(i + 1) % n], ctrl[(i + 2) % n], s / k));
  return out.map(([x, y]): P2 => [r1(x), r1(y)]);
}
/** Lengkung terbuka (garis tengah) melewati titik kendali, beserta parameter 0..1 tiap titik. */
function garisTengah(ctrl: P2[], k = 8): [P2, number][] {
  const n = ctrl.length, c = [ctrl[0], ...ctrl, ctrl[n - 1]], out: [P2, number][] = [];
  for (let i = 1; i < n; i++) for (let s = 0; s < (i === n - 1 ? k + 1 : k); s++) out.push([cr(c[i - 1], c[i], c[i + 1], c[i + 2], s / k), (i - 1 + s / k) / (n - 1)]);
  return out;
}
/** Goresan bertebal: garis tengah + tebal per titik kendali; `kasar` > 0 membuat tepi seperti kuas. */
export function goresan(ctrl: P2[], tebal: number[], kasar = 0, seed = 1): P2[] {
  const mid = garisTengah(ctrl);
  let x = seed;
  const acak = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648) - 0.5;
  const w = (u: number) => { const p = u * (tebal.length - 1), i = Math.min(Math.floor(p), tebal.length - 2); return tebal[i] + (tebal[i + 1] - tebal[i]) * (p - i); };
  const kiri: P2[] = [], kanan: P2[] = [];
  mid.forEach(([[px, py], u], i) => {
    const [ax, ay] = mid[Math.max(i - 1, 0)][0], [bx, by] = mid[Math.min(i + 1, mid.length - 1)][0];
    const len = Math.hypot(bx - ax, by - ay) || 1, nx = -(by - ay) / len, ny = (bx - ax) / len;
    const h = w(u) / 2, j1 = 1 + kasar * acak(), j2 = 1 + kasar * acak();
    kiri.push([r1(px + nx * h * j1), r1(py + ny * h * j1)]);
    kanan.push([r1(px - nx * h * j2), r1(py - ny * h * j2)]);
  });
  return [...kiri, ...kanan.reverse()];
}
const poly = (pts: P2[], fill: Fill = "b"): Prim => ({ k: "poly", pts, fill });
const dot = (c: P2, r: number, fill: Fill = "b"): Prim => ({ k: "circ", c, r, fill });

// ── alam (potongan kertas) ──────────────────────────────────────────────────
const DAUN: Fig = [poly(lengkung([[-24, 26], [-30, 2], [-18, -22], [4, -36], [32, -38], [22, -14], [10, 8], [-6, 20]])), poly(goresan([[-20, 22], [-32, 34], [-40, 34]], [6, 5, 4])), poly(goresan([[-16, 16], [-2, -6], [14, -22], [24, -30]], [3, 3, 2.5, 1.5]), "w")];
const BIJI: Fig = [poly(lengkung([[-4, -36], [18, -30], [28, -8], [20, 16], [2, 32], [-20, 34], [-10, 20], [2, 4], [-6, -12], [-24, -22]]))];
const TUNAS: Fig = [poly(goresan([[-4, 38], [-2, 12], [4, -10], [2, -30]], [8, 7, 6, 4])), poly(lengkung([[0, -6], [16, -26], [36, -30], [28, -10]])), poly(lengkung([[-2, 10], [-14, -2], [-30, 0], [-20, 14]]))];
const OMBAK: Fig = [poly(goresan([[-36, 26], [-24, 0], [-4, -20], [20, -22], [32, -6], [22, 8], [8, 2]], [8, 14, 16, 14, 10, 7, 4]))];
const BULU: Fig = [poly(lengkung([[-8, 38], [-14, 10], [-10, -18], [4, -38], [14, -20], [22, -18], [16, -4], [24, 2], [14, 14], [6, 30]]))];

// ── nusantara (potongan motif) ──────────────────────────────────────────────
const PUCUK: Fig = [poly(lengkung([[-32, 34], [30, 34], [14, 10], [4, -16], [-2, -38], [-12, -12], [-4, -4], [-20, 8]], 5)), poly(lengkung([[16, 14], [34, 2], [38, -14], [26, -4]], 5)), dot([-2, 18], 6, "w")];
const SULUR: Fig = [poly(goresan([[-34, 30], [-20, 10], [-14, -14], [4, -30], [24, -24], [26, -6], [12, 0], [8, -12]], [9, 10, 10, 9, 8, 6, 5, 3]))];
const PARANG: Fig = [poly(lengkung([[-36, -4], [-26, -34], [-2, -36], [8, -18], [30, -12], [34, 4], [24, 20], [10, 18], [-6, 8], [-26, 12]], 6)), dot([-16, -18], 6, "w"), poly(goresan([[24, 18], [26, 32], [16, 40]], [6, 5, 3]))];
const KAWUNG: Fig = [poly(lengkung([[-30, 0], [-18, -28], [6, -36], [26, -18], [24, 8], [4, 30], [-20, 26]])), dot([8, -12], 7, "w"), dot([-14, 12], 4, "w"), poly(goresan([[16, 18], [30, 32], [44, 24]], [8, 6, 4]))];

// ── kuas (goresan kuas) ─────────────────────────────────────────────────────
const KOMA: Fig = [poly(goresan([[-30, -30], [-6, -24], [14, -6], [18, 16], [4, 34]], [6, 16, 20, 14, 4], 0.35, 7))];
const KAIT: Fig = [poly(goresan([[-24, -34], [-20, 0], [-8, 26], [14, 30], [26, 14], [20, 2]], [10, 12, 12, 10, 8, 5], 0.35, 11))];
const ZIGZAG: Fig = [poly(goresan([[-34, -26], [-8, -16], [-22, 4], [8, 12], [-4, 32], [30, 30]], [12, 10, 11, 9, 9, 6], 0.3, 5))];

export const GAYA: Record<"alam" | "nusantara" | "kuas", Record<string, Fig>> = {
  alam: { daun: DAUN, biji: BIJI, tunas: TUNAS, ombak: OMBAK, bulu: BULU },
  nusantara: { pucuk: PUCUK, sulur: SULUR, parang: PARANG, kawung: KAWUNG },
  kuas: { koma: KOMA, kait: KAIT, zigzag: ZIGZAG },
};

/** Gumpal bercabang (untuk soal hitung): n cabang bergelombang, panjang tidak sama, seed tetap. */
export function gumpal(n: number, seed: number, r = 30): Fig {
  let x = seed;
  const acak = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
  const ctrl: P2[] = [];
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * (i + 0.28 * acak())) / n - Math.PI / 2, b = a + Math.PI / n, L = r * (0.7 + 0.55 * acak()), d = r * (0.3 + 0.18 * acak());
    ctrl.push([L * Math.cos(a - 0.12), L * Math.sin(a - 0.12)], [L * 0.92 * Math.cos(a + 0.14), L * 0.92 * Math.sin(a + 0.14)], [d * Math.cos(b), d * Math.sin(b)]);
  }
  return [poly(lengkung(ctrl, 5))];
}
/** Balik warna: hitam penuh ↔ garis putih (Al Faiz Paket 41 no. 59). */
export const balikWarna = (f: Fig): Fig => f.map((q) => (q.k === "line" ? q : { ...q, fill: q.fill === "w" ? "b" : q.fill === "u" ? "b" : "w" }));
/** Arsir miring: bagian hitam jadi putih bergaris miring, garis dipotong tepat di dalam poligon.
 *  Pakai SETELAH geser/putar (lewat `beri`), supaya rapat dan arah arsir sama di semua ukuran dan posisi. */
export function arsir(f: Fig, jarak = 4.5): Fig {
  const k = Math.SQRT1_2, ke = ([x, y]: Pt): Pt => [k * (x + y), k * (y - x)], balik = ([u, v]: Pt): Pt => [r1(k * (u - v)), r1(k * (u + v))];
  return f.flatMap((q): Prim[] => {
    if (q.k !== "poly" || q.fill !== "b") return [q];
    const P = q.pts.map(ke), vs = P.map((p) => p[1]), out: Prim[] = [{ ...q, fill: "w" }];
    for (let v = Math.ceil(Math.min(...vs) / jarak) * jarak; v < Math.max(...vs); v += jarak) {
      const xs: number[] = [];
      P.forEach(([x1, y1], i) => { const [x2, y2] = P[(i + 1) % P.length]; if (y1 > v !== y2 > v) xs.push(x1 + ((v - y1) * (x2 - x1)) / (y2 - y1)); });
      xs.sort((a, b) => a - b);
      for (let i = 0; i + 1 < xs.length; i += 2) if (xs[i + 1] - xs[i] > 3) out.push({ k: "line", a: balik([xs[i] + 1, v]), b: balik([xs[i + 1] - 1, v]), w: 1.6 });
    }
    return out;
  });
}
