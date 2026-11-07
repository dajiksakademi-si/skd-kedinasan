# Cek Buta 2 — Kelompok 3 Numerik (Bab 6–10), 22 soal

Sumber satu-satunya: `scripts/data/numerik_b06_10_buta2.json`. Tidak membuka berkas kunci, src, atau script lain.
Urutan kerja: Tugas B (tebak dari opsi) ditulis lebih dulu ke scratchpad, sesudah itu baru Tugas A (jawab dari isi soal, dicek dengan python).

## Tabel per soal

| id | jawaban A | yakin | catatan | tebakan B | isyarat B |
|---|---|---|---|---|---|
| B06-P01 | D 2.700 | yakin | 647×87:21 = 2.680,4; selisih ke 2.700 cuma 20, ke opsi lain ≥280. Bisa dikerjakan dalam 30 dtk | C ✗ | nilai tengah (opsi berjarak rata, tidak ada isyarat) |
| B06-C03 | A 6.237 | yakin | 36%×175 = 63, jadi 63 + 63×98 = 63×99. Cepat kalau 63 terlihat; 45 dtk layak | C ✗ | paling bulat + pasangan terdekat |
| B07-P01 | C | yakin | 27×56 = 36×42 = 1.512. Pasangan D 1.519/1.518 selisihnya 1 (pengecoh bagus) | C ✓ | tebakan lemah ("paling rapi") |
| B07-C01 | A | yakin | 34×260 = 26×340 = 8.840 (tukar digit bolak-balik). Opsi B dan D juga bertukar digit, jadi bentuknya tidak membocorkan | C ✗ | satu-satunya tanpa tukar digit |
| B07-C02 | E | yakin | 1.188:33 = 792:22 = 36 | E ✓ | pembagi 33 dan 22 kelipatan 11, kelihatan "rapi" |
| B07-C03 | A | yakin | 72:8×6 = 54 = 9×12:2. D (56/54) jadi cerminan B (54/56); C tampil beda bentuk (":4") | C ✗ | pencilan bentuk |
| B07-L01 | B | yakin | 35×48 = 70×24 = 1.680 | B ✓ | **bocor**: B satu-satunya pasangan "kali 2, bagi 2" yang tepat. Opsi lain nyaris (78 vs 80, 62 vs 60, 25 vs 26, 36 vs 35), jadi kunci terbaca tanpa menghitung |
| B08-C03 | C 244 | yakin | aturan ×3 − 2 (82×3 − 2) | D ✗ | tengah gugus 244/246/248 |
| B08-C04 | A K96 | yakin | huruf 2,5,10,17,26 (n²+1) → 37 → putar alfabet → K; angka ×2 → 96. Putaran alfabet tidak disebut di soal, tetapi lazim | A ✓ | **bocor sedang**: tiga opsi ber-96 (J, K, L); kunci huruf tengah gugus |
| B08-L02 | C 315 | yakin | beda 9 tetap; 35 × 9 = 315 | D ✗ | 324 = 18², pasangan 324/325 |
| B08-L03 | A EV | yakin | huruf depan +3,+4,+5,+6, huruf belakang −3,−4,−5,−6 (dua kali putar alfabet). Cara lain: urutan huruf tiap pasangan berjumlah 27. FU, DW, BY juga berjumlah 27, jadi cara jumlah saja tidak cukup; desainnya bagus | D ✗ | EU berbagi huruf terbanyak |
| B08-L04 | E 1.764 | yakin | Un = n³ + 3n, cocok di 5 titik; n=12 → 1.728 + 36. 90 dtk cukup ketat, tetapi layak (536 dekat 512 = 8³) | E ✓ | 1.764 berbagi "17" dan "64" dengan opsi lain; 1.728 = 12³ sebagai pengecoh |
| B09-P01 | A 24 | yakin | X = a(a − b) = 8×3 | D ✗ | relasi antaropsi (24+40 = 64) |
| B09-C02 | C 24 | yakin | X = atas² − bawah² (16−1, 9−16) → 49 − 25 | C ✓ | nilai tengah |
| B09-C03 | D 51 | yakin | sel = c² + 3r; r=5, c=6 → 36 + 15 = 51. Hanya satu arah R/C yang cocok | C ✗ | 42 berbagi digit |
| B09-C04 | C 43 dan 85 | yakin | baris 1: beda 4,6,8,10,12 → 43; baris 2 = 2×baris 1 − 1 → 85 | C ✓ | **bocor**: opsi gabungan, kunci berbagi separuh dengan B (85) dan D (43) |
| B09-L01 | B 75 | yakin | kanan = 4×kiri − 5 | C ✗ | nilai tengah + pasangan 79/80 |
| B09-L04 | B 21 | yakin | X = a² − 2b → 25 − 4. Pengecoh 29 = tanda salah | C ✗ | tengah deret 21/25/29 |
| B10-C07 | D 35% | yakin | 200.000 × 0,6 × 0,9 = 108.000; untung 28.000 : 80.000. 28% = pengecoh "lupa membagi harga beli" | C ✗ | nilai tengah |
| B10-L02 | B 30 | yakin | 180 km : 6 jam. 40 = pengecoh rata-rata biasa | C ✗ | 40 pencilan (bukan kelipatan 15) |
| B10-L04 | C Rp2.850.000 | yakin | neto 190 kg × 15.000; ongkos ditanggung pemasok, jadi tidak dihitung | C ✓ | nilai tengah |
| B10-L05 | C Rp2.760.000 | yakin | 2.400.000 + 10% × 1,5 × 2.400.000 | D ✗ | tengah gugus 2.760/2.772/2.784 |

Semua soal: satu kunci, tidak ada opsi lain yang ikut benar, tidak ada yang kurang data, semua layak dalam target_detik untuk siswa SMA cakap (yang paling ketat B08-L04, 90 dtk).

## Soal bermasalah

1. **B07-L01 (bocor bentuk, kuat).** Kunci B satu-satunya pasangan kali-2/bagi-2 yang tepat; empat opsi lain dibuat "nyaris" dengan pola yang sama. Siswa cukup memeriksa pola, tanpa menghitung. Saran: buat minimal satu pengecoh yang juga kali-2/bagi-2 tepat, tetapi hasilnya tidak sama (misal faktor 3 dan 2), atau buat kunci yang bukan pola kali-2.
2. **B09-C04 (bocor gabungan).** "43 dan 85" berbagi separuh dengan B dan D, jadi aturan "opsi paling berbagi unsur" langsung menunjuknya. Saran: ganti satu pengecoh supaya tiap separuh muncul setara (misal 43 muncul di 2 opsi selain kunci, 85 juga di 2).
3. **B08-C04 (bocor sedang).** Tiga opsi ber-96 (J/K/L), kunci huruf tengah. Saran: pecah gugus, misal L72 atau J48, supaya kunci tidak jadi pusat.
4. **Catatan kecil:** B08-C04 dan B08-L03 mengandalkan putaran alfabet tanpa disebut di soal. Ini wajar di TIU, tetapi perlu ditegaskan di pembahasan.
5. **Sebaran kunci 22 soal:** A 6, B 4, C 7, D 3, E 2. E kurang. Ini bukan paket, tetapi kalau handbook ingin seimbang, perlu digeser.

## Skor penebak bentuk

| Penebak | Kena | Peluang acak |
|---|---|---|
| Tebakan bebas (22 soal) | 8/22 = 36% | 20% (4,4 soal) |
| Nilai tengah (14 soal opsi angka) | 5/14 = 36% | 20% |
| Anggota pasangan terdekat (14 soal) | 5/14 = 36% | 40% (2 dari 5) |
| Opsi paling berbagi unsur (22 soal, seri dibagi rata) | 6,33/22 = 29% | 20% |

Catatan: opsi angka selalu urut naik, jadi "nilai tengah" selalu sama dengan C. Kena 5/14 ini datang dari kunci yang memang di tengah (B08-C03, B08-L02, B09-C02, B10-L04, B10-L05). Pasangan terdekat tidak membocorkan. Dari 8 tebakan bebas yang kena, yang benar-benar didorong isyarat kuat hanya B07-L01, B09-C04, dan B08-C04; sisanya kebetulan atau isyarat lemah.

## Isyarat bocor terkuat

1. B07-L01: pola "kali 2, bagi 2" hanya tepat di kunci (paling kuat; terbaca dalam hitungan detik).
2. B09-C04: kunci opsi gabungan menjadi irisan dua pengecoh.
3. B08-C04: kunci jadi pusat gugus tiga opsi (J/K/L96).
4. Kecenderungan ringan: kunci di posisi tengah opsi urut (5/14). Masih di bawah taraf bocor, tetapi patut dipantau di kelompok lain.
