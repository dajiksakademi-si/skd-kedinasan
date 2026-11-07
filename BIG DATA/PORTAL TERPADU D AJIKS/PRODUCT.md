# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Calon peserta seleksi sekolah kedinasan, TNI, dan Polri (umumnya lulusan SMA/sederajat) yang menyiapkan SKD, psikotes, dan CEST/TKBI IPDN. Mereka datang untuk memilih kelas, mendaftar, membayar, lalu berlatih tryout CAT dan membaca pembahasan. Pengajar D'Ajiks memakai sisi yang sama untuk memantau hasil.

## Product Purpose
Satu web terpadu D'Ajiks Akademi: landing page, lalu daftar/masuk, katalog kelas, pembayaran di web, Paket Saya, tryout CAT, dan nilai per subtes beserta pembahasan. Berhasil berarti calon siswa yakin, mendaftar dan membayar sendiri, lalu berlatih tanpa bingung alurnya.

## Positioning
- Satu pintu untuk tiga kelas (SKD, Psikotes, CEST/TKBI IPDN) dengan satu akun.
- Soal ditulis ulang dari nol oleh D'Ajiks; pembahasan bergaya guru les yang manusiawi, menyapa "kamu", menjelaskan kenapa tiap opsi gugur.
- Simulasi CAT yang mirip ujian asli, dengan nilai per subtes dan analisis kelemahan.

## Operating Context
Siswa mengakses dari ponsel maupun laptop. Tryout dikerjakan berwaktu seperti CAT resmi. Rujukan alur: privatalfaiz.id (landing, daftar/masuk, katalog, keranjang/bayar, Paket Saya, tryout, nilai + pembahasan).

## Capabilities and Constraints
- Kelas (Gusti 2026-11-03): SKD Kedinasan, IPDN, Persiapan POLRI, Persiapan TNI, CPNS. Paket dan harga di prototipe masih DATA CONTOH sampai Gusti menetapkan.
- Tiap kelas punya dua versi: akses penuh dan tryout saja (keputusan Gusti 2026-10-29).
- Siswa daftar dan bayar di web sendiri; satu akun untuk semua kelas.
- Aplikasi yang ada: psiko-cat (Psikotes), dajiks-cest (CEST/TKBI), aplikasi CAT TWK/TKP/TIU di BIG DATA. Landing lama: blueprint-polri-ajiks.
- Belum diputuskan: cara menyatukan login 4 aplikasi, penyedia pembayaran, stack/hosting produksi.
- Prototipe v1 (2026-10-29) ditolak di semua aspek: tampilan, susunan landing, alur platform, isi/teks (Gusti 2026-11-02). Jangan dijadikan pijakan.

## Brand Commitments
- Nama: D'Ajiks Akademi. Logo: emblem dan lockup (psiko-cat `public/brand/`), tidak boleh digambar ulang.
- Hanya mode terang (keputusan Gusti 2026-10-29).
- Pedoman tampilan portal yang berlaku: [DESIGN.md](DESIGN.md) (2026-11-04: navy logo #031739 + emas, Inter Tight, gradasi Keytail, gerak Choroo). Design System artifact lama (Lexend + Source Sans 3, motif tiket) usang untuk portal ini.
- Bahasa Indonesia baku; tanpa emoji; tanpa janji "dijamin lolos".
- Rencana kode produksi: [RENCANA-KODE.md](RENCANA-KODE.md).

## Evidence on Hand
Ditemukan 2026-11-02 (semua di ~/Downloads):
- Testimoni Psikotes IPDN 22 Okt 2026: `PROJECT SISTEM PSIKO TERINTEGRASI/TESTIMONI PSI D AJIKS AKADEMI/` (teks + 10 screenshot `ss/`). Peserta sudah setuju nama ditampilkan. Rekap 18 nilai: rata-rata 69,8, tertinggi 74, terendah 65; beberapa nama ditandai "(isi)" dan 3 nilai mungkin ganda.
- Ulasan TKBI/CEST Okt 2026: `dajiks-cest/research/analisis-tkbi-2026/data/ulasan-wa.md` (self-report: TKBI 534–645, beberapa rank 1 provinsi, ±30 lapor lolos dari grup 400+). Izin tampil nama belum tercatat.
- Foto: `PROJECT SKD KEDINASAN /BIG DATA/RENCANA BISNIS KELAS 2027/src-proposal/` f-kelas.jpg (kelas offline), f-jasmani1.jpg, f-jasmani2.jpg (latihan jasmani, pull-up); tangkapan layar aplikasi asli c-skd-cat.png, c-psiko-cat.png, c-cest-simulator.png; sampul ebook TWK/TIU/TKP.
- Harga: CEST Simulator Rp75.000 (brief flyer dajiks-cest Okt 2026). Harga SKD dan Psikotes (penuh / tryout saja) belum ditemukan.
- Proyek terkait: `~/Downloads/D AJIKS AKADEMI PLATFORM` (Next.js + Supabase, fokus batch POLRI, dokumen PRD/arsitektur, status belum produksi, commit terakhir 2026-09-07).
Yang belum ada tetap ditandai tempat kosong, tidak dikarang.

## Product Principles
1. Kepercayaan dulu: bukti nyata (lulusan, testimoni, foto) mendahului klaim.
2. Satu pintu yang benar-benar satu: satu akun, satu alur, tiga kelas.
3. Mutu soal dan pembahasan adalah produknya, bukan hiasan.
4. Alur dari lihat-lihat sampai tryout tidak boleh membuat siswa bertanya "habis ini ke mana".

## Accessibility & Inclusion
Kontras teks minimal WCAG AA; nyaman di ponsel kelas menengah dan koneksi seluler.
