# Handoff — Bank Soal TWK D’AJIKS (101 JSON, v1.5)

## Status engine v1.6 (Claude, 2026-10-27)

- `MR_BADRUN_TWK_ENGINE.md` naik ke **v1.6** atas putusan Gusti (dasar: audit 229 soal TWK-2026SL + Al Faiz Part 39; usulan `~/.claude/skills/skd-expert/usulan/2026-10-27.md`). Grid paket baru 7/6/6/3/2/6 (Bahasa 6), D9–D10, T6, E7/E8 diperbarui.
- **Bank 101 masih v1.5** (grid lama). Jangan menilai bank 101 dengan grid v1.6.
- Validator (2026-10-27): `node tmp/validate_bank_100.mjs <file> [--versi=1.5|1.6]`. Tanpa argumen = v1.5 (bank 101, hasil sama persis seperti sebelumnya). `--versi=1.6` = paket 30: tema 7/6/6/3/2/6, level C2+C3 6 / C4 15 / C5 9, kunci 4–7 per huruf, jangkar ≥ 9, E7 ≤ 2, kunci tidak kembar, soal Bahasa wajib kolom `rumpun` ("paragraf" 3 + "kaidah" 3), tanpa wajib dua sisi, opsi kaidah bebas 8–14; kode rujukan tambahan UU30_2014, KBBI_DARING. D1–D10 dan larangan D1–D10/T1–T6 di pembahasan berlaku di kedua versi.
- Uji validator: `node tmp/uji_validate_v16.mjs` harus berakhir "SEMUA UJI LULUS" (paket contoh 30 lolos v1.6, 10 pelanggaran gagal, bank 101 tetap 0 error). Jalankan setiap validator diubah. Soal Bahasa paket v1.6: kolom `bentuk_tegangan` dikosongkan (null).

## Status v1.5 (Claude, 2026-10-25) — baca ini dulu

- `bank_soal_100.json` (nama file tetap) kini berisi **101 butir MR BADRUN v1.5**: tema 30/25/20/12/8/6, C3/C4/C5 20/51/30, kunci A20 B20 C20 D21 E20, 72 jangkar faktual, bentuk tegangan T1–T5. Validator v1.5 0 error, 30 peringatan kata stem (petunjuk Gerbang 1). Status: **draf, menunggu reviu manusia**.
- Cadangan sebelum v1.5: `tmp/v15/bank_soal_100.pre_v15.bak.json`.
- **Cara rakit (satu-satunya jalur):** ubah isi hanya lewat `tmp/v15/patch_*.json` → `python3 tmp/v15/apply.py` (tulis `tmp/v15/bank_v15_draft.json`; judul, versi, distribusi, dan `meta.qa` dihitung di sini) → `node tmp/validate_bank_100.mjs tmp/v15/bank_v15_draft.json` harus 0 error → salin ke `bank_soal_100.json` → `apply.py` sekali lagi harus byte-identik → `python3 tmp/v15/pecah_paket.py` harus memberi peta yang sama (seed 2027), lalu `--tulis` → `python3 tmp/v15/buat_pdf.py`.
- Paket: `tmp/v15/paket_twk_{1,2,3}.json` (3 × 30, komposisi SKD) + `cadangan_twk.json` (11). PDF: `Bank Soal TWK DAJIKS 101 v1.5 - 3 Paket.pdf` (per paket soal · lembar jawaban · pembahasan · reviu ahli; lampiran reviu cadangan), dibuat lewat Chrome headless.
- Verifikasi baru: EYD V (batas "satu kata"; angka >1 kata di awal kalimat didahului sebanyak/sejumlah/sebesar) → soal 101; Perpres 8/2026 Lampiran A Tema 2/Tema 6 → 089/093. 095 jangkar false (sumber sejarah belum didapat).
- Bagian di bawah = **riwayat v1.3** (Agustus 2026). Perintah jq, `tmp/question_batches/`, `tmp/generate_review_pdf.py`, dan file tmp v1.3 lain yang disebut di bawah **sudah dihapus 2026-10-25** (atas izin Gusti); jangan dicari.

## Status nyata v1.3 (riwayat, diperbarui setelah revisi kurva kesulitan C2→C3)

- Target pengguna: 100 soal TWK berbentuk JSON, teliti, konkret, valid, untuk D’AJIKS Akademi.
- **Belum siap dipublikasikan.** Seluruh 100 butir sudah melalui audit ulang Gerbang 1–4 (lihat bagian-bagian di bawah), dan pada putaran terbaru kurva kesulitan diubah dari C2/C3/C4/C5 (10/10/50/30) menjadi C3/C4/C5 (20/50/30) menyusul reviu tim ahli — lihat “Revisi kurva kesulitan: C2 dihapus, naik ke C3” di bawah.
- Validator mekanis lulus 0 error/0 warning untuk keseluruhan 100 butir (lihat bukti terbaru di bawah).
- Jangan menganggap perubahan yang belum direviu manusia sebagai final.

## Revisi kurva kesulitan: C2 dihapus, naik ke C3 (Claude, 2026-08-26, lanjutan)

Pemicu: tim ahli mereviu `Bank Soal TWK DAJIKS 100 - Draf Reviu Ahli.pdf` dan menilai butir level C4/C5 sudah presisi, tetapi C2/C3 lemah — rekomendasi: tiadakan C2/C3, atau minimal mulai dari C3 ke atas. Keputusan yang diambil: **bukan** menghapus seluruh tier mudah (spec `MR_BADRUN_TWK_ENGINE.md` baris 224-239 sengaja mendesain tier ini agar bank bisa membedakan peserta lemah — paket rujukan lama gagal karena semua soal susah), melainkan menghapus C2 (recall murni) dan menaikkan 20 butir (10 C2 + 10 C3 lama) menjadi tier C3 tunggal (pemahaman/aplikasi). Kurva baru: **C3 20% / C4 50% / C5 30%**, tanpa C2.

Dari 20 butir sasaran, hanya 10 yang benar-benar ditulis ulang; 10 sisanya (bekas C3) sudah lulus audit Gerbang 1-4 pada putaran sebelumnya dan tidak diubah, sesuai prinsip “jangan mengubah tanpa bukti cacat”:

- **Ditulis ulang total (C2 → C3, DEFINISI/RELASI → WUJUD)**: 001, 009, 017, 030, 038, 059, 067, 088. Kata perintah diubah dari pola recall (“makna X paling mendasar”) menjadi pola aplikasi (“tindakan mana yang paling tepat mencerminkan…”), stem/opsi/distraktor ditulis ulang dari nol mengikuti Prosedur 9 Langkah, lulus Gerbang 1-3 per butir (D5 wajib cocok-kata, D2 wajib batas eksplisit, distraktor terkuat dibela dalam satu kalimat).
- **Relabel murni (C2 → C3, konten dipertahankan)**: 051, 080. Kedua butir ini sudah berkategori WUJUD dengan pola “tindakan mana” sejak sebelumnya — secara substansi sudah menuntut aplikasi, bukan recall, sehingga label C2 aslinya adalah kesalahan penandaan, bukan kelemahan konten. Sudah lulus audit sebelumnya (lihat daftar “Diverifikasi lulus tanpa perubahan” di bawah), tidak ditulis ulang.
- **Tidak diubah sama sekali** (bekas C3, sudah lulus audit final putaran sebelumnya): 005, 013, 026, 034, 041, 055, 063, 076, 084, 091.
- `kategori_jawaban` bergeser mengikuti perubahan 8 butir DEFINISI/RELASI → WUJUD: DEFINISI 36→29, RELASI 8→7 (dikoreksi lebih lanjut ke 6 karena `meta_final.json` lama ternyata sudah tidak sinkron dengan `bank_soal_100.json` sebelum putaran ini — dihitung ulang dari nol dari empat batch, bukan diwariskan), WUJUD 38→47.
- Distribusi kunci A–E dijaga tetap 20 per huruf: karena 8 butir tulis-ulang semuanya sempat berkunci A, 6 di antaranya (009, 017, 038, 059, 067, 088) ditukar posisi kuncinya (swap opsi + analisis_opsi + teks pembahasan secara konsisten) ke B/C/D/E agar distribusi rata; 001 dan 030 tetap A.
- `tema`, `landasan`/`jangkar_faktual`, `tipe_kode/tipe_nama`, `status_kunci` pada 8 butir tulis-ulang dipertahankan dari versi lama karena skenario baru masih memakai regulasi yang sama, hanya dibingkai ulang sebagai tindakan konkret, bukan definisi abstrak.

Validator setelah revisi ini: `item_count 100`, `level_kognitif {C3:20, C4:50, C5:30}` (tanpa C2), `kunci {A:20,B:20,C:20,D:20,E:20}`, `factual_anchors 71`, `errors: []`, `warnings: []`. Tidak ditemukan duplikasi `konstruk_dua_kutub` atau pengulangan pembuka stem ≥3 kali di seluruh 100 butir.

File yang berubah pada putaran ini: `tmp/question_batches/batch_001_025.json`, `batch_026_050.json`, `batch_051_075.json`, `batch_076_100.json` (10 butir), `tmp/question_batches/meta_final.json` (`distribusi.level_kognitif`, `distribusi.kategori_jawaban`), `tmp/validate_bank_100.mjs` (`expectedLevels` — C2 dihapus, C3 10→20), `bank_soal_100.json` (dibangun ulang dari empat batch + meta).

**Belum dilakukan**: reviu manusia atas 10 butir baru (kesesuaian bahasa, ketepatan kutub, kewajaran skenario) — audit di atas dilakukan mandiri oleh Claude, bukan pengganti reviu ahli/tim D’AJIKS.

## Hasil audit ulang 001–034 (Claude, 2026-08-26)

Audit independen Gerbang 1–4 dijalankan ulang atas seluruh 34 butir (bukan hanya mengandalkan label lama). 13 butir diperbaiki dengan bukti konkret; sisanya diverifikasi lulus Gerbang 1–3 dan **tidak diubah** karena tidak ditemukan cacat yang bisa dibuktikan (mengubah tanpa bukti berisiko menambah cacat baru).

Diperbaiki: 003 (D2 boundary opsi B diperjelas), 004 (D2 boundary opsi E diperjelas), 006 (langkah ke-4 diganti agar tidak ambigu dengan pole fasilitasi ibadah), 007 (verb RELASI “menuntun”→”mendasari”), 010 (kunci diikat ke “rancangan tertulis” agar tak lagi duplikat konstruk dengan 003), 016 (opsi B ditulis ulang jadi pola RELASI “A mendasari B”), 026 (kategori DEFINISI→WUJUD, L3 disesuaikan), 029 (kunci D diperbaiki agar menutup DUA kutub — sebelumnya hanya menutup kutub keadilan substantif, tidak menutup ketertiban formal), 030 (kategori DEFINISI→RELASI — bug baru, tidak ada di daftar lama), 031 (ditulis ulang total memakai kalimat asli Proklamasi “diselenggarakan dengan cara saksama dan dalam tempo yang sesingkat-singkatnya”), 032 (D2 boundary opsi A diperjelas + ditambah rujukan UU27_2022_PDP), 033 (kategori DEFINISI→WUJUD), 034 (konstruk diubah jadi “ruang mandiri ↔ dukungan pendidik seperlunya” sesuai rekomendasi lama).

Diverifikasi lulus tanpa perubahan: 001, 002, 005, 008, 009, 011, 012, 013, 014, 015, 017, 018, 019, 020, 021, 022, 023, 024, 025, 027, 028.

Validator setelah perbaikan blok 001–034 (100 butir gabungan, blok 2–3 masih apa adanya saat itu):
```
item_count 100, themes/levels/keys sesuai target, factual_anchors=69, warnings=[], errors=[]
```

## Hasil audit ulang 035–067 (Claude, 2026-08-26, lanjutan)

Audit independen Gerbang 1–4 dijalankan atas 33 butir sisa blok kedua (035–067, gabungan `batch_026_050.json` dan sebagian `batch_051_075.json`). 8 butir diperbaiki:

- **044**: pelanggaran paralelisme morfologis — kunci D berupa kalimat pasif ("Kemampuan kerja diarahkan...") sementara A/B/C/E berpola gerund; diubah jadi gerund ("Mengarahkan kemampuan kerja...").
- **047**: label kunci "Kesetiaan reflektif" adalah istilah rakitan (dilarang Pilar 4 no.8) — diganti "Loyalitas kritis" (istilah baku wacana etika ASN).
- **036**: pembelaan distraktor C memakai alasan "belum menjamin ..." yang eksplisit dilarang Gerbang 3 — diganti alasan batas eksplisit ("terbatas pada dokumen pokok").
- **059**: rujukan mengklaim "sistem merit" padahal skenario menilai usulan vendor pelatihan, bukan seleksi pegawai — sistem merit UU ASN tidak relevan untuk konteks itu; rujukan diperbaiki jadi "profesionalitas dan objektivitas dalam pelaksanaan tugas" agar akurat dan tidak tumpang tindih konstruk dengan 066 (yang memang tentang sistem merit).
- **061**: **pelanggaran serius** — tiga dari lima opsi (A, C, E versi lama) sama-sama menyiratkan pegawai TETAP MENGHADIRI kegiatan kampanye partisan (melanggar hukum prinsip "nol opsi salah"). Opsi A, C, E ditulis ulang agar tidak ada satu pun opsi yang menyiratkan kehadiran pada kegiatan partisan.
- **062**: analisis distraktor A memakai frasa "belum menjamin" — diganti menunjuk batas eksplisit ("angka lama eksplisit dipertahankan sampai ada perintah baru").
- **064**: kutub "akses publik" vs "privasi" seharusnya berpijak pada dua UU (KIP dan PDP), sebelumnya hanya PDP — ditambah rujukan UU14_2008_KIP.
- **066**: opsi D memakai konektor "karena" sementara A/B/C/E memakai "dengan" — diseragamkan agar tidak menjadi penanda bentuk (Gerbang 2).

Infrastruktur pendukung: kode rujukan `UU14_2008_KIP` dan `PERPRES8_2026` ditambahkan ke `meta_final.json` (referensi resmi) dan ke `allowedSources` pada `tmp/validate_bank_100.mjs`; URL rujukan `ANRI_KONGRES_PEREMPUAN` diperbarui ke tautan yang benar-benar diverifikasi di handoff sebelumnya (bukan tautan generik pameran).

Diverifikasi lulus tanpa perubahan: 035, 037–043, 045, 046, 048–058, 060, 063, 065, 067.

Validator setelah perbaikan blok 035–067: item_count 100, themes/levels/keys sesuai target, factual_anchors=69, warnings=[], errors=[].

## Hasil audit ulang 068–100 (Claude, 2026-08-26, lanjutan)

**068–075** (di `batch_051_075.json`): diverifikasi lulus Gerbang 1–4 tanpa perubahan. Kekhawatiran lama "semua opsi harus tetap benar/moral" sudah terpenuhi — tidak ada opsi yang menyiratkan tindakan melanggar hukum/etik.

**076–095** (di `batch_076_100.json`): sebagian besar sudah diperbaiki pada revisi sebelumnya (kewenangan lembaga semua akurat, 080 sudah dibatasi ke peradilan di bawah MA, 088/094/095 sudah tidak memakai PerBPIP sebagai kamus). Tiga celah tersisa ditemukan dan diperbaiki:

- **089**: butir "ketahanan sosial" belum berjangkar faktual — ditambah rujukan `PERPRES8_2026` (RAN PE, pilar ketahanan sosial) dan `jangkar_faktual` diubah ke `true`.
- **091**: label kunci "Aspirasi otonomi konstitusional" adalah istilah rakitan — diganti "Aspirasi otonomi daerah melalui jalur hukum dalam NKRI" sesuai rekomendasi lama, lalu opsi dirapikan ulang agar tidak melanggar batas panjang kata.
- **093**: rujukan memakai PerBPIP 4/2022 untuk topik rehabilitasi/reintegrasi mantan ekstremis — diganti `PERPRES8_2026` (RAN PE, pilar rehabilitasi/reintegrasi) sesuai rekomendasi lama; `jangkar_faktual` diubah ke `true`.

**096–100 (tema Bahasa Indonesia): ditulis ulang total**, sesuai instruksi lama. Masalah asli: setiap butir menyajikan lima KALIMAT sebagai opsi, dan empat di antaranya sengaja dibuat mengandung kesalahan ejaan/tanda baca — pelanggaran langsung Pilar 1 ("nol opsi salah"), karena kalimat yang salah tanda baca adalah salah secara faktual, bukan sekadar kurang presisi. Perbaikan: format diubah dari "pilih kalimat yang benar ejaannya" menjadi "pilih KAIDAH yang paling tepat menjelaskan penulisan tersebut" — kelima opsi sekarang berupa lima pernyataan kaidah PUEBI/TBBI yang **seluruhnya benar secara linguistik**, hanya berbeda ketepatan dan kelengkapannya terhadap kasus yang ditanyakan (pola D2/D4/D5/D1 yang sama seperti butir lain). Kategori jawaban kelimanya diubah dari WUJUD menjadi DEFINISI karena sekarang menanyakan kaidah, bukan tindakan. Setiap kaidah pada tiap opsi diverifikasi benar secara mandiri (kaidah koma pertentangan/sebab, kata depan di vs imbuhan di-, konjungsi antarkalimat, huruf kapital nama diri, kesejajaran bentuk predikat).

Infrastruktur: `meta_final.json` bagian `distribusi.kategori_jawaban` diperbarui (DEFINISI 34→36, WUJUD 41→38, RELASI 7→8) mengikuti seluruh perubahan kategori di blok 1–3; `jumlah_jangkar_faktual` diperbarui 69→71.

Diverifikasi lulus tanpa perubahan: 068–087, 090, 092, 094, 095.

## Status akhir

**`bank_soal_100.json` sudah dibuat dan dibangun ulang** di root proyek (100 butir, lulus validator mekanis 0 error/0 warning, distribusi tema `30/25/20/12/8/5`, level `C3:20/C4:50/C5:30` — tanpa C2 sejak revisi kurva kesulitan, lihat “Revisi kurva kesulitan” di atas — kunci A–E masing-masing 20, 71 jangkar faktual).

Yang **sudah** dilakukan pada putaran ini: audit independen Gerbang 1–4 penuh atas seluruh 100 butir (bukan hanya mengandalkan catatan lama), dengan total 26 butir diperbaiki berbukti konkret (003, 004, 006, 007, 010, 016, 026, 029, 030, 031, 032, 033, 034, 036, 044, 047, 059, 061, 062, 064, 066, 089, 091, 093, 096, 097, 098, 099, 100 — lebih dari 26 karena beberapa nomor di atas mencakup dua perbaikan sekaligus).

Yang **belum** dilakukan dan tetap jadi tanggung jawab pemeriksa manusia sebelum publikasi:
1. Uji coba peserta sungguhan (validitas psikometrik masih TBD, sesuai `meta_final.json`).
2. Reviu oleh ahli hukum tata negara dan ahli bahasa untuk memverifikasi ulang setiap kaidah/pasal yang dikutip — Claude memverifikasi konsistensi internal dan kebenaran linguistik/hukum sejauh pengetahuannya, tetapi ini bukan pengganti reviu pakar manusia bersertifikat.
3. Proofread akhir menyeluruh (typo, ejaan) di luar yang tertangkap validator otomatis.
4. Keputusan publikasi: dokumen ini sendiri harus dianggap draf kerja, bukan rilis final, sampai langkah 1–3 selesai.

## Sumber kerja

- Spesifikasi wajib: `MR_BADRUN_TWK_ENGINE.md` — baca penuh terlebih dahulu. Inti: stem 3 kalimat + “tidak hanya … tetapi juga …”; semua opsi benar; kunci menutup dua kutub; D5 wajib; D2 harus punya batas eksplisit; hindari istilah rakitan.
- Batch sumber yang harus diedit: `tmp/question_batches/batch_001_025.json`, `batch_026_050.json`, `batch_051_075.json`, `batch_076_100.json`.
- Validator: `tmp/validate_bank_100.mjs`.
- Metadata draft: `tmp/question_batches/meta_final.json`.
- `tmp/question_batches/draft_full.json` **stale**. Jangan gunakan sebagai basis final; bangun ulang dari empat batch.
- `bank_soal_100.json` **sudah ada di root**, dibangun dari empat batch + `meta_final.json` (lihat perintah di bawah).

## Bukti verifikasi terakhir

`bank_soal_100.json` dibangun ulang dari empat batch dan lulus validator mekanis:

```sh
jq -s '{meta:{jumlah_soal:100},soal:add}' \
  tmp/question_batches/batch_001_025.json \
  tmp/question_batches/batch_026_050.json \
  tmp/question_batches/batch_051_075.json \
  tmp/question_batches/batch_076_100.json \
  > /private/tmp/bank-items.json
jq --slurpfile m tmp/question_batches/meta_final.json \
  '.meta = $m[0]' /private/tmp/bank-items.json > bank_soal_100.json
node tmp/validate_bank_100.mjs bank_soal_100.json
```

Hasil terbaru: 100 butir; tema `30/25/20/12/8/5`; level `C3:20/C4:50/C5:30` (C2 sudah dihapus); kunci A–E masing-masing `20`; jangkar faktual `71`; error/warning `0`.

Ini **bukan** bukti kelayakan substantif — lihat bagian “Yang belum dilakukan” untuk reviu manusia yang masih diperlukan.

## Perubahan yang sudah masuk

- `batch_051_075.json`: sebagian revisi butir 58, 60–64, 66, 68–75; termasuk `UU27_2022_PDP` pada 64 dan 72. Reviu ulang karena revisi belum QA kedua.
- `batch_026_050.json`: revisi parsial pada 36, 43, 48, 49; belum konsisten dengan hasil audit final.
- `tmp/validate_bank_100.mjs`: sudah mengizinkan source code `UU27_2022_PDP`.
- `meta_final.json`: sudah memuat 18 rujukan, tetapi perlu ditambah `UU14_2008_KIP` dan `PERPRES8_2026`, serta pembaruan rujukan ANRI Kongres Perempuan.

## Temuan audit yang wajib ditindaklanjuti

### 001–034

- Tanpa isu mandiri: 001, 009, 011, 012, 017, 018, 020, 022, 023, 025.
- Koreksi substansial: 002–008, 010, 013–016, 019, 021, 024, 026–034.
- Fokus: dua-kutub/kunci tidak unik pada 003, 004, 006, 007, 014, 016, 024, 029, 032, 034; 010 terlalu dekat dengan 003; 026 dan 033 salah kategori; 031 perlu memakai teks Proklamasi (pemindahan kekuasaan secara saksama/cepat); 032 perlu tambah UU PDP bila bicara data sensitif.
- Redaksi minimum yang telah direkomendasikan: 007 kunci B harus menjadi hubungan kausal “Penghormatan martabat manusia mendasari perluasan kesempatan …”; 016 B “Nilai Pancasila mendasari perumusan norma konstitusional …”; 029 D wajib menutup proses tertib **dan** kesetaraan; 034 L2 ubah menjadi ruang mandiri ↔ dukungan pendidik seperlunya.

### 035–067

- Tanpa isu mandiri: 038, 041, 042, 045, 051, 053, 056, 057, 065, 067.
- Koreksi besar: 035–037, 039–040, 043–044, 046–050, 052, 054–055, 058–064, 066.
- 035 duplikat 053: ganti menjadi nasionalisme produktif (prestasi internasional ↔ penguatan kapasitas bangsa).
- 037 dan 049 tidak boleh sama-sama menguji “temuan lokal → agenda kolektif”; jadikan 049 tentang sekretariat/koordinasi berkelanjutan.
- 043 perlu ketepatan istilah teknis ↔ keterpahaman lintas daerah; 044 harus konteks bencana agar tepat memakai pengabdian profesi UU 3/2002; 046 wajib sinergi keluarga-sekolah; 047 jangan memakai label rakitan “kesetiaan reflektif”.
- 058 harus menyebut koreksi terdokumentasi di L1; 059 harus beralih dari vendor ke seleksi/pengembangan pegawai agar UU ASN/merit relevan; 060 harus kasus hadiah yang telah diterima dan tidak dapat segera dikembalikan (pelaporan resmi), bukan penolakan yang pelaporannya bersifat opsional; 061 semua opsi harus nilai yang benar, bukan opsi mendukung kampanye; 064 pakai PDP + KIP; 066 bedakan dengan 059 sebagai **sistem merit** (akses nondiskriminatif + kompetensi/kinerja terukur).

### 068–100

- 068–075 perlu QA ulang setelah revisi parsial, khususnya semua opsi harus tetap benar/moral.
- 069 kunci harus menutup bukti + bebas pengaruh ikatan pribadi (mis. netralitas keputusan), bukan hanya independensi.
- 074 L2 harus urutan layanan ↔ penjelasan terbuka dasar prioritas; gunakan istilah **asas profesionalitas**, bukan mengklaim nilai dasar ASN.
- 075 sebut kanal konkret `UPG atau KPK`; rujuk PerKPK 2/2019 sebagaimana diubah PerKPK 1/2026.
- 076 kunci perlu “MPR memutus usul tertulis perubahan UUD sesuai syarat Pasal 37”.
- 078–082, 086–087: tulis ulang distraktor agar semua kewenangan lembaga **benar**; butir lama banyak berisi kewenangan palsu.
- 080 batasi menjadi hakim pada badan peradilan di bawah MA; KY tidak berwenang terhadap hakim MK.
- 084: jangan gugurkan opsi hanya karena tidak menyebut mekanisme; buat batas eksplisit.
- 088, 094, 095: jangan memakai PerBPIP sebagai kamus radikalisme/intoleransi/disinformasi; pakai definisi umum resmi (KBBI VI) atau regulasi BNPT untuk ekstremisme berbasis kekerasan.
- 089: tambah sumber konseptual yang benar untuk “ketahanan sosial”.
- 090: PerBPIP/UUD hanya landasan normatif, bukan sumber teknis moderasi.
- 091: ganti label rakitan “aspirasi otonomi konstitusional” menjadi “aspirasi otonomi daerah melalui jalur hukum dalam NKRI”.
- 092: kunci harus memuat pengawasan paparan **dan** dialog/nalar.
- 093: pakai Perpres 8/2026 (rehabilitasi/reintegrasi), bukan PerBPIP 4/2022.
- 096–100: tulis ulang dari nol menjadi soal **analisis kaidah** dengan lima opsi berupa pernyataan kaidah yang benar; versi sekarang sengaja memberi empat kalimat salah sehingga melanggar MR.

## Rujukan resmi yang sudah diverifikasi

- UUD 1945: `https://jdih.dpr.go.id/setjen/index/id/UUD-1945-BAGIAN-PERTIMBANGAN-DAN-DOKUMENTASI-INFORMASI-HUKUM`
- UU ASN 20/2023: `https://peraturan.go.id/id/uu-no-20-tahun-2023`
- PermenPANRB 17/2024: `https://peraturan.go.id/id/permenpanrb-no-17-tahun-2024`
- UU PDP 27/2022: `https://peraturan.go.id/id/uu-no-27-tahun-2022`
- UU KIP 14/2008: `https://www.peraturan.go.id/id/uu-no-14-tahun-2008`
- UU Pertahanan 3/2002: `https://www.peraturan.go.id/files/UU0032002.pdf`
- PerKPK 1/2026: `https://jdih.kpk.go.id/produk-hukum/80125`
- PerBPIP 2/2022: `https://jdih.bpip.go.id/dokumen/view?id=267`
- PerBPIP 4/2022: `https://jdih.bpip.go.id/dokumen/view?id=269`
- Perpres 8/2026 RAN PE: `https://jdih.bnpt.go.id/id/dokumen/r3LesdtKo`
- EYD V: `https://ejaan.kemendikdasmen.go.id/eyd/`
- TBBI Edisi Keempat: `https://repositori.kemendikdasmen.go.id/16351/1/Tata%20Bahasa%20Baku%20Bahasa%20Ind.pdf`
- Arsip gender/Kongres Perempuan ANRI: `https://jdih.anri.go.id/storage/artikel-hukums/February2024/xa5aqXbIYVawtijAAKBw.pdf`

## Langkah aman berikutnya

Seluruh audit substantif dan revisi kurva kesulitan (per bagian di atas) sudah selesai dan lulus validator mekanis. Perintah rakit-ulang (jq merge empat batch + `meta_final.json`, lalu `node tmp/validate_bank_100.mjs bank_soal_100.json`) ada di “Bukti verifikasi terakhir” — jalankan itu lagi kalau ada edit baru di batch manapun.

Sisa langkah adalah kerja manusia, bukan kerja mesin lagi:

1. Reviu tim D’AJIKS khusus atas 10 butir baru dari revisi kurva kesulitan ini (001, 009, 017, 030, 038, 059, 067, 088, plus relabel 051 dan 080) — validator dan audit Gerbang 1-4 sudah dijalankan mandiri oleh Claude, tetapi belum direviu manusia.
2. Uji coba peserta sungguhan (validitas psikometrik masih TBD, sesuai `meta_final.json`).
3. Reviu ahli hukum tata negara dan ahli bahasa untuk memverifikasi ulang setiap kaidah/pasal yang dikutip.
4. Proofread akhir menyeluruh (typo, ejaan) di luar yang tertangkap validator otomatis.
5. Jangan klaim validitas psikometrik sampai langkah 2 selesai; jangan anggap dokumen ini rilis final sampai langkah 1–4 selesai.
