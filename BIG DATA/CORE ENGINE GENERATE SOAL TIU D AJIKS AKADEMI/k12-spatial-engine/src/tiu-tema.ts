/**
 * TIU figural bertema (kerja ulang 2026-11-08, langkah 1 = cara (b)).
 * Aset codex SVG (aset-tema/<tema>/<nama>.svg, viewBox 100) dipakai apa adanya; keadaan soal = parameter.
 * Kunci tunggal dan pengecoh dibuktikan dari parameter (asal: prototipe-bahari/susun.cjs).
 * Rupa aset (beda bila diputar/dicermin) diperiksa terpisah oleh tiu-tema-cek.ts (raster).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { KEYS, type Key } from "./figural-lib";
import type { Draft } from "./k12-spasial-core";

const DIR = join(__dirname, "..", "aset-tema");
const cache = new Map<string, string>();
/** Isi SVG aset tanpa pembungkus <svg>. */
export const aset = (tema: string, nama: string) => {
  const k = `${tema}/${nama}`;
  if (!cache.has(k)) cache.set(k, readFileSync(join(DIR, tema, `${nama}.svg`), "utf8").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim());
  return cache.get(k)!;
};

/** Taruh aset di kotak ukuran u berpusat (cx, cy); r = putar searah jarum jam (derajat), c = cermin "kk" (kiri-kanan) / "ab" (atas-bawah). */
export type Pose = { r?: number; c?: "kk" | "ab" | "" };
export function taruh(body: string, cx: number, cy: number, u: number, p: Pose = {}) {
  const t = [`translate(${cx - u / 2} ${cy - u / 2})`, `scale(${u / 100})`];
  if (p.r) t.push(`rotate(${p.r} 50 50)`);
  if (p.c === "kk") t.push("translate(100 0) scale(-1 1)");
  if (p.c === "ab") t.push("translate(0 100) scale(1 -1)");
  return `<g transform="${t.join(" ")}">${body}</g>`;
}

const S = 200; // sisi satu sel
export const bingkai = (inner: string) => `<rect x="1.5" y="1.5" width="${S - 3}" height="${S - 3}" fill="#fff" stroke="#111" stroke-width="3"/>${inner}`;
const svgDoc = (w: number, h: number, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
const tanya = (x: number, y: number) => `<g transform="translate(${x} ${y})"><rect x="1.5" y="1.5" width="${S - 3}" height="${S - 3}" fill="#fff" stroke="#111" stroke-width="4"/><text x="100" y="128" text-anchor="middle" font-family="Arial" font-weight="800" font-size="80" fill="#111">?</text></g>`;
const label = (x: number, y: number, s: string) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial" font-weight="700" font-size="22" fill="#111">${s}</text>`;
/** Satu sel opsi. */
export const opsiSvg = (inner: string) => svgDoc(S, S, bingkai(inner));
/** Gambar pembahasan: sel jawaban dengan lingkaran penanda pada ciri penentu. Tanda = [cx, cy, r] atau [cx, cy, r, warna]. */
export type Tanda = [number, number, number, string?];
export const lingkari = (t: Tanda[]) => t.map(([x, y, r, w]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${w ?? "#d92d20"}" stroke-width="4"/>`).join("");
export const anotasi = (inner: string, t: Tanda[]) => svgDoc(S, S, bingkai(inner) + lingkari(t));
/** Deret: sel berjajar + sel "?" di akhir, berlabel (1)…(n). */
export function deret(sel: string[]) {
  const G = 14, n = sel.length + 1, W = n * S + (n - 1) * G;
  return svgDoc(W, S + 34, [...sel.map((s, i) => `<g transform="translate(${i * (S + G)} 0)">${bingkai(s)}</g>`), tanya(sel.length * (S + G), 0),
    ...Array.from({ length: n }, (_, i) => label(i * (S + G) + S / 2, S + 28, `(${i + 1})`))].join(""));
}
/** Matriks 3×3, sel q (baris, kolom; bawaan kanan bawah) "?"; q = null tanpa "?" (untuk gambar pembahasan). */
export function matriks(sel: string[][], q: [number, number] | null = [2, 2]) {
  const G = 10, W = 3 * S + 2 * G;
  return svgDoc(W, W, sel.flatMap((row, r) => row.map((s, c) => (q && r === q[0] && c === q[1] ? tanya(c * (S + G), r * (S + G)) : `<g transform="translate(${c * (S + G)} ${r * (S + G)})">${bingkai(s)}</g>`))).join(""));
}
/** Analogi (1):(2) = (3):(4) dengan (4) = "?". */
export function analogi(a: string, b: string, c: string) {
  const G = 14, T = 50, W = 4 * S + 2 * G + T;
  const x = [0, S + G, 2 * S + G + T, 3 * S + 2 * G + T];
  return svgDoc(W, S + 34, [a, b, c].map((s, i) => `<g transform="translate(${x[i]} 0)">${bingkai(s)}</g>`).join("") + tanya(x[3], 0) +
    `<text x="${2 * S + G + T / 2}" y="${S / 2 + 12}" text-anchor="middle" font-family="Arial" font-weight="800" font-size="40">=</text>` +
    x.map((xx, i) => label(xx + S / 2, S + 28, `(${i + 1})`)).join(""));
}

/* ---------- Pemilih pengecoh (aturan kesulitan v3) ---------- */
export type Keadaan = Record<string, string | number>;
export type Calon = { x: Keadaan; n: string[] };
const sig = (x: Keadaan) => JSON.stringify(Object.keys(x).sort().map((k) => [k, x[k]]));
export type AturanPilih = {
  /** Ciri yang terlihat sekilas: masing-masing menggugurkan ≤ maksMudah pengecoh. */
  mudah: string[];
  maksMudah?: number; // bawaan 1
  maksHalus?: number; // bawaan 3
  minBukanTerbanyak?: number; // bawaan 2: ciri yang nilai kuncinya bukan terbanyak di antara 5 opsi
  minBeda?: number; // bawaan 2: antar-pengecoh beda ≥ minBeda ciri
  maksSalah?: number; // bawaan 3 kesalahan per pengecoh
  terlihat?: Keadaan[]; // gambar di soal: kunci dan pengecoh tidak boleh sama dengan ini
};
/**
 * Pilih 4 pengecoh dari kekeliruan bernama. SALAH[ciri] = [nilai salah, nama kekeliruan][].
 * Syarat v3: tiap ciri diuji ≥ 1 pengecoh; ciri mudah menggugurkan ≤ 1, ciri halus ≤ 3; ≥ 2 ciri yang nilai kuncinya bukan terbanyak;
 * antar-pengecoh beda ≥ 2 ciri; gabungan nilai terbanyak per ciri ≠ kunci. Melempar galat bila mustahil.
 */
export function pilihPengecoh(K: Keadaan, SALAH: Record<string, [string | number, string][]>, a: AturanPilih): Calon[] {
  const ATR = Object.keys(SALAH), maksSalah = a.maksSalah ?? 3;
  const terlihat = new Set((a.terlihat ?? []).map(sig));
  assert.ok(!terlihat.has(sig(K)), "kunci sama dengan gambar di soal");
  const pool: Calon[] = [];
  const rek = (i: number, x: Keadaan, n: string[]) => {
    if (n.length) pool.push({ x, n });
    if (n.length === maksSalah) return;
    for (let j = i; j < ATR.length; j++) for (const [v, nm] of SALAH[ATR[j]]) if (String(v) !== String(K[ATR[j]])) rek(j + 1, { ...x, [ATR[j]]: v }, [...n, nm]);
  };
  rek(0, K, []);
  const calon = pool.filter((c) => !terlihat.has(sig(c.x)) && sig(c.x) !== sig(K));
  const beda = (u: Keadaan, w: Keadaan) => ATR.filter((k) => String(u[k]) !== String(w[k])).length;
  const hitung = (opsi: Keadaan[], k: string) => opsi.reduce<Record<string, number>>((m, o) => ((m[String(o[k])] = (m[String(o[k])] ?? 0) + 1), m), {});
  const nilai = (set: Calon[]) => {
    const opsi = [K, ...set.map((c) => c.x)];
    let bt = 0;
    for (const k of ATR) {
      const salah = set.filter((c) => String(c.x[k]) !== String(K[k])).length;
      if (salah === 0 || salah > (a.mudah.includes(k) ? a.maksMudah ?? 1 : a.maksHalus ?? 3)) return -1;
      const m = hitung(opsi, k);
      if (Object.entries(m).some(([v, n]) => v !== String(K[k]) && n >= m[String(K[k])])) bt++;
    }
    return bt >= (a.minBukanTerbanyak ?? 2) ? bt : -1;
  };
  let best: Calon[] | null = null, bestS = -Infinity;
  const N = calon.length, minBeda = a.minBeda ?? 2;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    if (beda(calon[i].x, calon[j].x) < minBeda) continue;
    for (let k = j + 1; k < N; k++) {
      if (beda(calon[i].x, calon[k].x) < minBeda || beda(calon[j].x, calon[k].x) < minBeda) continue;
      for (let l = k + 1; l < N; l++) {
        const set = [calon[i], calon[j], calon[k], calon[l]];
        if ([i, j, k].some((p) => beda(calon[p].x, calon[l].x) < minBeda)) continue;
        const v = nilai(set);
        if (v < 0) continue;
        const s = v * 100 - set.reduce((t, c) => t + c.n.length, 0); // utamakan anti-tebak, lalu kekeliruan paling sedikit
        if (s > bestS) { bestS = s; best = set; }
      }
    }
  }
  assert.ok(best, "tidak ada susunan pengecoh yang lolos aturan v3");
  const opsi = [K, ...best.map((c) => c.x)];
  const mayor = Object.fromEntries(ATR.map((k) => { const m = hitung(opsi, k); return [k, Object.entries(m).sort((p, q) => q[1] - p[1])[0][0]]; }));
  assert.ok(ATR.some((k) => mayor[k] !== String(K[k])), "kunci = gabungan nilai terbanyak per ciri");
  return best;
}

/* ---------- Pembahasan gaya baru (putusan Gusti 2026-11-08) ---------- */
/** Urutan: kunci di awal → yang ditanya → langkah → kenapa tiap opsi lain gugur → alasan kunci satu kalimat. */
export function bahas(o: { key: Key; ditanya: string; langkah: string[]; gugur: Partial<Record<Key, string>>; alasan: string }) {
  const g = KEYS.filter((k) => k !== o.key).map((k) => { assert.ok(o.gugur[k], `alasan opsi ${k} kosong`); return `Opsi ${k} gugur: ${o.gugur[k]}`; });
  return [`Jawaban: Opsi ${o.key}.`, `Yang ditanya: ${o.ditanya}`, "Langkah:", ...o.langkah.map((s, i) => `${i + 1}. ${s}`), ...g, `Kenapa ${o.key}: ${o.alasan}`].join("\n");
}

/** Pasang kunci + 4 pengecoh ke huruf; kembalikan opsi berurutan A–E. */
export function letakkan<X>(kunci: X, pengecoh: X[], key: Key): X[] {
  const i = KEYS.indexOf(key);
  return [...pengecoh.slice(0, i), kunci, ...pengecoh.slice(i)];
}

/** Draft bertema: opsi berupa SVG jadi (bukan Fig). */
export type TemaDraft = Draft & { optSvgs: string[]; tema: string; aset: string[] };
export const draft = (d: Omit<TemaDraft, "opts" | "pbhSvg" | "tier"> & { tier?: 2 | 3; pbhSvg?: string }): TemaDraft => ({ tier: 3, opts: [], pbhSvg: "", ...d });
