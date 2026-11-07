# Tahap 4 · Kelompok 6 — Bab 19 Kekeliruan yang Sering Terjadi dan Strategi Mengerjakan

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen kelompok 6 (tiu-t4-penutup)
Status: draf, menunggu persetujuan Gusti. Belum ada soal, opsi, atau kunci yang dibuat. Engine dan generator tidak diubah. Lampiran L1–L6 belum ditulis; Bab 19 hanya merujuknya. Bab 1–18 tidak diubah.

## Berkas
| Berkas | Isi |
|---|---|
| `src/29_bab19.html` | Bab 19 (baru). Judulnya mengikuti peta 19 bab yang DISETUJUI 2026-10-30, karena sampul tidak punya label untuk Bab 19 |
| `scripts/cek_bab19.mjs` | 852 butir assert, rinciannya di bagian "Hasil cek" |
| `src/build.py` (1 baris) | `cek_bab19.mjs` ditambahkan ke tuple cek. Daftar larangan tidak diubah |
| `src/00_head.html` (bagian "tambahan buku") | Aturan pemenggalan Bab 19: paragraf tidak dipenggal, tabel kelompok `.tb.pecah` boleh berlanjut ke halaman berikut, kotak pertanyaan uji menempel pada tabelnya. Ditambah tabel Latihan A `.latA`: sel isian setinggi baris, kolom Kelompok tidak dipenggal, jawaban pengajar `span.guru` |

Bab 1 dan Bab 2 tidak perlu disamakan. Keduanya tidak menyebut judul Bab 19 dengan bunyi lain. Bab 1 hanya memuat baris tabel "Penutup · 19 · tujuh kelompok kekeliruan dan strategi hari ujian", dan Bab 2 hanya kalimat "Uraian lengkapnya ada di Bab 19". Keduanya dicek oleh script.

## Isi Bab 19 (pita ±75 detik)
Urutan isi bab:
- Pertanyaan Pembuka (slot P01)
- Asal Pilihan yang Salah, berisi tabel tujuh kelompok dengan kolom No · Kelompok · Pertanyaan uji · Bab · Banyak nama (jumlah 133)
- Tujuh subbagian K1–K7, urut, dengan judul sama persis dengan nama kelompok Putusan 3. Setiap subbagian memuat:
  - dua atau tiga paragraf: bagaimana kekeliruan itu terjadi, mengapa menggoda, dan penangkalnya;
  - kotak Pertanyaan uji, kalimatnya sama dengan tabel Bab 2;
  - tabel semua nama kekeliruan anggota kelompok itu, persis seperti di bab asal, dengan nomor bab.
- Kotak pengajar Padanan Kelompok dan Kode
- Membaca Hasil Latihan dan Tryout: empat langkah dengan lembar Peta Diri Bab 1 (slot B01-L02), ditambah Catatan "tiga kali" dan kotak pengajar Rekap Kelas
- Strategi pada Hari Ujian, terdiri atas:
  - peta 8 baris: blok · nomor · detik per soal · lama blok · selesai pada menit · kelompok terbanyak;
  - Tujuh Pertanyaan Uji;
  - Ketika Dua Pilihan Bertahan;
  - Catatan "belum diverifikasi";
  - kotak pengajar Asal Angka Peta.
- Latihan A
- Latihan B
- Ringkasan

Isi pokok:
- **Penghimpunan lengkap.** Ke-133 baris tabel "Kekeliruan pada Soal …" di Bab 3–18 masuk ke tujuh tabel, masing-masing tepat sekali. Kelompok setiap baris diambil dari catatan padanan bab asal dan dicocokkan dengan engine v0.4.3 Pilar 3. Nama yang sama dari beberapa bab digabung menjadi satu baris dengan beberapa nomor bab, sehingga ada 98 baris tampil.
  - Banyak nama per kelompok: K1 15 · K2 28 · K3 26 · K4 18 · K5 15 · K6 21 · K7 10.
  - Ke-47 kode engine semuanya terpakai di tabel bab.
- **Kutipan contoh** di narasi diambil persis dari kolom contoh bab asal: Bab 10, Bab 4, Bab 15, dan Bab 3.
- **Kelompok 7** tidak punya anggota di bab gambar. Narasi menyebutnya, dan script mengeceknya.
- **Peta hari ujian.** Angka detik, lama blok, dan titik periksa dihitung dari tabel waktu Bab 1. Totalnya 50:30 = 50,5 menit untuk 35 soal, rata-rata ±86 detik.
  - Kolom kelompok terbanyak dihitung dari tabel kekeliruan bab di setiap blok. Isinya dua kelompok teratas, tiga bila ada yang sama banyak:

    | Blok | Kelompok terbanyak |
    |---|---|
    | Verbal | 4 · 7 |
    | Hitung cepat | 6 · 3 · 4 |
    | Numerik lain | 6 · 2 |
    | Kecukupan data | 1 · 4 |
    | Analitis | 1 · 2 |
    | Optimasi | 2 · 1 · 4 |
    | Figural | 2 · 3 · 5 |

  - Buku menyatakan kolom ini sebagai gambaran isi buku, bukan data peserta.

## Slot (8 tempat kosong + 14 rujukan Latihan A)
**Pembuka dan Latihan B**

| ID | Target | Jenis (rencana T2-A) | Kelompok | Kode utama · kode lain | Rencana kunci |
|---|---|---|---|---|---|
| HB-TIU-B19-P01 | 75 | Soal cerita dua perubahan persen + data pengalih (pembuka) | K1/K2/K3/K6 (satu pengecoh per kelompok) | J-PENGALIH · J-LANGKAH · J-BASIS · J-NOL | A |
| HB-TIU-B19-L01 | 60 | Hubungan kalimat (B2), HOTS | K7 | J-RELASI · J-KATA, J-BALIK | D |
| HB-TIU-B19-L02 | 75 | Soal cerita jarak-kecepatan, satuan campur (B7), HOTS | K6 | J-SATUAN · J-LAJU, J-LANGKAH | B |
| HB-TIU-B19-L03 | 75 | Suku ke-n tabel bernomor meloncat (B5), HOTS | K5 | J-KONST · J-RATA, J-NOMOR | E |
| HB-TIU-B19-L04 | 90 | Kecukupan data ya/tidak dengan batas (B8), HOTS+ | K4 | J-TENTU · J-BATAS, J-BERHENTI | C |
| HB-TIU-B19-L05 | 120 | Analitis pilih susunan (B10), HOTS | K2 | J-SYARAT · J-MUNGKIN, J-BALIK | A |
| HB-TIU-B19-L06 | 120 | Optimasi termurah + kolom pengalih (B11), HOTS+ | K1 | J-PENGALIH · J-HEMAT, J-BATAS | B |
| HB-TIU-B19-L07 | 60 | Analogi gambar FIG-ANA-UBAH (B13), tingkat 3 | K3 | JF-PUTCER/JF-SUMBU · JF-HITUNG, JF-TUKAR | E |

Sebaran kunci 8 soal: A2 B2 C1 D1 E2, tanpa huruf berturut-turut, dan ketujuh jenis latihan berbeda. Target setiap latihan sama dengan patokan bloknya di Bab 1. Total Latihan B 600 detik, diisi otomatis menjadi "10 menit". Kelompok setiap soal tidak disebut di spesifikasi siswa; script memastikannya.

**Latihan A** (tanpa soal baru, ±30 detik per soal, 7 menit). 14 rujukan ke slot latihan Bab 3–18, dua per kelompok dari rumpun yang berbeda. Urutannya diacak sehingga kelompok yang sama tidak pernah berdampingan.

| No. | Slot | Kode | Kelompok |
|---|---|---|---|
| 1 | B07-L01 | J-SISI | K2 |
| 2 | B05-L01 | J-AKAL | K1 |
| 3 | B14-L01 | JF-ARAH | K3 |
| 4 | B08-L04 | J-KONST | K5 |
| 5 | B12-L03 | J-MUNGKIN | K4 |
| 6 | B06-L02 | J-NOL | K6 |
| 7 | B03-L03 | J-RELASI | K7 |
| 8 | B18-L03 | JF-SATU | K2 |
| 9 | B10-L04 | J-BASIS | K3 |
| 10 | B11-L01 | J-ASUMSI | K1 |
| 11 | B15-L02 | JF-HITUNG | K6 |
| 12 | B04-L02 | J-IZIN | K4 |
| 13 | B18-L01 | JF-AWAL | K5 |
| 14 | B11-L05 | J-ULANG | K7 |

Sebaran rumpun: verbal 3, numerik 4, KCK/analitis 3, figural 4. Di edisi siswa, kolom nama kekeliruan dan kelompok berupa isian kosong. Di edisi pengajar, kolom itu terisi nama persis dari bab asal (dengan nomor baris), nomor kelompok, dan kode.

## Hasil cek
- `python3 src/build.py`: **galat 0**. Keenam script cek lulus, yaitu cek_bab01_02, 03_05, 06_10, 11_13, 14_18, dan 19. Jumlah slot kosong di seluruh buku 164.
- `cek_bab19.mjs` (852 butir) memeriksa:
  - judul dan kepala bab;
  - engine: 47 kode dan tujuh nama kelompok;
  - kelompok setiap baris sumber sama dengan engine;
  - 133 baris tercakup tepat sekali, dengan nama, nomor bab, dan kelompok yang cocok;
  - tabel ringkasan: rentang bab, banyak nama, dan pertanyaan uji sama dengan Bab 2;
  - urutan K1–K7 dan kotak uji setiap kelompok;
  - kutipan contoh ada di bab asal;
  - daftar kode di kotak pengajar sama dengan engine;
  - angka peta dihitung dari Bab 1, dengan titik periksa sama dengan lembar Bab 1 dan Ringkasan, serta 50:30, 35 soal, dan ±86;
  - kolom kelompok terbanyak;
  - Latihan A: slot ada di src, label cocok dengan ID dan judul bab, kode ada di catatan slot, kode milik kelompok yang benar, jawaban sama dengan baris sumber, 2 butir per kelompok dari rumpun berbeda, tidak ada kelompok berdampingan, dan 7 menit;
  - 7 slot Latihan B: target sama dengan patokan blok, satu soal per kelompok, kunci seimbang, tidak ada huruf atau jenis berderet lebih dari 2, dan 10 menit;
  - pita ±75 menurut aturan build.py;
  - kata "satu-satunya" muncul 0 kali.
- Uji mutasi: enam perubahan sengaja dicoba, yaitu satu nama, satu rujukan baris, satu titik periksa, satu kolom kelompok, satu ID slot, dan satu kunci. Keenamnya tertangkap.
- Teks siswa Bab 19 tidak memuat "Jebakan" atau kode (dicek dengan `pdftotext`). `impeccable detect` tidak menemukan apa pun.
- Lembar kontak hlm 104–115 dicek dengan mata, begitu juga hlm 135 edisi pengajar. Kolom Kelompok yang terpenggal ("3 · JF-" / "ARAH") sudah diperbaiki.

## Jumlah halaman (pdfinfo)
| Edisi | Total | Bab 19 |
|---|---|---|
| Siswa | 115 (sebelumnya 103) | hlm 104–115, 12 hlm |
| Pengajar | 137 (sebelumnya 123) | hlm 124–137, 14 hlm |

Rencana tahap2_A memperkirakan Bab 19 17 hlm siswa dan 19 hlm pengajar sebelum pemangkasan.

## Penyimpangan dari rencana tahap2_A (dan alasannya)
1. **Latihan B 7 soal, bukan 14.** Ini mengikuti T2-1b. Dari 14 slot rencana dipilih B2, B7, B5, B8, B10, B11, dan B13.
   - Setiap kelompok terwakili satu kali, dan semua blok hari ujian terwakili kecuali hitung cepat.
   - B7 dipilih menggantikan B4 karena catatan pengajar Bab 10 sudah merujuk "Bab 19 B7".
   - Akibatnya, sebaran kunci 3-3-3-3-2 menjadi 2-2-1-1-2 untuk 8 soal, dan total waktu 17:15 menjadi 10 menit.
2. **Kartu K1–K7 menjadi subbagian dengan tabel lengkap.** Rencana awal memuat dua rujukan soal per kartu. Rujukan soal itu sekarang menjadi Latihan A. Tabel lengkap dipakai agar setiap nama di pembahasan dapat dicari kelompoknya, dan agar kelengkapannya dapat dibuktikan script.
3. **Latihan A tetap 14 butir.** T2-1b tidak menyebut Latihan A, dan butir ini tidak menambah soal. Semua rujukan memakai slot latihan, bukan contoh: siswa sudah mengerjakannya, dan pembahasannya ada di lampiran.
4. **Peta hari ujian.** Kolom "kekeliruan tersering" dalam rencana tidak boleh diisi tanpa data siswa. Di sini kolom itu diisi dengan kelompok terbanyak menurut isi buku, dan buku menyebutnya terang-terangan (lihat butir antre 3). Baris hitung cepat diberi titik selesai 6:30; Bab 1 menggabungkannya ke titik nomor 45.
5. **Tidak ada lembar isian baru.** Bab 19 memakai lembar Peta Diri Bab 1 (B01-L02) sesuai catatan pengajar Bab 1.
6. **Pembuka P01 dihitung dalam 151 soal.** Tafsiran ini berasal dari rencana: A = 30 soal pilihan ganda = Bab 2 15 + Bab 19 15, dan bagian nonlatihan A berjumlah 6 = 5 contoh Bab 2 + pembuka Bab 19. Total buku tetap 151.
7. **Rujukan ke lampiran yang belum ditulis:**
   - Lampiran C, jawaban Latihan A (edisi siswa);
   - L2 butir 2–4, L4 rencana pertemuan, dan L5 daftar kode (edisi pengajar).

## Belum diverifikasi (ditandai di buku)
- Urutan subtes di layar, bentuk jam CAT, dan kebebasan berpindah soal.
- Patokan waktu dan susunan blok. Keduanya usulan dan rekonstruksi D'Ajiks.
- Patokan "tiga kali dalam satu tryout". Ini usulan D'Ajiks dan belum diuji dengan data peserta.

## Butir antre untuk Gusti (urut, satu per respons)
1. **Persetujuan isi kelompok 6 (Bab 19).**
2. **Latihan A 14 butir atau 7 butir.** Pilihan 7 butir berarti satu per kelompok, sejajar dengan pemangkasan Latihan B. *Rekomendasi: tetap 14.* Latihan A tidak menambah soal dan cukup satu tabel di bab. Dua butir dari rumpun berbeda melatih siswa melihat kelompok yang sama di soal kata, hitung, dan gambar. Biaya halamannya sekitar 1–2 hlm di lampiran C.
3. **Kolom "kelompok terbanyak" di peta hari ujian.** Pilihannya mempertahankan kolom berdasarkan isi buku (dengan catatan, seperti sekarang) atau mengosongkannya sampai ada data tryout, sesuai rencana T2-A. *Rekomendasi: pertahankan.* Kolom ini menghubungkan peta dengan pertanyaan uji saat dua pilihan bertahan, dan catatannya sudah menyuruh siswa menggantinya dengan data Peta Diri sendiri.
4. **Latihan B tanpa soal hitung cepat.** Blok hitung cepat hanya satu soal di hari ujian, sedangkan B7 sudah dirujuk catatan Bab 10. *Rekomendasi: terima.*
5. **Nama berbeda untuk kode yang sama di antara bab.** Contohnya:
   - J-MUNGKIN: "Yang mungkin dikira pasti" (Bab 4) dan "Menganggap yang mungkin benar sebagai pasti benar" (Bab 6 dan 12);
   - J-URUTAN: "… mengalikan atau membagi" (Bab 6) dan "… mengalikan" (Bab 7 dan 9);
   - J-NOMOR: tiga bunyi untuk suku, gambar, dan sel.

   Bab 19 menampilkan nama-nama itu apa adanya. *Rekomendasi: biarkan.* Nama disesuaikan dengan konteks babnya, dan tabel Bab 19 sudah menyatukannya dalam satu kelompok. Menyeragamkannya berarti mengubah Bab 3–18 yang sudah TUNTAS.
6. **Tata letak.** Ada dua catatan:
   - hlm 104 siswa kosong ±35%, karena tabel tujuh kelompok pindah ke hlm 105;
   - judul "Penilaian dari Bentuk Luar" berada di kaki hlm 110, sedangkan tabelnya di hlm 111.

   *Rekomendasi: terima sampai T7.* Halaman akan bergeser lagi setelah soal T5 dan lampiran masuk, seperti putusan T4-14.
