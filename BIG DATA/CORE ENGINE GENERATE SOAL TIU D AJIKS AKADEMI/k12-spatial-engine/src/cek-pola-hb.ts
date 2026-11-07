import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { type Fig, draw } from "./figural-lib";
import { bedaMin, kiral, muat, siluet } from "./tiu-bentuk";
import { bulu, cakar, sulur, tanduk } from "./tiu-pola-hb";

const families: [string, (n: number, seed: number) => Fig, number][] = [
  ["cakar", cakar, 6], ["sulur", sulur, 7], ["tanduk", tanduk, 7], ["bulu", bulu, 7],
];
let body = "", gagal = false;
console.log("keluarga n  lolos/40  seed pertama  bedaMin");
families.forEach(([name, make, max], row) => {
  for (let n = 3; n <= max; n++) {
    const passing: { seed: number; fig: Fig; beda: number }[] = [];
    for (let seed = 900; seed <= 939; seed++) {
      const raw = make(n, seed), fig = muat(raw, [0, 0], 80);
      assert.deepEqual(raw, make(n, seed), `${name} ${n}-${seed}: tidak deterministik`);
      assert.ok(raw.every((p) => p.k === "poly" && (p.fill === "b" || p.fill === "u") && p.pts.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))), `${name}: primitif tidak sah`);
      const chiral = kiral(fig), beda = bedaMin(fig);
      if (chiral && beda >= 0.35) passing.push({ seed, fig, beda });
    }
    const first = passing[0];
    console.log(`${name.padEnd(8)} ${n}  ${String(passing.length).padStart(2)}/40     ${first?.seed ?? "—"}          ${first?.beda.toFixed(3) ?? "—"}`);
    if (passing.length < 5) gagal = true;
    const x = (n - 3) * 120, y = row * 120;
    body += `<rect x="${x}" y="${y}" width="120" height="120" fill="white" stroke="#ddd"/>`;
    if (first) body += siluet(draw(first.fig, x + 60, y + 49));
    body += `<text x="${x + 60}" y="${y + 111}" text-anchor="middle" font-family="Arial, sans-serif" font-size="11">${name} ${n}-${first?.seed ?? "GAGAL"}</text>`;
  }
});
mkdirSync(".hb-pola", { recursive: true });
writeFileSync(".hb-pola/lembar.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="480" viewBox="0 0 600 480"><rect width="600" height="480" fill="white"/>${body}</svg>\n`);
assert.ok(!gagal, "Setiap keluarga/n harus punya sedikitnya 5 seed lolos dari 40");
console.log("Contact sheet: .hb-pola/lembar.svg (cek hitungan/celah dengan mata)");
