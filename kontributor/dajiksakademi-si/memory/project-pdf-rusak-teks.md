---
name: project-pdf-rusak-teks
description: PDF handbook rusak bila disimpan ulang sebagai teks; ciri EF BF BD, cara cek, obat = bangun ulang dari sumber
metadata:
  type: project
---
2026-11-05: Handbook_TIU_Siswa.pdf rusak sesudah build selesai (17 MB jadi 26 MB, jutaan urutan byte EF BF BD = U+FFFD, "Bad FCHECK in flate stream"). Berkas biner terbaca sebagai teks UTF-8 lalu tersimpan ulang oleh program di luar build; pelakunya tidak terbukti.

**Why:** build lolos bukan jaminan berkas akhir masih utuh saat Gusti membukanya.
**How to apply:** Gusti melapor PDF rusak: cek ukuran, `pdfinfo` (Syntax Error), hitung EF BF BD, lalu bangun ulang dari sumber. Cantumkan PDF sebagai path biasa, bukan tautan yang bisa terbuka di editor kode, dan sarankan membuka lewat Finder atau Preview. Terkait [[skd-handbook-tiu]].

**Kasus lain, 2026-11-06: tampilan sampul rusak di Preview dan HP, berkas utuh.** Poppler bersih, jadi jangan hanya cek pdftoppm; render juga lewat CoreGraphics. Gejala: kotak abu-abu di belakang pita `.sisi` (bayangan kabur jadi topeng JPEG) dan gambar kubus hilang. Obat: sampul diratakan jadi satu gambar saat build (`scripts/ratakan_sampul.js`, build.py). Ukuran bingkai `.cover.datar` jangan melebihi 296.9/210, bila lebih muncul halaman kosong. Kotak pilihan rupiah hlm 157, 161, 269 melewati bingkai dan Chrome mengecilkan seluruh buku ±96%; Gusti memutuskan 2026-11-06 tidak diperbaiki, jangan diusulkan lagi. Terkait [[skd-handbook-tiu]].
