# Tahap 5 · Kelompok 2 Verbal — Bab 3, Bab 4, Bab 5 (produksi soal)

Handbook TIU D'Ajiks Akademi · 2026-11-01 · subagen tiu-t5-verbal
Status: 23 soal ditulis dan dipasang, build galat 0. Cek buta putaran 1 selesai (isi 23/23 sama dengan kunci; penebak bentuk 20/23 → 9 soal direvisi, lihat §Revisi pasca cek buta). Cek buta ulang 9 soal: isi 9/9 = kunci, tanpa ambiguitas; sisa bocor bentuk di 3 soal + 1 catatan ringan → revisi putaran 2 (lihat §Revisi pasca cek buta 2). Cek buta ke-3: 4/4 = kunci; kunci B04-C01 dan B04-L04 berada di pasangan cermin tunggal → revisi putaran 3 (§Revisi pasca cek buta 3). **Cek buta ke-4 untuk 2 soal belum dilakukan** (berkas `verbal_b03_05_buta4.json`).

## Berkas
| Berkas | Status | Isi |
|---|---|---|
| `scripts/data/verbal_b03_05.json` | baru | satu sumber data 23 soal: soal, opsi, kunci, kode per opsi, nama kekeliruan (bahasa guru), kalimat penentu, alasan kunci, kerangka, TO terdekat, tabel uji (Bab 3/5), status rencana (Bab 4), kata kunci KBBI (Bab 3), pembahasan 7 langkah (pembuka + contoh), catatan reviu; field `bukti` ditulis script |
| `scripts/data/verbal_b03_05_buta.json` | baru | id, bab, target, soal, opsi saja (tanpa kunci, kode, pembahasan), 23 soal versi terbaru |
| `scripts/data/verbal_b03_05_buta2.json` | baru | sama, khusus 9 soal yang direvisi pasca cek buta (untuk cek buta ulang) |
| `scripts/data/verbal_b03_05_buta3.json` | baru | sama, khusus 4 soal yang direvisi pasca cek buta 2 |
| `scripts/data/verbal_b03_05_buta4.json` | baru | sama, khusus 2 soal yang direvisi pasca cek buta 3 (B04-C01, B04-L04) |
| `scripts/soal_verbal.mjs` | baru (306 baris) | pemeriksa + perender (lihat §Bukti); `--tulis` menulis blok src, bukti, berkas buta; tanpa argumen = memeriksa src sama dengan hasil render |
| `src/13_bab03.html`, `14_bab04.html`, `15_bab05.html` | diubah | 23 slot kosong diganti blok `<!--Bxx-yyy:mulai-->…<!--:selesai-->` berisi `<div data-soal="ID" data-target="…">`; pembuka/contoh + pembahasan 7 langkah; latihan soal saja; catatan pengajar (kode) di `.guru` tiap blok. Catatan pengajar "Asal Rancangan Bab 3" diperbarui (status KBBI) |
| `src/00_head.html` | ditambah | `.opsiv` (pilihan kalimat ditumpuk), `.premis` (premis berlabel), `[data-soal] > .guru`, `.gugur.vb`, aturan `.bab h3 + p:has(+ [data-soal]){break-after:avoid}` (judul Contoh/Latihan tidak yatim) |
| `src/build.py` | diubah | menjalankan `soal_verbal.mjs`; pita bab + waktu latihan ikut menghitung soal terisi (urutan muncul, aturan T4-24), cek target kartu soal terisi |
| `scripts/cek_bab19.mjs` | diubah | kode rujukan Latihan A juga dibaca dari blok terisi (pemeriksaan tidak dilemahkan: assert slot tidak terisi-dan-kosong sekaligus) |
| `scripts/cek_lampiran.mjs` | diubah | blok terisi dibaca generik; jumlah tetap 165; kolom L6 (pembuat, bukti, kerangka, TO terdekat) untuk 23 soal verbal diisi dari data; L6 ditulis ulang `--tulis` |
| `src/96_lampiran_l6.html` | ditulis ulang script | 23 baris verbal kini berkolom asal soal |

## Sebaran kunci
Urutan kelompok (B03 P C1–3 L1–3 · B04 P C1–4 L1–4 · B05 P C1–3 L1–3):
`D A C E B D A · B E C A D C B D E · C B A D A E C`
A 5 · B 4 · C 5 · D 5 · E 4; tidak ada huruf sama > 2 berturut (per bab maupun sekelompok). Kunci dua argumen mengikuti isi (C01 B, L02 E); dua kesimpulan memakai 5 gabungan urutan baku (1, 2, 3, 7, 9 → kunci C).

## Bukti kunci tunggal per soal
| ID | Jenis | Kunci | Bukti |
|---|---|---|---|
| B03-P01 | pasangan, sifat tanda | D TIRAI : CAHAYA | kalimat uji "__ dipakai untuk mengurangi __" meloloskan D saja; B tanda, C arah, E menjaga ≠ mengurangi, A topik |
| B03-C01 | pasangan, tingkat | A BERJALAN : BERLARI | "__ kadar lebih ringan dari __ pada kegiatan sama"; D arah kuat→lemah, B dua arah gerak, E sinonim berimbuhan ber- : ber-, C topik |
| B03-C02 | tiga kata | C PETANI : SAWAH : PADI | dua kalimat uji; A dan E benar di satu sambungan, B peran tertukar, D meminjam kata |
| B03-C03 | hubungan kalimat | E jamu kunyit asam | soal tembaga + timah → perunggu; hasil E "jamu kunyit asam"; peta: dua bahan dicampur → benda baru; A, C tujuan beda; B dua alat; D satu bahan |
| B03-L01 | pasangan, arah | B PENENUN : KAIN | "__ menghasilkan __"; C arah dibalik |
| B03-L02 | pasangan, keharusan | D GAJAH : BELALAI | "setiap __ memiliki __"; A KUCING : BELANG, E KUDA : PELANA kadang ada |
| B03-L03 | hubungan kalimat benda buatan | A kantong udara | tujuan perlindungan tubuh dari benturan; B bagian sama tujuan beda |
| B04-P01 | 3 premis + pengalih | B | mesin: 5 istilah, 18 daerah sah, 262.143 dunia × 4 bacaan; hanya B pasti benar; D "hubungan … tidak dapat dipastikan" pasti salah (ada hubungan pasti); P1, P2 perlu |
| B04-C01 | premis berlawanan kenyataan | E (kontraposisi P1) | mesin: E pasti benar, B pasti salah; A–D pasangan cermin pengecoh (kuning→larut / larut→kuning), C = "tidak" di dua sisi, semuanya tidak dapat dipastikan; P1 perlu, P2 pengalih |
| B04-C02 | dua kesimpulan | C | mesin: (1) pasti benar, (2) tidak dapat dipastikan; tepat satu opsi status lengkap cocok |
| B04-C03 | rantai + atau | A | tabel kebenaran 7 pernyataan × 2 bacaan "atau"; P1 + P4 perlu, P2/P3 tidak dipakai kunci |
| B04-C04 | setara | D | tabel kebenaran: setara hanya D; B ingkaran sejati |
| B04-L01 | bersyarat satu langkah | C | mesin dengan individu: hanya C pasti benar; E (juga tentang paket Dodi) tidak dapat dipastikan |
| B04-L02 | kata izin | B | mesin dengan individu: hanya B pasti benar |
| B04-L03 | ingkaran | D "Tidak semua …" | semua dunia × 4 bacaan: ingkaran hanya D; B (juga "Tidak semua …", arah dibalik) dan C (berawalan "Ada") bukan ingkaran; E setara (kontraposisi) |
| B04-L04 | hubungan tidak dapat dipastikan | E | mesin: keenam hubungan kategoris pemenang–tim dekorasi tidak pasti di setiap bacaan, jadi E pasti benar; A "tidak dapat dipastikan apakah semua pemenang … anggota klub seni" pasti salah karena P1; B–C pasangan cermin pengecoh; B–D tidak dapat dipastikan |
| B05-P01 | klaim urutan, memperlemah | C | tabel akibat klaim: hanya C memperlemah; A memperkuat (bentuk pembanding juga) |
| B05-C01 | dua argumen | B | status fakta: arg 1 tidak tersentuh, arg 2 (pendaftaran jarak jauh) diperkuat oleh fakta berkata lain (lewat ponsel, hari sebelumnya) |
| B05-C02 | klaim umum, memperlemah | A | hanya A memperlemah (X tanpa Y); tiga opsi berbentuk kasus |
| B05-C03 | sebab dua kelompok, memperkuat | D | hanya D memperkuat; B memperlemah |
| B05-L01 | cara tunggal, memperlemah | A | hanya A memperlemah |
| B05-L02 | dua argumen | E | status fakta: tidak menyentuh keduanya |
| B05-L03 | sebab, memperkuat | C | hanya C memperkuat; B memperlemah |

Pemeriksaan mesin `soal_verbal.mjs` (1.478 assert): status Bab 4 sama di semua bacaan (himpunan boleh kosong / pasti beranggota × "sebagian" ≥ 1 / "tidak semua" × "atau" inklusif / eksklusif); uji diri pola sah/sesat; opsi bertanda J-MUNGKIN wajib "tidak dapat dipastikan"; premis bukan pengalih diuji perlu; kunci bukan terpanjang tunggal; bentuk kunci Bab 5 tidak tunggal; kode ∈ 47 kode engine v0.4.3; rujukan Latihan A Bab 19 (B03-L03 J-RELASI, B04-L02 J-IZIN, B05-L01 J-AKAL) ada; bahasa siswa (frasa terlarang, istilah dapur, kode, "maka/karena itu" ≤ 1). Mesin menolak versi awal Contoh 1 Bab 4 (pilihan "semua logam berwarna kuning" berubah status bila "sebagian" dibaca "tidak semua") → soal disusun ulang.

## Lema KBBI (diperiksa 2026-11-01, kbbi.kemendikdasmen.go.id, izin Putusan T5-1)
Situs lain tidak dibuka. Permintaan beruntun kadang dibalas 403, lalu diulang satu-satu. Lema per kata juga tersimpan di `verbal_b03_05.json` (`kbbi.lema`) dan dicetak di catatan pengajar tiap soal Bab 3; script menolak kata kunci tanpa lema.
- **pelumas**: lumas: n minyak kental yang digunakan untuk melicinkan (melancarkan) jalannya mesin mobil dan sebagainya; minyak pelicin
- **gesekan**: gesek: n 1 perbuatan menggesek; 2 hasil menggesek; 3 Olr kekuatan paralel antara dua permukaan yang menahan geseran
- **tirai**: n 1 kain berumbai untuk perhiasan langit-langit tempat tidur; 2 kain penutup pintu (jendela dan sebagainya); gorden; 3 kain pemisah ruangan
- **termos**: n botol yang diberi dinding rangkap untuk menyimpan minuman agar tetap memiliki suhu yang semula
- **silau**: a 1 berkilau-kilau pandangannya, tidak dapat melihat nyata karena terlampau terang cahayanya
- **pengeras**: n 2 alat atau bahan untuk mengeraskan atau memperkeras ('pengeras suara' tidak berentri sendiri)
- **berbisik**: bisik: v 1 berkata dengan suara perlahan-lahan (seakan hanya mendesis dan tidak nyaring)
- **berteriak**: teriak: v berseru (berkata, memanggil, dan sebagainya) dengan suara keras; memekik
- **berjalan**: jalan1: v 1 melangkahkan kaki bergerak maju
- **berlari**: lari1: v lari; lari v 1 melangkahkan kaki dengan cepat yang pada setiap langkahnya kedua kaki tidak menjejak tanah
- **melahap**: lahap1: v 1 makan banyak-banyak
- **mencicipi**: cicip1: v 1 mencicip; 2 menyantap (makanan) — cicip: coba untuk merasai
- **lompat**: v bergerak menjauhi permukaan secara horizontal dengan menggunakan otot-otot kaki
- **loncat**: v 1 bergerak menjauhi permukaan secara vertikal (ke atas) dengan menggunakan otot kaki; 2 lompat
- **bercakap**: cakap2: v 1 berbincang; berkata; 2 berbahasa
- **berbicara**: bicara: v 1 berkata; 2 melahirkan pendapat
- **koki**: n juru masak; ahli dalam seni boga
- **dapur**: n 1 ruang tempat memasak
- **masakan**: masak1: n 1 hasil memasak (lauk-pauk, penganan, dan sebagainya)
- **percetakan**: cetak: n 1 tempat (perusahaan) cetak-mencetak (buku dan sebagainya); kantor cetak
- **sawah**: n tanah yang digarap dan diairi untuk tempat menanam padi
- **perunggu**: n 1 logam campuran tembaga dan timah putih, berwarna cokelat kekuningan; gangsa
- **timah**: n logam tidak keras, digunakan sebagai campuran untuk kertas bungkus, perkakas dapur, bahan solder; stanum
- **meracik**: racik3: v mencampur bahan-bahan untuk dijadikan jamu (obat); meramu
- **pahat**: pahat1: n alat (perkakas) bertukang berupa bilah besi yang tajam pada ujungnya untuk melubangi atau mengukir kayu
- **memeras**: peras1: v 1 memijit (menekan dan sebagainya) supaya keluar airnya; memerah
- **komponis**: n penggubah lagu (musik)
- **penenun**: tenun: n orang yang menenun
- **insinyur**: n 1 ark sarjana teknik; 2 lulusan pendidikan keinsinyuran yang ahli dalam rekayasa teknik
- **paruh**: paruh1: n moncong atau mulut (burung, ayam, itik); cotok
- **belalai**: n jungur atau hidung yang panjang pada beberapa binatang, ada yang berfungsi sebagai tangan (pada gajah)
- **belang**: belang1: n 1 warna yang lebih dari semacam; 2 berwarna loreng-loreng
- **pelana**: n 1 lapik pada punggung kuda dan sebagainya; 2 tempat duduk orang yang menunggang
- **busa**: busa2: n karet gembus dan empuk, biasanya untuk isi jok atau kasur
- **ulir**: ulir1: n alur-alur berputar seperti pada sekrup
- **helm**: tidak terbaca: halaman hanya hasil pencarian kosong (belum diverifikasi)

Dampak ke soal: "lompat" (mendatar) ≠ "loncat" (ke atas) → teks gugur B03-C01 B diganti "dua arah gerak"; "perunggu" = campuran tembaga dan timah → dipakai mengganti soal adukan; "meracik" makna 3 = mencampur bahan jamu → menguatkan kunci B03-C03; "termos" = menjaga suhu semula → menguatkan gugur B03-P01 E; "sawah" = tempat menanam padi dan "koki" = juru masak → menguatkan B03-C02. Catatan tersisa: "tirai" di KBBI = kain penutup jendela/gorden (fungsi mengurangi cahaya = pengetahuan umum, tidak tertulis); "mencicipi" makna 2 = menyantap (B03-C01 D tetap salah: kalau dibaca sama kadar pun tidak naik); "pelumas" = minyak pelicin jalannya mesin (A OLI : MESIN tetap salah relasi); "helm" tidak terbaca (halaman hasil pencarian kosong).

## Revisi pasca cek buta (2026-11-01)
Cek buta: jawaban isi 23/23 = kunci; penebak bentuk 20/23. Perbaikan (kebenaran kunci tetap; status Bab 4 dibuktikan ulang mesin; sebaran kunci tidak berubah A5 B4 C5 D5 E4):
| ID | Kebocoran / temuan | Perbaikan |
|---|---|---|
| B04-C01 | kunci versi "Ada" dari pasangan Semua/Ada | kunci jadi kontraposisi P1 berbentuk universal ("Benda yang tidak larut dalam air bukan logam."); opsi berawalan "Ada" (D) kini salah; pembahasan menyebut terang bahwa P1 salah di dunia nyata tetapi diikuti |
| B04-L03 | kunci opsi tunggal berawalan "Ada" | kunci "Tidak semua penumpang kapal memakai pelampung." (setara dengan "ada … yang tidak", dibuktikan mesin); C diganti "Ada penumpang kapal yang memakai pelampung." (salah) |
| B04-L04 | kunci tunggal "tidak ada kesimpulan", bunyi berlebihan | kunci "Hubungan pemenang poster dan tim dekorasi tidak dapat dipastikan."; bentuk serupa dipasang sebagai pilihan salah di B04-P01 D (J-TENTU, pasti salah); A dipanjangkan agar kunci bukan terpanjang |
| B04-L01 | kunci tunggal menyebut Dodi, terpendek | E diganti "Paket milik Dodi tiba di tujuan hari ini." (J-MUNGKIN); kunci "Paket milik Dodi sudah diberi label alamat." |
| B03-C01 | kunci tunggal berimbuhan ber- : ber- | E diganti BERBICARA : BERCAKAP (sinonim, KBBI) |
| B05-C01 | fakta berbagi "pendaftaran daring" dengan argumen 2; "sehari sebelum berobat" tidak ada di fakta | argumen 2 "pendaftaran jarak jauh sehari sebelum berobat", fakta "pendaftaran lewat ponsel pada hari sebelumnya" |
| B03-L02 | E SAPI : TANDUK bisa dibela | E diganti KUDA : PELANA |
| B03-C03 | adukan nyata memakai air | soal diganti "Perajin logam mencampur tembaga dan timah untuk membuat perunggu." |
| B04-P01 | (penyeimbang L04) | D diganti "Hubungan antara pegawai baru dan pekerja paruh waktu tidak dapat dipastikan." (J-TENTU) |
Script: `soal_verbal.mjs` kini mengenal pilihan "hubungan … tidak dapat dipastikan" (benar ⇔ tidak satu pun dari 6 hubungan kategoris kedua kelompok pasti benar) dan menulis berkas buta kedua untuk soal ber-`revisi`. Kekeliruan yang tidak diubah (dicatat cek buta, wajar): pilihan pengulang klaim di Bab 5 selalu salah; pasangan B–C "Ada/Semua" di B04-P01 (kunci "Ada") dibiarkan karena C01 dan L03 kini mematahkan pola itu.

## Revisi pasca cek buta 2 (2026-11-01)
Cek buta ulang (`verbal_b03_05_buta2.json`): isi 9/9 = kunci, tanpa ambiguitas; penebak bentuk masih kuat di 3 soal. Perbaikan (kunci dan huruf kunci tetap; status dibuktikan ulang mesin):
| ID | Kebocoran | Perbaikan |
|---|---|---|
| B04-C01 | E satu-satunya bentuk kontraposisi | A "Benda yang berwarna kuning larut dalam air." (sebagian → semua) dan C "Benda yang bukan logam tidak larut dalam air." ("tidak" di dua sisi, J-BALIK); tiga opsi kini berbentuk "Benda yang …"; pembahasan tetap menyebut P1 salah di dunia nyata |
| B04-L03 | D satu-satunya berawalan "Tidak semua" | B "Tidak semua orang yang memakai pelampung adalah penumpang kapal." (arah dibalik) |
| B04-L04 | E satu-satunya "… tidak dapat dipastikan" | A "Hubungan antara anggota tim dekorasi dan anggota klub seni tidak dapat dipastikan." (salah: P2 memastikan, J-TENTU); redaksi kunci "pemenang lomba poster … anggota tim dekorasi" |
| B03-C03 | "minuman" lebih umum dari "perunggu" | hasil E "jamu kunyit asam" |
Script: pilihan "hubungan … tidak dapat dipastikan" kini dinilai per bacaan (status hubungan boleh berbeda antarbacaan, tetapi status pilihan itu wajib sama); cache dunia per soal (dunia uji "premis dibuang" sampai 2^24 tidak disimpan agar memori aman). Lama jalan ±45 detik.

## Revisi pasca cek buta 3 (2026-11-01)
Cek buta ke-3: jawaban isi 4/4 = kunci. Pelanggaran pedoman "kunci bukan satu-satunya pasangan cermin" di dua soal; huruf kunci tetap:
| ID | Temuan | Perbaikan |
|---|---|---|
| B04-C01 | kunci E di pasangan cermin tunggal C–E | D diganti "Benda yang larut dalam air berwarna kuning." (cermin A, J-MUNGKIN, tidak dapat dipastikan); pasangan cermin kini A–D, B–E, C–E |
| B04-L04 | pasangan cermin tunggal A–E (templat "tidak dapat dipastikan"); A bisa didalih setengah benar | A "Tidak dapat dipastikan apakah semua pemenang lomba poster adalah anggota klub seni." (tegas salah: P1 memastikan; J-TENTU); B "Semua pemenang lomba poster adalah anggota tim dekorasi." dan C "Semua anggota tim dekorasi adalah pemenang lomba poster." = pasangan cermin pengecoh (J-MUNGKIN ×2, kembali ke spek slot) |
Pemeriksaan mesin baru di `soal_verbal.mjs`: dua opsi disebut **cermin** bila kata isinya sama tetapi urutannya beda (kata fungsi seperti semua/ada/tidak/bukan/yang diabaikan); bila kunci berada di suatu pasangan cermin, wajib ada pasangan cermin lain tanpa kunci. Diterapkan ke semua soal kecuali bentuk templat engine (dua kesimpulan, dua argumen). Hasil (dicatat di `bukti.cermin`): B04-C01 AD BE CE · B04-C04 AB AC AE BD CD DE · B04-L01 AD · B04-L03 AB AE BC BD CE DE · B04-L04 BC CE; soal lain tanpa pasangan cermin. Script juga menilai pilihan "tidak dapat dipastikan apakah X" (benar ⇔ X tidak dapat dipastikan, wajib sama di semua bacaan).

## Halaman
Siswa 123 → **144** hlm (Bab 3 hlm 14–24, Bab 4 25–38, Bab 5 39–50). Pengajar 154 → **170** hlm sesudah revisi 3 (169 sesudah revisi 1–2) (Bab 3 14–24, Bab 4 25–39, Bab 5 40–51). Pita bab tetap ±45 / ±60 / ±75 detik.

## Hasil cek
`python3 src/build.py`: **galat 0**; semua cek lulus: cek_bab01_02, cek_bab03_05, soal_verbal (1.478), cek_bab06_10 (158), cek_bab11_13 (67), cek_bab14_18 (66), cek_bab19 (852), cek_lampiran (553, sama seperti sebelum T5; L6 165 butir). Slot kosong seluruh buku: 164 → 141.

## Cek mata (PNG di scratchpad `cekmata2/`)
Sesudah revisi pasca cek buta: halaman 14–51 siswa dirender ulang (`cekmata3/`), tata letak tetap, tidak ada kotak terbelah atau judul yatim. Sesudah revisi 2: halaman 21, 22, 31, 32, 37, 38 dirender (`cekmata4/`), bersih. Sesudah revisi 3: halaman 31, 32, 37, 38 (`cekmata5/`), bersih. Putaran 1: tiga judul yatim (hlm 29 "Contoh Soal dan Pembahasan" Bab 4, hlm 42 Bab 5, hlm 46 "Latihan" Bab 5) → aturan `break-after:avoid` pada pengantar sebelum soal; putaran 2 bersih. Tersisa: hlm 30 siswa ±40% kosong (judul Contoh Bab 4 pindah ke halaman berikut) dan hlm 22 ±25% kosong; pembahasan contoh berlanjut ke halaman berikut di antara kotak (tidak ada kotak terbelah).

## Butir putusan antre (untuk Gusti, satu per respons)
1. **Persetujuan 23 soal** sesudah cek buta ke-4 untuk 2 soal revisi putaran 3 (`verbal_b03_05_buta4.json`). Rekomendasi: cek buta + penebak bentuk hanya untuk 2 soal itu.
1b. **B04-C02 (dua kesimpulan) memuat cermin tunggal C–D** ("(1) pasti benar, (2) tidak dapat dipastikan" lawan kebalikannya) karena lima gabungan status urutan baku engine. Dikecualikan dari pemeriksa cermin. Rekomendasi: terima (memperbaiki berarti memakai gabungan dengan dua kesalahan sekaligus); alternatif gabungan 1, 2, 3, 4, 7 bila Gusti ingin pola cermin hilang.
2. **Pembahasan pembuka langsung di bawah soal pembuka** (sesuai perintah), padahal pengantar bab meminta siswa mengerjakan dulu. Rekomendasi: pindahkan ke sebelum "Contoh Soal dan Pembahasan" dengan judul "Pembahasan Pertanyaan Pembuka".
3. **B04-P01 memakai 5 istilah** (spek ≤ 4) karena narasi mendefinisikan premis pengalih tanpa istilah bersama; pilihan D kini J-TENTU (kode slot semula J-MUNGKIN). B04-L04 kini J-TENTU (A) + J-MUNGKIN ×2 (B, C) + J-AKAL; J-BALIK slot tidak dipakai. Rekomendasi: terima.
4. **B04-C01: P2 kini pengalih** (kunci = kontraposisi P1 saja); jenis "semua + sebagian" tetap pada premis. Rekomendasi: terima (memutus pola kunci "Ada").
5. **Kode B04-C02 opsi D/E** (J-MUNGKIN = status tertukar; J-SEBAGIAN diperluas = "sebagian" dibaca "mungkin tidak ada"). Rekomendasi: terima.
6. **"Tirai" di KBBI tidak menyebut cahaya** (kain penutup jendela/gorden); kunci B03-P01 bertumpu pada fungsi umum tirai. Rekomendasi: terima; bila ingin kunci bermakna KBBI eksplisit, ganti pasangan kunci.
7. Pilihan setara satu sama lain (B04-C04 A/C, B04-L01 A/D) dan B03-P01 satu pilihan "menambah". Rekomendasi: terima.

## Belum dikerjakan (di luar tugas)
Lampiran A (kunci latihan) dan pembahasan latihan (Tahap 6). Registri kerangka: Bab 2 C01 nanti wajib beda susunan dari B04-C01 (semua M–P + sebagian S–M) dan istilah lain.
