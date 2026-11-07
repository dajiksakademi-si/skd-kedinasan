// Mockup browser soal gambar TIU: pilih jenis, ubah spesifikasi JSON, lihat soal + opsi + pembahasan.
// Pembuat soal yang sama dengan CLI, jadi semua aturan dasar (bentuk kiral, aturan tunggal, opsi tidak kembar,
// pengecoh bernama) tetap ditegakkan; pelanggaran muncul sebagai pesan, bukan soal rusak.
import { KEYS, cellS } from "./figural-lib";
import { optSvg, svg } from "./k12-spasial-core";
import { BENTUK, GAYA, T_ALL, T_NAME, muat, siluet, varian } from "./tiu-bentuk";
import { arsir, balikWarna } from "./tiu-gaya";
import { JENIS } from "./tiu-jenis";

const $ = <E extends HTMLElement>(id: string) => document.getElementById(id) as E;
const jenis = $<HTMLSelectElement>("jenis"), contoh = $<HTMLSelectElement>("contoh"), spec = $<HTMLTextAreaElement>("spec");
const hasil = $("hasil"), galat = $("galat"), tampilKunci = $<HTMLInputElement>("kunci");

for (const [k, j] of Object.entries(JENIS)) jenis.add(new Option(`${j.nama} (${j.asal})`, k));
function isiContoh() {
  contoh.innerHTML = "";
  JENIS[jenis.value].contoh.forEach((_, i) => contoh.add(new Option(`Contoh ${i + 1}`, String(i))));
  muatContoh();
}
function muatContoh() { spec.value = JSON.stringify(JENIS[jenis.value].contoh[+contoh.value], null, 2); buat(); }
function buat() {
  galat.textContent = ""; hasil.innerHTML = "";
  let d;
  try { d = JENIS[jenis.value].buat(JSON.parse(spec.value) as never); }
  catch (e) { galat.textContent = `Soal ditolak: ${(e as Error).message}`; return; }
  const g = (x: string) => (d.siluet ? siluet(x) : x);
  const opsi = d.opts.map((f, i) => `<figure class="${tampilKunci.checked && KEYS[i] === d.key ? "k" : ""}">${g(optSvg(f))}<figcaption>${KEYS[i]}</figcaption></figure>`).join("");
  hasil.innerHTML = `<p class="ins">${d.instruksi}<br><b>${d.stem}</b></p>${d.stemSvg ? `<div class="stem">${g(d.stemSvg)}</div>` : ""}<div class="opsi">${opsi}</div>` +
    (tampilKunci.checked ? `<details open><summary>Pembahasan</summary><pre>${d.pembahasan.replace(/</g, "&lt;")}</pre><div class="stem">${g(d.pbhSvg)}</div></details>` : "");
}
jenis.onchange = isiContoh; contoh.onchange = muatContoh; tampilKunci.onchange = buat;
$("buat").onclick = buat;
spec.onkeydown = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") buat(); };

// Galeri bentuk: nama yang bisa dipakai di spesifikasi, per gaya, beserta versi garis dan arsirnya.
$("galeri").innerHTML = Object.entries(GAYA).map(([g, m]) => `<h3>${g}</h3><div class="gal">${Object.entries(m).map(([n, f]) =>
  `<figure>${svg(300, 100, cellS(f, 50, 50, 92) + cellS(balikWarna(f), 150, 50, 92) + cellS(arsir(f), 250, 50, 92))}<figcaption>${n}</figcaption></figure>`).join("")}</div>`).join("") +
  // Keluarga berparameter (2026-10-29): contoh varian lolos uji; nama bisa langsung dipakai di spesifikasi.
  `<h3>Keluarga berparameter (nama: keluarga+jumlah-varian, akhiran u = guratan putih)</h3>` +
  ([["tunas", 5, true], ["sabit", 4, true], ["pita", 4, true], ["rantai", 5, false], ["ikalkembar", 0, true], ["molekul", 4, false]] as [string, number, boolean][]).map(([k, n, u]) =>
    `<div class="gal">${varian(k, n, 6, 1, u).map((nm) => `<figure>${siluet(svg(100, 100, cellS(muat(BENTUK[nm], [0, 0], 84), 50, 50, 92)))}<figcaption>${nm}</figcaption></figure>`).join("")}</div>`).join("") +
  `<h3>Perubahan</h3><ul>${T_ALL.map((t) => `<li><code>${t}</code> ${T_NAME[t]}</li>`).join("")}<li><code>…+warna</code> ditambah balik warna, contoh <code>mab+warna</code></li></ul>`;
isiContoh();
