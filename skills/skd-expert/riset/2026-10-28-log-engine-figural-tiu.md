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
