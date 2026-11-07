# Tahap 5 · Kelompok 4 — Bab 11 Kecukupan Data, Bab 12 Penalaran Analitis, Bab 13 Optimasi Tabel (produksi soal)

Handbook TIU D'Ajiks Akademi · 2026-11-02 · subagen tiu-t5-kck
Status: 31 butir ditulis dan dipasang (pembuka 3, contoh 14, latihan 12, Latihan Bukti 2); pembahasan 7 langkah untuk 17 soal pembuka/contoh; build galat 0. **Cek buta belum dilakukan** (sengaja; berkas `scripts/data/kck_b11_13_buta.json` siap untuk pemeriksa baru).

## Berkas
| Berkas | Status | Isi |
|---|---|---|
| `scripts/data/kck_b11_13.json` | baru | satu sumber teks 31 butir: soal (pengantar, pernyataan/syarat, tanya), pilihan, kunci, kode, nama kekeliruan, kalimat penentu, alasan kunci, kerangka, TO terdekat, catatan reviu, pembahasan (pembuka + contoh), contoh jawaban + syarat jawaban (Latihan Bukti); field `bukti` ditulis script |
| `scripts/data/kck_b11_13_buta.json` | baru | id, bab, target, soal (tabel dari model, pangkat ditulis x²), pilihan — tanpa kunci/kode/pembahasan |
| `scripts/kck/alat_kck.mjs` | baru (119 baris) | `kck2` (semua keadaan, status (1)/(2)/gabungan, uji rentang: dunia diperlebar ×2 wajib memberi makna sama; bunyi templat Pilar 5 + urutan acak), `kck3` (tujuh himpunan + semua 19 peta monoton: paling banyak satu pilihan benar), `pvq`, `lingkar` (orang pertama dikunci, kanan = berlawanan arah jarum jam, konvensi terbalik untuk uji J-BALIK), `garis`, `tanya` (pasti/mungkin/tidak mungkin), `perlu` (tiap syarat memangkas + mengubah status), `kombinasi` |
| `scripts/kck/model_kck.mjs` · `model_ana.mjs` · `model_opt.mjs` | baru (180/169/146 baris) | model per soal: pilihan, kunci, kode, bukti, tabel soal, angka yang boleh di pembahasan |
| `scripts/soal_kck.mjs` | baru (225 baris) | pemeriksa + perender pola `soal_numerik.mjs`; `--tulis` menulis blok src, bukti, berkas buta |
| `src/21_bab11.html`, `22_bab12.html`, `23_bab13.html` | diubah | 31 slot → blok `<!--Bxx-yyy:mulai-->`; pembuka dua blok + tautan dua arah (T5-4, T5-18); Latihan Bukti `<div data-soal>` tanpa `data-target` |
| `src/build.py` | 1 baris | menjalankan `soal_kck.mjs` |
| `scripts/cek_lampiran.mjs` | 2 tambahan | soal terisi tanpa `data-target` (Latihan Bukti) dibaca; kolom L6 Bab 11–13 dari data KCK; `src/96_lampiran_l6.html` blok L6 ditulis ulang (`--tulis`) |
Tidak diubah: data verbal/numerik, `numerik/alat.mjs` (hanya diimpor), bab lain, narasi Bab 11–13 di luar slot.

## Pemeriksaan mesin (`soal_kck.mjs`, 2.814 assert)
1. Pilihan, kunci, kode di data = model. Kunci tunggal: KCK = semua keadaan (makna sama bila batas dunia diperlebar ×2); tiga pernyataan = tujuh himpunan + 19 peta monoton; P vs Q = semua nilai x + ujung rentang dibalik; analitis = semua susunan/pembagian/pemetaan (lingkar diuji dua arah kanan), tiap syarat memangkas susunan dan mengubah status pilihan (kata tanya pasti) atau hitungannya (mungkin/tidak mungkin); pilih susunan = tiap syarat menggugurkan tepat satu pilihan, skor unsur bersama kunci di tengah; optimasi = semua kombinasi, optimum global tunggal ada di pilihan (B-15); membaca data = status tiap pernyataan.
2. Bentuk: pilihan angka urut naik + jarak (alat.mjs `ujiAngka`, T5-16); kunci bukan terpanjang/terpendek tunggal (di luar bunyi baku Pilar 5 / PKU); bentuk kalimat kunci dimiliki ≥ 1 pilihan lain (analitis, kombinasi); kunci tidak di pasangan cermin tunggal; sebaran A–E kelompok selisih ≤ 1, ≤ 2 berturut.
3. Bahasa: daftar LARANGAN soal_numerik (termasuk "maka", "karena itu", "satu-satunya", istilah dapur), kode tidak bocor; 7 langkah lengkap, kalimat penentu dikutip, alasan kunci ≤ 2 kalimat; **57 rantai hitung** pembahasan dihitung ulang; angka lain wajib berasal dari soal/pilihan/tabel/model.
4. Rujukan Latihan A Bab 19: B11-L01 memuat J-ASUMSI (D), B11-L05 memuat J-ULANG (C), B12-L03 memuat J-MUNGKIN (B).

## Tabel per soal
| ID | Jenis | Kunci | Kode pilihan salah | Bukti singkat (model) |
|---|---|---|---|---|
| B11-P01 | KCK ya/tidak + laju | C | A J-ASUMSI · B J-RASIO · D J-MUNGKIN · E J-TENTU | semua laju P, Q 100–4.000 lembar/jam (diperlebar 8.000); (1) tidak cukup · (2) tidak cukup · gabungan cukup; gabungan 4.800 : 1.800 = 2 jam 40 menit, pasti tidak |
| B11-B01 | Latihan Bukti rasio | contoh jawaban | — | semua pasangan jahe–mint 1–200 yang berbanding 3 : 4; dua keadaan paling sederhana (3, 4) dan (6, 8) |
| B11-B02 | Latihan Bukti persen | contoh jawaban | — | semua suara Rani 1–300 dengan Sigit = 1,5 × Rani: persentase Rani selalu 40% |
| B11-C01 | KCK aljabar | C | A J-MUNGKIN · B J-PERSAMAAN · D J-PERSAMAAN · E J-TANDA | semua x, y bulat −60…60 (diperlebar −120…120); (1) tidak cukup · (2) tidak cukup · gabungan cukup; x + y di (1): ±2, ±4, ±6, ±8, ±12, ±24; gabungan x = 7, y = 1 |
| B11-C02 | KCK nilai dari tabel | D | A J-BERHENTI · B J-LANGKAH · C J-PENGALIH · E J-PENGALIH | bibit Cendana 0–300 × lama kerja 1–10 jam (diperlebar); (1) cukup · (2) cukup · gabungan cukup; (1) 4 × 57 − 172 = 56, (2) 7 × 8 = 56 |
| B11-C03 | KCK ya/tidak + laju | B | A J-ASUMSI · C J-PENGALIH · D J-ASUMSI · E J-TENTU | laju tim A 1–39 m/jam dengan pagar belum selesai (diperlebar ke langkah 0,5); (1) tidak cukup · (2) cukup · gabungan cukup; (2) 48 : 3 = 16 m/jam, sisa 72 m perlu 4,5 jam |
| B11-C04 | KCK rasio | E | A J-RASIO · B J-RASIO · C J-PERSAMAAN · D J-MUNGKIN | semua pasangan mangga–jambu 1–300 (diperlebar 600); (1) tidak cukup · (2) tidak cukup · gabungan tidak cukup; kedua pernyataan sama-sama 2m = 3j |
| B11-C05 | KCK persen | A | B J-ASUMSI · C J-PENGALIH · D J-ASUMSI · E J-BASIS | semua pasangan SMP–MTs 1–300 (diperlebar 600); (1) cukup · (2) tidak cukup · gabungan cukup; (1) 3 : (7 + 3) = 30% |
| B11-C06 | KCK tiga pernyataan | C | A J-ASUMSI · B J-PERSAMAAN · D J-BALIK · E J-PERSAMAAN | semua isi kotak 0–100 (diperlebar 200), tujuh himpunan pernyataan: hanya {1, 3} dan {1, 2, 3} cukup; 19 peta monoton diuji, tiap peta paling banyak satu pilihan benar |
| B11-C07 | PKU berpeubah | D | A J-TANDA · B J-BATAS · C J-MUNGKIN | semua x bulat 3–7: P = Q di x = 3, P < Q di x = 4–7; ujung kiri dibalik (4–7) → hanya P < Q (pilihan B); P − Q = (x − 3)(x − 8) |
| B11-L01 | KCK nilai dari cerita | A | B J-PENGALIH · C J-PENGALIH · D J-ASUMSI · E J-PERSAMAAN | semua banyak pensil–penghapus yang memberi Rp44.000; (1) cukup · (2) tidak cukup · gabungan cukup; (1) 2.500p + 3.000p = 44.000 → p = 8 |
| B11-L02 | KCK rasio | B | A J-ASUMSI · C J-PERSAMAAN · D J-RASIO · E J-RASIO | semua pasangan anak–remaja 1–200 (diperlebar 400); (1) tidak cukup · (2) tidak cukup · gabungan cukup; gabungan 5k : (3k + 6) = 5 : 4 → k = 6, remaja 18; urutan bunyi 2 · G · X · 1 · M |
| B11-L03 | KCK ya/tidak + laju | B | A J-ASUMSI · C J-BATAS · D J-ASUMSI · E J-TENTU | laju tiap troli 10–300 kursi/jam (diperlebar 20–600); (1) tidak cukup · (2) cukup · gabungan cukup; (2) paling banyak 4 × 140 = 560 < 600 |
| B11-L04 | KCK persen | D | A J-BERHENTI · B J-PENGALIH · C J-BASIS · E J-PENGALIH | semua pembagian 480 buku ke tiga golongan (total tertulis, tanpa rentang buatan); (1) cukup · (2) cukup · gabungan cukup; (1) 35% × 480 = 168, (2) 140% × 120 = 168 |
| B11-L05 | KCK aljabar | E | A J-ASUMSI · B J-MUNGKIN · C J-ULANG · D J-PERSAMAAN | semua a, b bulat positif 1–50 (diperlebar 100); (1) tidak cukup · (2) tidak cukup · gabungan tidak cukup; uji coret: (2) benar tepat di keadaan yang sama dengan (1), karena (a + b)² = 144 dan a + b positif |
| B12-P01 | ANA urutan tegak | E | A J-MUNGKIN · B J-MUNGKIN · C J-MUNGKIN · D J-BALIK | 120 susunan lima lantai; sah 3: PLMNO, PLMON, PNLMO (lantai 1 → 5); pilihan benar di {"A":2,"B":2,"C":2,"D":0,"E":3} susunan; tanpa syarat 1–4 tersisa 24/9/4/9 |
| B12-C01 | ANA pilih susunan | C | A J-SYARAT · B J-SYARAT · D J-BALIK · E J-NOMOR | syarat 1–4 menggugurkan pilihan A · B · E · D; tiap pilihan salah melanggar tepat satu syarat; skor unsur bersama {"A":5,"B":5,"C":4,"D":3,"E":3}; susunan sah di luar pilihan 5 |
| B12-C02 | ANA melingkar | A | B J-MUNGKIN · C J-BALIK · D J-NOMOR · E J-MUNGKIN | Andi dikunci di kursi 0; 5.040 susunan, sah 8; dengan syarat jika tersisa 2 (A E D F H G C B / A F D E H G C B, searah jarum jam dari Andi); pilihan benar di {"A":2,"B":1,"C":0,"D":0,"E":1}; arah kanan dibalik → kunci tetap A; … |
| B12-C03 | ANA urutan sebagian | D | A J-ASUMSI · B J-BALIK · C J-MUNGKIN · E J-NOMOR | 5.040 urutan; sah 10 (ABDCEFG, ABDCFEG, ABDFCEG, AFBDCEG, FABDCEG, BDACEFG, BDACFEG, BDAFCEG, BDFACEG, FBDACEG); pilihan benar di {"A":3,"B":2,"C":1,"D":0,"E":2} susunan; "tepat setelah" dilonggarkan → C sebelum D jadi mungkin;… |
| B12-C04 | ANA pencocokan | B | A J-SYARAT · C J-SYARAT · D J-KATA · E J-SYARAT | 576 pemetaan; sah 11; pilihan benar di {"A":0,"B":1,"C":0,"D":0,"E":0} pemetaan; B hanya di I Bogor/kereta, J Cirebon/mobil, K Serang/bus, L Garut/motor; C gugur oleh syarat 2 dan 3 bersama; tanpa syarat 1–4 tersisa 16*/40/48/20 |
| B12-L01 | ANA pilih susunan | B | A J-SYARAT · C J-SYARAT · D J-BALIK · E J-NOMOR | syarat 1–4 menggugurkan pilihan A · C · D · E; tiap pilihan salah melanggar tepat satu syarat; skor unsur bersama {"A":7,"B":6,"C":5,"D":7,"E":5} |
| B12-L02 | ANA bentuk kecukupan data | A | B J-ASUMSI · C J-MUNGKIN · D J-SYARAT · E J-ASUMSI | Nadia dikunci di kursi 0, Omar di hadapannya: 24 susunan; (1) 4 kemungkinan, (2) 3 kemungkinan, gabungan 2 susunan dengan jawaban Nadia; arah kanan dibalik → makna tetap; urutan bunyi G · 1 · M · X · 2 |
| B12-L03 | ANA jadwal | A | B J-MUNGKIN · C J-ASUMSI · D J-SYARAT · E J-SYARAT | 90 pembagian; sah 2 (Senin UV, Selasa TW, Rabu YZ / Senin UV, Selasa TY, Rabu WZ); pilihan benar di {"A":2,"B":1,"C":1,"D":0,"E":0}; "tidak" syarat 4 terlewat → D pasti; tanpa syarat 1–4 tersisa 14/4/8/4 |
| B12-L04 | ANA melingkar | E | A J-MUNGKIN · B J-NOMOR · C J-BALIK · D J-MUNGKIN | Aldi dikunci di kursi 0; 720 susunan, sah 2 (A D G E F C B / A E G D F C B, searah jarum jam); pilihan benar di {"A":1,"B":2,"C":1,"D":1,"E":0}; arah kanan dibalik → kunci tetap E; tanpa syarat 1–3 tersisa 36/6/16 |
| B13-P01 | OPT termurah | D | A J-BATAS · B J-LANGKAH · C J-HEMAT · E J-HEMAT | 6720 kombinasi; 6487 memenuhi ≥ 90 botol; optimum tunggal 6 kemasan isi 15 = Rp207.000 = batas bawah 90 × Rp2.300; pilihan: A 87 botol Rp201.300 (tidak sah), B 96 botol Rp240.000, C 92 botol Rp221.600, D 90 botol Rp207.000, E 9… |
| B13-C01 | OPT termurah | B | A J-SYARAT · C J-LANGKAH · D J-HEMAT · E J-BATAS | 7480 kombinasi; 56 sah (64–70 buku, stok dipatuhi); optimum tunggal 0,2,4,0 = Rp337.600; batas bawah Rp332.800 hanya dicapai 8 paket isi 8 (stok 4) |
| B13-C02 | OPT terbanyak | D | A J-HEMAT · B J-BATAS · C J-LANGKAH · E J-HEMAT | 585 kombinasi; 69 dalam anggaran; isi terbanyak 31 pot (2,5,0); batas atas 320.000 : 10.000 = 32 tidak tercapai; habis tepat Rp320.000 paling banyak 29 pot |
| B13-C03 | DAT dua periode | A | B J-BASIS · C J-AKAL · D J-PENGALIH · E J-LANGKAH | status dari tabel: A pasti benar · B pasti salah · C tidak dapat ditentukan · D pasti salah · E pasti salah; kenaikan 25%, 20%, −10%; jumlah 790 → 915 |
| B13-L01 | DAT satu periode | C | A J-LANGKAH · B J-BASIS · D J-TENTU · E J-AKAL | status dari tabel: A pasti benar · B pasti benar · C tidak dapat ditentukan · D pasti salah · E pasti benar; lulus 104 dari 130; persentase 80%, 75%, 88%, 80% |
| B13-L02 | OPT termurah | E | A J-HEMAT · B J-LANGKAH · C J-LANGKAH · D J-BATAS | 180 kombinasi; optimum dengan ongkos 0,4,0 = Rp375.000; tanpa ongkos 1,1,1 = Rp340.000; D = 5,1,0 (35 kg, kurang) |
| B13-L03 | OPT termurah | E | A J-BATAS · B J-SYARAT · C J-SYARAT · D J-HEMAT | 729 kombinasi; 649 memenuhi ≥ 9 buku dan ≥ 11 pulpen; optimum tunggal 2 X + 3 Y = Rp194.000; A 7 buku 13 pulpen Rp192.000, B 10 buku 6 pulpen Rp158.000, C 5 buku 11 pulpen Rp155.000, D 9 buku 11 pulpen Rp202.000, E 9 buku 11 pu… |

## Sebaran kunci
Urutan buku (Latihan Bukti tanpa huruf): Bab 11 `C C D B E A C D · A B B D E` · Bab 12 `E C A D B · B A A E` · Bab 13 `D B D A · C E E`.
Kelompok (29 soal berhuruf): **A 6 · B 6 · C 5 · D 6 · E 6**; tidak ada huruf sama > 2 berturut. Per bab: Bab 11 A2 B3 C3 D3 E2 · Bab 12 A3 B2 C1 D1 E2 · Bab 13 A1 B1 C1 D2 E2 (keseimbangan dijaga per kelompok, T5-13).
Urutan bunyi diacak (T2-7(7)): B11-L02 kunci B (gabungan), B12-L02 kunci A (gabungan); keduanya bukan C.

## Penyimpangan dari catatan slot (dicatat di `catatan_reviu`, aturan T5-11)
| ID | Penyimpangan | Alasan |
|---|---|---|
| B12-L03 | kata tanya "mungkin benar" → **"pasti benar"** | rujukan Latihan A Bab 19 no. 5 menuntut pilihan J-MUNGKIN ("menganggap yang mungkin benar sebagai pasti benar"); kekeliruan itu hanya punya jalur pada kata tanya "pasti" |
| B12-C04 | kata tanya "pasti benar" → **"mungkin benar"**; kode J-SYARAT ×3 + J-KATA (slot: J-MUNGKIN, J-SYARAT, J-ASUMSI) | agar Bab 12 tetap punya satu soal "mungkin"; pada kata tanya mungkin, J-MUNGKIN/J-ASUMSI tidak punya jalur |
| B11-C06 | kunci B → C (pilihan per soal) | keseimbangan kelompok |
| B13-C02 | kunci E → D; pilihan E = batas atas 32 (J-HEMAT) | batas atas yang tak tercapai harus jadi pilihan di atas kunci |
| B13-L02 | kunci D → E | pasangan B13-C02, sebaran Bab 13 tetap |
| B11-C02 | (1) "total kolom" ditulis sebagai rata-rata; B = J-LANGKAH | pilihan B butuh jalur nyata |
| B11-P01 D, B11-C01 A, B11-C04 D | J-MUNGKIN tambahan | jalur wajar pilihan itu = satu contoh dicoba |
| B11-C03 E, B11-L03 E | J-TENTU tambahan | jawaban pasti "tidak" |
| B11-C06, B11-L05, B12-L02 | J-BERHENTI tidak dipakai | tidak ada jalur berhenti di (1) bila kunci G/X atau bunyi khusus; diganti J-ASUMSI/J-BALIK/J-MUNGKIN/J-SYARAT |
| B12-C03 | J-SYARAT → J-MUNGKIN + J-NOMOR | pada kata tanya tidak mungkin, melonggarkan syarat tidak membuat pilihan mungkin tampak mustahil |
| B13-C03 | J-TENTU → J-LANGKAH (E, total tidak dijumlahkan) | J-TENTU tidak punya jalur pada kata tanya pasti benar |
| B13-L01 | kunci B → C (T4-19, sesuai catatan slot) | — |
| B13-P01 | kemasan isi 8 (bukan isi 6) | "15 kemasan isi 6" dan "6 kemasan isi 15" = pasangan cermin tunggal dengan kunci (ditangkap pemeriksa) |

## Hasil cek
- `node scripts/soal_kck.mjs`: semua assert lulus · 2.814 butir · 57 rantai hitung · kunci `CCDBEACDABBDEECADBBAAEDBDACEE`.
- `python3 src/build.py`: **galat 0**; semua script cek lulus (soal_verbal 1.478, soal_numerik 5.669 assert tanpa beda, cek_bab11_13 67, cek_bab19 852, cek_lampiran 553). Pita bab tetap ±90/±120/±120 detik. Slot kosong tersisa 65 (Bab 1, 2, 14–19).
- `pdftotext` siswa: 0 `file:///`, 0 kode J-, 0 "jebakan".
- Cek mata (pdftoppm, lembar kontak 45 dpi + 3 halaman 70–80 dpi, di scratchpad): hitungan, tabel soal, tautan pil "Lihat pembahasan"/"Kembali ke soal", catatan pengajar terbaca. Tata letak yang dicatat untuk T7 (tidak diperbaiki): siswa hlm 121 (Contoh 4 Bab 11: kotak Pilihan yang Gugur pindah halaman, ±45% kosong); hlm 151–152 (kotak Jawaban Contoh 1 Bab 13 terpisah dari Pilihan yang Gugur).

## Halaman
Siswa **201 hlm** (sebelumnya 179; Bab 11 hlm 107–129, Bab 12 130–144, Bab 13 145–156). Pengajar **223 hlm** (sebelumnya 195; Bab 11 mulai hlm 111, Bab 12 hlm 134, Bab 13 hlm 150).

## BUTIR PUTUSAN ANTRE (urut prioritas, satu per respons)
1. **Cek buta putaran 1** (subagen baru, hanya `kck_b11_13_buta.json`; tugas A jawab + tugas B penebak bentuk), lalu persetujuan 31 soal. Rekomendasi: jalankan sebelum putusan lain.
2. **Tukar kata tanya B12-L03 (mungkin → pasti) dan B12-C04 (pasti → mungkin).** Rekomendasi: terima; kalimat pengajar "Asal Rancangan Bab 12" (narasi guru di luar slot, belum diubah) masih menyebut L03 "mungkin" dan perlu disunting.
3. **Nama kekeliruan yang belum ada di tabel kekeliruan bab**: B11-C02 B (J-LANGKAH "Berhenti satu langkah sebelum selesai"), B11-C06 D (J-BALIK "Tertukar membaca kotak yang dihasilkan"), B12-C04 D (J-KATA "Memilih karena katanya sama dengan soal"). Narasi bab berbunyi "setiap pilihan salah … lahir dari salah satu kekeliruan berikut". Rekomendasi: tambah tiga baris di tabel Bab 11/12 + cek_bab19 (133 → 136 baris); alternatif: ganti kode pilihan itu.
4. **Pindah huruf kunci** B11-C06 B→C, B13-C02 E→D, B13-L02 D→E. Rekomendasi: terima; kalimat "sebaran huruf rencana" di catatan pengajar Asal Rancangan Bab 11 dan 13 ikut disunting.
5. **Penyimpangan kode lain dari catatan slot** (tabel di atas). Rekomendasi: terima (T5-11).
6. **Satu kode berulang di contoh**: B12-C04 J-SYARAT ×3 (ketentuan berbeda), B11-C04 J-RASIO ×2, B12-C02 J-MUNGKIN ×2. Rekomendasi: terima; T5-12 hanya melarang keempat pilihan satu kode.
7. **Uji "tiap syarat perlu" untuk kata tanya mungkin/tidak mungkin** cukup berupa perubahan banyak susunan yang membenarkan pilihan (B12-C03 ketentuan 1–3, B12-C04 ketentuan 1 tidak mengubah status, hanya hitungan). Alasan: pada dua kata tanya ini hanya status kunci yang bisa berubah. Rekomendasi: terima sebagai aturan.
8. **Pilihan kombinasi (B13-P01, B13-L03) tidak diurutkan** (bukan pilihan angka; T2-D §2.3 no. 9 mengusulkan urut menurut paket pertama). Rekomendasi: terima.
9. **Tata letak** hlm 121 dan 151–152 siswa ditunda ke T7 (sejalan T4-36/T5-15).

## Yang belum dikerjakan / tidak bisa
- Cek buta (sengaja, diluncurkan utama).
- Pembahasan latihan dan contoh jawaban Latihan Bukti di Lampiran B (T6).
- Narasi guru "Asal Rancangan" Bab 11–13 tidak disunting (di luar slot; butir 2 dan 4).

## Perbaikan sesudah cek buta 1 (2026-11-02)
Sumber temuan: `reports/tahap5_kelompok4_kck_buta.md` (Tugas A 29/29 = kunci; Tugas B 14/29). Hitung ulang Tugas B dari tabel laporan: Bab 11 kena 3/13 (P01, C01 = tebakan seragam C; C07 = sinyal nyata), Bab 12 7/9 (C01, C02, C03, C04, L01, L03, L04), Bab 13 4/7 (C01, C03, L01, L03). B13-L02 tidak kena, tetapi kunci = angka terbesar.
Semua angka, status, dan kunci tetap dihitung model (`scripts/kck/model_*.mjs`); kunci dibuktikan tunggal oleh `tanya`/`kck2`/`kombinasi`.

| ID | Perubahan | Kunci |
|---|---|---|
| B13-L01 | kata tanya → "tidak dapat ditentukan benar atau salahnya dari tabel"; pengantar + "Peserta yang belum lulus mengikuti uji ulang pada minggu berikutnya."; C "perempuan" → "Semua peserta kelompok Otomotif yang mengikuti uji ulang dinyatakan lulus."; A → "Peserta yang mengikuti uji ulang paling banyak berasal dari kelompok Listrik." (pasti benar lewat peserta − lulus, J-LANGKAH) | C tetap |
| B12-C04 | A "Ilham naik motor" → "Peserta dari Cirebon naik motor" (Cirebon kini di A dan B; jalur J-SYARAT sama); pembahasan Cara lain, gugur A, Kekeliruan diperbarui | B tetap |
| B12-C03 | C "F kedua" → "Surat A diarsipkan kedua" (1 dari 10, J-MUNGKIN); E "E kelima" pindah ke D; kunci "C sebelum D" pindah ke E (topik F tinggal 2 pilihan) ; pembahasan Cara cepat, Cek balik, gugur C/D, Kekeliruan diperbarui. Catatan: "C kelima" sempat dicoba untuk D, ditolak pemeriksa (ketentuan 5 jadi pajangan) | **D → E** |
| B11-C07 | **tidak diubah.** Permintaan 5 pilihan paralel bertentangan dengan engine v0.4.3 (PKU 4 pilihan tetap; pilihan kelima hubungan khusus tidak saling meniadakan, G4) dan narasi Bab 6 "empat pilihan tetap"; mengganti isi agar kunci bukan D bertentangan dengan T4-13 (C07 = pasangan "tidak dapat ditentukan" untuk B06-L03 yang pasti). Bocor bentuk ini melekat pada templat tetap; perlu putusan Gusti | D tetap |
| B13-L02 | pilihan Rp355.000 (ongkos dihitung sekali) diganti Rp385.000 = kombinasi termurah tanpa ongkos 5 + 10 + 25 kg lalu tiga ongkos (sah, lebih mahal, J-HEMAT). Pilihan: 335.000 · 340.000 · 370.000 · 375.000 · 385.000; jarak T5-16 lulus | **E → D** |
| B12-C02 | B "Eva di kiri Andi" → "Eva duduk tepat di sebelah kanan Dina" (1 dari 2, J-MUNGKIN); pasangan kanan/kiri Andi pecah; gugur B diperbarui | A tetap |
| B12-L03 | E "Wulan bersama Yoga" (membalik ketentuan 2) → "Wulan bertugas pada hari Rabu" (1 dari 2, J-MUNGKIN); dua pasangan sejenis (Tito Selasa/Senin, Wulan Selasa/Rabu) | A tetap |
| B12-L04 | D ditulis ulang "Elang duduk tepat di antara Galuh dan Fani" (isi sama); tiga pilihan "tepat di antara", tiap pasangan berbagi dua nama | E tetap |
| B13-C03 | E tanpa "karena": "Pengunjung ketiga perpustakaan pada Semester 2 lebih sedikit daripada pengunjung pada Semester 1."; gugur E diperbarui | A tetap |
| B13-L03 | B 3 X + 1 Y → 4 X + 1 Y (13 buku, 7 pulpen, Rp198.000); irisan "X + Y" × "5 paket" kini A, B, E; A–B cermin, bukan dengan kunci (3 X + 2 Y ditolak: cermin dengan kunci 2 X + 3 Y) | E tetap |
| B11-C02 | kepala tabel "Regu" → "Kelompok" | D tetap |
| B11-B02 | kalimat tanya + "Kamu boleh memakai huruf, misalnya r untuk suara Rani." | — |
Dinilai tidak nyata, tidak diubah: B12-C01 dan B12-L01 (tebakan "pilihan tengah" pada pilih susunan; skor unsur bersama kunci sudah di tengah), B13-C01 ("tengah klaster"; tebakan angka tengah hanya kena 1 dari 4 soal angka Bab 13).

Kunci baru (urutan buku): Bab 11 `C C D B E A C D · A B B D E` (A2 B3 C3 D3 E2) · Bab 12 `E C A E B · B A A E` (A3 B2 C1 D0 E3) · Bab 13 `D B D A · C D E` (A1 B1 C1 D3 E1). Kelompok **A6 B6 C5 D6 E6**, tidak ada huruf sama > 2 berturut.
Hasil: `soal_kck.mjs` 2.845 assert, 57 rantai hitung; `build.py` **galat 0** (semua cek lulus); siswa **201 hlm**, pengajar **224 hlm** (+1); pdftotext siswa 0 kode J-, 0 `file:///`.
Butir antre tersentuh: (4) pindah huruf kunci — B13-L02 kembali ke D (= rencana slot), B12-C03 baru D → E; kalimat "Sebaran huruf rencana … C3 D" di Asal Rancangan Bab 12 (narasi di luar slot) belum disunting. (6) kode berulang — B13-L02 kini J-HEMAT ×2 (A, E), B12-L03 J-MUNGKIN ×2 (B, E), J-SYARAT ×1 (latihan). Butir lain tidak tersentuh.
Berikut: cek buta putaran 2 (subagen baru, `kck_b11_13_buta.json` sudah ditulis ulang); putusan Gusti untuk B11-C07.
