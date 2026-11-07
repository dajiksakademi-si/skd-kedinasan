// Pemeriksa pembahasan Paket 1 TIU no. 31–56 + lembar baca tinjau_pembahasan_p1.md.
import fs from "node:fs";
import assert from "node:assert/strict";

const baca = (f) => JSON.parse(fs.readFileSync(new URL(f, import.meta.url)));
const paket = baca("./paket_tiu_1.json");
const bahas = [...baca("./bahas_verbal.json"), ...baca("./bahas_numerik.json"), ...baca("./bahas_logika.json")];
const HURUF = ["A", "B", "C", "D", "E"];
const MEDAN = ["ditanya", "kalimat_kunci", "cara_kilat", "langkah", "opsi_gugur", "alasan_kunci", "analogi", "waspada"];
// Frasa khas AI, istilah dapur, dan kode yang tidak boleh sampai ke siswa.
const TERLARANG = [/mari kita/i, /dengan demikian/i, /penting untuk dicatat/i, /secara keseluruhan/i, /akan tetapi/i,
  /jebakan/i, /\bstem\b/i, /distraktor/i, /pengecoh/i, /konstruk/i, /\bkutub\b/i, /\bHOTS\b/, /satu-satunya/i,
  /sekaligus/i, /\bJF?-[A-Z]/, /\p{Extended_Pictographic}/u];
const ANGKA = new Set(["HIT", "SUK", "KOTAK", "CRT", "OPT"]);

const galat = [], catatan = [];
assert.deepEqual(bahas.map((b) => b.no), paket.map((s) => s.no), "nomor pembahasan tidak sama dengan paket");
for (const b of bahas) {
  const s = paket.find((x) => x.no === b.no);
  for (const m of MEDAN) if (!b[m] || (typeof b[m] === "string" && !b[m].trim())) galat.push(`${b.no}: ${m} kosong`);
  const gugur = Object.keys(b.opsi_gugur).sort().join("");
  const harus = HURUF.filter((h) => h !== s.kunci).join("");
  if (gugur !== harus) galat.push(`${b.no}: opsi gugur ${gugur}, seharusnya ${harus}`);
  if (!b.alasan_kunci.startsWith(`${s.kunci},`)) galat.push(`${b.no}: alasan kunci tidak diawali huruf ${s.kunci}`);
  const teks = [b.ditanya, b.cara_kilat, b.langkah, ...Object.values(b.opsi_gugur), b.alasan_kunci, b.analogi, b.waspada].join(" ");
  for (const r of TERLARANG) if (r.test(teks)) galat.push(`${b.no}: memuat ${r}`);
  const maka = (teks.match(/\bmaka\b|karena itu/gi) || []).length;
  if (maka > 1) galat.push(`${b.no}: maka/karena itu ${maka}×`);
  if (ANGKA.has(s.keluarga))
    for (const t of String(s.opsi[s.kunci]).match(/−?\d[\d.,]*/g) || [])
      if (!b.alasan_kunci.includes(t)) galat.push(`${b.no}: angka kunci ${t} tidak disebut di alasan`);
  const sumber = [s.soal, s.perintah, ...(s.pernyataan || []), ...(s.syarat || [])].join(" ");
  if (!sumber.includes(b.kalimat_kunci)) catatan.push(`${b.no}: kalimat kunci berupa uraian, bukan kutipan`);
}

// Lembar baca: preview soal + opsi dari paket (satu sumber), lalu tujuh bagian pembahasan.
const tabel = (t) => [t[0], t[0].map(() => "---"), ...t.slice(1)].map((r) => `| ${r.join(" | ")} |`).join("\n");
const md = ["# Pembahasan Paket 1 TIU — no. 31–56 (draf, 2026-10-30)", ""];
for (const b of bahas) {
  const s = paket.find((x) => x.no === b.no);
  md.push(`## ${s.no}.`, "", s.soal, "");
  if (s.tabel) md.push(tabel(s.tabel), "");
  if (s.pernyataan) md.push(...s.pernyataan.map((p, i) => `(${i + 1}) ${p}  `), "");
  if (s.syarat) md.push(...s.syarat.map((p, i) => `${i + 1}. ${p}`), "");
  if (s.perintah) md.push(s.perintah, "");
  md.push(...HURUF.map((h) => `- ${h}. ${s.opsi[h]}`), "");
  md.push(`**Yang sebenarnya ditanya.** ${b.ditanya}`, "", `**Kalimat kunci.** ${b.kalimat_kunci}`, "",
    `**Cara cepat.** ${b.cara_kilat}`, "", `**Langkah lengkap.** ${b.langkah}`, "", "**Kenapa opsi lain gugur.**", "",
    ...Object.entries(b.opsi_gugur).map(([h, t]) => `- Opsi ${h}: ${t}`), "",
    `**Jawaban: ${s.kunci}.** ${b.alasan_kunci.slice(3)}`, "", `**Analogi.** ${b.analogi}`, "",
    `**Yang sering membuat keliru.** ${b.waspada}`, "");
}
fs.writeFileSync(new URL("./tinjau_pembahasan_p1.md", import.meta.url), md.join("\n"));

catatan.forEach((c) => console.log("catatan", c));
if (galat.length) { galat.forEach((g) => console.log("GALAT", g)); process.exit(1); }
console.log(`cek pembahasan OK: ${bahas.length} soal, lembar ${md.length} baris`);
