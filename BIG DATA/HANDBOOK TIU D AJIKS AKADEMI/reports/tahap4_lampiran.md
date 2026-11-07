# Tahap 4 · Lampiran Handbook TIU (siswa A–D, pengajar L1–L6)

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen lampiran
Dasar: `reports/tahap2_A_pembuka_penutup.md` 3.1–3.5 dan 4; log `riset/2026-10-30-log-handbook-tiu.md` (Putusan 5–11, T2-*, T3-*, T4-1 s.d. T4-36); engine TIU v0.4.3 Pilar 3; pola lampiran Handbook TWK (`90_lampiran.html`, `80_kunci_latihan.html`).
Tanpa soal baru: Lampiran A dan B berupa tempat kosong sampai T5/T6.

## 1. Berkas

**Baru**
| Berkas | Isi | Baris |
|---|---|---|
| `src/90_lampiran_siswa.html` | pita "Lampiran: Pembahasan Latihan dan Tabel Rujukan", Lampiran A dan B (tempat kosong bergaya slot, tanpa `data-slot`, catatan guru "diisi T5/T6"), Lampiran C jawaban Latihan A Bab 19 (14 butir) + catatan guru | 58 |
| `src/91_lampiran_tabel.html` | Lampiran D, tabel D1–D10 (= T1–T10 rencana), isi tiap tabel = blok GEN dari script | 261 |
| `src/95_lampiran_pengajar.html` | `section.bab.lamp.guru`: pita Lampiran Pengajar, L1 (di antara penanda `<!--L1:mulai/selesai-->`), L2 16 butir, L3 12 aturan, L4 10 pertemuan, L5 47 kode (GEN) + tindakan per kelompok | 174 |
| `src/96_lampiran_l6.html` | `section.bab.lamp.guru`: L6 kerangka, 165 butir (GEN) | 201 |
| `scripts/cek_lampiran.mjs` | pembangkit + pemeriksa: `--tulis` menulis blok GEN, tanpa flag memeriksa src sama persis dengan hasil hitungan | ±330 |

**Diubah**
| Berkas | Perubahan |
|---|---|
| `src/build.py` | `cek_lampiran.mjs` masuk tuple cek |
| `src/00_head.html` | blok CSS "lampiran" (tabel rujukan padat, angka rata kanan, `.trujuk` judul+tabel tidak terpisah, baris kelompok L6, garis tipis antarkelompok L5, `p.kenapa`); tanpa garis panjang, palet lama |
| `src/29_bab19.html` | "Lampiran L5 (belum ditulis)" → "Lampiran L5"; "Lampiran L4, belum ditulis" → "Lampiran L4"; "Jawabannya ada di lampiran" → "Lampiran C" |
| `src/11_bab01.html` | baris Lampiran di tabel "Cara Menggunakan Buku Ini" + "jawaban Latihan A Bab 19"; catatan "Asal Susunan Blok" memakai sebutan TR/TB/SL |
| `src/13_bab03, 14_bab04, 15_bab05, 21_bab11, 22_bab12, 23_bab13, 25_bab15.html` | nama tryout/bimbel di catatan pengajar diganti sebutan pendek (23 tempat): Paket 41 → TR, Part 39 → TB, TIU002 → SL, Pejuang → BL ("milik Pejuang" → "bahan bimbel lain"). Arti catatan tidak berubah; padanan sebutan di L1 |

Salinan src sebelum perubahan: `scratchpad/src_awal/` (sesi ini).
`12_bab02.html` sudah menulis "Lampiran L5" tanpa "(belum ditulis)", tidak diubah.

## 2. Halaman (pdfinfo)
| Edisi | Total | Lampiran |
|---|---|---|
| Siswa | **123** (sebelumnya 115) | hlm 116–123: A, B, C 116–118; D 118–123 |
| Pengajar | **154** (sebelumnya 137) | hlm 135–154: A–C 135–137, D 137–142, L1 143, L2 144, L3 145, L4–L5 146–149, L6 150–154 |

Bab 19 pengajar kini hlm 122–134 (sebelumnya 124–137): catatan pengajar Bab 1, 3–5, 11–13, 15 sedikit lebih pendek setelah nama tryout diganti sebutan pendek. Edisi siswa Bab 1–19 tidak bergeser (104–115).
Taksiran rencana (C + D 8 hlm siswa; L1–L6 ±18 hlm) terpenuhi: siswa C + D ±7 hlm, L1–L6 12 hlm.

## 3. Hasil build dan cek
- `python3 src/build.py` → **galat: 0**, kedua PDF dibuat; 7 script cek lulus.
- `cek_lampiran.mjs`: 553 butir assert lulus.
  - D1 kuadrat lewat (n + 1)² = n² + 2n + 1 dan n × n; D2 kali berulang = `**`; D3 pembagian bersusun, desimal habis tepat ⇔ penyebut hanya berfaktor 2 dan 5, desimal berulang dicek ulang, 8 baris tabel Bab 6 harus termuat persis; D4 trik ×11 diuji 90 bilangan dua angka, kuadrat berakhiran 5 diuji 15–195, contoh = hasil kali langsung; D5 2ᵏ × 5ᵏ = 10ᵏ; D6 contoh = angka Bab 8 (202, 10 suku, 210, 6, U₁₀ = 110 = n² + n); D7 pasangan berjumlah 27 + teks Bab 8; D8 km/jam ↔ m/menit ↔ m/detik (5 : 18), contoh kereta/perahu/rata-rata = teks Bab 10; D9 bunyi lima pilihan = tabel Bab 11 persis, lima keadaan tiga langkah saling meniadakan; D10 matriks 2 × 2 (sama dengan `cek_bab14_18.mjs`), kolom penanda/urutan = tabel Bab 14, dua cermin selalu putaran, urutan cermin–putar berpengaruh.
  - L5: 47 kode, kelompok, nama kamus, kalimat guru dibaca langsung dari engine v0.4.3 Pilar 3; kolom Bab dihitung dari 133 baris tabel kekeliruan Bab 3–18; tujuh nama kelompok tabel tindakan = engine.
  - L6: 164 slot + Contoh 1 Bab 6 (`data-soal`) = 165 butir, ID unik, target = `data-target`.
  - Lampiran C: 14 butir = tabel Latihan A Bab 19 (kode, nama persis, nomor + nama kelompok, bab), 1–2 kalimat per butir.
  - L4: banyak latihan dan jumlah target per pertemuan dihitung dari slot (Bab 1–19 tepat sekali).
  - Lampiran A/B: angka 68 latihan pilihan ganda + 2 Latihan Bukti dari slot.
  - Nama "Al Faiz", "Paket 41", "Part 39", "TIU002", "Pejuang" ditolak di semua src di luar penanda L1/L6; berkas 95/96 wajib satu `section.bab.lamp.guru` (dibuang utuh di edisi siswa).
  - "satu-satunya" 0; tidak ada rujukan lampiran "belum ditulis" di bab.
- Detektor impeccable (edisi pengajar): hanya temuan lama (kontras teks sampul di atas tirai gelap, abu-abu `.slot .id`/`.src`, font utama). CSS lampiran tidak menambah temuan.

## 4. Cek mata (PNG 60 dpi, scratchpad `mata3/`)
Putaran 1 menemukan: (a) tabel kedua D10 meluber ke tabel ketiga (dua tabel bersebelahan terlalu sempit); (b) Lampiran C mulai di halaman baru sehingga hlm 116 setengah kosong, dan Lampiran D dipaksa halaman baru sehingga hlm 118 hampir kosong; (c) kode J-SEDERHANA/J-PERSAMAAN terpenggal di L5; (d) jenis FIG-* terpenggal dan "FIG-SERI-P3" terbaca "FIG-SERI-P" di L6; (e) kolom Bahan L4 terpenggal; (f) paragraf penutup L6 rata kanan-kiri berjarak lebar.
Semua diperbaiki (D10 bertumpuk, tabel C dan L5/L6 boleh berlanjut dengan kepala diulang, kolom dilebarkan + tanpa pemenggalan, regex jenis memuat angka, paragraf rata kiri). Putaran 2: tidak ada tabel terbelah di tengah baris, tidak ada judul yatim, tidak ada luberan.
Sisa yang diterima: hlm 122 siswa ±45% kosong (D10 utuh tidak muat di bawah D9); hlm 149 pengajar hanya tabel tindakan (L6 mulai halaman baru).

## 5. Butir putusan antre untuk Gusti (satu per respons)
1. **Persetujuan isi lampiran** (A/B tempat kosong, C, D1–D10, L1–L6). Rekomendasi: setujui; isi A/B menyusul T5/T6.
2. **Nama tryout di catatan pengajar bab diganti sebutan pendek TR/TB/SL/BL** (23 tempat di 8 berkas; padanan di L1). Dikerjakan karena rencana 3.4 + Putusan 11b + catatan Bab 1 sendiri mensyaratkan nama hanya di L1/L6, dan build kini menolaknya di tempat lain. Rekomendasi: terima. Alternatif: kembalikan nama di catatan bab dan longgarkan cek ke "hanya edisi pengajar".
3. **Lampiran D bernomor D1–D10** (rencana menulis T1–T10). Rekomendasi: D1–D10, supaya tidak rancu dengan kode bentuk T1–T5 dan selaras dengan huruf lampiran.
4. **D8 memakai m/detik di samping m/menit** (rencana: m/menit saja), karena Bab 10 mengajarkan 5 : 18 ke m/detik. Rekomendasi: terima.
5. **L4 memakai patokan ±90 menit per pertemuan** (ditandai "usulan, belum diuji di kelas") dan saran memindahkan Contoh 6–7 Bab 11 ke tugas rumah bila kelas tertinggal. Rekomendasi: Gusti menetapkan lama pertemuan sebenarnya; angka latihan per pertemuan tidak berubah karena dihitung dari isi buku.
6. **Lampiran C ditulis umum** (tanpa angka/gambar soal, karena soal rujukan belum ada). Rekomendasi: terima sekarang; pertajam dengan isi pilihan yang disorot sesudah T5.
7. **Tata letak**: hlm 122 siswa ±45% kosong dan L6 mulai halaman baru (hlm 149 pengajar pendek). Rekomendasi: terima sampai T7, seperti T4-36.
8. **L1: asal penerbit TIU002 ditandai "belum diverifikasi"** (catatan Bab 3 lama menyebutnya milik Pejuang). Rekomendasi: Gusti mengonfirmasi asal berkas, atau biarkan bertanda.
