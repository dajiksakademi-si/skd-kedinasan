// Self-check keluaran generate.ts: npx tsx src/check.ts <out-dir>
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
assert.ok(out, "pakai: npx tsx src/check.ts <out-dir>");
const items = JSON.parse(readFileSync(join(out, "items.json"), "utf8"));
assert.ok(items.length > 0, "items.json kosong");
assert.equal(new Set(items.map((it: { id: string }) => it.id)).size, items.length, "id kembar");
const svgOk = (p: string) => { assert.ok(existsSync(join(out, p)), `hilang: ${p}`); assert.match(readFileSync(join(out, p), "utf8"), /^<svg [^>]*viewBox="0 0 [\d.]+ [\d.]+"[\s\S]*<\/svg>$/, `SVG rusak: ${p}`); };
for (const it of items) {
  [it.gambar, it.gambar_pembahasan, ...Object.values<string>(it.opsi_gambar)].forEach(svgOk);
  const opts = Object.values<string>(it.opsi_gambar).map((p) => readFileSync(join(out, p), "utf8"));
  assert.equal(new Set(opts).size, 5, `${it.id}: opsi kembar`);
  assert.match(it.kunci, /^[a-e]$/, `${it.id}: kunci`);
  assert.ok(it.pembahasan.includes(`Jawaban: Opsi ${it.kunci.toUpperCase()}.`), `${it.id}: pembahasan tidak menyebut kunci`);
  assert.equal(it.pembahasan.split("<br>").length, 2, `${it.id}: pembahasan harus 2 paragraf`);
}
console.log(`OK: ${items.length} butir valid`);
