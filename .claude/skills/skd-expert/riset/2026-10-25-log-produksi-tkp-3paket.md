# Log produksi 3 paket TKP

Rencana: `2026-10-25-rencana-produksi-tkp-3paket.md`. Gate 0a (grid 9/9/7/7/6/7), 0b (diterapkan), 0c (cek buta = subagent Sonnet) selesai 2026-10-25.

## Status
| Paket | Blueprint | Batch selesai | Cek buta | Beku |
|---|---|---|---|---|
| 1 (pilot) | OK (biji 1022) | 5/5 (slot 1–45) | selesai 2026-10-26 (kunci 45/45, poin 4 23/45) — menunggu reviu Gusti per item | — |
| 2 | — | — | — | — |
| 3 | — | — | — | — |

## Paket 1 — batch 1 (slot 1–9) SELESAI 2026-10-26
- Blueprint `tmp/blueprint_paket1.json` dibuat (biji 1022, percobaan ke-23), disetujui Gusti dengan 1 ubahan: latar slot 3 → kampus kedinasan. Penyesuaian saat menulis (kuota tetap, `--cek` OK, dicatat di field `catatan` JSON): kode jebakan slot 1 ↔ slot 7 (J1/J6, sama-sama poin 4); slot 4 sumbu p3/p4 dibalik (S5/S4, ikut panduan 3v4); slot 8 poin 1 jenis f → d.
- File kumulatif: `tmp/paket1.html` (head dari part_head + CSS `.pembahasan-siswa`; soal disisipkan sebelum `<!-- AKHIR SOAL -->`).
- Hasil: validate_soal.js 0 error kecuali "Pasangan 14 does not exist" (diizinkan); panjang kata, kunci, opsi dua-langkah 9/9 persis blueprint; tebakan bentuk batch: terpanjang 0%, ke-2 22%, p4 terpanjang 11%, dua-langkah 17%. cek_lintas_paket.js 0 error, 1 peringatan (soal 6 vs B80#31 Jaccard 0.31, dicek: konstruk beda, kunci beda).
- Kunci batch 1: E C A B C E B A C. Dimensi: TIK 1 · PP 3 · Prof 3 · Sosbud 1 · AR 1.
- Gerbang 3 manual sudah ditulis per soal (Kunci vs p4 mengutip fakta penentu, Kunci vs p3). **Titik lemah (untuk reviu Gusti):** (1) soal 3 level ST mungkin terlalu mudah (kunci cukup kelihatan dari "daftar hadir manual"); (2) soal 6 kunci agak tersirat dari fakta waktu (Pilar 4 no. 6); (3) soal 5 kunci "menyepakati cara mempercepat antrean" belum menyebut bentuk caranya (risiko Pilar 4 no. 8); (4) soal 1 D(3) vs A(4) dan soal 9 A(4) vs E(3) bisa diperdebatkan; alasan sudah ditulis di reviu.
- Data pilot panduan 3v4: soal 4 (dibalik supaya cocok), soal 2/3/5/6/8/9 cocok, soal 1 dan 7 lemah (poin 4 juga rugi sekarang).
- Pasangan: soal 5 (Prof, kunci bicara langsung ke rekan, belum pernah ditegur langsung) ↔ **soal 14 wajib: Prof, konteks/peran lain, rekan sudah ditegur langsung + pola berulang merugikan → kunci lapor atasan**.
- Pembahasan siswa tanpa preview soal+opsi (soal ada tepat di atasnya di HTML); preview ditambahkan saat build PDF terpisah.
- Berikut: batch 2 (slot 10–18) atas perintah Gusti.

## Paket 1 — batch 2 (slot 10–18) SELESAI 2026-10-26
- Penyesuaian blueprint (putusan Gusti, `--cek` OK, dicatat di `catatan` JSON): latar slot 14 ↔ 19 (soal 14 wajib latar lain dari soal 5 → balai latihan kerja; 19 → kantor pajak daerah), slot 12 ↔ 20 (puskesmas tidak 3× berdekatan → 12 dinas kependudukan; 20 → puskesmas).
- Script cek per slot disimpan: `tmp/cek_slot.js <html> <blueprint> <dari> <sampai>` (kunci, kata per opsi, dua-langkah, poin, sumbu, jebakan, latar, penutup, tangga AR, pasangan). Slot 1–18: 18/18 OK.
- validate_soal.js: 0 error kecuali "Pasangan 42 does not exist" (diizinkan). Tebakan 18 soal: terpanjang 11%, ke-2 22%, p4 terpanjang 6%, dua-langkah 25%. Satu ubahan saat cek: soal 16 D pembuka "Menyerahkan" → "Mengandalkan" (peringatan validator: "menyerahkan" 3× di poin 1).
- cek_lintas_paket.js: 0 error; peringatan soal 2 vs 12 (Jaccard 0.27; konstruk beda urgensi vs relasi, kunci beda) + warisan 6 vs B80#31.
- Kunci batch 2: C E D B A D E D A. Kumulatif 18: A4 B3 C4 D3 E4.
- Isi: 10 label dosis farmasi · 11 kunjungan ganda dua bidang dinsos · 12 titipan berkas KTP-el · 13 flashdisk ber-virus (tangga TIK; poin 1 digeser ke "sibuk di samping") · 14 instruktur las meninggalkan peserta (pasangan 5, kunci lapor kepala seksi; tabel tindakan sejenis di reviu) · 15 pamflet tudingan agama di RS (konten menyebar) · 16 informasi hasil lab TBC · 17 kabar ceramah anti-pemerintah (kabar pihak lain, pasangan 42) · 18 candaan coret bantuan di rapat desa (ucapan/candaan).
- **Titik lemah (reviu Gusti):** (1) soal 15 A (lapor + menunggu keputusan tertulis) bisa dibela karena konten menyebar = pemicu lapor; kalahnya bersandar pada "menunggu" + Anda pengelola grup; (2) soal 18 pola poin 3/4 mirip soal 9 (lapor pihak lain / tegur belakangan), kunci sengaja dibedakan bunyinya; (3) soal 12 kunci memasukkan berkas ke antrean umum saat kuota hampir habis (kelima warga mungkin tidak terlayani hari ini, dianggap adil); (4) soal 15 kunci "menemui langsung dua perawat" mekanismenya tipis (Pilar 4 no. 8); (5) panduan 3v4 lemah di soal 15 dan 18 (rugi poin 4 juga terasa sekarang).
- **Syarat soal 42 (pasangan 17):** AR, tangga "ajakan/tindakan nyata" (blueprint), peran/konteks lain dari terminal; kadar bukti dilihat/didengar sendiri → kunci tolak + lapor, kontras dengan 17 (kabar tangan kedua → serahkan untuk dicek).
- Backup paket1.html pra-batch 2: scratchpad sesi 8a7f1e66 (sementara).
- Berikut: batch 3 (slot 19–27) atas perintah Gusti.

## Paket 1 — batch 3 (slot 19–27) SELESAI 2026-10-26
- Penyesuaian blueprint (`--cek` OK, dicatat di `catatan` JSON): latar slot 27 ↔ 43 (putusan Gusti; 19 dan 27 kembar kantor pajak + TIK ST) → 27 unit TI instansi, 43 kantor pajak daerah; slot 25 sumbu p3/p4 dibalik (S3/S4, ikut panduan 3v4: tambal tiap bulan = rugi nanti).
- Cek: cek_slot 27/27 OK; validate_soal.js 0 error kecuali Pasangan 42 dan 34 (diizinkan); peringatan tinggal J6 3/5 di poin 2 (sementara: setelah soal 42 jadi 3/6 = 50%, lolos) + pasangan baru 1. Tebakan 27: terpanjang 15%, ke-2 19%, p4 terpanjang 15%, dua-langkah 20%. cek_lintas_paket.js 0 error (peringatan warisan 2 vs 12, 6 vs B80#31).
- Ubahan saat cek: 24 kunci "Menanyakan … langsung" → "Meminta bidang perencanaan menjelaskan …" (fakta berbagi kata "langsung" + pembuka "menanyakan" 60% di poin 5); 25 A dan 23 A tidak lagi dibuka "Menunggu" (5/5 di poin 1); 22 B "Melaporkan" → "Menyampaikan" (60% di poin 4).
- Kunci batch 3: E E C D C E D B A. Kumulatif 27: A5 B4 C6 D5 E7.
- Isi: 19 rekap NIK penunggak pajak untuk atasan (jalur kirim; pasangan 34) · 20 pasien perempuan menolak dokter laki-laki, pilihan dokter saat mendaftar · 21 berkas kelahiran dari RS tidak lengkap, daftar periksa bersama · 22 keberatan denda kotak pengembalian, cocokkan lembar pengosongan · 23 ralat siaran pers ke 12 redaksi · 24 spesifikasi laptop "setara" ambigu sebelum pengumuman · 25 laporan relawan lansia telat 3 bulan, kesepakatan di pertemuan Jumat · 26 pendongeng tidak menerima jadwal, konfirmasi balik tiap pendongeng · 27 verifikasi dua langkah di ruang tanpa sinyal, alat verifikasi fisik.
- **Titik lemah (reviu Gusti):** (1) soal 27 kunci cukup kelihatan karena soal menyebut kunci USB + "sistem mendukung" (risiko Pilar 4 no. 6; level ST mungkin terlalu mudah); (2) soal 23 urutan B(4) vs D(3) bisa diperdebatkan: D menjangkau 12 redaksi tetapi lewat pihak yang salah; (3) soal 22 dan 25 kunci memakai sumber daya yang disebut di soal (lembar pengosongan, pertemuan Jumat), agak tersurat; (4) soal 19 D: "staf penagihan" vs "pejabat yang menangani penagihan" bersandar pada beda staf/pejabat; (5) panduan 3v4 lemah di 26 (E rugi sekarang tipis).
- **Syarat soal 34 (pasangan 19):** TIK, kantor desa, tangga TIK, kunci B; permintaan data warga serupa tetapi pemintanya belum jelas sah → kunci memastikan peminta lewat kanal resmi (+ lapor). Kontras 19: peminta jelas sah, yang dipersoalkan jalur kirim. Jangan pakai pola phishing "mengaku atasan" (daftar konteks Al Faiz).
- Backup paket1.html pra-batch 3: scratchpad sesi 5ebae4a4 (`paket1_bak.html`, sementara).
- Berikut: batch 4 (slot 28–36) atas perintah Gusti.

## Paket 1 — batch 4 (slot 28–36) SELESAI 2026-10-26
- Penyesuaian blueprint (`--cek` OK, dicatat di `catatan` JSON): latar slot 35 ↔ 45 (putusan Gusti; kepegawaian 32/35/38 berdekatan + BPBD 42/45 dobel AR) → 35 BPBD, 45 bagian kepegawaian; slot 29 poin 1 f → e (isi opsi); slot 31 jebakan J5 C(p3) → B(p2).
- **Soal 31 ditulis ulang total**: versi pertama (konsumsi pelatihan, menu tanpa daging karena keyakinan) kena error lintas paket "konstruk kembar" dengan B80#59 (Jaccard 0.43, domain sama). Diganti: rapat penjelasan tender bentrok hari raya Galungan seorang calon penyedia.
- Cek: cek_slot 36/36 OK; cek_lintas_paket.js 0 error (peringatan baru 3 vs 36 Jaccard 0.29 dan 36 vs B80#71 0.25: dicek, konstruk + kunci beda). validate_soal.js: 6 error, semuanya **sementara** dan lunas oleh blueprint slot 37–45: Pasangan 42 + 41 belum ada, pasangan kontras 2/3 (jadi 4 setelah 41 dan 42), J6 3/5 di poin 2 (slot 42 J6 p3 → 3/6), J2 3/5 di poin 3 (slot 39/40/43 J2 p4 → 3/8), J5 3/5 di poin 2 (slot 45 J5 p4 → 3/6). Catatan: mulai 36 soal (≥ 30), validator menghitung isu tingkat paket sebagai error, bukan lagi peringatan. Tebakan 36: terpanjang 11%, ke-2 22%, p4 terpanjang 19%, dua-langkah 18%. Penutup: "tindakan paling tepat adalah" 6× (cap 8 di 45).
- Kunci batch 4: C D B E A D B B C. Kumulatif 36: A6 B7 C8 D7 E8.
- Isi: 28 lembar penilaian PKL untuk enam bengkel mitra (format + jadwal dirumuskan dengan wakil bengkel) · 29 tugas inventaris dari sekretaris camat bentrok layanan surat pindah (beri tahu atasan di awal + sepakati jam) · 30 KTP-el patah, blanko kosong, cadangan untuk korban bencana (surat keterangan pengganti hari ini) · 31 rapat penjelasan tender saat Galungan (siarkan + rekam + tanya tertulis sampai Jumat; pasangan 41) · 32 guru dari pulau, SK asli tertinggal (salinan dari arsip kantor + legalisir kepala subbagian) · 33 bahasa daerah di kelompok praktik BLK (sepakati bahasa instruksi kerja + tata tertib) · 34 petugas mengaku dari puskesmas minta data 312 lansia (telepon nomor yang tercatat di kantor + lapor kepala desa; pasangan 19) · 35 peringatan banjir telat dibaca dua kepala desa (tiap desa tunjuk penerima yang wajib membalas) · 36 angka luas tanam senior keliru (tunjukkan hasil ukur GPS sebelum laporan dikirim).
- **Titik lemah (reviu Gusti):** (1) soal 30, 31, 34 kunci cukup tersurat karena sarananya wajib disebut di soal (surat keterangan pengganti, sistem tanya tertulis, nomor resmi puskesmas); risiko Pilar 4 no. 6; (2) soal 35 D (usul instruksi camat) mungkin terlalu lemah untuk poin 3; (3) soal 31 B (minta bukti hari raya) vs D (tetap Rabu) urutan 2/1 bisa diperdebatkan: B dinilai lebih tinggi karena permintaannya masih diproses; (4) soal 34 tangga TIK digeser: D pasif = 1 karena tidak ada opsi berisiko murni (alasan di reviu); (5) soal 29 A (batasi loket ke berkas mendesak) dan soal 33 A (pindah kelompok + kepala balai) lebih lemah dari poin 4-nya.
- **Syarat soal 41 (pasangan 31, BERUBAH karena 31 ditulis ulang):** Sosial Budaya ST, humas instansi, kunci A, sumbu p3 S3 / p4 S2, J1 di D (p2). Jadwal kegiatan bentrok dengan hari raya agama seseorang, tetapi kehadiran langsung orang itu tidak tergantikan (mis. narasumber utama) dan tidak ada peserta lain yang terikat jadwal → kunci menggeser jadwal. Kontras 31: penjelasan bisa lewat rekaman + tanya tertulis dan peserta lain terikat tiket → jadwal tetap, akses disetarakan.
- Tabel tindakan sejenis tambahan: lapor atasan 36 D = 2 (rekan ada di kantor, belum diajak bicara) vs 14 A = 5 (sudah ditegur + pola berulang); nomor resmi 1 A = 4 (skop: dua akun guru tidak ikut dilaporkan) vs 34 B = 5 (verifikasi + lapor).
- Backup paket1.html pra-batch 4: scratchpad sesi 0b71d5ca (`paket1_bak.html`, sementara).
- Berikut: batch 5 (slot 37–45) atas perintah Gusti, lalu Gerbang 4 paket penuh.

## Paket 1 — batch 5 (slot 37–45) SELESAI 2026-10-26 · PAKET 1 PENUH 45/45
- Penyesuaian blueprint (`--cek` OK, dicatat di `catatan` JSON): latar slot 43 ↔ 45 (putusan Gusti; kepegawaian 38/45 dobel AR setelah tukar 35↔45) → 43 bagian kepegawaian (Sosbud), 45 kantor pajak daerah (AR).
- Alur: soal + meta ditulis dulu ke scratchpad, disisipkan ke salinan, cek_slot + cek_lintas_paket lolos **sebelum** pembahasan ditulis (lintas: 0 error, tidak ada peringatan baru). Satu ubahan: 43 C kurang 1 kata (+"khusus").
- Cek paket penuh (file asli): cek_slot 45/45 OK; validate_soal.js **0 error, 0 peringatan** (grid 9/9/7/7/6/7, level 27/18, kunci A9 B9 C9 D9 E9, 4 pasangan 5-14 · 17-42 · 19-34 · 31-41, J sebaran lunas: J2 4/8 di poin 4 = 50%, J6 3/6, J5 3/6); tebakan: terpanjang 11%, ke-2 20%, p4 terpanjang 18%, dua-langkah 19%; penutup maks 6× (cap 8). cek_lintas_paket.js 0 error (4 peringatan warisan: 2v12, 3v36, 6vB80#31, 36vB80#71).
- Kunci batch 5: A B D A A C B E D.
- Isi: 37 aplikasi surat daring kecamatan, 40 pengajuan ditolak karena foto > 2 MB (petunjuk di halaman unggah) · 38 rekan tetap duduk saat Indonesia Raya (tanya empat mata; AR dugaan) · 39 balai desa urutan permohonan, persekutuan doa + sanggar tari tak pernah kebagian (jadwal bulanan menyisihkan hari) · 40 pembaruan keamanan server 6 jam, tiga bidang (edarkan dua pilihan jam sebelum Rabu) · 41 siaran radio tarif retribusi jatuh Jumat Agung narasumber utama (geser siaran; pasangan 31) · 42 rekan senior BPBD membagikan formulir baiat ganti Pancasila, dilihat sendiri (lapor kepala pelaksana; pasangan 17) · 43 edaran pakaian adat Kamis, 40 pegawai luar daerah (tulis di petunjuk pelaksanaan) · 44 unggahan pungutan Rp50.000 di kasir RS (minta waktu + nomor kuitansi ke pengunggah) · 45 poster "pajak haram" di grup pegawai pajak (hapus + ingatkan pribadi; AR konten menyebar).
- **Titik lemah (reviu Gusti):** (1) 37 kunci agak tersurat karena soal menyebut "Anda dapat mengubah isi halaman aplikasi" (Pilar 4 no. 6 vs no. 11); (2) 38 label AR bisa diperdebatkan: tidak berdiri saat lagu kebangsaan bisa karena keyakinan/kesehatan (Sosbud?); tangga "dugaan" dipakai karena ada bisik-bisik "menolak negara"; (3) 40 urutan C(3) vs D(4) bisa diperdebatkan: C memilih jam yang mungkin aman, D minimal memberi tahu; C dinilai lebih rendah karena tidak ada yang dicek dan tidak ada yang diberi tahu; (4) 44 B (minta unggahan dihapus) mendekati tercela, masih dianggap "demi citra"; (5) 45 kunci tanpa lapor meskipun ambang lapor menyebut "menyebar" — ikut preseden soal 15 (tangga: konten menyebar = hentikan + rawat hubungan); (6) 43 kunci bergantung pada petunjuk yang masih harus ditandatangani sekretaris daerah.

### Gerbang 4 paket 1 (45 soal)
- [x] konstruk + kunci tidak kembar (validator + lintas). [x] level 27/18, nol Rendah–Sedang. [x] grid 9/9/7/7/6/7. [x] kunci 9 per huruf, tidak berderet 3×. [x] panjang + dua-langkah (validator). [x] jebakan: di poin 2/3/4, ≥ 15/45 di poin 3/4, tak ada kode > 50%. [x] 4 pasangan timbal balik, jarak ≥ 5. [x] jangkar realita ≥ 18 (blueprint).
- [ ] **Pembuka stem: "Anda …" 14× (soal 1–15, warisan batch 1–2)** — Gerbang 4 membatasi 2× per pola. Pola setelah "Anda" beda-beda ("Anda operator/petugas/staf/koordinator …"), tapi kata pertama sama. Pembuka lain: "Di", "Sebagai", "Seorang", "Setiap" masing-masing 2×. Batch 3–5 tidak menambah. **Putusan Gusti dibutuhkan:** terima (pola "Anda + peran" dianggap gaya baku) atau tulis ulang pembuka ±12 soal.
- Sebaran sumbu poin 4: S1 11 · S2 7 · S3 8 · S4 8 · S5 11 (rata-rata 9, batas ±35% = 5,9–12,2) → semua dalam batas.
- Tabel tindakan sejenis → skor → fakta pembeda:

| Tindakan | Soal = skor | Fakta pembeda |
|---|---|---|
| lapor atasan/pimpinan | 14 A=5 · 42 C=5 · 38 A=4 · 36 D=2 · 44 A=4 · 45 C=2 | 5 bila sudah ditegur + pola berulang (14) atau ajakan nyata dilihat sendiri (42); 4 bila baru dugaan/aduan belum dicek (38, 44); 2 bila rekan ada dan belum diajak bicara (36) atau keputusan dilempar (45) |
| menggeser jadwal demi hari raya | 31 A=4 · 41 A=5 | 31: dua peserta sudah terikat tiket Rabu, penjelasan bisa lewat rekaman + tanya tertulis; 41: narasumber tak tergantikan, separuh acara telepon langsung, pengumuman belum disebar |
| rekaman sebagai pengganti hadir | 31 C=3 · 41 B=4 | 31 C datang sesudah tanya jawab ditutup; 41 B tidak bisa menjawab telepon pendengar |
| serahkan untuk dicek vs lapor | 17 D=5 · 42 C=5 | 17 kabar tangan kedua → serahkan untuk dicek; 42 dilihat sendiri + berulang → lapor |
| bicara langsung / tegur ke yang bersangkutan | 5 C=5 · 38 B=5 · 14 D=2 | 5 dan 38: belum pernah diajak bicara; 14: sudah ditegur langsung dan polanya berulang, jadi menegur lagi = 2 dan lapor = 5 |
| nomor/kanal resmi | 1 A=4 · 34 B=5 | 1: dua akun guru tidak ikut dilaporkan; 34: verifikasi + lapor |

- Catatan "menunggu/menunda" (alasan + batas di reviu tiap soal): 1D=3 · 3B=1 · 10B=2 · 12C=1 · 15A=4 · 19A=1 · 21B=1 · 22B=4 · 37D=2 · 39E=1 (menunggu keberatan tertulis) · 42D=4 (menunggu bukti lebih kuat) · 45B=1. Skor 4 (15A, 22B, 42D) = menunggu sebagai bagian dari tindakan yang sudah berjalan, dengan batas yang jelas; skor 1 = menunggu tanpa batas padahal pemicu sudah ada di soal. Perlu dibaca ulang Gusti: 42D=4 vs 39E=1, dua-duanya menunggu tanpa batas waktu; pembedanya, D sudah berniat melapor dan mencatat, E tidak berbuat apa pun.
- Gerbang 3 manual: kalimat Kunci vs poin 4 (mengutip fakta penentu) dan Kunci vs poin 3 ditulis di reviu tiap soal 37–45; sumbu p3 ≠ p4 di semua soal.
- Backup paket1.html pra-batch 5: scratchpad sesi 4d44c661 (`paket1_bak.html`, sementara).
- **Status: paket 1 = 5/5 batch, siap cek buta** (subagent Sonnet, atas perintah Gusti). Putusan tertunda: pembuka "Anda" 14×.

## Paket 1 — cek buta SELESAI 2026-10-26 (Prosedur langkah 10, Gate 0c)
- Putusan Gusti: pembuka "Anda …" 14× → **cek buta dulu, tulis ulang ±12 pembuka (soal 1–15) nanti** bersama revisi item hasil cek buta (satu putaran edit + validate).
- Versi buta dibuat script (`tmp/buat_buta.py`, cek 45 soal + 0 sisa kata kunci/poin/skor). Penilai: subagent Sonnet, engine baris 25–224 + 360–388 saja, tidak membaca paket1.html. Banding: `tmp/banding.py`.
- **Hasil:** kunci sama 45/45 · poin 4 sama 23/45 · 22 item masuk reviu (poin 4 beda; tidak ada kunci beda). Kendall ≥ 4: 13 (5), 34 (5), 27 (4), 43 (4); 3: 19, 30. Tabel penuh + alasan penilai vs alasan kita per item: `riset/2026-10-26-cek-buta-tkp-paket1.md`.
- **Bacaan jujur:** 45/45 kunci sama bukan bukti valid. Penilai sendiri menyebut kunci tertebak dari bentuk ("membuat mekanisme baku / menyepakati bersama semua pihak": 25, 26, 28, 33, 39, 40) dan poin 1 mudah dikenali dari bunyi "menunggu/menyerahkan". Kemungkinan validator panjang/dua-langkah lolos tapi bocor lewat **jenis mekanisme** kunci. Belum diuji: penilai lain (manusia / model lain) atau uji tebak-bentuk khusus.
- Keyakinan rendah penilai: 5 (C vs E sama kuat), 17 (distraktor A/E lemah; B vs C nyaris sama), 32 (E gagal hanya bila legalisir wajib dibanding SK asli, tidak tertulis). Diperdebatkan: 4 (C saingi B), 31 (A vs C).
- Soal belum diubah. Menunggu putusan Gusti per item.

## Prompt sesi berikut — reviu hasil cek buta paket 1 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Cek buta paket 1 TKP selesai 2026-10-26 (kunci 45/45 sama, poin 4 23/45). Tugas sesi ini: reviu hasil bersama Gusti, per item.

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-26-cek-buta-tkp-paket1.md (tabel + 22 item beda + catatan penilai).
3. Log produksi ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md bagian "cek buta SELESAI".
4. ENGINE_GENERATE_SOAL_TKP.md v1.3.1: Pilar 3 (panduan 3v4), Pilar 4 (anti-bocor).
5. tmp/paket1.html hanya untuk soal yang sedang dibahas.

Tugas:
a. Satu pertanyaan per respons: putuskan dulu urutan kerja — (1) 22 item poin 4 beda, (2) catatan penilai 4/5/17/31/32, (3) bocor bentuk "mekanisme baku/kesepakatan" (25, 26, 28, 33, 39, 40), (4) tulis ulang pembuka "Anda" soal 1–15 (putusan Gusti: dikerjakan bersama revisi).
b. Per item: tampilkan soal + urutan kita vs penilai + alasan kedua pihak + usulanku (tetap / ubah skor / tulis ulang opsi). Gusti memutuskan; jangan ubah sebelum diputuskan.
c. Setelah semua putusan: terapkan, jalankan cek_slot, validate_soal.js, cek_lintas_paket.js; regenerate versi buta (tmp/buat_buta.py) bila perlu cek ulang.
d. Checkpoint log + memory.md tiap titik henti.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Ubah skill → cek.py "cek OK". Dekat batas context → tulis prompt sesi berikut di log + tampilkan di balasan + minta /compact.
```

## Prompt sesi berikut — cek buta paket 1 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Paket 1 TKP (pilot) sudah 45/45. Tugas sesi ini: cek buta paket 1 (Prosedur langkah 10, penilai = subagent Sonnet, putusan Gate 0c).

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md — bagian batch 5 + Gerbang 4 paket 1 (titik lemah semua batch, putusan tertunda pembuka "Anda" 14×).
3. ENGINE_GENERATE_SOAL_TKP.md v1.3.1: Prosedur langkah 10, Pilar 3 (panduan 1v2, 3v4), Tangga AR, Tangga TIK.
4. tmp/paket1.html (format blok soal: stem, options, meta, pembahasan, pembahasan-siswa).

Tugas:
a. Putuskan dulu bersamaku (satu pertanyaan): pembuka stem "Anda …" 14× — terima sebagai gaya baku, atau tulis ulang pembuka sebelum cek buta?
b. Buat versi buta di scratchpad dengan script (bukan manual): untuk tiap soal hanya nomor, dimensi, stem, opsi A–E; buang class "kunci", blok meta, pembahasan, pembahasan-siswa. Cek script: 45 soal, 0 sisa kata "kunci"/"Poin"/"skor".
c. Kirim versi buta ke subagent Sonnet (model sonnet) dengan engine Pilar 1–3 + Tangga AR/TIK (tanpa contoh soal paket 1). Minta per soal: tebakan kunci, opsi poin 4, urutan skor lengkap 5→1, satu kalimat alasan kunci. Subagent tidak boleh membaca tmp/paket1.html.
d. Bandingkan dengan kunci asli via script: tabel per soal (kunci sama/beda, poin 4 sama/beda, jarak urutan). Tiap beda masuk daftar reviu Gusti, dengan alasan penilai vs alasan kita. Tanpa ambang angka lulus; hasil "sama" bukan bukti valid.
e. Checkpoint log + memory.md. Jangan mengubah soal sebelum Gusti memutuskan per item.
f. Di akhir: tampilkan prompt sesi berikut lengkap di balasan + simpan di log.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Ubah skill → cek.py "cek OK". Dekat batas context → tulis prompt sesi berikut di log + tampilkan di balasan + minta /compact.
```

## Prompt sesi berikut — batch 5 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Lanjut produksi paket 1 TKP (pilot), batch 5 (slot 37–45, batch terakhir).

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md — bagian batch 1–4 (penyesuaian blueprint, titik lemah, syarat soal 41 dan 42).
3. ENGINE_GENERATE_SOAL_TKP.md v1.3.1 PENUH.
4. tmp/validate_soal.js, tmp/cek_lintas_paket.js, tmp/cek_slot.js, tmp/blueprint_paket1.json (slot 37–45; latar 45 = bagian kepegawaian setelah tukar 35↔45).
5. tmp/paket1.html soal 1–36 (format + gaya pembahasan siswa; jangan ulang konteks/latar/pola pembuka berdekatan; pembuka stem "Seorang …" dan "Setiap …" sudah 2×; cek kunci tidak kembar bunyi; pembuka opsi "menunggu/menanyakan/melaporkan/menyepakati" mepet sinyal bentuk; kunci pola "… bersama/dengan pihak X" sudah sering).
6. riset/2026-10-25-tkp-hots-al-faiz.md baris 113 + 167 (jangan ditiru).

Tugas:
a. Tunjukkan ringkasan slot 37–45 dari blueprint (cek latar berdekatan + pasangan; soal 41 = pasangan 31, soal 42 = pasangan 17, syarat di log); tunggu setuju.
b. Tulis slot 37–45 ke scratchpad; cek lintas paket di salinan SEBELUM menulis pembahasan (batch 4: soal 31 kena konstruk kembar B80#59, ditulis ulang); sisipkan ke tmp/paket1.html sebelum <!-- AKHIR SOAL --> setelah semua cek lolos di salinan.
c. Cek paket penuh 45: `node tmp/cek_slot.js tmp/paket1.html tmp/blueprint_paket1.json 1 45` semua OK; validate_soal.js 0 error (grid 9/9/7/7/6/7, level, kunci 7–11, J sebaran, pasangan ≥ 3 — error sementara batch 4 harus lunas); Gerbang 3 manual; Gerbang 4 paket (termasuk tabel tindakan sejenis + catatan "menunggu" + sebaran sumbu poin 4); cek_lintas_paket.js 0 error.
d. Checkpoint log + memory.md; status paket 1 = 5/5 batch, siap cek buta (subagent Sonnet, atas perintah Gusti).
e. Di akhir: tampilkan prompt sesi berikut (cek buta paket 1) lengkap di balasan + simpan di log.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Ubah skill → cek.py "cek OK". Dekat batas context → tulis prompt sesi berikut di log + tampilkan di balasan + minta /compact.
```

## Prompt sesi berikut — batch 4 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Lanjut produksi paket 1 TKP (pilot), batch 4 (slot 28–36).

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md — bagian batch 1–3 (penyesuaian blueprint, titik lemah, syarat soal 34 dan 42).
3. ENGINE_GENERATE_SOAL_TKP.md v1.3.1 PENUH.
4. tmp/validate_soal.js, tmp/cek_lintas_paket.js, tmp/cek_slot.js, tmp/blueprint_paket1.json (slot 28–36).
5. tmp/paket1.html soal 1–27 (format + gaya pembahasan siswa; jangan ulang konteks/latar/pola pembuka berdekatan; cek kunci tidak kembar bunyi; pembuka opsi "menunggu/menanyakan/melaporkan" sudah mepet sinyal bentuk).
6. riset/2026-10-25-tkp-hots-al-faiz.md baris 113 + 167 (jangan ditiru).

Tugas:
a. Tunjukkan ringkasan slot 28–36 dari blueprint (cek latar berdekatan + pasangan; soal 34 = pasangan 19, syarat di log); tunggu setuju.
b. Tulis slot 28–36 ke scratchpad, sisipkan ke tmp/paket1.html sebelum <!-- AKHIR SOAL --> setelah semua cek lolos di salinan.
c. Cek: `node tmp/cek_slot.js tmp/paket1.html tmp/blueprint_paket1.json 1 36` semua OK; validate_soal.js 0 error (kecuali Pasangan 42 / pasangan slot 31↔41 ke batch berikut); Gerbang 3 manual; cek_lintas_paket.js 0 error.
d. Checkpoint log + memory.md.
e. Di akhir: tampilkan prompt sesi berikut (batch 5) lengkap di balasan + simpan di log.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Ubah skill → cek.py "cek OK". Dekat batas context → tulis prompt sesi berikut di log + tampilkan di balasan + minta /compact.
```

## Prompt sesi berikut — batch 3 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Lanjut produksi paket 1 TKP (pilot), batch 3 (slot 19–27).

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md — bagian batch 1 dan batch 2 (penyesuaian blueprint, titik lemah, syarat soal 42).
3. ENGINE_GENERATE_SOAL_TKP.md v1.3.1 PENUH.
4. tmp/validate_soal.js, tmp/cek_lintas_paket.js, tmp/cek_slot.js, tmp/blueprint_paket1.json (slot 19–27).
5. tmp/paket1.html soal 1–18 (format + gaya pembahasan siswa; jangan ulang konteks/latar/pola pembuka berdekatan; cek kunci tidak kembar bunyi).
6. riset/2026-10-25-tkp-hots-al-faiz.md baris 113 + 167 (jangan ditiru).

Tugas:
a. Tunjukkan ringkasan slot 19–27 dari blueprint (cek latar berdekatan + pasangan); tunggu setuju.
b. Tulis slot 19–27 ke scratchpad, sisipkan ke tmp/paket1.html sebelum <!-- AKHIR SOAL --> setelah semua cek lolos di salinan.
c. Cek: `node tmp/cek_slot.js tmp/paket1.html tmp/blueprint_paket1.json 1 27` semua OK; validate_soal.js 0 error (kecuali Pasangan ke batch berikut); Gerbang 3 manual; cek_lintas_paket.js 0 error.
d. Checkpoint log + memory.md.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Ubah skill → cek.py "cek OK". Dekat batas context → tulis prompt sesi berikut di log + minta /compact.
```

## Prompt sesi berikut (2026-10-25)
```
Pakai skill skd-expert. Lanjut produksi 3 paket TKP: paket 1 (pilot), batch 1 (slot 1–9).

Baca dulu:
1. memory.md di root project, 3 bullet terakhir (Gate 0a/0b/0c selesai).
2. ~/.claude/skills/skd-expert/riset/2026-10-25-rencana-produksi-tkp-3paket.md §3–§5.
3. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md (log ini).
4. ENGINE_GENERATE_SOAL_TKP.md (v1.3.1) PENUH — terutama Pilar 1–6, Prosedur 10 langkah, 4 Gerbang, Format output, Contoh terbimbing.
5. tmp/validate_soal.js, tmp/blueprint_tkp.js, tmp/cek_lintas_paket.js.
6. Daftar "jangan ditiru" Al Faiz: riset/2026-10-25-tkp-hots-al-faiz.md baris 113 (cacat) + baris 167 (konteks Al Faiz yang tidak boleh dipakai).

Tugas:
a. Jalankan `node tmp/blueprint_tkp.js 1` → tmp/blueprint_paket1.json. Tunjukkan ringkasan slot 1–9; jangan tulis soal sebelum aku setuju blueprint.
b. Setelah setuju: tulis slot 1–9 ke file kumulatif tmp/paket1.html (format bank, field Fakta penentu, Pasangan, Tangga AR, Latar, pembahasan reviu + pembahasan-siswa).
c. Tiap soal: validate_soal.js 0 error (kecuali "Pasangan N does not exist" untuk pasangan di batch berikut), Gerbang 3 dibaca manual, cek_lintas_paket.js 0 error.
d. Checkpoint ke log ini + memory.md.

Aturan: satu pertanyaan per respons (AskUserQuestion, tandai Recommended). Tanpa commit. Bank lama tidak disentuh. Setelah mengubah skill, cek.py harus "cek OK". Kalau context mendekati batas, tulis prompt sesi berikut di log ini dan minta /compact.
```

## Prompt sesi berikut — batch 2 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Lanjut produksi paket 1 TKP (pilot), batch 2 (slot 10–18).

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md — bagian "Paket 1 — batch 1" (penyesuaian blueprint, titik lemah, syarat soal 14).
3. ENGINE_GENERATE_SOAL_TKP.md v1.3.1 PENUH.
4. tmp/validate_soal.js, tmp/cek_lintas_paket.js, tmp/blueprint_paket1.json (slot 10–18: kata per opsi, duaLangkah, jebakan, sumbu, poin1, penutup, latar).
5. tmp/paket1.html soal 1–9 (format + gaya pembahasan siswa; jangan ulang konteks/latar berdekatan).
6. riset/2026-10-25-tkp-hots-al-faiz.md baris 113 + 167 (jangan ditiru).

Tugas:
a. Tunjukkan ringkasan slot 10–18 dari blueprint; tunggu setuju.
b. Tulis slot 10–18, sisipkan ke tmp/paket1.html sebelum <!-- AKHIR SOAL -->. Soal 14 = pasangan soal 5 (Prof, peran/latar lain, rekan sudah ditegur langsung + pola berulang merugikan → kunci lapor atasan).
c. Cek: validate_soal.js 0 error (kecuali Pasangan ke soal batch berikut), panjang kata + kunci + duaLangkah persis blueprint (script cek per slot seperti batch 1), Gerbang 3 manual, cek_lintas_paket.js 0 error.
d. Checkpoint log + memory.md.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Ubah skill → cek.py "cek OK". Dekat batas context → tulis prompt sesi berikut di log + minta /compact.
```

## Paket 1 — reviu hasil cek buta (mulai 2026-10-26)
- Urutan (putusan Gusti): pola bocor dulu sebagai satu putusan, lalu per nomor 1→45 (tiap soal sekali: poin 4 beda + catatan penilai + pembuka "Anda" + pengecoh "sepakat").
- **Hitungan pola bocor (script scan opsi):** 12 opsi berbunyi menyepakati/mengajak/merumuskan dengan/bersama [pihak]; 10 = kunci (5, 11, 16, 21, 25, 26, 28, 29, 33, 40), bukan kunci hanya 26D(4), 17A(1). Tebakan "pilih opsi sepakat" kena 10/45; bila opsi itu ada, benar 10/11. 39 bukan pola ini (kunci sepihak sah) — penilai keliru memasukkan.
- **Putusan Gusti:** kunci tetap; di ±8 soal ber-kunci "sepakat", satu opsi poin 3/4 ditulis ulang ikut berbunyi sepakat tapi gagal di sumbu lain (S1 telat / S2 sebagian pihak). Tambah Pilar 4 no. 3a (status uji) + cek validate_soal.js: opsi "sepakat" bukan kunci ≈ jumlah yang kunci (tebakan ±50%).
- Status: belum ada soal diubah. Berikut: per nomor mulai soal 1.
- Putusan per nomor: 1–3 tetap, pembuka baru diterima (1: "Pagi ini seorang penelepon … ke ponsel Anda, operator data sekolah menengah pemegang akun admin …"; 2: "Seorang warga meminta salinan arsip tanah lama di kantor arsip daerah untuk sidang lusa, padahal … menurut urutan antrean yang Anda atur."; 3: "Rekap kehadiran 120 taruna sebuah kampus kedinasan harus Anda kirim dari bagian akademik ke bagian pengasuhan pukul 14.00 hari ini, …"). Belum diterapkan.
- 4: tetap (C sah poin 4 S4; perkuat B = C+klausa, langgar Pilar 4 no. 9). Pembuka baru: "Menjelang Natal dan tahun baru, arus penumpang terminal naik sehingga hampir semua petugas piket yang Anda koordinasikan di dinas perhubungan dibutuhkan, dan rekan-rekan mengusulkan …". Belum diterapkan.
- 5: E ditulis ulang = "Menegur rekan secara empat mata, lalu menyepakati dengannya cara mempercepat antrean mulai besok." (poin 3, S1: tiga pemohon sekarang tanpa tanda terima; pengecoh "sepakat" #1). D tetap 4 S4, A/B tetap. Pembuka: "Rekan senior di loket pelayanan pajak daerah, sebelah loket Anda, menerima berkas …". Pembahasan reviu+siswa E disesuaikan. Belum diterapkan.
- 6: tukar skor B=4 S5 (telepon, bukan cek lapangan), D=3 S3+J2 (verifikasi dipindah ke ketua kelompok). Opsi tetap. Pembuka: "Dari 40 nama penerima bantuan benih yang diajukan satu kelompok tani ke dinas pertanian, enam belum pernah Anda, petugas verifikasinya, cek ke lapangan, sehingga benihnya tertahan, sebab …". Belum diterapkan.
- 7: tukar skor A=4 S4 (kursi lipat tambal gejala, rugi nanti), D=3 S1+J6 (ulang cara gagal, rugi sekarang). Opsi tetap. Pembuka: "Selama musim ujian, banyak pelajar menandai meja ruang baca perpustakaan daerah dengan tas sejak pagi lalu meninggalkannya berjam-jam, sehingga … Anda koordinator ruang baca dan berwenang mengatur tata tertib ruang. Selama ini petugas …". Belum diterapkan.
- 8: tetap (D=4 S4 rugi nanti, C=3 S5 rugi sekarang; alasan penilai "tanpa panduan" berlaku untuk C dan D). Pembuka: "Tiga hari lagi tenggat laporan pertanggungjawaban dana kelurahan dengan format baru dari kabupaten, tugas yang baru diberikan kepada Anda sebagai staf keuangan kantor kecamatan." Belum diterapkan.
- 9: tukar skor E=4 S1+J5, A=3 S3+J3 (A lapor atasan tanpa pemicu J3 = maks 3; skor lama langgar engine). Opsi tetap. Pembuka: "Saat apel pagi yang Anda pimpin sebagai kepala regu penguji kendaraan di dinas perhubungan, seorang penguji senior berkata sambil tertawa …" (hapus "Saat apel," kalimat 2). Belum diterapkan.
- 10: sama penilai; pembuka diputuskan di akhir (kandidat jatah "Anda").
- 11: tukar + D ditulis ulang = "Menyepakati dengan tim itu kunjungan gabungan khusus bagi 15 keluarga yang sudah mengeluh." (poin 4 S2, pengecoh "sepakat" #2). C=3 S5 opsi tetap. Pembuka: "Lima belas keluarga lansia telantar di satu kecamatan mengeluh harus mengulang cerita yang sama karena dikunjungi dua kali dalam sepekan: oleh Anda, staf bidang rehabilitasi sosial dinas sosial, dan oleh tim bidang perlindungan sosial untuk keperluan lain." Belum diterapkan.
- 12: sama penilai; pembuka diputuskan di akhir.
- 13: E ditulis ulang = "Meminta kelompok tani mengirim ulang proposalnya lewat surel, lalu menyimpan flashdisk itu tanpa dicolokkan lagi." (poin 4 S3: pengelola jaringan tidak dilibatkan; E lama = ulang cara gagal). A/C/D tetap. Pembuka tetap ("Sebagai …"). Belum diterapkan.
- 14: tetap (E=4 S4 rugi nanti, B=3 S1 rugi sekarang; alasan penilai menyalahkan B). Pembuka: "Rekan instruktur kelas las di balai latihan kerja tempat Anda mengajar kerap meninggalkan peserta …". Belum diterapkan.
- 15: tetap (E = demi suasana = poin 2; A sah poin 4, konten menyebar = ambang lapor Tangga AR). Pembuka: "Sebuah pamflet yang menuding satu kelompok agama sebagai ancaman bagi negara tertempel di ruang ganti ruang perawatan rumah sakit daerah pagi ini; fotonya sudah beredar … Anda kepala ruang yang mengelola papan pengumuman serta grup pesan ruangan. Dua perawat …". Belum diterapkan.
- 16: A ditulis ulang = "Menyepakati dengan petugas pendaftaran agar pasien yang datang dari seberang diberi tanggal ambil hasil." (poin 3 S2, pengecoh "sepakat" #3). Pembuka: "Hasil pemeriksaan dahak TBC di laboratorium puskesmas tempat Anda bertugas baru jadi dalam tiga hari kerja, tetapi …". Belum diterapkan.
- Pembuka "Anda …" tersisa: 10 dan 12 (jatah 2, Gerbang 4).
- 17: E ditulis ulang (Gusti: perkuat poin 2) = "Menegur langsung petugas jaga malam itu malam ini agar berhenti memutar rekaman ceramah tersebut." (poin 2 +J5; J2 lama hilang). Lain tetap. Belum diterapkan.
- 18–20: tetap (poin 4 sama, beda hanya poin 1–3).
- 21: A ditulis ulang = "Menyepakati dengan petugas rekam medis rapat evaluasi kerja sama bulan depan untuk membahas berkas yang kurang." (poin 3 S1, pengecoh "sepakat" #4; J3 lama = langgar aturan J3 tanpa pemicu). D=4 S4 (opsi tetap). E=2 +J2 (beban ke orang tua). Belum diterapkan.
- 22: tetap (E=4 penilai langgar J3; B sah poin 4, salah kanal TI). 23–24: tetap.
- 25: E ditulis ulang = "Menyepakati format laporan dan tenggat baru dengan dua relawan yang terlambat lewat telepon minggu ini." (poin 3 S2, pengecoh "sepakat" #5). B=4 S4, C=2 J4, A=1 tetap. Belum diterapkan.
- 26: tetap (sudah ada pengecoh "bersama" D).
- 27: E ditulis ulang = "Meminta ketiga staf naik ke lantai atas setiap kali perlu kode verifikasi sampai penguat sinyal terpasang." (poin 4 S4; E lama & D satu kutub, E lama = tindakan berisiko Tangga TIK). B/C/D tetap. Belum diterapkan.
- 28: E ditulis ulang = "Merumuskan format penilaian tetap bersama perwakilan bengkel begitu semester depan dimulai dengan sepuluh mitra." (poin 3 S1, pengecoh "sepakat" #6; J1 lama hilang). B=2 +J4. A=4 S4 tetap. 29: tetap. Belum diterapkan.
- 30: C ditulis ulang = "Menyiapkan surat keterangan pengganti KTP-el untuk pedagang itu, lalu memintakan tanda tangan kepala seksi besok pagi." (poin 4 S1; C lama ambil blanko korban bencana = satu kutub + J2). E=3 sumbu S1→S2 (opsi tetap). A/D tetap.
- 31: tukar skor C=4 S1, A=3 S5 (gagal A tersurat: dua peserta bertiket Rabu). Opsi tetap.
- 32: E ditulis ulang = "Melegalisir sendiri fotokopi bawaan guru itu setelah mencocokkannya dengan arsip SK di bagian Anda." (poin 4 S3; E lama bersandar aturan tak tertulis). Lain tetap.
- Semua belum diterapkan. Berikut: 33.
- 33: A ditulis ulang = "Mengajak seluruh peserta menyepakati aturan bahasa kelompok pada evaluasi akhir pelatihan bulan depan." (poin 3 S1, pengecoh "sepakat" #7; J3 lama hilang). E=2 +J2. C=4 S3, B=1 tetap.
- Koreksi argumen: alasan penilai memang selalu membandingkan kunci vs poin 4-nya, jadi "alasannya menyalahkan pilihannya" BUKAN bukti tidak konsisten. Putusan 14/15/22/28 tetap berdiri atas dasar lain (panduan 3v4, definisi poin 2, J3); 25 dasarnya lebih tipis (B cara lazim), bisa dibuka lagi bila Gusti mau.
- 34: E ditulis ulang = "Menelepon nomor yang tertera di surat tugas itu untuk memastikan petugasnya, lalu menyerahkan daftarnya bila dibenarkan." (poin 4 S5; E lama = ulang cara gagal + tindakan berisiko). D=1 tetap (catat geser tangga TIK di reviu).
- 31 catatan terapan: field Fakta penentu ganti ke fakta yang menggugurkan C ("tanya jawab biasanya hanya berlangsung dalam rapat itu").
- 35: sama. 36: tetap. 37: tukar B=4 S1+J4, C=3 S2 (opsi tetap; fakta penentu disesuaikan).
- 38–39: tetap. 40: tukar C=4 S5, D=3 S1+J2 (opsi tetap). Pengecoh "sepakat" bukan kunci kini 9 (5E, 11D, 16A, 21A, 25E, 28E, 33A, 26D, 17A) vs 10 kunci → cukup, 29/40 tanpa pengecoh baru.
- 41, 44: tetap. 42: tetap (A=J6 tidak layak poin 4). 43: tetap (C naik ke sekda = J3 tanpa pemicu, maks 3). 45: tukar A=4 S4, E=3 S5+J5 (opsi tetap).
- **SEMUA PUTUSAN SELESAI 2026-10-26. Belum ada yang diterapkan.** Pembuka "Anda" yang dipertahankan: 10, 12.

### Ringkasan putusan (untuk diterapkan)
| Jenis | Soal |
|---|---|
| Pembuka baru saja | 1, 2, 3, 4, 8, 14, 15 |
| Tukar skor (opsi tetap) | 6 (B4 S5 / D3 S3+J2), 7 (A4 S4 / D3 S1+J6), 9 (E4 S1+J5 / A3 S3+J3), 31 (C4 S1 / A3 S5), 37 (B4 S1+J4 / C3 S2), 40 (C4 S5 / D3 S1+J2), 45 (A4 S4 / E3 S5+J5) |
| Tulis ulang opsi | 5E(3 S1), 11D(4 S2, + tukar C3 S5), 13E(4 S3), 16A(3 S2), 17E(2 +J5), 21A(3 S1; D→4 S4; E +J2), 25E(3 S2), 27E(4 S4), 28E(3 S1; B +J4), 30C(4 S1; E sumbu S2), 32E(4 S3), 33A(3 S1; E +J2), 34E(4 S5) |
| + pembuka baru | 5, 6, 7, 9, 11, 16 |
| Tetap | 10, 12, 18–20, 22–24, 26, 29, 35, 36, 38, 39, 41–44 |
| Engine/validator | Pilar 4 no. 3a (status uji): opsi berpola sepakat/bersama/mengajak/merumuskan dengan [pihak] — bukan-kunci ≈ kunci per paket; cek di validate_soal.js; ubah engine → changelog v1.3.2; skill reference tkp.md bila menyebut Pilar 4 → cek.py |
Tiap perubahan skor/opsi: perbarui baris Poin (skor + sumbu + J), Fakta penentu (31, 37, 40, 45 dan soal yang poin 4-nya berganti), Pembahasan Reviu (poin 4/3 + "Kunci vs"), Pembahasan Siswa (urutan skor, jebakan). Semua kalimat opsi baru tercatat persis di bullet per nomor di atas.

## Prompt sesi berikut — terapkan putusan reviu paket 1 (ditulis 2026-10-26)
```
Pakai skill skd-expert. Reviu cek buta paket 1 TKP SELESAI diputuskan 2026-10-26; tugas sesi ini: TERAPKAN putusan.

Baca dulu:
1. memory.md root project, bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md bagian "Paket 1 — reviu hasil cek buta" (bullet per nomor berisi kalimat opsi/pembuka baru persis + tabel "Ringkasan putusan").
3. ENGINE_GENERATE_SOAL_TKP.md v1.3.1 Pilar 3–4 (aturan J3, panduan 3v4, Pilar 4 no. 9).
4. tmp/paket1.html per soal yang diubah saja.

Tugas:
a. Salin cadangan tmp/paket1.html → tmp/paket1_pra_reviu.html dulu.
b. Terapkan per soal sesuai tabel: stem pembuka, opsi, baris Poin (skor+sumbu+J), Fakta penentu, Pembahasan Reviu, Pembahasan Siswa (bebas istilah dapur, gaya guru les, aturan CLAUDE.md). Jangan ubah yang "tetap".
c. Tambah Pilar 4 no. 3a (status uji) ke engine + changelog v1.3.2; tambah cek "opsi sepakat bukan-kunci ≈ kunci" di tmp/validate_soal.js. Bila reference skill berubah → python3 ~/.claude/skills/skd-expert/cek.py harus "cek OK".
d. Jalankan cek_slot.js, validate_soal.js, cek_lintas_paket.js. Error (mis. sebaran sumbu/J >50% satu poin, panjang 10–20 kata, posisi kunci terpanjang) → laporkan ke Gusti, satu pertanyaan per respons, jangan diakali diam-diam.
e. Regenerate versi buta (tmp/buat_buta.py) hanya bila Gusti minta cek buta ulang.
f. Checkpoint log + memory.md.

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Dekat batas context → tulis prompt sesi berikut di log + tampilkan + minta /compact.
```

## Paket 1 — TERAPAN putusan reviu (mulai 2026-10-26)
- Cadangan: `tmp/paket1_pra_reviu.html`. Penerapan lewat script ganti-teks (tiap teks lama wajib muncul tepat 1×).
- **Semua soal di tabel sudah diterapkan** (pembuka 1–4, 8, 14, 15; soal 5–7, 9, 11, 13, 16, 17, 21, 25, 27, 28, 30–34, 37, 40, 45). Belum: engine 3a, validator, run cek. Fakta penentu diganti: 7 ("meninggalkannya berjam-jam"), 9 ("beberapa dari 12 penguji muda ikut tertawa", frasa lama hilang dari stem), 13 ("pengelola jaringan yang bertugas memeriksa perangkat bermasalah"), 21 ("Tiga Jumat terakhir, 14 berkas …"), 27 ("Unit TI masih menyimpan 20 kunci keamanan USB"), 30 ("ada di kantor sampai sore"), 31 (sesuai putusan), 32 ("kepala subbagian, pejabat yang berwenang melegalisir, …"), 37 ("40 pengajuan ditolak sistem …"). 40/45 fakta lama tetap (juga menggugurkan poin 4 baru). 21: paragraf tabel tindakan sejenis diperbarui (opsi naik ke kepala dinas hilang).
- Catatan: 16A baru 14 kata vs B 19 kata → kemungkinan langgar selisih ≤3 (tunggu validator, laporkan ke Gusti).
- Engine → v1.3.2 (Pilar 4 no. 3a status uji + changelog); `tmp/validate_soal.js` + field/cek `sepakat` (heuristik kata, kunci ≤ 60%); tkp.md reference ikut v1.3.2, cek.py OK. Footer paket1 → v1.3.2.
- Hasil cek 2026-10-26: pembuka "Anda" tinggal 10, 12. Sepakat: kunci 9 vs bukan-kunci 12 (lolos; kunci 40 tak tertangkap heuristik). Tebakan panjang lolos (11/20/20/19%). cek_lintas_paket 0 error. cek_slot: 20 selisih vs blueprint, semua akibat putusan (blueprint = rancangan pra-reviu, tidak diubah).
- **validate_soal 5 error, menunggu putusan Gusti:** spread kata 16 (5: A14 vs B19), 27 (4: B12 vs E16), 32 (4: E14 vs C18); J2 9×, 5× di poin 3; J5 7×, 4× di poin 2. Peringatan baru: fakta penentu berbagi kata dengan kunci (13, 21, 30, 31, 32).
- Usulan perbaikan panjang (belum diterapkan): 16B → "Menempelkan pengumuman di depan laboratorium bahwa hasil dahak TBC baru bisa diambil setelah tiga hari kerja." (16) · 27B → "… untuk seluruh staf bagian umum." (13) · 32E → "… dengan arsip SK yang tersimpan di bagian Anda." (16).
- **Putusan Gusti atas 5 error (2026-10-26), sudah diterapkan:** (1) panjang: 16B dipendekkan, 27B + "staf", 32E + "yang tersimpan" (kutipan reviu 27 ikut); (2) J2 40D dicabut (beban ke bidang sejawat ≠ pihak lemah) → 40 tanpa kode, kesalahanku tidak dicek dulu → (3) 40C +J1 ("catatan pemakaian bulan sebelumnya", kutipan persis stem); (4) 17B +J5 (pindah petugas berdasar kabar belum dicek).
- **Hasil akhir:** validate_soal 0 error (peringatan: fakta penentu berbagi kata dengan kunci 13/21/30/31/32; kata pembuka "menegur"/"menyerahkan" 3/5 di satu poin), cek_lintas_paket 0 error, cek_slot 25 OK + 20 selisih akibat putusan. Istilah dapur + "maka/karena itu" di pembahasan siswa bersih. Versi buta TIDAK diregenerate (tunggu perintah Gusti).
- Berikut (menunggu Gusti): cek buta ulang? (`tmp/buat_buta.py` + subagent) atau lanjut paket 2. Pelajaran: sebelum mencabut kode J, cek soal itu masih punya ≥1 kode.
- **PDF paket 1 DIBUAT 2026-10-26** (perintah Gusti): `tmp/pdfs/paket1/Paket_1_TKP_Soal.pdf` (27 hlm, tanpa kunci/meta) + `Paket_1_TKP_Pembahasan.pdf` (43 hlm: tabel skor A–E + preview soal + pembahasan siswa). Satu sumber `tmp/paket1.html` → `tmp/buat_pdf_paket.py` (assert skor 1–5 unik, kunci=5, tanpa kode dapur) → `tmp/gen_pdf.js` (puppeteer-core, NODE_PATH ke cache npx). Cek: 0 `file:///`, 0 judul soal yatim di akhir halaman, cek visual hlm 2–4/27. Lembar reviu (meta + Pembahasan Reviu) tidak dijadikan PDF.

## Alur baru — langkah 0 SELESAI 2026-10-26
- `tmp/buat_peta.py` → `tmp/peta_tkp.md` (24 KB, dibaca saat memilih ide) + `tmp/peta_tkp.json` (137 soal: B80, B12, paket1). Jenis mekanisme kunci heuristik 12 kategori; 17 sisa berlabel "lain: <kata kerja>". Temuan: "sepakat" kunci terbanyak juga di B80 (17/80) → paket 2 wajib kuota jenis mekanisme kunci. Latar ≥ 3×: dinas perhubungan, kantor pajak daerah, dinas pertanian, perpustakaan daerah, kantor kecamatan, puskesmas, dinas kependudukan, kantor desa, bagian kepegawaian.
- Skill diperbarui: `references/tkp.md` (pelajaran paket 1, alur paket 2–3, baris paket 1 + alat), `SKILL.md` (anti-bocor jenis mekanisme). cek.py OK.

## Prompt sesi berikut — alur baru langkah 1 (blueprint paket 2) (ditulis 2026-10-26)
```
Pakai skill skd-expert. Alur produksi TKP paket 2–3 disetujui Gusti 2026-10-26; langkah 0 (peta existing) selesai. Tugas sesi ini: LANGKAH 1 — blueprint paket 2 dicek script.

Baca dulu:
1. memory.md root project, 3 bullet terakhir.
2. ~/.claude/skills/skd-expert/riset/2026-10-26-pelajaran-paket1-jalan-pintas.md (urutan + pelajaran).
3. references/tkp.md bagian "Pelajaran produksi paket 1" + "Alur produksi paket 2–3".
4. BIG DATA/CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/tmp/peta_tkp.md bagian atas (tabel mekanisme + latar terpakai) — baca per dimensi hanya bila perlu.
5. tmp/blueprint_tkp.js (cara slot dibuat + --cek) dan tmp/blueprint_paket1.json (format).

Tugas:
a. Perluas blueprint_tkp.js --cek (ringkas, tanpa abstraksi baru): (1) latar: tidak dipakai di 2 slot berjarak < 5, AR maks 1 per latar, hindari latar ≥ 3× di peta; (2) field `mekanisme` kunci per slot berkuota (sepakat maks ±5/45; slot ber-kunci sepakat wajib punya pengecoh sepakat di p3/p4); (3) field `pembuka` stem per slot (kata pertama sama maks 2×); (4) ≥ 1 kode J per slot. Tambah ke --selftest.
b. Buat blueprint_paket2.json, cek lolos, tampilkan ringkasan ke Gusti untuk disetujui (satu pertanyaan per respons).
c. Jangan tulis kartu ide/soal sebelum Gusti perintah (langkah 2).
d. Checkpoint log + memory.md. Ubah skill → cek.py "cek OK".

Aturan: satu pertanyaan per respons (AskUserQuestion, Recommended). Tanpa commit. Bank lama tidak disentuh. Dekat batas context → tulis prompt sesi berikut di log + tampilkan + minta /compact.
```

## Alur baru — langkah 1 (blueprint paket 2) 2026-10-26: SCRIPT + BLUEPRINT SELESAI, menunggu persetujuan Gusti
- `tmp/blueprint_tkp.js` diperluas (cadangan versi lama di scratchpad sesi, tidak disimpan): LATAR + 14 latar baru (9 latar lama sudah 3× di peta); field baru per slot `mekanisme` (12 jenis = nama peta, kuota bag: sepakat 4, lapor/usulkan/tahan 3, lain 4), `sepakatPengecoh` (poin 3/4, wajib bila kunci sepakat), `pembuka` (32 kata, tiap kata maks 2×, tak berderet). Latar dipilih greedy: jarak ≥ 5, AR beda latar, latar 2× di peta dipakai maks 1×, latar ≥ 3× di peta tidak dipakai.
- `--cek` baru: latar kosong / berjarak < 5 / ≥ 3× di peta / dobel AR; mekanisme tak dikenal / sepakat > 5 / jenis lain > 6; kunci sepakat tanpa pengecoh sepakat p3/p4; rasio sepakat kunci > 60% (Pilar 4 no. 3a); pembuka kosong / kata pertama > 2×; slot tanpa kode J. `--selftest` merusak tiap aturan → OK.
- `tmp/blueprint_paket2.json` (biji 2000, percobaan ke-1): `--cek` → blueprint OK. Kunci 9 per huruf; 24 latar (maks 3×); sepakat kunci 4 (slot 1, 2, 4, 43) + pengecoh sepakat 4 → 50%.
- `blueprint_paket1.json` kini gagal `--cek` (tanpa field baru + latar paket 1 ikut terhitung di peta) — wajar, paket 1 beku, jangan dicek ulang dengan script ini.
- Titik lemah yang kutemukan (belum diubah, menunggu Gusti): mekanisme dipasang acak tanpa melihat dimensi → slot 9 AR "jadwal/giliran" dan 31 AR "aturan tertulis" janggal; usul tukar 9↔11 (tegur), 31↔33 (lapor). Pembuka juga acak (mis. 44 AR "Antrean", 24 AR "Pemohon") → boleh ditukar di kartu ide asal tetap maks 2×. Kunci lapor 3 slot (18, 33, 45) wajib punya pemicu J3 di kartu ide.
- Berikut: putusan Gusti atas blueprint → langkah 2 kartu ide (atas perintah).
- **Putusan Gusti 2026-10-26: blueprint paket 2 DISETUJUI + tukar mekanisme 9↔11 (AR → tegur), 31↔33 (AR → lapor) → BEKU** (dicatat di `catatan`). `--cek` OK. Kunci lapor kini slot 18, 31, 45 → kartu ide wajib tulis pemicu J3. Berikut: langkah 2 kartu ide 45 baris (atas perintah Gusti; baca peta per dimensi saat memilih ide).
- **Langkah 2 dimulai 2026-10-26.** Sebelum kartu ide, Gusti setujui koreksi blueprint: tangga AR dicocokkan ke mekanisme (9↔24 tangga, 1↔45 dan 38↔34 mekanisme, 44 → konten menyebar) + kode J6 keluar dari poin 4 (6↔3, 13↔14, 41↔37); `--cek` kini menolak J6 di poin 4 (selftest OK). Kartu ide batch 1 (1–15) ditulis di `tmp/kartu_ide_paket2.md`, menunggu persetujuan Gusti. Celah generator: mekanisme & tangga AR diundi terpisah → cocokkan manual di paket 3.
- **Aturan Gusti 2026-10-26:** laporan ke Gusti dalam bahasa formal baku tanpa istilah teknis (lihat memory.md root).
- **Kartu ide 1–15 DISETUJUI Gusti 2026-10-26.** Kartu 16–30 ditulis (draf). Temuan: blueprint menaruh J3 di poin 4 (7, 27, 42) padahal engine J3 = skor 2–3 → usulan tukar kode 7↔33, 27↔28, 42↔43 (kandidat scratchpad, `--cek` OK; belum masuk `blueprint_paket2.json`), + ubah teks p4 kartu 7. `blueprint_tkp.js`: `--cek` tolak J3/J6 di poin 4, generator menukar poin otomatis; selftest OK.

## Prompt sesi berikut — langkah 2 lanjutan (kartu ide 31–45) (ditulis 2026-10-26)
```
Pakai skill skd-expert. Bahasa ke Gusti: formal baku, tanpa istilah teknis (memory feedback-bahasa-ke-gusti). Tugas: lanjut LANGKAH 2 alur produksi TKP paket 2 — kartu ide 31–45.

Baca dulu:
1. memory.md root project, 3 bullet terakhir.
2. Log produksi ~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md, bagian "langkah 1" sampai akhir.
3. BIG DATA/CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/tmp/kartu_ide_paket2.md (format + batch 1–2; cek status persetujuan batch 2 dan koreksi J3 — kalau Gusti sudah setuju, pastikan koreksi masuk blueprint_paket2.json + catatan).
4. ENGINE_GENERATE_SOAL_TKP.md Pilar 1–3 + Pilar 6 (tangga AR, pasangan kontras) bila perlu.
5. tmp/peta_tkp.md per dimensi untuk cek konstruk kembar.

Tugas: kartu 31–45 dari tmp/blueprint_paket2.json (cetak slot 31–45 dengan node); perhatikan pasangan 31↔24 (pola nyata → lapor + hentikan), 42↔21 (penugasan menurut asal daerah, kunci ubah cara), lapor kunci 31 wajib pemicu, kunci sepakat 43/45 wajib pengecoh sepakat. Tampilkan ringkasan tabel bahasa awam ke Gusti, satu pertanyaan persetujuan. Jangan tulis soal (langkah 3) sebelum diperintah. Checkpoint log + memory.md. Tanpa commit.
```
- **Gusti 2026-10-26: kartu 16–30 DISETUJUI + koreksi J3 diterapkan** ke `blueprint_paket2.json` (catatan ditambah, `--cek` OK); kartu 7 p4 diganti S5+J4. Berikut: kartu 31–45 (prompt di atas).

### 2026-10-26 — langkah 2 batch 3
Kartu ide 31–45 ditulis di `tmp/kartu_ide_paket2.md`, menunggu persetujuan Gusti. Setelah disetujui: langkah 2 selesai; langkah 3 (tulis soal 15/sesi) hanya bila Gusti memerintah.
Gusti setujui batch 3 (2026-10-26) → langkah 2 SELESAI, 45/45 kartu ide final. Berikut langkah 3 (tulis soal + opsi, 15/sesi, mulai 1–15) hanya atas perintah.

### 2026-10-26 — langkah 3 batch 1 (soal 1–15) ditulis
Sumber data `tmp/paket2_soal_01_15.js` → `node tmp/build_paket2.js tmp/paket2.html tmp/paket1.html tmp/paket2_soal_01_15.js [batch berikut]` (head/CSS diambil dari paket1). Belum ada pembahasan (ditulis setelah beku).
Cek: `cek_slot.js 1 15` semua OK (kata per opsi, dua-langkah, poin, sumbu, jebakan, latar, penutup, tangga AR). `validate_soal.js`: sisa error hanya "Kunci vs" (pembahasan belum) + pasangan 19/20 (belum ditulis) + hitungan per-45; peringatan per-15 "terpanjang ke-2 33%" dan "J4 3/5 di poin 4" — di blueprint 45 masing-masing 9/45 dan 4/9, jadi lolos saat paket lengkap. `cek_lintas_paket.js`: 0 konstruk mirip setelah konstruk 4 & 12 dirumuskan ulang.
Perubahan dari kartu (karena bentuk opsi wajib ikut blueprint): kunci 5, 7, 9, 12 jadi satu kalimat tanpa penghubung dua langkah; 5C diganti (melayani formulir gangguan + titip kasus ke petugas mitra tanpa memastikan sampai) karena versi kartu tidak berbeda dari kunci; stem 5 menyebut pengelola aplikasi + petugas mitra. Fakta penentu 6, 7, 8, 13, 14 dipilih ulang agar tidak berbagi kata dengan kunci.
Berikut: 3b cek buta 1–15 (subagent, `buat_buta.py` → `banding.py`) atas persetujuan Gusti, lalu batch 16–30.

### 2026-10-26 — cek buta paket 2 soal 1–15 (subagent Sonnet; hasil `tmp/cekbuta_paket2_01_15_penilai.json`)
Kunci sama 15/15 · poin 4 sama 9/15 (paket 1: 23/45). Poin 4 beda: 2 (penilai A), 4 (B), 9 (E), 11 (E), 14 (C), 15 (D).
Temuan sah: 2E menyebut larangan perundungan yang tidak ada di stem; 5E subjek janggal ("meminta petugas loket", padahal Anda petugas loket); 4C terlalu sewenang untuk poin 4; poin 1 pasif 2A/15D terlalu baik (penilai taruh di poin 4); 3B & 13B bunyi sama ("Mengeluarkan … dari grup"); 5A terlalu jelas salah; 14D bergantung pengembang yang belum membalas; kunci sering memakai kata sarana dari stem (10B, 13D).
Usulan perbaikan menunggu putusan Gusti (lihat balasan sesi 2026-10-26).
Putusan Gusti 2026-10-26: terapkan semua 10 perbaikan → diterapkan (16 ganti-teks di `tmp/paket2_soal_01_15.js`, cadangan pra-cek-buta di scratchpad sesi), rakit ulang, `cek_slot 1 15` 15/15 OK, validator per soal 0 temuan baru, lintas paket 0 mirip. Soal 1–15 = draf tetap (pembahasan setelah beku 45).
Pelajaran untuk batch 16–30: (1) opsi tidak boleh menyebut aturan/sarana yang tidak ada di stem; (2) subjek opsi konsisten dengan peran "Anda" di stem; (3) poin 1 "pasif" harus jelas diam/menunda, bukan solusi separuh; (4) poin 4 tetap wajar (bukan sewenang/menuduh) — salahnya di satu sumbu saja; (5) bunyi poin 1 "mengucilkan" jangan seragam antarsoal; (6) kunci yang bergantung pihak lain: stem wajib menyebut pihak itu bisa dijangkau.

## Prompt sesi berikut — langkah 3 batch 2 (soal 16–30)
Pakai skill skd-expert. Bahasa ke Gusti: formal baku, tanpa istilah teknis. Tugas: LANGKAH 3 TKP paket 2 — tulis soal 16–30 (stem + 5 opsi + meta, tanpa pembahasan) dari `tmp/kartu_ide_paket2.md` batch 2 + slot `tmp/blueprint_paket2.json`. Buat `tmp/paket2_soal_16_30.js` (format sama dengan `tmp/paket2_soal_01_15.js`), rakit `node tmp/build_paket2.js tmp/paket2.html tmp/paket1.html tmp/paket2_soal_01_15.js tmp/paket2_soal_16_30.js`, cek `node tmp/cek_slot.js tmp/paket2.html tmp/blueprint_paket2.json 16 30` (jumlah kata per opsi wajib persis; opsi bukan dua-langkah dilarang memakai lalu/serta/sambil/sekaligus/kemudian/disertai/setelah itu/"dan me-"; hindari "bersama X"/"mengajak" di opsi bukan-sepakat), `validate_soal.js`, `cek_lintas_paket.js`. Baca dulu `references/tkp.md` bagian "Pelajaran produksi paket 2" dan terapkan; laporkan ke Gusti pelajaran mana yang dipakai. Setelah tulis batch DAN setelah cek buta: tambah pelajaran baru ke bagian itu + memory, `cek.py` OK (aturan Gusti 2026-10-26). Lalu cek buta 16–30 (subagent Sonnet; salin `buat_buta.py`/`banding.py` tanpa assert 45 seperti batch 1), laporkan ke Gusti bahasa awam, satu pertanyaan persetujuan. Checkpoint log + memory.md. Tanpa commit.

### 2026-10-26 — langkah 3 batch 2 (soal 16–30) ditulis
`tmp/paket2_soal_16_30.js` → `node tmp/build_paket2.js tmp/paket2.html tmp/paket1.html tmp/paket2_soal_01_15.js tmp/paket2_soal_16_30.js` (30 soal). `cek_slot 1 30` semua OK. Validator: sisa error hanya pembahasan belum + pasangan 42/31 belum ditulis + J4@4 dan J3@2 >50% per-30 (blueprint 45: 4/9 dan 4/8 → lolos saat lengkap). Diperbaiki: pembuka "Membiarkan" (18A→Mendiamkan, 25E→Mempersilakan), "Menyusun" kunci (21A→Mengatur, 25C→Membuat), kata absolut di kunci 25C/29B. Lintas paket 0 mirip setelah konstruk 19/20/22 dirumuskan ulang.
Perubahan dari kartu: kunci 22/24/29 jadi satu kalimat (blueprint tanpa dua-langkah); 29 p3 diganti "teguran ke empat mitra dari keluhan pelamar tanpa mencocokkan" (versi kartu sama dengan kunci); stem 29 menyebut daftar mitra belum dicocokkan. Lembar buta siap di scratchpad (`buta_p2_16_30.txt`, `kunci_p2_16_30.json`). Berikut: cek buta 16–30 atas persetujuan Gusti. Pelajaran ditambah ke references/tkp.md.

### 2026-10-26 — cek buta paket 2 soal 16–30 (Sonnet; `tmp/cekbuta_paket2_16_30_penilai.json`)
Kunci 15/15 · poin 4 11/15. Beda poin 4: 18 (penilai E, kita B), 20 (A vs D), 21 (D vs C), 27 (B vs E). Catatan penilai sah: 26 tenggat sore ini vs jemput Kamis; 24 "apa adanya" ambigu. Usulan 6 perbaikan (18B+stem rapat rutin lusa pagi, 20D tandai belum disahkan, 21C mulai bulan depan, 27E anggapan koordinator pasti menolak, 26 stem batas Jumat/hari ini Senin, 24E "tuduhan tanpa bukti itu diteruskan") menunggu Gusti. Pelajaran masuk references/tkp.md.
Putusan Gusti 2026-10-26: terapkan semua 6 perbaikan → diterapkan (10 ganti-teks di `tmp/paket2_soal_16_30.js`, cadangan pra-cek-buta di scratchpad sesi), rakit ulang, `cek_slot 1 30` 30/30 OK, validator 0 temuan baru (sisa = pembahasan, pasangan 31/42, J4@4/J3@2 per-30 → lolos di 45), lintas paket 0 mirip.

## Prompt sesi berikut — langkah 3 batch 3 (soal 31–45)
Pakai skill skd-expert. Bahasa ke Gusti: formal baku, tanpa istilah teknis. Tugas: LANGKAH 3 TKP paket 2 — tulis soal 31–45 dari `tmp/kartu_ide_paket2.md` batch 3 + slot `tmp/blueprint_paket2.json`. Buat `tmp/paket2_soal_31_45.js` (format sama), rakit `node tmp/build_paket2.js tmp/paket2.html tmp/paket1.html tmp/paket2_soal_01_15.js tmp/paket2_soal_16_30.js tmp/paket2_soal_31_45.js`, cek `node tmp/cek_slot.js tmp/paket2.html tmp/blueprint_paket2.json 1 45`, `validate_soal.js` (kini cek paket 45 penuh: J per poin, pasangan 31↔24 + 42↔21, kunci 9/huruf, pembuka opsi berulang), `cek_lintas_paket.js`. Baca dulu `references/tkp.md` "Pelajaran produksi paket 2" (batch 1 + 2 + cek buta 2) dan terapkan; laporkan ke Gusti pelajaran yang dipakai. Kunci sepakat 43/45 wajib pengecoh sepakat; lapor 31 wajib pemicu. Setelah tulis DAN setelah cek buta: pelajaran baru → tkp.md + memory, `cek.py` OK. Cek buta 31–45: rakit HTML hanya data 31–45 ke scratchpad → salinan `buat_buta.py`/`banding.py` tanpa assert 45 → subagent Sonnet (engine baris 25–224 + 360–388 + lembar buta) → banding → lapor bahasa awam, satu pertanyaan. Lalu reviu 45, kunci final, pembahasan, PDF (atas perintah). Checkpoint log + memory.md. Tanpa commit.

## 2026-10-26 — Langkah 3 batch 3: soal 31–45 ditulis
- `tmp/paket2_soal_31_45.js` (15 soal), paket2.html 45 soal. cek_slot 1–45 OK (7 opsi dikoreksi jumlah kata), validator: kunci 9/huruf, tebakan bentuk di bawah batas, sepakat kunci 4 vs bukan-kunci 4, pasangan 3-20/6-19/21-42/24-31 lengkap; sisa hanya pembahasan belum ditulis + kata absolut di 17D/21B/22A/26B/29A (bukan kunci). Lintas paket 0 mirip (32 konstruk ditulis ulang vs paket2#7).
- 11 field `fakta` diganti potongan stem tanpa kata isi kunci (validator cocok-kata).
- Cadangan pra cek buta: scratchpad `paket2_soal_31_45.pra_cekbuta.js`.
- Berikut: cek buta 31–45 (subagent Sonnet, engine 25–224 + 360–388 + lembar buta), atas persetujuan Gusti.

## 2026-10-26 — Cek buta batch 3 (31–45) + putusan
- Penilai Sonnet (engine 25–224 + 360–388 + lembar buta): kunci 15/15, poin 4 10/15. Hasil: `tmp/cekbuta_paket2_31_45_penilai.json`.
- Beda poin 4: 34 (E dinilai 4), 37 (E≈kunci), 39 (C>E), 44 (B>C, kerumunan didahulukan), 45 (C>E, E redundan). Tambahan: 43C klaim di luar stem.
- Gusti: terapkan semua. Diterapkan: 34E, 37E, 39E, 43C(+catatan J3), 44C, 45C, 45E(+catatan J5). cek_slot 45/45, validator tanpa temuan baru, lintas 0 mirip. Cadangan: scratchpad `paket2_soal_31_45.pra_cekbuta.js`.

## Prompt sesi berikut — reviu 45 + kunci final paket 2
Pakai skill skd-expert. Bahasa ke Gusti: formal baku, tanpa istilah teknis. Paket 2 TKP 45 soal lengkap di `tmp/paket2.html` (sumber `tmp/paket2_soal_01_15.js`, `_16_30.js`, `_31_45.js`; rakit `node tmp/build_paket2.js tmp/paket2.html tmp/paket1.html` + tiga file). Ketiga cek buta selesai + diperbaiki. Langkah berikut HANYA atas perintah Gusti: reviu 45 soal (sebaran pembuka opsi, kemiripan antarsoal, pasangan 3-20/6-19/21-42/24-31) → kunci final → pembahasan reviu + siswa (gaya guru, bebas istilah dapur, "Kunci vs X (poin 4/3)" per soal untuk validator) → validator 0 error → PDF (`tmp/buat_pdf_paket.py`). Pelajaran: `references/tkp.md` "Pelajaran produksi paket 2". Checkpoint log + memory.md. Tanpa commit.

## Prompt sesi berikut — paket 3 TKP (45 soal), mulai langkah 0
Pakai skill skd-expert. Bahasa ke Gusti: formal baku, tanpa istilah teknis, satu pertanyaan per respons (opsi "(Disarankan)"). Jangan menulis soal sebelum Gusti memerintahkan; tanpa commit/push; bank 80, paket 1, dan paket 2 tidak diubah.
Baca dulu: `references/tkp.md` (bagian "Pelajaran produksi paket 2" + "Alur produksi paket 2–3"), log ini, `memory.md` root, engine `ENGINE_GENERATE_SOAL_TKP.md` penuh.
Langkah (alur disetujui Gusti 2026-10-26, sama dengan paket 2):
0. Peta existing: jalankan ulang `tmp/buat_peta.py` dengan paket 2 ikut terpetakan (pastikan `tmp/paket2.html` terbaca; bila belum, tambahkan sumbernya) → `tmp/peta_tkp.md`. Catat celah latar/konstruk/mekanisme.
1. Rancangan paket: `node tmp/blueprint_tkp.js 3` → `tmp/blueprint_paket3.json`, lalu `--cek` sampai lolos (jarak latar ≥ 5, latar ≥ 3× di peta ditolak, mekanisme berkuota, pembuka stem, ≥ 1 kode J, pasangan). Laporkan ke Gusti dalam bahasa awam → minta persetujuan.
2. Kartu ide 45 di `tmp/kartu_ide_paket3.md` (format sama dengan `kartu_ide_paket2.md`), cek kembar ke peta; setujui Gusti per 15.
3. Tulis soal 15 per sesi ke `tmp/paket3_soal_01_15.js` dst. (format = paket 2), rakit dengan `tmp/build_paket2.js` (keluaran `tmp/paket3.html`), cek `cek_slot.js` (blueprint_paket3), `validate_soal.js`, `cek_lintas_paket.js` (harus membandingkan juga ke paket 2). Terapkan semua pelajaran paket 2 sejak awal, termasuk batch 3: poin 2 lempar beban jelas membebani; poin 3 "kurang tuntas" disebut terang; cakupan poin 4 > poin 3; kerumunan di depan mata didahulukan; poin 4 tidak mengulang yang sudah beres; opsi tanpa klaim di luar stem; field fakta tanpa kata isi kunci.
3b. Cek buta tiap 15 soal (scratchpad `buta15.py` + `banding15.py`, subagent Sonnet: engine baris 25–224 + 360–388 + lembar buta) → lapor bahasa awam → putusan Gusti → terapkan.
Setelah tiap tahap dan tiap cek buta: pelajaran → `references/tkp.md` + memory, `python3 ~/.claude/skills/skd-expert/cek.py` = cek OK; checkpoint ke log ini + `memory.md`. Dekat batas percakapan: tulis prompt lanjutan di log, minta Gusti /compact.
Catatan: paket 2 masih menunggu reviu 45 + kunci final + pembahasan + PDF (prompt terpisah di atas); kerjakan mana dulu sesuai perintah Gusti.

## 2026-10-26 — Paket 2 tahap A: reviu 45 (menunggu putusan Gusti)
- Rakit ulang 45 soal; cek_slot 45/45 OK; validator: 0 error di luar pembahasan (belum ditulis), kunci 9/huruf, tebakan bentuk di bawah batas (terpanjang 11%, ke-2 20%), sepakat kunci 4 vs bukan-kunci 4; lintas paket 0 mirip. Kata absolut 17D/21B/22A/26B/29A = memang salahnya opsi (dibiarkan).
- Temuan (alat: scratchpad `reviu45.js`): (1) pembuka "Mempertemukan" 3/3 kunci (13D,14D,35E); (2) "Menetapkan" 3/4 kunci (6E,33E,45D) + 6E/33E sama-sama "Menetapkan … tertulis"; (3) pasangan 21–42 kuncinya searah (sama-sama "terapkan aturan adil sekarang", poin 4 sama-sama "mulai bulan depan") = bukan kontras; (4) 20 dan 43 latar sama + dokumen sama "rekap realisasi anggaran"; (5) kecil: "Membiarkan" 3/3 poin 1, "Mendahulukan" 3/3 poin 2, "Mengikuti" 3/4 poin 2.
- Usulan: 35E Mempertemukan→Mengumpulkan; 14C → "Mempertemukan para operator sekolah, lalu meminta jarak siswa dihitung ulang secara manual." (12 kata); 33E Menetapkan→Memberlakukan; cabut pasangan 21–42 (sisa 3 pasang = batas minimum); 43 "rekap realisasi anggaran" → "rekap penerimaan pajak daerah" (stem + konstruk); temuan (5) dibiarkan.
- Putusan Gusti 2026-10-26: 5 usulan diterapkan (7 ganti-teks + blueprint pasangan 21/42 → null; cadangan scratchpad `*.pra_reviu45.js/json`). blueprint --cek OK, cek_slot 45/45, validator 0 error/peringatan di luar pembahasan, pasangan 3-20/6-19/24-31, lintas 0 mirip. Berikut: tahap B kunci final (menunggu Gusti).
- Tahap B kunci final DISETUJUI Gusti 2026-10-26 (BEKU): 1B 2D 3A 4D 5B 6E 7C 8C 9B 10B 11A 12A 13D 14D 15B · 16E 17C 18C 19A 20E 21A 22D 23C 24E 25C 26D 27C 28E 29B 30E · 31B 32C 33E 34B 35E 36D 37C 38E 39A 40A 41B 42D 43A 44A 45D. Soal tidak diubah lagi.
- Tahap C pembahasan: `tmp/build_paket2.js` kini menggabung file pembahasan (objek {n:{reviu:[li], siswa:{tanya, opsi, kunci, analogi, jebakan, tips}}}; opsi siswa diurut skor otomatis; cadangan build di scratchpad). Soal 1–15 ditulis di `tmp/paket2_bahas_01_15.js`, validator 0 temuan untuk 1–15, cek frasa terlarang 0. Rakit: `node tmp/build_paket2.js tmp/paket2.html tmp/paket1.html tmp/paket2_soal_01_15.js tmp/paket2_soal_16_30.js tmp/paket2_soal_31_45.js tmp/paket2_bahas_01_15.js [...bahas_16_30 ...bahas_31_45]`. PDF baru bisa setelah 45 pembahasan ada (buat_pdf_paket.py butuh pembahasan siswa tiap soal). Berikut: 16–30 lalu 31–45 (atas persetujuan Gusti), lalu PDF.
- Gusti setujui gaya 1–15 dengan catatan: wording lebih manusiawi, tidak AI generik. Soal 16–30 ditulis dengan gaya baru (`tmp/paket2_bahas_16_30.js`), validator 0 error untuk 1–30 (5 peringatan kata absolut lama, diterima). 1–15 masih gaya lama ("satu-satunya" di 3, 13) — menunggu putusan Gusti apakah diselaraskan. Berikut: 31–45.
- Gusti: versi 16–30 masih terasa AI generik → minta lebih hangat, "tulis ulang saja". Pembahasan siswa 16–30 ditulis ulang (suara guru di samping murid: memahami godaan murid "wajar kalau kamu tergoda", "aku paham", membuka dengan "bayangkan…", empati ke pihak dalam soal "kasihan", "sayang"). Versi 1 di scratchpad `paket2_bahas_16_30.versi1.js`; file kini JSON (`module.exports = {...}`). Validator 0 error 1–30. Menunggu putusan Gusti atas gaya ini sebelum 31–45 + selaraskan 1–15.
- Gusti: gaya hangat putaran 2 COCOK. 31–45 ditulis (`tmp/paket2_bahas_31_45.js`, reviu + siswa hangat); validator paket 45: 0 error, 0 peringatan selain kata absolut lama. Berikut: tulis ulang siswa 1–15 gaya hangat (scratchpad `siswa_01_15_hangat.js` → gabung seperti 16–30), lalu PDF.
- Siswa 1–15 ditulis ulang gaya hangat (versi 1 di scratchpad `paket2_bahas_01_15.versi1.js`). Paket 45 lengkap: validator 0 error, 0 peringatan (selain 5 kata absolut lama yang diterima). HTML bahan ajar dibuat `tmp/pdfs/paket2/Paket_2_TKP_Soal.html` + `_Pembahasan.html` (buat_pdf_paket.py OK). TAHAP C SELESAI. Berikut tahap D: PDF (`node tmp/gen_pdf.js`, NODE_PATH puppeteer-core) atas persetujuan Gusti.
- TAHAP D SELESAI 2026-10-26: PDF paket 2 `tmp/pdfs/paket2/Paket_2_TKP_Soal.pdf` (24 hlm) + `_Pembahasan.pdf` (45 hlm); 45 nomor, 0 "file:///", lembar soal tanpa kunci/skor; cek visual hlm 5 OK. Perintah: `NODE_PATH=/Users/gustiputuyudawirashana/.npm/_npx/7d92d9a2d2ccc630/node_modules node tmp/gen_pdf.js <html> <pdf>`. PAKET 2 SELESAI (draf, belum diuji peserta).
- Perintah Gusti berikut: terapkan gaya pembahasan hangat ke paket 1 (pembahasan siswa 45 soal) lalu PDF ulang paket 1.

## Prompt sesi berikut — paket 1: pembahasan siswa gaya hangat + PDF ulang
Pakai skill skd-expert. Bahasa ke Gusti: formal baku, tanpa istilah teknis, satu pertanyaan per respons, minta persetujuan tiap tahap. Tugas (perintah Gusti 2026-10-26): tulis ulang **pembahasan siswa** paket 1 TKP (45 soal, `tmp/paket1.html`, blok `<div class="pembahasan-siswa">`) dengan gaya hangat yang disetujui di paket 2 — contoh baku `tmp/paket2_bahas_*.js`, aturan di `references/tkp.md` (butir "Gaya pembahasan siswa disetujui Gusti") + memory `feedback-pembahasan-manusiawi.md`. Soal, opsi, kunci, skor, dan Pembahasan Reviu paket 1 TIDAK diubah. Langkah: (1) cadangkan `tmp/paket1.html` ke scratchpad; (2) baca tiap soal (stem, opsi, Poin) + blok siswa lama; (3) tulis siswa baru per 15 soal di scratchpad (format paket 2: tanya, opsi per huruf, kunci, analogi, jebakan, tips), sisipkan kembali ke paket1.html dengan script (ganti tepat satu blok per soal, struktur HTML sama: `<p><b>Yang ditanya:</b>`, `<ul><li><b>X (skor n)</b>: …`, `<p><b>Kunci X</b>, karena …`, Analogi/Jebakan/Tips); (4) `node tmp/validate_soal.js tmp/paket1.html` 0 error + cek frasa terlarang (mari kita, dengan demikian, akan tetapi, satu-satunya, sekaligus, stem, poin N; maka/karena itu ≤ 1); (5) laporkan contoh ke Gusti per 15 soal; (6) setelah 45: `python3 tmp/buat_pdf_paket.py tmp/paket1.html "Paket 1" tmp/pdfs/paket1/Paket_1_TKP` + gen_pdf (NODE_PATH di atas), verifikasi `pdftotext | grep -c file:///` = 0, 45 nomor. Checkpoint log + memory.md tiap 15 soal. Tanpa commit.

## Gaya wording "mentor senior" — paket 1 + 2 (perintah Gusti 2026-10-26)
Pemicu: siswa Gusti mendeteksi soal TKP kita buatan AI. Data: paket 2 cerita 71 kata/5,5 kalimat/49% berangka, opsi 15 kata vs Al Faiz 30 kata/3 kalimat/0% angka, opsi 10 kata. Mockup 3 soal (p2 no 1,3,4) `tmp/pdfs/mockup_wording/` (data.json = teks baru) DISETUJUI Gusti: "kolom sesudah sangat fresh".
Batas gaya: cerita ≤ 40 kata tanpa kalimat tanya, ≤ 3 kalimat; angka hanya bila menentukan; opsi 10–12 kata (validator min 10, selisih ≤ 3); sebutan sehari-hari (RSUD, BPBD, Pak RT); fakta penentu diselipkan dalam anak kalimat; opsi nada lisan. Tema, kunci, skor, sumbu/jebakan TETAP — bukan soal baru.
Urutan: paket 2 per 15 soal (ubah stem/opts/fakta di `paket2_soal_*.js`, sesuaikan reviu + siswa di `paket2_bahas_*.js` bila mengutip detail yang dihapus; cadangan ke scratchpad; build + validate_soal 0 error; cek_slot kata-per-opsi blueprint DIABAIKAN karena gaya baru), lalu paket 1 (sumber hanya `paket1.html`), lalu PDF ulang keduanya. Persetujuan Gusti tiap 15 soal.
- 2026-10-26 Paket 2 soal 1–15 wording baru diterapkan (`paket2_soal_01_15.js` + pembahasan disesuaikan, 55 penggantian). validate_soal 0 error, peringatan sama seperti sebelum; kutipan pembahasan cocok soal (`scratchpad/cek_kutipan.js`). Skrip di `tmp/`: `patch_soal.js`, `patch_bahas.js`, `cek_kutipan.js`, `banding_wording.js`; cadangan + data patch di `tmp/cadangan_wording/`. PDF banding `tmp/pdfs/mockup_wording/Banding_Paket2_01_15.pdf`. Menunggu persetujuan Gusti, lalu 16–30.
- 2026-10-26 Paket 2 soal 16–30 wording baru diterapkan (+42 penggantian pembahasan; soal 19 ditambah "tiga staf bidang siap membantu"; 17/28 pembahasan disesuaikan karena fakta kontrak/tenggat lusa dihapus). validate 0 error. PDF banding `tmp/pdfs/mockup_wording/Banding_Paket2_16_30.pdf`. Menunggu persetujuan Gusti, lalu 31–45.
- 2026-10-26 Paket 2 soal 31–45 wording baru diterapkan (+47 penggantian pembahasan). Soal 31 cerita 44 kata (fakta kesbangpol + daftar peserta/iuran/sumpah wajib tetap). Paket 2 LENGKAP: validate 0 error; panjang opsi diseimbangkan (kunci terpanjang 15%, terpanjang ke-2 21%, poin 4 terpanjang 27%) dengan memendekkan kunci 4D/10B/13D/15B/26D/32C/34B/35E/39A/42D dan poin 4 7A/15E/40C. Lintas paket 0 error. PDF banding `tmp/pdfs/mockup_wording/Banding_Paket2_31_45.pdf`. PDF paket 2 final BELUM dibuat ulang. Berikut: persetujuan Gusti → PDF paket 2 ulang → paket 1 (sumber hanya paket1.html; perlu skrip patch HTML).
- 2026-10-26 PDF final paket 2 (wording baru) dibuat ulang + menimpa lama: Soal 23 hlm, Pembahasan 39 hlm. JSON lama BELUM dihapus (Gusti belum memilih kelompok).
- 2026-10-26 Pindai Cepat DISETUJUI masuk pembahasan (kotak biru sebelum pembahasan siswa) + data JSON untuk bank soal sistem CAT. Data: `tmp/paket2_pindai.json` ({meta: langkah, yang_dicari per aspek; soal: {n: {aspek, penentu (kutipan persis cerita), arti, coret {3 huruf}, sisa {poin4, kunci}, tanda}}}). Pemeriksa `tmp/cek_pindai.js`. `build_paket2.js` kini menerima file pindai sebagai argumen terakhir (cadangan `cadangan_wording/build_paket2.pra_pindai.js`). Soal 1–15 ditulis, cek OK, PDF pembahasan 43 hlm. Berikut: persetujuan → 16–30, 31–45 → ekspor JSON bank CAT (skema `cat-tkp-app/src/data/bank_soal_tkp_80.json` + pembahasan_siswa + pindai_cepat).


## Handbook TKP + SOP Pindai Cepat
Dipindah ke `riset/2026-10-26-log-handbook-tkp.md` (2026-10-27) agar log ini < 500 baris.
