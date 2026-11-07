import { writeFileSync } from "node:fs";
import { cellS } from "./figural-lib";
import { svg } from "./k12-spasial-core";
import { molekulAcak } from "./tiu-pola";
import { BENTUK, GAYA, muat, siluet } from "./tiu-bentuk";
const c: [string, any][] = [
  ...[22, 14, 34, 52, 5, 31].map((s): [string, any] => [`m3-${s}`, molekulAcak(3, s)]),
  ...[30, 59, 21, 37, 9, 29].map((s): [string, any] => [`m4-${s}`, molekulAcak(4, s)]),
  ...[9, 34, 39, 56, 6, 31].map((s): [string, any] => [`m5-${s}`, molekulAcak(5, s)]),
  ...Object.entries({ ...GAYA.benda, ...GAYA.pola }).filter(([n]) => !["ikan","kail","palu","payung","kunci","layang","gasing","burung","kucing","kupu","kura","cumi","teko","gunting","kendi","kipas","terompet"].includes(n)),
];
writeFileSync(process.argv[2], `<body style="margin:0;display:flex;flex-wrap:wrap;width:1200px;font:12px Arial">` + c.map(([n, f]) => `<div style="text-align:center">${siluet(svg(110, 110, cellS(muat(f, [0, 0], 84), 55, 55, 100)))}<br>${n}</div>`).join("") + "</body>");
