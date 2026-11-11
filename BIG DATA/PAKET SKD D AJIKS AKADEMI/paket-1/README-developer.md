# Paket 1 SKD — D'Ajiks Akademi

Isi zip:

| Path | Isi |
|---|---|
| `paket_1_skd.json` | 110 soal lengkap: soal, opsi, kunci, skor, pembahasan |
| `svg/` | gambar soal figural TIU no. 57–65 (soal, opsi A–E, gambar pembahasan) |
| `pdf/Paket_1_SKD_Soal.pdf` | lembar soal (tanpa kunci) |
| `pdf/Paket_1_SKD_Pembahasan.pdf` | kunci + pembahasan |

## Susunan

| Subtes | Nomor | Jumlah | Penilaian |
|---|---|---|---|
| TWK | 1–30 | 30 | benar 5, salah/kosong 0 |
| TIU | 31–65 | 35 | benar 5, salah/kosong 0 |
| TKP | 66–110 | 45 | tiap opsi bernilai 1–5 (field `skor`), kosong 0 |

Nilai yang dipakai CAT cukup dibaca dari `skor[jawaban]`; aturan ini berlaku untuk ketiga subtes.

## Field per soal (`soal[]`)

| Field | Tipe | Keterangan |
|---|---|---|
| `no` | angka | nomor urut 1–110 |
| `subtes` | `"TWK"` \| `"TIU"` \| `"TKP"` | |
| `id` | teks | kode unik soal |
| `kategori` | teks | tema / jenis soal (boleh ditampilkan sebagai label) |
| `soal` | teks | teks soal |
| `tabel` | array 2D (opsional) | tabel angka; tampilkan sesudah `soal` |
| `pernyataan` | array teks (opsional) | pernyataan (1), (2) untuk soal kecukupan data |
| `syarat` | array teks (opsional) | daftar syarat soal penalaran analitis |
| `perintah` | teks (opsional) | kalimat tanya; tampilkan paling akhir sebelum opsi |
| `gambar` | path \| null | SVG soal, relatif terhadap akar zip (`svg/...`) |
| `jenis_opsi` | `"teks"` \| `"gambar"` | bila `gambar`, nilai `opsi` berupa path SVG |
| `opsi` | `{A..E}` | teks opsi atau path SVG |
| `kunci` | `A`–`E` | TKP: opsi bernilai 5 |
| `skor` | `{A..E: angka}` | nilai tiap opsi |
| `pembahasan` | teks | baris dipisah `\n`; baris pertama selalu `Kunci: X.` |
| `gambar_pembahasan` | path \| null | SVG pembahasan (figural) |

Urutan tampilan: `soal` → `gambar` → `tabel` → `pernyataan` → `syarat` → `perintah` → opsi.

Teks dapat memuat tag HTML `<b>`, `<i>`, `<br>` (contoh: huruf miring variabel *n*, premis P1/P2 dipisah `<br>`). Render sebagai HTML dengan whitelist tiga tag itu saja.

`meta.kunci` berisi string kunci per subtes untuk pengecekan cepat.
