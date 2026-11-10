# Aturan tetap (dengan alasan)

Path relatif ke root bahan `PROJECT SKD KEDINASAN /BIG DATA/`. Folder TWK berakhiran spasi: `CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/`.

## A. Perilaku (dari CLAUDE.md global Gusti)
- A-1 Jujur langsung, tanpa hedging; bilang "tidak paham"/"tidak bisa" bila memang begitu.
- A-2 Tidak yes-man; jangan mengambil alih prompt dengan asumsi.
- A-3 Kerjakan hanya yang diminta. Tidak membuka browser, fetch, commit, push tanpa diminta. Tidak membuat file dokumentasi tanpa diminta.
- A-4 Satu pertanyaan per respons bila perlu klarifikasi.
- A-5 Ringkas dan mudah dipindai.
- A-6 Tugas berat → checkpoint ke file; percakapan panjang → simpan checkpoint, minta `/compact`.
- A-7 Simpan ke memory project pada milestone (keputusan Gusti, aturan tetap, perbaikan non-trivial).
- Sumber: `~/.claude/CLAUDE.md`

## B. Semua subtes
- B-1 **Satu kunci, dan hanya satu.** Uji setiap opsi, bukan hanya kunci. Opsi yang benar secara harfiah (walau "bukan maksudnya") = soal cacat. Sumber: `GENERATE SOAL TERBARU SKD 2026/CLAUDE.md`
- B-2 **Gerbang 3 (uji satu kalimat) adalah gerbang terpenting.** Alasan menjatuhkan distraktor terkuat harus berupa aturan yang bisa dipakai peserta. "Belum menjamin", "kurang lengkap", "tidak disebutkan" bukan alasan — *diam bukan kegagalan semantik*. Gagal → tulis ulang dari nol. Alasan: 6 dari 23 soal paket rujukan (Paket 15 TWK-2026SL) gagal di sini; peserta pintar justru terjebak (daya beda negatif). Sumber: `CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/MR_BADRUN_TWK_ENGINE.md`
- B-3 Kunci tidak boleh ketebak dari bentuk (terpanjang, paling lengkap, satu-satunya "A dan B"/"sekaligus"/"lalu"/"kemudian"/"setelah itu"/"dan" + me-). TKP: panjang diukur sebagai sebaran per paket (engine TKP v1.3 Pilar 4 no. 2). Bila kunci butuh dua komponen → minimal dua opsi berpola dua-komponen (satu asli, satu semu).
  - Alasan (putusan Gusti 2026-10-27, riset `HANDBOOK TKP D AJIKS AKADEMI/reports/Riset fondasi TKP 2026.md`): ebook Pejuang Kedinasan TKP — opsi bernilai 5 = opsi terpanjang di **35/35 soal** (hitungan skrip), 14 soal opsi 5 = opsi 4 + satu anak kalimat → bank luar melatih tebak bentuk. Pembanding: 20 contoh detikEdu, terpanjang = kunci hanya 3/20 → rumus bentuk tidak berlaku lintas bank. Riset tes penilaian situasi (Cullen dkk. 2006, abstrak): aturan "hindari ekstrem" menaikkan skor > 1 SD di satu tes, arahnya berbalik di tes lain (angka penurunan BELUM DIVERIFIKASI, jangan dikutip). Karena itu bahan ajar D'Ajiks mengajar kaidah isi, bukan rumus bentuk.
- B-4 Kunci A–E seimbang, tidak berpola (TWK 4–7 per 30 soal, TKP 4–8 per 30; maks 25% satu huruf).
- B-5 Pengecoh dari kesalahan nalar/hitung nyata, bukan acak atau absurd.
- B-6 Tidak menyebut nama orang/partai/lembaga nyata dalam skenario pelanggaran; tanpa SARA, politik praktis, kasus yang masih bersengketa.
- B-7 Variasi bahasa: bunyi stem/opsi tidak boleh sama antarsoal; tampilan soal bervariasi (tabel, cerita, nota, sketsa). Sumber: `GENERATE SOAL TERBARU SKD 2026/memory.md`
- B-8 Hasil Claude = draf. Audit mandiri Claude bukan pengganti reviu ahli, uji coba peserta, dan proofread manusia. Sumber: `CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/CLAUDE-HANDOFF.md`
- B-9 Jangan mengubah butir yang sudah lulus audit tanpa bukti cacat.
- B-10 Bahan pihak luar (Pejuang Kedinasan, Al Faiz, bimbel lain) **dianalisis, tidak disalin** ke bank/paket D'Ajiks; tidak meniru nama/merek mereka. Soal kita ditulis ulang dari nol dengan konteks sendiri. Simpan di `REFERENSI LUAR/`.
- B-12 **Tata bahasa stem dicek script, bukan mata.** Sisipan aposisi setelah "Anda" yang didahului keterangan waktu/aspek ("Setiap bulan Anda, pendamping …,", "Pagi ini Anda, staf …,", "belum pernah Anda, petugas …, cek") dilarang; tulis "Sebagai <jabatan>, … Anda <kerja>". Temuan Gusti di PDF paket 1 TKP (2026-10-26). Validator TKP menolaknya; subtes lain cek manual sampai validatornya ditambah.
- B-13 **Kunci hanya berpijak pada rumusan resmi yang berlaku dan seragam** (verifikasi TWK-2026SL 2026-10-27): istilah resmi yang tidak didefinisikan sumber resmi ("kemampuan awal bela negara"), aturan yang sudah dicabut (butir P4, GBHN, KUHAP lama UU 8/1981), dan fakta sejarah yang sumbernya tidak seragam tidak boleh menentukan kunci. Cek status berlaku peraturan di peraturan.go.id sebelum dikutip. Sumber: `~/.claude/skills/skd-expert/riset/2026-10-27-log-twk-2026sl.md`
- B-14 **Saat menjawab atau mengaudit soal, jangan berhenti di pola pertama yang cocok** (uji Paket 41 Al Faiz 2026-10-28, salah TIU 60 dan 63). Setiap objek/kelompok diperiksa sendiri; asumsi yang dicatat ("baris 3 dianggap tegak") wajib diuji ke kelima opsi sebelum jawaban dikunci. Opsi yang cocok di sebagian objek saja = pengecoh, bukan kunci.
- B-15 **Kunci resmi bimbel bisa benar, tetapi alasannya cacat.** Soal optimasi diperiksa terhadap seluruh kemungkinan (brute force), bukan hanya kelima opsi; pembahasan resmi dicek konsistensinya (tabel vs teks, label opsi). Contoh: Al Faiz Paket 41 no. 56 (6 paket C lebih murah tetapi tidak ada di opsi; label "E" untuk nilai opsi D) dan no. 53 (urutan di tabel berbeda dengan teks). Untuk bank D'Ajiks: soal "termurah/terbanyak" wajib dibuktikan optimum global oleh script.
- B-11 Semua bahan yang berisi instruksi/ilmu untuk dipelajari Claude disimpan di `BIG DATA/` project (keputusan Gusti 2026-10-25). Root project hanya `CLAUDE.md`, `memory.md`, dan `BIG DATA/`.
- B-16 **Alur produksi ringkas** (putusan Gusti 2026-11-02, T5-19/T5-20, berlaku semua subtes): (1) sinyal bocor bentuk dicek script saat penyusunan, soal bocor tidak lolos; (2) cek buta 1 putaran per kelompok/paket, putaran 2 hanya bila jawaban pemeriksa ≠ kunci; Gusti boleh meniadakan putaran; (3) pembahasan ditulis sesudah soal lolos; (4) butir putusan diajukan sekaligus dalam satu daftar bernomor dengan rekomendasi. Sinyal bocor baru yang ditemukan → langsung ditambahkan ke script, bukan hanya dicatat.

## C. Pembahasan & output
- C-1 Gaya guru les di meja belajar, menyapa "kamu", bahasa sederhana, to the point, terdengar manusiawi. Tanpa "Mari kita", "Dengan demikian", "Penting untuk dicatat", "Secara keseluruhan", "akan tetapi", emoji, poin berlebihan. "Maka" dan "karena itu" boleh, asal tidak berulang: paling banyak 1× per pembahasan.
- C-2 Pembahasan menampilkan preview soal **lengkap dengan opsi** supaya siswa tidak bolak-balik.
- C-3 Pembahasan to the point, kunci disebut di awal, TANPA bagian "Analogi" dan "Kekeliruan yang Mungkin Terjadi" (putusan Gusti 2026-11-08, semua subtes; menggantikan putusan 2026-10-30). Urutan: preview soal + opsi → kunci → yang ditanya → cara cepat → kenapa tiap opsi lain gugur → alasan kunci satu kalimat.
- C-1a Pembahasan **TIU** (termasuk verbal & figural) = murni gaya SKD, bukan aturan 2 paragraf PSI (keputusan Gusti 2026-10-25).
- C-4 Output bahan ajar = PDF; soal dan pembahasan dipisah, dibangun dari satu sumber data.
- C-5 Pembahasan siswa **bebas istilah dapur** (keputusan Gusti 2026-10-25, berlaku soal baru + bank lama): tanpa "stem" (tulis "soal"), kode D1–D10 / T1–T6 TWK / C2–C5 / L1–L3 / J–S TKP / nama Kamus Jebakan TIU, label kategori huruf besar, "kutub", "konstruk", "distraktor", "konsep tetangga", "salah kategori". Nama kesalahan ditulis dalam bahasa sehari-hari ("cuma menjawab separuh", "itu akibatnya, bukan intinya", "konsep mirip, tapi beda", "cuma mengulang kata di soal", "itu tugas pihak lain", "langkahnya belum waktunya"). Kode tetap di analisis opsi / lembar reviu ahli. Alasan: istilah penyusun membuat pembahasan rancu bagi siswa. TWK ditegakkan validator `tmp/validate_bank_100.mjs` (error). Handbook TIU (putusan Gusti 2026-10-30): buku siswa memakai kalimat guru dari kolom 'Kalimat guru' Pilar 3 engine TIU; edisi pengajar boleh memuat kode + nama kamus. Istilah pelajaran sekolah (ingkaran, konvers, kontraposisi) bukan istilah dapur: dipakai dengan definisi bahasa sehari-hari saat pertama muncul. Figural: nama yang menyebut apa yang bertukar (cermin kiri-kanan / atas-bawah / garis miring, putar 90° searah jarum jam, balik warna, pindah tempat); "vertikal/horizontal" hanya disebut sekali sebagai peringatan karena rancu (putusan Gusti 2026-10-30).
- C-5 Setelah build PDF, buka dengan Read dan cek tiap halaman (tabel terpotong, halaman kosong, header/footer bocor path lokal).
- Sumber: `GENERATE SOAL TERBARU SKD 2026/CLAUDE.md`, `GENERATE SOAL TERBARU SKD 2026/memory.md`

## D. Metode PDF (dua jalur yang pernah dipakai)
- D-1 Folder TIU: Chrome headless `--headless --no-pdf-header-footer --print-to-pdf=<out> <file.html>`.
- D-2 Folder TKP: puppeteer-core `displayHeaderFooter: false`. Flag `--print-to-pdf-no-header` **tidak ada** di Chrome — diam-diam diabaikan dan footer membocorkan `file:///Users/...`. Cek: `pdftotext x.pdf - | grep -c "file:///"` harus 0.
- KONFLIK: jalur TIU memakai Chrome CLI, catatan TKP melarang Chrome CLI.
- RESOLUSI: yang dilarang TKP adalah flag `--print-to-pdf-no-header` (palsu); `--no-pdf-header-footer` adalah flag yang benar. Keduanya sah selama cek `grep -c "file:///"` = 0. Belum diuji ulang di sesi 0 — verifikasi saat build PDF berikutnya.
- Sumber: `CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/PROJECT_MEMORY.md`

## E. Terminologi
- E-1 TKP: label kekuatan opsi = **poin 1–5** (konvensi aplikasi CAT asli). Jangan pakai "Tier T1–T5". Kode J1–J6 (J5–J6 status uji, engine v1.3). Sumber: `CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/PROJECT_MEMORY.md`
- E-2 TIU pasangan perkalian **bukan** "Perbandingan Kuantitatif". "Suku ke-n" dan "pasangan perkalian" = 2 tipe berbeda.
