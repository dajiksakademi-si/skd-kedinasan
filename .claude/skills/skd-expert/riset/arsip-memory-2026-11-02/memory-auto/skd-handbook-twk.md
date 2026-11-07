---
name: skd-handbook-twk
description: "Handbook TWK D'Ajiks lengkap (14 bab + lampiran pengajar) seperti Handbook TKP; Bab 1–4 disetujui, Bab 5–7 + sampul tanpa Garuda menunggu persetujuan (2026-10-27)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9d42188c-9bc2-4718-98eb-f78a35d4d516
  modified: 2026-10-27T08:13:20.683Z
---

2026-10-27: saat rencana pembaruan panduan murid soal Bahasa, Gusti minta disusun "seperti ebook TKP" → rencana lengkap ditulis, Gusti pilih **Handbook TWK lengkap** (bukan ebook mini Bahasa). `PANDUAN_MURID_TWK.md` digantikan seluruhnya setelah handbook jadi.

Rencana (log `~/.claude/skills/skd-expert/riset/2026-10-27-log-handbook-twk.md`): dua PDF siswa + pengajar dari satu sumber; desain, sampul, logo, build.py dipakai ulang dari `BIG DATA/HANDBOOK TKP D AJIKS AKADEMI/`; folder baru `BIG DATA/HANDBOOK TWK D AJIKS AKADEMI/`; 8 tahap, persetujuan per tahap. Prompt sesi berikut (Tahap 1) ada di akhir log.

**Why:** Gusti ingin bahan ajar TWK setara Handbook TKP yang sudah disetujui final.

**How to apply:** mulai dari prompt di log; latihan Bahasa (Bab 11) butuh soal bentuk v1.6 → tanya Gusti, jangan susun sendiri; fakta belum diverifikasi tidak masuk versi siswa. Terkait [[skd-tkp-pindai-cepat]] (Handbook TKP), [[skd-twk-2026sl]].

2026-10-27 Tahap 1 selesai (hasil di log, bagian "Tahap 1"): ebook TWK Pejuang 9 bab dipetakan (pola Materi → Kartu ingat → Penerapan → Trik HOTS → latihan; tidak ditiru: patokan butir P4, trik cocok kata sila); MATERI TWK 6 JUNI = 20 soal UUD gaya lama + slide NotebookLM, hanya peta topik Bab 6. Temuan utama: cadangan hanya 11 soal (Hukum 0, Bahasa 0) padahal butuh ±50 → sumber latihan perlu putusan Gusti; Bab 9 Bela negara kekurangan soal; rujukan arsip BPIP/ANRI Proklamasi/Sistem Among di bank belum masuk daftar terverifikasi. Lima putusan diantrekan di log (satu per respons).

2026-10-27 Tahap 1 DISETUJUI Gusti. Tahap 2 draf ditulis di log: daftar isi final dengan 3 usulan (Bab 7 + Wawasan Nusantara, Bab 8 gabung cinta tanah air, Bab 11 dua rumpun + kalimat efektif ringkas) + rencana riset 7 jalur A–G. Menunggu persetujuan; berikut putusan sumber latihan.

2026-10-27 Tahap 2 (daftar isi final + rencana riset) DISETUJUI dengan catatan wording: baku, mutu penulis buku/copywriter ahli, tidak generik AI → [[feedback-wording-handbook]]. Berikut: putusan sumber latihan, lalu latihan Bahasa, lalu Tahap 3 riset (izin internet).

2026-10-27 Putusan sumber latihan: opsi B — 11 cadangan + soal Paket 1–3 ditulis ulang ke bentuk v1.6 (konteks diganti, logika tetap) di Tahap 6. Berikut: latihan Bahasa.

2026-10-27 Putusan latihan Bahasa: opsi A (3 kaidah tulis ulang dari 096–101 + 2 paragraf baru + 1 contoh per rumpun, Tahap 6). Semua putusan Tahap 0–2 selesai. Berikut Tahap 3 riset 7 jalur; prompt siap tempel di akhir log.

2026-10-27 Izin internet Tahap 3 untuk 7 jalur DIBERIKAN Gusti; prompt di log sudah memuat izin. Mulai di sesi baru setelah /compact.

2026-10-27 Tahap 3 riset 7 jalur SELESAI, menunggu persetujuan Gusti. Laporan `BIG DATA/HANDBOOK TWK D AJIKS AKADEMI/reports/Riset fondasi TWK 2026.md`, usulan U-4 di `usulan/2026-10-27.md`. Temuan non-obvious: jdih.dpr menolak unduhan (403) → naskah UUD dari Buku Saku Pusdik MK 2020 + MK Naskah Komprehensif Buku I (juga sumber resmi tujuh kata, Sumpah Pemuda, Proklamasi, lima kesepakatan dasar); tautan PerBPIP di handoff salah (pakai peraturan.go.id bn487/bn814-2022, lampiran hasil pindai → tesseract `-l ind`); KBBI kini terbaca lewat curl; "semenjak" baku, "dikarenakan" ragam cakapan (panduan lama keliru). L2 15 butir. Berikut Tahap 4.

2026-10-27 Tahap 3 DISETUJUI Gusti (L2 15 butir). U-4 belum diputuskan. Berikut Tahap 4 (contoh 2 halaman PDF) di sesi baru setelah /compact; prompt siap tempel di akhir log.

2026-10-27 Tahap 4 contoh PDF selesai, menunggu persetujuan gaya: `Handbook_TWK_Siswa.pdf` 2 hlm + `_Pengajar.pdf` 4 hlm; sumber `src/` (00_head salinan CSS TKP, 11_bab01, 21_bab05, build.py dengan cek istilah dapur khusus versi siswa). build.py memakai buat_pdf.js milik Handbook TKP. Jebakan: `.timeline div` CSS TKP mengenai div bersarang → pakai `<p class="t">`.

2026-10-27 Tahap 4 gaya DISETUJUI Gusti → Tahap 5 Bab 1–4; putusan sumber contoh soal Bab 2–4 ditanyakan dulu.

2026-10-27 Tahap 5 kelompok 1 (Bab 1–4) ditulis, menunggu persetujuan: siswa 12 hlm, pengajar 13 hlm. Contoh soal Bab 2–4 = opsi A (tempat kosong `.slot` 105mm, diisi Tahap 6; build.py menghitungnya). Desain dibantu impeccable + emil-design-eng (lihat [[feedback-desain-handbook]]). Berikut Bab 5–7.

2026-10-27 Bab 1–4 DISETUJUI Gusti. Berikut Tahap 5 kelompok 2 (Bab 5–7) di sesi baru; prompt siap tempel di akhir log.

2026-10-27 Tahap 5 kelompok 2 (Bab 5–7) + sampul ditulis, menunggu persetujuan: siswa 30 hlm, pengajar 31 hlm. Sampul: Gusti minta gaya monumen/Garuda dari gambar lampiran; setelah diberi tahu UU 24/2009 Ps 52 + 57 (lambang negara hanya untuk buku terbitan Pemerintah; larangan bentuk tidak sesuai/menyerupai), Gusti pilih **tanpa Garuda** → codex CLI buat pilar monumen + relief perunggu abstrak (`aset/cover_twk_b.png`; codex butuh `--skip-git-repo-check`). Pegangan isi: letak tanda perisai Ps 48(2) dan butir indikator PerBPIP 4/2022 tidak dijadikan patokan siswa (lihat log). Latihan: penanda `<!--LATIHAN:Nama-->` di bab, dirender build.py sebagai tempat kosong sampai Tahap 6. Berikut Bab 8–10.

2026-10-27 Gusti membatalkan sendiri "tanpa Garuda": sampul diberi siluet Garuda samar di langit kanan (codex, `aset/cover_twk_c.png`) dan logo D'Ajiks EMAS (di lencana navy agar terbaca). Bentuk siluet belum simetris seperti patung → menunggu putusan Gusti.

2026-10-27 Gusti: "oke lanjut ke bab 8-10" → Bab 5–7 + sampul siluet (cover_twk_c) diterima. Bab 8–10 di sesi baru; prompt siap tempel di akhir log.

2026-10-27 Tahap 5 kelompok 3 (Bab 8–10) ditulis, menunggu persetujuan: siswa 46 hlm, pengajar 50 hlm; file 24_bab08, 25_bab09, 26_bab10. Pegangan non-obvious: "bukan chauvinistik" ada di sari nilai sila kedua PerBPIP 2/2022 (bukan sila ketiga); alamat Proklamasi berbeda antarsumber → pakai UU 24/2009 Ps 5; UU 23/2019 Ps 4(3) tidak memasangkan wujud ancaman dengan jenisnya. Berikut: Bab 11 Bahasa (U-4 belum diputuskan).

2026-10-27 Gusti: "setuju lanjut ke bab 11" → Bab 8–10 DISETUJUI. Bab 11 di sesi baru setelah /compact; prompt siap tempel di akhir log.

2026-10-27 Tahap 5 kelompok 4 (Bab 11 Bahasa negara) ditulis, menunggu persetujuan: siswa 53 hlm, pengajar 58 hlm; file 27_bab11. Pegangan non-obvious: kunci kaidah hanya dari bunyi kaidah EYD V, bukan contohnya (koma sebelum "dan" unsur terakhir cuma di contoh; koma sesudah keterangan awal = "dapat"); contoh EYD V daring ada di `<article>` halaman, bukan di daftar isi. Ditanyakan: paragraf peraga + 4 bunyi memikat di materi dipertahankan atau tidak. Berikut Bab 12–14 + lampiran.

2026-10-27 Gusti: "setuju" → Bab 11 DISETUJUI (paragraf peraga + 4 bunyi memikat dipertahankan). Berikut Bab 12–14 + lampiran di sesi baru; prompt siap tempel di akhir log.

2026-10-27 Tahap 5 kelompok 5 (Bab 12–14 + Lampiran L1–L6) ditulis, menunggu persetujuan: siswa 64 hlm, pengajar 77 hlm; file 31_bab12, 32_bab13, 33_bab14, 90_lampiran (class guru). Pegangan non-obvious: angka rumus bimbel hanya dari hitungan skrip yang tercatat (buku latihan TWK 40/71 = 56% kunci terpanjang, paket uji coba 4/22 = 18%, kata ekstrem 27/30 di pengecoh); nama sumber hanya di kotak pengajar; patokan waktu Bab 14 = aritmetika 100 menit/110 soal (±54 dtk, TWK ≈ 27 menit), batas dua menit dan ambang tingkat = usulan D'Ajiks; klaim penelitian "mengganti jawaban" dari Handbook TKP tidak dipakai (belum diverifikasi). Berikut: persetujuan Gusti → Tahap 6 (latihan + kunci + 13 tempat contoh).

2026-10-27 Gusti: "oke setuju" → Bab 12–14 + Lampiran L1–L6 DISETUJUI; Tahap 5 TUNTAS. Berikut Tahap 6 (latihan + kunci + 13 contoh) di sesi baru setelah /compact; prompt siap tempel di akhir log.

2026-10-27 Tahap 6 dimulai: peta 49 soal (35 latihan + 14 contoh; 010 ditahan, 046 tidak dipakai) DISETUJUI Gusti ("oke setuju"). Data di `src/latihan_data.py`, pemeriksa aturan `python3 src/build.py --cek`. Kelompok 1 (Bab 5–7, 18 soal) ditulis + cek buta 18/18 + diperbaiki; menunggu persetujuan Gusti → Kelompok 2 (Bab 8–10). Pelajaran di references/twk.md "Pelajaran latihan Handbook TWK".
2026-10-27 Kelompok 2 (Bab 8–10, 18 soal) ditulis + cek buta 18/18 + diperbaiki; total 36 soal; menunggu persetujuan → Kelompok 3 (Bab 11 + contoh Bab 2/3/4/12/14).
2026-10-27 Gusti: Kelompok 2 DISETUJUI. Berikut Kelompok 3 + pembahasan + build di sesi baru; prompt siap tempel di akhir log.
2026-10-28 Kelompok 3 (13 soal: contoh Bab 2/3/4/11×2/12 pasangan/14 + latihan Bab 11) ditulis di `src/latihan_k3.py` (diimpor di akhir latihan_data.py), cek buta 13/13 + diperbaiki; total 49 soal, kunci A10 B10 C10 D9 E10. 089 diganti dari makna "ketahanan sosial" (L2) ke langkah kepala desa. Menunggu persetujuan Gusti → pembahasan 49 soal → build.
2026-10-28 Gusti: Kelompok 3 DISETUJUI → pembahasan 49 soal.
2026-10-28 Pembahasan K1 (18) ditulis di src/bahas_k1.py (+ cek_bahas di build.py), menunggu persetujuan gaya → K2, K3.
2026-10-28 Pembahasan 49/49 selesai (src/bahas_k1-3.py, gaya DISETUJUI Gusti); berikut build (render latihan, 13 contoh, halaman kunci, L6) — prompt siap tempel di akhir log.
2026-10-28 Build Tahap 6 selesai (penanda CONTOH/KUNCI/L6 di sumber, render di build.py isi_soal): siswa 107 hlm, pengajar 121 hlm, semua tempat terisi, pemeriksaan bersih; menunggu persetujuan Gusti → Tahap 7 PDF final (prompt di akhir log).

2026-10-28 Gaya baru: prototipe `prototipe/gaya_baru.pdf` DISETUJUI Gusti ("aku setuju dengan arah desain yang sekarang") + aturan judul gaya buku pelajaran ([[feedback-wording-handbook]]). Diterapkan global di 00_head + build.py (contoh soal: alasan di bawah tiap pilihan; kunci: pita "Jawaban: X" + Ilustrasi/Perhatikan). Siswa 152, pengajar 161 hlm. Judul Bab 1–4 ditulis ulang, menunggu persetujuan → Bab 5–7, 8–11, 12–14 + kunci + lampiran → Tahap 7. Detail + cadangan di log.
2026-10-28 Seluruh judul gaya baru DISETUJUI ("OKE LANJUT TAHAP 7"). Tahap 7 PDF final: cek visual semua halaman kedua versi; jarak bagian kunci dirapatkan (kotak penutup tidak lagi terdorong), judul latihan/kunci kapital tiap kata lewat judul() di build.py. Siswa 130, pengajar 148 hlm, tautan 70/70, file:/// 0. Menunggu persetujuan Gusti + putusan PANDUAN_MURID_TWK.md lama (langkah 8).
2026-10-28 Tahap 7 PDF final DISETUJUI Gusti ("oke setuju"): Handbook TWK siswa 130 hlm, pengajar 148 hlm = FINAL. Sisa: langkah 8 putusan PANDUAN_MURID_TWK.md lama + index.html di folder engine TWK.
2026-10-28 Tiga landasan TWK DISETUJUI Gusti: mengajar = Handbook TWK (src/), fakta = reports/Riset fondasi TWK 2026.md, soal = MR BADRUN v1.6; tercatat di SKILL.md peta + references/twk.md "Tiga landasan TWK". PANDUAN_MURID_TWK.md lama dipindah ke Trash. Handbook TWK TUNTAS (langkah 8 selesai).

- 2026-10-28: kepala sampul TWK diseragamkan dengan TKP (lencana persegi navy + "Seri SKD Kedinasan · TWK" + nilai 5/0 Cinzel bergaris bawah emas, tanpa garis panjang). PDF dibangun ulang: siswa 130, pengajar 148, tautan 35/35.
