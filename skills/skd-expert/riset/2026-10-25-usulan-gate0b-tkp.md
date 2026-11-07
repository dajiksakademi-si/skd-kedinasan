# Usulan Gate 0b: produksi 3 paket TKP (2026-10-25)

Status: **DITERAPKAN SEMUA a–e termasuk opsional (Gusti 2026-10-25).** Bank tidak diubah; blueprint paket belum dibuat.
Dasar: rencana `2026-10-25-rencana-produksi-tkp-3paket.md` §2 dan §4, Gate 0a (grid 9/9/7/7/6/7), `usulan/2026-10-25.md`.
Draf kode (sudah diuji di salinan) ada di `~/.claude/skills/skd-expert/riset/gate0b-draf/`.
Kutipan resmi: sumber: `REFERENSI LUAR/KEPMENPANRB 406-2026 2026-10-25/KepmenPANRB_406_2026_Ambang_Batas_SKD_Sekolah_Kedinasan.pdf`

## a. Engine Pilar 6 (`ENGINE_GENERATE_SOAL_TKP.md`)
**a-1. Kalimat dasar** (baris 318–320). Lama:
> Porsi dimensi di bawah adalah heuristik desain engine ini, **bukan** proporsi resmi ujian — sesuaikan bila user beri kisi lain.

Baru:
> **KepmenPANRB 406/2026 tidak mengatur porsi per aspek** (diktum KEDUA c hanya menyebut 6 aspek dan tujuannya). Porsi di bawah adalah heuristik desain engine ini — sesuaikan bila user beri kisi lain.

**a-2. Subbagian baru sesudah tabel grid: "Batas dimensi (definisi resmi)".** Kutipan diktum KEDUA c:
| Dimensi | Tujuan resmi (dipakai sebagai batas) |
|---|---|
| Pelayanan Publik | menampilkan perilaku keramahtamahan dalam bekerja yang efektif agar bisa memenuhi kebutuhan dan kepuasan orang lain sesuai dengan tugas dan wewenang yang dimiliki |
| Jejaring Kerja | membangun dan membina hubungan, bekerja sama, berbagi informasi dan berkolaborasi dengan orang lain secara efektif |
| Sosial Budaya | beradaptasi dan bekerja secara efektif dalam masyarakat majemuk, terdiri atas beragam agama, suku, budaya, dan sebagainya |
| TIK | memanfaatkan teknologi informasi secara efektif untuk meningkatkan kinerja |
| Profesionalisme | melaksanakan tugas dan fungsi sesuai dengan tuntutan jabatan |
| Anti Radikalisme | menjaring informasi tentang pengetahuan terhadap anti radikalisme, kecenderungan bersikap, dan bertindak saat menanggapi stimulus |

Aturan pakai (satu kalimat): soal masuk dimensi yang tujuannya **paling langsung diuji oleh kunci**; ragu antara dua → tulis alasannya di lembar reviu. Label V (keberagaman tanpa ajakan memusuhi/kekerasan/pola terorganisasi = Sosial Budaya) tetap, kini bersandar pada definisi resmi Sosbud.

**a-3 (ikutan, opsional).** Baris 6 engine dan `PROJECT_MEMORY.md` baris 54: "Permenpan RB No. 1/2023" (belum pernah diverifikasi) → "KepmenPANRB 406/2026". Changelog engine: entri v1.3.1. Engine jadi ±727 baris (sudah di atas 500 sebelum ini).

## b. Validator `tmp/validate_soal.js` (draf: `gate0b-draf/validate_soal.diff`, +27 baris)
Yang sudah ada: hitungan dimensi/level/kunci hanya **dicetak**; grid (peringatan) + kunci 4–8 hanya untuk paket **30**; penutup maks 8× di paket 45 **sudah ada** (phraseCap).
Belum ada → diusulkan:
1. `itemCount === 45`: dimensi tepat 9/9/7/7/6/7 → error.
2. `itemCount === 45`: level Tinggi 25–29 dan Sangat Tinggi 16–20 → error (default 27/18).
3. `itemCount === 45`: kunci 7–11 per huruf → error.
4. Tambahan (opsional): huruf kunci sama berderet 3× → `paketIssue` (error bila ≥ 30 soal). Aturan ini ada di CLAUDE.md project, belum ada di validator.

Uji di salinan: bank 80 tetap 252 error/87 peringatan, Batch 1 tetap 36/20 (tidak ada error baru; bank 80 tidak punya deret kunci 3×). Potongan 45 soal pertama bank 80 memicu 5 error grid; level 27/18 dan kunci 9×5 lolos; uji negatif level 30/15 tertangkap.

## c. Script baru `tmp/cek_lintas_paket.js` (draf: `gate0b-draf/cek_lintas_paket.js`, 88 baris)
`node tmp/cek_lintas_paket.js <paket_baru.html> [pembanding...]`; tanpa pembanding = bank 80 + Batch 1 (Batch 2 = soal 1–12 bank 80, tidak diulang). Paket 2 dan 3 menambahkan paket sebelumnya sebagai pembanding.
- **Field baru `Latar`** wajib di soal paket baru (diisi dari blueprint). Bank lama tidak punya field ini, jadi latarnya diambil dari peran di kalimat pertama stem ("Anda petugas loket Samsat" → "petugas loket samsat"); 92/92 soal lama terbaca.
- Dalam paket: ≥ 12 latar berbeda, satu latar maks 3×.
- Konstruk kembar: sama persis atau Jaccard kata isi ≥ 0.40 → error; ≥ 0.25 dan latar sama → error; ≥ 0.25 saja → peringatan. Dicek antarsoal dalam paket baru juga.
- Kalibrasi ke bank lama: Jaccard konstruk tertinggi 0.29; satu-satunya pasang ≥ 0.25 = B80-12 vs B1-11 (memang mirip: kecepatan isu viral vs klarifikasi resmi).
- **Batas jujur:** cek leksikal. Konstruk kembar yang diparafrasa dengan kata lain lolos; tetap perlu dibaca manusia.
- **Penutup maks 8×: tidak kuulang di script ini** karena sudah dicek `validate_soal.js` per paket. Kalau kamu tetap mau di sini, tambah ±5 baris.

Uji: salinan Batch 1 + field Latar (puskesmas 4×) + konstruk salinan B80-12 → 2 error (latar 4×, konstruk kembar) + 2 peringatan mirip 0.29.

## d. Script blueprint `tmp/blueprint_tkp.js` (draf: `gate0b-draf/blueprint_tkp.js`, 222 baris)
`node tmp/blueprint_tkp.js <1|2|3>` → `tmp/blueprint_paket<n>.json`; `--cek <file>` untuk blueprint yang diedit tangan; `--selftest`. Biji acak = nomor paket (bisa dibuat ulang persis). File yang sudah ada tidak ditimpa tanpa `--force`.
Per slot: dimensi, level, kunci, poin per huruf, sumbu poin 3/4, jebakan (kode + poin + huruf), **target jumlah kata per huruf**, huruf dua-langkah, jenis poin 1, penutup, latar, jangkar, pasangan, anak tangga AR, tanda tangga TIK.

Kuota yang dipasang lalu dicek sendiri:
| Kuota | Nilai di blueprint |
|---|---|
| dimensi / level | 9/9/7/7/6/7; 27/18 (Sangat Tinggi 4/4/3/3/2/2) |
| dimensi berderet | maks 2 (paket diacak, tidak dikelompokkan per dimensi) |
| kunci | 9 per huruf, tidak berderet > 2 |
| sumbu | poin 3 ≠ poin 4; tiap S1–S5 12–24× (18 ± 35%) |
| jebakan | 1 per soal, poin 2/3/4 = 15/15/15; J1 8 · J2 8 · J3 8 · J4 9 · J5 6 · J6 6; tidak ada kode > 50% di satu poin |
| panjang | kata b+3/b+2/b+1/b+1/b (b 11–16, selisih 3); batas lebih ketat dari validator: kunci terpanjang ≤ 15%, ke-2 ≤ 22%, poin 4 terpanjang ≤ 22% |
| dua-langkah | ±40% slot kunci ikut + ≥ 1 opsi lain; kunci = dua-langkah terpanjang ≤ 22% |
| poin 1 | 25 aktif (a–f merata) / 20 pasif |
| penutup | 8 penutup × 5–6, tidak sama berturut |
| latar | 18 latar × 2–3 dari kamus 20 latar generik (bisa kamu edit) |
| jangkar realita | 20 |
| pasangan | 1 AR (anak tangga beda) + 3 dimensi lain, jarak ≥ 5 |
| tangga AR | 7 soal, ≥ 4 anak tangga, maks 2 per anak tangga |
| tangga TIK | 3 dari 6 soal TIK bertema keamanan digital |

Uji: selftest OK (blueprint rusak: dimensi, deret kunci, sumbu sama → tertangkap); paket 1/2/3 lolos di percobaan ke-23/1/34. Contoh: `gate0b-draf/contoh_blueprint_paket1.json`.
Keputusan kecil yang kuambil sendiri (ubah bila tidak setuju): paket diacak (bukan dikelompokkan per dimensi), TIK keamanan digital 3/6, kamus latar.

## e. Koreksi `references/domain-skd.md` (sesuai `usulan/2026-10-25.md`)
| Baris | Lama | Baru |
|---|---|---|
| 7 | TKP: tiap opsi bernilai 1–5, tidak ada nol | TKP: opsi bernilai 1–5, **tidak menjawab = 0** [terverifikasi: Kepmen 406/2026 diktum KELIMA] |
| 6, 8 | 110 soal/100 menit; maks 150/175/225/550 (belum diverifikasi) | sama, [terverifikasi: diktum KETIGA, KEEMPAT, KEENAM] |
| baru | — | Ambang **sekolah kedinasan 2026: TWK 65 · TIU 80 · TKP 156**; afirmasi daerah tertentu: kumulatif ≥ 281 dan TIU ≥ 55 [diktum KEDELAPAN–KESEPULUH] |
| 9 | CPNS umum 65/80/166 | tetap, tetap "belum diverifikasi" (Kepmen 406 hanya kedinasan) |
| 18 | TKP 6 aspek (Permenpan 1/2023 — cek) | 6 aspek + tujuan **terverifikasi** (diktum KEDUA c); **porsi per aspek tidak diatur** |
| 22 | TKP tanpa nilai nol → wajib dijawab | TKP kosong = 0, opsi terendah 1 → setiap soal wajib dijawab |
| 26 | cari ambang kedinasan 2026 | selesai untuk kedinasan 2026; CPNS 2026 masih dicari |

Tiap baris terverifikasi diberi penanda sumber ke PDF salinan (dicek cek.py). Ikutan: `references/tkp.md` baris 43 (Permenpan 1/2023) → Kepmen 406/2026.
Opsional e-4: kisi TWK (5 aspek) dan TIU (verbal/numerik/figural + subtipe) di Kepmen yang sama cocok dengan baris 13–17 → bisa ditandai terverifikasi juga.
