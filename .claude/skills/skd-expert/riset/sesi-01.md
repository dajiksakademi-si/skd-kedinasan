# Sesi 1 — Domain resmi SKD 2026 · 2026-10-27

## Ringkasan bahan
- **Internal:** `GENERATE SOAL TERBARU SKD 2026/Modul Soal SKD BKN & Psikotes POLRI Kedinasan 2026.pdf` (10 hlm, dibaca penuh). Isinya 50 soal TIU numerik dan logika, 10 kategori × 5: deret huruf, deret angka, deret alfanumerik dalam tabel, posisi kedalaman (bilangan bulat), konversi massa, persamaan waktu, pecahan, sisa bahan, silogisme, perbandingan uang/persen. Pembahasan berupa satu blok hitungan per soal, dan sebagian masih memuat kode LaTeX mentah (`$\xrightarrow{}$`, `\mathbf`).
- **Eksternal:**
  - PermenPANRB 6/2024 tentang Pengadaan Pegawai ASN (naskah resmi, 30 hlm), dibaca pada Pasal 30–31 dan 69–70;
  - pencarian ambang CPNS 2025/2026;
  - pencarian jadwal dan formasi sekolah kedinasan 2026.
  - Rincian ada di usulan `usulan/2026-10-27.md` bagian "Sesi 1".

## Pola konstruksi modul
- Satu kategori berisi lima soal dengan templat yang sama. Contohnya kategori 6: "N jam = X menit − M detik" diulang lima kali dengan angka lain. Siswa cukup paham satu soal, keempat soal lain tinggal hitung ulang. sumber: `GENERATE SOAL TERBARU SKD 2026/Modul Soal SKD BKN & Psikotes POLRI Kedinasan 2026.pdf` hlm 6
- Pengecoh angka sebagian besar tidak lahir dari salah langkah. Contoh: di 4.x pengecoh "di atas laut" hanya membalik tanda. Di 5.x dan 8.x pengecoh hanya selisih ±100–500 tanpa salah hitung yang bisa dinamai.
- **Kunci A: 39 dari 50** (B 6, C 3, D 2, E 0). Kategori 4–8 dan 10 semuanya berkunci A. Siswa bisa menebak dari posisi. sumber: hitung ulang script sesi ini

## Uji mutu (kunci dihitung ulang dengan python)
| Soal | Vonis |
|---|---|
| 10.4 | **Kunci salah.** Rasio 2:3:5, Candra − Bima = 2 bagian = Rp120.000, sehingga 1 bagian = Rp60.000 dan Alif = 2 bagian = **Rp120.000 (D)**, bukan Rp80.000 (A). Pembahasan modul menulis "2 × 60.000 = 80.000". sumber: hlm 10 |
| 9.1 | **Cacat nalar.** Premis "harus lulus" menyatakan syarat, bukan fakta. Opsi A "Budi lulus" melampaui premis; kesimpulan sah adalah "Budi harus lulus tes kesamaptaan", dan rumusan itu tidak ada di opsi. hlm 9 |
| 9.5 | Sah (modus tollens). Kesimpulannya tidak bertentangan dengan fakta, hanya premisnya yang absolut ("Semua siswa STIS jago matematika"). |
| 4.4 | Konteks janggal: drone bawah laut berakhir "5 m di atas laut (di udara)". Hitungan benar, tetapi cerita tidak masuk akal. hlm 4 |
| 1.4 | Hitungan benar (22 + 7 = 29, kembali ke awal alfabet → C). Aturan "memutar alfabet" tidak disebut di soal, jadi soal bergantung pada asumsi. hlm 1 |
| 2.3, 7.5 | Desimal ditulis dengan titik (13.5, 1.8), sedangkan pembahasan 7.5 memakai koma (1,8). Penulisan desimal baku Indonesia memakai koma. |
| Lainnya | 1.1, 1.3, 2.1, 2.5, 5.4, 7.1, 7.3, 8.3, 10.2, 10.3, 10.5 dihitung ulang: kunci benar. |

- **Klaim penyusun "Tim Pengembang Soal SKD BKN"** tidak berdasar. Ini modul pihak ketiga; jangan dirujuk sebagai bahan resmi BKN.
- **Cocok dengan kisi-kisi resmi?** Kepmen 406/2026 KEDUA b menyebut TIU numerik: berhitung, deret angka, perbandingan kuantitatif, dan soal cerita; serta verbal: analogi, silogisme, dan analitis.
  - Deret huruf, deret alfanumerik, konversi satuan, dan persamaan waktu tidak disebut secara harfiah. Paling dekat, keempatnya dapat digolongkan ke "deret" dan "berhitung".
  - Analogi, analitis, perbandingan kuantitatif, dan seluruh figural tidak ada di modul.

## Perbandingan dengan engine D'Ajiks
- **Lebih baik di modul:** variasi konteks seragam militer/kedinasan, yang cocok untuk audiens polisi/kedinasan.
- **Lebih baik di engine TIU v0.3:**
  - angka dihitung script dengan bukti kunci tunggal; modul gagal di 10.4;
  - kunci seimbang;
  - pengecoh bernama (Kamus Jebakan);
  - anti-templat berulang (G8).
  - Modul melanggar keempatnya.
- Tidak ada pola baru yang perlu diadopsi.

## Pelajaran untuk mengajar
1. Bahan bertajuk "SKD BKN" belum tentu bahan resmi. Cek kuncinya sendiri, terutama soal rasio: "selisih bagian → nilai satu bagian → kalikan bagian yang ditanya".
2. Silogisme dengan kata "harus/wajib" menghasilkan kesimpulan "harus", bukan fakta "sudah".
3. Kalau satu modul punya lima soal berkunci A berturut-turut, bahan itu melatih tebakan, bukan nalar.

## Celah & tindak lanjut
- Ambang CPNS formasi umum 2025/2026 belum ditemukan dalam dokumen resmi (lihat usulan).
- PermenPANRB 27/2021 sudah dicabut. Rujukan aspek TWK/TKP di `domain-skd.md` perlu diberi status (lihat usulan).
- Kepmen 321/2024 (CPNS 2024): perlu dicek apakah memuat rincian aspek seperti Kepmen 406/2026.

## Usulan perubahan engine
- Tidak ada. Temuan modul sudah tertangani oleh aturan engine TIU v0.3 (G-hitung script, kunci seimbang, G8 anti-templat).
