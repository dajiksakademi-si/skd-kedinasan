# Usulan perbaikan bank TKP 80: P1 (6 soal) + Batch 2 (4 soal) (2026-10-25)

Status: **9 soal DITERAPKAN 2026-10-25** (13, 14, 22, 37, 67, 3, 6, 8, 11; Gusti: "Semua kecuali 30") ke `Bank_Soal_TKP_HOTS_80.html` + Batch2.html (3, 6, 8, 11). Validator: bank 80 255→253 error, Batch 2 39→38. Backup sebelum edit di scratchpad sesi (`bank80_pre_fix_backup.html`, `batch2_pre_fix_backup.html`). **30 versi 2 DITERAPKAN** (Gusti: "Terapkan"). Akhir: bank 80 = 252 error / 87 peringatan.
Dasar: audit `2026-10-25-audit-cek-buta-bank80.md` §3 P1 + P3; lingkup dipilih Gusti: "6 soal cacat + Batch 2".
Di luar lingkup (sengaja tidak disentuh): fakta penentu / pasangan / pembahasan siswa / tangga AR (aturan v1.3 untuk paket 45 baru), P2 E(3) di poin 2–3, label V.

Uji: script `apply_usulan.py` (scratchpad sesi) diterapkan ke **salinan** bank → validator v1.3.
- Bank 80: 343 → 339 masalah. **Tidak ada jenis error baru.** Hilang: spread 30 dan 67, "kunci satu-satunya dua-langkah" 8, peringatan pembuka "menolak". Soal 8 spread tetap 5 (sudah ada sebelumnya: 14,16,15,18,19).
- Tebakan paket: terpanjang ke-2 58→54%, poin 4 terpanjang 76→69%, dua-langkah 46→48% (naik 2 poin; tetap gagal seperti sebelumnya).
- Diff hanya baris yang dimaksud (74 baris bank 80; 30 baris Batch 2).

---

## A. P1: cacat kunci/skor

### 13 (Profesionalisme): kunci E membereskan masalah yang tidak ada
- **Ubah stem**, tambah di akhir sebelum kalimat tanya: "Bulan ini sudah tiga penawaran di paket lain gugur karena surat yang sama, sebab syarat itu hanya tercantum di lampiran."
- Opsi, poin, sumbu tetap (E=5, D=4 S4, C=3 S3). Dengan fakta ini, "perbaikan daftar dokumen wajib" (E) menjawab masalah nyata dan "Kunci vs D" (kejadian berulang) jadi benar.
- Pembahasan li 2, 3, 4 disesuaikan: D = tuntas paket ini, syarat yang terselip di lampiran dibiarkan (S4).
- Catatan: 13A dan 13C tetap melanggar aturan di poin 2–3 (P2, di luar lingkup).

### 14 (Profesionalisme): B poin 4 berisi klaim tidak benar
- B lama: "…menyebut angka pensiun di dalamnya sebagai data terkini milik instansi." (S5)
- **B baru (4, S2):** "Mengirimkan bahan malam ini, lalu memberi tahu atasan secara lisan bahwa angka pensiunnya masih sementara."
- Gagal di skop: atasan tahu, peserta rapat lain membaca angka tanpa tahu statusnya. Tidak ada klaim keliru, tetap di atas D (kirim tanpa catatan).
- Pembahasan li 3–4 diganti; sekalian salah ketik "pimbanan" jadi "pimpinan".

### 22 (Profesionalisme): B poin 4 membawa berkas asli keluar ruang baca
- B lama: "Meminjamkan berkas asli itu untuk rapat sore ini setelah … formulir peminjaman arsip." (S5)
- **B baru (4, S2):** "Mempersilakan pejabat itu membaca berkas aslinya di ruang baca sebelum rapat dengan mengisi formulir peminjaman."
- Gagal di skop: patuh aturan, tapi hanya pejabat itu yang tahu isinya; peserta rapat membahas tanpa dokumen.
- Catatan: 22D (2) tetap melanggar aturan (P2).

### 30 (Pelayanan Publik): A poin 4 membuka unggah sesudah batas waktu
- A lama: "Memberi kesempatan pendaftar itu mengunggah … hari ini juga…" (S3)
- Versi 1 ("meminta kepala sekolah menyampaikan jalur sanggah", S3) **ditolak**: paling mudah disanggah.
- **Versi 2, A baru (4, S5):** "Menetapkan hasil sesuai batas waktu, lalu mengabarkan jalur sanggah kepada orang tuanya lewat telepon."
- **C (kunci) ikut dipertegas:** "Menetapkan hasil sesuai batas waktu, lalu menyampaikan jalur sanggah resmi secara tertulis kepada pendaftar itu."
- Gagal A di kepastian: tenggat dan syarat sanggah bisa salah tangkap, dan tidak ada bukti informasi itu pernah disampaikan. Pembelanya ada di teks C ("secara tertulis").
- Risiko: A, C, dan D sama-sama dibuka dengan "Menetapkan hasil sesuai…", dan A-C hanya beda saluran. Itu pasangan kontras yang sah, tapi pembaca bisa menebak kunci ada di antara ketiganya.
- Uji: spread 30 hilang (14,14,15,14,14), tanpa error baru.

### 37 (Pelayanan Publik): E poin 4 menyerahkan NIK + alamat
- E lama: "Menyerahkan seluruh salinan itu setelah pemohon menandatangani pernyataan…" (S3)
- **E baru (4, S5):** "Menyerahkan salinan daftar penerima itu setelah menghitamkan kolom nomor induk kependudukan dan alamat warganya."
- Gagal di kepastian: data yang ditutup benar, tapi pemohon tidak diberi tahu bagian mana dan atas dasar apa (beda dengan kunci D: "disertai penjelasan dasar penyamarannya").

### 67 (TIK): D poin 4 memberi akses data padahal perjanjian belum mengatur
- D lama: "Memberikan akses data warga lebih dulu, lalu mengusulkan penambahan klausul…" (S1)
- **D baru (4, S1):** "Menolak permintaan itu untuk sementara, lalu mengusulkan adendum pengaturan pertukaran data sebelum memberikan apa pun."
- Gagal di urutan: data aman, tapi seluruh manfaat analisis tertahan selama adendum diproses, padahal data agregat bisa diberikan sekarang.
- Catatan: 67B (3, salinan terenkripsi atas persetujuan sendiri) tetap pelanggaran di poin 3 (P2). Klaim kunci "data agregat boleh dibagikan tanpa keputusan pimpinan" **belum diverifikasi** (sudah ada sejak awal).

## B. Batch 2 (soal 1–12 bank 80 = isi `Bank_Soal_TKP_HOTS_12_Batch2.html`)

### 3 (Pelayanan Publik): tukar skor B dan E
- **B 3→4 (S3), E 4→3 (S1).** Panduan 3v4: E membiarkan pemohon yang saldonya terpotong rugi dari pagi sampai sore (rugi sekarang).
- Teks opsi tetap. Pembahasan li 3–4 diurutkan ulang (poin 4 dulu); kalimat E ditegaskan "rugi dari pagi sampai sore".

### 6 (Jejaring Kerja): tukar skor C dan E
- **E 3→4 (S3), C 4→3 (S1).** C menghentikan distribusi untuk semua desa saat bencana masih berlangsung (rugi sekarang, lebih luas).
- Catatan jujur: E juga meninggalkan desa yang belum menerima. Alasan tukar = besarnya rugi sekarang, bukan beda sekarang/nanti yang bersih.

### 8 (Sosial Budaya): B dan C hampir kembar, ditambah tukar skor
- B lama: "Memberikan dispensasi khusus kepada siswa yang terlihat kesulitan…" (3, S2), mirip C (membebaskan saat hari-H).
- **B baru (4, S4):** "Menyediakan atribut dan camilan bermerek dari kas panitia, lalu membagikannya lebih awal kepada siswa yang kesulitan."
- **C 4→3 (S1)**: teks tetap; C baru meringankan di hari-H setelah ada yang terlanjur berutang.
- Gagal B = tambal gejala: biaya ditanggung, syarat merek mahal dibiarkan.

### 11 (Anti Radikalisme): peran bentrok "guru BK" dengan "koordinasi dengan BK"
- **Ubah stem:** "Anda guru BK sekaligus wali kelas SMA." menjadi "Anda wali kelas SMA."
- Opsi tetap; koordinasi wali kelas dengan BK jadi wajar. Pembahasan li 3: "koordinasi dengan BK lain" menjadi "koordinasi dengan guru BK".
- Tetap rawan sanggah: tangga AR "ucapan → tegur di tempat" mendukung E (audit P3).

## C. Ikut diselaraskan (perlu putusan)
1. `Bank_Soal_TKP_HOTS_12_Batch2.html`: soal 3, 6, 8, 11 identik; script yang sama sudah diuji di salinannya.
2. PDF (`Bank_Soal_TKP_HOTS_80.pdf`, `…_Batch2.pdf`) jadi usang. Perlu dicetak ulang.
3. `cat-tkp-app/src/data/bank_soal_tkp_80.json` memuat bank yang sama. Ini repo git sendiri, jadi **tidak disentuh** tanpa perintah.
