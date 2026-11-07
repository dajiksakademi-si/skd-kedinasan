# LOG — AcademyBRIJ (Badrun Iju)

## 2026-11-07
- Tambah: `kontributor/AcademyBRIJ/` (`memory.md`, `LOG.md`) — folder catatan Badrun bergabung sebagai kontributor dan mentor utama — sesuai aturan wajib catat kontributor.
- Tambah: aturan tetap di `memory.md` — setiap perubahan Badrun wajib di-commit dan di-push agar Gusti dapat melihat hasilnya.
- Catatan: alur push langsung ke `main` mengikuti putusan Gusti 2026-11-07 (CLAUDE.md, README.md).
- Status: selesai. Berikut: kerjakan tugas pertama sesuai arahan Badrun.

- Catat: penugasan dari Gusti — Badrun menyempurnakan core engine + skill skd-expert dan membuat/generate soal SKD 2026/2027 (tercatat di memory.md). Status: belum mulai; menunggu arahan Badrun untuk tugas pertama.

## 2026-11-07 (persiapan perangkat)
- Cek: 8 skill proyek di `.claude/skills/` terbaca semua (skd-expert, skd-belajar, dajiks-handbook, impeccable, ui-ux-pro-max, emil-design-eng, taste-skill, markitdown).
- Cek: plugin ponytail + superpowers sudah tercantum di `.claude/settings.json`, tetapi belum terpasang di perangkat ini; perintah `/plugin` tidak tersedia di lingkungan Claude yang dipakai.
- Belum: `cek.py --selftest`, `markitdown`, `npm install` — Python dan Node.js belum terpasang di perangkat ini (hanya pintasan Microsoft Store). Berikut: pasang Python dan Node.js, lalu ulangi tiga langkah itu.
- Status: sebagian selesai.
- Pasang (winget): Python 3.12.10; Node.js LTS (v26.13.0, npm 11.20.0) ternyata sudah ada, hanya belum terbaca di PATH sesi.
- Selesai: `npm install` (folder `node_modules` ada). Catatan: npm menahan skrip pasang puppeteer (unduh Chrome) sampai disetujui lewat `npm install-scripts approve puppeteer`; belum dijalankan karena mengubah file di luar folder ini. Dibutuhkan hanya untuk cetak PDF.
- Selesai: `markitdown` 0.1.9 terpasang (pip).
- Gagal: `cek.py --selftest` di Windows — `cek.py` baris 83 membuat folder bernama berakhiran spasi ("folder spasi "), tidak sah di Windows, sehingga FileNotFoundError. Bukan salah perangkat; perlu perbaikan `cek.py` oleh Gusti atau atas izinnya. File tidak diubah.
- Status: persiapan selesai kecuali selftest cek.py dan unduhan Chrome puppeteer.
