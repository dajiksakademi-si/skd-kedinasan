import { type Fig, type Fill, type Prim, type Pt, r1 } from "./figural-lib";
import { goresan, lengkung } from "./tiu-gaya";

// Aset handbook saja; tidak didaftarkan ke generator soal atau katalog bentuk.
const acakDari = (seed: number) => { let x = seed * 7919 + 13; return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648); };
const poly = (pts: Pt[], fill: Fill = "b"): Prim => ({ k: "poly", pts, fill });
const gores = (pts: Pt[], w: number[], fill: Fill = "b") => poly(goresan(pts, w), fill);
const cek = (n: number, max: number, seed: number) => {
  if (!Number.isInteger(n) || n < 3 || n > max || !Number.isSafeInteger(seed)) throw new RangeError(`n harus 3–${max}; seed harus bilangan bulat aman`);
};

/** Cakar: n talon TOTAL, termasuk satu ibu-cakar pendek di kanan telapak. */
export function cakar(n: number, seed: number): Fig {
  cek(n, 6, seed);
  const r = acakDari(seed), out: Fig = [], cx = -3, cy = 16;
  for (let i = 0; i < n - 1; i++) {
    const t = i / (n - 2), a = -2.92 + 2.13 * t, L = 29 + 15 * t + 2 * r();
    const at = (d: number, v: number): Pt => [cx + d * Math.cos(a) - v * Math.sin(a), cy + d * Math.sin(a) + v * Math.cos(a)];
    out.push(gores([at(10, 0), at(24, -1), at(L, 3), at(L + 3, 11)], [12, 11, 8, 0.8]));
  }
  out.push(gores([[6, 24], [18, 31], [26, 28], [28, 20]], [17, 14, 10, 1]));
  out.push(poly(lengkung([[-19, 9], [-6, 1], [9, 9], [14, 24], [5, 38], [-12, 34], [-21, 22]], 6)));
  out.push(gores([[-12, 17], [-6, 24], [3, 27]], [1.8, 2.2, 1.8], "u"));
  return out;
}

/** Sulur: tepat n daun gemuk berselang-seling; satu spiral besar hanya di ujung atas. */
export function sulur(n: number, seed: number): Fig {
  cek(n, 7, seed);
  const r = acakDari(seed), out: Fig = [];
  const batang = (t: number): Pt => [-22 + 12 * t + 3 * Math.sin(Math.PI * t), 44 - 57 * t];
  const ctrl: Pt[] = Array.from({ length: 8 }, (_, i) => batang(i / 7));
  const curl: Pt[] = Array.from({ length: 25 }, (_, i) => {
    const t = i / 24, a = Math.PI + 2.12 * Math.PI * t, R = 20 - 13 * t;
    return [10 + R * Math.cos(a), -24 + R * Math.sin(a)];
  });
  out.push(gores([...ctrl, ...curl], [14, 14, 14, 12, 10, 9, 8]));
  for (let i = 0; i < n; i++) {
    const t = 0.06 + 0.64 * i / (n - 1), [x, y] = batang(t), s = i % 2 ? 1 : -1;
    const L = 19 + 3 * r() + (i % 2 ? 4 : 0), h = 4.2 + r() * 0.6;
    const at = (u: number, v: number): Pt => [x + s * u, y - 0.26 * u + v];
    out.push(poly(lengkung([at(0, 0), at(L * 0.5, -h), at(L, -1), at(L * 0.8, h), at(L * 0.3, h)], 5)));
  }
  out.push(gores([batang(0.08), batang(0.27), batang(0.48)], [1.8, 2, 1.8], "u"));
  return out;
}

/** Tanduk: pangkal terpotong rata, ujung melengkung; n pita putih berjarak tidak rata. */
export function tanduk(n: number, seed: number): Fig {
  cek(n, 7, seed);
  const r = acakDari(seed), R = 29 + r() * 2, a0 = 2.62, sweep = 3.0 + r() * 0.12;
  const center = (t: number): Pt => [5 + R * Math.cos(a0 + sweep * t), 5 + R * Math.sin(a0 + sweep * t)];
  const width = (t: number) => 32 * Math.pow(1 - t, 0.62);
  const at = (t: number, v: number): Pt => {
    const [x, y] = center(t), a = a0 + sweep * t;
    return [r1(x + v * Math.cos(a)), r1(y + v * Math.sin(a))];
  };
  const outer: Pt[] = [], inner: Pt[] = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    outer.push(at(t, width(t) / 2)); inner.push(at(t, -width(t) / 2));
  }
  const out: Fig = [poly([...outer, ...inner.reverse()])];
  for (let i = 0; i < n; i++) {
    const t = 0.1 + 0.66 * Math.pow(i / (n - 1), 1.14) + (r() - 0.5) * 0.008, w = width(t) / 2 - 1.8;
    out.push(gores([at(t - 0.014, -w), at(t + 0.014, 0), at(t - 0.008, w)], [1.9, 2.2, 1.9], "u"));
  }
  return out;
}

/** Bulu: n cuping bulat di kanan saja; tepi kiri mulus, celah terbuka sampai dekat poros. */
export function bulu(n: number, seed: number): Fig {
  cek(n, 7, seed);
  const r = acakDari(seed), poros = (t: number): Pt => [-18 + 38 * t * t, 43 - 86 * t];
  const ctrl: Pt[] = Array.from({ length: 9 }, (_, i) => poros(i / 8));
  const out: Fig = [gores(ctrl, [14, 16, 16, 16, 14, 9, 0.8])];
  const pitch = 64.5 / (n - 1), h = Math.min(9, (pitch - 3.4) / 2);
  for (let i = 0; i < n; i++) {
    const t = 0.16 + 0.75 * i / (n - 1), [x, y] = poros(t), L = 18 + 9 * Math.sin(Math.PI * t) + r() * 2;
    const at = (u: number, v: number): Pt => [x + u, y - 0.3 * u + v];
    out.push(poly(lengkung([at(-2, h), at(L * 0.72, h), at(L, 0), at(L * 0.72, -h), at(-2, -h)], 5)));
  }
  // Takik putih menjaga pemisah 2 satuan saat cuping atas saling mendekat di lengkung poros.
  for (let i = 0; n > 3 && i < n - 1; i++) {
    const [x, y] = poros(0.16 + 0.75 * (i + 0.5) / (n - 1));
    out.push(gores([[x + 9, y - 2.7], [x + 18, y - 5.4], [x + 28, y - 8.4]], [2, 2], "u"));
  }
  out.push(gores([poros(0.13), poros(0.3), poros(0.5), poros(0.7)], [1.8, 2.1, 2.1, 1.8], "u"));
  return out;
}
