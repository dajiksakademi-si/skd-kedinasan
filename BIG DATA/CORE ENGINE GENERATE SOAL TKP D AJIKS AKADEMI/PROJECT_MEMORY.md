# PROJECT MEMORY — Engine Generate Soal TKP

Catatan konteks proyek ini. Baca file ini di awal sesi baru biar gak ulang dari nol.

---

## Apa proyek ini

Bangun engine generate soal TKP (Tes Karakteristik Pribadi, salah satu subtes SKD CPNS/PPPK)
level HOTS — setara materi bimbel profesional, bukan bank soal generik.

**Isi folder ini:**
- `ENGINE_GENERATE_SOAL_TKP.md` — spesifikasi engine (gaya system-prompt), v1.1+. Struktur:
  Pilar (aturan konstruksi) / Gerbang (gate kualitas) / Prosedur (langkah generate). Ini SUMBER
  KEBENARAN — baca ulang file ini tiap mau generate soal baru, jangan andalkan ringkasan di sini
  karena isinya bisa direvisi.
- `SOAL TKP.txt`, `doc (1).txt`, `doc-v2.txt` — korpus 24 soal TKP asli, dipakai reverse-engineer
  taksonomi awal (tag dimensi, pola distraktor, jenis jebakan).
- `Bank_Soal_TKP_HOTS_12.html` / `.pdf` — batch 1, 12 soal uji (2 per dimensi), dibuat 27 Agustus
  2026 untuk verifikasi tim ahli.
- `Bank_Soal_TKP_HOTS_12_Batch2.html` / `.pdf` — batch 2, 12 soal baru dari nol (28 Agustus 2026),
  konteks beda total dari batch 1.
- **Cara generate PDF (WAJIB baca sebelum generate PDF baru):** pandoc/wkhtmltopdf/weasyprint
  TIDAK terpasang di mesin ini, jangan cek ulang. JANGAN pakai Chrome CLI headless
  (`--headless --print-to-pdf=... --print-to-pdf-no-header`) — flag `--print-to-pdf-no-header`
  **TIDAK ADA** secara nyata di binary Chrome (dicek pakai `strings` di Chrome Framework, nihil),
  jadi diam-diam diabaikan dan Chrome pakai header/footer default: bocorin `file:///Users/...`
  (path lokal mesin) di footer TIAP HALAMAN, dan kadang motong header "Soal No X" + badge dimensi
  di beberapa halaman (bug pagination jalur print-to-pdf lama). Bug ini ada sejak PDF pertama
  dibuat (27 Agustus 2026) dan baru ketahuan pas tim ahli reviu batch 2 (28 Agustus 2026) — kedua
  PDF lama sudah diregenerasi ulang buat nutup bocornya.
  **Cara benar:** pakai `puppeteer-core` (Node, sudah ada di mesin ini) yang manggil
  `page.pdf({ displayHeaderFooter: false, ... })` langsung lewat DevTools Protocol — parameter
  ini yang beneran mengontrol header/footer, bukan flag CLI. Script siap pakai:
  `gen_pdf.js` (scratchpad session), pola:
  ```js
  const puppeteer = require('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true,
    displayHeaderFooter: false, margin: {top:'18mm',bottom:'20mm',left:'16mm',right:'16mm'} });
  ```
  Kalau `puppeteer-core` belum ada di `node_modules` lokal: `npm init -y && npm install
  puppeteer-core --no-audit --no-fund` di folder scratchpad (jangan install `puppeteer` penuh,
  itu download Chromium sendiri, tidak perlu — sudah ada Chrome asli di mesin).
  Setelah generate, WAJIB verifikasi: `pdftotext -layout file.pdf - | grep -c "file:///"` harus
  0, dan `pdftoppm -png` beberapa halaman buat cek visual header/badge gak kepotong.

**Mekanisme engine saat ini (v1.1):**
- 6 dimensi resmi (KepmenPANRB 406/2026; dulu ditulis Permenpan RB No. 1/2023, tak terverifikasi): Profesionalisme, Pelayanan Publik, Jejaring Kerja,
  Sosial Budaya, TIK, Anti Radikalisme. Tag dimensi wajib nempel di kalimat penutup stem sendiri,
  contoh "...Sikap Anda adalah... (Profesionalisme)" — sesuai konvensi korpus asli, bukan cuma
  metadata terpisah.
- Distraktor diberi label **poin 1–5** (bukan "Tier T1–T5" — lihat bagian Terminologi di bawah).
- Poin 3, 4, 5 = klaster pertarungan utama: poin 3 dan poin 4 masing-masing wajib gagal di **satu
  Sumbu Presisi** yang berbeda satu sama lain (S1 Urutan/Timing, S2 Skop/Cakupan, S3
  Kewenangan/Peran, S4 Keberlanjutan/Institusionalisasi, S5 Verifikasi/Kepastian).
- Gerbang 3 (gate kualitas) minta DUA kalimat pembelaan (poin 4 vs kunci, poin 3 vs kunci), tiap
  kalimat wajib nunjuk Sumbu Presisi spesifik — bukan alasan kabur "kurang lengkap".

**Kenapa dibangun begini:** user mau soal yang poin 3/4/5-nya beneran susah dibedakan (istilah
user: "sensasi sulit yang membakar kepala"), diverifikasi tim ahli sebelum masuk bank soal produksi.

**Cara pakai ke depan:** generate soal baru mengikuti dokumen engine sebagai sumber kebenaran.
Selalu jalankan cek Gerbang (terutama Gerbang 2 cek-subset dan Gerbang 3 uji-dua-kalimat) sebelum
soal ditampilkan ke user — jangan cuma bilang aturannya ada.

---

## Standar kualitas HOTS (feedback user, sudah 2x ditegaskan)

Default generate soal TKP wajib hasilkan poin 3/4/5 yang beneran susah dibedakan, bukan "satu
distraktor kuat + dua pengisi gampang". Kesulitan datang dari tiap opsi gagal di Sumbu Presisi
yang berbeda dan presisi, bukan dari celah "kurang lengkap" yang kabur.

**Kejadian:** Setelah batch 6 soal, user komplain "belum HOTS, masih sangat gampang." Root cause
pas diaudit sendiri: 4 dari 6 soal, kunci itu literally kalimat opsi poin-4 ditambah satu klausa
("...sekaligus/serta/disertai..."). Artinya peserta bisa menang cuma dengan pola-cocok "pilih yang
nyebut dua tindakan sekaligus", nol penalaran domain — persis yang udah diperingatkan sendiri di
Pilar 4 (aturan anti-bocor) dokumen engine, tapi gak benar-benar dicek sebelum soal ditampilkan.

User lalu eksplisit minta kesulitan dinaikkan lagi: poin 3, 4, dan 5 harus sama-sama kerasa kayak
jawaban kuat (bukan cuma poin 4 vs 5) — lahirlah mekanisme Sumbu Presisi (dikodifikasi di Pilar 3
`ENGINE_GENERATE_SOAL_TKP.md`).

**Cara terap:** Sebelum nampilin soal TKP hasil generate, jalankan cek ini:
1. Apakah poin 5 (kunci) cuma kalimat poin 4 + satu klausa tempelan? Kalau ya, tulis ulang
   keduanya jadi dua mekanisme independen.
2. Apakah poin 3 dan poin 4 gagal di sumbu yang SAMA? Kalau ya, salah satu mubazir, tulis ulang.
3. Bisa gak jelasin dalam satu kalimat masing-masing kenapa poin 4 dan poin 3 kalah dari kunci,
   nunjuk frasa spesifik dan sumbu spesifik (bukan "kurang lengkap")?

Jangan nunggu user nangkep ini lagi — udah ditandai 2x (pola subset, lalu klaster kurang rapat),
perlakukan keduanya sebagai syarat tetap, bukan perbaikan sekali pakai.

---

## Terminologi (feedback user)

Label kekuatan distraktor pakai **poin 1–5** (sesuai konvensi skor 1-5 asli yang dilihat peserta
di aplikasi CAT TKP beneran), bukan jargon internal kayak "Tier T1-T5".

**Kejadian:** user bilang eksplisit "jangan pakai istilah t1 t2 pakai istilah poin saja" setelah
lihat dokumen engine pakai notasi T1-T5. Tampilan produk asli (screenshot aplikasi CAT TKP
beneran) nunjukin tabel "SKOR JAWABAN" polos nilai 1-5 per opsi — notasi T itu abstraksi buatan
sendiri yang gak perlu.

**Cara terap:** di manapun proyek ini nampilin/dokumentasiin ranking distraktor soal TKP, pakai
"poin N" (misal "poin 4") — jangan pernah pakai lagi label tier-T, bahkan sebagai singkatan
internal, karena kebiasaan itu gampang bocor ke output yang dilihat user. Kode jebakan J1-J4
(cocok-kata, geser beban, eskalasi prematur, formalisme kosong) TIDAK dikomplain, tetap dipakai.

---

## Feedback tim ahli batch 12 soal (27 Agustus 2026) — panjang & nada opsi bocor

Setelah `Bank_Soal_TKP_HOTS_12.pdf` (12 soal, 2/dimensi) direviu tim ahli: "TKP masih
terlalu mencolok jawaban benarnya." Dua leak konkret yang ditemukan:

1. **Panjang** — kunci hampir selalu opsi terpanjang.
2. **Nada/valensi** — opsi bernada positif vs negatif kebaca jelas (kunci selalu nada
   proaktif, distraktor selalu nada pasif), jadi peserta bisa pilih "yang paling positif"
   tanpa menalar isi. Tim ahli eksplisit minta: jangan semua opsi positif atau semua
   negatif — campur nada supaya makin susah nentuin jawaban benar.

**Root cause:** Pilar 4 no.2 (kunci dilarang terpanjang) sudah ada di v1.1 tapi cuma
larangan tanpa langkah verifikasi konkret (gak ada hitung-kata eksplisit di Gerbang 2).
Leak nada belum ada aturannya sama sekali sebelum ini.

**Fix diterapkan ke `ENGINE_GENERATE_SOAL_TKP.md`:**
- Pilar 4 no.2 diperkuat: wajib hitung kata tiap opsi, minimal satu distraktor
  (poin 3/4) sama/lebih panjang dari kunci.
- Pilar 4 no.10 (baru): nada bahasa dilarang berkorelasi dengan poin — pembeda harus di
  substansi tindakan (sumbu presisi), bukan di diksi "kedengaran baik/buruk".
- Gerbang 2 diperluas: cek panjang (hitung kata) + cek nada, bukan cuma pola gabungan
  "A sambil B".
- Gerbang 4 checklist tambah 2 item: kunci bukan opsi terbanyak kata (cek manual), nada
  gak berkorelasi rapi dengan urutan poin.

**Cara terap ke depan:** sebelum lepas soal TKP baru, selain 3 cek HOTS yang sudah ada
(lihat bagian di atas), tambah cek ke-4 dan ke-5: hitung kata tiap opsi (kunci bukan
terpanjang), dan baca ulang lima opsi khusus nada — kalau kunci satu-satunya yang
"kedengaran positif", tulis ulang.

**Status revisi:** `Bank_Soal_TKP_HOTS_12.html`/`.pdf` sudah direvisi (27 Agustus 2026) — kunci,
poin, sumbu presisi, dan konstruk semua 12 soal TETAP SAMA, cuma diksi opsi ditulis ulang:
- Kunci yang tadinya 20-25 kata (vs distraktor 12-17) dipangkas ke pita 15-19 kata, dan
  minimal satu distraktor (poin 3/4) dinaikkan sepanjang/lebih panjang dari kunci di tiap soal.
- Kata "Membiarkan" yang tadinya jadi opsi poin-1 di 9 dari 12 soal (tebakan instan: kata itu
  = jawaban salah) diganti macam-macam verba aktif (Menyerahkan, Mempersilakan, Mengikuti,
  Meneruskan, Melanjutkan, Menganggap) — cuma tersisa 1 kemunculan, sengaja ditempel ke opsi
  poin-4 (Soal 12) supaya kata itu tidak lagi berkorelasi rapi dengan poin rendah.
- PDF diregenerasi ulang dari HTML pakai jalur Chrome headless yang sama.
Belum direviu ulang oleh tim ahli — kirim ulang PDF ini buat verifikasi ronde kedua.

**Ronde 2 (28 Agustus 2026):** tim ahli konfirmasi nada positif/negatif sudah aman, tapi flag
lagi: kunci masih kalimat terpanjang. Diaudit ulang pakai skrip hitung-kata — ternyata di 6
dari 12 soal (1,2,3,5,8,12) kunci SERI dengan satu distraktor untuk kata terbanyak (bukan
strictly-longest, tapi tetap bocor karena examinee tinggal pilih salah satu dari 2 opsi
terpanjang = peluang 50%, bukan cek Gerbang 2 versi lama yang cuma bandingkan "apakah kunci
= max()" tanpa cek unique-max). Ditambal: 1 kata ditambahkan ke distraktor yang seri di
keenam soal itu supaya distraktor jadi strictly lebih panjang dari kunci — sekarang di
semua 12 soal ADA distraktor yang strictly lebih panjang dari kunci, bukan cuma sama panjang.
**Pelajaran buat Gerbang 2 ke depan:** cek "kunci bukan terpanjang" harus pakai strictly
`kunci_wc < max(distraktor_wc)`, bukan `kunci_wc <= max(distraktor_wc)` — seri masih kecolongan.

**Batch 2 (28 Agustus 2026):** dibuat 12 soal BARU dari nol (`Bank_Soal_TKP_HOTS_12_Batch2.html`/`.pdf`,
2 soal/dimensi, konteks beda total dari batch 1 — bukan reskin) langsung menerapkan aturan v1.1
final (Pilar 4 no.2 strict-inequality + no.10 nada). Proses: draf manual per soal (L1/L2/L3,
kunci + 4 distraktor dengan sumbu presisi berbeda utk poin 3/4, minimal 1 kode jebakan), lalu
WAJIB diverifikasi pakai skrip Python hitung-kata (bukan hitung manual — draf pertama meleset
di 8/12 soal karena estimasi manual tidak akurat, kunci masih ada yang 21-22 kata vs distraktor
15-18). Semua leak ditambal pakai Edit bertarget sampai skrip lapor 0/12 bermasalah:
`kunci_wc < max(distraktor_wc)` di semua 12 soal, spread ≤6 kata, semua opsi dalam 10-20 kata.
Verba poin-1 divariasikan (Membiarkan/Menunggu/Menunda/Mengabaikan/Mengikuti/Menahan/Mencatat/
Menegakkan/Menganggap/Menyimpan/Melanjutkan, maks 2× tiap verba), kode jebakan disebar
(J1/J2/J3/J4, bukan cuma J4), distribusi kunci A-E rata (2-3 tiap huruf), penutup stem
divariasikan (8 varian, maks 2× identik), kurva kesulitan 2 Rendah-Sedang/6 Tinggi/4 Sangat
Tinggi (≈20/50/30%).

**Cara terap ke depan:** kalau generate batch soal TKP baru lagi, JANGAN percaya estimasi
panjang kata manual saat menulis draf — selalu tulis dulu, lalu jalankan skrip verifikasi
(pola Python di atas: parse tiap `<li>` opsi, hitung kata, cek `kunci < max(lain)` +
spread ≤6 + band 10-20) sebelum soal ditampilkan/dikirim ke tim ahli.

**Ronde reviu Batch 2 (28 Agustus 2026, dari tim ahli via Codex):** status awal "belum layak
masuk bank final". Tiga kategori temuan:

1. **Mekanis:** Soal 3 opsi E kena ambigu hitung-kata (spasi/hitung "benar-benar" 1 vs 2 kata
   beda hasil count 20 vs 21) — ditambal dengan ganti ke kata tunggal ("sepenuhnya") biar gak
   ambigu lagi, bukan cuma pas-pasan di batas.
2. **Visual (lihat entri "Cara generate PDF" di atas):** ternyata bug generator PDF (flag CLI
   palsu), bukan cacat CSS/struktur — pindah ke puppeteer-core langsung beres tanpa ubah HTML.
3. **Substantif (isi 10 dari 12 soal ditulis ulang/direvisi):** kunci beberapa soal gagal Uji
   Gerbang 3 versi diperluas — bukan cuma "gagal di satu sumbu presisi dibanding poin 3/4", tapi
   kunci sendiri gak defensible: mekanismenya sandar ke sumber daya yang gak disebut stem (Soal
   1 — "petugas pendamping" muncul dari udara), sandar ke wewenang yang gak jelas dasarnya (Soal
   2 — kirim SPJ dgn selisih belum jelas tanpa otorisasi atasan; Soal 5 — pakai anggaran OPD lain
   tanpa dasar), atau merutekan ke unit/pihak yang salah level meski "terdengar masuk akal"
   (Soal 3 — kirim ke "tim IT" padahal ini masalah keuangan/saldo, bukan masalah sistem; Soal 6
   — realokasi bantuan tanpa konfirmasi ke LSM dulu, berisiko bikin kesalahan baru; Soal 10 —
   kunci cuma fix ke depan, gak nangani laporan darurat yang UDAH kejadian salah klasifikasi;
   Soal 11 — teguran terbuka di kelas berisiko mempermalukan siswa, dan solo tanpa koordinasi BK).
   **Pola akar masalah:** dokumen engine ini kuat di mekanika anti-bocor (Pilar 3/4: sumbu
   presisi, panjang, nada) tapi belum py eksplisit soal *kelayakan substansi* kunci di luar
   perbandingan dengan poin 3/4 — kunci bisa lolos gerbang 3 (menang lawan poin3/4) tapi tetap
   gak defensible di mata pembaca yang tau konteks dunia nyata (siapa berwenang apa, unit mana
   nangani apa). Ditambal di `ENGINE_GENERATE_SOAL_TKP.md` Pilar 4 no.11 (baru): kunci dilarang
   sandar ke sumber daya/wewenang yang gak disebut stem, dan kalau kunci sebut unit/pihak
   tertentu, unit itu harus levelnya beneran tepat menangani masalahnya — bukan cuma "terdengar
   masuk akal".

**Cara terap ke depan:** sebelum kunci final, selain 5 cek yang udah ada (HOTS klaster, panjang,
nada), tambah cek ke-6: baca ulang mekanisme kunci dan tanya "kalau saya orang yang paham
birokrasi/domain ini beneran, apa saya percaya tindakan ini sah dan levelnya tepat?" — kalau
jawabannya butuh asumsi yang gak ada di stem, atau salah kanal/wewenang, tulis ulang meski
kunci itu sudah menang telak lawan poin 3 dan 4 di atas kertas.

---

## Blocker 2 & 3 diputuskan (29 Agustus 2026) — sebelum lanjut ke 50 soal

Sesi lain (kemungkinan agent lain, tercatat di memory Claude sebagai "sesi 2026-08-29") bikin
dua validator mekanis di `tmp/`: `validate_soal.js` (parse HTML) dan `validate_tkp_json.js`
(parse JSON, target 50-item). Dua blocker ditemukan sebelum paket 50 soal boleh dijalankan:

**Blocker 2 — skrip ngarang target angka pas yang gak ada di engine doc, DIPUTUSKAN: longgarin.**
`validate_tkp_json.js` tadinya maksa: kunci tepat 10/huruf, tiap sumbu S1-S5 tepat 10x di
poin_3 DAN poin_4 masing-masing, dan tiap 10 kombinasi pasangan sumbu tepat 5x. Nol dari tiga
ini ada di `ENGINE_GENERATE_SOAL_TKP.md`. Keputusan (prioritas: jaga kualitas HOTS+++, jangan
korbanin konstruksi soal demi kuota buatan skrip):
- Level (kurva kesulitan): sekarang BAND sesuai Pilar 6 baru (lihat di bawah), bukan angka pas.
- Distribusi kunci A-E: soft "review" doang kalau di luar ~13-27%, BUKAN hard error — Pilar 6
  sendiri bilang ini "heuristik, sesuaikan bila user beri kisi lain", jadi gak boleh jadi gate.
- Sebaran sumbu per-peran (poin_3/poin_4) dan per-pasangan: diturunkan jadi info doang di
  output JSON (field `sumbu`/`pairs`), TIDAK divalidasi sebagai pass/fail — gak ada dasarnya
  di engine doc sama sekali, beda dari dua di atas yang minimal ada heuristik tertulis.

**Blocker 3 — Pilar 4 no.3 (kombo "sambil/sekaligus" cuma di kunci) — DIPERBAIKI di 7 soal.**
Ditemukan lolos 2 ronde reviu tim ahli + sesi hardening sebelumnya di kedua batch:
- Batch 1: Soal 3 (opsi C ditambah kombo semu "sambil mencatat keluhan warga untuk laporan
  bulanan"), Soal 5 (opsi A ditambah "sambil menunggu arahan lebih lanjut sebelum bertindak").
- Batch 2: Soal 2, 3, 5, 10, 12 — masing-masing satu distraktor (poin 1 atau poin 2) ditambah
  kombo semu bertema "menunggu/berharap sesuatu terjadi sendiri" atau "mencatat buat arsip" —
  dua elemen disebut tapi satu tempelan tanpa mekanisme nyata, sesuai resep Pilar 4 no.3.
- Setelah tambal, re-run word-count script + `validate_soal.js` tiap kali sampai 0 error
  (beberapa edit sempat geser spread >6 atau bikin kunci seri lagi — pola yang sama persis
  kayak [[tkp-verify-dont-estimate]], jangan pernah asumsikan satu edit "pasti aman").

## Kurva kesulitan diubah: Rendah-Sedang DIHAPUS (v1.2, 29 Agustus 2026)

Atas permintaan eksplisit user ("seluruh 6 aspek hasil generate soalnya berada di level
tinggi-sangat tinggi"), `ENGINE_GENERATE_SOAL_TKP.md` Pilar 6 direvisi: tier Rendah-Sedang
dihapus total, cuma Tinggi (55-65%) dan Sangat Tinggi (35-45%) yang valid. Alasan ditulis di
dokumen: level Rendah-Sedang secara desain izinin "sumbu presisinya jelas begitu dibaca ulang
sekali" — begitu satu soal kerasa lebih gampang dari yang lain dalam satu paket, itu jadi
sinyal tersendiri (peserta belajar pola paket, bukan menalar tiap soal).

Dampak ke batch existing: Batch 2 Soal 1 dan Soal 7 kelabelan Rendah-Sedang. Sebelum
relabel, DIUJI ULANG pakai Gerbang 3 (kalimat pembeda poin3 vs poin4 harus spesifik dan bisa
dikutip, bukan "kurang lengkap" kabur) — keduanya LOLOS uji itu dengan pembelaan yang sudah
spesifik sejak awal, jadi relabel ke Tinggi itu jujur (bukan cuma ganti label kosong tanpa
substansi). Kalau lain kali ketemu soal Rendah-Sedang yang GAGAL uji Gerbang 3 pas dicoba
upgrade, itu harus ditulis ulang isinya, bukan cuma diganti labelnya.

`tmp/validate_soal.js` dan `tmp/validate_tkp_json.js` diupdate mengikuti: `allowedLevels`
cuma `['Tinggi', 'Sangat Tinggi']`, dan level-distribution check di JSON validator jadi band
55-65%/35-45% dari total item (bukan hardcode 50 — pakai `items.length` biar tetap benar
kalau ukuran paket beda).

**Bonus fix — Batch 1 Soal 10 (Pilar 4 no.11, defect nyata, bukan false-positive):** examinee
"operator sistem informasi desa" (peran individu) tapi kunci lama menjanjikan "layanan keliling
petugas ke dusun-dusun secara berkala" — staffing/anggaran yang gak disebut stem dan bukan
wewenang operator sendirian. Kunci ditulis ulang jadi "Mengusulkan kepada kepala desa jalur
pengajuan manual disertai layanan keliling petugas..." — reroute ke kepala desa (otoritas yang
memang levelnya tepat mutusin staffing/anggaran), bukan diklaim operator sendiri. Perubahan ini
sempat bikin kunci baru kena Pilar 4 no.3 lagi (kata "disertai" jadi kombo baru) — ditambal
dengan kombo semu di opsi poin 1.

**Status setelah semua fix ini:** kedua batch (`Bank_Soal_TKP_HOTS_12.html/.pdf`,
`Bank_Soal_TKP_HOTS_12_Batch2.html/.pdf`) lolos `validate_soal.js` 0 errors 0 warnings, dan
lolos ulang word-count strict-inequality script 0/12 bermasalah di keduanya. PDF diregenerasi
lewat puppeteer-core, 0 leaked path terverifikasi di keduanya. Ini bukan berarti "final" —
Gerbang 3 substantif, jangkar realita ≥40%, dan leksikon per-dimensi masih manual gates yang
belum dimekanisasi (lihat `manual_gates_not_scripted` di output `validate_soal.js`).

## Gerbang 3 bottleneck dipersempit (bukan ditutup) — 29 Agustus 2026

User nanya bisa gak bottleneck "Gerbang 3 substantif" (poin di atas) dimekanisasi. Jawabannya:
sebagian bisa, sebagian gak akan pernah bisa murni skrip. Ditambahkan ke `validate_soal.js` dan
`validate_tkp_json.js`:
1. Larangan bahasa kabur eksplisit di kalimat "Kunci vs X" / field `alasan` — regex ban buat
   "kurang lengkap", "kurang proaktif", "belum tentu", dst (persis frasa yang dilarang literal
   di dokumen engine bagian Gerbang 3).
2. Cek cakupan per-huruf: dulu skrip cuma hitung "ada berapa banyak 'Kunci vs' " (≥2), gak cek
   APAKAH dua kalimat itu benar-benar soal opsi poin-3 dan poin-4. Sekarang wajib nama poin-3
   dan poin-4 masing-masing kesebut satu kalimat pembelaan.
3. Heuristik overlap kata: kalimat pembelaan harus share minimal satu kata bermakna (>4 huruf)
   sama teks opsi yang dijatuhkannya — proksi buat "kutip frasa spesifik dari opsinya sendiri"
   yang diwajibkan dokumen engine, bukan simpulan generik.

**Yang TETAP gak bisa dimekanisasi:** apakah argumennya itu BENERAN valid (opsi itu emang gagal
di sumbu yang diklaim, bukan sumbu lain atau gak gagal sama sekali) — itu butuh paham konteks
skenario, cuma bisa dibaca manual/LLM.

**Hasil jalanin ke 2 batch existing:** 0 errors di keduanya (gak ada bahasa kabur, cakupan
lengkap). 4 warning heuristik overlap-kata muncul (Batch1 Soal 6/10/11, Batch2 Soal 3) — sesuai
[[tkp-script-flags-need-adjudication]], SEMUA dibaca manual sebelum disimpulkan:
- 3 dari 4 (Batch1 Soal6/10/11) itu **false-positive murni** — kalimat pembelaannya parafrase
  yang akurat, cuma gak ada kata yang sama persis secara literal dengan teks opsi.
- 1 dari 4 (Batch2 Soal 3, "Kunci vs B") ternyata **bug beneran**: kalimat itu masih bilang
  kunci merutekan ke "tim IT internal", padahal paragraf pembahasan di atasnya sudah lebih dulu
  diperbaiki sesi sebelumnya jadi "unit keuangan" (fix reviewer soal salah kanal) — kelewat
  kesinkronkan pas edit sebelumnya. Sudah diperbaiki jadi "unit keuangan" juga.
- Presisi heuristik ini: 1-in-4, sama persis kalibrasi Pilar 4 no.11 di
  [[tkp-script-flags-need-adjudication]] — pola yang sama berulang: skrip narrowing itu bagus
  buat nemuin lead, tapi tetap wajib baca tiap flag sebelum ditulis sebagai defect.

PDF batch 2 diregenerasi ulang setelah fix ini, 0 leaked path terverifikasi.

---

## Proyek sepupu: TWK

Ada proyek paralel yang lebih matang di
`/Users/gustiputuyudawirashana/Downloads/PROJECT ENGINE GENERATE SOAL TWK /` untuk TWK (Tes
Wawasan Kebangsaan, subtes SKD lain). `MR_BADRUN_TWK_ENGINE.md` (v1.3) di situ referensi paling
matang — struktur Pilar (hukum konstruksi) / Gerbang (gate kualitas) / Prosedur (9 langkah
generate) / Larangan Mutlak — dipakai sebagai template struktur waktu bikin
`ENGINE_GENERATE_SOAL_TKP.md`.

**Perbedaan penting yang jangan ketuker:** mekanisme inti TWK = "5 opsi semua benar secara
faktual, pilih yang paling presisi" (diskriminasi pengetahuan). Mekanisme TKP = "5 opsi semua
tindakan masuk akal, diberi peringkat poin 1-5 berdasarkan optimalitas perilaku" (penilaian
situasional). JANGAN salin aturan TWK mentah-mentah ke kerjaan TKP — terjemahkan prinsip
dasarnya (jarak ketat antar opsi teratas), bukan mekanisme permukaannya (presisi faktual).

File lain di folder TWK (`PANDUAN_MURID_TWK.md`, `FILE SOAL TWK.txt`, `CAT_TWK.html`,
`CAT_TWK_TEST.html`, `cat-twk-app/`) itu panduan siswa, korpus soal mentah, dan aplikasi web CAT
(computer-adaptive test) yang jalan — relevan kalau proyek TKP nanti butuh panduan siswa sendiri
atau aplikasi delivery gaya CAT, tapi belum dibikin buat TKP per 27 Agustus 2026.

---

## Paket 80 soal dibuat (30 Agustus 2026) — Batch 2 + 68 soal baru

**Permintaan:** perbesar Batch 2 jadi paket 80 soal, distribusi per dimensi berurutan.

**Hasil:** `Bank_Soal_TKP_HOTS_80.html` / `.pdf` (87 halaman). Soal 1–12 = Batch 2 disalin
verbatim (tidak diubah isinya, hanya cover diperbarui ke v1.2). Soal 13–80 = 68 soal baru,
dikelompokkan berurutan per dimensi: 13–26 Profesionalisme, 27–40 Pelayanan Publik,
41–52 Jejaring Kerja, 53–62 Sosial Budaya, 63–70 TIK, 71–80 Anti Radikalisme.

**Angka akhir (output `validate_soal.js`, bukan estimasi):**
- Dimensi: Profesionalisme 16 · Pelayanan Publik 16 · Jejaring Kerja 14 · Sosial Budaya 12 ·
  TIK 10 · Anti Radikalisme 12 — persis grid Pilar 6 dikali 80.
- Level: Tinggi 48 (60%) / Sangat Tinggi 32 (40%), nol Rendah–Sedang.
- Kunci: A/B/C/D/E masing-masing 16.
- 0 errors. 1 warning tersisa (Soal 3 "Kunci vs B" word-overlap) — itu bawaan Batch 2 dan
  muncul identik saat validator dijalankan pada `Bank_Soal_TKP_HOTS_12_Batch2.html`, jadi
  bukan regresi dari paket ini.

**Dua aturan engine diperbarui karena paket besar menabrak batas yang ditulis untuk paket kecil:**
1. **Pilar 2 — cap penutup dibuat berskala:** dulu "maksimal 2 soal per paket memakai penutup
   identik". Dengan 5 penutup sah, itu memberi plafon 10 soal — mustahil untuk paket 80.
   Sekarang: **maksimal 2 per 12 soal dalam paket** (paket 12 → 2×, paket 30 → 6×, paket 80 →
   14×). `validate_soal.js` menghitung `cap = max(2, ceil(itemCount/12) * 2)`.
2. **Daftar penutup sah diperluas dari 5 jadi 8**, menambahkan tiga varian yang sebenarnya
   sudah dipakai Batch 2 tapi tidak pernah ikut terhitung validator: "Tindakan paling tepat
   adalah...", "Respons paling tepat adalah...", "Langkah pertama yang Anda ambil adalah...",
   plus "Apa respons Anda?". Sebaran akhir di paket 80: 12/12/10/11/9/8/8/9 — semua di bawah cap.

**Pola kesalahan yang berulang sepanjang penulisan 68 soal (catat, ini konsisten):** dari
seluruh error yang ditangkap skrip, **hampir semuanya satu jenis** — kunci tidak strictly lebih
pendek dari distraktor terpanjang (Pilar 4 no.2). Muncul di 3 dari 14 soal blok Profesionalisme,
7 dari 14 blok Pelayanan Publik, 3 dari 12 blok Jejaring Kerja, 3 dari 10 blok Sosial Budaya,
6 dari 8 blok TIK, dan 7 dari 10 blok Anti Radikalisme. Sebabnya struktural: kunci menutup dua
kutub sehingga secara alami tumbuh jadi kalimat terpanjang. **Cara kerja yang terbukti:** tulis
distraktor poin-4 sengaja 2–3 kata lebih panjang dari kunci sejak awal, jangan menunggu skrip
mengeluhkan lalu memendekkan kunci (memendekkan kunci berisiko membuang mekanisme yang justru
jadi alasan dia bernilai 5).

**Alat baru:** `tmp/build_summary.js` — menyusun 80 baris tabel Ringkasan Paket dari blok soal
(regex parsing-nya menyalin `validate_soal.js`), menggantikan penanda `<!--SUMMARY-->`. Rakitan
file dikerjakan `tmp/build.sh` dari potongan di `tmp/` (`part_head`, `part_cover`,
`part_soal_1_12`, `soal_new/*.html`, `part_footer`) supaya blok baru bisa ditambah tanpa
menyentuh 12 soal lama.

**PDF:** puppeteer-core, `displayHeaderFooter: false` (metode wajib) — 87 halaman, `pdftotext |
grep -c "file:///"` = 0, spot-check halaman 3 dan 45 bersih (header "Soal No N", badge dimensi,
blok meta, dan pembahasan tidak terpotong).

**Belum dilakukan:** reviu tim ahli atas 68 soal baru. Gerbang 3 (kebenaran argumen pembelaan)
tetap manual — skrip cuma memastikan kalimatnya ada, menyebut huruf yang benar, tidak memakai
frasa kabur, dan beririsan kata dengan opsi yang dijatuhkan.
