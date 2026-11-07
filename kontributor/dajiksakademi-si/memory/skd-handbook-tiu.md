---
name: skd-handbook-tiu
description: "Handbook TIU satu jilid 19 bab + lampiran; semua bab soal + pembahasan tuntas 2026-11-04; 10 gambar terpasang 2026-11-05; T7 + Daftar Isi tuntas 2026-11-05, 278 hlm, draf menunggu reviu manusia; sampul kubus DIKUNCI"
metadata:
  type: project
---
**2026-11-04: Bab 1–19 soal + pembahasan TUNTAS.** Bab 1, 2, 19 = 2 contoh per bab (T6-12; scripts/soal_dasar.mjs, data dasar_b01_02_19.json, kunci BEACDE); Tes Awal, Latihan B, pembuka Bab 1/2/19 dihapus; Lampiran A 41 latihan; L6 125 butir; build galat 0. 2026-11-05: 10 gambar penjelas terpasang (k12-spatial-engine/src/tiu-ilustrasi.ts lewat codex, SVG di aset/ilustrasi/, slot kosong 0, siswa 271 hlm). Berikut: Latihan A Bab 19 tuntas 2026-11-05 (scripts/latihan_a.mjs, siswa 277 hlm); T7 + Daftar Isi tuntas 2026-11-05 (PDF siswa 278 hlm, satu jilid; nomor Daftar Isi otomatis dari build.py). Status: draf, belum direviu manusia dan belum diuji peserta. Rincian di log.

**Aturan yang masih berlaku:**
- Judul bab = label sampul persis (Bab 8 "Deret Angka dan Suku ke-n", Bab 14 "Perubahan Gambar", Bab 16 "Analogi Gambar").
- Pembahasan 7 langkah; label "Pilihan yang Gugur" dan "Kekeliruan yang Mungkin Terjadi"; "Pembahasan Soal Pembuka" di akhir uraian bab sebelum Contoh.
- Pilihan angka urut naik; jarak tiap pilihan ke tetangga terdekat ≤ 3 × median jarak bertetangga (T5-16).
- Pembahasan yang terpisah dari soalnya diberi tautan dua arah: pil "Lihat pembahasan" di kepala kartu soal, "Kembali ke soal" di akhir pembahasan (komponen a.ke Handbook TWK; T5-18). Latihan ⇄ Lampiran B dipasang saat T6.
- Kata "satu-satunya" dilarang di seluruh buku, termasuk soal. Ejaan "Tes Intelegensia Umum".
- Soal hitung: cara cepat gaya tentor + satu cara lain + cek sisa 9.
- Semua soal handbook baru dari script, beda dari soal TO; figural pakai keluarga TO benih ≥ 900 (T6-8), tanpa keluarga benda. Cek bocor bentuk gambar = bocor() di tiu-handbook.ts.
- Izin internet hanya KBBI daring (kbbi.kemendikdasmen.go.id) untuk Bab 3.
- Sampul: prototipe/sampul_tiu_kubus.html + aset/cover_tiu_f4.png (DIKUNCI 2026-10-29).

**Rincian putusan (Putusan 1–11, T2-1 s.d. T5-9) dan prompt sesi berikut:** `riset/2026-10-30-log-handbook-tiu.md`; laporan tahap di `BIG DATA/HANDBOOK TIU D AJIKS AKADEMI/reports/`. Desain ikut [[feedback-desain-handbook]], diksi ikut [[feedback-wording-handbook]]. Terkait [[skd-tiu-engine-3k]].
