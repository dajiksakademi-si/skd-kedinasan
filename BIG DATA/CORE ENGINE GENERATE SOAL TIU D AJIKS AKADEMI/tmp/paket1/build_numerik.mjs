// Blok numerik no. 37–45 Paket 1 TIU. Semua angka dihitung di sini; assert gagal kalau kunci tidak tunggal.
// node build_numerik.mjs → soal_numerik.json
import { writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const HURUF = "ABCDE";
const fmt = (x) => {
  const neg = x < 0, s = Math.abs(x).toString().split(".");
  const ribu = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (neg ? "−" : "") + ribu + (s[1] ? "," + s[1] : "");
};
const dekat = (a, b) => Math.abs(a - b) < 1e-9;
// opsi: [{nilai, teks, jebakan}], kunci di posisi yang diminta setelah diurutkan naik (atau urutan apa adanya)
function susun(opsi, kunciHuruf, urutNaik = true) {
  let o = [...opsi];
  if (urutNaik) o.sort((a, b) => a.nilai - b.nilai);
  else { const k = o.filter((x) => x.jebakan === null); o = o.filter((x) => x.jebakan !== null); o.splice(HURUF.indexOf(kunciHuruf), 0, ...k); }
  assert.equal(new Set(o.map((x) => x.teks)).size, 5, "opsi kembar");
  const iK = o.findIndex((x) => x.jebakan === null);
  assert.equal(o.filter((x) => x.jebakan === null).length, 1, "kunci harus satu");
  assert.equal(HURUF[iK], kunciHuruf, `kunci jatuh di ${HURUF[iK]}, rencana ${kunciHuruf}`);
  return { opsi: Object.fromEntries(o.map((x, i) => [HURUF[i], x.teks])), jebakan: Object.fromEntries(o.map((x, i) => [HURUF[i], x.jebakan])), kunci: kunciHuruf };
}
const soal = [];

// 37 Estimasi — 4.987 × 0,198 + √3.610
{
  const benar = 4987 * 0.198 + Math.sqrt(3610); // 1047,5
  const cand = [
    { teks: "950", nilai: 950, salah: 4987 * 0.19, jebakan: "0,198 dipotong jadi 0,19 dan akar lupa dijumlahkan" },
    { teks: "1.005", nilai: 1005, salah: 4987 * 0.198 + Math.sqrt(361), jebakan: "√3.610 dikira √361 = 19 (salah kelompok angka)" },
    { teks: "1.045", nilai: 1045, salah: benar, jebakan: null },
    { teks: "1.085", nilai: 1085, salah: 4987 * 0.198 + 100, jebakan: "√3.610 ditaksir 100" },
    { teks: "1.175", nilai: 1175, salah: 4987 * 0.198 + Math.sqrt(36100), jebakan: "√3.610 dikira √36.100 = 190" },
  ];
  // tiap jalur salah/benar harus jatuh paling dekat ke opsinya sendiri
  for (const c of cand) {
    const terdekat = cand.reduce((a, b) => (Math.abs(b.nilai - c.salah) < Math.abs(a.nilai - c.salah) ? b : a));
    assert.equal(terdekat.teks, c.teks, `estimasi ${c.teks} tidak terdekat (${c.salah})`);
  }
  soal.push({ no: 37, keluarga: "HIT", soal: "Nilai yang paling mendekati hasil 4.987 × 0,198 + √3.610 adalah …", ...susun(cand, "C"), bukti: { tepat: benar } });
}

// 38 Suku ke-n — U(n) = 3n² − 5n + 4, titik loncat acak, tanya suku ke-30
{
  const U = (n) => 3 * n * n - 5 * n + 4;
  const titik = [2, 3, 7, 10, 16];
  const tanya = 30;
  // pola linear tidak boleh cocok (residu besar), kuadrat cocok di 5 titik
  const [a, b] = [titik[3], titik[4]];
  const m = (U(b) - U(a)) / (b - a);
  const linear = U(b) + m * (tanya - b);
  for (const n of titik.slice(0, 3)) assert.notEqual(U(a) + m * (n - a), U(n), "linear ikut cocok");
  const cand = [
    { nilai: U(tanya), jebakan: null },
    { nilai: 3 * tanya * tanya + 5 * tanya + 4, jebakan: "tanda −5n terbalik jadi +5n" },
    { nilai: U(tanya + 1), jebakan: "menghitung suku ke-31 (salah nomor suku)" },
    { nilai: 3 * tanya * tanya, jebakan: "lupa −5n + 4 (hanya 3n²)" },
    { nilai: linear, jebakan: "kenaikan dari dua titik terakhir dianggap tetap" },
  ].map((c) => ({ ...c, teks: fmt(c.nilai) }));
  soal.push({ no: 38, keluarga: "SUK", soal: "Perhatikan tabel berikut. Nilai suku ke-30 adalah …", tabel: [["Suku ke-", "Nilai"], ...titik.map((n) => [n, U(n)])], ...susun(cand, "B"), bukti: { rumus: "3n² − 5n + 4", linear } });
}

// Pencari rumus alternatif sederhana untuk soal kotak: ekspresi atas a,b dengan ≤ 3 operasi dan konstanta kecil.
function ekspresi() {
  const daun = [["a", (a) => a], ["b", (a, b) => b], ...[1, 2, 3].map((k) => [String(k), () => k])];
  const ops = [["+", (x, y) => x + y], ["−", (x, y) => x - y], ["×", (x, y) => x * y], ["^", (x, y) => (Number.isInteger(y) && y >= 0 && y <= 5 ? x ** y : NaN)]];
  let lv = [daun]; // lv[k] = ekspresi dengan k operasi
  for (let k = 1; k <= 3; k++) {
    const baru = [];
    for (let i = 0; i < k; i++) for (const [ns, fs] of lv[i]) for (const [nt, ft] of lv[k - 1 - i]) for (const [o, fo] of ops) baru.push([`(${ns}${o}${nt})`, (a, b) => fo(fs(a, b), ft(a, b))]);
    lv.push(baru);
  }
  return lv.flat();
}

// 39 KOTAK 2×5 X-Y — atas(k+1) = atas(k) + bawah(k), bawah(k+1) = atas(k) − bawah(k)
{
  const atas = [7], bawah = [3];
  for (let k = 0; k < 4; k++) { atas.push(atas[k] + bawah[k]); bawah.push(atas[k] - bawah[k]); }
  const [X, Y] = [atas[4], bawah[4]];
  // rumus alternatif dari kolom sebelumnya yang cocok di kolom 2–4 tidak boleh memberi X atau Y lain
  const lainX = new Set(), lainY = new Set();
  for (const [, f] of ekspresi()) {
    if ([1, 2, 3].every((k) => f(atas[k - 1], bawah[k - 1]) === atas[k])) lainX.add(f(atas[3], bawah[3]));
    if ([1, 2, 3].every((k) => f(atas[k - 1], bawah[k - 1]) === bawah[k])) lainY.add(f(atas[3], bawah[3]));
  }
  assert.deepEqual([...lainX], [X], "rumus lain memberi X berbeda");
  assert.deepEqual([...lainY], [Y], "rumus lain memberi Y berbeda");
  const cand = [
    { x: atas[3], y: Y, jebakan: "baris atas memakai kolom ketiga sebagai acuan" },
    { x: X, y: X - bawah[3], jebakan: "selisih diambil dari kolom yang sama, bukan kolom sebelumnya" },
    { x: X + Y, y: X - Y, jebakan: "kelebihan satu langkah (menghitung kolom keenam)" },
    { x: atas[3], y: bawah[3], jebakan: "menghitung ulang kolom keempat (salah kolom acuan)" },
    { x: X, y: Y, jebakan: null },
  ].map((c) => ({ ...c, teks: `${fmt(c.x)} dan ${fmt(c.y)}` }));
  // tebakan baris sebagai deret sendiri (selisih 3, 4, 6 → +9 = 29) tidak boleh ada di opsi
  assert.ok(!cand.some((c) => c.x === atas[3] + 9), "opsi memuat tebakan deret atas");
  // kunci tidak boleh tertebak dari angka yang paling sering muncul (dihitung lintas X dan Y)
  const semua = cand.flatMap((c) => [c.x, c.y]), frek = (v) => semua.filter((u) => u === v).length;
  const skor = cand.map((c) => frek(c.x) + frek(c.y)), skorK = skor[cand.findIndex((c) => !c.jebakan)];
  assert.ok(skor.filter((v) => v >= skorK).length >= 2, "kunci = opsi berskor frekuensi tertinggi tunggal");
  assert.ok(!cand.some((c) => c.jebakan && c.x === X && c.y === -Y), "cermin tanda kunci");
  soal.push({ no: 39, keluarga: "KOTAK", soal: "Perhatikan pola bilangan pada tabel berikut. Pasangan nilai X dan Y yang tepat adalah …", tabel: [[...atas.slice(0, 4), "X"], [...bawah.slice(0, 4), "Y"]], ...susun(cand, "E", false), bukti: { atas, bawah } });
}

// 40 KOTAK 3×3 — c = a^b − b; pangkat berbeda di baris contoh, baris 3 angka pokok negatif
{
  const f = (a, b) => a ** b - b;
  const baris = [[3, 2], [-3, 3], [-4, 2]];
  const X = f(...baris[2]);
  const lain = new Set();
  for (const [, g] of ekspresi()) if (baris.slice(0, 2).every(([a, b]) => g(a, b) === f(a, b))) lain.add(g(...baris[2]));
  assert.deepEqual([...lain], [X], "rumus lain ≤ 3 operasi memberi X berbeda");
  const cand = [
    { nilai: X, jebakan: null },
    { nilai: -(4 ** 2) - 2, jebakan: "(−4)² dihitung −16 (salah tanda pangkat genap)" },
    { nilai: -4 * 2 - 2, jebakan: "pangkat dianggap perkalian" },
    { nilai: (-4) ** 2, jebakan: "lupa dikurangi pangkatnya" },
    { nilai: (-4) ** 2 + 2, jebakan: "pangkatnya ditambahkan, bukan dikurangkan" },
  ].map((c) => ({ ...c, teks: fmt(c.nilai) }));
  for (const c of cand.filter((c) => c.jebakan)) assert.ok(!lain.has(c.nilai), `rumus lain ≤ 3 operasi membenarkan pengecoh ${c.nilai}`);
  soal.push({ no: 40, keluarga: "KOTAK", soal: "Perhatikan pola bilangan pada tabel berikut. Nilai X yang tepat adalah …", tabel: baris.map(([a, b], i) => [a, b, i < 2 ? f(a, b) : "X"]), ...susun(cand, "C"), bukti: { aturan: "c = a^b − b", alternatif: [...lain] } });
}

// Pasangan operasi: [kiri, kanan] berupa teks ekspresi; nilai dihitung dari teks.
const nilaiDari = (t) => Function(`return (${t.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/(\d)\.(\d{3})/g, "$1$2").replace(/,/g, ".")})`)();
function pasangan(no, perintah, daftar, kunciHuruf, cariSama) {
  const o = daftar.map(([k, n, jeb]) => {
    const [vk, vn] = [nilaiDari(k), nilaiDari(n)];
    return { teks: `${k} dan ${n}`, sama: dekat(vk, vn), vk, vn, jebakan: jeb };
  });
  assert.equal(o.filter((x) => x.sama === cariSama).length, 1, `soal ${no}: harus tepat satu pasangan ${cariSama ? "sama" : "TIDAK sama"}`);
  o.forEach((x) => (x.jebakan = x.sama === cariSama ? null : x.jebakan));
  return { no, keluarga: "PAS", soal: perintah, ...susun(o, kunciHuruf, false), bukti: o.map((x) => [x.teks, x.vk, x.vn]) };
}

// 41 bagi
soal.push(pasangan(41, "Pasangan pembagian berikut yang bernilai sama adalah …", [
  ["7,2 ÷ 0,6", "84 ÷ 7"],
  ["4,8 ÷ 0,4", "66 ÷ 6", "hanya sisi kiri yang dicek (kiri 12)"],
  ["9,6 ÷ 0,8", "1,3 ÷ 0,1", "hanya sisi kiri yang dicek (kiri 12)"],
  ["8,4 ÷ 0,7", "1,2 ÷ 0,01", "salah geser koma di sisi kanan (120, bukan 12)"],
  ["6,3 ÷ 0,7", "0,9 ÷ 0,01", "salah geser koma di sisi kanan (90, bukan 9)"],
], "A", true));

// 42 kali — kunci bukan pasangan cermin
soal.push(pasangan(42, "Pasangan perkalian berikut yang bernilai sama adalah …", [
  ["28 × 330", "38 × 230", "tampak cermin, padahal angkanya bukan tukar tempat (9.240 dan 8.740)"],
  ["48 × 60", "32 × 85", "hanya sisi kiri yang dicek (kiri 2.880)"],
  ["72 × 40", "54 × 52", "hanya sisi kiri yang dicek (kiri 2.880)"],
  ["26 × 450", "45 × 270", "tampak cermin, padahal 26 bukan 27 (11.700 dan 12.150)"],
  ["45 × 64", "36 × 80"],
], "E", true));

// 43 campuran — TIDAK sama
soal.push(pasangan(43, "Pasangan berikut yang <b>TIDAK</b> bernilai sama adalah …", [
  ["(36 ÷ 4) × 7", "(9 × 8) − 9", "salah hitung salah satu sisi"],
  ["(72 ÷ 8) + (6 × 5)", "(13 × 3)", "salah hitung salah satu sisi"],
  ["(84 ÷ 7) + (5 × 3)", "(125 ÷ 5) + 4"],
  ["(15 × 6) − (48 ÷ 4)", "(26 × 3)", "salah hitung salah satu sisi"],
  ["(144 ÷ 12) × (3 + 4)", "(7 × 14) − 14", "salah hitung salah satu sisi"],
], "C", false));

// 44 persen kapasitas — tangki truk pemadam
{
  const awal = 0.1, akhir = 0.6, tambah = 3000;
  const cap = tambah / (akhir - awal);
  const cand = [
    { nilai: cap, jebakan: null },
    { nilai: tambah / akhir, jebakan: "tambahan dibagi persen akhir" },
    { nilai: cap + cap * awal, jebakan: "isi awal ditambahkan lagi ke kapasitas" },
    { nilai: tambah + cap * awal + cap * akhir, jebakan: "isi awal, isi akhir, dan tambahan dijumlahkan" },
    { nilai: tambah / awal, jebakan: "tambahan dibagi persen awal" },
  ];
  for (const c of cand) assert.ok(dekat(c.nilai, Math.round(c.nilai)), `nilai tidak bulat ${c.nilai}`);
  cand.forEach((c) => (c.teks = `${fmt(Math.round(c.nilai))} liter`));
  soal.push({ no: 44, keluarga: "CRT", soal: `Tangki air sebuah truk pemadam kebakaran terisi ${awal * 100}% dari kapasitasnya. Setelah ditambah ${fmt(tambah)} liter air, tangki terisi ${akhir * 100}% dari kapasitasnya. Kapasitas penuh tangki tersebut adalah …`, ...susun(cand, "B"), bukti: { cap } });
}

// 45 kerja bersama — kolam benih ikan; pembuang dibuka 1 jam setelah dua pengisi
{
  const A = 1 / 4, B = 1 / 12, C = -1 / 6, jeda = 1;
  const t = jeda + (1 - (A + B) * jeda) / (A + B + C);
  const jam = (x) => { const j = Math.floor(x + 1e-9), m = Math.round((x - j) * 60); return m ? `${j} jam ${m} menit` : `${j} jam`; };
  const cand = [
    { nilai: t, jebakan: null },
    { nilai: 1 / (A + B + C), jebakan: "lupa jeda: ketiga keran dianggap dibuka bersamaan" },
    { nilai: jeda + (1 - (A + B) * jeda) / (A + B - C), jebakan: "keran pembuang dihitung ikut mengisi" },
    { nilai: (1 - (A + B) * jeda) / (A + B + C), jebakan: "berhenti di waktu sesudah keran pembuang dibuka (lupa 1 jam pertama)" },
    { nilai: 1 / (A + B), jebakan: "keran pembuang tidak dihitung" },
  ].map((c) => ({ ...c, teks: jam(c.nilai) }));
  soal.push({ no: 45, keluarga: "CRT", soal: "Sebuah kolam benih ikan dapat diisi penuh oleh keran P dalam 4 jam dan oleh keran Q dalam 12 jam. Keran pembuang R dapat mengosongkan kolam yang penuh dalam 6 jam. Mula-mula kolam kosong, lalu keran P dan Q dibuka bersamaan. Satu jam kemudian keran R juga dibuka, dan ketiganya tetap terbuka. Kolam penuh setelah … sejak keran P dan Q dibuka.", ...susun(cand, "D"), bukti: { t } });
}

writeFileSync(new URL("soal_numerik.json", import.meta.url), JSON.stringify(soal, null, 1));
for (const s of soal) console.log(s.no, s.kunci, Object.values(s.opsi).join(" | "));
console.log("numerik OK", soal.length);
