# Tahap 6 · Ganti soal deret tabel Bab 9 dengan bank D'Ajiks (Putusan T6-6, 2026-11-02)

Sumber: `BIG DATA/GENERATE SOAL TERBARU SKD 2026/scripts/build-deret-tabel-lv56.js` (PDF `docs/deret-tabel-level-5-6/`, 15 soal Level 5–6). Folder sumber tidak diubah.

## Soal yang diganti

| ID | Soal lama | Soal baru (sumber) | Pilihan (urut naik) | Kunci |
|---|---|---|---|---|
| B09-P01 (pembuka, 75 dtk) | a × (a − b), hasil −6 | **Soal 7** · 36·4·13 / 35·5·12 / 48·6·14 / 63·7·X · angka pertama : angka kedua + angka kedua (apa adanya) | 9 · 16 · 22 · 56 · 70 | A → **B** (16) |
| B09-C02 (contoh, 75 dtk) | a² − b², kolom bernegatif | **Soal 11** · per kolom, 3 × atas − tengah, X di tengah | 11 · 16 · 21 · 31 · 37 | C → **A** (11) |
| B09-L04 (latihan, 90 dtk) | a² − 2b, negatif dan nol | **Soal 2** · 4 kolom, angka pertama + angka kedua × angka ketiga | 7 · 18 · 26 · 30 · 42 | B → **C** (26) |

Penyesuaian pilihan (tabel dan aturan sumber tidak diubah):
- Soal 11: pilihan 5 (13 − 8) diganti **31** (3 × 13 − 8, angka atas dan bawah tertukar) supaya kunci jatuh di A.
- Soal 2: pilihan 51 (8 × 6 + 3) diganti **7** (angka ketiga dikuadratkan dikurangi 2, cocok di baris 1 saja). 51 terpencil (jarak 21 > 3 × median 6) dan kunci perlu jatuh di C.
- Huruf kunci tiga slot dipertukarkan (A, C, B → B, A, C). Sebaran 46 kunci numerik tetap A9 B9 C9 D10 E9, tanpa huruf sama > 2 berturut.

## Pemeriksaan
- `model_b.mjs` → `ujiSumber`: aturan berlaku di setiap baris/kolom lengkap, X tunggal (brute force −2000…2000), pemeriksa rumus lain milik sumber (`alat.mjs` `aturanLainSumber`, disalin dari `aturanLain()`) tidak membenarkan satu pun pilihan salah.
- `soal_numerik.mjs`: lulus (urut naik, kunci bukan pencilan, jarak ≤ 3 × median, ciri kunci, rantai hitung pembahasan, frasa terlarang). B09-L04 D "Salah memilih angka yang dikali" masuk `NAMA_LUAR` (nama di luar tabel kekeliruan Bab 9, sesuai T6-1).
- `cek_lampiran.mjs --tulis` menulis ulang blok L6 (edisi pengajar, tabel bukti dari data). `build.py` galat 0. Siswa 255 halaman. Halaman diperiksa: 80, 83–84 (pembuka), 86 (Contoh 2), 91 + 223 (Latihan 4 + pembahasan di Lampiran A).

## Pembahasan
Struktur 7 langkah tetap. Cara cepat memuat **Pola** (satu kalimat + petunjuk kenapa terlihat), tabel **Cek ke semua baris/kolom**, dan **Hitung X**. Pilihan gugur memakai asal pilihan salah dari sumber. Keterangan kecil di bawah pilihan gugur berupa hitungan biasa (mis. 63 : 7 = 9), bukan label rumus.

## Temuan, tidak diubah
- Keterangan kecil berupa label masih ada di bawah pilihan gugur hampir semua soal buku siswa (89 soal), mis. B09-L02 "kiri × (kiri + 2)", B09-L03 "atas + 1 · lupa − 2", B09-C04 "selisih atas 14", B08-L04 "tiga titik akhir", B04-C04 "Konvers · Ingkaran", B04-P01 "Kata dari P3", B11–B13 "(1) dianggap cukup".
- Soal tabel Bab 9 lain yang aturannya dua lapis tetapi tanpa bilangan negatif, belum diganti: C03 (3 × acuan baris + acuan kolom², padanan sumber Soal 1: acuan dikali lalu dikurangi 1), L03 (kiri + atas − 2, padanan sumber Soal 9: kiri + atas), L02 (kiri × (2 × kiri − 1)). Bab 8 C02/L04 (rumus kuadrat dan pangkat tiga) termasuk jenis suku ke-n, bukan deret tabel.
- Uraian bab "Bilangan Negatif, Nol, FPB, dan KPK" tetap ada, padahal soal Bab 9 tidak lagi memakai bilangan negatif.
- Urutan Latihan: L04 (Soal 2, Level 5) tidak lebih berat dari L03.
