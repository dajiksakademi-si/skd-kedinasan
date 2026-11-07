# Rencana produksi 3 paket TKP (3 × 45 = 135 soal) dengan engine v1.3 (2026-10-25)

Status: **RENCANA, belum dieksekusi.** Perintah Gusti: "create ultra plan … pastikan sebaran dimensinya sesuai dengan contoh yang ada di alfaiz".
Tidak ada soal yang ditulis sebelum Gate 0 disetujui. Engine, validator, dan skill diubah hanya lewat usulan yang disetujui per butir.

## 0. Titik awal (fakta)
- Soal unik yang ada sekarang 92: bank 80 (soal 1–12 = Batch 2) + Batch 1 (12). Semuanya gagal struktur v1.3 (bank 80: 252 error, Batch 1: 36 error). **Tidak dipakai sebagai isi paket.** Gunanya hanya sebagai daftar "jangan diulang" (konstruk dan latar).
- Peta paket engine sekarang: 9/9/7/7/6/7 (Pilar 6). Engine sendiri menyebut angka ini heuristik, bukan proporsi resmi.
- Validator hanya mengecek grid dimensi untuk paket **30** soal (`validate_soal.js` ±baris 345). Untuk paket 45 belum ada pengecekan.
- Al Faiz yang bisa dipakai untuk sebaran hanya **paket 1 (no. 66–110, 45 soal, lengkap)**. Paket 2 cuma sampel 15 soal yang dipilih karena dijawab salah, jadi sebarannya bias dan tidak dipakai.

## 1. Sebaran dimensi dari Al Faiz paket 1
| Dimensi | Label Al Faiz (mentah) | Menurut isi (label V) | Usulan per paket | Total 3 paket |
|---|---|---|---|---|
| Pelayanan Publik | 8 | 9 (+92: layanan lansia berbahasa daerah) | **9** | 27 |
| Profesionalisme | 8 | 8 | **8** | 24 |
| Jejaring Kerja | 0 + 6 tanpa label | 5 (106–110) | **5** | 15 |
| Sosial Budaya | 1 | 4 (+91, 93, 95: keberagaman budaya) | **4** | 12 |
| TIK | 7 | 7 + 105 (perangkat kerja) | **8** | 24 |
| Anti Radikalisme | 15 | 11 | **11** | 33 |
| Jumlah | 45 | 45 | **45** | 135 |

- Kolom "menurut isi" memakai label V yang sudah kamu putuskan: keberagaman tanpa ajakan memusuhi, kekerasan, atau pola terorganisasi masuk Sosial Budaya. Sumbernya riset `2026-10-25-tkp-hots-al-faiz.md` baris dimensi.
- Soal 105 kumasukkan ke TIK. Ini penilaianku sendiri; kalau dimasukkan ke Profesionalisme, hasilnya Prof 9 / TIK 7.
- **Batasan:** ini satu paket dari satu penyelenggara tryout, bukan kisi-kisi resmi. Kisi-kisi resmi (K) belum diverifikasi.
- Akibat sebaran ini: Anti Radikalisme menjadi 33 soal, padahal tangga AR masih berstatus "belum diverifikasi". Karena itu ada aturan tambahan di §3.

**Gate 0a DIPUTUSKAN (Gusti 2026-10-25): tetap grid engine 9/9/7/7/6/7.**
Dasarnya: cek web (izin Gusti) menemukan **KepmenPANRB 406/2026**, yang hanya menyebut 6 aspek TKP dan tujuannya tanpa porsi per aspek (lihat `usulan/2026-10-25.md`). Tabel Al Faiz di atas disimpan sebagai pembanding saja.
| Dimensi | Per paket | Total 3 paket |
|---|---|---|
| Profesionalisme | 9 | 27 |
| Pelayanan Publik | 9 | 27 |
| Jejaring Kerja | 7 | 21 |
| Sosial Budaya | 7 | 21 |
| TIK | 6 | 18 |
| Anti Radikalisme | 7 | 21 |

## 2. Perubahan engine + validator (Gate 0b — DITERAPKAN 2026-10-25, lihat `2026-10-25-usulan-gate0b-tkp.md`)
1. Engine Pilar 6: grid **tidak diubah**. Tambah satu kalimat dasar: "KepmenPANRB 406/2026 tidak mengatur porsi per aspek". Definisi resmi tiap aspek dipakai sebagai batas dimensi.
2. Validator: cek grid dimensi untuk `itemCount === 45` (error bila tidak sesuai); cek level 27/18 (rentang 25–29 / 16–20); kunci 7–11 per huruf (sudah ada? cek).
3. Validator lintas paket (script baru kecil `cek_lintas_paket.js` di `tmp/`): konstruk + latar tidak kembar antar 3 paket dan terhadap bank 80/Batch 1; kalimat penutup maks 8× per paket.
4. Sinkron skill `references/tkp.md` + `cek.py` = OK.

## 3. Aturan tambahan khusus 3 paket ini
- **Anti Radikalisme 7/paket:** tiap paket memakai minimal 4 dari 6 anak tangga AR, maksimal 2 soal per anak tangga. Tiap soal AR wajib memuat ajakan memusuhi, kekerasan, atau pola terorganisasi (kalau tidak ada, soal itu masuk Sosial Budaya). Minimal 1 pasangan kontras AR per paket.
- **TIK 6/paket:** tangga TIK (status uji) dipakai dan dicatat hasilnya.
- **Latar beragam:** tiap paket memakai minimal 12 latar instansi atau pekerjaan berbeda, dan satu latar dipakai paling banyak 3 kali. Tidak ada lembaga nyata yang disebut nama.
- **Al Faiz = ATM:** hanya pola yang diamati, tidak ada stem atau opsi yang disalin (B-10). Daftar "jangan ditiru" (riset Al Faiz baris 113) masuk checklist Gerbang.

## 4. Blueprint dulu, baru tulis (kunci anti-bocor)
Sebelum soal pertama ditulis, script menyusun **blueprint 45 slot per paket** yang langsung memenuhi semua kuota paket:
| Kolom slot | Kuota yang dijaga |
|---|---|
| dimensi, level | grid §1, Tinggi 27 / Sangat Tinggi 18 |
| huruf kunci | 7–11 per huruf, tidak berderet >2 |
| sumbu poin 3 / poin 4 | beda tiap soal; S1–S5 dalam ±35% rata-rata |
| kode jebakan + poin tempelnya | ≥1/3 soal jebakan di poin 3/4; tidak ada kode >50% di satu poin |
| opsi terpanjang ditetapkan ke poin mana | kunci terpanjang ≤20%, ke-2 ≤30%, poin 4 terpanjang ≤30% |
| opsi dua-langkah (huruf mana saja) | kunci tidak sendirian; dua-langkah terpanjang ≤30% |
| jenis poin 1 (aktif a–f / pasif) | aktif ≥50% |
| kategori tindakan + penutup | penutup maks 8× |
| pasangan kontras | ≥3 pasangan, jarak ≥5 nomor |
| anak tangga AR / TIK | §3 |
| jangkar realita | ≥18 |

Blueprint disimpan sebagai JSON di folder TKP (`tmp/blueprint_paket{1,2,3}.json`) lalu dicek sendiri oleh script sebelum dipakai. Alasannya: semua kebocoran bank 80 (soal tertebak dari panjang, pola dua-langkah, poin 1 pasif) muncul karena kuota baru dicek **sesudah** soal jadi.

## 5. Produksi per paket
Tiap paket ditulis dalam 5 batch × 9 soal. Tiap batch melalui langkah berikut:
1. Tulis soal menurut Prosedur engine (10 langkah) dari slot blueprint. Isinya fakta penentu, pasangan, tangga AR, pembahasan reviu, dan pembahasan siswa.
2. Validator per soal harus **0 error** sebelum lanjut.
3. Gerbang 3 dibaca manual: kunci dibela dalam satu kalimat melawan poin 4 dan poin 3. E(3): tidak ada opsi yang melanggar aturan atau memuat klaim keliru.
4. Checkpoint ke log produksi (`riset/2026-10-25-log-produksi-tkp-3paket.md`) dan memory.md. Kalau percakapan sudah panjang, minta `/compact`.

Setelah 45 soal selesai:
5. Validator tingkat paket harus 0 error (modul tebakan, jebakan, pasangan, grid).
6. **Cek buta oleh penilai lain** (Gate 0c): subagent model lain (misal Sonnet/Haiku, hanya kalau kamu izinkan) atau manusia. Semua soal yang kunci atau poin 4-nya ditebak beda masuk daftar reviu.
7. Kamu mereviu sampel (usul: semua soal AR + 10 soal acak) → revisi → **paket dibekukan**.

Urutan antarpaket:
- **Paket 1 = pilot.** Status uji (panduan 1v2/3v4, J5/J6, tangga TIK) dievaluasi di sini. Hasilnya jadi usulan engine v1.4 bila perlu. Paket 2 baru dimulai sesudah paket 1 dibekukan.
- Paket 2 dan 3 mengikuti alur yang sama, ditambah `cek_lintas_paket.js` terhadap paket sebelumnya.

## 6. Output (Gate akhir, atas perintah)
- Satu sumber data JSON per paket menghasilkan HTML format bank, PDF soal, dan PDF pembahasan (dipisah). Pembahasan siswa bebas istilah dapur.
- `cat-tkp-app` (repo git sendiri) baru diisi atas perintah, dengan mengikuti aturan repo itu. Tanpa commit/push.

## 7. Definisi selesai per paket
- Validator v1.3 0 error (per soal + paket); grid dimensi dan level tepat.
- Cek buta oleh penilai lain sudah jalan dan semua beda sudah direviu.
- Tidak ada konstruk atau latar kembar lintas paket maupun terhadap bank lama.
- Gusti menyetujui. Status tetap **draf** sampai diuji ke peserta (tanpa klaim psikometrik).

## 8. Risiko
| Risiko | Penangkal |
|---|---|
| Tidak ada grid resmi (Kepmen 406/2026) | grid engine dipakai sebagai heuristik dan ditulis begitu |
| 21 soal AR dengan tangga belum diverifikasi | kuota anak tangga per paket, pasangan kontras AR, reviu Gusti untuk semua soal AR |
| Penulis = penilai | cek buta oleh model lain atau manusia (Gate 0c) |
| Soal seragam ala AI (pola, latar, kata pembuka) | blueprint + batas latar + peringatan kata pembuka di validator |
| Konteks habis di tengah batch | batch 9 soal, checkpoint tiap batch, `/compact` |

## 9. Perkiraan beban
15 batch (3 paket × 5). Satu batch kira-kira satu putaran kerja penuh termasuk validator dan Gerbang 3. Realistisnya **1–2 batch per sesi**, sehingga 8–15 sesi sampai 3 paket dibekukan, belum termasuk reviu Gusti.

## 10. Urutan putusan Gusti (satu per respons)
1. Gate 0a: grid dimensi.
2. Gate 0b: diff engine + validator (usulan per butir).
3. Gate 0c: siapa penilai cek buta. **DIPUTUSKAN 2026-10-25: subagent Sonnet.**
4. Mulai paket 1 batch 1.
