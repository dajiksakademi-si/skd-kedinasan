# Tahap 6 · Pembahasan Latihan Bab 3–13 di Lampiran B (buku siswa)

Subagen tiu-t6-latihan, 2026-11-02. Putusan acuan: T5-4, T5-18, T5-19, T5-22, T5-23. Buku pengajar tidak dikerjakan (T5-22).

## Hasil

| Bab | Latihan dibahas | Bab | Latihan dibahas |
|---|---|---|---|
| 3 Analogi Kata | 3 | 9 Deret Angka Tabel | 4 |
| 4 Silogisme | 4 | 10 Soal Cerita | 5 |
| 5 Argumen | 3 | 11 Kecukupan Data | 5 + 2 Latihan Bukti |
| 6 Hitung Cepat | 3 | 12 Penalaran Analitis | 4 |
| 7 Pasangan Operasi | 3 | 13 Optimasi Tabel | 3 |
| 8 Deret Angka dan Suku ke-n | 4 | **Jumlah** | **41 + 2 = 43** |

- Tujuh langkah per pembahasan: soal diulang (tanpa catatan pengajar) → Inti pertanyaan → Langkah penyelesaian (verbal: cara cepat · mengapa benar · cek balik; numerik/KCK: cara cepat · cara lain · cek balik) → Pilihan yang gugur (nama kekeliruan + uji singkat) → Jawaban + alasan satu kalimat → Ilustrasi → Kekeliruan yang Mungkin Terjadi.
- Latihan Bukti (B11-B01, B11-B02): langkah yang sama, "Pilihan yang gugur" diganti "Jawaban yang belum sah" (dua kekeliruan dari tabel Bab 11), kotak jawaban berisi "Contoh jawaban sah" + syaratnya.
- Bebas istilah dapur, tanpa "maka"/"karena itu" sama sekali di Lampiran B (build.py menghitung Lampiran B sebagai satu subbagian), tanpa frasa terlarang. Soal, pilihan, dan kunci tidak berubah (diff data: hanya `pembahasan` dan `nama` butir latihan).
- Angka: semua rantai hitung numerik/KCK dihitung ulang script; angka lain wajib berasal dari soal, pilihan, tabel, atau rantai (soal_numerik 616 rantai, soal_kck 139 rantai, keduanya termasuk pembahasan contoh lama).
- B08-L03: pembahasan menyebut abjad berputar sesudah Z (catatan cek buta 2).

## Berkas

- `scripts/lampiran_b.mjs` (baru, alat bersama): `namaTabel`, `judulBab`, `keBahas`, `potongan`, `lampiranB`.
- `scripts/soal_verbal.mjs`, `soal_numerik.mjs`, `soal_kck.mjs`: latihan wajib 7 langkah; nama kekeliruan latihan wajib ada di tabel kekeliruan bab (kecuali daftar `NAMA_LUAR`, lihat putusan 1); render pembahasan ke blok `<!--LB-B03-05|B06-10|B11-13:mulai-->…:selesai-->` di `src/90_lampiran_siswa.html`; mode periksa gagal bila blok berbeda.
- `scripts/data/verbal_b03_05.json`, `numerik_b06_10.json`, `kck_b11_13.json`: field `pembahasan` latihan + `nama` diselaraskan ke tabel bab.
- `src/13–23_bab*.html`: label Latihan `<span id="soal-ID">Latihan n<a class="ke" href="#bahas-ID">Lihat pembahasan</a></span>` (id di span label, bukan di div data-soal).
- `src/90_lampiran_siswa.html`: Lampiran B = paragraf pengantar + tiga blok LB (judul bab `h4.sub`, tiap pembahasan `<div class="bahas-latihan" id="bahas-ID">` diakhiri `<p class="balik"><a class="ke" href="#soal-ID">Kembali ke soal</a></p>`) + kotak kosong untuk Bab 2 dan 14–19.

## Verifikasi

- `python3 src/build.py`: galat 0; semua cek lulus (cek_lampiran tetap menemukan "68 latihan pilihan ganda dan 2 Latihan Bukti" di pengantar Lampiran B).
- `pdfinfo Handbook_TIU_Siswa.pdf`: 255 halaman (sebelumnya 202). Lampiran B hlm 196–248 (Bab 3 mulai 196, Bab 6 209, Bab 11 229, Bab 13 245); Lampiran C hlm 249.
- Tautan internal PDF siswa: 108 anotasi `/Link` = 54 pasang (11 Pertanyaan Pembuka Bab 3–13 + 43 Latihan); tujuan bernama dicek ada (mis. bahas-B13-L03, soal-B13-L03, bahas-B11-B02, soal-B06-L01).
- Cek mata (pdftoppm, scratchpad): hlm 196 (judul Lampiran B, Bab 3 Latihan 1), 212 (akhir B06-L03 + B07-L01, pil "Kembali ke soal" rata kanan), 231 (Latihan Bukti 2 lengkap), 61 (pil "Lihat pembahasan" di kartu): bersih, teks tidak terpotong.

## Butir putusan untuk Gusti

1. **16 nama kekeliruan latihan belum punya baris di tabel bab** (dibiarkan dengan nama aslinya, dicatat `NAMA_LUAR` di script): B06-L03 C "Batas rentang ikut dihitung"; B08-L01 D "Selisih dipasang di tempat yang salah"; B08-L02 E "Memakai data yang tidak dibutuhkan"; B09-L01 A, C dan B09-L02 B "Bilangan kiri meleset satu"; B10-L01 C "Selisih dikira bagian Banu", E "Selisih dikira satu bagian"; B10-L03 A "Yang dijawab laju arus", B "Salah tanda"; B10-L04 B "Tara dikurangkan dua kali", E "Harga dihitung dari bruto"; B12-L04 A, D "Berhenti di satu susunan yang dicoba"; B13-L01 B "Membandingkan persentase padahal yang ditanya jumlah", E "Menganggap pernyataan umum sebagai dugaan". **Rekomendasi:** terima apa adanya sekarang (nama tabel yang ada akan menyesatkan siswa untuk jalur ini); putuskan bersama antrean T5-23 (nama pembahasan Contoh Bab 11–13). Menambah baris tabel berarti Bab 19 (136 baris) dan cek_bab19 ikut berubah.
2. **Nama tabel dipakai untuk jalur yang sedikit melebar dari kodenya:** B04-L03 C (kode "sebagian", nama "Ingkaran keliru"), B11-L04 C (kode persen, nama "Berhenti satu langkah sebelum selesai": 40% × 120 = 48 tanpa ditambah 120), B06-L01 D (× 7 terlewat di tengah, nama "Berhenti satu langkah sebelum selesai"), B10-L02 C/E dan B10-L03 C (rata-rata laju, nama "Menjumlahkan waktu, padahal yang dijumlahkan laju", sudah dipakai data sejak T5). **Rekomendasi:** terima; uraian di pembahasan menyebut jalurnya.
3. **Pengantar Lampiran B menyebut 68 latihan + 2 Latihan Bukti** (dituntut cek_lampiran), sedangkan isinya baru Bab 3–13 (41 + 2); sisanya di kotak "menyusul". **Rekomendasi:** terima sampai Bab 2 dan 14–19 selesai.
4. **Lampiran A (kunci) masih kosong**, padahal teksnya berjanji "setiap huruf bertaut ke pembahasannya di Lampiran B". **Rekomendasi:** isi Lampiran A Bab 3–13 dari data (script kecil, tautan ke `#bahas-ID`) sebagai langkah berikut, atas perintah Gusti.
5. **Tata letak:** beberapa halaman Lampiran B berakhir dengan ruang kosong karena kartu soal tidak boleh terpotong (mis. hlm 231). **Rekomendasi:** tunda ke T7, sejalan T4-43/T5-15.
