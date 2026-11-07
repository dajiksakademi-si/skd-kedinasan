# Tahap 4 · Kelompok 3 Numerik — Bab 6, 7, 8, 9, 10

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen kelompok 3
Status: draf menunggu persetujuan Gusti. Tidak ada soal, opsi, atau kunci baru. Satu soal jadi yang dimuat: Contoh 1 Bab 6 (3,975 × 1.400, kunci C 5.565), dipasang apa adanya dari prototipe yang disetujui (T3-f).

## Berkas
| Berkas | Isi |
|---|---|
| `src/16_bab06.html` | Bab 6 Operasi Hitung dan Estimasi. Pita, paragraf pembuka, subbagian "Angka Satuan dan Sisa Pembagian oleh Sembilan" + Catatan, dan Contoh 1 disalin byte demi byte dari `prototipe/gaya_halaman_tiu.html` |
| `src/17_bab07.html` | Bab 7 Pasangan Operasi Bernilai Sama |
| `src/18_bab08.html` | Bab 8 Barisan Bilangan dan Suku ke-n (+ Catatan tiga titik, Catatan jumlah n suku dan sisipan) |
| `src/19_bab09.html` | Bab 9 Pola Bilangan dalam Tabel (model kotak = kisi aplikasi CAT deret tabel) |
| `src/20_bab10.html` | Bab 10 Perbandingan, Persentase, dan Laju dalam Soal Cerita |
| `scripts/cek_bab06_10.mjs` | 158 angka narasi/tabel dihitung + assert, lalu dicek muncul persis di src; Contoh 1 di buku dicek sama persis dengan blok prototipe dan cocok dengan `scripts/data/bab6_c1.json` (soal, 5 opsi, kunci, 5 bagian pembahasan) |
| `src/build.py` (diubah 1 baris) | menjalankan `cek_bab06_10.mjs`; daftar larangan tidak diubah |
| `src/00_head.html` (ditambah, bagian "tambahan buku") | `.num h3 + p{break-after:avoid}` (judul + pengantar tidak tertinggal di kaki halaman, hanya bab bernomor kelas `num`) dan `.utuh{break-inside:avoid}` (Contoh 1 Bab 6 utuh satu halaman). Gaya global dan Bab 1–5 tidak berubah (halaman Bab 1–5 tetap 1–29) |

## Subbagian
Konsep inti "besaran tetap" diperkenalkan sekali di Bab 6 (tabel lima bab: apa yang tetap, akibatnya), lalu dipakai di setiap bab.

**Bab 6** (pita ±45 detik): Pertanyaan Pembuka · Konsep Besaran Tetap · Ukuran Bilangan dan Banyak Angka Hasil · Kapan Memperkirakan, Kapan Menghitung Tepat · Pembulatan Berlawanan Arah · Angka Satuan dan Sisa Pembagian oleh Sembilan (+ Catatan) · Pecahan, Desimal, dan Persen yang Ramah · Sifat Distributif dan Urutan Operasi · Perbandingan Kuantitatif (4 pilihan tetap, P dan Q berpeubah dirujuk Bab 11, + Catatan format resmi belum diverifikasi) · Langkah Penyelesaian · Kekeliruan (10 nama) · Contoh (Contoh 1 terisi + 3 slot) · Latihan · Ringkasan.

**Bab 7** (±45 detik): Pertanyaan Pembuka · Faktor Prima sebagai Sidik Jari Bilangan · Memindahkan Faktor Tanpa Mengubah Hasil · Pembagian sebagai Perkalian Silang · Pasangan Cermin dan Cermin Semu (+ bentuk ab × cd dan ba × dc, selisih = 99 × (ac − bd)) · Desimal, Persen, Pecahan, dan Tanda Kurung · Soal Bertanda TIDAK · Kapan Menghitung Langsung Lebih Cepat · Langkah · Kekeliruan (7) · Contoh · Latihan · Ringkasan.

**Bab 8** (±60 detik): Pertanyaan Pembuka · Kenaikan per Suku pada Nomor yang Meloncat · Selisih Bertingkat dan Pangkat Pola · Banyak Titik yang Membuktikan Pola (+ Catatan tiga titik, belum diverifikasi) · Mencari Nomor Suku dari Nilainya · Deret Sebaris · Selisih yang Berlipat: Aturan Kali lalu Tambah · Deret Huruf sebagai Deret Nomor Urut · Catatan jumlah n suku + sisipan · Langkah · Kekeliruan (9) · Contoh · Latihan · Ringkasan. Deret geometri tak hingga tidak dimuat (T2-7(6)). Rumus kenaikan a(p + q) + b hanya di kotak pengajar (T2-C3(d)).

**Bab 9** (±90 detik): Pertanyaan Pembuka · Membaca Tabel sebagai Rumus · Tabel Dua Kolom sebagai Tabel Suku ke-n · Tabel 3 × 3 · Ukuran Hasil sebagai Petunjuk Operasi · Model Kotak dengan Angka Acuan: Uji Pemisahan · Kotak dengan Dua Isian (X dan Y) · Bilangan Negatif, Nol, FPB, dan KPK · Ketika Dua Aturan Sama-sama Cocok (contoh penyangkal di teks) · Langkah · Kekeliruan (7) · Contoh · Latihan · Ringkasan.

**Bab 10** (±75 detik): Pertanyaan Pembuka · Satu Persamaan: Hasil = Laju × Waktu · Senilai dan Berbalik Nilai · Kerja Bersama dan Keran · Memilih Angka Ramah · Laju Relatif (berpapasan, menyusul, kereta, perahu di sungai, kecepatan rata-rata) · Selisih yang Tetap: Umur dan Perbandingan · Persen terhadap Dasar yang Tepat (kapasitas, untung-rugi, diskon bertingkat, bruto-neto-tara, bunga tunggal) · Langkah · Kekeliruan (9) · Contoh · Latihan · Ringkasan. Keenam topik Putusan 8 punya narasi besaran tetap dan soal (contoh atau latihan); tanpa tabel rumus per kasus.

Setiap bab punya catatan pengajar (class "guru"): padanan nama kekeliruan ↔ kode Pilar 3 + kelompok K, dan "Asal Rancangan" (slot T2-C yang dipilih/gugur beserta alasannya). Setiap slot menyebut angka narasi yang tidak boleh dipakai soal T5.

## Slot (46 = 27 nonlatihan + 19 latihan; 45 kosong + Contoh 1 Bab 6 terisi)
| ID | Spesifikasi singkat | Target (dtk) | Asal T2-C |
|---|---|---|---|
| B06-P01 | perkiraan (a × b) : c, pilihan berjauhan | 30 | P |
| B06-C01 | **terisi**: 3,975 × 1.400, kunci C | 45 | C1 |
| B06-C02 | hitung campuran desimal, pecahan, persen | 60 | C2 |
| B06-C03 | tukar persen / pengali dekat 10ⁿ | 45 | C3 |
| B06-C04 | perbandingan kuantitatif dua bilangan | 45 | C4 |
| B06-L01 | campuran bilangan bertanda + kurung | 45 | L6 |
| B06-L02 | perkiraan bagi oleh pecahan biasa | 45 | L2 |
| B06-L03 | perbandingan kuantitatif berpeubah | 75 | L10 |
| B07-P01 | pasangan kali 2 angka × 2 angka | 45 | P |
| B07-C01 | pasangan kali, angka tampak dipertukarkan | 45 | C1 |
| B07-C02 | pasangan bagi murni | 45 | C2 |
| B07-C03 | campuran : dan × tanpa kurung | 60 | C3 |
| B07-L01 | pasangan kali, faktor dipindah | 45 | L1 |
| B07-L02 | soal bertanda TIDAK (desimal, pecahan, persen) | 75 | L8 |
| B07-L03 | ab × cd dan ba × dc | 60 | L2 |
| B08-P01 | tabel suku, nomor meloncat, suku jauh | 60 | P |
| B08-C01 | linear, tanya nomor suku | 60 | C1 |
| B08-C02 | empat titik meloncat, suku jauh (kuadrat ½) | 75 | C2 |
| B08-C03 | deret sebaris lima suku (kali lalu tambah) | 45 | C3 |
| B08-C04 | deret huruf-angka | 60 | C4 |
| B08-L01 | deret sebaris, suku hilang di tengah | 45 | L7 |
| B08-L02 | selisih dua suku jauh | 60 | L3 |
| B08-L03 | deret huruf (berputar + huruf cermin) | 60 | L10 |
| B08-L04 | lima titik meloncat (n × linear / kubik) | 90 | L6 |
| B09-P01 | tabel 3 × 3, dua baris lengkap, X | 75 | P |
| B09-C01 | dua kolom kuadrat | 60 | C1 |
| B09-C02 | 3 × 3 dengan negatif atau nol | 75 | C2 |
| B09-C03 | model kotak beracuan tepi | 90 | C3 |
| B09-C04 | kotak 2 × n dengan X dan Y | 90 | C4 |
| B09-L01 | dua kolom linear | 60 | L1 |
| B09-L02 | dua kolom, sidik faktor | 75 | L3 |
| B09-L03 | model kotak 4 × 4 petak tetangga | 90 | L8 |
| B09-L04 | 3 × 3 dua langkah, negatif dan nol | 90 | L6 |
| B10-P01 | kerja bersama, satu pelaku berhenti | 90 | P |
| B10-C01 | persen kapasitas dua tahap | 60 | C1 |
| B10-C02 | berbalik nilai, pekerjaan terhenti | 75 | C2 |
| B10-C03 | tiga keran, pengisi ditutup di tengah | 105 | C3 |
| B10-C04 | menyusul dengan selang waktu | 90 | C4 |
| B10-C05 | kereta melintasi terowongan | 75 | C5 |
| B10-C06 | umur dua perbandingan | 75 | C6 |
| B10-C07 | diskon bertingkat lalu untung | 60 | C7 |
| B10-L01 | perbandingan + selisih, tanya jumlah | 45 | L12 |
| B10-L02 | kecepatan rata-rata pergi-pulang | 75 | L8 |
| B10-L03 | perahu di sungai | 90 | L9 |
| B10-L04 | bruto, neto, tara | 75 | L14 |
| B10-L05 | bunga tunggal, lama dalam bulan | 75 | L15 |

Target total latihan: Bab 6 2:45 · Bab 7 3:00 · Bab 8 4:15 · Bab 9 5:15 · Bab 10 6:00. Pita (dihitung build dari data-target slot): ±45 · ±45 · ±60 · ±90 · ±75 detik. Alasan pilihan latihan ada di kotak "Asal Rancangan" tiap bab (tingkat naik, sebaran kekeliruan, kerangka paling jauh dari TO P1 no. 37–45).

## Hasil cek
- `python3 src/build.py`: **galat 0** (frasa terlarang termasuk "satu-satunya", "sekaligus", "tidak hanya"; "maka/karena itu" ≤ 1 per subbagian; istilah dapur, kode, nama tryout di versi siswa; target kartu = data-target). Ketiga script cek lulus.
- `scripts/cek_bab06_10.mjs`: 158 angka dicek; Contoh 1 = prototipe (byte sama) = data JSON.
- Cek mata lembar kontak (siswa hlm 30–57, pengajar hlm 36–69; diperbesar untuk hlm 33 dan 53): ditemukan dan diperbaiki (1) Contoh 1 Bab 6 terbelah antara soal dan pembahasan → dijaga utuh satu halaman, pengantar contoh dipindah ke bawah Contoh 1; (2) judul + pengantar tertinggal di kaki halaman → aturan `.num h3 + p`; (3) ungkapan hitung terpenggal di tabel laju relatif dan rumus V di Bab 10 → `span.m`. Sesudahnya tanpa luberan atau teks terpotong.
- `impeccable detect`: hanya temuan lama (kontras abu teks tempat kosong dan teks sumber, dari kelompok 1); tidak ada temuan baru dari kelompok 3.

## Jumlah halaman
Siswa **57 hlm** (Bab 6 hlm 30–36, Bab 7 37–40, Bab 8 41–46, Bab 9 47–51, Bab 10 52–57); kelompok 3 menambah 28 hlm. Pengajar **69 hlm** (Bab 6 36–43, Bab 7 44–48, Bab 8 49–55, Bab 9 56–61, Bab 10 62–69); menambah 34 hlm. Taksiran T2-C (88 hlm badan bab untuk 80 soal) jauh lebih besar karena soal sudah dipangkas dan slot masih kosong; halaman akan naik saat soal + pembahasan diisi (T5–T6).

## Belum diverifikasi (ditandai di buku atau catatan pengajar)
Patokan kerja jarak antarpilihan ±10% (Bab 6) · format resmi soal perbandingan kuantitatif · kebiasaan soal resmi atas tiga suku berurutan (Bab 8) · tara sebagai persen dari bruto dan rumus bunga tunggal = konvensi aritmetika sosial sekolah, belum dicek ke soal SKD resmi.

## Perlu putusan Gusti (urut prioritas, satu per respons)
1. **Isi kelompok 3 (Bab 6–10).** Rekomendasi: setujui.
2. **Kunci rencana latihan perbandingan kuantitatif berpeubah (B06-L03).** T2-C merencanakan kunci "tidak dapat ditentukan", sama dengan contoh narasi (P = x², Q = 3x − 2). Bila keduanya sama, siswa bisa menyimpulkan "ada peubah → tidak dapat ditentukan" tanpa memeriksa. Rekomendasi: saat T5, kunci B06-L03 dibuat hubungan pasti (berlaku untuk setiap nilai x di rentang), pengecohnya "tidak dapat ditentukan" + satu nilai x yang menyesatkan.
3. **Contoh 1 Bab 6 dijaga utuh satu halaman.** Akibatnya halaman 34 siswa menyisakan ±35% ruang kosong, dan kalimat pengantar contoh dipindah ke bawah Contoh 1 (isi Contoh 1 tidak berubah). Rekomendasi: pertahankan; soal dan pembahasannya tidak perlu dibolak-balik.
4. **Latihan Bab 10 didominasi topik luar hari H.** Empat dari lima latihan wajib karena Putusan 8 (jumlah-selisih, arus, bruto-neto-tara, bunga); kerja bersama/keran (bentuk hari H) hanya di pembuka dan Contoh 3. Rekomendasi: terima; alternatif, ganti L02 kecepatan rata-rata dengan L5 kerja bersama dengan pengurang (target tetap ±75).
5. **Patokan kerja ±10% di Bab 6.** Dimuat sebagai "patokan latihan, bukan aturan ujian". Rekomendasi: pertahankan, kalibrasi dari catatan tryout.

## Catatan teknis
- Bila `scripts/contoh_bab6_c1.mjs` dijalankan ulang dan mengubah prototipe, `cek_bab06_10.mjs` sengaja gagal sampai blok di `src/16_bab06.html` disalin ulang.
- Memory proyek dan `memory.md` root belum diperbarui oleh subagen ini (hanya entri log riset yang diminta).
