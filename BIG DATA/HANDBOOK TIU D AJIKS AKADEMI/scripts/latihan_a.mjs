// Handbook TIU · T2-7(2) · cetak ulang 14 soal Latihan A Bab 19 dari kartu soal di bab asalnya (satu sumber), pilihan salah berkode disorot.
// Blok <!--LA:mulai-->…<!--LA:selesai--> di src/29_bab19.html ditulis ulang setiap build.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const baca = (f) => readFileSync(join(AKAR, f), "utf8");
const data = Object.fromEntries(["verbal_b03_05", "numerik_b06_10", "kck_b11_13"].flatMap((f) => JSON.parse(baca(`scripts/data/${f}.json`)).butir.map((x) => [x.id, x])));
for (const x of JSON.parse(baca("aset/figural/items.json"))) data[x.id] = x;
const berkas = Object.fromEntries(readdirSync(join(AKAR, "src")).filter((f) => /^\d+_bab\d+\.html$/.test(f)).map((f) => [+f.match(/bab(\d+)/)[1], `src/${f}`]));

const F = berkas[19];
let b19 = baca(F);
const baris = [...b19.matchAll(/<tr data-rujuk="HB-TIU-([^"]+)" data-k="K\d" data-kode="([^"]+)" data-ref="(\d+):\d+"><td>(\d+)<\/td><td>Bab \d+ · [^,]+, ((?:Latihan|Contoh) \d+)/g)];
assert.equal(baris.length, 14, "14 rujukan Latihan A");

const pilih = (b, kode) => {
  const k = Object.entries(b.kode), tepat = k.filter(([, v]) => v === kode), gabung = k.filter(([, v]) => v.split("+").includes(kode));
  const [h] = (tepat.length ? tepat : gabung)[0] ?? [];
  assert.ok(h, `${b.id}: tidak ada pilihan berkode ${kode}`);
  assert.notEqual(h, b.kunci, `${b.id}: pilihan disorot = kunci`);
  return h;
};
const kartu = ([, id, kode, bab, no, label]) => {
  const b = data[`HB-TIU-${id}`], h = pilih(b, kode), src = baca(berkas[+bab]);
  const m = src.match(new RegExp(`<div data-soal="HB-TIU-${id}"[^>]*>\\s*<div class="soal">([\\s\\S]*?)\\n  </div>\\n`));
  assert.ok(m, `${id}: kartu soal tidak ditemukan`);
  const isi = m[1].replace(/\s*<div class="meta">[\s\S]*?<\/div>/, "").replace(/<\/?mark>/g, "");
  const sorot = isi.replace(new RegExp(`<(li|div)><span class="h">${h}</span>`), `<$1 class="sorot"><span class="h">${h}</span>`);
  assert.notEqual(sorot, isi, `${id}: pilihan ${h} tidak ditemukan di kartu`);
  assert.ok(!/ id="|class="ke"|class="guru"/.test(sorot), `${id}: sisa tautan atau catatan pengajar`);
  return `<div class="latA-soal"><div class="soal">\n    <div class="meta"><span>Soal ${no}</span><span class="waktu">Bab ${bab} · ${label}</span></div>${sorot}\n  </div></div>`;
};
const blok = `<!--LA:mulai-->\n${baris.map(kartu).join("\n")}\n<!--LA:selesai-->`;
const baru = b19.replace(/<!--LA:mulai-->[\s\S]*?<!--LA:selesai-->/, () => blok);
assert.notEqual(baru.indexOf("<!--LA:mulai-->"), -1, "penanda LA tidak ada di Bab 19");
if (baru !== b19) writeFileSync(join(AKAR, F), baru);
console.log(`latihan_a: 14 soal dicetak ulang · ${baris.map(([, id, kode]) => `${id} ${pilih(data[`HB-TIU-${id}`], kode)}`).join(" · ")}`);
