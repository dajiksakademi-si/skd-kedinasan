# Log engine figural TIU (adaptasi k12-spatial-engine) — 2026-10-28

Perintah Gusti: pindahkan engine dari root, pelajari, bangun jenis soal gambar yang belum ada berdasarkan contoh Al Faiz (Paket 41 no. 57–65 + Part 39 di `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/`).

Lokasi engine: `BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/k12-spatial-engine/` (dipindah dari root 2026-10-28). `npm install` (tsx) + `npm test` OK: 30 butir PSI lama valid.

## Jenis Al Faiz yang belum punya generator
| Kode baru | Contoh Al Faiz | Inti |
|---|---|---|
| FIG-BEDA-PUTAR | Paket 41 no. 62 | 4 gambar = satu bentuk kiral diputar; 1 gambar = dicermin |
| FIG-BEDA-HITUNG | Paket 41 no. 61 | 3×3 token 2 jenis; 4 opsi jumlahnya sama, 1 beda; fitur lain tidak boleh menunjuk opsi lain |
| FIG-SERI-P3 | Part 39 no. 58 | gambar 1→4, 2→5, 3→? dengan satu transformasi |
| FIG-SERI-KUADRAN | Paket 41 no. 58 | 4 objek di 4 kuadran berpindah bersama + satu objek punya aturan sendiri |
| FIG-ANA-OBJ | Paket 41 no. 59, 60; Part 39 no. 59 | tiap objek dalam sel punya transformasi sendiri; ? bisa di posisi mana pun |
| FIG-MTX-PUTAR | Part 39 no. 64–65; Paket 41 no. 63 | 3×3 bentuk kiral, kolom 1→2 T1, kolom 2→3 T2 (atau per baris); bukti semua pasangan transformasi |

Kunci desain: bentuk kiral (8 transformasi persegi semua beda, dicek assert) supaya putar ≠ cermin (pelajaran 58 Part 39, kesalahan Claude 60/63 Paket 41). Pengecoh = satu keputusan salah yang bisa dinamai. Pembahasan gaya guru TIU SKD (C-1a), label A–E.

## Status
- [x] Pindah folder, install, uji engine lama
- [x] Pustaka bentuk kiral + transformasi (`src/tiu-bentuk.ts`)
- [x] Generator 6 jenis + CLI TIU (`npm run gen:tiu`), 14 butir contoh lolos assert; modul PSI tetap 30/30
- [x] Pratinjau dicek mata (Chrome headless → PNG): 14/14 benar setelah perbaikan
- [x] Pelajaran ke skill + memory, cek.py

## Temuan saat membangun (dipakai ulang)
1. Seri 4 kuadran dengan ? di gambar terakhir selalu sama dengan gambar (2) (semua periode membagi 4) → bisa dijawab dengan mencocokkan gambar. Taruh ? di gambar (4) dan pasang assert "jawaban ≠ gambar terlihat".
2. Pengecoh "putar arah terbalik" bisa sama dengan kunci (90° × 3 = 270°). Pengecoh wajib dihitung dari aturan, lalu dicek kembar oleh `pasang`.
3. Soal gambar berbeda tidak punya gambar soal; pilihan jawaban adalah soalnya (seperti Al Faiz 61–62).
4. Bentuk yang kiral secara koordinat bisa tetap terlihat hampir simetris (uji bentuk "sepatu bertumit"). Pengukur piksel tidak bisa memisahkannya → cek mata tetap wajib.
5. Pilihan "bentuk kembali tegak" (kesalahan Claude Paket 41 no. 63) dipasang sebagai pengecoh di matriks arah baris.

## Logika penyusun Al Faiz dari pembahasan resmi Paket 41 (dikirim Gusti 2026-10-28)
- 59 (analogi, kunci C): sel dibagi BAGIAN (atas/bawah). Bagian atas: dua objek sisi kanan-kiri dibalik warnanya (hitam penuh ↔ garis putih), objek tengah atas dicermin atas-bawah. Bagian bawah tetap. → atribut baru: BALIK WARNA (isi ↔ garis) dan aturan per bagian sel.
- 62 (gambar berbeda, kunci D): dua atribut sekaligus. (a) dua hiasan pojok: ukurannya beda di A/B/C/E, sama di D; (b) pasangan bentuk tengah (besar garis putih + kecil hitam, bentuk sama): yang kecil di BELAKANG di A/B/C/E, di DEPAN di D. → atribut baru: URUTAN TUMPUK (depan/belakang) dan UKURAN SAMA/BEDA; kunci berbeda di dua atribut.
- 64 (matriks, kunci B): hitung. Cabang bergelombang objek tengah +1 tiap kolom; objek kecil di pinggir +1 tiap kolom, bentuk dan letaknya tidak dihitung. Jawaban 7 cabang + 8 objek kecil. → jenis baru FIG-MTX-HITUNG organik (dua hitungan sekaligus, hiasan lain = pengalih).
- 65 (matriks, kunci A): tiap baris memuat tiga kelompok objek (latin per baris); dua baris tanpa perubahan, satu baris berubah: objek atas dicermin, objek kiri pindah ke kanan lalu dicermin. → atribut baru: TUKAR/PINDAH POSISI. Catatan cacat: "2 baris tetap, 1 baris berubah" bukan aturan baris yang konsisten (B-15) — jangan ditiru.
- Gaya visual Al Faiz: siluet organik tebal hitam (daun, pelangi, mahkota, tunas, bintang, planet, bulan, hati), pasangan hitam penuh vs garis putih, hiasan daun di pojok, objek bersentuhan/bertumpuk.

## Masukan Gusti 2026-10-28 atas 14 contoh
Contoh "terlalu klasik dan terlalu AI": bentuk geometris kaku. Minta gaya lebih natural seperti aksen Al Faiz, tetapi pendekatan berbeda supaya tidak identik. Boleh pakai codex CLI untuk aset aksen awal.
Rencana teknis: bentuk organik = titik kendali dihaluskan (Catmull-Rom) jadi poligon rapat, sehingga putar/cermin/sig tetap eksak; tambah atribut balik warna, tumpuk, ukuran, tukar posisi, hitung cabang. Arah gaya menunggu pilihan Gusti.

## Putusan Gusti 2026-10-28 (lanjutan)
- Gaya = GABUNGAN tiga arah (alam, nusantara, kuas) supaya tidak monoton → `src/tiu-gaya.ts` (12 bentuk + gumpal bercabang + balik warna).
- Minta prototipe mockup yang bisa diubah, logika penyusun Al Faiz masuk skill + engine D'Ajiks.
- Progres: gaya organik dipasang ke semua jenis; ANA dapat +warna dan tukar tempat; jenis baru FIG-BEDA-TUMPUK, FIG-MTX-HITUNG (19 butir lolos assert). Selesai: cek mata 19 butir (gaya baru natural), mockup `npm run mockup` → `mockup/index.html` berfungsi, engine TIU v0.4 (blueprint Paket 41 + Pilar 4 FIG), skill tiu.md + tiu-verbal-figural §7.8. Sisa: sambungan di versi garis bentuk majemuk; kalimat analogi per jenis masih seragam; ekspor CAT/PDF.

## Masukan Gusti 2026-10-28 (sesudah compact): "masih kaku/mati"
- DIPERTAHANKAN: desain FIG-MTX-HITUNG (contoh 019: gumpal bercabang besar di tengah + objek kecil acak di pinggir). Jangan diubah.
- Diagnosis Claude (disetujui Gusti "persis seperti yang kamu bilang"): (1) gumpal hitam tanpa detail, (2) rupa cuma hitam/garis, (3) susunan selalu sama besar di slot simetris, (4) tepi kasar. Pembanding: Al Faiz 59 = ikon berdetail, tekstur kisi, ukuran bervariasi.
- Penyesuaian 1 (dikerjakan): rupa ARSIR (garis miring dipotong di dalam bentuk, `arsir` di tiu-gaya.ts); `Rupa` hitam/garis/arsir + `beri` + `tata` (satu objek dominan + pendamping kecil, letak tidak simetris) di tiu-bentuk.ts. Diterapkan ke BEDA-PUTAR, BEDA-TUMPUK (bentuk besar berarsir), SERI-P3, SERI-KUADRAN (ukuran per objek), ANA-OBJ, MTX-PUTAR. Spesifikasi menerima `rupa` (mockup).
- Aturan teknis: rupa diberikan PALING AKHIR (sesudah putar/cermin/geser). Kalau arsir ikut diputar, arah arsir berbeda antaropsi dan bisa membocorkan kunci. Arsir hanya untuk objek besar (objek kecil: arsir terlalu rapat seperti noda). Objek yang dibalik warnanya tidak boleh berarsir (assert). Tukar tempat hanya antar-objek seukuran (assert).
- Belum diubah: BEDA-HITUNG (bulatan grid), detail garis dalam bentuk, tema ikon. Menunggu kesan Gusti atas penyesuaian 1.

## Aset benda dari Codex CLI (2026-10-28, atas perintah Gusti)
- Prompt: scratchpad codex-aset-prompt.md (20 benda, 4 tema laut/perkakas/nusantara/satwa, kiral, bedaMin ≥ 0,35, tanpa planet/bintang/bulan/mahkota/pelangi/hati/daun). Hasil: `src/tiu-aset.ts` (ASET) + `src/cek-aset.ts` (galeri `.test-out-aset/aset.html`). File lama tidak diubah. BELUM dipasang ke BENTUK/generator.
- Angka: 20/20 kiral, bedaMin 0,36–0,77. Codex tidak bisa cek mata (sandbox); cek mata oleh Claude.
- Cek mata: layak = ikan, kail, palu, payung, kunci, layang-layang, burung, kura-kura, kupu-kupu, gasing, kucing. Lemah = kerang (kembar dengan siput), cumi (seperti hantu), kepiting (seperti monster), teko (kaku/kotak), kendi (seperti apel/bom), kipas (seperti cakar), bakiak (gumpal), gunting (gagang seperti mata). Gaya bersudut, berbeda dari 12 bentuk lengkung lama.
- Putusan Gusti: SETUJU (haluskan yang layak + pasang; Codex gambar ulang yang lemah). Dikerjakan:
  - `haluskan` (Chaikin 2×) + daftar `LAYAK` + `BENDA` di tiu-aset.ts; `GAYA` gabungan (alam, nusantara, kuas, benda) kini diekspor dari tiu-bentuk.ts → 29 bentuk di BENTUK, semua lolos cekBentuk.
  - Codex putaran 2 (prompt codex-ulang-prompt.md): 6/8 lolos cek mata (cumi, teko, gunting, kendi, kipas, terompet; bakiak diganti terompet). Kerang (seperti helm/batu) dan kepiting (siluet gumpal) MASIH LEMAH, tidak dipasang.
  - 5 contoh soal baru memakai benda (BEDA-PUTAR, SERI-P3, SERI-KUADRAN, ANA-OBJ, MTX-PUTAR) → 24 butir, kunci A5 B5 C5 D5 E4; PSI 30/30; mockup galeri "Benda" berfungsi.
  - Aturan cek mata: benda berdetail banyak (kupu, kucing, kura, burung) hanya sebagai objek besar; pada skala ≤ 0,34 detail jadi noda.

## Aset putaran 3: gaya guratan figural (2026-10-28)
- Koreksi Gusti: peserta = calon kedinasan/TNI/Polri, bukan tema "dekat siswa"; gaya guratan figural Al Faiz BOLEH diambil (memory feedback-figural-kedinasan). Tugas Codex tema siswa dihentikan, file dipulihkan.
- Codex putaran 3 (codex-aset4-prompt.md): 24 bentuk, 4 tema (lambang, sulur, tinta, tekstur), semua lolos angka.
- Cek mata: 16 dipasang (sulur 6, tinta 6, bolakisi, obor, sayapbulu, rajawali/sayap) → BENTUK 45. Tidak layak: elang, naga (seperti huruf S), singa, kuda, harimau (siluet kartun menggumpal, guratan putih hilang di versi hitam), kerucutkisi, perisaigaris, cincinmiring.
- Pelajaran: satwa lambang berdetail (seperti Al Faiz 64) di luar jangkauan gambar lewat koordinat oleh Codex. Jalan lain bila Gusti mau: gambar raster → dijadikan garis vektor → poligon (belum dicoba).
- Belum ada: susunan "sel padat" ala no. 58 untuk aset tinta (perlu kerja engine).

## Contoh figural Al Faiz tambahan (8 gambar, dikirim Gusti 2026-10-28)
Disimpan: `BIG DATA/REFERENSI LUAR/AL FAIZ TIU 2026-10-28/figural-tambahan-1..8.png`. Gusti: "boleh mengikuti desainnya tapi tambahkan sudut atau lekung agar tidak identik".
Analisis (aturan ditandai ? = belum pasti tanpa pembahasan resmi):
1. Matriks 3×3 pasangan motif kembar (mahkota, panah, pelangi, jamur) + aksesori samping (batang, rantai kotak, garis putus): satu set motif per baris (latin); atribut = pasangan searah atau dicermin, aksesori kiri/kanan. ?
2. Gambar berbeda: bentuk besar garis + salinan kecil hitam di belakang/depan + hiasan pojok beda ukuran = pola no. 62 (sudah ada FIG-BEDA-TUMPUK).
3. Analogi 3 objek (gumpal kiri, spiral kotak/pelangi kanan, garis gelombang/lengkung bawah): perubahan per objek (sudah ada FIG-ANA-OBJ); susunan "dua atas + satu lebar bawah".
4. Matriks unsur kecil (ikal 1–3, kilau, petir, bintik, koma, semanggi/hati): kolom 3 = gabungan kolom 1 + kolom 2, jumlah ikal dijumlah. ?
5. Matriks bentuk dasar + aksen atas (pelangi, segitiga, hati; bintang, kilau, silang): kolom 3 = gabungan, jumlah puncak/kelopak dijumlah; tepi kasar seperti tinta. ?
6. Analogi 4 kuadran berisi molekul (bola-bola menyatu): tiap molekul diputar + pindah kuadran.
7. Seri 5 gambar multi-unsur: tiap unsur punya aturan sendiri (garis lurus ↔ ikal bergantian; gumpal besar kelopaknya bertambah). ?
8. Analogi 3 objek: dua objek atas bertukar tempat, objek bawah (cacing bergelombang) dicermin (sudah ada: tukar + transformasi).
Ciri gaya: hitam pekat tanpa arsir, 2–4 objek memenuhi kotak, ukuran beragam, banyak bentuk berparameter (molekul, spiral kotak, ikal, gumpal berkelopak, pelangi bergaris).

Dikerjakan: `src/tiu-pola.ts` = keluarga bentuk berparameter (tak terbatas, kiral):
- molekul (kontur medan bola, siku bersudut; jarak = 1,38 × jumlah jari-jari, supaya leher menyempit tapi tidak putus),
- spiral kotak bersudut lengkung + EKOR (tanpa ekor, putar 90° nyaris sama),
- ikal n (sikloid, ujung meruncing),
- lekuk n kelopak + TANGKAI (tanpa tangkai, putar 90° nyaris sama).
10 contoh siap pakai (POLA) → BENTUK 55; 3 contoh soal baru → 27 butir, kunci A5 B6 C6 D5 E5.
- Engine: `bedaMin` dipercepat ±7× (piksel tiap transformasi dihitung sekali).
- Aturan cek mata kini otomatis: `RINCI` + `cekKecil` (tiu-bentuk.ts) menolak bentuk berdetail sebagai objek kecil; langsung menangkap 1 contoh lama yang melanggar.
Belum: jenis aturan baru dari contoh 1, 4, 5, 7 (latin pasangan, gabung kolom, seri multi-unsur) dan susunan sel padat/"dua atas + satu lebar bawah".

## Pembahasan resmi + contoh tambahan 2 (dikirim Gusti 2026-10-28)
Putusan Gusti: contoh 4 (matriks ikal) DIBUANG, karena soalnya tidak tersedia dan aturannya ragu. Contoh 1 dan 7 tetap belum punya pembahasan, jadi jangan dibangun dulu.
Pembahasan resmi (disimpan di REFERENSI LUAR/AL FAIZ TIU 2026-10-28/pembahasan-*.png):
- No. 59 (= contoh 8): tiap objek punya perubahan sendiri.
  - Objek 1: LEKUKAN BERTAMBAH 2, lalu bergeser ke kanan.
  - Objek 2: CABANG BERKURANG 2, lalu bergeser ke kiri.
  - Objek 3: dicermin vertikal.
  - Atribut baru = perubahan JUMLAH bagian (lekuk/cabang ±k) + GESER posisi, digabung dengan cermin.
- No. 65 (= contoh 5): per baris.
  - Objek besar kolom 1 + kolom 2 DIGABUNG jadi objek kolom 3 (dua lengkung → dua lengkung bertumpuk; dua segitiga + satu segitiga → mahkota).
  - Objek kecil kolom 2 → kolom 3: hanya ujungnya berubah, LANCIP → TUMPUL.
  - Atribut baru = GABUNG bentuk dan UJUNG lancip/tumpul.
- No. 60 (= contoh 6): analogi 4 kuadran molekul; objek 1 dan 4 bertukar tempat, objek 2 dan 3 dicermin horizontal.
Contoh tambahan 2 (6 gambar, figural-tambahan2-1..6), dibaca tanpa pembahasan:
- Analogi 4 objek dengan perpindahan posisi dan perubahan per objek.
- Sel padat bertepi gerigi.
- Gambar berbeda dengan sel padat 4 gumpal (seperti no. 58).
- Pasangan segilima berisi simbol (konsistensi letak).
- Kisi 3×3 bergaris diagonal.
Pola umum: Al Faiz memakai 1 aturan per objek, dan objeknya 3–4 per sel.
Rencana bangun (sesi berikut):
1. FIG-ANA-UBAH: analogi dengan objek berparameter. Lekuk/gumpal/ikal ±k, geser kiri/kanan, cermin, dan tukar. Pengecoh = salah hitung ±1, lupa geser, arah cermin salah.
2. FIG-MTX-GABUNG: kolom 3 = gabungan bentuk besar kolom 1 + 2; objek kecil berubah lancip → tumpul (pakai `haluskan`). Pengecoh = gabungan kurang satu bagian, ujung tidak ditumpulkan, salah ambil kolom.
3. Susunan sel padat 4 objek (no. 58 + contoh tambahan) untuk BEDA-PUTAR.

### Dikerjakan 2026-10-28 (sesi lanjutan): FIG-ANA-UBAH + FIG-MTX-GABUNG
File: `src/tiu-fig-ubah.ts` (baru), `bintang()` + `lekuk(..., tangkai=false)` di `src/tiu-pola.ts`, daftar di `tiu-jenis.ts`. 31 butir lolos assert (kunci A5 B8 C6 D6 E6); PSI 30/30; mockup dibangun ulang.
- FIG-ANA-UBAH (no. 59): objek 1–2 = objek hitung beda jenis (gumpal berkelopak, bintang bercabang), jumlah ±k; opsional dua objek atas bertukar tempat; objek bawah kiral diputar/dicermin. "?" di (2) atau (4). Bukti: setiap tafsir hitung (tambah d, kali/bagi bulat) harus memberi jumlah sama (uji negatif: 4→8 dengan sisi lain 5 ditolak, karena +4 = 9 tapi ×2 = 10); objek bawah satu perubahan dari 8.
- FIG-MTX-GABUNG (no. 65): tiap baris satu keluarga bentuk (lengkung, puncak mahkota, kelopak); kolom 3 = gabungan bagian kolom 1 + 2, bagian inti (alas, pusat) ada di kedua kolom sehingga tafsir "bagian sama dibuang" gugur; bintang kecil kolom 2 → kolom 3 ujung lancip jadi tumpul. Bukti: 7 aturan himpunan (gabung, beda, irisan, salin, kurang) dicek terhadap baris 1–2.
- Pengecoh: salah 1–2 hal, kesalahan dinamai bahasa guru. Pemilih pengecoh (`pilih`) menegakkan: tiap atribut pernah salah; tiap ciri kunci juga dimiliki minimal satu pengecoh; kunci tidak unggul sendirian dalam jumlah ciri bersama.
Temuan cek mata (dipakai ulang):
1. Objek hitung skala 0,44 terlalu kecil untuk dihitung → 0,6.
2. Bintang kecil di pojok ±33 R 14 terpotong bingkai → pojok ±30, R 13.
3. Lengkung kecil di dalam lengkung besar terbaca satu "jembatan", bukan dua bagian → keluarga lengkung hanya 2 bagian.
4. Kelopak lebar 13 menggumpal → 11.
5. BOCOR: gabungan utuh hanya ada di kunci → bisa ditebak "pilih yang paling lengkap". Aturan baru di `pilih`: setiap ciri kunci wajib dimiliki minimal satu pengecoh (USULAN ke Pilar 4 engine, belum masuk engine).
6. Puncak runcing tidak boleh di baris 3 (assert): siswa tidak bisa tahu apakah ujung objek besar ikut ditumpulkan.
Belum: susunan sel padat 4 objek (rencana no. 3); contoh 1 dan 7 menunggu pembahasan resmi.

### Audit "mudah ketebak" (perintah Gusti 2026-10-28: arah desain ANA-UBAH/GABUNG OKE; semua soal level sedang–sulit, tidak ada yang mudah ditebak)
Temuan (tingkat ciri, bukan piksel — pengukur piksel tidak menghitung rupa garis/arsir):
- ANA-OBJ (7), SERI-KUADRAN (4): pengecoh salah tepat satu objek → kunci = opsi paling banyak berbagi ciri (tebak "paling mirip").
- MTX-HITUNG, ANA-UBAH 022: kunci = nilai tengah semua hitungan (tebak "angka tengah").
- BEDA-HITUNG 004 (2 jenis) dan 005: kunci = gambar paling gelap.
- BEDA-TUMPUK: cek mata apakah bentuk hitam di depan langsung mencolok.
Rencana: (1) pindah `pilih`/`calonDari` ke tiu-bentuk.ts + cek "angka tengah"; (2) ANA-OBJ, SERI-KUADRAN, MTX-HITUNG pakai pilih (pengecoh 1–2 kesalahan); (3) BEDA-HITUNG: minimal 3 jenis + kunci tidak boleh paling gelap/terang; (4) cek mata BEDA-TUMPUK; (5) audit ulang + cek mata semua yang berubah.
Hasil audit (selesai 2026-10-28):
- `pilih` + `calonDari` dipindah ke tiu-bentuk.ts; cek baru: kunci bukan satu-satunya opsi bernilai tengah di semua hitungan.
- ANA-OBJ, SERI-KUADRAN, MTX-HITUNG kini memakai `pilih` (pengecoh 1–2 kesalahan, bernama). SERI-KUADRAN dapat kesalahan baru "kurang satu langkah putaran"; MTX-HITUNG dapat "lebih dua".
- BEDA-HITUNG: assert minimal 3 jenis + target bukan hitam; kunci tidak boleh paling gelap/terang. Spesifikasi 004 diubah (target putih, 3 jenis).
- BEDA-TUMPUK: cek mata menemukan bentuk kecil yang TIDAK menempel bentuk besar (006-A, 007-D) → depan/belakang tak terlihat = soal cacat. Kini letak bentuk kecil dicari di kisi supaya tertutup 20–70% (`letakKecil`, `tinta` di tiu-bentuk.ts).
- 31 butir lolos, PSI 30/30, mockup dibangun ulang, cek mata semua butir yang berubah.
- Tingkat: 25 butir tier 3, 6 butir tier 2 (sedang). Paling ringan = 008 SERI-P3 (satu aturan putar, selang tiga). Klaim sedang–sulit belum diuji ke peserta.

### Perintah Gusti 2026-10-28: tampilan setara Al Faiz, tidak identik, kesulitan setara/lebih
Diagnosis yang disetujui Gusti (Al Faiz lebih enak dipandang): (1) objek besar mengisi sel, kita kecil + banyak ruang kosong; (2) Al Faiz satu gaya hitam pekat, kita campur hitam/garis/arsir; (3) Al Faiz satu keluarga bentuk per soal, kita campur daun+kail+molekul; (4) Al Faiz siluet tanpa garis tepi, kita garis tepi tebal 3 px; (5) susunan kita terasa slot tetap.
Spesifikasi "gaya siluet D'Ajiks" (rencana):
1. Hitam pekat tanpa garis tepi untuk bentuk hitam (opsi gambar khusus modul TIU, jangan ubah `draw` milik modul PSI/sig).
2. 2–4 objek besar mengisi sel, ukuran beragam, saling berdekatan; susunan dipilih acak terkendali, bukan slot tetap.
3. Satu keluarga bentuk per soal (pola berparameter: lekuk, bintang, molekul, ikal, spiral; tinta; sulur).
4. Garis putih/arsir hanya bila balik warna memang aturan soal.
5. Pembeda dari Al Faiz: keluarga bentuk kita sendiri (molekul siku, spiral kotak berekor, bintang lancip/tumpul, sulur nusantara, tinta), bukan mahkota/pelangi/hati/jamur Al Faiz.
6. Kesulitan: setiap jenis minimal 2 aturan sekaligus (tier 3); 008 (satu aturan) dinaikkan.
7. Aset: pakai POLA + tinta/sulur yang sudah lolos cek mata; Codex CLI hanya untuk celah (cek mata wajib oleh Claude).
Keluaran yang diminta: 1 soal terbaik per jenis (10 jenis) → halaman tinjauan visual untuk Gusti SEBELUM diterapkan ke semua contoh.
Juga: tabel blueprint engine v0.4 baris figural salah ("seri 3 · analogi 1"); benar seri 2 (57, 58) · analogi 2 (59, 60) · beda 2 · matriks 3 — Gusti menjawab "oke".

### Dikerjakan 2026-10-28 (sesudah compact): gaya siluet D'Ajiks, 10 soal tinjauan
Gaya siluet = PILIHAN per contoh (`siluet: true`); 31 contoh lama tidak berubah sampai Gusti menyetujui. Tinjauan: `npx tsx src/tiu-generate.ts .test-out-siluet siluet` → `.test-out-siluet/preview.html` (10 butir, kunci A2 B2 C2 D2 E2). Total engine 41 butir lolos, PSI 30/30, mockup mendukung siluet.
Fondasi (tiu-bentuk.ts): `muat` (objek dimuat ke petak menurut kotak pembatas; skala tetap walau diputar), `PETAK` + `NAMA_PETAK` (susunan isi penuh, ukuran beragam), `cekPisah` (objek satu sel tidak boleh menempel), `siluet()` (lepas garis tepi bentuk hitam di SVG keluaran; `draw` modul PSI tidak diubah), `HITAM`, `kuadranDari`. Molekul bersiku baru di POLA: molekul3b/3c/4b/4c/5b/5c.
Per jenis (keluarga bentuk satu per soal):
- BEDA-PUTAR (molekul): ATURAN BARU, susunan diputar + SATU objek dicermin di tempatnya (assert: kunci bukan putar/cermin seluruh gambar).
- BEDA-HITUNG (molekul 1/2/3 bulatan): ATURAN BARU relasional, jumlah molekul 2 bulatan = jumlah molekul 3 bulatan di 4 gambar; tidak ada jumlah tetap; kunci bukan paling gelap/terang.
- BEDA-TUMPUK (molekul garis putih + hitam kecil + hiasan tetes): assert baru, hiasan pojok tidak boleh menempel bentuk tengah.
- SERI-P3 (tinta): NAIK ke dua aturan, selang tiga untuk bentuk + bintik +1 tiap langkah (pengecoh "bintik ikut selang tiga").
- SERI-KUADRAN (molekul), ANA-OBJ (tinta, balik warna + tukar), ANA-UBAH (objek bawah selebar sel, tanpa putar 90°), MTX-PUTAR (sulur + titik pojok), MTX-HITUNG (desain dipertahankan), MTX-GABUNG (baris 3 lengkung).
Temuan cek mata (dipakai ulang):
1. Molekul lurus memanjang/5 bulatan terlihat seperti ranting; pakai 3–4 bulatan bersiku.
2. Bentuk sulur tipis sebagai garis putih jadi kusut; untuk TUMPUK pakai bentuk gemuk.
3. Kelopak satu + pusat menyatu jadi gumpal kacang (MTX-GABUNG baris 3) → baris 3 pakai lengkung.
4. Pembahasan: nama aset (ikalg, molekul3c) tidak boleh ke siswa; dua molekul bisa sama jumlah bulatan → sebut menurut LETAK.
5. Bug lama ANA-OBJ diperbaiki di sumber: kesalahan yang hasilnya "tidak berubah" kini dinamai "objeknya dibiarkan tidak berubah".
Menunggu: kesan Gusti atas halaman tinjauan → bila setuju, terapkan siluet ke semua contoh.

### Putusan Gusti 2026-10-28 atas 10 soal tinjauan siluet
- DISETUJUI: arah visual siluet ("aku suka sih visualnya").
- TIDAK DISETUJUI: FIG-BEDA-PUTAR dan FIG-SERI-KUADRAN. Alasan Gusti: (1) keduanya memakai visual yang sama (keluarga molekul, susunan empat kuadran, bahkan molekul yang sama), terasa berulang; (2) dilihat sekilas polanya sangat mudah ditebak.
- Aturan baru: desain figural selalu memakai pedoman skill impeccable + emil-design-eng; setiap revisi/arah disetujui/tidak disetujui dicatat saat itu juga.
- Usul Claude: (A) anti-identik = catatan ciri tampilan per soal + pemeriksa per paket (keluarga+susunan tidak sama, satu keluarga ≤ 2 soal, bentuk tidak dipakai ulang antarsoal) + susunan beragam + lembar banding; (B) anti-tebak = BEDA-PUTAR tiap objek diputar sendiri-sendiri (tak ada pilihan yang putaran utuh pilihan lain), SERI-KUADRAN tanda tanya di akhir + dua kelompok gerak berperiode beda, uji sekilas piksel (kunci bukan satu-satunya yang tampak lain); (C) papan contoh dulu.
- DISETUJUI Gusti 2026-10-28 ("oke lanjutkan"): usul A–C.

### Dikerjakan 2026-10-28: usul A–C (anti-identik + anti-tebak sekilas)
File baru `src/tiu-fig-siluet.ts`: FIG-BEDA-PUTAR versi siluet (BEDA_PUTAR_S) dan FIG-SERI-KUADRAN versi siluet (SERI_KUADRAN_S); versi siluet pertama keduanya (DITOLAK) DIHAPUS dari engine. Total 41 butir lolos, PSI 30/30, mockup dibangun ulang.
- BEDA-PUTAR baru (nusantara: pucuk, kawung, sulur): letak objek tetap, SETIAP objek diputar sendiri-sendiri di setiap pilihan (≥ 3 arah berbeda per letak); assert: tidak ada pilihan yang = pilihan lain diputar/dicermin utuh; kunci = satu objek bukan terbesar dicermin.
- SERI-KUADRAN baru (alam: daun, tunas, ombak, biji): ? di gambar (5); satu objek diam di kotaknya dan berputar 90° (periode 4), tiga objek bergilir di tiga kotak sisa (periode 3); assert jawaban ≠ gambar terlihat. Pengecoh: salah arah, lupa geser, lupa putar, putar kelebihan, cermin bukan putar, tukar (dua varian supaya susunan pilihan salah tidak kembar tiga).
- BEDA-TUMPUK siluet: aturan BERPASANGAN "hitam di depan ⇔ hiasan sama besar" (2 pilihan salah di depan, 2 di belakang); hiasan = parang; bentuk kecil tertutup ±25%.
- Pemeriksa (tiu-bentuk.ts): `cekSekilas` (kunci tidak boleh > 15% lebih "lain" dari pilihan terjauh berikutnya, ukur beda piksel) + `cekPaket` (keluarga ≤ 2 soal, bentuk tidak dipakai ulang, keluarga+susunan tidak kembar) dijalankan pada mode `siluet`; `keluarga()`, `Ciri`, `ciriDari`, `TEMA` (tiu-aset). Lembar banding: `.test-out-siluet/banding.html`.
- Pembagian keluarga 10 soal: nusantara (BEDA-PUTAR, hiasan TUMPUK), molekul (HITUNG, TUMPUK), sulur (SERI-P3: akantus/kuncup/pita; MTX-PUTAR), alam (SERI-KUADRAN), tinta (ANA-OBJ), pola (ANA-UBAH: bawah ikal3/ikal2), kuas (MTX-HITUNG kecil: koma/kait/zigzag pada mode siluet), gabung (MTX-GABUNG).
Temuan (dipakai ulang):
1. Uji sekilas menangkap BEDA-TUMPUK: hitam di depan selalu tampak sebagai gumpal utuh → kunci "di depan" tertebak. Ciri yang punya tampilan mencolok tidak boleh hanya dimiliki kunci; jadikan aturan berpasangan.
2. Daun dan bulu (alam) terlalu mirip untuk dilacak dalam satu soal; bentuk dalam satu soal harus mudah dibedakan siluetnya.
3. Pengecoh yang memakai kesalahan sama di 3 pilihan membuat susunan kembar tiga → tebak minoritas. Beri varian kesalahan.
4. Pengukur piksel tidak menghitung garis tepi bentuk putih; untuk soal bergaris, cek mata tetap wajib.
Menunggu: kesan Gusti atas papan contoh BEDA-PUTAR + SERI-KUADRAN baru (dan 8 soal lain yang ikut diselaraskan).
- DISETUJUI Gusti 2026-10-28: arah desain 10 sampel ini ("aku setuju dengan arah design sampel ini. pertahankan sudah cukup visualnya"). Visual dipertahankan; berikutnya Gusti meminta perbandingan jujur dengan Al Faiz.

### Perbandingan dengan Al Faiz + target "di atas Al Faiz" (2026-10-28)
Penilaian Claude (belum diukur ke peserta): Al Faiz ±7,5, D'Ajiks ±6. Kita unggul di logika (8 vs 6) dan pembahasan (8 vs 5); kalah di kekayaan gambar (6 vs 8), keragaman (5 vs 8), kesiapan pakai (3 vs 9); kesulitan kita belum terbukti.
Gusti: "aku mau di atas al faiz" → minta pendekatan yang realistis. Usul Claude (MENUNGGU PUTUSAN):
1. Keragaman lewat bentuk berparameter (kode, tak terbatas) + guratan putih prosedural; tidak mengejar satwa berdetail (sudah terbukti gagal lewat Codex).
2. Daftar bentuk terpakai lintas paket + pemeriksa (tidak ada bentuk berulang dalam 3 paket).
3. Produksi 3 paket figural (9 soal/paket sesuai blueprint 57–65) dengan lembar banding.
4. Ekspor CAT/PDF + cek tampilan lebar HP.
5. Uji siswa (oleh Gusti) + uji buta tampilan; Claude menyiapkan lembar dan analisis.
Ukuran "di atas Al Faiz": 0 soal cacat; pembahasan per pilihan; 0 bentuk berulang dalam 3 paket; tingkat benar siswa 30–60% dan tiap pilihan salah dipilih ≥ 5%; uji buta tampilan ≥ 50% memilih D'Ajiks.
- DISETUJUI Gusti 2026-10-29 ("oke aku setuju kerjakan"): langkah 1–5. Mulai langkah 1.

### Langkah 1 selesai 2026-10-29: keluarga bentuk berparameter + guratan putih
- Keluarga baru (tiu-pola.ts): tunas berbuku, sabit bergerigi, pita berpilin, rantai bersiku, ikal kembar (+ molekul lama). Nama "<keluarga><n>-<varian>[u]" (mis. tunas5-3u) dibuat saat diminta lewat `BENTUK` (Proxy) di tiu-bentuk.ts, diseragamkan ke kotak ±40, langsung diuji kiral + beda putar/cermin ≥ 0,3; `varian(keluarga, n, jumlah)` mencari varian lolos berikutnya. Lolos uji 87–100% per keluarga.
- Guratan putih: isi baru "u" (putih tanpa garis tepi) di figural-lib.ts (keluaran PSI tidak berubah, 30/30); hanya untuk petak ≥ 36 (assert di `tata`).
- Pemeriksa baru: `tebal()` (balik warna hanya untuk bentuk gemuk, ketebalan ≥ 0,2) dan `cekBedaObjek()` (objek yang dilacak dalam satu soal kemiripannya ≥ 0,3), dipasang di BEDA-PUTAR, SERI-KUADRAN, ANA-OBJ, SERI-P3 versi siluet.
- Halaman tinjauan: `.test-out-siluet/pola-baru.html`; galeri juga di mockup (nama bisa langsung dipakai di spesifikasi).
Temuan cek mata (dipakai ulang):
1. Ikal kembar dan tunas = paling setara Al Faiz; sabit bagus sebagai objek tunggal/hitung gerigi, BUKAN untuk dilacak berempat (kemiripan 0,19).
2. Pita tipis dibalik warna → garis kusut; ukuran ketebalan (sisa tinta setelah tepi dikikis 4 satuan) memisahkan tipis (0,00–0,16) dari gemuk (0,5–0,6).
3. Pita versi pertama kaku (lipatan tajam + lebar); rantai versi pertama gumpal (manik besar) → disetel.
4. Variasi dalam satu keluarga halus; keragaman antarpaket harus dari pergantian keluarga, bukan hanya varian.
Berikut: langkah 2 (daftar bentuk lintas paket + pemeriksa 3 paket terakhir).
- DISETUJUI Gusti 2026-10-29: keluarga bentuk baru langkah 1 ("sudah cukup bagus"); keluarga yang dipakai: tunas, sabit, pita, rantai, ikal kembar, molekul (+ aset tetap alam, nusantara, kuas, tinta, sulur). Target Gusti: 50 paket SKD sampai akhir 2026 (±450 soal figural) → Gusti bertanya apakah keluarga perlu diperbanyak.

### Langkah 1b (putusan Gusti 2026-10-29): keluarga memadai untuk 3 paket dulu
Gusti: "target buat keluarga yang memadai tiap paket agar tidak terkesan berulang ... buat visual keluarga sebaik mungkin untuk 3 paket soal terlebih dahulu". Belum produksi soal paket.
Rencana Claude (checkpoint):
1. +6 keluarga berparameter bercita rasa nusantara (pembeda dari bimbel lain, bukan motif Al Faiz), semuanya punya angka bawaan untuk soal hitung: awan mega mendung (n lapis), keris (n luk), padi (n bulir), ranting (n cabang), kerang (n rusuk), ombak (n gulungan).
2. Soal hitung bergilir keluarga: pusat MTX-HITUNG, objek hitung ANA-UBAH, butir BEDA-HITUNG bisa memakai keluarga lain (bukan hanya gumpal/lekuk/bintang/molekul).
3. MTX-GABUNG +2 keluarga bagian (sinar, ranting).
4. Peta keluarga 3 paket: tiap paket punya palet keluarga sendiri, tumpang tindih antarpaket minimal; papan visual per paket untuk Gusti.
Status: dikerjakan mulai 2026-10-29.
Progres 1b (checkpoint):
- [x] 6 keluarga baru di tiu-pola.ts + terdaftar di nama berparameter (awan, keris, padi, ranting, kerang, gulung). Cek mata: keris + ranting sangat bagus; kerang bagus setelah dibuat miring (beda 0,43–0,52); gulung layak untuk 2–3 gulungan (4 terlalu padat); awan berlapis menuju ikal (garis halus → objek besar saja); padi layak tapi paling lemah. Versi pertama awan (kontur), padi (kurus), kerang (simetris 0,20), gulung (gumpal) ditolak cek mata.
- [x] Keluarga hitung bergilir: `HITUNG_JENIS` + `buatHitung` (keris, ranting, kerang, tunas, awan, rantai; sabit/padi tidak), MTX-HITUNG `pusat` + `kecilBentuk`, ANA-UBAH jenis hitung apa pun, BEDA-HITUNG `butir` + `namaButir`. Rantai kini melempar galat bila jalur buntu (jumlah manik pas). Cek mata: keris luk sulit dihitung pasti di sel kecil → pusat hitung pakai ranting/kerang; keris sebagai objek besar.
- [x] MTX-GABUNG + bagian sinar (ujung bulat, jangkauan ≤ 44 setelah versi pertama menembus bingkai) dan ranting.
- [x] `src/tiu-peta-paket.ts` = peta keluarga 3 paket + papan `.test-out-siluet/peta-3-paket.html`; diperiksa: cekPaket per paket, cekBedaObjek untuk objek lacak, nama bentuk unik antarpaket.
- Ukur kemiripan varian (4 anggota): bisa lacak = pita .76, awan .67, ranting .64, tunas .61, rantai .52, padi .50, keris .30; tidak = kerang .25, gulung .27, ikal kembar, sabit .25 (pakai sebagai objek tunggal/hitung/hiasan).
- Temuan: ukuran kemiripan tidak bisa dipercaya untuk bentuk TIPIS (padi: mesin ≥ 0,3, mata = kembar) → cek mata penentu; awan sebagai tiga objek seri terlalu seragam.
- MASALAH TERBUKA: keluarga baru habis terbagi ke Paket 2 → Paket 3 berbagi 7 keluarga dengan Paket 2. Rencana: +3 keluarga gemuk mudah-lacak khusus Paket 3 (teratai, batu bersusun, sayap berbulu), lalu susun ulang Paket 3.
- [x] +3 keluarga (teratai, batu, sayap) di tiu-pola.ts + HITUNG_JENIS. Cek mata: teratai bagus tapi antar-varian mirip (0,15) → objek tunggal/hitung saja; batu versi 2 (bulat, miring) layak lacak (0,45); sayap versi 2 masih seperti sisir → hanya objek hitung bulu/butir. Versi 1 batu (pipih) dan sayap (blok) ditolak.
- [x] PETA 3 PAKET SELESAI (tiu-peta-paket.ts, papan .test-out-siluet/peta-3-paket.html): P1 = 10 sampel disetujui (nusantara, molekul, sulur, alam, tinta, pola, kuas/gumpal); P2 = laut dan tumbuhan (ikal kembar, kerang, pita, tunas, rantai, sabit, gulung); P3 = taman batu dan pusaka (ranting, batu, molekul, keris, teratai, sayap, awan). Tumpang tindih keluarga: P1–P2 tidak ada, P2–P3 tidak ada, P1–P3 molekul + hiasan parang. Lolos cekPaket, cekBedaObjek, nama unik antarpaket.
- PELAJARAN KUAT (2× terbukti): bentuk TIPIS (padi, keris) menipu ukuran kemiripan piksel — mesin ≥ 0,3 tetapi mata melihat kembar. Objek lacak WAJIB bentuk gemuk; keris/padi hanya objek tunggal/hitung/kecil.
- Teratai/kerang/gulung/ikal kembar/sabit: antar-varian mirip → objek tunggal, hitung, butir, hiasan; bukan lacak.
Berikut: Gusti meninjau peta 3 paket → bila setuju, langkah 2 (daftar lintas paket di engine) lalu langkah 3 produksi 3 paket mengikuti PETA.
- Gusti 2026-10-29: "keren claude, kita keep dulu ya besok kita lanjutkan lagi" → peta 3 paket DITERIMA dan DISIMPAN; sesi berikut lanjut langkah 2–3 (pakai prompt siap tempel terbaru).

### Langkah 2–3 (perintah Gusti 2026-10-29): daftar lintas paket + produksi 3 paket
Gusti: peta keluarga 3 paket "diterima"; lanjut langkah 2 dan 3 (produksi 3 paket mengikuti src/tiu-peta-paket.ts, cek mata, lembar banding per paket).
Rencana: `src/tiu-paket.ts` = spesifikasi 9 soal/paket (urutan Al Faiz 57–65: seri 2, analogi 2, beda 2, matriks 3); Paket 1 = 9 sampel siluet yang disetujui (tanpa BEDA-TUMPUK, yang pindah ke Paket 3); CLI `tiu-generate.ts <out> paket` → per paket items.json + preview + banding + pemeriksa lintas paket (nama bentuk tidak berulang dalam 3 paket) + daftar-bentuk.json.
Progres 2026-10-29:
- [x] Langkah 2: `cekLintas` (tiu-paket.ts) = nama bentuk tidak berulang dalam 3 paket berturut-turut + jenis soal sesuai PETA + keluarga hanya dari palet peta; keluaran `daftar-bentuk.json` (no, jenis, kunci, keluarga, susunan, bentuk per paket).
- [x] Langkah 3: `npx tsx src/tiu-generate.ts .test-out-paket paket` → `.test-out-paket/paket-{1,2,3}/` (items.json, preview.html, banding.html, img/). 27 soal, semua tier 3, lolos kunci tunggal + uji sekilas + cekPaket + cekLintas. Kunci per paket: P1 A E C B C D A B D · P2 B D A E C B E A D · P3 C E D B A C B E A (total A6 B6 C5 D5 E5). Regresi: PSI 30/30, 41 contoh lama, 10 sampel siluet, mockup OK.
- Cek mata 18 soal baru (P1 = sampel yang sudah disetujui): 9 cacat ditemukan dan diperbaiki (pelajaran 1–9 di references/tiu.md "Pelajaran produksi 3 paket figural").
- Perubahan engine: `awal` di MtxPutar; butir berparameter BEDA-HITUNG tanpa putar 90°; bentuk kecil TUMPUK siluet hitam polos; ciri ANA-UBAH mencatat keluarga hitung; jebakan ANA-UBAH memakai nama bagian dari data.
- PENYIMPANGAN DARI PETA (wajib dilaporkan ke Gusti): P2 TUMPUK hiasan gulung → ikal kembar; P3 BEDA-HITUNG butir batu → keris (teratai, sayap, keris); P3 MTX-HITUNG objek kecil keris → batu dua bulir; P3 MTX-PUTAR keris → awan; P2 MTX-GABUNG urutan baris kelopak, sinar, lengkung. PETA di tiu-peta-paket.ts sudah disesuaikan; tumpang tindih keluarga antarpaket tetap P1–P2 tidak ada, P2–P3 tidak ada.
- Temuan terbuka (menunggu putusan Gusti): P2 no. 59 (analogi) dan 64 (matriks hitung) sama-sama rantai manik persegi, rupa mirip; P3 no. 60 dan 63 sama-sama awan berlapis. Lolos aturan ≤ 2, tetapi terasa berulang di lembar banding.
- Gusti 2026-10-29: rantai P2 59/64 dan awan P3 60/63 "seharusnya aman" → DIBIARKAN. Penilaian Claude: bukan cacat logika maupun keterbacaan, hanya pengulangan rupa ringan; catatan kecil: awan berlapis bergaya garis, kurang senada dengan siluet hitam pekat (MTX-PUTAR P3 seluruhnya awan).
- Umpan balik pertama 2026-10-29 (tangkapan WA dari Gusti): murid sampel "baguss ... enak dipakai buat latihan, karena pas SKD dan psiko kemarin tidak sesusah ini jadi lebih gampang kerjanya"; Pak Badrun "Ngeri juga visual gambarnya ... Iya aman2. Sy sudah baca. Terpola ji". Gusti: target rilis 3 TO pertama dulu.
  Tafsir Claude: kesan baik, logika terbaca berpola (bukan tebakan); murid menilai lebih sulit dari ujian asli. Ini kesan, belum data: tingkat benar per soal dan sebaran pilihan salah belum diukur (ukuran langkah 5: benar 30–60%, tiap pilihan salah ≥ 5%). Bila nanti terbukti jauh di bawah 30%, kurangi satu aturan pada sebagian soal per paket.
- PUTUSAN Gusti 2026-10-29: langkah 4 (ekspor CAT/PDF + cek HP) DITUNDA; dirancang nanti bersama soal TO dan infrastruktur web. Fokus sekarang: menyiapkan soal untuk 3 TO pertama.
- Berikut: kesan Gusti atas 3 paket → langkah 4 (ekspor CAT/PDF + cek lebar HP).


## Berikut (lama)
- Gusti pilih arah gaya → buat prototipe 2–3 soal gaya baru → setujui → terapkan ke semua jenis.
- Belum: ekspor ke aplikasi CAT/PDF, variasi bentuk organik (gaya siluet Al Faiz), level kesulitan per paket.

## Prompt siap tempel (sesi berikut)
TERBARU 2026-10-29 (sesudah produksi 3 paket): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Langkah 2–3'. Kesan saya atas 3 paket figural (.test-out-paket/paket-N/preview.html + banding.html): <isi>. Rantai P2 no. 59/64 dan awan P3 no. 60/63: <biarkan / ganti>. Lanjut langkah 4 (ekspor CAT/PDF + cek lebar HP)."
TERBARU 2026-10-29 (sesudah peta 3 paket): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Langkah 1b'. Kesan saya atas peta keluarga 3 paket: <isi>. Lanjut langkah 2 dan 3: produksi 3 paket figural mengikuti src/tiu-peta-paket.ts, cek mata, lembar banding per paket."
TERBARU 2026-10-29 (sesudah langkah 1): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Langkah 1 selesai'. Kesan saya atas keluarga bentuk baru: <isi>. Lanjut langkah 2 (daftar bentuk lintas paket)."
TERBARU 2026-10-28 (sesudah usul A–C): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'usul A–C'. Kesan saya atas BEDA-PUTAR dan SERI-KUADRAN baru: <isi>. <Terapkan gaya siluet ke semua contoh / perbaiki dulu>."
TERBARU 2026-10-28 (sesudah tinjauan siluet): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'gaya siluet D'Ajiks, 10 soal tinjauan'. Kesan saya atas 10 soal: <isi>. <Terapkan ke semua contoh / perbaiki dulu>."
TERBARU 2026-10-28 (gaya siluet): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'tampilan setara Al Faiz'. Terapkan spesifikasi gaya siluet D'Ajiks di k12-spatial-engine src/tiu-*.ts, buat 1 soal terbaik per jenis (10 jenis), tingkat sulit, pakai aset yang ada atau Codex bila perlu, cek mata, lalu buka halaman tinjauannya untuk saya. Koreksi juga tabel figural engine v0.4 (seri 2 · analogi 2 · beda 2 · matriks 3)."
TERBARU 2026-10-28 (sesudah audit mudah ketebak): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Audit mudah ketebak'. Keputusan saya: <naikkan 008 ke dua aturan / biarkan>, <usulan anti-tebak masuk Pilar 4: ya/tidak>."
TERBARU 2026-10-28 (sesudah ANA-UBAH + MTX-GABUNG): "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Dikerjakan 2026-10-28 (sesi lanjutan)'. Kesan saya atas FIG-ANA-UBAH dan FIG-MTX-GABUNG: <isi>. Usulan aturan 'ciri kunci wajib dimiliki minimal satu pengecoh' ke Pilar 4: <setuju/tidak>."
TERBARU 2026-10-28: "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Pembahasan resmi + contoh tambahan 2'. Bangun FIG-ANA-UBAH (analogi objek berparameter: lekuk/cabang ±k, geser, cermin, tukar) dan FIG-MTX-GABUNG (gabung kolom 1+2, ujung lancip→tumpul) di k12-spatial-engine src/tiu-*.ts, dengan bukti kunci tunggal + pengecoh bernama, cek mata, lalu tunjukkan ke saya. Contoh 4 dibuang; contoh 1 dan 7 belum dibangun."
Terbaru: "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'masih kaku/mati'. MTX-HITUNG dipertahankan. Kesan saya atas penyesuaian 1 (arsir + objek besar-kecil): <isi>. Lanjutkan penyesuaian di k12-spatial-engine src/tiu-*.ts, cek mata, tunjukkan sebelum dianggap final."
Lama: "Lanjutkan engine soal gambar TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md (status, logika penyusun Al Faiz 59/62/64/65, masukan gaya). Arah gaya yang saya pilih: <isi>. Buat prototipe 2–3 soal gaya baru di BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/k12-spatial-engine (modul src/tiu-*.ts), cek mata, lalu tunjukkan ke saya sebelum diterapkan ke semua jenis. Boleh pakai codex CLI untuk aset aksen."

- 2026-11-04 · Putusan Gusti (T6-9 handbook): cek bocor bentuk figural (6 uji, k12-spatial-engine/src/tiu-handbook.ts) WAJIB untuk paket TO 4 dst. Paket TO 1–3 tidak diubah walau 5 soal tertangkap (P1 64, P2 57, P2 62, P3 57, P3 65).

### 2026-11-08 · Rupa figural "searah Al Faiz, tidak identik" — prototipe 1 soal
- Bukti: 2 alumni lulus IPDN 2026 membenarkan figural SKD 2026 mirip Al Faiz Paket 41 no. 57–65.
- Gusti: rupa paket kita (siluet abstrak kecil, hitam polos, banyak ruang kosong) belum searah; ingin searah tapi tidak identik.
- Selisih yang dicatat: Al Faiz = satu tema benda dikenali per soal, objek memenuhi kotak, tekstur campur (hitam pekat, garis ganda, kisi, arsiran, bintik), guratan spidol tebal.
- Prototipe: SERI-KUADRAN tema bahari (kapal, ikan bersisik kisi, ombak garis ganda, bintang laut berbintik), aset dari codex (SVG 100×100). Logika = seriKuadranS. Pengecoh diseimbangkan: tiap susunan/arah kapal muncul ≤ 2× (kunci bukan "yang paling sering"). File: scratchpad sesi (proto/susun.cjs, prototipe.html, desk.png, hp.png) — belum masuk engine.
- Catatan teknis: `codex exec` wajib `< /dev/null`, kalau tidak macet "Reading additional input from stdin".
- MENUNGGU penilaian Gusti atas prototipe.
- Gusti 2026-11-08: rupa & model DISETUJUI ("jauh lebih bagus"); tingkat kesulitan v1 "masih sangat mudah ditebak" (hanya 1 objek berubah, pola giliran langsung terlihat).
- v2 (sulit): 5 gambar + "?" ke-6; tiap objek punya aturan sendiri — kapal diam putar 90° searah; ikan/ombak/bintang laut bergilir searah melompati kapal; bintang laut juga putar 90° BERLAWANAN arah; ikan cermin kiri-kanan bolak-balik; ombak isi berganti garis ganda ↔ pekat. Kunci tidak sama dengan gambar mana pun (periode 3/4/2 tidak reset di langkah 6).
- Pengecoh dipilih brute force dari kekeliruan bernama (1–3 kesalahan per pengecoh) dengan syarat: tiap ciri menggugurkan ≤ 3 pengecoh (perlu ≥ 2 ciri untuk sampai kunci); ≥ 2 ciri yang nilai kuncinya bukan terbanyak (tebak "nilai paling sering" gagal); antar-pengecoh beda ≥ 2 ciri (tidak ada kelompok hampir kembar). Pelajaran: syarat "kunci bukan terbanyak" mustahil bila pengecoh hanya boleh salah ≤ 2 ciri.
- Tampilan HP: deret 6 gambar dibuat 3×2 di layar ≤ 560 px.
- MENUNGGU penilaian Gusti atas v2.
- Gusti 2026-11-08 atas v2: masih mudah — cukup pindai SATU objek (kapal, putaran mudah dilacak) lalu di opsi hanya tersisa 2 calon. PELAJARAN: ciri yang terlihat sekilas (objek besar/menonjol, posisi) tidak boleh jadi penyaring; pengecoh harus BENAR di ciri mudah dan SALAH di ciri halus.
- v3: kapal putaran bertambah 45° tiap langkah (+45, +90, +135, +180 → +225); syarat pengecoh: posisi & kapal masing-masing menggugurkan ≤ 1 pengecoh (4 dari 5 opsi sama), ciri halus (arah putar bintang laut, cermin ikan, isi ombak) ≤ 3, ≥ 2 ciri yang nilai kuncinya bukan terbanyak, antar-pengecoh beda ≥ 2 ciri. Hasil: pemeriksaan satu ciri mana pun menyisakan ≥ 2 opsi; perlu ≥ 2 ciri halus untuk sampai kunci D. Pengecoh boleh salah 3 ciri (dengan ≤ 2 mustahil memenuhi syarat).
- MENUNGGU penilaian Gusti atas v3.
- PUTUSAN Gusti 2026-11-08 (sesudah v3): pembahasan to the point, kunci di awal; TANPA bagian "Analogi" dan "Kekeliruan yang mungkin terjadi". Semua aturan sesi ini (rupa bertema bertekstur, kesulitan v3, gaya pembahasan) DITERAPKAN ke 3 paket figural yang sudah ada (P1–P3, 27 soal) — membatalkan putusan 2026-11-04 "P1–P3 tidak diubah". Cakupan aturan pembahasan (figural saja / semua subtes) ditanyakan ke Gusti.
- Gusti 2026-11-08: aturan pembahasan berlaku SEMUA subtes → CLAUDE.md, memory.md, SKILL.md, aturan-tetap C-1/C-3 diperbarui (asli + salinan repo); LOG kontributor diisi. Skill global dajiks-handbook (wording.md, template bab01) masih memuat "Kekeliruan yang Mungkin Terjadi" — lintas proyek, BELUM diubah, tanyakan Gusti.
- Prototipe disimpan permanen: `k12-spatial-engine/prototipe-bahari/` (aset codex 4 SVG, susun.cjs v3 = logika + pemilih pengecoh brute force, prototipe.html, desk.png, hp.png, prompt.txt codex).

### RENCANA kerja ulang Paket figural 1–3 (mulai sesi berikut)
1. Mesin: aset engine (`tiu-aset.ts`) berupa primitif poligon fill b/w → tekstur (kisi, arsiran, bintik, garis ganda) bisa dinyatakan sebagai primitif putih di atas hitam, sehingga `sig`/cek kunci tunggal tetap jalan. Putuskan: (a) aset codex SVG dikonversi ke primitif, atau (b) lapisan render SVG terpisah + tanda tangan dari parameter. Saran: (b) — lebih cepat, aset codex dipakai apa adanya; kunci dibuktikan dari parameter (seperti susun.cjs).
2. Peta tema: 27 soal × 1 tema benda (3–4 motif bertekstur campur), tema tidak berulang dalam 3 paket; hindari tema Al Faiz (antariksa, not balok, bola dunia, pelangi-mahkota, bunga di bola berkisi). Tanpa lambang negara/lembaga/simbol bermuatan.
3. Aturan kesulitan v3 per jenis (9 jenis): ciri menonjol menggugurkan ≤ 1 pengecoh; pembeda di ciri halus; tebak "nilai terbanyak" gagal; antar-pengecoh beda ≥ 2 ciri; kunci ≠ gambar terlihat.
4. Pembahasan gaya baru (kunci di awal, to the point, tanpa analogi/kekeliruan).
5. Per paket: generate → cek mata (komputer + HP) → tangkapan layar ke Gusti → paket berikut. Kunci A–E seimbang.
Prompt siap tempel: "Lanjutkan kerja ulang paket figural TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 2026-11-08 dan RENCANA kerja ulang. Prototipe acuan: k12-spatial-engine/prototipe-bahari/. Mulai langkah 1 (putuskan cara aset bertekstur masuk mesin) lalu Paket 1."

### Kerja ulang 2026-11-08 (sesi lanjutan) — langkah 1 diputuskan
- Langkah 1 = (b): modul baru `src/tiu-tema.ts` (render SVG bertema dari aset codex apa adanya, `aset-tema/<tema>/*.svg`); keadaan soal = parameter, kunci tunggal + pengecoh dipilih brute force dari parameter (pemilih umum dari susun.cjs). Pengganti `sig` piksel: pemeriksa raster puppeteer (dari root) — tiap aset beda ≥ ambang bila diputar/dicermin, supaya pengecoh putar/cermin tidak kembar dengan kunci secara rupa. Engine Fig lama tidak diubah.
- Peta tema Paket 1 (Claude, belum diputus Gusti): 57 SERI-KUADRAN bahari (prototipe) · 58 SERI-P3 dapur · 59 ANA-UBAH kebun · 60 ANA-OBJ satwa hutan · 61 BEDA-HITUNG pasar buah · 62 BEDA-PUTAR alat sekolah · 63 MTX-PUTAR cuaca · 64 MTX-HITUNG serangga · 65 MTX-GABUNG rumah kampung. Hindari musik/not balok (tema Al Faiz).
- [x] Mesin bertema dibangun: `src/tiu-tema.ts` (aset, taruh/pose, deret/matriks/analogi, `pilihPengecoh` = aturan v3 umum dari susun.cjs, `bahas` = pembahasan gaya baru, `TemaDraft` dengan optSvgs), `src/tiu-tema-jenis.ts` (jenis bertema + `PAKET_TEMA`), `src/tiu-tema-cek.ts` (raster puppeteer: aset objek besar beda putar/cermin ≥ 0,3; `--foto` = tangkapan desk + HP). CLI: `npx tsx src/tiu-generate.ts .test-out-tema tema`. Aset di `aset-tema/<tema>/` (bahari disalin + ombak-pekat.svg).
- [x] P1 no. 57 = SERI-KUADRAN bahari diport, lolos v3, aset bahari lolos raster (0,52–0,78). Tangkapan: .test-out-tema/paket-1/preview-{desk,hp}.png.
- TERHENTI: `codex exec --full-auto` ditolak pengaman izin Claude Code (agen otonom). Prompt 35 aset Paket 1 siap di `aset-tema/prompt-paket1.txt` (dapur, kebun, satwa, buah, sekolah, cuaca, serangga, kampung). Menunggu Gusti: izinkan codex / jalankan sendiri / Claude menggambar SVG manual.
- Rancangan logika 8 jenis lain (belum ditulis): 58 SERI-P3 dapur (teko/wajan/cangkir selang tiga putar 90° kiri + hitung biji kopi + sendok cermin bolak-balik); 59 ANA-UBAH kebun (gugus wortel ±Δ, cabai ±Δ, tukar atas, sekop cermin); 60 ANA-OBJ satwa (putar/cermin per objek + siput pekat↔garis + tukar); 61 BEDA-HITUNG buah (apel = pisang di 4 opsi, manggis acak; assert ciri sederhana lain tidak menyendirikan opsi beda); 62 BEDA-PUTAR sekolah (sepatu/tas/botol diputar acak, satu objek kecil dicermin); 63 MTX-PUTAR cuaca (kolom1→2 putar 90°, 2→3 cermin ab, tetes pindah pojok + isi berganti); 64 MTX-HITUNG serangga (kupu/kumbang/daun +1 per kolom); 65 MTX-GABUNG kampung (ornamen pojok kolom3 = gabungan kolom1+2, bangunan tengah kolom3 = kolom2 versi garis).
- Gusti 2026-11-08: "catat semua ... dan buat soal lanjutannya" (izin codex tidak dijawab) → cara 3: Claude menggambar aset lewat kode `aset-tema/gambar.py` (fungsi per tema, helper arsir/kisi/bintik; `python3 aset-tema/gambar.py <tema>`). Bila Gusti kelak mengizinkan codex, aset boleh diganti tanpa mengubah logika soal (nama file sama).
- [x] P1 no. 58 = SERI-P3 dapur (`seriP3T`, spesifikasi `DAPUR`, kunci B): teko/wajan/cangkir selang tiga putar 90° berlawanan; biji kopi +1 (letak acak); sendok pindah pojok searah + cermin bolak-balik. Ciri mudah = jenis benda, pojok sendok. Aset dapur lolos raster 0,41–0,58. Cek mata OK sesudah objek besar 112→144 (sel 200), sendok 54, biji kopi 22.
- Pelajaran: (1) objek besar ≥ 70% sisi sel, kalau tidak rupa kembali "banyak ruang kosong"; (2) tsx menyisipkan `__name` ke fungsi yang dikirim ke puppeteer → `page.evaluate("window.__name=(f)=>f")` dulu.
- BERIKUT: no. 59 ANA-UBAH kebun → 60 → … → 65 (rancangan di atas), satu soal per tahap: gambar aset (gambar.py) → raster cek → jenis di tiu-tema-jenis.ts → generate → foto → cek mata. Kunci sejauh ini: 57 D, 58 B → sisa A C E seimbang. Sesudah 9 soal: foto desk + HP ke Gusti.
- Prompt siap tempel: "Lanjutkan kerja ulang paket figural TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Kerja ulang 2026-11-08 (sesi lanjutan)'. Lanjut Paket 1 no. 59 (ANA-UBAH kebun) sampai 65, aset digambar lewat aset-tema/gambar.py."

### Pelajari ulang Al Faiz Paket 41 no. 57, 64, 65 (bahan Gusti 2026-11-08)
Disimpan: `BIG DATA/REFERENSI LUAR/AL FAIZ TIU 2026-11-08/` (57 soal + pembahasan, 64 soal + pembahasan, 65 soal).
- **No. 57 (seri 5 gambar → gambar ke-6, kunci E)** — JENIS BELUM ADA DI MESIN. Dua aturan: (a) warna bergantian: latar bola berkisi hitam + objek putih ↔ latar putih + objek hitam; (b) SIFAT BERSAMA, bukan transformasi: bentuk tengah berganti-ganti (bintang cekung, silang, semanggi, …) tetapi selalu "empat lengkungan tersusun simetris". Kunci = latar putih + objek hitam + empat lengkung. Pengecoh: A hati (warna benar, sifat salah), B bulan sabit (dua-duanya salah), C bunga LIMA kelopak (warna benar, salah hitung — jebakan terkuat), D empat kelopak putih di latar hitam (sifat benar, warna salah). Kunci boleh mirip gambar soal (E ≈ (4)). Kode usul: FIG-SERI-SIFAT.
- **No. 64 (matriks hitung, kunci B)** — sudah ada (FIG-MTX-HITUNG), cocok dengan pembahasan resmi: cabang bergelombang gambar tengah +1 tiap kolom; objek kecil di pinggir +1 tiap kolom, "tidak memperhitungkan bentuk dan tempat". Jawaban 7 cabang + 8 objek kecil.
- **No. 65 (matriks, kunci A)** — gambar ini = POLA GESER (tiga kelompok: daun kembar + batang, mahkota kembar + rantai, pelangi kembar + tiga garis; tiap baris memuat ketiganya sekali, bergeser satu kolom tiap baris; benda kecil berpindah sisi/dicermin). JENIS BELUM ADA. Catatan: "no. 65" dengan pembahasan resmi gabung (contoh 5, 2026-10-28) adalah soal lain — FIG-MTX-GABUNG tetap sah. Kode usul: FIG-MTX-GESER, perubahan tambahan wajib berlaku sama di semua baris (jangan tiru "satu baris berubah sendiri").
- **Cara Al Faiz membahas:** sebut jenis aturannya dulu ("perhatikan pola warna…", "perhatikan pola bentuknya…", "setiap baris harus memiliki…"), satu kalimat per aturan, sebut tegas yang TIDAK dihitung ("tidak memperhitungkan bentuk dan tempat"), tampilkan gambar jawaban, tutup "Jawaban: X". Tidak membahas tiap opsi. Ambil untuk gaya kita (tetap kunci di awal + alasan tiap opsi gugur, putusan Gusti): (1) tiap langkah diawali nama aturannya (pola warna / pola bentuk / pola jumlah / pola letak); (2) sebut yang diabaikan; (3) gambar jawaban ditampilkan di pembahasan.
- Cakupan Paket 41 no. 57–65 di mesin: 57 BELUM · 58 ada (SERI-KUADRAN) · 59–60 ada · 61–62 ada · 63 ada · 64 ada · 65 (gambar ini) BELUM. SERI-P3 (Part 39) dan MTX-GABUNG (contoh 5) bukan bagian Paket 41 no. 57–65.

### Pelajari ulang (2) Al Faiz Paket 41 no. 62 + 65 dengan pembahasan resmi (Gusti 2026-11-08: "kemarin belum maksimal")
Bahan: `REFERENSI LUAR/AL FAIZ TIU 2026-11-08/paket41-62-*.png`, `paket41-65-soal-opsi.png`, `paket41-65-pembahasan.png`.

**No. 65 — KOREKSI analisis 2026-10-28 (dulu dicap "cacat B-15, jangan ditiru"; itu SALAH).**
- Tiga kelompok (dilingkari merah/kuning/hijau di pembahasan): merah = dua daun-panah + batang; kuning = dua mahkota + rantai; hijau = dua pelangi + tiga garis. Tiap baris memuat ketiganya sekali; urutan bergeser: baris 1 M-K-H, baris 2 K-H-M, baris 3 H-?-K → "?" = merah.
- Perubahan: tiap KELOMPOK muncul 3 kali, 2 kali tetap dan 1 kali berubah. Berubah = benda atas dibalik atas-bawah (Al Faiz: "pencerminan horizontal") DAN benda kecil kiri pindah ke kanan lalu dicermin kiri-kanan ("vertikal"). Hijau berubah di baris 1 kolom 3, kuning di baris 2 kolom 1, merah belum pernah → harus berubah di "?" (baris 3 kolom 2).
- Sel yang berubah (1,3), (2,1), (3,2) juga tersebar satu per baris dan satu per kolom. Aturannya KONSISTEN, hanya dirumuskan longgar di pembahasan resmi ("dari 3 baris, 2 baris tetap, 1 baris berubah" = per kelompok, bukan per baris).
- Opsi (semua kelompok merah — jenis benda TIDAK menyaring): A kunci (atas terbalik, bawah tegak, batang kanan); B batang tetap kiri (lupa pindah); C bawah ikut dibalik + batang kiri; D atas tidak dibalik (batang sudah kanan); E bawah ikut dibalik. Tiga ciri: atas dibalik (4/5 benar), bawah tegak (3/5), batang kanan (3/5) → kunci Al Faiz = nilai terbanyak di tiap ciri (tebak mayoritas BERHASIL). Versi kita wajib menolak ini (aturan v3).
- Jenis D'Ajiks: FIG-MTX-GESER = tiga kelompok bergeser satu kolom per baris + tiap kelompok berubah tepat sekali, sel berubah tersebar satu per baris dan per kolom; perubahan = dua aksi pada dua benda (balik benda atas + pindah-cermin benda kecil). Pengecoh = satu aksi terlewat / aksi diterapkan ke benda yang salah / lupa bahwa kelompok ini belum berubah (pilihan "tetap").

**No. 62 — gambar berbeda, kunci D.**
- Tiap opsi: bentuk tengah berpasangan (besar garis putih + kecil hitam, bentuk sama: bintang, bintang empat, silang, hati, bulan) + dua hiasan daun di dua pojok berseberangan (sebagian terpotong bingkai).
- Ciri 1: hiasan pojok beda ukuran di A, B, C, E; SAMA ukuran di D. Ciri 2: hitam kecil di BELAKANG putih besar di A, B, C, E; di DEPAN di D. D berbeda di DUA ciri sekaligus (petunjuk ganda).
- Pengalih: bentuk tengah beda semua; pojok hiasan berganti (kanan atas + kiri bawah vs kiri atas + kanan bawah; D berbagi pojok dengan B); letak hitam kecil berganti. Tidak ada pengalih yang menyendirikan opsi lain.
- KOREKSI atribusi: tabel awal log menyebut FIG-BEDA-PUTAR dari "Paket 41 no. 62" — salah; no. 62 = BEDA-TUMPUK. BEDA-PUTAR bukan bagian Paket 41 no. 57–65. Versi siluet kita (Paket 2–3) memakai aturan PASANGAN (depan ↔ sama besar), lebih sulit dari Al Faiz; tetap sah, tetapi jenis Paket 41 yang asli = dua ciri sama-sama menyendirikan kunci.

**Cara Al Faiz membahas (no. 62, 65):**
- Gambar pembahasan DIANOTASI: lingkaran merah pada ciri penentu (62), lingkaran warna per kelompok + lingkaran biru pada benda yang berubah (65), lalu gambar jawaban.
- 62: satu paragraf "A, B, C, E memiliki …; hanya D yang …", dua ciri disebut lengkap. 65: kalimat aturan baris + dua poin aturan + "Sehingga, opsi yang tepat …" + gambar + "Jawaban: A".
- Istilah "cermin horizontal/vertikal" Al Faiz ambigu (horizontal = dibalik atas-bawah). Kita tulis "dibalik atas-bawah" / "dicermin kiri-kanan".
- Untuk mesin bertema: tambah gambar pembahasan beranotasi (lingkaran warna pada kelompok + penanda benda yang berubah) — belum ada di tiu-tema.ts.

**Cakupan Paket 41 no. 57–65 (terkoreksi):** 57 SERI-SIFAT belum ada · 58 SERI-KUADRAN ada · 59 ANA-UBAH ada · 60 ANA-OBJ ada · 61 BEDA-HITUNG ada · 62 BEDA-TUMPUK ada (versi siluet = aturan pasangan) · 63 MTX-PUTAR ada · 64 MTX-HITUNG ada · 65 MTX-GESER belum ada. Usul susunan Paket 1 = urutan ini persis; SERI-P3, BEDA-PUTAR, MTX-GABUNG jadi cadangan bergilir paket lain.
- PUTUSAN Gusti 2026-11-08: urutan nomor TIDAK harus sama dengan Paket 41; yang wajib: SETIAP paket figural memuat kesembilan jenis Paket 41 (SERI-SIFAT, SERI-KUADRAN, ANA-UBAH, ANA-OBJ, BEDA-HITUNG, BEDA-TUMPUK, MTX-PUTAR, MTX-HITUNG, MTX-GESER). SERI-P3, BEDA-PUTAR, MTX-GABUNG = di luar 9 jenis wajib → tidak masuk paket (cadangan latihan/handbook). SERI-P3 dapur yang sudah jadi disimpan sebagai cadangan.
- Paket 1 bertema, status: SERI-KUADRAN bahari ✔ · 8 lagi: SERI-SIFAT (jenis baru), ANA-UBAH kebun, ANA-OBJ satwa, BEDA-HITUNG buah, BEDA-TUMPUK (tema baru, ganti "sekolah": dua benda sama bentuk besar-garis + kecil-pekat, dua hiasan pojok), MTX-PUTAR cuaca, MTX-HITUNG serangga, MTX-GESER (jenis baru, tema kampung). Tambah gambar pembahasan beranotasi di tiu-tema.ts. Kunci seimbang A–E.

### Paket 1 bertema selesai dibangun 2026-11-08 (menunggu penilaian Gusti)
9 jenis Paket 41 di `PAKET_TEMA["Paket 1"]`, urutan = urutan Paket 41, kunci C D A E B D A C E (A2 B1 C2 D2 E2, tidak ada kunci berderet sama). Tiap soal: aset gambar.py → cek raster → generate → cek mata. Tema baru: ubin (SERI-SIFAT), tukang (BEDA-TUMPUK, ganti "sekolah"). SERI-P3 dapur tetap ada di kode, tidak masuk paket.
- 57 SERI-SIFAT ubin C: latar hitam/putih bergantian; bentuk tengah acak tetapi selalu 5 lengan; isi pekat-garis-bintik; tanda pindah pojok. Motif = kode kutub, 5 bentuk × 3 lengan × 3 isi.
- 59 ANA-UBAH kebun A: wortel +2, cabai -2 (3→5, 5→3, 2→4, 6→4: tafsir kali/bagi gugur), tukar sisi, sekop dicermin kiri-kanan di layar.
- 60 ANA-OBJ satwa E: burung ↔ tupai + burung dicermin, siput pekat ↔ garis, kura +90°.
- 61 BEDA-HITUNG buah B: apel = pisang di 4 opsi, opsi beda 3 vs 4; assert apel/pisang/manggis/total/paritas tidak menyendirikan kunci.
- 62 BEDA-TUMPUK tukang D: aturan PASANGAN (depan ↔ hiasan sama besar), bukan dua ciri menyendirikan seperti Al Faiz; keputusan Claude supaya tidak tertebak dari satu ciri, MINTA PERSETUJUAN Gusti.
- 63 MTX-PUTAR cuaca A: kolom 1→2 putar 90°, 2→3 dibalik atas-bawah; tetes pindah pojok, jumlah = nomor kolom, isi bergantian.
- 64 MTX-HITUNG serangga C: kupu +1, kumbang -1, daun +2 per kolom.
- 65 MTX-GESER kampung E: tiga kelompok geser per baris, "?" di baris 2 kolom 1 (Al Faiz baris 3 kolom 2); sel berubah (1,3), (2,1), (3,2); pengecoh = aksi terlewat / benda salah.
- Mesin: `rakit` (pilih + letak + alasan gugur), `anotasi`/`lingkari` (gambar pembahasan beranotasi, semua soal kecuali 58 bahari lama), `matriks(sel, q)` untuk "?" di sel mana pun.
- Pelajaran: (1) cermin di layar sesudah putar: M·R(θ) = R(−θ)·M, jadi pose dihitung, jangan ditebak; (2) benda hitung ≥ 45/200, kalau tidak "banyak ruang kosong"; (3) BEDA-TUMPUK: benda kecil wajib tepat di garis tepi benda besar, kalau tidak depan/belakang tidak terbaca; (4) aset simetris diagonal lolos mata tetapi gagal raster: beri ciri tak seimbang; (5) kelopak lepas jangan menumpuk supaya lengan bisa dihitung; (6) tangkapan halaman > 8192 px css skala 2 melilit: seluruh halaman skala 1 + tiap soal `preview-soalN-{desk,hp}.png`.
- Hasil: 21 aset objek besar lolos raster, 0 gagal. Pemeriksa tipe bersih di file tema. Tangkapan tiap soal di `.test-out-tema/paket-1/`. Cek mata + hitung opsi kunci oleh Claude; belum dicek buta manusia.
- Gusti 2026-11-08 atas 9 soal: "oke ini sudah jauh lebih membaik" (arah rupa dan kesulitan diterima). Aturan pasangan soal 62 belum dijawab tegas; perintah lanjut Paket 2 belum ada.
- PUTUSAN Gusti 2026-11-08: lanjut (58 dilengkapi, Paket 2 disusun, aturan pasangan BEDA-TUMPUK tetap dipakai karena tidak ditolak). Catatan rupa Paket 2: "lebih smooth dan lengkungannya lebih mulus layaknya disusun oleh manusia"; wajib baca ulang contoh Al Faiz dulu.
- Baca ulang Al Faiz 57, 62, 64, 65 atas catatan Gusti. Ciri "buatan tangan": seperti potongan kertas; tepi bulat tanpa ruas lurus dan tanpa sudut tajam; ujung garis tumpul; detail sedikit tetapi tebal; garis tebal yang sedikit tidak rata; siluet 3–5 tonjolan. Aset Paket 1 masih punya ruas lurus, sudut tajam, kaki dan sungut tipis.
- Cara baru Paket 2: `halus(titik)` di gambar.py (lengkung Catmull-Rom lewat titik, tanpa ruas lurus), ujung tajam ditulis dua titik berdekatan supaya bulat, garis ganda dari `garis_ganda`. Hindari garis putih tipis (≥ 4 unit).
- [x] Soal 58 bahari diberi gambar pembahasan. `anaObjT` kini menerima spesifikasi tema (`SATWA_OBJ`, `TUMBUHAN_OBJ`).
- [x] Prototipe Paket 2 = 1 soal: ANA-OBJ tumbuhan (kaktus, daun menjari pekat/garis, tulip, jamur), kunci B sementara. Aset lolos raster 0,40–0,66. Tangkapan: `.test-out-tema/paket-2/preview-soal1-{desk,hp}.png`. MENUNGGU penilaian Gusti sebelum 8 jenis lain.
- Gusti 2026-11-08 atas prototipe: "nah ini jauh lebih smooth" → cara lengkung baru DISETUJUI, diperluas ke 8 jenis lain.
- [x] Paket 2 bertema 9 jenis jadi, semua aset lengkung mulus. Kunci A B D C E A B E D (A2 B2 C1 D2 E2; beda dengan Paket 1 di tiap nomor). Tema: 57 mozaik (6 lengan), 58 sawah, 59 hutan (buah pinus +3, bulu -2), 60 tumbuhan, 61 biji (opsi beda 4 vs 3), 62 gerabah, 63 alam, 64 kolam, 65 taman ("?" di baris 1 kolom 2). Tiap jenis kini menerima spesifikasi (KEBUN/HUTAN, BIJI, GERABAH, ALAM, KOLAM, TAMAN); assert baru: tafsir kali/bagi gugur, sel berubah satu per baris/kolom/kelompok.
- Temuan cek mata Paket 2: kerbau diputar 45° menembus bingkai → aset dikecilkan 0,82; keong, karang, cemara, beringin terlalu simetris → digambar ulang; beringin sempat terbaca jamur; kapak/bulu terlalu tipis → ditebalkan. Hasil: semua aset objek besar lolos raster (37 OK, 0 gagal), uji proyek lolos.
- Status: MENUNGGU penilaian Gusti atas Paket 2. Paket 1 masih aset lama (tepi tajam); tanyakan apakah digambar ulang sebelum Paket 3. Prompt siap tempel: "Lanjutkan kerja ulang paket figural TIU. Baca log figural bagian 'Paket 2 bertema 9 jenis jadi'. Terapkan penilaian saya, lalu kerjakan Paket 3."
- PUTUSAN Gusti 2026-11-08 (sesudah Paket 2): perubahan dipertahankan; commit/push DITAHAN di working tree sampai Gusti memerintahkan. Pertanyaan "Paket 1 digambar ulang dengan lengkung mulus sebelum Paket 3?" BELUM dijawab; tanyakan lagi di sesi berikut.
- Rencana lama sesudah setuju: 58 bahari diberi gambar pembahasan, lalu Paket 2 dan 3 (tema tidak berulang, kunci diatur lagi).
- Prompt siap tempel (TERBARU): "Lanjutkan kerja ulang paket figural TIU. Baca ~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md bagian 'Paket 1 bertema selesai'. Terapkan penilaian saya atas 9 soal, lalu susun Paket 2."
