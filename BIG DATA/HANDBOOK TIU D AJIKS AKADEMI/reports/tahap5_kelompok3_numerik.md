# Tahap 5 · Kelompok 3 Numerik — Bab 6, 7, 8, 9, 10 (produksi soal)

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen tiu-t5-numerik
Status: 45 soal ditulis dan dipasang (pembuka 5, contoh 21, latihan 19), pembahasan 7 langkah untuk 26 soal pembuka/contoh, build galat 0. **Cek buta belum dilakukan** (sengaja; berkas `scripts/data/numerik_b06_10_buta.json` siap untuk pemeriksa terpisah). Contoh 1 Bab 6 (prototipe T3-f) tidak diubah.

## Berkas
| Berkas | Status | Isi |
|---|---|---|
| `scripts/data/numerik_b06_10.json` | baru | satu sumber teks 45 soal: soal, opsi, kunci, kode per pilihan, nama kekeliruan bahasa guru, kalimat penentu, alasan kunci, kerangka, TO terdekat, catatan reviu, pembahasan (pembuka + contoh); field `bukti` ditulis script. Pecahan ditulis `{a/b}` |
| `scripts/data/numerik_b06_10_buta.json` | baru | id, bab, target, soal (tabel dirender dari model), opsi — tanpa kunci/kode/pembahasan |
| `scripts/numerik/alat.mjs` | baru (128 baris) | pecahan tepat BigInt, pembaca ungkapan hitung Indonesia (`1.188`, `0,75`, `36%`, `3{2/5}`), format angka/rupiah/jam-menit/pukul, pencari rumus lain ≤ 3 operasi (sama persis dengan TO Paket 1 `ekspresi()`: daun a, b, 1, 2, 3; + − × ^), aturan lain deret (aritmetika, geometri, kU + c, selisih bertingkat ≤ 3, berselang, rekursif dua suku), Lagrange + derajat polinom, uji bentuk opsi angka |
| `scripts/numerik/model_a.mjs` | baru (154 baris) | model Bab 6–7: setiap pilihan salah = ungkapan jalur kesalahan yang dievaluasi tepat; pasangan: kedua ruas setiap pilihan dihitung, tepat satu sama (atau tepat satu TIDAK sama), lintCermin |
| `scripts/numerik/model_b.mjs` | baru (254 baris) | model Bab 8–10: barisan (derajat, jarak nomor tak berpola, rumus lain), tabel (rumus lain ≤ 3 operasi di semua petak terisi), deret celah (isian −50…100 dicoba), X-Y (skor frekuensi, tanpa tertukar/cermin tanda), soal cerita (jalur dihitung, uji masuk akal) |
| `scripts/soal_numerik.mjs` | baru (218 baris) | pemeriksa + perender pola `soal_verbal.mjs`; `--tulis` menulis blok src, bukti, berkas buta; tanpa argumen = src wajib sama dengan hasil render |
| `src/16_bab06.html` … `20_bab10.html` | diubah | 45 slot kosong → blok `<!--Bxx-yyy:mulai-->`; pembuka dua blok (T5-4), di Bab 6 pembahasan pembuka ditaruh sebelum `<div class="utuh">` agar Contoh 1 tetap utuh satu halaman |
| `src/00_head.html` | ditambah | `.tb.pola` (tabel soal: `datar` dua baris berlabel, `petak` kisi 3 × 3 / kotak / X-Y, `td.x`, `td.ac` angka acuan) |
| `src/build.py` | diubah 1 baris | menjalankan `soal_numerik.mjs` |
| `scripts/cek_lampiran.mjs` | diubah | kolom L6 (pembuat, bukti, kerangka, TO terdekat) untuk 45 soal numerik dibaca dari data; `src/96_lampiran_l6.html` ditulis ulang `--tulis` |

## Pemeriksaan mesin (`soal_numerik.mjs`, 5.522 butir assert)
1. Teks pilihan, kunci, dan kode di data = hasil model (angka tidak ditulis tangan). Angka cerita/ungkapan di teks soal dicocokkan dengan model; tabel dan deret dirender dari model.
2. Kunci tunggal per jenis (lihat tabel di bawah).
3. Bentuk: opsi angka urut naik; kunci bukan pencilan (jarak ke opsi terdekat ≤ median jarak bertetangga, engine v0.4.3); ciri kunci (angka satuan, genap-ganjil, banyak angka, tanda, kelipatan 5) tidak menyendiri; sisa 9 kunci tunggal di soal hitung tepat C02.
4. Pembahasan: **338 rantai hitung** (`a × b = c = …`) dihitung ulang dengan pecahan tepat; setiap angka lain wajib berasal dari soal, pilihan, tabel, atau daftar angka yang dihitung model.
5. Bahasa: larangan proyek + "maka"/"karena itu" (nol di teks numerik, karena satu subbagian Contoh memuat banyak pembahasan), istilah dapur, kode di teks siswa; larangan build juga dicek di catatan pengajar. kata terlarang "satu-satunya" 0 kemunculan.

## Sebaran kunci
Urutan buku (Contoh 1 Bab 6 = C ikut dihitung):
`D C E A B B D A · C A E A C A A · B D E C A B B A E · A E C D C B D C B · E E B E D D E C D B D C C`
A 9 · B 9 · C 10 · D 9 · E 9; tidak ada huruf sama > 2 berturut. P vs Q berkunci B (C04) dan A (L03), dihitung dalam A–D. Catatan: Bab 10 tanpa kunci A, Bab 7 tanpa kunci B/D (keseimbangan diukur per kelompok, seperti verbal).

## Bukti kunci tunggal per soal
| ID | Jenis | Kunci | Kode pilihan salah | Bukti kunci tunggal |
|---|---|---|---|---|
| B06-P01 | HIT perkiraan | D 2.700 | A J-BULAT · B J-BULAT · C J-BULAT · E J-BULAT | nilai tepat 56.289 : 21 = 2.680,43 terdekat ke D; tiap jalur pembulatan menunjuk pilihannya; jarak kunci 300 ≤ median 300 |
| B06-C02 | HIT ekspresi | E 130 | A J-URUTAN · B J-URUTAN · C J-SEDERHANA · D J-SEDERHANA | pecahan tepat; tiap jalur salah dievaluasi; sisa bagi 9 kunci tunggal; jarak kunci 12 ≤ median 15 |
| B06-C03 | HIT tukarPersen + distributif | A 6.237 | B J-BASIS · C J-LANGKAH · D J-TANDA · E J-NOL | pecahan tepat: 36% × 175 = 63, 63 + 63 × 98 = 63 × 99; jarak kunci 48 ≤ median 55.5 |
| B06-C04 | PKU dua bilangan | B P < Q | A J-BULAT · C J-BULAT · D J-TENTU | P = 9.991, Q = 9.999 dihitung tepat |
| B06-L01 | HIT ekspresi bertanda | B −29 | A J-TANDA · C J-URUTAN · D J-LANGKAH · E J-TANDA | pecahan tepat; tiap jalur dievaluasi; jarak kunci 12 ≤ median 12 |
| B06-L02 | HIT perkiraan | D 3.200 | A J-NOL · B J-LANGKAH · C J-SEDERHANA · E J-BULAT | nilai tepat 3.179,2 terdekat ke D; jarak kunci 800 ≤ median 825 |
| B06-L03 | PKU berpeubah | A P > Q | B J-TANDA · C J-BATAS · D J-TENTU | semua x bulat 7–10 dihitung: P > Q di keempatnya; P − Q = (x − 2)(x − 6) |
| B07-P01 | PAS kali | C 27 × 56 dan 36 × 42 | A J-SISI · B J-SISI · D J-SISI · E J-NOL | kedua ruas tiap pilihan dihitung tepat |
| B07-C01 | PAS kali | A 34 × 260 dan 26 × 340 | B J-CERMIN · C J-SISI · D J-CERMIN · E J-NOL | kedua ruas tiap pilihan dihitung tepat; lintCermin |
| B07-C02 | PAS bagi | E 1.188 : 33 dan 792 : 22 | A J-SISI · B J-SEDERHANA · C J-SISI · D J-NOL | kedua ruas tiap pilihan dihitung tepat; kali silang kunci |
| B07-C03 | PAS campuran | A 72 : 8 × 6 dan 9 × 12 : 2 | B J-SISI · C J-URUTAN · D J-NOL · E J-SISI | kedua ruas dihitung kiri ke kanan; jalur urutan keliru diuji |
| B07-L01 | PAS kali | C 35 × 48 dan 70 × 24 | A J-SISI · B J-SISI · D J-SISI · E J-NOL | kedua ruas tiap pilihan dihitung tepat |
| B07-L02 | PAS TIDAK | A 1,25 × 56 dan {5/8} × 120 | B J-NOL · C J-SEDERHANA · D J-SEDERHANA · E J-PERINTAH | kedua ruas tiap pilihan dihitung tepat; tepat satu pasangan tidak sama |
| B07-L03 | PAS bertukar angka | A 24 × 84 dan 42 × 48 | B J-CERMIN · C J-SISI · D J-CERMIN · E J-SISI | kedua ruas dihitung tepat + uji a·c = b·d |
| B08-P01 | SUK linear | B 397 | A J-NOMOR · C J-KONST · D J-TANDA · E J-NOMOR | polinom derajat 1 tepat di 4 titik; rumus lain ≤ 3 operasi diperiksa; jarak kunci 3 ≤ median 3 |
| B08-C01 | SUK linear | D 47 | A J-TANDA · B J-NOMOR · C J-KONST · E J-NOMOR | barisan linear; nomor dari nilai dihitung tepat; jarak kunci 1 ≤ median 1 |
| B08-C02 | SUK kuadrat | E 469 | A J-RATA · B J-RATA · C J-NOMOR · D J-KONST | derajat 2 (selisih tingkat dua tetap 1); linear gagal; rumus lain ≤ 3 operasi diperiksa; jarak kunci 4 ≤ median 55 |
| B08-C03 | SUK deret sebaris | C 244 | A J-TIGA · B J-RATA · D J-LANGKAH · E J-NOMOR | aturan kali 3 kurang 2 cocok di 4 langkah; aturan lain (aritmetika, geometri, kU + c, selisih bertingkat ≤ 3, berselang, rekursif dua suku) hanya memberi 244; jarak kunci 2 ≤ median 40 |
| B08-C04 | SUK huruf-angka | A K96 | B J-NOMOR · C J-RATA · D J-TIGA · E J-NOMOR | huruf: nomor 2, 5, 10, 17, 26 selisih 3, 5, 7, 9 (atau n² + 1) → 37 − 26 = 11; angka × 2 |
| B08-L01 | SUK deret celah | B 9 | A J-RATA · C J-RATA · D J-NOMOR · E J-TIGA | isian −50…100 dicoba: hanya 9 membuat deret mengikuti aturan sederhana; jarak kunci 1 ≤ median 1.5 |
| B08-L02 | SUK linear | B 315 | A J-TANDA · C J-NOMOR · D J-PENGALIH · E J-NOMOR | Up − Uq = 9 × (75 − 40); bilangan tetap saling menghapus; jarak kunci 9 ≤ median 25.5 |
| B08-L03 | SUK huruf cermin | A EV | B J-NOMOR · C J-NOMOR · D J-NOMOR · E J-TIGA | huruf pertama 13, 16, 20, 25 selisih 3, 4, 5 → 31 − 26 = 5 (E); huruf kedua = 27 − nomor huruf pertama (V) |
| B08-L04 | SUK pangkat tiga | E 1.764 | A J-NOMOR · B J-RATA · C J-TIGA · D J-KONST | derajat 3 tepat di 5 titik; kuadrat gagal; sidik bagi n: n² + 3; jarak kunci 36 ≤ median 98 |
| B09-P01 | TBD 3 × 3 per baris | A 24 | B J-TIGA · C J-URUTAN · D J-LANGKAH · E J-TANDA | rumus lain ≤ 3 operasi yang cocok di 2 baris: hanya memberi 24; jarak kunci 16 ≤ median 17.5 |
| B09-C01 | TBD dua kolom | E 178 | A J-RATA · B J-NOMOR · C J-RATA · D J-KONST | derajat 2 di 4 baris; rumus lain ≤ 3 operasi; jarak kunci 9 ≤ median 9 |
| B09-C02 | TBD 3 × 3 per kolom | C 24 | A J-LANGKAH · B J-URUTAN · D J-TIGA · E J-TANDA | rumus lain ≤ 3 operasi yang cocok di 2 kolom: hanya memberi 24; jarak kunci 7 ≤ median 9.5 |
| B09-C03 | TBD model kotak beracuan | D 51 | A J-RATA · B J-LANGKAH · C J-TIGA · E J-URUTAN | uji pemisahan + rumus lain ≤ 3 operasi atas (acuan baris, acuan kolom); jarak kunci 9 ≤ median 9 |
| B09-C04 | TBD kotak X-Y | C 43 dan 85 | A J-RATA · B J-LANGKAH · D J-NOMOR · E J-TIGA | atas: selisih 4, 6, 8, 10 (aturan lain hanya 43); bawah = 2 × atas − 1 (rumus lain hanya 85); skor frekuensi |
| B09-L01 | TBD dua kolom | B 75 | A J-NOMOR · C J-KONST · D J-TANDA · E J-NOMOR | linear di 4 baris; rumus lain ≤ 3 operasi; jarak kunci 4 ≤ median 5 |
| B09-L02 | TBD dua kolom | D 231 | A J-TIGA · B J-NOMOR · C J-RATA · E J-KONST | kanan : kiri = 2 × kiri − 1; rumus lain ≤ 3 operasi; jarak kunci 11 ≤ median 20.5 |
| B09-L03 | TBD model kotak tetangga | C 61 | A J-TIGA · B J-RATA · D J-LANGKAH · E J-TANDA | 8 petak isian dicek; rumus lain ≤ 3 operasi atas (kiri, atas); jarak kunci 2 ≤ median 7 |
| B09-L04 | TBD 3 × 3 per baris | B 21 | A J-TIGA · C J-LANGKAH · D J-TANDA · E J-URUTAN | rumus lain ≤ 3 operasi yang cocok di 2 baris: hanya memberi 21; jarak kunci 4 ≤ median 10.5 |
| B10-P01 | CRT kerja bersama | E 4 jam 40 menit | A J-LANGKAH · B J-ASUMSI · C J-SATUAN · D J-SATUAN | kapasitas 18 bagian (KPK 6, 9); tahap 1: 10 bagian, tahap 2: 8 bagian : 3; jarak kunci 0.06666666666666732 ≤ median 0.4999999999999998 |
| B10-C01 | CRT persen kapasitas | E 540 | A J-NOL · B J-PENGALIH · C J-BASIS · D J-BASIS | 30% = 360 liter → kapasitas 1.200 liter; tambahan 45% × 1.200; jarak kunci 54 ≤ median 103.5 |
| B10-C02 | CRT berbalik nilai | B 5 | A J-SEARAH · C J-LANGKAH · D J-ASUMSI · E J-LANGKAH | pekerja-hari tetap: 560; sisa 400 dalam 16 hari; jarak kunci 1 ≤ median 5 |
| B10-C03 | CRT keran | E 12 jam | A J-TANDA · B J-ASUMSI · C J-ASUMSI · D J-LANGKAH | kapasitas 30 bagian; tahap 1 laju 5 + 3 − 3; tahap 2 laju 5 − 3; jarak kunci 2 ≤ median 2.5 |
| B10-C04 | CRT laju relatif | D 07.50 | A J-LANGKAH · B J-TANDA · C J-SATUAN · E J-LAJU | jarak awal 18 × 20 : 60 = 6 km; laju relatif 42 − 18 = 24 km/jam; jarak kunci 5 ≤ median 5.5 |
| B10-C05 | CRT kereta | D 60 | A J-TANDA · B J-LANGKAH · C J-SATUAN · E J-ASUMSI | 90 km/jam = 25 m/detik; jarak = 1.200 + 300; jarak kunci 10 ≤ median 11 |
| B10-C06 | CRT umur | E 30 | A J-RASIO · B J-BASIS · C J-LANGKAH · D J-LANGKAH | selisih tetap: 3 : 2 = 6 : 4 dan 7 : 5 → 1 bagian berubah = 5 tahun; jarak kunci 5 ≤ median 5 |
| B10-C07 | CRT persen dagang | C 35% | A J-BASIS · B J-BASIS · D J-LANGKAH · E J-PENGALIH | jual 200.000 × 60% × 90% = 108.000; untung 28.000 dari 80.000; jarak kunci 10 ≤ median 13 |
| B10-L01 | CRT perbandingan | D 120 | A J-RASIO · B J-LANGKAH · C J-BASIS · E J-BASIS | 2 bagian = 30 → 1 bagian 15; jumlah 8 bagian; jarak kunci 40 ≤ median 53.5 |
| B10-L02 | CRT kecepatan rata-rata | B 30 | A J-LANGKAH · C J-LAJU · D J-LAJU · E J-LANGKAH | total jarak 180 km : total waktu 4,5 + 1,5 jam; jarak kunci 10 ≤ median 17.5 |
| B10-L03 | CRT arus sungai | D 25 | A J-PERINTAH · B J-TANDA · C J-LAJU · E J-LANGKAH | hilir 30 = perahu + arus, hulu 20 = perahu − arus; jarak kunci 1 ≤ median 5 |
| B10-L04 | CRT bruto-neto-tara | C Rp2.850.000 | A J-LANGKAH · B J-SATUAN · D J-BASIS · E J-PENGALIH | neto 38 kg per peti × 5 peti × Rp15.000; jarak kunci 150000 ≤ median 187500 |
| B10-L05 | CRT bunga tunggal | C Rp2.760.000 | A J-LANGKAH · B J-LANGKAH · D J-BASIS · E J-SATUAN | bunga tunggal 2.400.000 × 10% × 18 : 12; jarak kunci 12000 ≤ median 66000 |

## Penyimpangan dari catatan slot (semua tercatat di `catatan_reviu` tiap butir, tampil di edisi pengajar)
- **J-NOL dilepas** di B06-P01, B06-C02, B10-C05: pilihan salah nol selalu sepuluh kali kunci, sehingga menjadi pencilan dan melanggar jarak pilihan slot (12–20%). J-NOL tetap ada di B06-C03, B06-L02 (rujukan Latihan A Bab 19), B07-P01, C01, C02, C03, L01, L02, B10-C01.
- **Kode diganti karena jalurnya tidak wajar**: J-SEDERHANA/J-BASIS di bentuk hitung murni (B06-P01, C02), J-PENGALIH tanpa cerita (B06-C03 → J-LANGKAH), J-SEDERHANA → J-URUTAN (B07-C03), J-LANGKAH → J-NOMOR selisih mentah (B08-L02), J-URUTAN → J-LANGKAH + J-TANDA pada aturan tambah-kurang (B09-L03), J-SATUAN pada soal satu satuan (B10-L02, L03), J-TANDA "lalu/lagi" memberi umur negatif (B10-C06), J-LAJU memberi pilihan berbentuk tunggal (B10-P01, C03, C04).
- **B06-L03 (T4-13)**: kunci hubungan pasti untuk setiap x; pilihan salah J-TENTU (D), J-BATAS (ujung x = 6 → P = Q), J-TANDA (−9 dibaca +9 → P < Q), bukan J-MUNGKIN ×3, sebab mencoba satu x di dalam rentang selalu memberi hubungan yang benar.
- **B09-C04**: lima kolom diketahui, bukan empat (dengan empat kolom aturan rekursif lain memberi X = 33 = salah satu pilihan; pelajaran TO P1 no. 39).
- **B08-C01**: angka diganti (nilai 180, kunci 47) agar kunci bukan kelipatan 5 tunggal.

## Halaman
Siswa **179 hlm** (sebelumnya 146; Bab 6–10 = hlm 53–113), pengajar **193 hlm** (sebelumnya 171); sesudah revisi cek buta 1: siswa 179, pengajar 194. `pdfinfo` setelah build terakhir.

## Hasil cek
- `python3 src/build.py`: **galat 0**; semua script lulus (cek_bab01_02, cek_bab03_05, soal_verbal, **soal_numerik**, cek_bab06_10 158 angka + Contoh 1 = prototipe, cek_bab11_13, cek_bab14_18, cek_bab19 852 butir dengan rujukan Latihan A B06-L02/B07-L01/B08-L04/B10-L04 dari blok terisi, cek_lampiran 553 butir, L6 165 butir). Slot kosong tersisa 96 (bab lain).
- Rujukan Latihan A Bab 19 ke soal numerik terpenuhi: B06-L02 J-NOL (A), B07-L01 J-SISI (A, B), B08-L04 J-KONST (D), B10-L04 J-BASIS (D).

## Cek mata (siswa hlm 53–113, lembar kontak 45 dpi + perbesaran; PNG di scratchpad `num/png/`)
- Ditemukan dan diperbaiki: tabel soal (kisi 3 × 3, kotak acuan, X-Y) tampil sempit di dalam bingkai selebar halaman — penyebabnya bentrok nama kelas `.kisi` dengan hiasan pita bab (`display:grid`). Kelas diganti `.petak`; tabel kini terpusat dan berbingkai pas (dicek ulang hlm 94).
- Kata terlarang "satu-satunya" di catatan pengajar B07-C01 diganti; pemeriksa kini juga memeriksa catatan pengajar.
- Diterima (tidak diubah): kartu soal Contoh kadang di kaki halaman dan pembahasannya mulai di halaman berikut; di beberapa contoh Bab 10 kotak Jawaban + Ilustrasi berpindah ke puncak halaman berikut. Setiap kotak tetap utuh (tidak ada kotak terbelah atau judul yatim). Ruang kosong ±⅓ halaman sesudah Pembahasan Pertanyaan Pembuka Bab 6 (hlm 58) karena Contoh 1 dijaga utuh (T4-14), dan sesudah ringkasan bab (bab baru selalu halaman baru).

## Belum diverifikasi / risiko
- Cek buta belum dilakukan (wajib subagen baru, hanya membaca `numerik_b06_10_buta.json`).
- B06-C03: sisa 9 tidak memisahkan 6.300 dan 6.363 dari kunci (selisih kelipatan 9); pembahasan menyatakannya dan memakai cara lain.
- B10-C07: potongan diskon pertama kebetulan Rp80.000 = harga beli; tidak menghasilkan jalur salah yang ada di pilihan, tetapi bisa membingungkan pembaca.
- B06-P01: keempat pilihan salah berkode J-BULAT (empat jalur pembulatan berbeda).
- Target waktu tetap dari slot (belum dikalibrasi tryout).

## BUTIR PUTUSAN ANTRE (urut prioritas, satu per respons)
1. **Isi 45 soal numerik Bab 6–10** (setelah cek buta). Rekomendasi: jalankan cek buta dulu, lalu setujui.
2. **Penyimpangan kode dari catatan slot** (daftar di atas; terutama J-NOL dilepas di tiga soal karena menjadi pencilan). Rekomendasi: terima, seperti T5-5 untuk verbal.
3. **B06-P01 empat pilihan salah satu kode (J-BULAT)**. Rekomendasi: terima — soal pembuka subbagian pembulatan; keempat jalur dinamai berbeda (pembagi salah arah, ketiga naik, kedua faktor turun, kedua faktor naik).
4. **Sebaran kunci per bab** (Bab 10 tanpa kunci A; Bab 7 tanpa B/D; kelompok seimbang 9/9/10/9/9). Rekomendasi: terima; keseimbangan per kelompok sama dengan aturan verbal.
5. **B10-C07 kebetulan potongan 40% = harga beli (Rp80.000)**. Rekomendasi: biarkan; bila Gusti ingin bersih, ganti harga pasang menjadi Rp210.000 (dihitung ulang script).
6. **Tata letak**: kotak Jawaban/Ilustrasi yang pindah ke halaman berikut di beberapa contoh Bab 10. Rekomendasi: terima sampai T7 (penataan akhir), seperti T4-36/T4-43.

## Revisi pasca cek buta 1 (2026-11-01)

Dasar: `reports/tahap5_kelompok3_numerik_buta.md` (jawaban isi 44/45 = kunci; satu selisih = cacat ekspor berkas buta). 22 soal diubah; berkas cek buta ulang khusus soal yang diubah: `scripts/data/numerik_b06_10_buta2.json` (format sama). `numerik_b06_10_buta.json` juga ditulis ulang dengan ekspor yang sudah diperbaiki.

**Perbaikan alat**
- Ekspor buta: pecahan campuran ditulis `3 2/5`, pecahan `11/5`, pangkat `x²`, entitas HTML dibuka (`<`), tag dibuang. Di PDF, B06-C02 (3⅖) dan B06-L03 (x², 6 < x < 11) sudah tampil benar (dicek mata hlm 60 dan 63, perbesaran 160 dpi); cacat hanya ada di berkas buta.
- Pemeriksa baru di `alat.mjs`/`soal_numerik.mjs`: (a) **tidak ada pilihan terpencil** — jarak setiap pilihan ke tetangga terdekatnya ≤ 3 × median jarak bertetangga; (b) **pilihan huruf dan pasangan nilai**: kunci tidak boleh menjadi simpul tunggal (pilihan yang berbagi unsur, per posisi, dengan pilihan lain terbanyak); (c) larangan kata build ikut diperiksa di catatan pengajar.
- Waktu B08-L04 tetap 90 detik: 105 detik melampaui rata-rata TIU ±86 detik per soal (Putusan 5) dan pita Bab 8 (±60 detik). Tabelnya dipermudah: nomor 1, 2, 4, 5, 8 sehingga nilai : nomor = 4, 7, 19, 28, 67 (= n² + 3) terbaca langsung.
- B09-P01 dan B09-L04 kini memuat tiga baris lengkap; rumus lain ≤ 3 operasi yang cocok di ketiga baris hanya memberi kunci.

| ID | Alasan | Kunci lama → baru | Pilihan lama → baru |
|---|---|---|---|
| B06-P01 | pilihan E 3.150 (terpencil) diganti 3.000 = 600 × 100 : 20 (87 dibulatkan ke ratusan). | D 2.700 → D 2.700 | 1.800 · 2.100 · 2.400 · 2.700 · 3.150 → 1.800 · 2.100 · 2.400 · 2.700 · 3.000 |
| B06-C03 | pilihan E 6.804 (salah koma, terpencil) diganti 6.489 = 6.300 + 126 + 63 (tanda terbalik di 63 × (100 − 2)). | A 6.237 → A 6.237 | 6.237 · 6.285 · 6.300 · 6.363 · 6.804 → 6.237 · 6.285 · 6.300 · 6.363 · 6.489 |
| B07-P01 | pilihan E 18 × 84 dan 54 × 280 (ruas kanan sepuluh kali, terpencil) diganti 18 × 84 dan 36 × 44 (faktor dipindah keliru: 84 : 2 ditulis 44). | C 27 × 56 dan 36 × 42 → C 27 × 56 dan 36 × 42 | 28 × 54 dan 32 × 48 · 24 × 63 dan 12 × 125 · 27 × 56 dan 36 × 42 · 31 × 49 dan 33 × 46 · 18 × 84 dan 54 × 280 → 28 × 54 dan 32 × 48 · 24 × 63 dan 12 × 125 · 27 × 56 dan 36 × 42 · 31 × 49 dan 33 × 46 · 18 × 84 dan 36 × 44 |
| B07-C01 | pilihan E 68 × 13 dan 17 × 520 (sepuluh kali, terpencil) diganti 68 × 130 dan 17 × 530 (ruas kiri = nilai kunci, ruas kanan berdekatan). | A 34 × 260 dan 26 × 340 → A 34 × 260 dan 26 × 340 | 34 × 260 dan 26 × 340 · 38 × 270 dan 28 × 370 · 52 × 170 dan 65 × 140 · 46 × 190 dan 16 × 490 · 68 × 13 dan 17 × 520 → 34 × 260 dan 26 × 340 · 38 × 270 dan 28 × 370 · 52 × 170 dan 65 × 140 · 46 × 190 dan 16 × 490 · 68 × 130 dan 17 × 530 |
| B07-C02 | pilihan D 7.560 : 21 dan 1.080 : 30 (360, terpencil) diganti 1.080 : 30 dan 544 : 16 (36 dan 34). | E 1.188 : 33 dan 792 : 22 → E 1.188 : 33 dan 792 : 22 | 936 : 26 dan 1.110 : 30 · 1.008 : 56 dan 252 : 7 · 684 : 19 dan 875 : 25 · 7.560 : 21 dan 1.080 : 30 · 1.188 : 33 dan 792 : 22 → 936 : 26 dan 1.110 : 30 · 1.008 : 56 dan 252 : 7 · 684 : 19 dan 875 : 25 · 1.080 : 30 dan 544 : 16 · 1.188 : 33 dan 792 : 22 |
| B07-C03 | pilihan D 630 : 7 × 6 (540, terpencil) diganti 64 : 8 × 7 dan 3 × 36 : 2 (56 dan 54). | A 72 : 8 × 6 dan 9 × 12 : 2 → A 72 : 8 × 6 dan 9 × 12 : 2 | 72 : 8 × 6 dan 9 × 12 : 2 · 81 : 9 × 6 dan 7 × 16 : 2 · 120 : 6 × 2 dan 5 × 8 : 4 · 630 : 7 × 6 dan 3 × 36 : 2 · 45 : 5 × 6 dan 8 × 13 : 2 → 72 : 8 × 6 dan 9 × 12 : 2 · 81 : 9 × 6 dan 7 × 16 : 2 · 120 : 6 × 2 dan 5 × 8 : 4 · 64 : 8 × 7 dan 3 × 36 : 2 · 45 : 5 × 6 dan 8 × 13 : 2 |
| B07-L01 | pilihan E 24 × 70 dan 12 × 1.400 (sepuluh kali, terpencil) diganti 24 × 70 dan 48 × 36 (faktor dipindah keliru); kunci dipindah C → B untuk sebaran. | C 35 × 48 dan 70 × 24 → B 35 × 48 dan 70 × 24 | 42 × 40 dan 21 × 78 · 56 × 30 dan 28 × 62 · 35 × 48 dan 70 × 24 · 33 × 52 dan 66 × 25 · 24 × 70 dan 12 × 1.400 → 42 × 40 dan 21 × 78 · 35 × 48 dan 70 × 24 · 56 × 30 dan 28 × 62 · 33 × 52 dan 66 × 25 · 24 × 70 dan 48 × 36 |
| B08-C03 | pilihan E 730 (suku ke-7, terpencil) diganti 248 = 3 × 82 + 2 (tanda terbalik). | C 244 → C 244 | 164 · 172 · 244 · 246 · 730 → 164 · 172 · 244 · 246 · 248 |
| B08-C04 | huruf K dan angka 96 tidak lagi terpusat di kunci: dua pilihan salah kini mengenakan satu kekeliruan pada huruf dan angka bersamaan (I72 selisih terakhir dianggap tetap, C51 aturan dua suku awal). Simpul unsur bersama: kunci seri dengan L96 dan J96. | A K96 → A K96 | K96 · L96 · I96 · K51 · J96 → K96 · I72 · L96 · C51 · J96 |
| B08-L02 | pilihan E 1.260 (selisih mentah, terpencil) dibuang; barisan diganti 9n + 10 agar jalur tanda dan bilangan tetap berdekatan; ditambah langkah kurang satu. Kunci B → C. | B 315 → C 315 | 275 · 315 · 324 · 335 · 1.260 → 295 · 306 · 315 · 324 · 325 |
| B08-L03 | E dan V tidak lagi terpusat di kunci: pilihan meleset kini konsisten pada huruf kedua (FU, DW), EU tetap; simpul unsur bersama jatuh di EU, bukan kunci. | A EV → A EV | EV · DV · ZA · EU · BY → EV · FU · DW · EU · BY |
| B08-L04 | tabel dibuat lebih mudah dibaca (nomor 1, 2, 4, 5, 8: hasil bagi nilai : nomor = 4, 7, 19, 28, 67 = n² + 3 terlihat langsung); target tetap 90 detik (105 detik melampaui rata-rata TIU ±86 detik per soal, Putusan 5). | E 1.764 → E 1.764 | 1.364 · 1.524 · 1.708 · 1.728 · 1.764 → 1.064 · 1.364 · 1.540 · 1.728 · 1.764 |
| B09-P01 | baris lengkap ketiga (7, 4, 21) ditambahkan agar aturan lain gugur oleh data. | A 24 → A 24 | tetap |
| B09-C02 | pilihan E 74 (terpencil) diganti 44 = 7 × 7 − 5 (tengah belum dikuadratkan). | C 24 → C 24 | 12 · 17 · 24 · 36 · 74 → 12 · 17 · 24 · 36 · 44 |
| B09-C03 | pilihan E 123 (terpencil) diganti 54 = 48 + 6 (selisih antarbaris dianggap tetap). | D 51 → D 51 | 32 · 41 · 42 · 51 · 123 → 32 · 41 · 42 · 51 · 54 |
| B09-C04 | angka 43 tidak lagi terpusat di kunci: pilihan E 43 dan 45 diganti 41 dan 85 (X dari selisih tetap, Y dari baris bawah dibaca sendiri), sehingga 85 dan 41 juga dimiliki dua pilihan. | C 43 dan 85 → C 43 dan 85 | 41 dan 81 · 43 dan 86 · 43 dan 85 · 45 dan 89 · 43 dan 45 → 41 dan 81 · 41 dan 85 · 43 dan 85 · 43 dan 86 · 45 dan 89 |
| B09-L01 | pilihan E 119 (selisih mentah, terpencil) diganti 79 = 4 × 21 − 5 (kiri meleset satu ke atas). | B 75 → B 75 | 71 · 75 · 80 · 85 · 119 → 71 · 75 · 79 · 80 · 85 |
| B09-L04 | baris lengkap ketiga (2, 5, −6) ditambahkan agar aturan lain gugur oleh data. | B 21 → B 21 | tetap |
| B10-C07 | pilihan E 150% (terpencil) diganti 28% (untung Rp28.000 dibaca 28%); kunci C → D. | C 35% → D 35% | 14% · 25% · 35% · 50% · 150% → 14% · 25% · 28% · 35% · 50% |
| B10-L02 | pilihan E 120 (terpencil) diganti 45 = 180 : 4 (4 jam 30 menit dihitung 4 jam); 60 pindah ke E. | B 30 → B 30 | 15 · 30 · 40 · 60 · 120 → 15 · 30 · 40 · 45 · 60 |
| B10-L04 | pilihan A Rp570.000 (satu peti, terpencil) dan E Rp3.100.000 diganti Rp2.700.000 (tara dikurangkan dua kali) dan Rp2.900.000 (ongkos satu peti ikut dihitung). | C Rp2.850.000 → C Rp2.850.000 | Rp570.000 · Rp2.625.000 · Rp2.850.000 · Rp3.000.000 · Rp3.100.000 → Rp2.625.000 · Rp2.700.000 · Rp2.850.000 · Rp2.900.000 · Rp3.000.000 |
| B10-L05 | pilihan A Rp360.000 (bunga saja, terpencil) diganti Rp2.520.000 (hanya bunga 6 bulan). | C Rp2.760.000 → C Rp2.760.000 | Rp360.000 · Rp2.640.000 · Rp2.760.000 · Rp2.772.000 · Rp2.784.000 → Rp2.520.000 · Rp2.640.000 · Rp2.760.000 · Rp2.772.000 · Rp2.784.000 |

**Sebaran kunci sesudah revisi** (urutan buku, Contoh 1 Bab 6 ikut): `D C E A B B D A · C A E A B A A · B D E C A B C A E · A E C D C B D C B · E E B E D D E D D B D C C` → A 9 · B 9 · C 9 · D 10 · E 9, tidak ada huruf sama > 2 berturut. Tiga kunci berpindah: B07-L01 C → B, B08-L02 B → C, B10-C07 C → D.

**Isyarat bocor sesudah revisi**
- Pilihan terpencil: semua soal beropsi angka kini ≤ 3 × median (sebelumnya 10 soal di atas 3×, terburuk 36×). Bab 7: kelima pilihan kelebihan nol (P01, C01, C02, C03, L01) diganti pasangan yang hanya meleset sedikit atau faktor yang dipindah keliru; J-NOL di Bab 7 kini hanya di L02 (bagi desimal, pasangan sama).
- Simpul unsur bersama: B08-C04 kunci seri dengan L96 dan J96 (2 = 2 = 2); B08-L03 simpul jatuh di EU (bukan kunci); B09-C04 kunci seri dengan 41 dan 85 (2 = 2).
- Kunci di pasangan opsi terdekat: diperbaiki di soal yang tersentuh butir 3 (B08-L02, B09-L01, B10-C07, B10-L02 kini tidak); masih ada di B08-C03 (244/246/248), B08-L04 (1.728/1.764), B10-L04 (2.850/2.900), B10-L05 (2.760/2.772/2.784) — diterima karena pilihan tetangga itu jalur satu langkah yang memang wajar.

**Hasil**: `soal_numerik.mjs` 5.606 assert lulus, 352 rantai hitung pembahasan; `python3 src/build.py` galat 0; siswa **179 hlm**, pengajar **194 hlm** (pdfinfo). Cek mata hlm 60, 63, 86, 87, 98 (tabel tiga baris, B08-L04) bersih.

**Butir putusan tambahan**: (7) pemeriksa pilihan terpencil memakai ambang 3 × median; B06-P01 (rasio 1,0 sesudah revisi) dan beberapa soal di 2–2,7× dibiarkan. Rekomendasi: terima ambang 3×. (8) Cek buta ulang 22 soal dengan subagen baru memakai `numerik_b06_10_buta2.json`.

## Sesudah cek buta 2 (2026-11-01)

Dasar: `reports/tahap5_kelompok3_numerik_buta2.md` (22/22 jawaban = kunci, tanpa ambiguitas, semua dalam target waktu; tebakan bentuk bebas 8/22, aturan tetap sekitar peluang acak). Tiga soal yang masih bocor diperbaiki; berkas cek buta ke-3 khusus soal yang diubah: `scripts/data/numerik_b06_10_buta3.json`.

| ID | Alasan | Kunci lama → baru | Pilihan lama → baru |
|---|---|---|---|
| B07-L01 | pola pindah faktor kini tepat di tiga pilihan (kunci ÷3 ×3, C ×3 ÷2, D ×2 ÷3) dan meleset tipis di dua pilihan, sehingga kunci tidak terbaca dari pola; nilai kunci 1.080. | B 35 × 48 dan 70 × 24 → B 27 × 40 dan 9 × 120 | 42 × 40 dan 21 × 78 · 35 × 48 dan 70 × 24 · 56 × 30 dan 28 × 62 · 33 × 52 dan 66 × 25 · 24 × 70 dan 48 × 36 → 36 × 30 dan 18 × 62 · 27 × 40 dan 9 × 120 · 30 × 36 dan 90 × 18 · 45 × 24 dan 90 × 8 · 54 × 20 dan 27 × 41 |
| B08-C04 | angka 96 kini hanya di dua pilihan (K96, I96) dan huruf I serta K masing-masing dua pilihan; kunci bukan huruf tengah gugus. Jalur meleset sesudah Z (J-NOMOR) diganti I96 (selisih huruf tetap) dan K48 (angka belum dikali 2); meleset tetap dibahas di Kekeliruan yang Mungkin Terjadi. | A K96 → A K96 | K96 · I72 · L96 · C51 · J96 → K96 · I96 · K48 · C51 · I72 |
| B09-C04 | pilihan D 43 dan 86 diganti 43 dan 81 (X benar, selisih bawah dianggap tetap 20); kini 41, 43, 81, 85 masing-masing muncul di dua pilihan dan empat pilihan sama-sama berbagi dua unsur. | C 43 dan 85 → C 43 dan 85 | 41 dan 81 · 41 dan 85 · 43 dan 85 · 43 dan 86 · 45 dan 89 → 41 dan 81 · 41 dan 85 · 43 dan 85 · 43 dan 81 · 45 dan 89 |

- **B07-L01**: kelima ruas kiri bernilai 1.080. Pola pindah faktor kini tepat di tiga pilihan: kunci (27 : 3, 40 × 3), C (30 × 3, 36 : 2), D (45 × 2, 24 : 3); dua pilihan lain meleset tipis (62 bukan 60, 41 bukan 40). Pola yang terlihat tidak lagi menunjuk kunci; siswa harus mencocokkan besar pengali dan pembagi. Pemeriksa mesin memastikan pola tepat di B, C, D dan hanya B yang kedua ruasnya sama.
- **B09-C04**: 41, 43, 81, 85 masing-masing muncul di dua pilihan; skor berbagi unsur A 2 · B 2 · C 2 · D 2 · E 0 (seri empat).
- **B08-C04**: angka 96 hanya di K96 dan I96; huruf I (I96, I72) dan K (K96, K48) masing-masing dua pilihan; skor berbagi unsur A 2 · B 2 · C 1 · D 0 · E 1. Jalur meleset sesudah Z tidak lagi menjadi pilihan, tetapi tetap dibahas di Kekeliruan yang Mungkin Terjadi (penyimpangan dari slot: J-NOMOR tidak dipakai).
- **Putaran abjad**: pembahasan B08-C04 kini menyatakan “Abjad dianggap berputar: sesudah Z kembali ke A”. B08-L03 adalah latihan (pembahasannya Tahap 6); kewajiban kalimat yang sama dicatat di catatan pengajar soal itu, dan narasi Bab 8 sudah menyatakan putaran abjad.

**Sebaran kunci** tidak berubah (ketiga kunci tetap di B, A, C): A 9 · B 9 · C 9 · D 10 · E 9, tidak ada huruf sama > 2 berturut.

**Hasil**: `soal_numerik.mjs` 5.617 assert lulus, 353 rantai hitung pembahasan; `python3 src/build.py` galat 0; siswa **179 hlm**, pengajar **194 hlm** (pdfinfo).


## Sesudah cek buta 3 (2026-11-01)

Dasar: `reports/tahap5_kelompok3_numerik_buta3.md` (3/3 jawaban = kunci, tetapi tebakan bentuk mengenai 3/3). Empat soal diubah: tiga yang diminta, ditambah B08-L03 karena aturan mesin baru berlaku untuk semua soal gabungan. Berkas cek buta ke-4 (keempat soal itu): `scripts/data/numerik_b06_10_buta4.json`. Berkas `_buta2`/`_buta3` tidak lagi ditulis ulang.

**Aturan mesin baru** (`soal_numerik.mjs`, semua soal gabungan huruf-angka, huruf-huruf, dan pasangan X-Y):
- gabungan bagian terbanyak di tiap posisi tidak boleh kunci, dan wajib ada sebagai pilihan salah (tebakan "ambil yang terbanyak" jatuh di pilihan salah);
- setiap pilihan berbagi sedikitnya satu bagian dengan pilihan lain (tidak ada pilihan yang menyendiri);
- tetap berlaku: kunci bukan simpul berbagi bagian tunggal.

| ID | Alasan | Kunci lama → baru | Pilihan lama → baru |
|---|---|---|---|
| B07-L01 | A dan E diganti pasangan berpola rapi tetapi salah nilai (A 36 : 3 dan 30 × 2 → 12 × 60 = 720; E kedua faktor dibagi 2 → 27 × 10 = 270); kelima ruas kanan kini berpola pindah faktor yang rapi, hanya kunci yang pengali dan pembaginya sama. | B 27 × 40 dan 9 × 120 → B 27 × 40 dan 9 × 120 | 36 × 30 dan 18 × 62 · 27 × 40 dan 9 × 120 · 30 × 36 dan 90 × 18 · 45 × 24 dan 90 × 8 · 54 × 20 dan 27 × 41 → 36 × 30 dan 12 × 60 · 27 × 40 dan 9 × 120 · 30 × 36 dan 90 × 18 · 45 × 24 dan 90 × 8 · 54 × 20 dan 27 × 10 |
| B08-C04 | tebakan bagian terbanyak per posisi (K dan 72) kini jatuh di K72, pilihan salah; I72 berbagi angka dengan K72, sehingga tidak ada pilihan yang menyendiri. C51 dan I96 diganti K72 dan K51. | A K96 → A K96 | K96 · I96 · K48 · C51 · I72 → K96 · K48 · I72 · K72 · K51 |
| B08-L03 | pilihan disusun ulang mengikuti aturan kombinasi: gabungan bagian terbanyak per posisi (D atau F dengan V) adalah pilihan salah, huruf E kunci tidak terbanyak, dan setiap pilihan berbagi bagian. EU dan BY diganti DV dan FV (huruf pertama meleset, huruf kedua dari polanya sendiri); DW kini = selisih terakhir tetap untuk kedua huruf. | A EV → A EV | EV · FU · DW · EU · BY → EV · DV · FU · DW · FV |
| B09-C04 | kisi 2 × 2 {41, 43} × {81, 85} dipecah: B 41 dan 85 diganti 43 dan 81, D diganti 43 dan 89 (selisih bawah dilompati), E tetap 45 dan 89; tebakan bagian terbanyak per posisi (43 dengan 81 atau 89) jatuh di pilihan salah, dan setiap pilihan berbagi bagian. | C 43 dan 85 → C 43 dan 85 | 41 dan 81 · 41 dan 85 · 43 dan 85 · 43 dan 81 · 45 dan 89 → 41 dan 81 · 43 dan 81 · 43 dan 85 · 43 dan 89 · 45 dan 89 |

**Hasil aturan per soal** (skor berbagi bagian; pilihan yang memegang bagian terbanyak di kedua posisi):
- B08-C04 (kunci A K96): skor A 3 · B 3 · C 1 · D 4 · E 3; tebakan terbanyak → D K72 (salah). Huruf K memang muncul di empat pilihan; yang menentukan adalah angka (× 2).
- B08-L03 (kunci A EV): skor A 2 · B 3 · C 1 · D 1 · E 3; tebakan terbanyak → B DV dan E FV (salah); huruf E hanya di kunci.
- B09-C04 (kunci C 43 dan 85): skor A 1 · B 3 · C 2 · D 3 · E 1; tebakan terbanyak → B 43 dan 81 dan D 43 dan 89 (salah); kisi 2 × 2 sudah pecah.
- B07-L01 (kunci B): kelima ruas kanan berpola pindah faktor yang rapi (÷3 ×2, ÷3 ×3, ×3 ÷2, ×2 ÷3, ÷2 ÷2); hanya kunci yang pengali dan pembaginya sama. Setiap kekeliruan bernama: "faktor dikali dan dibagi bilangan berbeda" (A, C, D) dan "kedua faktor sama-sama dibagi" (E). Pemeriksa mesin menghitung pola kelima pilihan.

**Penyimpangan dari slot yang bertambah**: B08-C04 kini tanpa jalur meleset sesudah Z (J-NOMOR) dan B08-L03 tanpa J-TIGA (selisih tetap 3) serta cermin berjumlah 26; keduanya demi aturan kombinasi. Meleset sesudah Z tetap ada di B08-L03 (DV, FU, FV) dan dibahas di Kekeliruan yang Mungkin Terjadi B08-C04.

**Sebaran kunci** tidak berubah: A 9 · B 9 · C 9 · D 10 · E 9, tidak ada huruf sama > 2 berturut.

**Hasil**: `soal_numerik.mjs` 5.624 assert lulus, 351 rantai hitung pembahasan; `python3 src/build.py` galat 0; siswa **179 hlm**, pengajar **194 hlm** (pdfinfo).

