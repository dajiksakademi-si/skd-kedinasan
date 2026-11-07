# Audit + cek buta bank TKP 80 terhadap engine v1.3 (2026-10-25)

Status: **audit read-only selesai**. Bank tidak diubah. Perintah Gusti: "lanjutkan audit dan cek buta lalu report hasilnya".
Data: `Bank_Soal_TKP_HOTS_80.html` → `tmp/html_to_json.js` (JSON di scratchpad sesi). Prediksi buta: scratchpad `pred80.txt`.

## 1. Cara dan batasan (baca dulu)
- Cek buta (engine Prosedur langkah 10): stem + opsi tanpa kunci/poin/pembahasan, aku menebak kunci + poin 4 + yakin/ragu, disimpan per 20 soal **sebelum** membuka kunci.
- **Penilai = model yang sama dengan penulis bank.** Engine mengutamakan penilai beda model/manusia; ini tidak terpenuhi. Soal 1–12 (= Batch 2) sebagian skornya sudah kulihat di uji E. Aturan engine: hasil "sama" ≠ bukti valid; hasil "beda" = daftar reviu.
- Audit: Gerbang 1–4 v1.3 + validator v1.3 + cek per paket (sumbu, poin 1 aktif, tindakan sejenis, tangga AR) lewat script; Gerbang 3 dan Filosofi no. 1 dibaca manual.

## 2. Hasil cek buta
| | Hasil |
|---|---|
| Kunci cocok | **79/80**; yang yakin 62/62 |
| Kunci beda | **13** (aku D, kunci E) |
| Poin 4 cocok | 46/80 (Tinggi 25/48, Sangat Tinggi 21/32) |
| Level vs keyakinan | Sangat Tinggi: 27 dari 32 kuncinya kutebak dengan yakin |

Bacaan: kunci hampir selalu mudah ditemukan, padahal level "Sangat Tinggi" = poin 3-4-5 nyaris tak bisa dibedakan pada bacaan pertama. Label level tidak cocok dengan kesulitan nyata (menurut pembaca ini). Sebaliknya, **urutan poin 3 vs 4 tidak terbaca** di 34 soal (43%): 3, 7, 8, 11, 13, 14, 16, 17, 19, 21, 22, 23, 28, 30, 34, 37, 44, 51, 52, 55, 57, 60, 61, 62, 67, 68, 70, 72, 73, 74, 75, 76, 77, 79.

## 3. Temuan, urut berat

### P1 — Cacat kunci/skor (wajib tulis ulang sebelum dipakai siswa)
| Soal | Masalah | Bukti |
|---|---|---|
| 13 | Kunci E ("usulkan perbaikan daftar dokumen wajib untuk paket berikutnya") membereskan masalah yang tidak ada: stem menyatakan surat dukungan pabrik **sudah** disyaratkan; vendor yang tidak melampirkan. Pembeda "Kunci vs D" (kejadian tak berulang) tidak didukung fakta di stem → gagal Gerbang 3 + Pilar 4 no. 11 | stem 13; pembahasan "Kunci vs D" |
| 14 | B = poin 4 menyebut angka sementara "sebagai data terkini" = klaim tidak benar, dan lebih tinggi dari D (poin 2) | riset tkp-vs-kepribadian §A, Filosofi no. 1 |
| 22 | B = poin 4 membawa berkas asli keluar ruang baca, padahal stem menulis aturan "hanya dibaca di ruang baca" | stem 22 |
| 30 | A = poin 4 membuka unggah sesudah batas waktu ditutup; pembahasan sendiri menyebut "di luar kewenangan panitia" | pembahasan 30 "Kunci vs A" |
| 37 | E = poin 4 menyerahkan NIK + alamat warga | pembahasan 37 "Kunci vs E" |
| 67 | D = poin 4 memberi akses data warga padahal stem: perjanjian belum mengatur data pribadi | stem 67 |

Pola: opsi melanggar aturan sering diberi sumbu S3 dan skor 3–4. Skor 4 untuk pelanggaran mengajarkan siswa bahwa melanggar itu "hampir benar".

### P2 — Filosofi no. 1 / E(3) di poin 2–3 (opsi melanggar aturan tertulis atau berklaim keliru)
- **Jelas** (aturan ada di stem atau aturan umum yang pasti): 13A(2), 13C(3), 15D(3), 20A(2), 22D(2), 23A(2), 28B(3), 31B(3), 31C(2), 33C(3), 35A(3), 36A(2), 37B(2), 39C(3), 67A(2), 67B(3).
- **Perlu putusanmu** (bisa dibaca janji/risiko, bukan pelanggaran): 4A(3) "menjamin pasti tidak berubah", 17E(4) kirim data bulan lalu, 47B(3) mengisi LPJ atas nama komunitas, 64A(3) hapus berkas tanpa konfirmasi, 70A(4) nomor pribadi sebagai kanal pengaduan.
- Bila E(3) berlaku penuh: **±21 soal** perlu opsi diganti (termasuk P1).

### P3 — Batch 2 no. 3, 6, 8, 11 (titipan uji E)
| Soal | Skor sekarang | Menurut panduan 3v4 (status uji) |
|---|---|---|
| 3 | E=4 (S1, tunda sampai sore), B=3 (S3) | E merugikan pemohon **sekarang** → mestinya 3; tertukar |
| 6 | C=4 (S1, hentikan semua distribusi), E=3 (S3) | C merugikan desa **sekarang** → mestinya 3; tertukar |
| 8 | C=4 (S1), B=3 (S2) | pembahasan sendiri: C "sebagian sudah terlanjur berutang" = rugi sekarang → mestinya 3. **B dan C hampir sama** (dispensasi vs membebaskan, beda cuma waktu) → satu opsi mubazir |
| 11 | E=4 (tegur tegas di depan kelas, sendirian), B=3 | sesuai panduan; tapi tangga AR "ucapan → tegur di tempat" justru mendukung E. Kunci C "berkoordinasi dengan BK" padahal peran = guru BK (pembahasan: "tim BK") → perbaiki kata. **Kunci B2-11 bertahan, tapi rawan sanggah** |

### P4 — Anti Radikalisme (tangga AR belum diverifikasi)
- Kunci 12, 71, 72, 77, 78, 79, 80 sejalan dengan tangga.
- **76: tangga bentrok dengan dirinya sendiri.** "Dugaan → bicara langsung" (kunci A) vs "kabar pihak lain → serahkan untuk diverifikasi" (mendukung C, sekarang poin 3). Engine perlu aturan pemutus: kadar bukti didahulukan dari sumber kabar? Belum ada.
- **Label sementara V** (keberagaman tanpa ajakan memusuhi/kekerasan/pola = Sosial Budaya) memindahkan 73, 74, 79; batas: 11, 75, 78. Kalau dipakai, porsi AR bank 80 turun dari 12 ke 6–9.

### P5 — Tingkat paket (validator v1.3 + script)
- Validator: 255 error / 88 peringatan (rincian di memory.md root).
- Poin 1 berbunyi aktif **16/80 (20%)**, target ≥ 50%. Sisanya diam/menunda/menyerahkan. Kata pembuka bocor: "membiarkan" 20/20 poin 1, "menunggu/menunda" 16/16 poin 1, "menyerahkan" 16/19 poin 1.
- Sumbu poin 4: S1 33 · S4 22 · S5 14 · S3 8 · S2 3 (rata-rata 16, pita ±35% = 10–22) → S1 dan S2 di luar pita (catatan reviu, bukan gerbang).
- Tindakan sejenis "lapor/atasan" skornya tersebar 1–5 (5: 2D, 12D, 18A, 19B, 20C, 24C, 26E, 44B, 77B; 3–4: 5D, 16D, 20B, 38B, 41E, 46D, 71B, 74E, 76C, 78D). Kunci-atasan yang kucek punya pemicu wajar (wewenang/kerugian/konten kekerasan), tapi **tabel fakta pembeda belum ada** di lembar reviu.
- Belum ada di 80 soal: fakta penentu, pasangan kontras, pembahasan siswa.

## 4. Rekomendasi
1. P1 (6 soal) diperbaiki dulu — kesalahannya mengajarkan hal keliru ke siswa.
2. Bank 80 gagal v1.3 secara struktur (panjang, poin 1 pasif, jebakan menumpuk di poin 2, tanpa fakta penentu). Membenahinya di tempat = menulis ulang sebagian besar opsi. Pilihan wajar: P1 + P3 dibenahi di bank 80, lalu paket 45 baru ditulis dengan v1.3.
3. Cek buta ulang oleh **penilai beda model atau manusia** — hasil 79/80 di sini tidak membuktikan apa pun karena penilai = penulis.
4. Engine: tambah aturan pemutus tangga AR (temuan 76).
