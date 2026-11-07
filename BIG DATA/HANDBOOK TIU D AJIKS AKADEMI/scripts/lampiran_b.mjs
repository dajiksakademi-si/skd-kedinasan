// Handbook TIU · Tahap 6 · alat bersama soal_verbal / soal_numerik / soal_kck untuk pembahasan Latihan di Lampiran B.
//   namaTabel(html)  → nama kekeliruan di tabel "Kekeliruan …" bab (pembahasan latihan wajib memakai nama ini, T6)
//   judulBab(html)   → judul <h2> bab, dipakai sebagai judul kelompok di Lampiran B
//   lampiranB(...)   → isi blok <!--LB-x:mulai-->…<!--LB-x:selesai--> di src/90_lampiran_siswa.html; true bila src sudah sama
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const kutip = (s) => String(s).replace(/[“”]/g, '"');
export function namaTabel(html) {
  const i = html.indexOf("<h3>Kekeliruan"), seg = html.slice(i, html.indexOf("</table>", i));
  if (i < 0) throw new Error("tabel kekeliruan tidak ditemukan");
  return new Set([...seg.matchAll(/<tr><td>\d+<\/td><td><b>([^<]+)<\/b>/g)].map((m) => kutip(m[1])));
}
export const judulBab = (html) => html.match(/<h2>([^<]+)<\/h2>/)[1];
// tautan dua arah (pola a.ke T5-18): label kartu di bab ⇄ pembahasan di Lampiran B
export const keBahas = (label, t) => `<span id="soal-${t}">${label}<a class="ke" href="#bahas-${t}">Lihat pembahasan</a></span>`;
export const potongan = (t, kartu, bahas) => `<div class="bahas-latihan" id="bahas-${t}">\n${kartu}${bahas}\n  <p class="balik"><a class="ke" href="#soal-${t}">Kembali ke soal</a></p>\n</div>`;
export function lampiranB(akar, kelompok, perBab, tulis) {
  const f = join(akar, "src/90_lampiran_siswa.html"), html = readFileSync(f, "utf8");
  const blok = `<!--LB-${kelompok}:mulai-->\n${perBab.map(([judul, isi]) => `  <h4 class="sub">${judul}</h4>\n${isi.join("\n")}`).join("\n")}\n<!--LB-${kelompok}:selesai-->`;
  const re = new RegExp(`<!--LB-${kelompok}:mulai-->[\\s\\S]*?<!--LB-${kelompok}:selesai-->`);
  if (!re.test(html)) throw new Error(`penanda LB-${kelompok} tidak ada di src/90_lampiran_siswa.html`);
  const sama = html.match(re)[0] === blok;
  if (tulis && !sama) writeFileSync(f, html.replace(re, () => blok));
  return sama;
}
