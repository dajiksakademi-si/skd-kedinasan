/**
 * TIU SKD (D'Ajiks) — CLI soal gambar. Sama dengan generate.ts, tetapi opsi A–E dan pembahasan gaya guru TIU.
 *
 *   npx tsx src/tiu-generate.ts <out-dir>          items.json + img/*.svg + preview.html
 *   npx tsx src/tiu-generate.ts <out-dir> siluet   hanya contoh gaya siluet (halaman tinjauan)
 *   npx tsx src/tiu-generate.ts <out-dir> paket    3 paket figural (tiu-paket.ts): <out>/paket-N/ + daftar-bentuk.json
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { KEYS } from "./figural-lib";
import { type Draft, optSvg } from "./k12-spasial-core";
import { cekPaket, cekSekilas, siluet } from "./tiu-bentuk";
import { JENIS } from "./tiu-jenis";
import { PAKET, buatPaket, cekLintas } from "./tiu-paket";

const out = process.argv[2], mode = process.argv[3];
if (!out) { console.error("pakai: npx tsx src/tiu-generate.ts <out-dir> [siluet|paket]"); process.exit(1); }
const LARANG = ["Mari kita", "Dengan demikian", "Penting untuk dicatat", "Secara keseluruhan", "akan tetapi", "pengecoh", "distraktor", "stem"];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hit = (drafts: Draft[], k: (d: Draft) => string) => drafts.reduce<Record<string, number>>((m, d) => ((m[k(d)] = (m[k(d)] ?? 0) + 1), m), {});

/** Tulis satu set soal. `paket` = satu paket siluet: uji sekilas per soal + pemeriksa paket + lembar banding. */
function tulis(dir: string, drafts: Draft[], id: (i: number) => string, paket: boolean, judul = "Pratinjau TIU gambar") {
  mkdirSync(join(dir, "img"), { recursive: true });
  const items = drafts.map((d, i) => {
    LARANG.forEach((w) => assert.ok(!d.pembahasan.toLowerCase().includes(w.toLowerCase()), `${id(i)}: pembahasan memuat "${w}"`));
    assert.ok(d.pembahasan.includes(`Jawaban: Opsi ${d.key}.`), `${id(i)}: pembahasan tidak menyebut kunci`);
    assert.equal(d.pembahasan.match(/Opsi [A-E] gugur/g)?.length, 4, `${id(i)}: harus ada 4 alasan opsi gugur`);
    const f: Record<string, string> = { ...(d.stemSvg ? { [`img/${id(i)}.svg`]: d.stemSvg } : {}), [`img/${id(i)}-pembahasan.svg`]: d.pbhSvg, ...Object.fromEntries(d.opts.map((o, j) => [`img/${id(i)}-${KEYS[j]}.svg`, optSvg(o)])) };
    for (const [p, c] of Object.entries(f)) writeFileSync(join(dir, p), d.siluet ? siluet(c) : c);
    return { id: id(i), sub_type: d.sub_type, tier: d.tier, instruksi: d.instruksi, stem: d.stem, gambar: d.stemSvg ? `img/${id(i)}.svg` : null,
      opsi_gambar: Object.fromEntries(KEYS.map((k) => [k, `img/${id(i)}-${k}.svg`])), kunci: d.key, pembahasan: d.pembahasan, gambar_pembahasan: `img/${id(i)}-pembahasan.svg` };
  });
  writeFileSync(join(dir, "items.json"), JSON.stringify(items, null, 2) + "\n");
  if (paket) {
    drafts.forEach((d, i) => cekSekilas(d.opts, d.key, id(i)));
    cekPaket(drafts.map((d, i) => ({ id: `${id(i)} ${d.sub_type}`, ...d.ciri! })));
    // Lembar banding: semua soal satu paket berdampingan (gambar kecil) untuk cek mata kemiripan antarsoal.
    writeFileSync(join(dir, "banding.html"), `<!doctype html><meta charset="utf-8"><title>Lembar banding</title><style>body{font:12px Arial;margin:12px}.r{display:flex;gap:6px;align-items:center;border-bottom:1px solid #ccc;padding:6px 0}.r b{width:150px}.s img{height:70px}.o img{width:70px}</style><h3>${judul}</h3>` +
      items.map((it) => `<div class="r"><b>${it.id}<br>${it.sub_type}<br>kunci ${it.kunci}</b>${it.gambar ? `<span class="s"><img src="${it.gambar}"></span>` : ""}<span class="o">${KEYS.map((k) => `<img src="${it.opsi_gambar[k]}">`).join("")}</span></div>`).join(""));
  }
  writeFileSync(join(dir, "preview.html"), `<!doctype html><meta charset="utf-8"><title>${judul}</title><style>body{font-family:Arial,sans-serif;max-width:900px;margin:16px auto;color:#111}.c{border:1px solid #ccc;border-radius:10px;padding:14px;margin-bottom:22px;page-break-inside:avoid}.m{font-size:13px;color:#666}.s img{max-width:100%}.o{display:flex;gap:10px;margin:10px 0}.o div{text-align:center;font-weight:bold}.o img{width:100px}.o .k img{outline:4px solid #1a7f37}.p{background:#f6f6f6;border-radius:8px;padding:10px;font-size:14px;line-height:1.5}.p img{max-width:100%;background:#fff}</style>` +
    items.map((it) => `<div class="c"><div class="m">${it.id} · ${it.sub_type} · tier ${it.tier} · kunci ${it.kunci}</div><p>${esc(it.instruksi)}<br><b>${esc(it.stem)}</b></p>${it.gambar ? `<div class="s"><img src="${it.gambar}"></div>` : ""}<div class="o">${KEYS.map((k) => `<div class="${k === it.kunci ? "k" : ""}"><img src="${it.opsi_gambar[k]}"><br>${k}</div>`).join("")}</div><div class="p">${esc(it.pembahasan).replace(/\n/g, "<br>")}<br><img src="${it.gambar_pembahasan}"></div></div>`).join(""));
  console.log(`${items.length} butir -> ${dir}/items.json · kunci ${JSON.stringify(hit(drafts, (d) => d.key))}`);
}

if (mode === "paket") {
  const hasil = Object.fromEntries(Object.keys(PAKET).map((p) => [p, buatPaket(p)]));
  Object.entries(hasil).forEach(([p, drafts]) => {
    const n = p.split(" ")[1];
    tulis(join(out, `paket-${n}`), drafts, (i) => `TIU-P${n}-${57 + i}`, true, `${p} figural TIU (no. 57–65)`);
  });
  writeFileSync(join(out, "daftar-bentuk.json"), JSON.stringify(cekLintas(hasil), null, 2) + "\n");
  console.log(`daftar lintas paket -> ${out}/daftar-bentuk.json · kunci total ${JSON.stringify(hit(Object.values(hasil).flat(), (d) => d.key))}`);
} else {
  const drafts: Draft[] = Object.values(JENIS).flatMap((j) => j.contoh.map((c) => j.buat(c as never))).filter((d) => mode !== "siluet" || d.siluet);
  tulis(out, drafts, (i) => `TIU-FIG-${String(i + 1).padStart(3, "0")}`, mode === "siluet");
  console.log(`sub_type ${JSON.stringify(hit(drafts, (d) => d.sub_type))}`);
}
