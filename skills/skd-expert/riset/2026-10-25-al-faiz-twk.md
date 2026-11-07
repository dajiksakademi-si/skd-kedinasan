# Riset — Al Faiz TWK 3–12 vs MR BADRUN TWK ENGINE v1.3 · 2026-10-25

Sumber asli (berkas dipindah ke Trash 2026-10-27, hasil analisis tercatat di sini): Al Faiz "TRY OUT SKD CASN 2026 – PART 39" (casn.privatalfaiz.id), 10 screenshot, dari `REFERENSI LUAR/AL FAIZ TWK 2026-10-25/soal-03.png` sampai `REFERENSI LUAR/AL FAIZ TWK 2026-10-25/soal-12.png`. Soal + pembahasan; peserta tidak menjawab TWK (grid 1–30 merah "Tidak Dijawab").
Pembanding: `CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/MR_BADRUN_TWK_ENGINE.md` v1.3 (dibaca penuh: Pilar 1–6, prosedur, Gerbang 1–4, larangan).

Metode: panjang opsi, tumpang-tindih kata stem (tanpa kata fungsi), dan awalan opsi dihitung dengan python. Fakta sejarah/hukum dicek dari pengetahuan umum; yang belum dicek ke teks pasal ditandai.

## 1. Inventaris
| No | Tema (grid engine) | Kata perintah | Kategori (Pilar 2) | Kunci | Pembahasan |
|---|---|---|---|---|---|
| 3 | Nasionalisme & bela negara (kasus) | "Makna utama bela negara … adalah" | DEFINISI | B | ada |
| 4 | Bela negara (kasus) | "Arti penting bela negara yang paling tepat" | ALASAN/DEFINISI | B | ada |
| 5 | Sejarah — SU 1 Maret 1949 | "Pelajaran strategis yang paling tepat" | ALASAN | A | ada |
| 6 | Sejarah — Budi Utomo | "Makna penting lahirnya … adalah" | DEFINISI | D | ada |
| 7 | Pancasila — BPUPKI | "Sikap yang **paling bertentangan**" | SIKAP (negatif) | D | ada |
| 8 | Nasionalisme — Sumpah Pemuda, ruang digital | "Kebijakan yang paling mencerminkan" | WUJUD | B | ada |
| 9 | Pancasila sila 2 (kasus) | "Sikap yang paling mencerminkan" | SIKAP | D | ada |
| 10 | Pancasila sila 5 (kasus) | "Kebijakan yang paling sesuai" | WUJUD | C | ada |
| 11 | Pancasila sila 1 (kasus) | "Tindakan yang paling sesuai" | WUJUD | B | ada |
| 12 | Hukum — MA/MK/KY | "Langkah hukum yang paling tepat" | WUJUD (faktual) | A | ada |

- Nomor 1, 2, 13–30 tidak terlihat.
- Kunci 3–12: B B A D D B D C B A → B 4, D 3, A 2, C 1, **E 0**. Sampel 10, tapi E kosong dan B 40%.

## 2. Pola konstruksi Al Faiz (beda dengan MR BADRUN)
1. **Tanpa L2 dua kutub.** Tidak satu pun dari 10 stem memakai "tidak hanya X, tetapi juga Y". Stem = kasus 1–2 kalimat + perintah. Tegangan (kalau ada) tersirat di kasus: 8 "memperluas interaksi … tanpa menghilangkan identitas", 10 "prestasi vs ekonomi", 11 "bantuan vs syarat agama".
2. **Pengecoh sering salah fakta / tidak cocok kasus**, bukan "semua benar":
   - 3: A (penambahan peralatan), C (penggantian teknologi impor), E (standar teknisi asing) bertentangan dengan kasus;
   - 5: B–E keliru secara sejarah (SU 1 Maret bukan perebutan wilayah/pusat pemerintahan, bukan keunggulan militer, bukan pengganti diplomasi);
   - 6C: Budi Utomo "sejak awal diarahkan pada kemerdekaan" keliru;
   - 12: B, C, E menukar kewenangan lembaga.
   - Akibatnya jarak presisi lebar → setara C2–C3 engine. Hanya 4, 9, 10 yang benar-benar "semua opsi benar".
3. **Bunyi opsi rapi:** awalan Me- serempak (9 dari 10 soal), selisih panjang ≤ 3 kata di 9 soal. Pola paralel "Me-X melalui Y" di soal 3 bagus: pembeda ada di klausa "melalui".
4. **Pembahasan:** satu paragraf panjang, tiap opsi disebut, tapi alasan gugur sering "kurang tepat / belum tentu" (melanggar Gerbang 3 engine), tanpa kode jebakan, tanpa analogi.

## 3. Analisis per soal

### 3 — modernisasi pertanian (kunci B) · Vonis: kunci sah, makna melompat
- Kalimat kunci: "melatih petani memperbaiki mesin" → B "penguasaan teknologi oleh masyarakat". Parafrase bersih (0 kata stem di kunci).
- Celah: tujuan di kunci, "ketahanan **pangan**", tidak ada di stem. Inti kasus adalah lepas dari ketergantungan teknisi asing = **kemandirian**. Kata "kemandirian" justru dipakai pengecoh C (dengan mekanisme salah). Kunci menang lewat klausa mekanisme, bukan lewat makna. Kode: tujuan kunci = D3 (efek turunan).
- Pengecoh: A D3/tidak cocok kasus · C D4 (kemandirian lewat substitusi ≠ lewat penguasaan) · D tidak cocok kasus · E bertentangan dengan kasus.
- Adopsi: **opsi paralel "tujuan + melalui mekanisme"**, pembeda di mekanisme. Rapi untuk C3.

### 4 — ronda + koordinasi aparat (kunci B) · Vonis: lemah, gagal Gerbang 3
- Opsi 5–6 kata (engine: 8–14). Terlalu pendek untuk membawa batas makna yang eksplisit.
- Distraktor terkuat A "Memperkuat solidaritas dalam menjaga ketertiban". Alasan resmi: "inti kasus bukan sekadar mempererat hubungan antarwarga". Kata "sekadar" tidak ada di opsi A → ini menggugurkan lewat **diam** (dilarang Gerbang 3).
- Kunci memuat kata stem "menjaga" + "keamanan" (tumpang-tindih 2, tertinggi bersama C) → Gerbang 1 lemah.
- Uji pembalikan: "solidaritas dalam menjaga ketertiban" bisa dibela sebagai tanggung jawab bersama. **Dua opsi bisa dipertahankan.**

### 5 — Serangan Umum 1 Maret 1949 (kunci A) · Vonis: kunci benar, bentuk bocor
- Fakta: SU 1 Maret 1949 menunjukkan eksistensi TNI/RI ke dunia dan memperkuat posisi diplomasi. Kunci benar.
- **Gerbang 2 gagal:** kunci satu-satunya opsi terpanjang (16 kata; selisih dengan terpendek 5 > 4) dan satu-satunya yang memuat dua unsur (militer **dan** diplomasi).
- **Gerbang 1 gagal:** kunci memuat 7 kata stem (tertinggi), mis. "Republik", "kekuatan", "dunia", "perjuangan".
- Pengecoh B–E salah sejarah → bukan "semua benar"; siswa cukup tahu fakta dasar.

### 6 — Budi Utomo (kunci D) · Vonis: kunci sah, mengulang stem
- Fakta: Budi Utomo (1908) menandai pergeseran perjuangan kedaerahan ke organisasi modern. Kunci benar.
- **Pilar 4 no. 7 dilanggar:** stem sudah bilang "keberadaannya menjadi salah satu tahap penting dalam perkembangan pergerakan nasional" + "organisasi modern"; kunci "menandai berkembangnya perjuangan … melalui organisasi modern" mengulang tujuan yang tersurat. Nol kerja kognitif bagi pembaca stem.
- Distraktor terkuat A (kaum terpelajar + pendidikan) benar secara fakta; gugur sah lewat kategori (kegiatan ≠ makna historis) → **D1 yang baik**.
- C = D4 berfakta salah (politik kemerdekaan sejak awal).

### 7 — BPUPKI, soal negatif (kunci D) · Vonis: kunci sah, konstruk bergeser
- Stem menguji nilai **musyawarah / menghargai perbedaan gagasan**. Kunci D gugur karena **mengubah nilai dasar negara** (konsep ideologi terbuka: nilai dasar tetap, nilai instrumental/praksis berkembang). Dua konstruk berbeda.
- Siswa tetap bisa menjawab karena hanya D yang tidak sejalan, tapi alasannya datang dari luar stem.
- Bentuk negatif ("paling bertentangan") tidak diatur engine MR BADRUN. Di soal negatif, filosofi "semua opsi benar" berubah jadi "empat sesuai, satu menyimpang".

### 8 — platform pemuda, Sumpah Pemuda (kunci B) · Vonis: **bocor cocok-kata**
- Stem: "memperluas interaksi lintas daerah **tanpa menghilangkan identitas budaya** masing-masing". Kunci: "menghubungkan konten **lintas daerah** … **tanpa menghilangkan identitas budaya** asalnya".
- Frasa 4 kata disalin utuh dari stem → **Gerbang 1 gagal**, Pilar 4 no. 1 dan no. 7 dilanggar. Siswa menang dengan mencocokkan kata. D5 yang semestinya jadi pengecoh justru menjadi kunci.
- Isi kunci benar (bahasa Indonesia sebagai pemersatu = ikrar ketiga Sumpah Pemuda).
- Pengecoh A/C/D/E: D2 yang sah (A seragam konten, C eksklusif daerah dulu, D populer, E menyeragamkan → batasnya eksplisit). Bagus kalau kuncinya diparafrase.

### 9 — korban di posko bencana, sila 2 (kunci D) · Vonis: **kokoh, terbaik di set ini**
- Kalimat kunci: "korban **luka berat**". Kebutuhan pertama adalah penanganan; hanya D yang memuat penanganan.
- Pengecoh semua benar dan semua tentang privasi/dokumentasi (A dua komponen = keseimbangan semu, sesuai Pilar 4 no. 3; B, C teknis dokumentasi; E menghentikan dokumentasi).
- Gerbang 3 satu kalimat: "korban luka berat butuh ditangani, bukan hanya dilindungi dari kamera".
- Risiko kecil: E "menghentikan dokumentasi sampai kondisi … terkendali" diam tentang penanganan; diam bukan kegagalan, tapi "luka berat" membuat D tetap unggul.
- Adopsi: **kebutuhan mendesak di stem mengalahkan nilai sekunder** (martabat ≠ privasi saja).

### 10 — kuota bantuan, sila 5 (kunci C) · Vonis: kunci sah, alasan B lemah
- "Siswa berprestasi yang **mampu**" ambigu: mampu secara akademik atau ekonomi? Bila ekonomi, soal jadi terlalu mudah.
- Distraktor terkuat B "membagi seimbang berdasarkan prestasi dan kondisi ekonomi". Alasan resmi "belum tentu sesuai tingkat kebutuhan" = alasan yang dilarang Gerbang 3. Alasan yang sah: "keadilan sosial pada kuota terbatas = prioritas kebutuhan, bukan pembagian rata".
- D (prestasi dan ekonomi **sekaligus**) = D2 sah, batas "sekaligus" eksplisit menyingkirkan yang butuh tapi tidak berprestasi.
- Kunci memakai superlatif "paling membutuhkan" (bukan kata absolut menurut daftar engine, tapi menonjol).

### 11 — syarat kegiatan agama untuk bantuan (kunci B) · Vonis: sah, mudah
- Hanya B yang menolak syarat; A, C, D, E masih mengaitkan bantuan dengan kegiatan agama. Siswa cukup mencari opsi "tanpa mensyaratkan".
- Gerbang 2 waspada: kunci satu-satunya berpola penolakan ("tanpa …"). C3.
- Kunci "kegiatan agama tertentu" ≈ stem "kegiatan keagamaan tertentu" (cocok-kata ringan).

### 12 — MA/MK/KY (kunci A) · Vonis: kunci benar, satu pengecoh tidak salah total
- Fakta (UUD 1945): MA menguji peraturan di bawah UU terhadap UU (Pasal 24A ayat 1); MK menguji UU terhadap UUD (Pasal 24C ayat 1); KY menjaga kehormatan, keluhuran martabat, dan perilaku hakim (Pasal 24B ayat 1). Kunci A benar.
- **Desain matriks kewenangan:** tiga persoalan × lembaga, pengecoh = tukar satu/dua lembaga. Semua opsi panjang dan berkosakata sama (tumpang-tindih stem 4 di semua opsi) → bentuk tidak bocor. Jangkar faktual kuat.
- Catatan: D "laporan perilaku hakim kepada MA" tidak sepenuhnya salah. MA juga punya pengawasan internal atas perilaku hakim (Badan Pengawasan MA; UU MA — **pasal belum diverifikasi**). A tetap paling tepat karena KY adalah pengawas eksternal yang ditetapkan konstitusi, tapi pembahasan Al Faiz yang menyebut D "tidak tepat" berlebihan.
- Adopsi: **matriks kewenangan** untuk tema hukum (jangkar faktual + pengecoh tukar lembaga), dengan syarat setiap sel pengecoh benar-benar keliru secara hukum.

## 4. Rekap vonis
| No | Kunci | Vonis | Gerbang engine yang gagal |
|---|---|---|---|
| 3 | B | sah; tujuan kunci tidak ada di stem | — (D3 di kunci) |
| 4 | B | **lemah**: A bisa dibela | G3, G1 ringan; opsi < 8 kata |
| 5 | A | benar; bocor bentuk | **G1, G2** |
| 6 | D | sah; mengulang stem | Pilar 4 no. 7 |
| 7 | D | sah; konstruk bergeser | — (bentuk negatif tidak diatur engine) |
| 8 | B | benar; **bocor cocok-kata** | **G1**, Pilar 4 no. 1 & 7 |
| 9 | D | **kokoh** | — |
| 10 | C | sah; alasan gugur B lemah | G3 (alasan "belum tentu") |
| 11 | B | sah; mudah | G2 waspada |
| 12 | A | benar; D tidak salah total | — |

Ringkas: tidak ada kunci yang salah fakta. Masalah utama Al Faiz TWK = **kunci tertebak** (5, 8, 6, 11) dan **pengecoh salah fakta** yang menurunkan soal ke level C2–C3. Hanya 9 yang lulus semua gerbang MR BADRUN.

## 5. Perbandingan dengan MR BADRUN v1.3
| Aspek | MR BADRUN | Al Faiz 3–12 |
|---|---|---|
| Stem | L1 + L2 "tidak hanya … tetapi juga" + L3 | kasus + perintah, tanpa L2 eksplisit (0/10) |
| Opsi | semua benar | 6/10 soal punya pengecoh salah fakta/kasus |
| Kategori perintah | 5 kategori terkunci | variatif ("makna utama", "arti penting", "pelajaran strategis", "kebijakan", "langkah hukum"); tidak bercampur |
| Anti-bocor | 8 larangan | gagal di 5, 6, 8; selisih panjang 5 kata di 5; opsi 5–6 kata di 4 |
| Kode distraktor | D1–D6 wajib | tidak ada; pembahasan "kurang tepat / belum tentu" |
| Jangkar faktual | ≥ 30% | 5, 6, 7, 12 = 4/10 (40%) |
| Kunci | 4–7 per huruf per 30 | sampel 10: E 0, B 4 |

- Engine MR BADRUN **lebih ketat di semua aspek konstruksi**. Al Faiz tidak memperlihatkan cacat engine.
- Yang Al Faiz punya dan engine belum atur:
  1. **Soal negatif** ("paling bertentangan", 7). Engine diam; "semua opsi benar" tidak bisa diterapkan apa adanya. Perlu aturan: empat opsi sesuai + satu menyimpang, dan alasan menyimpang harus dari konstruk yang sama dengan stem.
  2. **Matriks kewenangan** (12) sebagai bentuk soal hukum dengan pengecoh tukar lembaga. Bertentangan dengan "semua opsi benar", tapi daya ukurnya tinggi untuk jangkar faktual.
  3. **Opsi paralel "tujuan + melalui mekanisme"** (3).
- Keputusan engine TWK: **tidak diubah.** Folder TWK punya aturan dan handoff sendiri (CLAUDE.md root aturan 5), dan dua poin di atas adalah usulan, bukan cacat engine. Menunggu Gusti.

## 6. Pelajaran untuk mengajar siswa
1. Cari **kebutuhan paling mendesak** di kasus ("luka berat", "kuota terbatas"). Opsi yang menjawab kebutuhan itu biasanya kunci.
2. Waspadai opsi yang **menyalin frasa stem** (8). Di soal bimbel kadang itu kunci, di ujian bermutu itu jebakan. Tetap cek isinya, jangan percaya kemiripan kata.
3. Soal sejarah: tanya "apa **arti** peristiwa ini", bukan "apa yang terjadi". Opsi yang hanya menceritakan kegiatan (6A) gugur kategori.
4. Soal lembaga: hafalkan pasangan objek → lembaga (peraturan di bawah UU → MA; UU → MK; perilaku hakim → KY).

## 7. Pembanding kedua: engine gaya Viracun (ENGINE_GENERATE_SOAL_TWK.md, dibaca penuh; file dihapus 2026-10-25, label E1–E8 kini Lampiran MR BADRUN v1.4)
Uji tiap soal: Hukum 2 (semua opsi benar) + tuas L1 (≥ 2 langkah), L2 (kunci tersamar), L3 (≥ 2 pengecoh berbagi kata stem).

| No | Engine Viracun | H2 semua benar | L1 ≥2 langkah | L2 kunci tersamar | L3 jebakan permukaan | Hasil |
|---|---|---|---|---|---|---|
| 3 | E1 akar vs buah | ✗ (A, C, E bertentangan kasus) | ✗ | ✓ | ✓ | gagal |
| 4 | E1 | ✓ | ✗ | ✗ ("menjaga … keamanan") | ✓ | gagal |
| 5 | E3 transfer historis | ✗ (B–E salah sejarah) | ✓ | ✗ (terpanjang, satu-satunya dua unsur) | ✓ | gagal |
| 6 | E1/E3 | ✗ (C) | ✗ (stem sudah memberi makna) | ✗ ("organisasi modern") | ✓ | gagal |
| 7 | **E4 varian "kecuali"** | sesuai varian (4 cocok, 1 tidak) | ✓ | ✓ | ✓ | **lulus** (catatan: konstruk bergeser) |
| 8 | E2 sintesis dua kutub | ✓ | ✗ | ✗ (salin frasa stem) | ✓ | gagal |
| 9 | E2/E5 | ✓ | ✓ | ✓ (A juga dua komponen = keseimbangan semu) | ✓ | **lulus** |
| 10 | E2 | ✓ | ✓ | ✓ | ✓ | lulus aturan, **bertentangan dengan resep E2** (lihat bawah) |
| 11 | E5 benar walau berisiko | ✓ | ✗ | ✗ ringan (satu-satunya "tanpa") | ✓ | gagal |
| 12 | **E6 lembaga berwenang** | ✗ menurut desain E6 | ✓ | ✓ | ✓ | **lulus** sebagai E6 |

- Lulus Viracun: 7, 9, 10, 12 (4/10). Lulus MR BADRUN: 9 saja (1/10). Viracun lebih longgar karena tidak mewajibkan L2 dua kutub dan punya varian "kecuali" + E6.
- **Gaya Al Faiz lebih dekat ke Viracun** (stem kasus naratif, tanpa "tidak hanya … tetapi juga", ada soal "kecuali", ada soal lembaga), tapi disiplin L2 (anti-bocor) lebih lemah.
- **Dua usulan untuk MR BADRUN (§5) sudah ada di Viracun:** soal negatif = E4 varian "kecuali"; matriks kewenangan = E6. Kalau Gusti setuju, aturannya bisa diambil dari Viracun, tidak perlu dirancang baru.

### Temuan baru: resep E2 "jangan pilih yang ekstrem" menyesatkan di 10 dan 11
- 10: stem memasang dua kutub (prestasi ↔ ekonomi). Resep E2 Viracun: kunci = titik seimbang, pengecoh = ekstrem. Siswa yang memakai heuristik ini memilih **B** ("membagi seimbang berdasarkan prestasi dan kondisi ekonomi") atau D. Kunci Al Faiz justru **C, satu kutub** ("memprioritaskan yang paling membutuhkan"), dan kunci itu benar menurut sila 5 pada kuota terbatas.
- 11: opsi tengah/kompromi (C pilihan beberapa kegiatan keagamaan, D kegiatan kerohanian bersama) adalah pengecoh; kunci B menolak syarat sepenuhnya.
- Sebab: heuristik "hindari ekstrem" hanya sahih bila **kedua kutub sama-sama sah**. Di 10, kutub "berprestasi yang mampu" bukan kebutuhan; di 11, kutub "wajib kegiatan agama" melanggar kebebasan beragama. Titik tengah antara kutub sah dan kutub cacat = keseimbangan semu.
- Dampak: Tipe 2 di `PANDUAN_MURID_TWK.md` ("Jangan Pilih yang Terlalu Ekstrem") bisa menjerumuskan siswa di soal bertipe 10/11.
- Usulan (belum diterapkan): E2 Viracun + Tipe 2 panduan murid diberi syarat "uji dulu apakah kedua kutub sah; kalau satu kutub cacat nilai, kunci = kutub yang sah".

### Kesimpulan perbandingan
- MR BADRUN = penyaring konstruksi paling ketat (L2 dua kutub, D1–D6, 4 gerbang). Viracun = taksonomi tipe lebih lebar (8 engine, termasuk "kecuali", lembaga, daftar, bahasa) tapi lebih longgar.
- Al Faiz bukan cacat fakta; Al Faiz gagal di **anti-bocor** di kedua engine (5, 6, 8).
- Engine Viracun dan MR BADRUN **tidak diubah**. Folder TWK punya aturannya sendiri.

## Tambahan 2026-10-27 — Part 39 no 2, 21, 22, 25–30 (soal Bahasa)
Sumber asli (berkas dipindah ke Trash 2026-10-27, hasil analisis tercatat di sini): `REFERENSI LUAR/AL FAIZ TWK PART 39 2026-10-27/soal-02.png` s.d. `REFERENSI LUAR/AL FAIZ TWK PART 39 2026-10-27/soal-30.png` (9 berkas; no 3–5 sudah di folder 2026-10-25). Kunci + pembahasan resmi Al Faiz ada. Gusti: cukup soal ini saja yang dianalisis.

### Blok Bahasa Indonesia = no 25–30 (6 dari 30 soal, 20%)
| No | Jenis | Kunci Al Faiz | Kunci D'Ajiks | Vonis | Catatan |
|---|---|---|---|---|---|
| 25 | Simpulan paragraf 5 kalimat | A | A | lemah | pengecoh bagus: B separuh (hanya kelebihan, kalimat 1–2), C kalimat penjelas (4–5), D menambah fakta ("sering kali gagal"), E solusi tak tertulis ("menggabungkan"). Tetapi kunci memuat kata absolut **"mutlak"** yang tidak ada di teks, dan hanya menyebut infrastruktur (beban kerja/waktu tidak) |
| 26 | Pokok pikiran | C | C | baik | tiap opsi = parafrase satu kalimat paragraf (A = kalimat 5, B = 3, D = 2, E = 4); kunci kalimat 1. Catatan: kalimat 5 berpembuka "pada akhirnya" → bisa dibaca paragraf campuran; pembahasan tidak menggugurkan A |
| 27 | Kalimat utama (opsi nomor) | A (1) | A/B | **cacat** | kalimat (3) "Sebagai contoh" menempel ke klaim kalimat (2) (agilitas), dan (5) menyimpulkan "kelincahan adaptasi ini" → (2) bisa dibela sebagai kalimat utama. Pembahasan hanya "deduktif = di awal" |
| 28 | Kata tidak baku | D respon | D | baik | jebakan bagus: empat kata baku yang tampak janggal (omzet, kuesioner, bujet, karier) vs satu tidak baku yang lazim (respon → respons). Status KBBI dari ingatan, cek ulang di Tahap 3 |
| 29 | Tanda baca salah | B | B | baik (catatan) | koma sebelum "bahwa" (anak kalimat mengiringi induk) salah. A "…; dengan demikian, …" perlu cek EYD V (titik koma pengganti kata penghubung + ungkapan penghubung) — **belum diverifikasi**. C, D, E benar |
| 30 | Huruf kapital salah (opsi nomor) | D (4) | D | baik | "Undang-undang" → "Undang-Undang" (unsur bentuk ulang dalam nama dokumen). Pengecoh benar-kaidah: jabatan tanpa nama huruf kecil (2), "bahasa Inggris" (3), "Masehi" (5) |
- Bentuk: dua rumpun — **(a) paragraf bernomor 5 kalimat** → simpulan / pokok pikiran / kalimat utama; **(b) kaidah** → kata baku (KBBI), tanda baca, huruf kapital (EYD V), opsi = kata atau nomor kalimat.
- Soal kaidah "manakah yang salah" = cermin "nol opsi salah": empat opsi benar-kaidah, satu salah.
- Isi paragraf **korporat** (HR, rantai pasok AI, COO, pemasaran, ekspansi ke Singapura), tidak bermuatan kebangsaan; kosakata asing (chief operating officer, real-time, margin).
- Pembahasan Bahasa 1–3 kalimat, hanya membuktikan kunci (26–30 tidak menggugurkan tiap opsi).

### Soal non-Bahasa
| No | Kunci | Vonis | Catatan |
|---|---|---|---|
| 2 | D | baik | dua penentu ("keahlian" + "serangan siber" = ancaman nonmiliter) dijawab kunci, A/B/C/E masing-masing separuh. D memuat kata soal "keahlian". Semua opsi berpembuka "Bela negara …". UU 23/2019 ancaman nonmiliter **belum diverifikasi** |
| 21 | C | baik | penentu peniada "memenuhi persyaratan dan kompetitif" (larangan ikut tender gugur, konflik tetap ada) → ungkap hubungan + tidak ikut memutus. B "sambil tetap memantau" = keseimbangan semu; E menunggu hasil = keterbukaan terlambat; D evaluasi tambahan tidak menyasar konflik. C terpanjang 1 kata. UU 30/2014 Ps 43–44 **belum diverifikasi** |
| 22 | D | baik (mudah) | fakta "meski sakit" di soal → keteguhan; A/C penyesuaian, B kepatuhan, E pengawasan anggota. Opsi 7–9 kata. Tokoh membungkus fakta yang ditulis (kunci tidak butuh pengetahuan tokoh) |
- Kunci 12 soal yang terlihat (2–5, 21, 22, 25–30): A 3 · B 3 · C 2 · D 4 · **E 0**.

### Diamati / tidak ditiru / dimodifikasi (Bahasa)
- **Diamati:** pengecoh simpulan = separuh teks, kalimat penjelas, menambah fakta, solusi tak tertulis (logika sama dengan pengecoh TWK D'Ajiks); pengecoh pokok pikiran = pokok kalimat penjelas; soal kaidah memakai kata/kalimat benar-kaidah yang tampak janggal sebagai pengecoh; satu paragraf bernomor dipakai ulang untuk soal kaidah.
- **Tidak ditiru:** paragraf korporat tanpa muatan kebangsaan; kata absolut di kunci (25); kalimat utama yang bisa dua (27); pembahasan yang hanya membuktikan kunci; isi, paragraf, diksi.
- **Calon usulan (Tahap 3):** (r) bentuk soal Bahasa D'Ajiks = dua rumpun (paragraf bernomor + kaidah EYD V/KBBI), paragraf bertema kebangsaan/layanan publik; (s) kaidah: soal "yang salah" boleh untuk Bahasa (empat opsi benar-kaidah); (t) porsi Bahasa per paket ditinjau (Al Faiz 20%, Pejuang 27%, D'Ajiks 5%; porsi resmi **belum diverifikasi**).
