---
name: skd-tkp-pindai-cepat
description: Rencana teknik "Pindai Cepat D'Ajiks" TKP (aspek → kalimat penentu → coret), lahir dari cerita bimbel hafal soal; DISIMPAN, belum diputuskan
metadata:
  type: project
---
Asal (cerita Gusti 2026-10-26): bimbel mahal "hafal 1000 paket soal" ternyata melatih memindai ASPEK lalu memindai opsi. Siswanya selesai TKP 45 soal dalam 20–30 menit, skor >210; TWK 115+. Sampel wawancara kecil; kemiripan soal BKN dengan pola itu belum diverifikasi.

Analisis: celahnya = kunci terbaca dari bentuk (cocok temuan bank 80, 81% tertebak). Untung terbesar = waktu yang dialihkan ke TIU. Soal anti-bocor kita (paket 1–2) tidak tembus dengan pindai aspek+opsi saja: tersisa 2–3 opsi, pemenang ditentukan satu kalimat penentu di soal.

Rencana: teknik 3 langkah **aspek → kalimat penentu → coret** (±30 detik/soal) + daftar "tanda cepat" per 6 aspek. Mockup: `BIG DATA/CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/tmp/pdfs/mockup_pindai/Mockup_Pindai_Cepat.pdf` (soal 3 + 20 paket 2, kotak biru sebelum pembahasan).

Status: Gusti minta DISIMPAN, bahas nanti (2026-10-26). Pertanyaan terbuka: kotak sebelum atau sesudah pembahasan; daftar tanda cepat 6 aspek; usulan uji think-aloud siswa bimbel pada 10 soal kita (belum dijawab).

**How to apply:** jangan kerjakan lanjutan tanpa perintah. Saat dilanjutkan, mulai dari pertanyaan terbuka di atas. Terkait [[skd-tkp-bocor-bentuk]], [[skd-tkp-jalan-pintas]].

**Update 2026-10-26:** Gusti setujui kotak Pindai Cepat masuk pembahasan (sebelum pembahasan siswa) + data JSON untuk bank CAT (`tmp/paket2_pindai.json`, soal 1–15 selesai, `cek_pindai.js`). Lalu Gusti minta deep research + Handbook TKP + SOP Pindai Cepat di sesi baru — prompt di log produksi TKP bagian "Prompt sesi berikut — deep research + Handbook TKP". Pindai 16–45 dan ekspor bank CAT ditunda.

**Update 2026-10-26 (sesi Handbook):** pembaca = siswa + pengajar (satu sumber, dua PDF). Rencana + daftar isi disetujui. Riset 6 jalur selesai: `BIG DATA/HANDBOOK TKP D AJIKS AKADEMI/reports/Riset fondasi TKP 2026.md` + `usulan/2026-10-26.md` (7 usulan, menunggu putusan). Temuan kunci: Integritas bukan aspek TKP; TIK resmi = kinerja (bank kita condong keamanan); ebook Pejuang poin 5 terpanjang 35/35; latih penyaringan dulu, target waktu terakhir. Log: riset/2026-10-25-log-produksi-tkp-3paket.md bagian "Sesi deep research".
**Desain handbook (putusan Gusti 2026-10-26):** gaya ebook Pejuang Kedinasan, lebih halus, palet biru + emas kekuningan (logo D'Ajiks akan di-rebrand biru-kuning); sampul digambar via codex CLI; prototipe 6 hlm di `BIG DATA/HANDBOOK TKP D AJIKS AKADEMI/prototipe/`.
**Rebranding logo (2026-10-26):** Gusti setujui desain handbook; minta arah warna logo navy × kuning emas dulu. Prototipe `BIG DATA/HANDBOOK TKP D AJIKS AKADEMI/prototipe/logo/Arah_Warna_Logo_DAjiks.pdf` (bentuk logo tetap, 4 varian + palet + penerapan). Menunggu putusan.

**2026-10-26 tahap 4 kelompok 1:** logo Utama emas-di-navy final. Handbook dirakit dari `BIG DATA/HANDBOOK TKP D AJIKS AKADEMI/src/` via `python3 src/build.py` (dua versi; class "guru" = khusus pengajar; cek frasa terlarang bawaan). Bab 1–4 selesai, menunggu persetujuan gaya Gusti.

**2026-10-27 tahap 6 SELESAI:** `paket2_pindai.json` "yang_dicari" TIK + sisi kinerja (cek_pindai OK; jalankan `node tmp/cek_pindai.js paket2_pindai.json paket2_soal_*.js`). 7/7 usulan riset diterima Gusti → domain-skd (riwayat aspek, ambang TKP per tahun, CPNS 166 terverifikasi, hitungan 180 vs 156), aturan-tetap B-3 (bukti 35/35), tkp.md (bagian Pindai Cepat + pelajaran tahap 6), ENGINE TKP v1.3.3 (dasar nilai per dimensi, tangga AR sebagian berdasar — hanya pelaku ASN, imbangan TIK ≥ 3/6 kinerja). Paket 1 TIK timpang (kinerja 1–2/6). Berikut: Gusti pilih dari tertunda (a) Pindai 16–45 + ekspor CAT, (b) wording + pembahasan Paket 1, (c) hapus JSON lama, (d) Paket 3.
**2026-10-27:** Gusti pilih urutan tertunda (a) Pindai 16–45 + ekspor CAT → (b) Paket 1 wording + pembahasan → (c) hapus JSON lama. Pindai 16–30 disetujui + digabung (cek OK 30). Berikut 31–45; prompt lanjutan di log handbook bagian bawah.
**2026-10-27:** Pindai 31–45 disetujui + digabung → `tmp/paket2_pindai.json` 45 soal LENGKAP (cek OK). Pembahasan siswa Paket 2 soal 32/35/37/42 menyebut fakta yang hilang dari cerita setelah pemadatan wording → benahi sebelum PDF ulang. Berikut: PDF pembahasan + kotak Pindai 45 soal, lalu ekspor data CAT.
**2026-10-27 (lanjut):** pembahasan Paket 2 dibenahi (fakta di luar cerita, 13 berat + 10 ringan) → PDF baru Pembahasan 52 hlm dengan Pindai 45 soal, validator 0 galat. Berikut: ekspor data CAT Paket 2. Aturan: setelah cerita dipadatkan, cek ulang fakta di pembahasan.
**2026-10-27:** Gusti batalkan ekspor data CAT Paket 2. Berikut (b) Paket 1; prompt siap-tempel di log handbook bagian bawah.

- 2026-10-27 Paket 1 (b): soal 1–30 selesai; wording 31–45 DISETUJUI; pembahasan + Pindai 31–45 draf (PDF tmp/pdfs/mockup_wording/p1_bahas/Paket_1_Soal_31_45_Pembahasan.pdf) menunggu persetujuan. Berikut: rakit final paket1.html + PDF tmp/pdfs/paket1/, lalu (c) hapus JSON lama (tanya cakupan).
- 2026-10-27 Paket 1 TKP SELESAI (paket1.html final, PDF tmp/pdfs/paket1/). Berikut (c) hapus JSON lama, tanya cakupan.
- 2026-10-27 (c) cadangan_wording dihapus seluruhnya atas perintah Gusti; hanya versi terbaru dipakai. Rangkaian TKP (a)(b)(c) tuntas.

- 2026-10-28 Gaya baru Handbook TKP (ikut TWK): langkah 1 perbandingan DISETUJUI; sampul baru = ilustrasi arang + piramida 6 aspek berlabel (`prototipe/aset/cover_tkp_ilustrasi_c.png`, mockup `sampul_tkp_mockup_c`) DISETUJUI; "Untuk kalangan sendiri" dihapus dari sampul TWK + TKP; prototipe 8 hlm `prototipe/gaya_baru_tkp.pdf` menunggu persetujuan. Detail di log handbook TKP bagian "Gaya baru Handbook TKP".
- 2026-10-28 Gusti: suasana KALEM (palet sampul: kertas, arang, batu, emas tua) hanya untuk TKP, TWK tetap navy-emas. Tangga nilai = "tangga bertingkat" khas D'Ajiks (jangan mirip gaya Pejuang Kedinasan). Langkah 3 terapkan global SELESAI: siswa 102, pengajar 110 hlm, tautan 30/30. Berikut langkah 4 judul gaya buku pelajaran: kelompok 1 (Bab 1–4) DISETUJUI, kelompok 2 (Bab 5–7) DISETUJUI, semua judul DISETUJUI; kepala sampul seragam TWK+TKP tanpa garis panjang; HANDBOOK TKP GAYA BARU FINAL 2026-10-28 (siswa 102, pengajar 109 hlm), TUNTAS 2026-10-28; FINAL disetujui 2026-10-28.
