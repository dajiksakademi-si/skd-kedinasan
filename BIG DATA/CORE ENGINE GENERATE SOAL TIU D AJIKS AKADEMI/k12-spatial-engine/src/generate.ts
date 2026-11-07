/**
 * K12 Spatial Engine — CLI. Satu generator: soal, 5 opsi, pembahasan teks + gambar pembahasan.
 *
 *   npx tsx src/generate.ts <out-dir>                  items.json + img/*.svg + preview.html
 *   npx tsx src/generate.ts <out-dir> --blind          soal tanpa kunci (untuk pemeriksa buta)
 *   npx tsx src/generate.ts <out-dir> --prefix SPS     ganti awalan id (default K12-N)
 *
 * Keluaran deterministik: input spec sama ⇒ byte SVG sama.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Draft, optSvg, svg } from "./k12-spasial-core";
import { ANA_ITEMS } from "./k12-spasial-analogi";
import { MTX_ITEMS } from "./k12-spasial-mtx";
import { SERI_ITEMS } from "./k12-spasial-seri";
import { cellS, text } from "./figural-lib";

const L5 = ["a", "b", "c", "d", "e"] as const;
const args = process.argv.slice(2), argOf = (f: string) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined);
const out = args[0];
if (!out || out.startsWith("--")) { console.error("pakai: npx tsx src/generate.ts <out-dir> [--blind] [--prefix X]"); process.exit(1); }
const prefix = argOf("--prefix") ?? "K12-N";

const drafts: Draft[] = [...SERI_ITEMS, ...MTX_ITEMS, ...ANA_ITEMS];
const id = (i: number) => `${prefix}-${String(i + 1).padStart(3, "0")}`;
mkdirSync(join(out, "img"), { recursive: true });

if (args.includes("--blind")) {
  const list: string[] = [];
  drafts.forEach((d, i) => {
    // satu file per soal: soal di atas, opsi a–e di bawah (tanpa kunci, tanpa pembahasan)
    const stem = d.stemSvg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
    const [, w, h] = d.stemSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)!.map(Number);
    const W = Math.max(w, 600), ox = (W - w) / 2, top = h + 20;
    const opts = d.opts.map((f, j) => cellS(f, W / 2 + (j - 2) * 118, top + 55, 106) + text(W / 2 + (j - 2) * 118, top + 135, L5[j], 22)).join("");
    writeFileSync(join(out, "img", `${id(i)}.svg`), svg(W, top + 150, `<g transform="translate(${ox} 0)">${stem}</g>${opts}`));
    list.push(`${id(i)} | ${d.instruksi} ${d.stem}`);
  });
  writeFileSync(join(out, "DAFTAR.txt"), list.join("\n") + "\n");
  console.log(`${drafts.length} soal tanpa kunci -> ${out}`);
  process.exit(0);
}

const items = drafts.map((d, i) => {
  const files: Record<string, string> = {
    [`img/${id(i)}.svg`]: d.stemSvg,
    ...Object.fromEntries(d.opts.map((f, j) => [`img/${id(i)}-${L5[j]}.svg`, optSvg(f)])),
    [`img/${id(i)}-pembahasan.svg`]: d.pbhSvg,
  };
  for (const [p, c] of Object.entries(files)) writeFileSync(join(out, p), c);
  return {
    id: id(i), sub_type: d.sub_type, tier: d.tier, instruksi: d.instruksi, stem: d.stem,
    gambar: `img/${id(i)}.svg`,
    opsi_gambar: Object.fromEntries(L5.map((l) => [l, `img/${id(i)}-${l}.svg`])),
    kunci: d.key.toLowerCase(), pembahasan: d.pembahasan, gambar_pembahasan: `img/${id(i)}-pembahasan.svg`,
  };
});
writeFileSync(join(out, "items.json"), JSON.stringify(items, null, 2) + "\n");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
writeFileSync(join(out, "preview.html"), `<!doctype html><meta charset="utf-8"><title>Preview</title><style>body{font-family:Arial,sans-serif;max-width:880px;margin:16px auto;color:#111}.c{border:1px solid #ccc;border-radius:10px;padding:14px;margin-bottom:22px}.m{font-size:13px;color:#666}.s img{max-width:100%;height:auto}.o{display:flex;gap:10px;margin:10px 0}.o div{text-align:center;font-weight:bold}.o img{width:96px;height:96px}.o .k img{outline:4px solid #1a7f37}.p{background:#f6f6f6;border-radius:8px;padding:10px;font-size:14px;line-height:1.45}.p img{max-width:620px;width:100%;background:#fff}</style>` +
  items.map((it) => `<div class="c"><div class="m">${it.id} · ${it.sub_type} · tier ${it.tier} · kunci ${it.kunci}</div><p>${esc(it.instruksi)}<br><b>${esc(it.stem)}</b></p><div class="s"><img src="${it.gambar}"></div><div class="o">${L5.map((l) => `<div class="${l === it.kunci ? "k" : ""}"><img src="${it.opsi_gambar[l]}"><br>${l}</div>`).join("")}</div><div class="p">${it.pembahasan.split("<br>").map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("")}<img src="${it.gambar_pembahasan}"></div></div>`).join(""));

const count = (k: (d: Draft) => string) => drafts.reduce<Record<string, number>>((m, d) => ((m[k(d)] = (m[k(d)] ?? 0) + 1), m), {});
console.log(`${items.length} butir -> ${out}/items.json (+ img/, preview.html)`);
console.log(`kunci ${JSON.stringify(count((d) => d.key))} · tier ${JSON.stringify(count((d) => String(d.tier)))} · sub_type ${JSON.stringify(count((d) => d.sub_type))}`);
