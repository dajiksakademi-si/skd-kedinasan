import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { cellS } from "./figural-lib";
import { svg } from "./k12-spasial-core";
import { GAYA, balikWarna, arsir } from "./tiu-gaya";
import { bedaMin, kiral } from "./tiu-bentuk";
import { ASET } from "./tiu-aset";

const lama = new Set(Object.values(GAYA).flatMap((g) => Object.keys(g)));
const errors: string[] = [], rows: string[] = [];
for (const [tema, bentuk] of Object.entries(ASET)) {
  const cards = Object.entries(bentuk).map(([nama, fig]) => {
    const beda = bedaMin(fig);
    console.log(`${tema.padEnd(10)} ${nama.padEnd(16)} ${beda.toFixed(4)}`);
    if (lama.has(nama)) errors.push(`${nama}: nama sudah ada`);
    if (!kiral(fig)) errors.push(`${nama}: tidak kiral`);
    if (beda < 0.35) errors.push(`${nama}: bedaMin ${beda.toFixed(4)} < 0.35`);
    const gambar = [fig, balikWarna(fig), arsir(fig)].map((f) => svg(120, 120, cellS(f, 60, 60, 116))).join("");
    return `<article><div class="gambar">${gambar}</div><b>${nama}</b><small>hitam · garis · arsir</small></article>`;
  });
  rows.push(`<section><h2>${tema}</h2><div class="baris">${cards.join("")}</div></section>`);
}
mkdirSync(".test-out-aset", { recursive: true });
writeFileSync(".test-out-aset/aset.html", `<!doctype html><html lang="id"><meta charset="utf-8"><title>Aset figural</title><style>body{font:16px Arial;margin:24px;background:white}h2{text-transform:capitalize;margin:20px 0 10px}.baris{display:flex;flex-wrap:wrap;gap:16px}article{text-align:center}.gambar{display:flex;gap:2px}small{display:block;color:#555;margin-top:3px}svg{width:120px;height:120px}</style><body><h1>Aset figural</h1>${rows.join("")}</body></html>`);
assert.equal(errors.length, 0, errors.join("\n"));
