# Cek Buta Tahap 5 — Kelompok 3 Numerik (Bab 6–10), 45 soal

Sumber: `scripts/data/numerik_b06_10_buta.json` saja (tanpa kunci). Semua angka diverifikasi dengan Python.
Tanggal: 2026-11-01.

Catatan jujur Tugas B: berkas dibaca utuh sekali, jadi tebakan bentuk saya tidak sepenuhnya buta (soal cerita Bab 10 yang mudah kemungkinan "terlihat" saat membaca). Karena itu disertakan juga uji bentuk mekanis (aturan baku yang dijalankan script, tanpa melihat soal) sebagai ukuran yang bersih.

## Tabel per soal

| id | Jawaban A | Yakin | Catatan isi | Tebakan B | Isyarat B |
|---|---|---|---|---|---|
| B06-P01 | D (2.700) | yakin | 647×87:21 = 2.680,4. Jarak opsi 300, aman. 30 detik ketat tapi cukup (87:21 ≈ 4,14). | C | nilai tengah, 3.150 pencilan |
| B06-C02 | **tidak ada** (tertulis) / E bila 3⅖ | ragu | Tertulis `32/5 × 10` = 64 → 120 − 24 + 64 = **160**, tidak ada di opsi. Bila maksudnya bilangan campuran 3⅖ → 120 − 24 + 34 = 130 (E). Format pecahan campuran di soal lain `3{2/5}`; di sini kurung kurawal hilang. | C | angka bulat 100 |
| B06-C03 | A (6.237) | yakin | 63 + 6.174 = 6.237. | C | bulat 6.300, 6.237/6.363 simetris |
| B06-C04 | B (P < Q) | yakin | 9.991 < 9.999. | B | tanpa isyarat (P vs Q) |
| B06-L01 | B (−29) | yakin | 6 − 35 = −29. | C | nilai tengah |
| B06-L02 | D (3.200) | yakin | 1.987 × 8/5 = 3.179. | D | pasangan geser koma 320/3.200, 400/4.000 |
| B06-L03 | A (P > Q) | yakin | x = 7..10: P−Q = 5, 12, 21, 32, selalu positif. Format: `x2` seharusnya x² dan `&lt;` masih entitas HTML di data — pastikan tampil benar di PDF. | A | tanpa isyarat |
| B07-P01 | C | yakin | 1.512 = 1.512. Pengecoh D 1.519 vs 1.518 (beda 1) bagus. | C | 27×56 dan 36×42 "rapi" faktornya |
| B07-C01 | A | yakin | 8.840 = 8.840. B, D beda; C 8.840 vs 9.100; E beda ×10. | C | satu-satunya yang bukan tukar-angka |
| B07-C02 | E | yakin | 36 = 36. A 36/37, B 18/36, C 36/35, D 360/36. | E | dua ruas kelipatan 11 |
| B07-C03 | A | yakin | 54 = 54. B 54/56, C 40/10, D 540/54, E 54/52. | A | tanpa isyarat |
| B07-L01 | C | yakin | 1.680 = 1.680 (35×48 = 70×24). | C | pola kali-2/bagi-2 terlihat persis |
| B07-L02 | A | yakin | Soal TIDAK sama: A 70 vs 75. B 16=16, C 9=9, D 36=36, E 42=42. | D | opsi paling rumit (pecahan campuran) |
| B07-L03 | A | yakin | 2.016 = 2.016 (24×84 = 42×48). Semua opsi bentuk tukar-digit, adil. | A | tanpa isyarat kuat |
| B08-P01 | B (397) | yakin | Un = 8n − 3, semua 4 titik cocok. U50 = 397. | C | bulat 400 |
| B08-C01 | D (47) | yakin | Un = 4n − 8; 4n − 8 = 180 → n = 47. | C | nilai tengah |
| B08-C02 | E (469) | yakin | Un = n(n+1)/2 + 4 (4 titik pas pada kuadrat). U30 = 469; 465 = lupa +4. 75 detik ketat tapi wajar. | E | pasangan dekat 465/469 |
| B08-C03 | C (244) | yakin | ×3 − 2 (atau selisih ×3). 82×3 − 2 = 244. | D | pasangan 244/246 |
| B08-C04 | A (K96) | yakin | Huruf 2,5,10,17,26 (+3,+5,+7,+9) → +11 = 37 → putar = 11 = K; angka ×2 = 96. Perlu putaran alfabet; wajar untuk level ini. | A | K dan 96 paling sering muncul |
| B08-L01 | B (9) | yakin | Selisih 2,4,6,8,10. | C | nilai tengah |
| B08-L02 | B (315) | yakin | Un = 9n + 20; selisih = 9 × 35 = 315. | C | nilai tengah, 1.260 pencilan |
| B08-L03 | A (EV) | yakin | Huruf depan +3,+4,+5,+6 (Y→E putar); belakang −3,−4,−5,−6 (B→V putar). | A | E dan V paling sering muncul |
| B08-L04 | E (1.764) | yakin | Un = n³ + 3n (5 titik pas). U12 = 1.728 + 36. 1.728 = lupa +3n. Menebak n³ dari tabel dalam 90 detik **menantang** untuk siswa SMA; batas atas wajar. | C | nilai tengah, 1.728 bulat |
| B09-P01 | A (24) | yakin | (a − b) × a: (4−2)×4 = 8, (3−5)×3 = −6 → (8−5)×8 = 24. Hanya 2 baris contoh; aturan lain mungkin, tapi tidak ada yang mengarah ke opsi lain. | C | 59 pencilan ganjil |
| B09-C01 | E (178) | yakin | n² + 9. 169 = lupa +9. | C | nilai tengah |
| B09-C02 | C (24) | yakin | Per kolom a² − b²: 16−1 = 15, 9−16 = −7, 49−25 = 24. | C | nilai tengah |
| B09-C03 | D (51) | yakin | Sel = 3R + C²; semua 8 sel cocok. (5,6) = 15 + 36 = 51. | C | pasangan 41/42, 123 pencilan |
| B09-C04 | C (43 dan 85) | yakin | X: selisih 4,6,8,10,12 → 43; Y = 2X − 1 (atau selisih 8..24) → 85. | C | 43 muncul 3×, 85/86 pasangan |
| B09-L01 | B (75) | yakin | 4n − 5. | C | nilai tengah |
| B09-L02 | D (231) | yakin | n(2n − 1): 11 × 21 = 231. | D | 143/231/242 kelipatan 11 |
| B09-L03 | C (61) | yakin | Kiri + atas − 2, semua 8 petak cocok. 31 + 32 − 2 = 61. | D | nilai tengah klaster 61/63/65 |
| B09-L04 | B (21) | yakin | a² − 2b: 16−6 = 10, 9−0 = 9, 25−4 = 21. Hanya 2 baris contoh; aturan lain (mis. a² − b² + b → 23) bisa juga cocok tapi tidak ada di opsi. Kunci tetap tunggal di antara opsi. | C | nilai tengah klaster 21/25/29 |
| B10-P01 | E (4 j 40 m) | yakin | 2 jam bersama = 5/9; sisa 4/9 oleh Ani = 2 j 40 m; total 4 j 40 m. A = lupa 2 jam awal. | D | 4:36 berbagi unsur dengan B dan C |
| B10-C01 | E (540) | yakin | 30% = 360 → kapasitas 1.200; 90% − 45% = 45% = 540. | C | nilai tengah |
| B10-C02 | B (5) | yakin | Sisa 400 hari-orang dalam 16 hari → 25 pekerja → tambah 5. D/E = total, bukan tambahan. | B | pasangan 4/5 |
| B10-C03 | E (12 jam) | yakin | 2 jam: 1/3 terisi (B dan C saling hapus); sisa 2/3 dengan laju 1/15 → 10 jam; total 12. D = lupa 2 jam awal. | C | nilai tengah |
| B10-C04 | D (07.50) | yakin | Jarak awal 6 km, laju relatif 24 → 15 menit setelah 07.35. | C | nilai tengah |
| B10-C05 | D (60) | yakin | 1.500 m : 25 m/s = 60 detik. B = lupa panjang kereta. | D | angka bulat 60 |
| B10-C06 | E (30) | yakin | 3k, 2k → (3k+5)/(2k+5) = 7/5 → k = 10 → 30. | E | 3 dan 30 berpasangan |
| B10-C07 | C (35%) | yakin | 200.000 × 0,6 × 0,9 = 108.000; untung 28.000/80.000 = 35%. | C | nilai tengah |
| B10-L01 | D (120) | yakin | 2 bagian = 30 → 8 bagian = 120. | D | pasangan 120/240 |
| B10-L02 | B (30) | yakin | Rata-rata harmonik 2·20·60/80 = 30. C 40 = rata-rata biasa. | B | jebakan rata-rata biasa (40) dikenali |
| B10-L03 | D (25) | yakin | Hilir 30, hulu 20 → (30+20)/2 = 25. A = laju arus. | D | pasangan 24/25 |
| B10-L04 | C (Rp2.850.000) | yakin | Bruto 200 kg, tara 10 kg, neto 190 kg × 15.000. Ongkos ditanggung pemasok, tidak dibayar pedagang. | C | nilai tengah |
| B10-L05 | C (Rp2.760.000) | yakin | Bunga 2,4 jt × 10% × 1,5 = 360.000. D/E = bunga majemuk/semesteran. | D | tengah klaster 2.760/2.772/2.784 |

Tidak ada soal yang punya dua opsi benar.

## Ringkasan

### Soal bermasalah
1. **B06-C02 — salah ketik/format (tidak ada jawaban benar sebagaimana tertulis).** `32/5 × 10` terbaca 32/5 = 6,4 → hasil 160, tidak ada di opsi. Kemungkinan dimaksud 3⅖ (hasil 130 = E). Perbaiki penulisan ke format pecahan campuran (`3{2/5}`) atau ubah opsi.
2. **B06-L03 — format.** `x2` harus x²; `&lt;` masih berupa entitas HTML. Isi benar (P > Q), hanya pastikan tampilan PDF.
3. **B08-L04 — batas waktu.** Menemukan n³ + 3n dari tabel dalam 90 detik berat untuk siswa SMA biasa; masih mungkin bagi yang cakap. Pertimbangkan 105 detik atau beri petunjuk "pangkat tiga" di pembahasan.
4. **B09-P01, B09-L04 — data tipis (catatan, bukan cacat).** Hanya 2 baris contoh untuk aturan dua variabel; aturan lain bisa cocok, tetapi tidak ada yang mengarah ke opsi lain. Kunci tetap tunggal.
5. Waktu ketat tapi wajar: B06-P01 (30 dtk), B07-P01 (45 dtk, lima perkalian), B08-C02 (75 dtk).

Sebaran kunci (menganggap B06-C02 = E): A 9, B 9, C 9, D 9, E 9 — seimbang.

### Skor penebak bentuk
- **Tebakan saya (Tugas B): 22/45 cocok (49%)**, peluang acak ±20%. Angka ini **terkontaminasi**: banyak soal cerita Bab 10 dan perkalian Bab 7 sudah "terbaca jawabannya" saat membaca soal. Bab 10 saja 9/13 cocok — kemungkinan besar karena soalnya mudah dihitung sekilas, bukan karena bentuk bocor.
- **Uji mekanis bersih (30 soal angka murni 5 opsi):**
  - Aturan "pilih nilai tengah": 5/30 (17%) — di bawah acak. Kunci sengaja menghindari tengah; bagus.
  - Aturan "kunci ada di pasangan opsi terdekat": 15/30 (50%) vs acak 40% — bocor tipis. Bila menebak satu dari pasangan itu, peluang ±25%, hampir sama dengan acak.

### Isyarat bocor terkuat
1. **Pasangan opsi berdekatan** (465/469, 24/25, 4/5, 2.760/2.772): kunci sering salah satu anggota pasangan karena pengecoh "lupa satu langkah" diletakkan dekat kunci. Lemah (50% vs 40%).
2. **Pencilan selalu salah** (3.150, 1.260, 730, 123, 1.400, ×10 di Bab 7): siswa bisa membuang satu opsi tanpa menghitung. Ini pengecoh "salah geser koma" yang sah, tetapi polanya berulang di Bab 7 (opsi bentuk ×10 muncul di P01, C01, C02, L01).
3. **Huruf/angka yang paling sering muncul** (K96, EV, 43 dan 85): pada 3 soal huruf/pasangan, opsi yang berbagi unsur terbanyak dengan opsi lain = kunci (3/3). Ini bocor nyata untuk soal huruf; pertimbangkan pengecoh yang juga berbagi unsur (mis. tambah "K48", "EW").
4. Nilai tengah dan angka bulat **tidak** bocor.
