# Tahap 4 · Kelompok 2 Verbal — Bab 3, Bab 4, Bab 5

Handbook TIU D'Ajiks Akademi · 2026-10-31 · subagen kelompok 2
Status: draf menunggu persetujuan Gusti. Tidak ada soal, opsi, atau kunci yang dibuat.

## Berkas
| Berkas | Isi |
|---|---|
| `src/13_bab03.html` | Bab 3 Analogi dan Hubungan Kata |
| `src/14_bab04.html` | Bab 4 Silogisme dan Ekuivalensi Pernyataan (empat gambar himpunan SVG sebaris) |
| `src/15_bab05.html` | Bab 5 Memperkuat dan Memperlemah Argumen |
| `scripts/cek_bab03_05.mjs` | status logika di narasi Bab 4 dihitung (dunia himpunan 2 dan 3 kelompok, dua bacaan "himpunan boleh kosong / pasti beranggota"; tabel kebenaran; setara; ingkaran) + ingkaran "lebih" Bab 5; setiap hasil dicek muncul persis di src |
| `src/build.py` (diubah) | menjalankan kedua script cek; kalimat logika `<span class="lg">` dan nama "jika–maka" tidak dihitung dalam batas "maka" ≤ 1 per subbagian. Bab baru terdaftar otomatis lewat urutan nama berkas |
| `src/00_head.html` (ditambah) | komponen `.himp` (empat kartu biru pucat, garis navy, titik anggota emas) di bagian "tambahan buku". Gaya global tidak diubah |

Hasil build: **galat 0** · kedua assert lulus · **siswa 29 hlm** (Bab 3 hlm 14–18, Bab 4 hlm 19–24, Bab 5 hlm 25–29) · **pengajar 35 hlm** (Bab 3 hlm 17–22, Bab 4 hlm 23–29, Bab 5 hlm 30–35). Kelompok 2 menambah 16 hlm siswa dan 19 hlm pengajar. Cinzel termuat.

## Subbagian
**Bab 3** (pita ±45 detik): Pertanyaan Pembuka · Pasangan Kata sebagai Hubungan Berarah (kalimat uji, tabel longgar lawan sempit) · Empat Sifat Pembeda (arah, tanda, tingkat, keharusan; + Menyempitkan dan Melonggarkan Kalimat Uji; + Keluarga Hubungan, enam pertanyaan) · Analogi Tiga Kata · Hubungan Kalimat (peta unsur dan label) · Langkah Penyelesaian Soal Analogi · Pemeriksaan Kunci · Kata yang Belum Dikenal (imbuhan) · Kekeliruan pada Soal Analogi (7 nama) · Contoh Soal dan Pembahasan · Latihan · Ringkasan.

**Bab 4** (pita ±60 detik): Pertanyaan Pembuka · Pernyataan Kategoris dan Gambar Himpunan (+ Catatan himpunan kosong dan arti "sebagian") · Pasti Benar, Pasti Salah, dan Tidak Dapat Dipastikan · Premis Berantai dan Premis Pengalih · Pernyataan Jika–Maka (satu keadaan terlarang, dua cara sah dan dua keliru) · Kesetaraan dan Ingkaran (konvers, kontraposisi; + Catatan arti "atau") · Kata Izin dan Kata Kejadian · Bentuk Soal Silogisme (+ Catatan pilihan "(1) atau (2) benar" di soal luar) · Langkah Penyelesaian Soal Silogisme · Kekeliruan pada Soal Silogisme (9 nama) · Contoh Soal dan Pembahasan · Latihan · Ringkasan.

**Bab 5** (pita ±75 detik): Pertanyaan Pembuka · Akibat Klaim · Perintah Memperkuat dan Memperlemah · Tiga Bentuk Klaim (+ Ingkaran "Lebih") · Klaim Sebab dan Kelompok Pembanding (nama guru "lupa pembanding") · Satu Fakta dan Dua Argumen (lima pilihan tetap; "salah satu cara" lawan "cara tunggal"; + Catatan) · Langkah Penyelesaian Soal Argumen · Kekeliruan pada Soal Argumen (8 nama) · Contoh Soal dan Pembahasan · Latihan · Ringkasan.

Setiap bab punya catatan pengajar (class "guru"): padanan nama kekeliruan ↔ kode Pilar 3, asal rancangan bab (slot T2-B yang dipilih/gugur), dan butir belum diverifikasi.

## Slot kosong (23 = 3 pembuka + 10 contoh + 10 latihan, sesuai T2-1b)
| Bab | Slot (target detik) |
|---|---|
| 3 | P01 pasangan, sifat tanda (45) · C01 tingkat (45) · C02 tiga kata (60) · C03 hubungan kalimat pola sama (75) · L01 arah (40) · L02 keharusan (45) · L03 hubungan kalimat benda buatan (60); latihan 2 mnt 25 dtk |
| 4 | P01 tiga premis + pengalih (75) · C01 premis berlawanan kenyataan (60) · C02 menilai dua kesimpulan (60) · C03 rantai bersyarat + "atau" (90) · C04 setara (45) · L01 bersyarat satu langkah (45) · L02 kata izin (60) · L03 ingkaran (45) · L04 kunci "tidak dapat disimpulkan" (60, Putusan T2-7(5)); latihan 3 mnt 30 dtk |
| 5 | P01 klaim urutan, memperlemah (60) · C01 dua argumen (75) · C02 klaim umum, memperlemah (45) · C03 sebab dua kelompok, memperkuat (75) · L01 cara tunggal, memperlemah (45) · L02 dua argumen, kunci "tidak relevan" (75) · L03 sebab, penyebab dihentikan (75); latihan 3 mnt 15 dtk |

Latihan dipilih dari slot T2-B: Bab 3 L1, L4, L6 · Bab 4 L7, L4, L9, L11 · Bab 5 L5, L2, L7 (alasan di catatan pengajar tiap bab). Spek siswa tidak menyebut kunci (mis. B04-L04).

## Hasil cek
- `python3 src/build.py`: galat 0 (frasa terlarang, "maka/karena itu" ≤ 1 per subbagian, istilah dapur, kode, nama tryout, sisa elemen guru, target kartu = data-target).
- `scripts/cek_bab03_05.mjs`: lulus; status tiap kesimpulan Bab 4 sama di kedua bacaan himpunan (kecuali Catatan "sebagian B adalah A", yang memang bergantung bacaan dan ditulis begitu).
- Cek mata lembar kontak (siswa hlm 14–29 pada 70 dpi, pengajar hlm 16–35): tidak ada luberan atau teks terpotong. Label "B" pada gambar "Semua A adalah B" semula menempel garis lingkaran, sudah dipindah ke dalam.
- `impeccable detect`: tiga temuan lama saja (kontras teks sampul terkunci, font Plus Jakarta Sans yang disetujui, kontras abu teks tempat kosong dari kelompok 1). Tidak ada temuan baru dari kelompok 2.

## Belum diverifikasi (ditandai di buku atau catatan pengajar)
Kebiasaan soal resmi membaca "sebagian", himpunan kosong, dan "atau" · cara soal luar menilai fakta yang menyentuh dua argumen · sebaran bentuk argumen hari H (bukti 2 soal) · makna kata pasangan penjelas dan tabel imbuhan Bab 3 (dicek KBBI daring saat T5, Putusan T2-8).

## Perlu putusan Gusti (satu per respons)
1. **Isi kelompok 2 (Bab 3–5).** Rekomendasi: setujui.
2. **Kata "satu-satunya".** Daftar frasa terlarang build menolak kata ini di seluruh berkas, padahal konsep Bab 5 (lawan "salah satu cara") dan soal B05-L01 nanti membutuhkannya. Narasi kini memakai "cara tunggal". Rekomendasi: kata itu tetap dilarang di narasi dan pembahasan, tetapi boleh di dalam teks soal (dikecualikan lewat penanda saat T5).
3. **Contoh 3 Bab 5 dekat TO P1 no. 31** (sama-sama menutup penjelasan lain; susunan data beda: dua kelompok lawan sebelum–sesudah). Rekomendasi: pertahankan; bila dinilai terlalu dekat, ganti "makin besar takaran, makin besar akibat".
4. **Soal asumsi** (rekomendasi T2-B: satu kotak Catatan Bab 5) tidak dimuat karena belum tegas diputuskan dan belum terlihat di bahan hari H. Rekomendasi: tetap tidak dimuat.
5. **Kotak Catatan pilihan "(1) atau (2) benar"** di Bab 4 dimuat mengikuti rekomendasi T2-B butir T2-1 (bunyi engine v0.4.3). Rekomendasi: setujui.
