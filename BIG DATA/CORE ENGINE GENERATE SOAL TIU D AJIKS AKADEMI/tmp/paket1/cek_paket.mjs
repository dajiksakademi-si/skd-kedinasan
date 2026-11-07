// Pemeriksa Paket 1 TIU: kartu/soal 31–56 + figural 57–65.
// node cek_paket.mjs  → keluar 1 kalau ada galat.
import { readFileSync } from "node:fs";
const kartu = JSON.parse(readFileSync(new URL("kartu_p1.json", import.meta.url)));
const fig = JSON.parse(readFileSync(new URL("../../k12-spatial-engine/.test-out-paket/paket-1/items.json", import.meta.url)));
const galat = [];
const butir = [...kartu, ...fig.map((f, i) => ({ no: 57 + i, keluarga: "FIG", kunci: f.kunci, kerangka: f.id }))];

if (butir.length !== 35) galat.push(`jumlah ${butir.length}, harus 35`);
butir.forEach((b, i) => { if (b.no !== 31 + i) galat.push(`nomor ${b.no} di posisi ${31 + i}`); });

const hitung = {};
for (const b of butir) hitung[b.kunci] = (hitung[b.kunci] || 0) + 1;
for (const h of "ABCDE") if (hitung[h] !== 7) galat.push(`kunci ${h} = ${hitung[h] || 0}, harus 7`);

for (let i = 2; i < butir.length; i++)
  if (butir[i].kunci === butir[i - 1].kunci && butir[i].kunci === butir[i - 2].kunci)
    galat.push(`kunci ${butir[i].kunci} 3x berturut di ${butir[i - 2].no}-${butir[i].no}`);

const kerangka = new Set();
for (const b of kartu) { if (kerangka.has(b.kerangka)) galat.push(`kerangka kembar di ${b.no}`); kerangka.add(b.kerangka); }

const blueprint = { ARG: 2, SIL: 2, ANL: 2, HIT: 1, SUK: 1, KOTAK: 2, PAS: 3, CRT: 2, KCK: 7, ANA: 3, OPT: 1, FIG: 9 };
const jml = {};
for (const b of butir) jml[b.keluarga] = (jml[b.keluarga] || 0) + 1;
for (const [k, n] of Object.entries(blueprint)) if (jml[k] !== n) galat.push(`${k} = ${jml[k] || 0}, harus ${n}`);

const kck = kartu.filter(b => b.keluarga === "KCK").map(b => b.kunci);
if (!kck.includes("D") || !kck.includes("E")) galat.push("KCK wajib punya kunci D dan E");

// Pola kotak tidak boleh sama dengan nama pola yang sudah terpakai (bank CAT 30 + deret tabel 15 + Paket 41 no. 40).
const terpakai = readFileSync(new URL("pola_terpakai.txt", import.meta.url), "utf8").toLowerCase().split("\n").map(s => s.trim()).filter(Boolean);
for (const b of kartu.filter(b => b.pola)) if (terpakai.includes(b.pola.toLowerCase())) galat.push(`pola ${b.no} sudah terpakai`);

console.log("kunci", Object.entries(hitung).sort().map(([h, n]) => h + n).join(" "));
console.log("urut ", butir.map(b => b.kunci).join(""));
const lv = {}; for (const b of kartu) lv[b.level] = (lv[b.level] || 0) + 1;
console.log("level", JSON.stringify(lv));
if (galat.length) { console.log("GALAT:\n- " + galat.join("\n- ")); process.exit(1); }
console.log("cek paket OK");
