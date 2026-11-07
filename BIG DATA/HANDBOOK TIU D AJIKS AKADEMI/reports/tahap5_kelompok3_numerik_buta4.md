# Cek Buta Numerik — Kelompok 3, Berkas buta4 (4 soal)

Sumber: `scripts/data/numerik_b06_10_buta4.json` (hanya berkas ini yang dibaca).
Tebakan B ditulis sebelum menghitung: scratchpad `tebakan_b_buta4.txt`.

## Ringkasan

| ID | Jawaban A | Yakin | Kunci lain? | Ambigu? | Layak waktu | Tebakan B | Kena? |
|---|---|---|---|---|---|---|---|
| HB-TIU-B07-L01 | B | yakin | tidak | tidak | ya (±25 dtk / 45) | B | KENA |
| HB-TIU-B08-C04 | A (K96) | yakin | tidak | tidak | ya (±40 dtk / 60) | D (K72) | tidak |
| HB-TIU-B08-L03 | A (EV) | yakin | tidak | tidak | ya (±45 dtk / 60) | B (DV) | tidak |
| HB-TIU-B09-C04 | C (43 dan 85) | yakin | tidak | tidak | ya (±40 dtk / 90) | C | KENA |

Tebakan bentuk kena 2 dari 4 (peluang acak 0,8).

## Tugas A — pengerjaan

### 1. HB-TIU-B07-L01 — kunci B
Hasil kali: A 1080 vs 720; **B 1080 vs 1080**; C 1080 vs 1620; D 1080 vs 720; E 1080 vs 270.
Cara cepat: faktor kiri dibagi 3 (27→9), faktor kanan dikali 3 (40→120), hasil tetap. Satu kunci.

### 2. HB-TIU-B08-C04 — kunci A (K96)
Huruf: B, E, J, Q, Z = 2, 5, 10, 17, 26 (selisih 3, 5, 7, 9; atau n²+1). Berikut +11 = 37 → lewat Z, 37 − 26 = 11 = K.
Angka: 3, 6, 12, 24, 48, dikali 2 → 96. Satu kunci.
Pengecoh: K48 (angka tidak diteruskan), K72 (angka ditambah 24), K51 (ditambah 3), I72 (huruf dan angka sama-sama keliru).

### 3. HB-TIU-B08-L03 — kunci A (EV)
Huruf pertama: M, P, T, Y = 13, 16, 20, 25 (+3, +4, +5) → +6 = 31 → 5 = E.
Huruf kedua: N, K, G, B = 14, 11, 7, 2 (−3, −4, −5) → −6 = −4 → 22 = V.
Pemeriksa: tiap pasangan berjumlah 27 (huruf kedua = cermin huruf pertama); E + V = 5 + 22 = 27.
Catatan: DW (4+23) dan FU (6+21) juga berjumlah 27. Siswa yang hanya memakai aturan "jumlah 27" akan menyisakan tiga opsi; aturan huruf pertama yang memastikan E. Ini pengecoh yang bagus, bukan cacat — kunci tetap tunggal.

### 4. HB-TIU-B09-C04 — kunci C (43 dan 85)
Baris X: 3, 7, 13, 21, 31 (selisih 4, 6, 8, 10) → +12 = 43 (n² + n + 1).
Baris Y: 5, 13, 25, 41, 61 (selisih 8, 12, 16, 20) → +24 = 85; juga Y = 2X − 1 di setiap kolom. Satu kunci.

## Tugas B — temuan bentuk (isyarat bocor)

1. **B07-L01 (kena):** hanya B yang faktornya berpasangan rapi (÷3 dan ×3). Opsi lain jelas tak seimbang (÷3/×2, ×3/÷2, ×2/÷3, ÷2/÷2), jadi kunci terlihat tanpa mengalikan. Karena memang itu keterampilan yang diajarkan bab ini, ini bisa diterima; tetapi supaya tidak tertebak sekilas, sebaiknya ada satu pengecoh yang tampak berpasangan rapi tetapi salah (contoh: ÷3 dan ×3 pada faktor yang tertukar, atau ÷4 dan ×3).
2. **B08-C04 (tidak kena):** huruf K muncul 4 kali (huruf terbongkar dari bentuk), tetapi angka kunci 96 hanya muncul sekali sehingga tebakan mayoritas (K72) meleset. Bocor huruf ringan; angka aman.
3. **B08-L03 (tidak kena):** sebaran unsur seimbang (D/F masing-masing 2, E 1; V 3). Tebakan mayoritas mengarah ke DV/FV, bukan EV. Aman.
4. **B09-C04 (kena):** X = 43 muncul 3 dari 5 opsi, jadi X terbongkar; di antara tiga opsi X = 43, Y = 85 adalah nilai tengah. Saran: sebarkan X agar tidak mayoritas (misalnya dua opsi 43, dua 45, satu 41) atau geser Y kunci agar bukan nilai tengah dari opsi yang tersisa.

## Kesimpulan
Keempat soal benar, kunci tunggal, tidak ambigu, dan layak dalam target waktu. Perlu ditinjau dari sisi bentuk: B07-L01 (hanya kunci yang faktornya seimbang) dan B09-C04 (X mayoritas + Y nilai tengah).
