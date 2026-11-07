# K12 Spatial Engine: instruksi untuk agent

Mesin generator soal figural/spasial pilihan ganda (5 opsi). Satu spec menghasilkan soal SVG, 5 opsi SVG, pembahasan teks 2 paragraf, dan gambar pembahasan. Keluarannya deterministik: spec yang sama selalu menghasilkan byte SVG yang sama. Tidak ada dependensi runtime selain Node.js; `tsx` dipakai untuk menjalankan TypeScript.

## Perintah

```bash
npm install                        # sekali, hanya untuk tsx
npm run gen -- out                 # out/items.json + out/img/*.svg + out/preview.html
npm run gen -- out --blind         # soal tanpa kunci (out/DAFTAR.txt) untuk pemeriksa buta
npm run gen -- out --prefix SPS    # ganti awalan id (default K12-N)
npm test                           # generate ke .test-out lalu validasi
```

Setiap kali spec diubah, jalankan `npm test`, lalu buka `out/preview.html` untuk cek visual.

## Struktur

| File | Isi |
|---|---|
| `src/figural-lib.ts` | Primitif: `Fig = Prim[]` (poly/circ/line, koordinat lokal kotak 96, pusat 0,0), `tf` (putar/cermin), `draw`, `sig` (tanda geometris: sama ⇔ gambar sama), `place` (taruh kunci, tolak opsi kembar), `cellS`, warna `INK/HL/RED`. |
| `src/k12-spasial-core.ts` | Inti: `Draft` (bentuk keluaran per butir), `layout` (grid sel → SVG, sorotan hijau, keterangan merah), model sel `MC` + `cellFig`, `finish` (pengecoh + pembahasan). |
| `src/k12-spasial-seri.ts` | Deret: `GRID` (benda berjalan di grid n×n) dan `BANGUN` (deret bangun). |
| `src/k12-spasial-mtx.ts` | Matriks 3×3: `MTX`, aturan per atribut (latin / op himpunan / step / sum / oneblack). |
| `src/k12-spasial-analogi.ts` | Analogi A : B = C : ? : `ANA`, beserta bukti bahwa tiap pengecoh tidak bisa dibela. |
| `src/generate.ts` | CLI: semua `Draft` ditulis ke folder keluaran. |
| `src/check.ts` | Validasi keluaran. |
| `docs/RULES-GENERATE-SOAL-SPASIAL.md` | SOP gaya SVG dan pembahasan. |

## Model sel `MC` (dipakai matriks, analogi, deret bangun)

`{ s, f, t, tf, a, g, w, k, n }`
- `s`: bingkai. 0 = lingkaran, 3–8 = segi-n. `f`: warna bingkai, `"b"` (hitam) atau `"w"` (putih).
- Isi tengah, **paling banyak satu jenis**:
  - `t` + `tf`: bangun kecil beserta warnanya
  - `a`: jarum, arah 0–7 (kelipatan 45°)
  - `g`: garis, `["H","V","/","\\"]`
  - `w`: segitiga baling, indeks 0–3 (atas, kanan, bawah, kiri)
- `k`: titik pojok 0–3 (kiri atas, kanan atas, kanan bawah, kiri bawah). `n`: jumlah titik di bawah.
- `cellFig` melempar error bila isi keluar bingkai, bila `g`/`w` dipakai di bingkai hitam, atau bila ada lebih dari satu jenis isi.

## Menambah butir

Tambah satu entri di array spec (`GRID`, `BANGUN`, `MTX`, atau `ANA`). Jangan menulis SVG manual.
- Seri grid: `{ n, tier, key, q, seed, toks: [{ kind, path: PATH.perim|ring|snake|diag|col(...), step, grow?, start? }] }`. `q` = indeks gambar yang diganti "?" (0–4). Posisi awal dicari otomatis supaya benda tidak bertabrakan.
- Matriks: `{ tier, key, sub, base, rules: [...] }`. Lihat contoh di `MTX`. Sel (3,3) dihitung dari aturan.
- Analogi: `{ tier, key, A, B, C, ans, rules, wrongs: [W(name, ruleIdx, MC, isi, alasan) ×4] }`.

`key` (A–E) dipilih manual. Usahakan sebaran kunci rata, tidak ada huruf yang lebih dari ±24%. Jangan ubah urutan atau seed butir yang sudah ada, karena keluarannya bisa berubah.

## Aturan yang ditegakkan mesin (lewat assert, jangan dimatikan)

1. Tepat 4 pengecoh. Tiap pengecoh = jawaban yang salah tepat pada **satu** aturan.
2. Kelima opsi harus berbeda secara geometris (`place` + `sig`).
3. Pembahasan 2 paragraf, dipisah `<br>`. Paragraf 1 berisi langkah menemukan pola. Paragraf 2 berisi alasan tiap opsi salah, lalu `Jawaban: Opsi X.`, lalu `Tips: ...`.
4. Gaya gambar: hitam-putih, jawaban di gambar pembahasan berbingkai hijau `#1a7f37`, keterangan berwarna merah `#d32f2f`.

Jika assert gagal, perbaiki spec. Jangan longgarkan assert-nya.

## Format `items.json`

```json
{ "id": "K12-N-001", "sub_type": "FIG-SERI-GRID", "tier": 2, "instruksi": "...", "stem": "...",
  "gambar": "img/K12-N-001.svg", "opsi_gambar": { "a": "img/K12-N-001-a.svg", "...": "..." },
  "kunci": "a", "pembahasan": "paragraf1<br>paragraf2", "gambar_pembahasan": "img/K12-N-001-pembahasan.svg" }
```

`tier`: 2 = Menengah, 3 = Lanjut. Path gambar relatif terhadap folder keluaran.

## Tambahan TIU SKD D'Ajiks (2026-10-28)

Modul soal gambar TIU SKD, diadaptasi dari pola Al Faiz (Paket 41 no. 57–65, Part 39 no. 57–65). Modul PSI di atas tidak diubah.

```bash
npm run gen:tiu -- out-tiu     # out-tiu/items.json + img/ + preview.html (opsi A–E)
npm run test:tiu               # generate ke .test-out-tiu (assert jalan saat generate)
```

| File | Isi |
|---|---|
| `src/tiu-bentuk.ts` | 8 bentuk kiral, 8 transformasi persegi (`T`, `ap`, `comp`, `inv`), `susun` (2–4 objek per sel), `pasang` (kunci + 4 pengecoh bernama), penyaring beda piksel. |
| `src/tiu-fig-beda-seri.ts` | FIG-BEDA-PUTAR, FIG-BEDA-HITUNG, FIG-SERI-P3, FIG-SERI-KUADRAN. |
| `src/tiu-fig-ana-mtx.ts` | FIG-ANA-OBJ (tanda tanya di posisi mana pun), FIG-MTX-PUTAR (arah kolom/baris, lapis titik pojok). |
| `src/tiu-generate.ts` | CLI TIU + cek: kata terlarang di pembahasan, kunci disebut, 4 alasan opsi gugur. |

Assert tambahan: bentuk harus kiral (putar ≠ cermin) dan lolos penyaring beda piksel; aturan seri/analogi/matriks harus tunggal (semua tafsir transformasi yang cocok memberi jawaban sama); FIG-BEDA-HITUNG menolak susunan bila ciri lain (bulatan tengah, pojok, simetri, jumlah jenis lain) menunjuk tepat satu opsi selain kunci; FIG-SERI-KUADRAN menolak jawaban yang sama dengan gambar terlihat.
Penyaring piksel hanya kasar. Setiap paket tetap wajib dicek mata (render SVG ke PNG). Pembahasan gaya guru TIU SKD: yang ditanya, cara cepat, kenapa tiap opsi gugur, jawaban, analogi, jebakan.

### Pembaruan 2026-10-28 (gaya organik + jenis baru + mockup)
- `src/tiu-gaya.ts`: 12 bentuk organik dalam tiga gaya (alam · nusantara · kuas), `gumpal(n)` bercabang, `balikWarna`. Bentuk = titik kendali dihaluskan jadi poligon rapat, jadi putar/cermin tetap eksak.
- `src/tiu-jenis.ts`: daftar jenis (nama, asal logika Al Faiz, contoh spesifikasi, pembuat). Tambah jenis cukup di sini.
- `src/tiu-fig-baru.ts`: FIG-BEDA-TUMPUK (depan/belakang + ukuran hiasan, no. 62), FIG-MTX-HITUNG (cabang + objek kecil, no. 64). FIG-ANA-OBJ menerima perubahan `+warna` dan `tukar`.
- Mockup: `npm run mockup` → buka `mockup/index.html`. Pilih jenis, ubah JSON, Ctrl/⌘+Enter. Soal yang melanggar aturan dasar ditolak dengan pesan alasannya. Galeri menampilkan nama bentuk yang bisa dipakai.
- Catatan: versi garis bentuk yang tersusun dari beberapa bagian (tunas, daun) memperlihatkan sambungan; belum diperbaiki.
