---
name: project-portal-terpadu
description: "Portal terpadu D'Ajiks: HTML lokal di PORTAL TERPADU D AJIKS/landing/ (umum + ruang siswa: paket-saya, detail-paket, tryout, hasil, pembahasan) — status, keputusan desain Gusti, sumber aset"
metadata:
  node_type: memory
  type: project
  originSessionId: fb00b7d6-d1ef-49ab-9e62-7fa89e67796a
  modified: 2026-11-04T23:00:00.000Z
---

Gusti ingin satu web terpadu: landing + kelas (SKD, psikotes/psiko-cat, CEST/TKBI IPDN = satu program, POLRI, TNI, CPNS), satu akun, daftar & bayar di web, alur ala privatalfaiz.id. Tiap kelas punya dua versi: akses penuh dan tryout saja. Mode terang saja.

**Sumber utama (sejak 2026-11-03):** HTML lokal `BIG DATA/PORTAL TERPADU D AJIKS/landing/` — `index.html`, `kelas.html` (prototipe 2026-11-04, satu halaman 5 kelas via ?k=&v=), `daftar.html`, `bayar.html`, `assets/` (siluet subtes codex di `assets/siluet/`). Gaya menu/kartu/kaki di kelas.html disalin dari index.html: ubah di dua tempat. Bukan artifact/kanvas (Gusti bergantian 3 akun Pro). Kanvas lama (Xs2DuYyBgaMSKbaCNmYNUj) dan artifact v1 sudah usang.

**Pedoman tertulis (2026-11-04):** `PORTAL TERPADU D AJIKS/DESIGN.md` (pedoman merek: token warna/huruf/sudut/gerak + daftar ditolak) dan `RENCANA-KODE.md` (gerbang keputusan, Next.js 16 + Supabase direkomendasikan, peta rute, tabel data, spesifikasi komponen, keamanan bayar, biaya, utang prototipe, urutan kerja). Perbarui keduanya bila Gusti mengubah arah.

**Keputusan desain Gusti (berlaku, 2026-11-03):**
- Navy = warna latar logo (#031739, rona 218°; bukan #16224a keunguan). Penanda kata = teks emas (bukan kotak). Navy-emas + logo D'Ajiks tetap; huruf Inter Tight saja (tidak Cinzel/Poppins).
- Hero: judul "Persiapan TNI/POLRI, CPNS, Sekolah Kedinasan dalam satu pintu"; gradasi navy→krem lembut, peralihan putih dinaikkan sampai sekitar tombol (batas aman keterbacaan); 2 foto kelas bercahaya emas.
- Menu: kapsul melayang gaya Hearth, berubah navy pekat setelah digulir.
- Kelas: panel gradasi gaya Letters, pilihan 5 kelas + versi, 3 kartu paket (logika Al Faiz), kartu tengah lebih tinggi.
- Bagian lain: Kelas offline (mosaik foto blueprint), Testimoni bento + kutipan bergeser per langkah + angka meteran, Pengajar (7 orang asli), FAQ statis gaya Hearth (tinggi tetap, selalu satu terbuka), panel penutup = satu kutipan "Program terbaik bukan yang paling ramai…" (bukan kotak geser).
- DITOLAK, jangan diusulkan lagi: tulisan besar "D'AJIKS" di kaki halaman, bingkai foto/gapura, tekstur navy, pita teks berjalan, tombol gradasi ungu. (Gulir halus Lenis sempat ditolak 2026-11-03, DIBATALKAN Gusti 2026-11-04: kini dipasang seperti Choroo.)
- Daftar: 2 langkah; langkah 2 "Pilih kelasmu" gaya ClickUp onboarding.

**Pengajar (asli, dari blueprint):** Gusti Putu Yuda Wirashana (founder; foto seragam putih kiriman Gusti), Badrun Iju ("The All Rounder: Master SKD dan psikotes"), Laode Billy Bonny ("Mentor utama bahasa Inggris dan TKBI (CEST)"), Kompol. Dr. Gusti Komang Sulastra, Ipda I Nyoman Alit Trinadi Arta, Bripda Muhammad Rifky Apriansyah, Laode Abdul Gias Akurajab, S.STP, MM (Purna Praja Angkatan 27, mentor TKP dan TWK; ditambah 2026-11-04).

**Sumber aset nyata:** `~/Downloads/blueprint-polri-ajiks` (situs dajiksakademi-nine.vercel.app): `public/images/{team,kelas,jasmani}`, `src/lib/{mentor,program,testimonial}-data.ts`, WA +62 852-9939-4360 (belum dipasang, menunggu izin Gusti).

**Why:** Gusti mengarahkan desain lewat tangkapan layar situs acuan (Letters, ClickUp, Hearth, Bailey Hart, Upodes, Al Faiz); yang diambil hanya gaya/logika, bukan merek/isi.

**How to apply:** Revisi langsung di file landing; tiap perubahan dicek render komputer + HP (Chrome headless), dicatat di `~/.claude/skills/skd-expert/riset/log-portal-terpadu.md`. Kode gaya ponytail (tanpa pustaka tambahan). Jangan mengarang orang/angka; data contoh wajib ditandai — lihat [[project-portal-data-contoh]]. Belum diputuskan: kelas di kartu tengah, penyedia pembayaran, penyatuan login, hosting.

**Status (2026-11-04 sore):** halaman pemilihan paket `landing/paket.html` = kepala bergradasi + kapsul kelas gaya Choroo, kartu paket pola Al Faiz/viracun (spanduk grafis + daftar isi + harga + tombol penuh); SKD berisi Tryout Paket 1–50 (contoh); versi bertahap DITOLAK Gusti 2026-11-04. Ditautkan dari menu Kelas (3 halaman) + tombol "Lihat semua paket" di panel beranda. Data KLS/PAKET dan gaya menu disalin di index, kelas, dan paket: ubah di tiga tempat. Skrip pembangun kelas.html sudah hilang: ubah kelas.html langsung. Kartu tingkatan beranda (2026-11-04): isi berkelompok + yang tidak termasuk dicoret, "Hemat N%", "Paling lengkap" di paket terakhir (navy, tombol emas); judul paket JANGAN meniru acuan bimbel lain (tanpa ikon kotak + tagline). kelas.html belum diterapkan. Peta kerja disetujui 2026-11-04: wilayah 1 umum → 2 ruang siswa (mulai Tryout saja: Masuk → Paket saya → Detail → Ruang tryout → Hasil) → 3 pengelola → gerbang keputusan → kode. masuk.html + 3 ikon codex DISETUJUI Gusti 2026-11-04; paket-saya.html DISETUJUI 2026-11-04; detail-paket.html SELESAI (contoh; MILIK disalin di paket-saya + detail-paket); detail-paket DISETUJUI. Ruang tryout: putusan Gusti 2026-11-04 = ikuti suasana ruang simulasi penuh psiko-cat (ExamChrome.tsx + exam.css), bukan aplikasi CAT lama; tryout.html SELESAI 2026-11-04 (satu waktu 100 menit bebas pindah; Gusti MENOLAK pemisahan per subtes — tanpa tab/label/kelompok nomor TWK-TIU-TKP, ikuti gaya kotak acuan: kotak judul + kotak Jam/Menit/Detik, kotak soal dgn tombol Sebelumnya/Berikutnya, satu kisi nomor 1–110, tombol Akhiri tryout; soal TKP menampilkan nama aspek di kanan atas TANPA kata "Aspek"; 110 soal contoh dari bank sendiri tanpa kunci, pembangun landing/data/build-to.cjs); usul Hasil+Pembahasan 1–12 DISETUJUI 2026-11-04 (rincian di log); pembahasan.html DISETUJUI 2026-11-04 (kunci+pembahasan di data/to-bahas.js terpisah, ruang tryout tetap tanpa kunci; daftar soal buka-tutup TWK→TIU→TKP hanya di pembahasan); hasil.html DISETUJUI 2026-11-04 (acuan 4 layar Al Faiz digubah gaya D'Ajiks: spanduk navy + nilai /550 + status ambang kedinasan 2026; CPNS/POLRI/TNI tanpa status; 3 kotak subtes bergaris ambang emas; tanpa peringkat & tanpa "pengerjaan ke-N" sampai ada server). tryout.html Kumpulkan/waktu habis → hasil.html.


**Status (2026-11-04 malam) — ruang siswa tryout UTUH & DISETUJUI:** Masuk → Paket saya → Isi paket → Ruang tryout → Hasil → Pembahasan. Isi paket (detail-paket.html) DISETUJUI dalam bentuk kartu geser kiri-kanan (permintaan Gusti): kartu tryout WAJIB bergaya kartu paket paket.html (spanduk navy + kapsul status + "TRYOUT" putih + nomor emas + siluet, tombol emas penuh berlingkaran navy) — Gusti: "desain card-nya tetap seperti ini". Hasil tersimpan di peramban (kunci 'hasil:'+paket+':'+n) memunculkan "Lihat hasil".
- Usul berikut (belum diputuskan Gusti): Paket saya memakai kartu geser yang sama.
- Masih terbuka: halaman riwayat.html & profil.html belum ada (menu mengarah ke sana); menu samping bayar.html beda dengan menu siswa; tombol Mulai/Lanjutkan di paket-saya langsung masuk tanpa jendela konfirmasi; tryout POLRI/TNI masih memakai soal SKD contoh; paket yang dibeli belum punya isi tryout sendiri; ambang CPNS 2026 belum ditemukan; wilayah 3 (pengelola) belum dimulai.
- Uji otomatis Chrome headless ada di scratchpad sesi (uji-tryout/bahas/hasil/rak.mjs) — scratchpad bisa hilang; pola ujinya tercatat di log.

**2026-11-04:** `python3 ~/.claude/skills/skd-expert/cek.py` gagal karena `riset/log-portal-terpadu.md` baris 210 (`dim`, `a` dalam backtick dibaca sebagai berkas). Belum disunting; perbaiki saat sesi portal berikut.
