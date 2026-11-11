// Prototipe gaya bahari v2 (tingkat sulit v3): FIG-SERI-KUADRAN, tiap objek punya aturan sendiri.
// Posisi: kapal diam di kanan atas; ikan, ombak, bintang laut bergilir searah jarum jam melompati kotak kapal.
// Kapal putar 90° searah; bintang laut putar 90° berlawanan arah; ikan dicermin kiri-kanan bolak-balik; ombak isi berganti (garis ganda <-> pekat).
const fs = require("fs"), path = require("path"), assert = require("assert");
const D = __dirname;
const isi = (f) => fs.readFileSync(path.join(D, "aset", f), "utf8").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const IKAN = isi("ikan.svg"), KAPAL = isi("kapal.svg"), OMBAK = isi("ombak.svg"), BINTANG = isi("bintanglaut.svg");
const OMBAK_PEKAT = OMBAK.replace('fill="#fff"', 'fill="#111"');
const POS = [[0, 0], [100, 0], [100, 100], [0, 100]]; // kiri atas, kanan atas, kanan bawah, kiri bawah
const NAMA_POS = ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"];
const C = [0, 2, 3], md = (a, m) => ((a % m) + m) % m; // kotak bergilir (kapal di 1)

// x = {g: geser 0..2, k: rot kapal, b: rot bintang, i: ikan dicermin 0/1, o: ombak pekat 0/1}
function tempat(g) { // indeks kuadran untuk [ikan, ombak, bintang]
  return [0, 1, 2].map((j) => C[md(j + g, 3)]);
}
const rot = (r) => (r ? ` rotate(${r} 50 50)` : "");
function sel(x) {
  const [pi, po, pb] = tempat(x.g);
  const at = (q, body, tr = "") => `<g transform="translate(${POS[q][0] - 1} ${POS[q][1] - 1}) scale(1.02)${tr}">${body}</g>`;
  const g = at(1, KAPAL, rot(x.k)) + at(pi, IKAN, x.i ? " translate(100 0) scale(-1 1)" : "") + at(po, x.o ? OMBAK_PEKAT : OMBAK) + at(pb, BINTANG, rot(x.b));
  return `<svg viewBox="0 0 200 200" class="sel"><rect x="1.5" y="1.5" width="197" height="197" fill="#fff" stroke="#111" stroke-width="3"/>${g}</svg>`;
}
const putK = (p) => md((45 * p * (p + 1)) / 2, 360);
const langkah = (p) => ({ g: md(p, 3), k: putK(p), b: md(-90 * p, 360), i: p % 2, o: p % 2 });
const N = 5, frames = [...Array(N).keys()].map(langkah), K = langkah(N);
const sig = (x) => JSON.stringify([x.g, x.k, x.b, x.i, x.o]);
frames.forEach((f) => assert.notEqual(sig(f), sig(K), "kunci sama dengan gambar terlihat"));

// Calon pengecoh: setiap nilai salah lahir dari kekeliruan bernama.
const SALAH = {
  g: [[md(N - 1, 3), "objek bergilir belum dipindah satu langkah"], [md(-N, 3), "arah gilir terbalik"]],
  k: [[md(putK(N - 1) + 45 * (N - 1), 360), "kapal diputar dengan besar putaran yang sama seperti langkah sebelumnya"], [md(putK(N - 1) + 90, 360), "kapal dianggap selalu berputar 90°"]],
  b: [[md(90 * N, 360), "bintang laut diputar searah, padahal berlawanan"], [md(-90 * (N - 1), 360), "bintang laut lupa diputar"]],
  i: [[1 - K.i, "ikan tidak dicermin pada langkah terakhir"]],
  o: [[1 - K.o, "isi ombak tidak dibalik pada langkah terakhir"]],
};
const ATR = Object.keys(SALAH);
const pool = [];
for (const a of ATR) for (const [v, n] of SALAH[a]) pool.push({ x: { ...K, [a]: v }, n: [n] });
for (let i = 0; i < ATR.length; i++) for (let j = i + 1; j < ATR.length; j++)
  for (const [v1, n1] of SALAH[ATR[i]]) for (const [v2, n2] of SALAH[ATR[j]]) pool.push({ x: { ...K, [ATR[i]]: v1, [ATR[j]]: v2 }, n: [n1, n2] });
for (let i = 0; i < ATR.length; i++) for (let j = i + 1; j < ATR.length; j++) for (let k = j + 1; k < ATR.length; k++)
  for (const [v1, n1] of SALAH[ATR[i]]) for (const [v2, n2] of SALAH[ATR[j]]) for (const [v3, n3] of SALAH[ATR[k]])
    pool.push({ x: { ...K, [ATR[i]]: v1, [ATR[j]]: v2, [ATR[k]]: v3 }, n: [n1, n2, n3] });
const terlihat = new Set(frames.map(sig));
const calon = pool.filter((c) => !terlihat.has(sig(c.x)) && sig(c.x) !== sig(K));

// Syarat pemilihan 4 pengecoh:
// (1) per atribut paling banyak 3 pengecoh salah -> satu ciri saja tidak cukup menggugurkan semua;
// (2) minimal 2 atribut yang nilai kuncinya BUKAN terbanyak -> menebak "yang paling sering muncul" gagal;
// (3) tiap atribut diuji oleh minimal 1 pengecoh -> semua aturan harus dipakai.
const MUDAH = ["g", "k"]; // ciri yang terlihat sekilas: tidak boleh jadi penyaring utama
function nilai(set) {
  const opsi = [K, ...set.map((c) => c.x)];
  let bukanTerbanyak = 0;
  for (const a of ATR) {
    const m = {}; opsi.forEach((o) => (m[o[a]] = (m[o[a]] || 0) + 1));
    const salah = set.filter((c) => c.x[a] !== K[a]).length;
    if (salah === 0 || salah > (MUDAH.includes(a) ? 1 : 3)) return -1;
    if (Object.entries(m).some(([v, n]) => String(v) !== String(K[a]) && n >= m[K[a]])) bukanTerbanyak++;
  }
  return bukanTerbanyak >= 2 ? bukanTerbanyak : -1;
}
let best = null, bestV = -1, bestS = -1e9;
const n = calon.length;
for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) for (let d = c + 1; d < n; d++) {
  const set = [calon[a], calon[b], calon[c], calon[d]];
  if (new Set(set.map((s) => sig(s.x))).size < 4) continue;
  const beda = (u, w) => ATR.filter((a) => u[a] !== w[a]).length; // pengecoh tidak boleh hampir kembar satu sama lain
  if (set.some((u, i) => set.some((w, j) => j > i && beda(u.x, w.x) < 2))) continue;
  const v = nilai(set);
  if (v < 0) continue;
  const skor = v * 100 - set.reduce((t, s) => t + s.n.length, 0); // utamakan anti-tebak, lalu kesalahan paling sedikit
  if (skor > bestS) { bestS = skor; bestV = v; best = set; }
}
assert.ok(best, "tidak ada susunan pengecoh yang lolos");

// Bukti tidak bisa ditebak lewat "nilai terbanyak per atribut".
const opsiAll = [K, ...best.map((c) => c.x)];
const tebakMayor = Object.fromEntries(ATR.map((a) => {
  const m = {}; opsiAll.forEach((o) => (m[o[a]] = (m[o[a]] || 0) + 1));
  return [a, +Object.entries(m).sort((p, q) => q[1] - p[1])[0][0]];
}));
assert.notEqual(sig(tebakMayor), sig(K), "kunci = gabungan nilai terbanyak");

const KEY = 3; // D
const huruf = "ABCDE";
const opsi = [...best.slice(0, KEY), { x: K, n: ["KUNCI"] }, ...best.slice(KEY)];
const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Prototipe Figural Bahari</title><style>
:root{--ink:#111;--muted:#5b5f66;--line:#d9dbe0;--bg:#f4f5f7}
*{box-sizing:border-box}body{margin:0;background:var(--bg);font:15px/1.5 system-ui,-apple-system,sans-serif;color:var(--ink)}
main{max-width:820px;margin:24px auto;padding:0 16px}.kartu{background:#fff;border:1px solid var(--line);border-radius:12px;padding:20px}
.no{color:#8a1c1c;font-weight:700;margin:0}.perintah{margin:4px 0 14px}
.deret{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}.deret figure{margin:0;text-align:center;font-weight:700;font-size:13px}
.sel{width:100%;display:block}.tanya{display:flex;align-items:center;justify-content:center;aspect-ratio:1;border:3px solid var(--ink);font:800 40px system-ui}
.opsi{display:grid;gap:8px;margin-top:16px}.op{display:flex;align-items:center;gap:14px;background:var(--bg);border-radius:10px;padding:8px 12px}
.op b{width:14px;font-size:13px}.op .sel{width:130px}
@media (max-width:560px){.deret{grid-template-columns:repeat(3,1fr);gap:10px}}
.catatan{margin-top:16px;font-size:13px;color:var(--muted)}.catatan li{margin:2px 0}
</style></head><body><main><div class="kartu">
<p class="no">Soal Nomor 58 · prototipe gaya bahari (tingkat sulit v3)</p><p class="perintah">Perhatikan urutan gambar berikut! Gambar manakah yang tepat untuk mengganti tanda tanya?</p>
<div class="deret">${frames.map((f, i) => `<figure>${sel(f)}<figcaption>(${i + 1})</figcaption></figure>`).join("")}<figure><div class="tanya">?</div><figcaption>(6)</figcaption></figure></div>
<div class="opsi">${opsi.map((o, i) => `<div class="op"><b>${huruf[i]}</b>${sel(o.x)}</div>`).join("")}</div>
<div class="catatan"><p>Lembar tinjauan (bukan tampilan siswa). Kunci ${huruf[KEY]}. Aturan: kapal diam di kanan atas, berputar searah jarum jam dengan putaran yang bertambah 45° tiap langkah (+45°, +90°, +135°, +180°, +225°); ikan, ombak, bintang laut bergilir searah jarum jam melompati kotak kapal; bintang laut juga berputar 90° berlawanan arah; ikan dicermin kiri-kanan bolak-balik; isi ombak berganti garis ganda ↔ pekat.</p>
<ul>${opsi.map((o, i) => (i === KEY ? "" : `<li>${huruf[i]}: ${o.n.join(" + ")}</li>`)).join("")}</ul>
<p>Uji anti-tebak: gabungan nilai terbanyak per ciri ≠ kunci (${bestV} dari 5 ciri, nilai kunci bukan yang terbanyak); posisi dan kapal masing-masing menggugurkan paling banyak 1 pengecoh; ciri halus paling banyak 3.</p></div>
</div></main></body></html>`;
fs.writeFileSync(path.join(D, "prototipe.html"), html);
console.log("OK kunci", huruf[KEY], "| ciri bukan-terbanyak:", bestV);
opsi.forEach((o, i) => console.log(huruf[i], sig(o.x), o.n.join(" + ")));
