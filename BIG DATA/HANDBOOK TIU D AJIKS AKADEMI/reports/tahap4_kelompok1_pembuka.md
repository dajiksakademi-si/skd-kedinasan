# Tahap 4 · Kelompok 1 Pembuka — Bab 1, Bab 2, kerangka build

Handbook TIU D'Ajiks Akademi · 2026-10-31 · subagen tiu-t4-pembuka
Status: draf menunggu persetujuan Gusti. Tidak ada soal, opsi, atau kunci yang dibuat.

## Berkas
| Berkas | Isi |
|---|---|
| `src/00_head.html` | CSS prototipe `gaya_halaman_tiu.html` apa adanya + komponen tambahan (tabel isi, fakta, daftar bernomor, kartu prinsip, kartu slot, kotak pengajar, ringkasan) + CSS sampul diberi awalan `.cover` |
| `src/01_sampul.html` | sampul kubus terkunci (figure "C baru"); satu-satunya ubahan: label "Versi Siswa" → `{{VERSI}}`; gambar dirujuk dari `prototipe/aset/` |
| `src/11_bab01.html`, `src/12_bab02.html` | Bab 1 dan Bab 2 |
| `src/build.py` | rakit → `Handbook_TIU_Siswa.html/.pdf`, `Handbook_TIU_Pengajar.html/.pdf`; jalankan assert dulu; cek frasa terlarang (semua berkas), maka/karena itu ≤ 1 per subbagian, istilah dapur + kode (J-, JF-, K1–K7, G1–G8, HOTS) + nama tryout di versi siswa; pita bab = target terbanyak slot bab itu; keluar kode 1 bila ada galat |
| `scripts/cek_bab01_02.mjs` | semua angka ilustrasi dihitung + assert, lalu dicek muncul persis di src |

Hasil build: galat 0 · assert lulus · **siswa 13 hlm, pengajar 16 hlm** (sampul termasuk). Cinzel termuat. Cek mata PNG: tidak ada teks terpotong atau tabel meluber; ungkapan hitung diberi `nowrap`; kartu prinsip rata kiri.

## Subbagian
**Bab 1 · Gambaran Umum Tes Intelegensia Umum** (pita: "Bab ini tanpa soal pilihan ganda; rata-rata TIU ±86 detik per soal.")
Pertanyaan pembuka (slot) · Dasar Hukum dan Angka Resmi · Materi yang Diuji menurut Kisi-kisi Resmi · Susunan 35 Soal TIU · Ambang Batas dan Banyak Jawaban Benar (+ Menebak atau Mengosongkan Soal) · Pembagian Waktu dan Titik Periksa (+ Contoh Lembar Rencana Waktu, slot dua keadaan) · Aturan Melompati Soal · Cara Menggunakan Buku Ini · Lembar Kerja Bab 1 · Ringkasan.

**Bab 2 · Prinsip Dasar Penyelesaian Soal TIU** (pita: "Target waktu ±60 detik per soal")
Pertanyaan pembuka (slot) · Contoh Penyangkal · Empat Prinsip Penyelesaian Soal (+ tabel lima konsep inti) · Urutan Mengerjakan Satu Soal · Kebiasaan Memeriksa Jawaban · Tujuh Kelompok Kekeliruan · Susunan Pembahasan di Buku Ini · Contoh Soal dan Pembahasan (5 slot) · Tes Awal (4 slot, 4 menit 45 detik) · Ringkasan.

## Slot kosong (14)
B01-P01 isian ambang · B01-C02 dua keadaan titik periksa · B01-L01 Rencana Waktu Pribadi · B01-L02 Peta Diri · B02-P01 titik pada lingkaran · B02-C01 silogisme (60) · C02 kerja tetap (75) · C03 hitung cepat (30) · C04 kecukupan data (90) · C05 analogi gambar (60) · B02-L01 memperlemah argumen (60) · L02 deret berselang (75) · L03 KCK persen ya/tidak (90) · L04 gambar berbeda (60). Tes Awal = slot Latihan 2, 4, 6, 10 laporan T2-A (verbal, numerik, KCK, figural; Putusan T2-7(1)). Lembar rencana waktu terisi (B01-C01) ditulis sebagai isi bab, bukan slot.

## Fakta Kepmen 406/2026 yang dikutip
Nomor/judul hlm. 1 (pindaian, dicek mata) · ditetapkan 27 Juli 2026 hlm. 7 · PERTAMA b "tes intelegensia umum" hlm. 3 · KEDUA b angka 1–3 kisi + tujuan hlm. 4–5 · KETIGA 100 menit hlm. 5 · KEEMPAT b 35 soal hlm. 6 · KELIMA a benar 5, salah/kosong 0 hlm. 6 · KEENAM b 175 hlm. 6 · KETUJUH ambang = nilai minimal tiap peserta hlm. 6 · KEDELAPAN a–c 65/80/156 hlm. 6 · KESEMBILAN afirmasi lewat usulan K/L + persetujuan Menteri hlm. 6 · KESEPULUH 281 dan TIU 55 hlm. 6.

## Belum diverifikasi (ditandai di buku)
Susunan blok 31–65 dan urutan subtes (rekonstruksi, keyakinan sedang) · jam CAT menghitung mundur (andaian lembar rencana) · patokan detik per jenis (usulan D'Ajiks, belum dikalibrasi) · format resmi perbandingan kuantitatif · pemetaan kisi → bab dan bentuk di luar kisi (tafsiran D'Ajiks). Catatan kecil: 3.030 detik : 35 = 86,6 detik; buku menulis "±86" sesuai Putusan 5.

## Perlu putusan Gusti
1. **Label sampul edisi pengajar.** Sampul terkunci memuat "Versi Siswa"; build menggantinya dengan "Versi Pengajar" di edisi pengajar (pola TWK). Rekomendasi: setujui.
2. **Pilihan empat soal Tes Awal** (argumen, deret berselang, kecukupan data persen, gambar berbeda; total 4:45). Analitis dan optimasi tidak masuk. Rekomendasi: setujui; alternatif ganti gambar berbeda dengan analitis (total 5:45).
3. **Kalimat sampul "temukan kalimat kunci"** (terkunci) berbeda dengan istilah siswa "kalimat penentu" (Putusan 9a) yang dipakai di isi. Rekomendasi: biarkan sampul (terkunci); bila ingin seragam, ubah satu kata itu saja.
