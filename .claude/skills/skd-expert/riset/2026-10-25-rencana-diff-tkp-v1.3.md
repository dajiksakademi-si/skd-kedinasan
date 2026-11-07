# Rencana diff ENGINE TKP v1.2 → v1.3 (2026-10-25)

Status: **DISETUJUI SEMUA (Gusti 2026-10-25)**. Implementasi: **selesai 2026-10-25** (engine v1.3, validate_soal.js, skill sync; cek.py OK). Hasil validator baru: Batch 2 = 39 error/19 peringatan, bank 80 = 255 error/88 peringatan — tidak diperbaiki, menunggu audit.
Sumber keputusan: kolom Status `2026-10-25-tkp-vs-kepribadian.md` §D (A–K) dan `2026-10-25-tkp-hots-al-faiz.md` §E (L–W), plus uji kriteria E (memory.md root, "lanjutan 8").
Engine: `BIG DATA/CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TKP.md` (nomor baris = versi sekarang).

## 1. Engine — per bagian

| # | Bagian (baris) | Sekarang | Jadi | Usulan |
|---|---|---|---|---|
| 1 | Header (4, 8) | "24 soal rujukan" · "Versi 1.0" | "29 butir rujukan (nomor sumber 1–15, 68–110; dua nomor 97 beda isi)" · "Versi 1.3" | H |
| 2 | Filosofi Inti no. 1 (32–34) | nol opsi absurd/tercela | + "tidak ada opsi, di poin mana pun, yang memuat klaim tidak benar atau melanggar aturan tertulis" | E(3) |
| 3 | Pilar 1 Hukum Dua Kutub (74–76) | "poin 4 hanya menutup satu kutub … atau klaim kosong" | "poin 4 gagal di tepat satu sumbu presisi, dengan frasa pembatas yang bisa dikutip dari opsinya" | D |
| 4 | Pilar 1 (baru, sesudah 79) | — | **Fakta penentu**: satu fakta situasi di L1/L2 yang mematahkan pengecoh terkuat; bukan kalimat tujuan "Anda ingin …"; tidak berbagi kata isi dengan kunci | O |
| 5 | Pilar 2 (104) | "daftar penutup sah cuma 5" | "8" (sesuai tabel); cap 45 lihat butir 26 | H |
| 6 | Pilar 3 tabel poin 1 (123) | pasif/lepas tangan | pasif **atau** aktif tapi meleset: (a) lempar beban ke luar layanan/pihak lemah · (b) sibuk di samping masalah · (c) bagi rata · (d) berkorban buta · (e) nilai sah jadi dalih · (f) mengucilkan. ≥ 50% poin 1 per paket berbunyi aktif | M |
| 7 | Pilar 3 tabel poin 2 (124) | patuh buta / relasi-citra | + mayoritas/populer menang | M |
| 8 | Pilar 3 (baru, sesudah tabel) | — | **Panduan 1 vs 2 (status uji)**: poin 2 sudah bertindak pada masalah di soal tapi setengah/cara buruk (termasuk lempar beban ke orang lain, mayoritas menang); poin 1 diam, menghindar, atau sibuk di hal yang bukan masalahnya. **Panduan 3 vs 4 (status uji)**: poin 3 ruginya terasa sekarang ke pihak di soal; poin 4 gagal di satu sumbu dan ruginya baru terasa nanti/kasus berikut. **Menunggu/menunda**: skor ditulis dengan alasan + batas di lembar reviu; dua soal sepaket dengan skor beda untuk "menunggu" wajib punya fakta pembeda | E(1)(2), M/P25 |
| 9 | Sumbu S1 (136) | reaktif, jalan sesudah celah terbuka | + kalimat pembeda: "S1 = **kapan**-nya salah" | F |
| 10 | Sumbu S3 (138) | kewenangan/peran | + "S3 = **siapa**-nya salah" | F |
| 11 | Sumbu S4 (139) | untuk kasus ini saja | + "atau menambal gejala, akar dibiarkan"; frasa pembiar akar wajib bisa dikutip | Q |
| 12 | Kode jebakan (146–147) | "tempel di poin manapun … biasanya di poin 2" (bertentangan) | "tempel di poin 2, 3, atau 4; jangan di kunci; sebar antar-soal. Per paket: jebakan di poin 3/4 ≥ 15/45; tak ada satu kode > 50% di satu poin" | G |
| 13 | Tabel J (153) | J3 = eskalasi prematur | J3 = naik terlalu cepat. Atasan/pihak berwenang **sah sebagai kunci** bila ada pemicu: (a) benturan wewenang, (b) darurat, (c) pola merugikan nyata di luar wewenang. Tanpa pemicu, lapor atasan = J3, skor 2–3 | F/P8 |
| 14 | Tabel J (baru) | J1–J4 | + **J5 vonis dini** (menebak penyebab sebelum dicek) · **J6 ulang cara gagal** — keduanya status uji, dibuang bila tak muncul di batch berikut | P |
| 15 | Resep baku (164) | J1–J4 | J1–J6, aturan sebar butir 12 | G, P |
| 16 | Pilar 4 judul (188) | "8 LARANGAN KERAS" | "11 LARANGAN KERAS" | H |
| 17 | Pilar 4 no. 2 (192–200) | kunci **strictly** lebih pendek | dihapus. Ganti: **sebaran panjang per paket** — kunci terpanjang ≤ 20%, kunci terpanjang ke-2 ≤ 30%, poin 4 terpanjang ≤ 30% (seri = 1/k); selisih terpanjang–terpendek per soal ≤ 3 kata; dicek modul tebakan validator | A+L |
| 18 | Pilar 4 no. 3 (201–204) | sambil/sekaligus/serta/disertai | + lalu/kemudian/setelah itu/"dan" + verba me-. Target per paket: "tebak dua-langkah terpanjang" ≤ 30% | B |
| 19 | Pilar 5 (266) | selisih maks 6 kata | maks 3 kata; pita 10–20 tetap | A+L |
| 20 | Pilar 6 fokus AR (288) + baru | — | **Tangga AR (belum diverifikasi, bukan pedoman resmi)**: dugaan → bicara langsung · ucapan/candaan → tegur di tempat · kabar pihak lain → serahkan untuk diverifikasi · konten menyebar → hentikan sebaran + rawat hubungan · pola nyata/terorganisasi → atasan/pihak berwenang · ajakan/tindakan nyata → tolak + lapor. Poin rendah: menyebar sendiri (viral), menyelidiki sendiri, mengucilkan balik. Ambang lapor = 3 pemicu (terorganisasi/menyebar · aturan tertulis dilanggar · ajakan/tindakan nyata). Label sementara: keberagaman tanpa ajakan memusuhi/kekerasan/pola terorganisasi = Sosial Budaya | T, V |
| 21 | Pilar 6 fokus TIK (287) + baru | — | **Tangga TIK (status uji)**: 5 verifikasi kanal resmi + lapor · 4 aman pribadi tanpa lapor · 3 menghindar (hapus/abaikan/blokir) · 2 tanya rekan · 1 tindakan berisiko (klik, balas, teruskan, unggah) | W |
| 22 | Pilar 6 peta paket (291) | — | + ≥ 3 **pasangan kontras** (permukaan mirip, kunci berlawanan karena satu fakta), jarak ≥ 5 nomor, konteks beda | S |
| 23 | Prosedur langkah 2–3 (339–343) | — | + tulis fakta penentu | O |
| 24 | Prosedur langkah 7 (352) | J1–J4 | J1–J6 + aturan sebar | G, P |
| 25 | Prosedur (baru, langkah 10) | — | **Cek buta** (paket baru + audit bank 80), hanya atas perintah Gusti: penilai beda model/manusia diutamakan; hasil "sama" ≠ bukti valid; hasil "beda" = daftar reviu; tanpa ambang angka | J |
| 26 | Gerbang 2 (382–392) | "minimal satu distraktor sama/lebih panjang" | rujuk Pilar 4 no. 2 baru (sebaran per paket + selisih ≤ 3) | A+L, H |
| 27 | Gerbang 3 (394–400) | dua kalimat pembeda | + kutip fakta penentu | O |
| 28 | Gerbang 4 (420) | "batas satu-kutub yang eksplisit" | "gagal di satu sumbu, frasa bisa dikutip" | D |
| 29 | Gerbang 4 (422–431) | kata sambung lama · strictly | kata sambung baru · sebaran per paket | A+L, B |
| 30 | Gerbang 4 (baru) | — | jebakan sebar (G) · ≥ 3 pasangan (S) · tabel lembar reviu "tindakan sejenis → skor → fakta pembeda" (R) · catatan "menunggu" (M) · sebaran sumbu poin 4 ≤ ±35% per sumbu = **catatan reviu, bukan gerbang** (F) | G, S, R, M, F |
| 31 | Format output (451–459) | KUNCI…PEMBAHASAN | + `FAKTA PENENTU`, `PASANGAN` (nomor/—), `TANGGA AR` (soal AR). Pembahasan dua format: **reviu** (4 butir sekarang, kode boleh) dan **siswa** (fakta penentu → tiap opsi: skor + satu alasan + "tapi …" → tips), bebas istilah dapur | O, S, T, I |
| 32 | Contoh terbimbing (474–531) | — | + baris FAKTA PENENTU + contoh pembahasan siswa untuk soal yang sama | O, I |
| 33 | Akhir dokumen | — | **Changelog v1.3** (daftar butir ini, ringkas) | H |

## 2. Validator

**Temuan:** `tmp/validate_tkp_json.js` usang (skema bank 50 soal: `items.length === 50`, `poin[x].nilai`); dijalankan ke `cat-tkp-app/src/data/bank_soal_tkp_80.json` = 736 error. Validator yang hidup = `tmp/validate_soal.js` (HTML; bank 80 dan Batch 2 = 0 error). **Rencana: semua cek baru dipasang di `validate_soal.js`; `validate_tkp_json.js` tidak disentuh** (keputusan G/I yang menyebut file itu dialihkan ke sini).

Perubahan `validate_soal.js`:
1. Hapus error strictly-shorter (baris 140–146). Selisih per soal > 3 = error (baris 139, dari 6).
2. Kata sambung (baris 132): + `lalu|kemudian|setelah itu`, dan "dan" + kata ber-awalan me-.
3. Kode jebakan (baris 163/169): `J[1-4]` → `J[1-6]`; simpan per opsi (huruf → kode) untuk cek sebaran.
4. **Modul tebakan** (satu daftar yang bisa ditambah: `{nama, tebak(soal), batas}`):
   - tebak terpanjang: kunci terpanjang ≤ 20%, ke-2 ≤ 30% (seri = 1/k);
   - poin 4 terpanjang ≤ 30%;
   - tebak dua-langkah terpanjang ≤ 30%;
   - kata pertama → poin (U): kata pertama yang muncul ≥ 5× dan ≥ 60% di satu poin = peringatan; ≥ 8× = error.
5. Sebaran jebakan (G): soal dengan jebakan di poin 3/4 ≥ 1/3 paket; satu kode > 50% di satu poin = error (**tambahanku: hanya dihitung bila kode itu muncul ≥ 4×**, supaya 2 kemunculan tidak langsung jadi 100%).
6. Field baru per soal (label HTML `<span class="label">…</span>`, dibaca `field()` yang sudah ada):
   - `Fakta penentu`: wajib, harus muncul persis di stem (error); berbagi kata isi ≥ 5 huruf dengan kunci = peringatan;
   - `Pasangan`: nomor soal atau "—"; nomor wajib ada, timbal balik, jarak ≥ 5; jumlah pasangan ≥ 3;
   - `Tangga AR`: wajib di soal Anti Radikalisme, nilainya salah satu dari 6 anak tangga.
7. Istilah dapur (I): blok baru `<div class="pembahasan-siswa">`; isinya dicek dengan regex validate_bank_100.mjs baris 127 + kode TKP (`J[1-6]`, `S[1-5]`, `L[1-3]`, "poin 4"-gaya kode) = error. Blok tidak ada = peringatan.
8. Ambang per paket (4, 5, 6-pasangan) = **error bila file ≥ 30 soal, peringatan bila < 30** (batch kecil terlalu berisik).
9. Penutup cap: rumus sekarang `ceil(n/12)×2` → paket 45 = 8, engine tulis 7. Rencana: engine ikut rumus (**8**), karena 30 → 6 dan 80 → 14 di engine juga hasil rumus yang sama.

**Akibat yang perlu kamu tahu:** sesudah diff, bank 80 dan Batch 2 akan **gagal** validator (contoh: 50/80 soal bank 80 punya selisih > 3; belum ada fakta penentu/tangga AR). Itu wajar — keduanya ditulis dengan v1.2 dan baru dibenahi saat audit (menunggu perintah). `build.sh` tidak menjalankan validator, jadi build tidak rusak. `html_to_json.js` tidak diubah (aplikasi belum butuh field baru).

## 3. Skill (sinkron, diff yang sama)

| File | Baris | Jadi |
|---|---|---|
| `SKILL.md` | 27 | "(TKP: strictly lebih pendek …)" → "(TKP: sebaran panjang per paket + selisih ≤ 3, engine v1.3 Pilar 4 no. 2)" |
| `SKILL.md` | 53 | J1–J4 → J1–J6 |
| `references/tkp.md` | 3, 12, 14, 17, 24, 28 | v1.3; definisi poin 1/2 (M); J1–J6; strictly → sebaran; penutup 45 = 8×; catatan baris 28 diberi "dicabut v1.3" (riwayat tetap) |
| `references/aturan-tetap.md` | 18 (B-3), 46 (E-1) | B-3 + kata sambung baru, rujuk sebaran TKP; E-1 J1–J4 → J1–J6 |

Sesudah ubah: `python3 ~/.claude/skills/skd-expert/cek.py` harus `cek OK`.

## 4. Urutan kerja sesudah disetujui
1. Engine (butir 1–33) → baca ulang diff.
2. `validate_soal.js` → jalankan ke Batch 2 dan bank 80; laporkan error baru (diharapkan), bukan memperbaikinya.
3. Skill sync → cek.py.
4. Status riset + memory.md + memori proyek diperbarui.
Tidak commit/push. Tidak menyentuh bank.
