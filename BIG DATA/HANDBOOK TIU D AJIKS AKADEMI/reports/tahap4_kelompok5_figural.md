# Tahap 4 · Kelompok 5 — Bab 14 Perubahan Gambar, Bab 15 Seri Gambar, Bab 16 Analogi Gambar, Bab 17 Gambar Berbeda, Bab 18 Matriks

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen kelompok 5 (tiu-t4-figural)
Status: draf menunggu persetujuan Gusti. Tidak ada soal, gambar soal, opsi, atau kunci yang dibuat, dan generator `k12-spatial-engine` tidak dijalankan atau diubah. Semua kotak contoh, latihan, dan gambar penjelas berupa tempat kosong ber-ID.

## Berkas
| Berkas | Isi |
|---|---|
| `src/24_bab14.html` | Bab 14 Perubahan Gambar (judul T4-22); bagan SVG tiga panel urutan keliling (buatan script, bukan soal) |
| `src/25_bab15.html` | Bab 15 Seri Gambar (label sampul) |
| `src/26_bab16.html` | Bab 16 Analogi Gambar (T4-22) |
| `src/27_bab17.html` | Bab 17 Gambar Berbeda (label sampul) |
| `src/28_bab18.html` | Bab 18 Matriks (label sampul) |
| `scripts/cek_bab14_18.mjs` | 66 angka/status narasi dicek muncul persis di src. Delapan gerak sebagai matriks 2 × 2: 64 gabungan tertutup, aturan banyak cermin untuk semua rangkaian tiga langkah, tabel delapan gerak, tabel gabungan, pembatal dua langkah, bentuk simetris, 45°, jam di cermin (bukti sudut kedua jarum), periode, sisa pembagian, KPK 4 dan 3, tabel periksa, dua bacaan tambah/kali (rumus sama dengan `tiu-fig-ubah.ts`), hubungan dua jumlah, matriks hitung dua arah, gabung vs buang yang sama, persegi latin. Bagan Bab 14 dibangkitkan script (`--svg`). Juga assert: judul h2 persis, kepala bab, urutan + ID slot, target per slot = rencana, gambar penjelas tanpa target, latihan 3/3/3/3/4, pita = modus target (seri: yang muncul dulu, sama dengan build.py), waktu latihan, "satu-satunya" 0, tingkat tertulis di setiap catatan pengajar, satu aturan hanya di pembuka/contoh 1/latihan 1 (T2-2), Bab 15–18 ditutup 2 latihan tingkat 3, tabel Bab 1 |
| `src/build.py` (1 baris) | tuple cek + `cek_bab14_18.mjs`; daftar larangan tidak diubah |
| `src/00_head.html` (bagian "tambahan buku") | `.diag3` (bagan tiga panel, memakai kartu `figure.diag` Bab 12), aturan pemenggalan `.bab.fig` (paragraf utuh, pengantar ikut tabel/bagan, daftar langkah utuh, tabel kekeliruan `.tb.pecah` boleh berlanjut ke halaman berikut dengan kepala tabel diulang) |
| `src/11_bab01.html` (1 sel tabel) | tabel "Cara Menggunakan Buku Ini" baris Figural: "perubahan gambar, deret gambar, analogi gambar, gambar yang berbeda, matriks 3 × 3" → "perubahan gambar, seri gambar, analogi gambar, gambar berbeda, matriks" (penyamaan nama bab). Bab 2 dan Bab 6 tidak memuat judul Bab 14–18 (dicek) |

## Isi per bab
Konsep inti figural (transformasi gambar + pencacahan objek) dan kebiasaan **pemeriksaan tuntas** diperkenalkan sekali di Bab 14 (tabel lima bab, pola tabel Bab 6), lalu dipakai di Bab 15–18. Istilah Putusan 9b dipakai di seluruh bab; "cermin vertikal/horizontal" disebut sekali di kotak Catatan Bab 14 sebagai peringatan.

**Bab 14** (pita ±40 detik): Pertanyaan Pembuka · Konsep Transformasi Gambar dan Pencacahan Objek · Delapan Gerak pada Sebuah Gambar (tabel penanda + urutan keliling; Catatan istilah) · Membedakan Putaran dan Pencerminan (bagan tiga panel, aturan banyak cermin) · Menggabungkan dan Membatalkan Perubahan (tabel lima gabungan, urutan berpengaruh, pembatal dua langkah) · Bentuk Simetris · Balik Warna dan Pindah Tempat (seluruh kotak vs tiap objek) · Kalimat Perubahan (tabel contoh) · Perubahan yang Bukan Gerak (jumlah, gabung, ukuran; Catatan 45° dan jam di cermin + tabel, keduanya "belum diverifikasi") · Langkah (7) · Kekeliruan (8) · Contoh · Latihan · Ringkasan.

**Bab 15** (±70): Pertanyaan Pembuka · Seri Gambar sebagai Barisan Perubahan (n − 1 langkah, tautan Bab 8) · Periode dan Sisa Pembagian (tabel periode, gambar ke-10) · Pola Berselang (selang tiga = tiga barisan berselang) · Dua Kelompok dengan Periode Berbeda (KPK 12, tabel sisa, gambar 5 ≠ gambar terlihat) · Tanda Tanya di Tengah Seri (jalan maju + mundur) · Memeriksa Semua Objek pada Semua Pilihan (tabel periksa: setelah dua objek masih tiga pilihan) · Langkah (7) · Kekeliruan (8) · Contoh · Latihan · Ringkasan.

**Bab 16** (±60): Pertanyaan Pembuka · Aturan Perubahan Setiap Objek (menurut letak, bukan bentuk) · Letak Tanda Tanya dan Pembatal Perubahan (tabel empat letak) · Perubahan Jumlah: Ditambah atau Dikali (2 → 4 lalu 3 → 5 atau 6) · Tukar Tempat dan Ukuran · Menguji Bacaan Lain · Langkah (7) · Kekeliruan (8) · Contoh · Latihan · Ringkasan.

**Bab 17** (±60): Pertanyaan Pembuka · Empat Gambar Sekeluarga (sifat tetap, "tepat empat"; Catatan bunyi perintah belum diverifikasi) · Tiga Sifat yang Tetap (urutan keliling per objek, hubungan dua jumlah dengan tabel daun-bintik, pasangan aturan jika–maka) · Ciri Mencolok yang Menyesatkan · Langkah (6) · Kekeliruan (7) · Contoh · Latihan · Ringkasan.

**Bab 18** (±50): Pertanyaan Pembuka · Satu Aturan untuk Setiap Baris (tiga keluarga: gerak, hitung, gabung) · Matriks Gerak (dua langkah = satu gerak, bukti dua jalan, titik pojok) · Matriks Hitung (matriks bilangan 1 3 5 / 2 4 6 / 3 5 ?, 7 dari dua arah) · Matriks Gabung (tabel gabung vs buang yang sama, ujung ditumpulkan) · Persegi Latin dan Gabungan Warna (tabel latin teks + kalimat gabungan warna + Catatan "belum diverifikasi") · Langkah (7) · Kekeliruan (10) · Contoh · Latihan · Ringkasan.

Setiap bab punya catatan pengajar: padanan nama kekeliruan ↔ kode JF-/J- + kelompok K (kalimat guru = kolom engine v0.4.3), "Asal Rancangan" (slot T2-E dipilih/gugur + alasan, sebaran huruf rencana, cek R4), dan spesifikasi setiap slot (jenis generator, tingkat, keluarga T2-6, aturan, kode kekeliruan, rencana kunci, butir generator G4–G10).

## Slot (43 = 18 nonlatihan + 16 latihan + 9 gambar penjelas; semuanya kosong)
| ID | Jenis (asal T2-E) | Tk | Keluarga | Target | Kunci rencana |
|---|---|---|---|---|---|
| B14-P01 | FIG-BEDA-PUTAR 1 objek (P14) | 2 | PERKAKAS | 40 | B |
| B14-I01 | gambar penjelas 8 gerak (I14-1) | — | ILUS rajawali | — | — |
| B14-I05 | simetris vs tidak (I14-5) | — | ILUS bolakisi | — | — |
| B14-I06 | balik warna (I14-6) | — | ILUS bolakisi | — | — |
| B14-I07 | tukar tempat; seluruh kotak vs tiap objek (I14-7) | — | ILUS | — | — |
| B14-I08 | bukan gerak: jumlah, gabung, ukuran (I14-8) | — | keris ≥ 900, ranting, obor | — | — |
| B14-I09 | putaran 0°/45°/90° (I14-9) | — | ILUS sayapbulu | — | — |
| B14-C01 | FIG-ANA-OBJ 1 objek, cermin garis / (C14-1) | 2 | LAUT | 45 | D |
| B14-C02 | FIG-ANA-OBJ 2 objek, cermin + warna + tukar (C14-2) | 3 | WARISAN | 60 | A |
| B14-L01 | sebutkan perubahannya (L14-1) | 1 | SATWA | 25 | E |
| B14-L02 | kenakan dua langkah tertulis (L14-3) | 2 | LAUT | 40 | C |
| B14-L03 | FIG-ANA-OBJ 2 objek, cermin di tempat (L14-6) | 3 | batu ≥ 900 | 60 | B |
| B15-P01 | FIG-SERI-KUADRAN siluet (P15) | 3 | WARISAN | 70 | C |
| B15-I01 | periode 4 dan 2 (I15-1) | — | ILUS | — | — |
| B15-C01 | FIG-SERI-P3 tanpa bintik (C15-1) | 2 | SATWA | 40 | A |
| B15-C02 | FIG-SERI-P3 + bintik (C15-2) | 3 | LAUT | 55 | E |
| B15-C03 | FIG-SERI-KUADRAN, "?" di gambar 4 (C15-3) | 3 | PERKAKAS | 70 | B |
| B15-L01 | FIG-SERI-P3 tanpa bintik, putar 90° (L15-1) | 2 | sabit ≥ 900 | 40 | D |
| B15-L02 | FIG-SERI-P3 + bintik, cermin garis miring (L15-4) | 3 | teratai ≥ 900 | 55 | A |
| B15-L03 | FIG-SERI-KUADRAN berlawanan arah (L15-5) | 3 | sayap ≥ 900 | 70 | C |
| B16-P01 | FIG-ANA-OBJ 3 objek, "?" di (3) (P16) | 3 | batu ≥ 900 | 60 | E |
| B16-C01 | FIG-ANA-OBJ 2 objek, satu perubahan (C16-1) | 2 | SATWA | 45 | B |
| B16-C02 | FIG-ANA-UBAH (C16-2) | 3 | keris + ranting, LAUT | 70 | D |
| B16-L01 | FIG-ANA-OBJ 1 objek, "?" di (2) (L16-1) | 2 | PERKAKAS | 45 | A |
| B16-L02 | FIG-ANA-OBJ 3 objek, putar + warna + tukar (L16-3) | 3 | awan ≥ 900 | 60 | C |
| B16-L03 | FIG-ANA-UBAH, bawah putar 180° (L16-6) | 3 | keris + awan, PERKAKAS | 70 | E |
| B17-P01 | FIG-BEDA-PUTAR 3 objek (P17) | 3 | PERKAKAS | 60 | D |
| B17-C01 | FIG-BEDA-PUTAR 2 objek (C17-1) | 2 | LAUT | 45 | C |
| B17-C02 | FIG-BEDA-HITUNG (C17-2) | 3 | WARISAN | 55 | A |
| B17-C03 | FIG-BEDA-TUMPUK (C17-3) | 3 | sabit ≥ 900 + PERKAKAS | 60 | E |
| B17-L01 | FIG-BEDA-PUTAR 2 objek (L17-1) | 2 | SATWA | 45 | B |
| B17-L02 | FIG-BEDA-HITUNG (L17-3) | 3 | kerang + tunas + rantai | 55 | D |
| B17-L03 | FIG-BEDA-TUMPUK (L17-5) | 3 | tunas + WARISAN | 60 | A |
| B18-P01 | FIG-MTX-PUTAR dua langkah sama (P18) | 2 | SATWA | 50 | A |
| B18-I01 | persegi latin (I18-1) | — | ILUS | — | — |
| B18-I02 | digabung vs gabungan warna (I18-2) | — | ILUS | — | — |
| B18-C01 | FIG-MTX-PUTAR + titik pojok (C18-1) | 3 | kerang ≥ 900 | 60 | C |
| B18-C02 | FIG-MTX-HITUNG (C18-2) | 3 | keris + PERKAKAS | 45 | B |
| B18-C03 | FIG-MTX-GABUNG (C18-3) | 3 | {ranting, lengkung, sinar} | 65 | E |
| B18-L01 | FIG-MTX-PUTAR arah kolom, satu langkah (L18-1) | 2 | WARISAN | 50 | D |
| B18-L02 | FIG-MTX-PUTAR dua langkah, arah kolom (L18-2) | 3 | tunas ≥ 900 | 60 | A |
| B18-L03 | FIG-MTX-HITUNG (L18-4) | 3 | teratai + LAUT | 45 | E |
| B18-L04 | FIG-MTX-GABUNG (L18-7) | 3 | {puncak, sinar, lengkung} | 65 | B |

Waktu latihan: Bab 14 2 menit 5 detik · Bab 15 2 menit 45 detik · Bab 16 2 menit 55 detik · Bab 17 2 menit 40 detik · Bab 18 3 menit 40 detik. Tingkat soal (34): tingkat 1 = 1, tingkat 2 = 11, tingkat 3 = 22.

## Hasil cek
- `python3 src/build.py`: **galat 0**; kelima script cek lulus (`cek_bab14_18`: 66 angka/status, 43 tempat kosong, bagan Bab 14 = hasil script).
- `impeccable detect` atas lima berkas baru: tanpa temuan.
- Cek mata lembar kontak (dua putaran + satu konfirmasi, siswa hlm 78–103, pengajar hlm 93–123). Diperbaiki: (1) tabel kekeliruan Bab 14 terdorong utuh ke halaman berikut sehingga hlm 83 setengah kosong → tabel kekeliruan figural boleh berlanjut dengan kepala tabel diulang; (2) butir 7 daftar langkah Bab 18 yatim di puncak halaman → daftar langkah utuh; (3) aturan "pengantar ikut kartu soal" yang dicoba membuat kartu Contoh 1 Bab 18 terbelah dan Ringkasan Bab 18 sendirian di hlm 104 → aturan dicabut; (4) tabel gabungan warna diringkas jadi satu kalimat (isinya sama dengan kolom "buang yang sama") supaya Ringkasan Bab 18 tidak menempati halaman sendiri. Sisa: beberapa halaman berakhir 25–40% kosong karena tabel/kartu tidak dipenggal (hlm 81, 82, 100, 101 siswa), sama dengan yang diterima di kelompok 3.

## Jumlah halaman
Siswa **103 hlm** (Bab 14 hlm 78–85, Bab 15 86–90, Bab 16 91–94, Bab 17 95–98, Bab 18 99–103); kelompok 5 menambah 26 hlm. Pengajar **123 hlm** (Bab 14 hlm 93–101, Bab 15 102–107, Bab 16 108–112, Bab 17 113–117, Bab 18 118–123); menambah 31 hlm. Bab 1–13 tidak bergeser (Bab 14 mulai tepat sesudah hlm 77 / 92). Taksiran T2-E (±71 hlm isi bab siswa) belum sebanding: latihan sudah dipangkas dan slot masih kosong; halaman naik saat gambar dan pembahasan diisi.

## Penyimpangan dari rencana tahap2_E (dan alasannya)
1. **Latihan dipangkas ke 3/3/3/3/4 (T2-1b).** Dipilih per bab: 14 L14-1/3/6 · 15 L15-1/4/5 · 16 L16-1/3/6 · 17 L17-1/3/5 · 18 L18-1/2/4/7; alasan dan yang gugur tertulis di "Asal Rancangan" tiap bab. Akibat T2-2, latihan tingkat 2 kedua di Bab 15/16 (L15-2, L16-2) gugur.
2. **Gambar penjelas Bab 14 dari 9 menjadi 6 tempat kosong.** I14-2 (urutan keliling) diganti bagan tiga titik buatan script (konsep, bukan soal; pola SVG Bab 12). I14-3 dan I14-4 (rantai gabungan, urutan berpengaruh) diganti tabel gabungan, karena isinya nama gerak, bukan rupa bentuk.
3. **Gabungan warna Bab 18 tanpa tabel sendiri**, cukup satu kalimat + gambar penjelas I18-2 (alasan tata letak, isi sama dengan kolom "buang yang sama"). Persegi latin diberi tabel teks (daun, bulan, bintang) + I18-1.
4. **Perubahan ukuran tanpa soal.** L16-5 (satu-satunya soal berukuran di rencana) gugur saat pemangkasan; ukuran tinggal di narasi Bab 14/16 dan gambar penjelas I14-8.
5. **Kode kekeliruan memakai daftar engine v0.4.3 (JF-*)**, bukan usulan T1-E (J-IRAMA, J-TEGAK, J-SEKILAS, dst.), mengikuti Putusan 3.
6. **Tabel kekeliruan figural boleh terbelah antarhalaman** (kelas `.tb.pecah`), berbeda dari bab 1–13 yang tabelnya selalu utuh. Alasan: tabel 8–10 baris membuat halaman setengah kosong.
7. **Sifat "hubungan arah dua elemen"** (bimbel lain) tidak dimuat: tidak ada di generator dan belum diverifikasi (sesuai catatan T2-E).

## Belum diverifikasi (ditandai di buku)
Kemunculan putaran 45° · jam di cermin · persegi latin · gabungan warna di SKD 2026 · bunyi perintah soal gambar berbeda di CAT 2026 (buku memakai perintah generator "Perhatikan kelima gambar berikut. Gambar manakah yang berbeda dari yang lain?").

## Butir antre untuk Gusti (urut prioritas, satu per respons)
1. **Isi kelompok 5 (Bab 14–18).** Rekomendasi: setujui.
2. **Pita bab dengan target seri.** Bab 14 (40 dan 60 sama-sama 2×), Bab 16 (45, 60, 70 masing-masing 2×), dan Bab 18 (50, 60, 45, 65 masing-masing 2×) ditentukan otomatis oleh aturan build.py: target yang muncul lebih dulu. Hasilnya ±40, ±60, ±50 detik. Rekomendasi: biarkan aturan ini (seragam di semua bab, dihitung script); angka akan dihitung ulang saat T5 bila target berubah.
3. **Latihan 2 Bab 14 (kenakan dua langkah, tingkat 2) dan T2-2.** T2-2 membatasi soal satu aturan di latihan pertama. Latihan 2 memuat dua langkah yang diberikan di perintah, bukan ditemukan siswa, dan bentuknya diizinkan T2-7(10). Rekomendasi: pertahankan; script mengecualikannya secara tertulis.
4. **Perubahan ukuran tanpa soal** (penyimpangan 4). Putusan 8(2) meminta subbagian pendek, dan itu terpenuhi. Rekomendasi: terima; tidak menambah soal (total tetap 151).
5. **Simbol garis miring "/" dan "\".** Putusan 9b menyebut "cermin garis miring"; buku membedakan dua garis miring dengan simbol / dan \, karena kedua cermin itu memberi hasil berbeda (tabel gabungan). Rekomendasi: terima.
6. **Bab 2 memakai frasa "Gambar yang berbeda" di spesifikasi Tes Awal 4 dan Contoh 5** (bukan tabel/daftar bab, jadi tidak saya ubah). Rekomendasi: samakan menjadi "Gambar berbeda" (dua kata di `12_bab02.html`), bila Gusti mengizinkan menyentuh Bab 2.
7. **Gambar penjelas I14-1 memakai ILUS rajawali** sesuai rencana, padahal satwa lambang pernah gagal cek mata (log figural 2026-10-28). Rekomendasi: saat T5, bila gagal cek mata, ganti bolakisi atau sayapbulu tanpa putusan baru.
8. **Syarat T2-6 sebelum T5:** lembar banding benda (LAUT, PERKAKAS, WARISAN, SATWA) bergaya siluet ditinjau Gusti. Bukan putusan T4, hanya pengingat: 23 dari 34 soal figural memuat keluarga benda (sebagai objek utama, objek bawah, objek kecil, atau hiasan). Batas R5 lolos: PERKAKAS 7, LAUT 6, WARISAN 5, SATWA 5 soal (≤ 8).
