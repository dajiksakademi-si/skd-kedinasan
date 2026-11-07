# Tahap 4 · Kelompok 4 — Bab 11 Kecukupan Data, Bab 12 Penalaran Analitis, Bab 13 Optimasi Tabel

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen kelompok 4
Status: draf menunggu persetujuan Gusti. Tidak ada soal, opsi, atau kunci yang dibuat. Semua kotak contoh dan latihan berupa tempat kosong ber-ID.

## Berkas
| Berkas | Isi |
|---|---|
| `src/21_bab11.html` | Bab 11 Kecukupan Data (judul = label sampul, T4-10) |
| `src/22_bab12.html` | Bab 12 Penalaran Analitis; dua gambar SVG (kursi melingkar, panah urutan sebagian) |
| `src/23_bab13.html` | Bab 13 Optimasi Tabel; membaca data dengan tabel saja (T2-7(9)) |
| `scripts/cek_bab11_13.mjs` | 67 angka dan status logika narasi dihitung dengan pemeriksaan semua keadaan (enumerasi pasangan bilangan, semua permutasi 5 dan 6 unsur, putaran kembar, vektor arah hadap untuk "kanan", semua urutan yang memenuhi panah, semua pemetaan dan pembagian jadwal, semua kombinasi kemasan), lalu dicek muncul persis di src. Kedua SVG Bab 12 dibangkitkan script ini (`--svg`) dan harus sama persis dengan yang di src |
| `src/build.py` (diubah 1 baris) | menjalankan `cek_bab11_13.mjs`; daftar larangan tidak diubah |
| `src/00_head.html` (ditambah di bagian "tambahan buku") | `figure.diag` (kartu gambar Bab 12, palet sama dengan `.himp`), `.tb.silang` (tabel centang-silang), dan aturan pemenggalan khusus Bab 11–13: paragraf tidak dipenggal, pengantar tabel ikut tabelnya, rantai `.num h3 + p` diputus di bab ini. Gaya global dan Bab 1–10 tidak berubah |

## Subbagian
Konsep inti "pemeriksaan semua kemungkinan" diperkenalkan sekali di Bab 11 (tabel tiga bab: satu keadaan, yang ditanya, bukti "tidak"), lalu dipakai di Bab 12 dan 13.

**Bab 11** (pita ±90 detik): Pertanyaan Pembuka · Konsep Pemeriksaan Semua Kemungkinan · Arti Data yang Cukup (enam keadaan a + b = 7) · Jawaban Ya atau Tidak · Lima Pilihan Baku (bunyi templat Pilar 5 + tabel hasil tiga langkah → pilihan + Catatan bunyi longgar) · Daftar Kebutuhan dan Kalimat Penentu (+ uji coret) · Perkirakan Dulu: Banyak Besaran dan Banyak Keterangan (tiga pengecualian) · Membuktikan Cukup dan Tidak Cukup (+ 2 Latihan Bukti) · Lima Bentuk Soal Kecukupan Data (bentuk Pilar 2 = Pilar 4 v0.4.3) · Tiga Pernyataan dan Nilai terhadap Batas · Perbandingan Nilai yang Memuat Huruf (lanjutan Bab 6, Putusan 7) · Bila Soal Ujian Kurang Satu Data (+ Catatan Putusan 6) · Langkah · Kekeliruan (11 nama) · Contoh · Latihan · Ringkasan.

**Bab 12** (±120 detik): Pertanyaan Pembuka · Pasti, Mungkin, dan Tidak Mungkin · Kekuatan Setiap Syarat (120 → 24/24/48/60/96) · Urutan Berjajar dan Pilihan Susunan (+ Catatan syarat yang dipenuhi semua pilihan) · Duduk Melingkar (720 : 6 = 120, kanan = berlawanan arah jarum jam, gambar) · Urutan Sebagian dan Gambar Panah (gambar) · Syarat Tambahan pada Kalimat Tanya · Jadwal dan Pencocokan Atribut (Putusan 8; 90 cara, tabel centang-silang) · Langkah · Kekeliruan (7) · Contoh · Latihan · Ringkasan.

**Bab 13** (±120 detik): Pertanyaan Pembuka · Harga Satuan dan Batas Bawah · Rentang Jumlah yang Sah · Mendaftar Kombinasi secara Teratur · Cara Cepat Menghadapi Pilihan (+ Catatan optimum di luar pilihan) · Jumlah Terbanyak dengan Anggaran Tetap · Membaca Data Tabel · Langkah · Kekeliruan (8) · Contoh · Latihan · Ringkasan.

Setiap bab punya catatan pengajar (class "guru"): padanan nama kekeliruan ↔ kode + kelompok K, "Asal Rancangan" (slot T2-D yang dipilih dan gugur beserta alasannya, sebaran huruf rencana), dan dasar setiap Catatan. Setiap slot menyebut angka narasi yang tidak boleh dipakai soal T5.

## Slot (33 = 17 nonlatihan + 12 latihan + 2 Latihan Bukti; semuanya kosong)
| ID | Spesifikasi singkat | Target (dtk) | Asal T2-D |
|---|---|---|---|
| B11-P01 | ya/tidak + laju, dua pelaksana berlaju beda | 120 | P |
| B11-B01 | Latihan Bukti: dua keadaan untuk pernyataan perbandingan | tanpa target | B2 |
| B11-B02 | Latihan Bukti: alasan umum, persen yang cukup | tanpa target | B4 |
| B11-C01 | aljabar, bentuk gabungan (selisih kuadrat + selisih) | 90 | C1 |
| B11-C02 | nilai dari tabel, sel kosong + kolom tak dipakai | 75 | C2 |
| B11-C03 | ya/tidak + laju, sebagian pekerjaan sudah selesai | 90 | C3 |
| B11-C04 | perbandingan dua bentuk, tanpa ukuran | 75 | C4 |
| B11-C05 | persen, yang ditanya persentase | 90 | C5 |
| B11-C06 | tiga pernyataan, opsi per soal | 120 | C6 |
| B11-C07 | P vs Q berpeubah dengan rentang | 90 | C7 |
| B11-L01 | nilai dari cerita, data periode lain | 75 | L4 |
| B11-L02 | perbandingan + tambahan anggota (**urutan opsi diacak**) | 75 | L7 |
| B11-L03 | ya/tidak + laju, batas laju seluruh pelaksana | 90 | L5 |
| B11-L04 | persen + "lebih banyak p% daripada" | 90 | L9 |
| B11-L05 | aljabar, persamaan turunan tersembunyi | 120 | L2 |
| B12-P01 | lima lantai, pasti benar | 120 | P |
| B12-C01 | urutan 6 unsur + atribut, pilih susunan | 120 | C1 |
| B12-C02 | melingkar 8 kursi + syarat "jika", pasti benar | 150 | C2 |
| B12-C03 | urutan sebagian 7 unsur + "tepat setelah", tidak mungkin | 120 | C3 |
| B12-C04 | pencocokan 4 orang × 2 atribut, pasti benar | 120 | C4 |
| B12-L01 | garis 7 tanpa atribut, pilih susunan | 90 | L1 |
| B12-L02 | melingkar 6 dalam bentuk kecukupan data (**urutan opsi diacak**) | 120 | L10 |
| B12-L03 | jadwal 6 orang × 3 hari, mungkin benar | 150 | L8 |
| B12-L04 | melingkar 7 kursi, tidak mungkin | 150 | L4 |
| B13-P01 | termurah, 4 kemasan, opsi kombinasi | 150 | P |
| B13-C01 | termurah + stok terbatas, opsi biaya | 120 | C1 |
| B13-C02 | terbanyak dengan anggaran, opsi isi | 120 | C2 |
| B13-C03 | membaca data dua periode, pasti benar | 90 | C3 |
| B13-L01 | membaca data satu periode, tidak dapat dipastikan | 75 | L5 |
| B13-L02 | termurah + ongkos kirim per jenis | 120 | L4 |
| B13-L03 | termurah, dua jenis barang dalam paket campuran | 150 | L2 |

Target total latihan: Bab 11 7 menit 30 detik · Bab 12 8 menit 30 detik · Bab 13 5 menit 45 detik. Pita (dihitung build dari data-target): ±90 · ±120 · ±120 detik, sejalan dengan tabel waktu Bab 1. Latihan Bukti tanpa `data-target`, jadi tidak memengaruhi pita dan total latihan.

Alasan pilihan latihan (rinci di kotak "Asal Rancangan"): Bab 11 = kelima bentuk masing-masing satu, makna kunci 1/G/2/M/X lengkap; Bab 12 = empat kata tanya dan tiga wadah berbeda, jadwal Putusan 8 dapat soal; Bab 13 = tiga syarat baru (ongkos, dua barang, kata tanya data lain). Gugur karena paling dekat bahan beredar: B11 L6 (≈ Paket 41 no. 50), B13 L1 (≈ Paket 41 no. 56), B11 L1 (≈ Bab 2 C04).

## Hasil cek
- `python3 src/build.py`: **galat 0** (frasa terlarang termasuk "satu-satunya"; "maka/karena itu" ≤ 1 per subbagian; istilah dapur, kode, nama tryout di versi siswa; target kartu = data-target). Keempat script cek lulus.
- `scripts/cek_bab11_13.mjs`: 67 angka/status narasi dicek; 2 gambar Bab 12 = hasil script.
- Cek mata lembar kontak (siswa hlm 58–77, pengajar hlm 69–92; gambar kursi diperbesar 200 dpi): ditemukan dan diperbaiki (1) baris yatim satu baris di puncak halaman (hlm 63, 70, 74) → paragraf Bab 11–13 tidak dipenggal; (2) pengantar tabel tertinggal di kaki halaman tanpa tabelnya → pengantar ikut tabel; (3) dua tabel data Bab 13 terbelah antarhalaman → dibungkus utuh; (4) rantai `break-after: avoid` membuat Chrome tetap memenggal paragraf → rantai diputus di Bab 11–13. Sesudahnya tanpa luberan, teks terpotong, atau judul tertinggal sendirian.
- `impeccable detect` atas tiga berkas baru: tanpa temuan.
- Gambar kursi diperiksa: nomor searah jarum jam, orang di kursi 1 menghadap ke tengah, panah "kanan" menuju kursi 6, sesuai klaim narasi dan bukti vektor di script.

## Jumlah halaman
Siswa **77 hlm** (Bab 11 hlm 58–66, Bab 12 67–72, Bab 13 73–77); kelompok 4 menambah 20 hlm. Pengajar **92 hlm** (Bab 11 hlm 69–79, Bab 12 80–86, Bab 13 87–92); menambah 24 hlm. Taksiran T2-D (±58 hlm siswa) jauh lebih besar karena latihan sudah dipangkas dan slot masih kosong; halaman naik saat soal dan pembahasan diisi (T5–T6).

Catatan jujur: laporan kelompok 3 menyebut pengajar 69 hlm dengan Bab 10 hlm 62–69; sekarang Bab 10 pengajar hlm 62–68. Aturan CSS kelompok 4 hanya menyasar Bab 11–13, `figure.diag`, dan `.tb.silang`, jadi selisih satu halaman itu tidak berasal dari perubahan ini; penyebabnya tidak saya telusuri.

## Rujukan silang Bab 1–10 (dicek, tidak diubah)
Bab 6 merujuk P dan Q berpeubah ke "Bab 11" (benar). Bab 1 tabel bentuk soal memakai nama bentuk "Kecukupan data / Penalaran analitis / Optimasi" dengan nomor bab 11/12/13 (nama bentuk, bukan judul bab; nomor benar). Bab 2 tabel prinsip merujuk "11–13" (benar). Tidak ditemukan rujukan yang salah.

## Belum diverifikasi (ditandai di buku atau catatan pengajar)
Kebiasaan bunyi pilihan kecukupan data pada soal resmi · kebiasaan "angka di pernyataan = jumlah awal" pada soal resmi (Putusan 6) · kemunculan jadwal dan pencocokan atribut di SKD 2026 · porsi resmi soal membaca data.

## Perlu putusan Gusti (urut prioritas, satu per respons)
1. **Isi kelompok 4 (Bab 11–13).** Rekomendasi: setujui.
2. **Letak dua Latihan Bukti.** Keduanya di Bab 11 (B11-B01 dua keadaan, B11-B02 alasan umum), karena cara membuktikan diajarkan di Bab 11. Alternatif: B11-B02 diganti Latihan Bukti susunan pembantah di Bab 12. Rekomendasi: pertahankan di Bab 11; Bab 12 sudah meminta susunan pembantah di bagian Pilihan yang Gugur setiap pembahasan.
3. **Kunci B13-L01 dipindah dari B ke C saat T5.** Sebaran rencana T2-D untuk Bab 13 tidak punya kunci C dan B muncul dua kali. Rekomendasi: setujui (hanya huruf, isi slot tetap).
4. **Catatan "bunyi pilihan longgar" di Bab 11.** Tambahan di luar rencana T2-D: memberi tahu siswa bahwa soal latihan di luar buku (tanpa nama) memakai bunyi E dan bunyi "atau" yang ambigu, dan cara menghadapinya. Rekomendasi: pertahankan; dasarnya temuan engine Pilar 5, kebiasaan soal resmi ditulis belum diverifikasi.
5. **Latihan P vs Q hubungan tetap (T2-D L12) tidak dimuat di Bab 11.** Perannya dipegang B06-L03 (T4-13), sedangkan Contoh 7 Bab 11 berkunci "tidak dapat ditentukan"; keduanya berpasangan. Rekomendasi: setujui.
