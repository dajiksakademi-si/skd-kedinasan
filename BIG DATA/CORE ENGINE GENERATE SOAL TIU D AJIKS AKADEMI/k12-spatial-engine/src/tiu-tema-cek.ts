/**
 * Pemeriksa raster aset bertema: tiap aset objek besar harus beda ≥ BEDA_MIN di 8 transformasi (putar 0/90/180/270 × cermin),
 * supaya pengecoh putar/cermin tidak kembar rupa dengan kunci. Aset [kecil] (nama di KECIL) dilewati.
 *   npx tsx src/tiu-tema-cek.ts [tema...]            cek aset
 *   npx tsx src/tiu-tema-cek.ts --foto <file.html>   tangkapan layar komputer + HP di sebelah file
 * puppeteer dari package.json root proyek (npm install sekali di root).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import puppeteer from "puppeteer";

const DIR = join(__dirname, "..", "aset-tema");
const BEDA_MIN = 0.3;
const LEWATI = new Set(["ubin", "tukang", "mozaik", "gerabah"]); // motif simetris putar yang memang tidak diuji putar/cermin
const KECIL = new Set(["bijikopi", "wortel", "cabai", "apel", "pisang", "manggis", "tetes", "tetes-garis", "kupu", "kumbang", "daun", "matahari", "pohon", "sumur", "ayam", "buahpinus", "bulu", "kacang", "jagung", "kenari", "kerikil", "kerikil-garis", "ikanmas", "teratai", "capung", "batu", "semak", "rumput"]);

async function main() {
  const arg = process.argv.slice(2);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (arg[0] === "--foto") {
    const f = resolve(arg[1]);
    for (const [w, n] of [[1100, "desk"], [390, "hp"]] as const) {
      // ponytail: halaman > 8192 px css pada skala 2 melilit (batas tekstur Chrome), jadi seluruh halaman skala 1 + tiap soal skala 2.
      await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      await page.goto(`file://${f}`);
      await page.screenshot({ path: f.replace(/\.html$/, `-${n}.png`) as `${string}.png`, fullPage: true });
      await page.setViewport({ width: w, height: 900, deviceScaleFactor: 2 });
      await page.goto(`file://${f}`);
      for (const [i, c] of (await page.$$(".c")).entries()) await c.screenshot({ path: f.replace(/\.html$/, `-soal${i + 1}-${n}.png`) as `${string}.png` });
    }
    console.log("foto ->", f.replace(/\.html$/, "-{desk,hp}.png"));
  } else {
    const tema = arg.length ? arg : readdirSync(DIR).filter((d) => !d.includes(".") && !LEWATI.has(d));
    await page.evaluate("window.__name = (f) => f"); // tsx menyisipkan __name ke fungsi yang dikirim ke halaman
    let gagal = 0;
    for (const t of tema) for (const file of readdirSync(join(DIR, t)).filter((f) => f.endsWith(".svg"))) {
      const nama = file.slice(0, -4);
      if (KECIL.has(nama)) continue;
      const svg = readFileSync(join(DIR, t, file), "utf8");
      const b = await page.evaluate(async (src: string) => {
        const img = new Image(); img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(src))); await img.decode();
        const N = 64, set = (r: number, m: boolean) => {
          const c = document.createElement("canvas"); c.width = c.height = N; const g = c.getContext("2d")!;
          g.fillStyle = "#fff"; g.fillRect(0, 0, N, N); g.translate(N / 2, N / 2); g.rotate((r * Math.PI) / 180); if (m) g.scale(-1, 1); g.drawImage(img, -N / 2, -N / 2, N, N);
          const d = g.getImageData(0, 0, N, N).data, s = new Set<number>();
          for (let i = 0; i < N * N; i++) if (d[i * 4] < 128) s.add(i);
          return s;
        };
        const P = [0, 90, 180, 270].flatMap((r) => [set(r, false), set(r, true)]);
        const beda = (A: Set<number>, B: Set<number>) => { let x = 0; A.forEach((p) => B.has(p) || x++); B.forEach((p) => A.has(p) || x++); return x / new Set([...A, ...B]).size; };
        return Math.min(...P.flatMap((A, i) => P.slice(i + 1).map((B) => beda(A, B))));
      }, svg);
      const ok = b >= BEDA_MIN; if (!ok) gagal++;
      console.log(`${ok ? "OK   " : "GAGAL"} ${t}/${nama} beda putar/cermin ${b.toFixed(2)}`);
    }
    if (gagal) process.exitCode = 1;
  }
  await browser.close();
}
main();
