# Riset — Engine TKP v1.2 vs modul Kepribadian psi-expert · 2026-10-25

Status: **riset saja**. Engine, bank, dan kedua skill tidak diubah. Semua usulan di §D menunggu keputusan Gusti. **Update 2026-10-25: usulan sudah diputuskan (kolom Status) dan diterapkan ke engine v1.3 + validate_soal.js — lihat `2026-10-25-rencana-diff-tkp-v1.3.md`.**

Bahan yang dibaca (read-only):
- TKP: `CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TKP.md` (penuh), `PROJECT_MEMORY.md` (penuh), `Bank_Soal_TKP_HOTS_80.html` (diurai script + soal 13, 14, 56, 73 dibaca isi), `SOAL TKP.txt` / `doc (1).txt` / `doc-v2.txt` (dicek isinya).
- Skill skd-expert: `references/tkp.md`, `references/aturan-tetap.md`, `references/domain-skd.md`.
- Skill psi-expert: `SKILL.md`, `references/modul-kepribadian.md`, `references/pedoman-soal.md`, `references/aturan-tetap.md`, `references/domain-psikotes.md`.
- psiko-cat (read-only, karena ditunjuk `modul-kepribadian.md`): `docs/pedoman/PEDOMAN_ENGINE_PRIBADI.md` §1, §3, §5, §7–§10; `bank/pribadi/sjt-*.json` (statistik + 1 butir contoh).

Metode mekanis: HTML bank 80 → teks → script Python (opsi, kunci, poin, sumbu, kode jebakan, jumlah kata). Script: scratchpad sesi `tkp_stats.py` (tidak disimpan ke project).

---

## A. Kapabilitas engine TKP v1.2

### A1. Cakupan
- **6 dimensi** (engine §PERAN, Pilar 6): Profesionalisme, Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Anti Radikalisme. Dasar "Permenpan RB No. 1/2023" disebut engine — **belum diverifikasi**.
- **Tidak ada sub-aspek/indikator perilaku.** Yang ada hanya "fokus konflik nilai khas" per dimensi (Pilar 6) dan leksikon (Pilar 5). Akibatnya cakupan isi per dimensi tidak bisa diaudit (tidak ada daftar "indikator mana yang sudah/belum diuji").
- Paket baku 45: 9/9/7/7/6/7 (Pilar 6, heuristik engine, bukan resmi).

### A2. Logika skor 1–5 (Pilar 3)
| Poin | Engine | Cara gradasi ditentukan |
|---|---|---|
| 5 | kunci, bersih di semua sumbu relevan | menutup dua kepentingan L2 dengan mekanisme konkret |
| 4 | kuat, gagal di **satu** sumbu Y | lawan terkuat |
| 3 | kuat, gagal di **satu** sumbu X ≠ Y | lawan kedua; urutan 3 vs 4 = "sumbu mana yang risikonya lebih langsung" (contoh terbimbing D vs C) — **tidak ada aturan tertulis** |
| 2 | patuh buta / demi relasi-citra | ada tindakan, motifnya salah |
| 1 | pasif / lepas tangan | tidak ada tindakan |

- Sumbu presisi S1 urutan · S2 skop · S3 kewenangan · S4 keberlanjutan · S5 verifikasi (Pilar 3).
- Jebakan J1 cocok-kata · J2 geser beban · J3 eskalasi prematur · J4 formalisme kosong, min 1 per soal (Pilar 3).
- Gerbang 1 cocok-kata · 2 bentuk · 3 uji dua kalimat (terpenting) · 4 paket. Validator `tmp/validate_soal.js`, `tmp/validate_tkp_json.js`; Gerbang 3 tetap manual (PROJECT_MEMORY "Gerbang 3 bottleneck").

### A3. Status paket 80 (PROJECT_MEMORY "Paket 80 soal dibuat")
- Dimensi 16/16/14/12/10/12 · Tinggi 48 / Sangat Tinggi 32 · kunci 16 per huruf · validator 0 error.
- 1–12 = Batch 2 (sudah 2 ronde reviu tim ahli). 13–80 **belum direviu tim ahli**. Belum ada uji coba peserta.

### A4. Celah dan kelemahan nyata
**K1 — Bocor bentuk sistemik (temuan terbesar).** Diukur pada 80 soal:
| Ukuran | Hasil |
|---|---|
| Opsi terpanjang = poin 4 | **64/80** |
| Kunci = opsi terpanjang ke-2 | **64/80** (1–12: 12/12) |
| Kunci berpola dua langkah (`lalu`/`sambil`/`serta`/`disertai`/`kemudian`/`sekaligus`) | **69/80**; di **29 soal** kunci satu-satunya yang berpola ini |
| Opsi berawal Membiarkan/Menyerahkan/Menunggu/Menunda | 55 opsi, **52 di antaranya poin 1** |
| Tebakan tanpa membaca isi: buang opsi terpanjang + opsi berverba pasif, pilih opsi dua-langkah terpanjang | **65/80 (81%)**; soal 1–12: 12/12; acak = 20% |

Akar: aturan "kunci strictly lebih pendek dari distraktor terpanjang" (Pilar 4 no. 2) + cara kerja "tulis poin 4 2–3 kata lebih panjang" (PROJECT_MEMORY "Pola kesalahan yang berulang") memindahkan sinyal dari "terpanjang" ke "terpanjang kedua". Daftar kata sambung Pilar 4 no. 3 / Gerbang 4 tidak memuat "lalu", jadi validator tidak melihatnya. Pilar 4 no. 10 (nada) sudah ada, tapi verba poin 1 tetap seragam. Catatan jujur: heuristik dirumuskan sesudah melihat data, tapi ketiga aturannya turunan langsung dari aturan engine, jadi sinyalnya nyata. Ukur ulang di paket berikutnya.

**K2 — Definisi poin 4 ganda.** Pilar 1 Hukum Dua Kutub: poin 4 "hanya menutup satu kutub secara eksplisit … atau menutup dua kutub tapi tanpa mekanisme nyata". Pilar 3: poin 3 dan 4 "sama-sama tampak menutup kedua kutub", gagal di sumbu presisi. Gerbang 4 kembali ke versi lama ("setiap opsi poin 4 punya batas satu-kutub"). Penyusun bisa memakai dua ukuran berbeda.

**K3 — Gradasi bawah tidak dijaga; opsi tidak jujur masuk.**
- Soal 14: B (poin 4) "menyebut angka pensiun … sebagai data terkini milik instansi" padahal soal menyatakan angka itu sementara. Itu klaim tidak benar, melanggar Filosofi no. 1 ("nol kebohongan telanjang"), dan malah dinilai lebih tinggi dari D (poin 2, kirim tanpa catatan).
- Soal 13: A (poin 2) "meloloskan penawaran" yang tidak memenuhi syarat dokumen = melanggar aturan pemilihan; Prosedur langkah 8 melarang opsi ilegal sebagai godaan. Pembahasan C memakai klaim kewenangan pokja tanpa rujukan — **belum diverifikasi**.
- Urutan poin 3 vs 4 tidak punya aturan tertulis (lihat A2).

**K4 — Sumbu tumpang tindih dan timpang.** Soal 73 B diberi "S3+J3", tapi alasan di pembahasan ("melompat ke sanksi sebelum pembinaan") adalah urutan (S1). S1, S3, dan J3 tidak punya batas operasional. Sebaran poin 4: S1 33 · S4 22 · S5 14 · S3 8 · S2 **3**. Peserta bisa belajar "opsi kuat yang bertindak sesudah kejadian = poin 4".

**K5 — Kode jebakan hampir tidak menyentuh klaster 3-4-5.** 85 kode di 80 soal; **80 menempel di poin 2** (J1 46, J4 22, J2 11), hanya 5 di poin 3/4. Instruksi engine juga bertentangan sendiri: "di luar poin 1–2, biasanya paling pas ditempel di poin 2" (Pilar 3). Jadi J1 cocok-kata praktis = penanda poin 2.

**K6 — Kunci dengan pembelaan lemah.** Soal 13: kunci E dan poin 4 D berbagi klausa pertama yang sama ("Menggugurkan penawaran … sesuai kriteria administrasi, lalu …"), beda hanya di ekor = varian "poin 4 ± satu klausa" yang dilarang Pilar 4 no. 9. Klausa ekor E ("mengusulkan perbaikan daftar dokumen wajib") tidak jelas menutup kepentingan efisiensi; D (alasan gugur tertulis ke vendor) juga bisa dibela. Gerbang 3 lolos di atas kertas.

**K7 — Dokumen engine tidak konsisten.** Header "Versi 1.0" (baris 8) padahal v1.2 · judul "8 LARANGAN KERAS" berisi 11 · Pilar 2 "daftar penutup sah cuma 5" padahal tabel 8 · Gerbang 2 "minimal satu distraktor sama/lebih panjang" bertentangan dengan Pilar 4 no. 2 (strictly) · "24 soal rujukan" padahal file korpus berisi 29 butir (nomor sumber 1–15, 68–110; ada dua nomor 97 berbeda isi).

**K8 — Taksonomi poin tidak berasal dari kunci resmi.** Ketiga file korpus **tanpa kunci/skor** (grep "kunci/skor/poin" = 0). Poin 1–5 dan sumbu = rekaan penyusun, belum dikalibrasi data peserta. Level "Tinggi/Sangat Tinggi" juga label penyusun, bukan hasil uji.

**K9 — Pembahasan bank 80 belum gaya siswa.** 80/80 memuat kode sumbu (S1–S5) dan "kutub"; tanpa sapaan "kamu", tanpa analogi. Melanggar aturan-tetap C-5 bila dipakai sebagai pembahasan siswa. Format pembahasan engine (§FORMAT OUTPUT) memang format reviu.

---

## B. Logika modul Kepribadian psi-expert

### B1. Format dan aspek (`modul-kepribadian.md` §Format; PEDOMAN_ENGINE_PRIBADI §1, §3.1a, §7.3)
| Bagian | Bentuk | Skor |
|---|---|---|
| Kepribadian (KP) Likert | 6 aspek × 8: Prososial, Pengambilan Keputusan, Penyesuaian Diri, Kepercayaan Diri, Stabilitas Emosi, Motif Berprestasi (+ Loyalitas, Kerja Sama di simulasi) | 1–4, kunci D/A |
| Integritas & Kejujuran (Pass Hand) | 63 butir a/b, **kedua opsi terdengar positif**, 11 dimensi D1–D11 → 7 aspek SPCP (Integritas, Inovasi, Kepemimpinan, Transparansi, Produktivitas, Profesionalisme, Religiusitas) | 1/0 |
| SJT | situasi + 5 tindakan bobot 1–5 ("model TKP", §10) | bobot; norma SJT terpisah |
| Ya/Tidak | 6 aspek × 10 + 10 butir Validitas | proporsi |

### B2. Aturan kunci
- **Kunci = sisi kalimat yang paling kuat mencerminkan aspek blok, walau sisi lain juga baik secara moral** (PEDOMAN_ENGINE_PRIBADI §1.1a; 88/90 kunci sumber cocok). Contoh: 58 selfie > foto bersama → Kepercayaan Diri; 36 pura-pura menyenangkan → Penyesuaian Diri.
- Integritas & Kejujuran: aturan per dimensi, mis. D1 kebenaran > kebaikan · D2 keterbukaan > kerahasiaan · **D3 aturan/sanksi > penyadaran/nasehat** · D4 patuh untuk hukum, inovasi untuk program · D5 kewenangan > prioritas/target (§3.1). Butir kontradiktif sumber (15, 59, 46, 56) tidak dijadikan templat.
- SJT tangga bobot (§10.1): **5** tindakan inti aspek · **4** baik tapi kurang langsung/bergantung orang lain · **3** prosedural atau menunda · **2** pasif/menghindar · **1** berlawanan dengan aspek. Tiap bobot punya alasan bernama (`alasan_opsi`) + `tips`.

### B3. Menangani jawaban "ingin terlihat baik"
- Pass Hand: dua opsi sama-sama positif (paksa pilih) → "pilih yang baik" tidak menolong; pembeda = aturan dimensi.
- Ya/Tidak: 10 butir Validitas "kesan terlalu sempurna", dihitung terpisah, ambang 4/10 **provisional** (`modul-kepribadian.md` §Ya/Tidak).
- Konsistensi: butir kembar (Pass Hand, Ya/Tidak; SJT kembar beda huruf, jarak ≥ 10).
- Metrik gaya jawaban (laporan saja): persetujuan, ekstrem, konsistensi (§5.4).
- Keswa: 15 butir "sok-sempurna", tidak pernah kunci fake-good.
- SJT sendiri **tidak punya** butir validitas; hanya kembar.
- Etika: label "Kesesuaian dengan kunci latihan D'AJIKS", bukan "kepribadian Anda" (§8).

---

## C. Peta kesinambungan

### C1. Peta aspek (tafsiran Claude, bukan kisi resmi)
| Dimensi TKP | Kepribadian (KP/SJT) | Integritas & Kejujuran | Kaitan | Beda arah yang perlu dijaga |
|---|---|---|---|---|
| Profesionalisme | Motif Berprestasi, Pengambilan Keputusan | Profesionalisme (D4 patuh, D11), Integritas (D1) | sedang | PK psi "memutuskan sendiri" vs TKP S3 menghukum "bertindak sendiri padahal perlu pihak berwenang" |
| Pelayanan Publik | Prososial | Transparansi (D2), Integritas (D3) | sedang | Prososial psi = menolong langsung sendiri; TKP pelayanan = akar masalah/sistemik (S2, S4) |
| Jejaring Kerja | Kerja Sama (simulasi), Penyesuaian Diri | Kepemimpinan (D5, D7) | sedang | Kerja Sama psi hanya 16 butir simulasi |
| Sosial Budaya | Penyesuaian Diri, Prososial | — | lemah–sedang | Penyesuaian Diri psi = **diri** yang menyesuaikan; TKP = jangan membebani pihak berbeda untuk menyesuaikan (Pilar 5; soal 56 C dinilai poin 2) |
| TIK | Penyesuaian Diri (adaptasi) | Inovasi (D4 inovasi, D6) | lemah | psi tidak punya aspek keamanan data / kontinuitas layanan |
| Anti Radikalisme | Stabilitas Emosi, Loyalitas | Integritas (D3) | lemah | D3 psi "sanksi > penyadaran" berlawanan dengan pola kunci TKP (soal 73: pembinaan dulu, laporan sanksi = poin 4) |
| — | Kepercayaan Diri, Stabilitas Emosi | Religiusitas (D9), Produktivitas (D8, D10) | tidak ada pasangan TKP | |

### C2. Logika dasar berpikir
| | TKP (engine v1.2) | Kepribadian/SJT (psi) |
|---|---|---|
| Kunci menjawab | "tindakan mana paling **optimal** di situasi ini?" | "sisi mana paling **mengekspresikan aspek** blok?" |
| Unit pembeda | mekanisme + sumbu presisi (urutan, skop, wewenang, keberlanjutan, verifikasi) | arah aspek; SJT: seberapa langsung tindakan mewujudkan aspek |
| Opsi tercela | dilarang di semua poin (Filosofi 1, Pilar 4 no. 7) | boleh di bobot 1 ("berlawanan aspek", mis. pura-pura tidur di SJT-PRO-001 E) |
| "Ingin terlihat baik" | tidak dideteksi; pertahanan = semua opsi terdengar baik + nada tidak berkorelasi (Pilar 4 no. 10) | dideteksi di Ya/Tidak (Validitas), kembar, metrik gaya |
| Label dimensi saat mengerjakan | wajib tampil di stem (Format Output) — dasar "korpus asli", **belum diverifikasi** untuk CAT BKN | bertahap: drilling tampil → simulasi disembunyikan (§7.1) |
| Skor | 1–5 tiap opsi (format SKD **belum diverifikasi**) | Likert 1–4, a/b 0–1, SJT 1–5 → RS, WS norma, psikogram, KS mematikan |

### C3. Tangga gradasi berdampingan
| Skor | TKP | SJT psi | Selaras? |
|---|---|---|---|
| 5 | bersih di semua sumbu | tindakan inti aspek | ya |
| 4 | gagal di satu sumbu | baik tapi tidak langsung / bergantung orang lain | sebagian (≈ S3/J2) |
| 3 | gagal di sumbu lain | **prosedural atau menunda** | **tidak**: di TKP "menunda" = poin 1, formalitas = J4 di poin 2 |
| 2 | patuh buta / demi relasi-citra | **pasif/menghindar** | **tidak**: pasif di TKP = poin 1 |
| 1 | pasif | berlawanan aspek (boleh tercela) | **tidak** |

Siswa yang latihan dua-duanya bisa membawa kebiasaan "menunda = nilai tengah" dari psi ke TKP.

### C4. Jebakan yang setara
| TKP | Padanan psi | Catatan |
|---|---|---|
| J2 geser beban | SJT bobot 3–4 "pengorbanannya dilemparkan ke orang lain" (SJT-PRO-001 D) | setara isi |
| S3 kewenangan | D5 kewenangan > prioritas/target | selaras |
| J1 cocok-kata | Pass Hand HOTS "pengecoh dari kata kunci dimensi lain" | mirip mekanisme, beda sasaran |
| J4 formalisme kosong | D4 patuh untuk hukum/standar; SJT bobot 3 prosedural | **bertentangan sebagian**: psi menilai patuh/prosedural lebih tinggi |
| J3 eskalasi prematur | D3 aturan/sanksi > penyadaran | **bertentangan** |
| S2, S4, S5 | tidak ada | khas TKP |

### C5. Bisa dipinjam ke TKP
1. **Aturan sebaran panjang kunci** (psi D-3 / §10.1: kunci terpanjang ≤ 24%, divalidasi `check-bank-pribadi.ts`) — ukur sebaran, bukan "strictly lebih pendek". Bank SJT psi: kunci di peringkat panjang 1–5 = 107/122/70/40/29 dari 368 (tersebar), kunci dua langkah 79/368 (21%) vs TKP 69/80 (86%).
2. **Alasan bernama per bobot + tips aturan** (`alasan_opsi`, `tips`) → bentuk pembahasan siswa TKP.
3. **Label bertahap** (§7.1) bila ternyata CAT BKN tidak menampilkan label dimensi.
4. **Cek buta** (pedoman-soal Q-4/Q-5: pemecah buta, bandingkan alasan, bukan huruf) untuk audit poin 3-4-5 bank 80.
5. **Butir kembar** (situasi beda, dilema sama, huruf kunci beda, beda paket) untuk latihan konsistensi penalaran — bukan untuk skor.

### C6. Tidak boleh disatukan
- **Format skor dan norma**: psikogram, WS, KS mematikan, Nilai Akhir Psikotest = sistem psikotes Polri/kedinasan; jangan diterapkan ke TKP SKD.
- **Aturan kunci "sisi aspek"** ≠ "paling optimal". Contoh: PK psi memuji memutuskan sendiri; TKP S3 menghukumnya. Pembahasan TKP jangan meminjam kalimat "pilih yang paling mencerminkan aspek".
- **Tangga SJT psi** (menunda = 3, pasif = 2, tercela = 1) tidak boleh dipakai sebagai tangga poin TKP.
- **D3 "sanksi > penyadaran"** dan klaim mentor psi ("kewenangan > mendesak", "inovasi kalah oleh legalitas") khusus Pass Hand; bukan aturan TKP.
- **Butir Validitas / deteksi pura-pura baik**: TKP tidak punya skala validitas (sejauh diketahui — belum diverifikasi); menyisipkan butir tanpa skor menyesatkan peserta soal format ujian.

---

## D. Usulan untuk engine TKP dan pembahasan TKP (USULAN, belum diterapkan)
| Kode | Usulan | Ubah | Bukti | Status |
|---|---|---|---|---|
| A | Ganti Pilar 4 no. 2: dari "kunci strictly < terpanjang" ke **sebaran peringkat panjang** per paket (kunci peringkat 1 ≤ 20%, peringkat 2 ≤ 30%, poin 4 terpanjang ≤ 30%) + validator menghitung tebakan bentuk (aturan K1) dengan target ≤ 30% | engine + validator | K1 | **DIUBAH Gusti 2026-10-25 (A+L)**: hapus strictly-shorter; sebaran per paket kunci terpanjang ≤ 20%, terpanjang ke-2 ≤ 30%, poin 4 terpanjang ≤ 30% (seri = 1/k); selisih per soal ≤ 3; **pita 10–20 kata tetap** (8–14 ditolak: opsi pendek mendorong kunci abstrak, Al Faiz 67/69/91/95); tebakan masuk modul uji-tebak bersama B |
| B | Tambah `lalu/kemudian/setelah itu` ke daftar kata sambung Pilar 4 no. 3 + Gerbang 4; kunci dua langkah ≤ 50% per paket | engine + validator | K1 | **DIUBAH Gusti 2026-10-25**: daftar kata sambung diperluas (lalu/kemudian/setelah itu/dan + verba); batas "kunci dua langkah ≤ 50%" **diganti** target validator "tebak dua-langkah terpanjang" ≤ 30% per paket (satu ukuran dengan A) |
| C | Verba pembuka poin 1 dibatasi (maks 3× per 45 per verba) dan verba pasif khas juga dipakai di poin 3–4 | engine | K1 | DIGANTI M (lihat riset Al Faiz §E) |
| D | Satukan definisi poin 4 ke model sumbu presisi; hapus "poin 4 hanya menutup satu kutub" di Pilar 1 dan Gerbang 4 | engine | K2 | **DITERIMA Gusti 2026-10-25**: poin 4 = gagal di satu sumbu presisi dengan frasa yang bisa dikutip; hapus "hanya menutup satu kutub" di Pilar 1 + item Gerbang 4 |
| E | Kriteria tertulis poin 1 vs 2 dan poin 3 vs 4; larangan opsi berisi klaim tidak benar / pelanggaran aturan di **semua** poin; audit ulang bank 80 (mulai 13, 14) | engine + bank (nanti) | K3, K6 | **DITERIMA + uji dulu (Gusti 2026-10-25)**: (1) poin 1 vs 2 = "sesudah tindakan, kepentingan mana masih terlayani, siapa menanggung" — poin 2 masih melayani satu kepentingan, poin 1 tidak ada / beban ke pihak lemah; (2) poin 3 vs 4 = "kapan gagalnya terasa" — 3 rugi sekarang ke pihak di soal, 4 rugi nanti/kasus berikut. (1)(2) diuji read-only ke Al Faiz 45 + Batch 2 (12) sebelum masuk rencana diff; (3) larangan klaim tidak benar/pelanggaran aturan di semua poin langsung diterima; (4) audit bank 80 menunggu perintah. **Hasil uji (2026-10-25)**: 1v2 Al Faiz 31/45, B2 8/12 → kriteria 1 DIREVISI status uji ("siapa menanggung" dibuang; poin 2 = bertindak pada masalah tapi setengah/cara buruk, poin 1 = M); 3v4 Al Faiz 34/45, B2 6/12 → kriteria 2 DIPAKAI status uji; B2 no. 3, 6, 8, 11 = bahan audit |
| F | Definisi operasional S1 vs S3 vs J3 + contoh; batas lunak sebaran sumbu poin 4 | engine | K4 | DITERIMA (+P8): pembeda S1=kapan · S3=siapa · J3=naik terlalu cepat; atasan = kunci bila benturan wewenang / darurat / pola merugikan nyata di luar wewenang; tanpa pemicu, lapor atasan = J3 skor 2–3; sebaran sumbu poin 4 (≤±35% per sumbu per paket) = catatan lembar reviu, bukan gerbang; label 73 B ikut usulan J |
| G | Kode jebakan wajib juga ada di poin 3/4 (mis. ≥ 1 per 3 soal); perbaiki kalimat bertentangan di Pilar 3 | engine | K5 | DITERIMA + validator: tulis ulang ENGINE baris 145–146 ("tempel di poin 2, 3, atau 4; jangan di kunci; sebar antar-soal"); per paket jebakan di poin 3/4 ≥15/45 dan tak ada satu kode J >50% di satu poin, dicek validate_tkp_json.js (field jebakan sudah ada, baris 89) |
| H | Rapikan inkonsistensi dokumen (versi, "8 larangan", "penutup 5", Gerbang 2, jumlah korpus) | engine | K7 | DITERIMA + v1.3 + sinkron skill (Gusti 2026-10-25): 5 item K7 (Gerbang 2 lewat A+L), engine v1.3 + changelog, sinkron SKILL.md aturan no. 3 / references/tkp.md / aturan-tetap.md dalam diff yang sama; angka penutup dicek ulang ke tabel |
| I | Format pembahasan siswa TKP bebas istilah dapur (peta nama kesalahan di bawah) + `tips` aturan ala psi; format reviu lama tetap untuk tim ahli | engine + CLAUDE.md TKP | K9, C5.2 | DITERIMA + validator (Gusti 2026-10-25): engine dua format (reviu tetap; siswa = fakta penentu → per opsi skor + satu alasan + "tapi" → tips); peta nama diperbarui (S4 gejala, J5 vonis dini, J6 ulang cara gagal, jenis poin 1 M); validate_tkp_json.js cek istilah dapur = error (daftar dari validate_bank_100.mjs); konversi bank 80 = tugas terpisah, menunggu perintah |
| J | Cek buta bank 80 (Codex/subagent tanpa kunci) sebelum reviu tim ahli; catat soal yang poin 3-4-5-nya tidak disepakati | proses | K3, K6, K8 | DITERIMA sebagai langkah Prosedur (Gusti 2026-10-25): paket baru + metode audit bank 80; dijalankan hanya atas perintah Gusti; penilai beda model/manusia diutamakan; hasil "sama" ≠ bukti valid, hasil "beda" = daftar reviu; tanpa ambang angka (belum kalibrasi) |
| K | Verifikasi via web (izin dulu, hasil ke `usulan/`): dimensi resmi TKP + regulasinya, skor 1–5 tanpa nol, apakah CAT BKN menampilkan label dimensi | riset | A1, C2 | DITUNDA ke sesi terpisah (Gusti 2026-10-25): butuh izin web; hasil ke usulan/; tidak menghalangi rencana diff |

### Peta nama kesalahan untuk pembahasan siswa (usulan I)
Kolom kiri hanya untuk reviu; siswa hanya membaca kolom kanan.
| Kode | Bahasa siswa |
|---|---|
| S1 | "benar, tapi telat" |
| S2 | "cuma beres untuk satu orang" / "kebesaran untuk masalahnya" |
| S3 | "itu tugas pihak lain" / "kamu tidak berhak memutuskan sendiri" |
| S4 | "beres hari ini saja, besok terulang" |
| S5 | "jalan, tapi tidak dicek ulang" |
| J1 | "cuma mengulang kata di soal" |
| J2 | "bebannya dilempar ke orang lain" |
| J3 | "langsung lapor sebelum mencoba sendiri" |
| J4 | "cuma memenuhi formalitas" |

Contoh baris "kenapa opsi lain gugur" (soal 56, rapat berbahasa daerah):
- A: Ini cuma ikut kebiasaan orang banyak. Dua rekan barumu tetap tertinggal.
- B: Niatnya baik, tapi telat. Rapatnya sudah lewat, mereka tidak sempat ikut bicara.
- C: Bebannya dilempar ke orang baru. Justru mereka yang disuruh menyesuaikan.
- E: Beres untuk hari ini saja. Rapat minggu depan kamu harus mencari penerjemah lagi.
