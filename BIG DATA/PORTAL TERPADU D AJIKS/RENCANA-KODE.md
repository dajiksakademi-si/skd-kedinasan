# Rencana Penulisan Kode: Portal Terpadu D'Ajiks

Disusun 2026-11-04. Dipakai saat prototipe `landing/` dinyatakan final oleh Gusti. Pedoman tampilan ada di [DESIGN.md](DESIGN.md), konteks produk di [PRODUCT.md](PRODUCT.md), riwayat keputusan di `~/.claude/skills/skd-expert/riset/log-portal-terpadu.md`.

## 1. Posisi sekarang

| Berkas prototipe | Isi | Status |
|---|---|---|
| `landing/index.html` | beranda lengkap (±770 baris, CSS + JS di dalam berkas) | disetujui bertahap, belum final |
| `landing/kelas.html` | satu halaman untuk 5 kelas lewat `?k=skd\|ipdn\|polri\|tni\|cpns&v=penuh\|tryout` | menunggu penilaian Gusti |
| `landing/daftar.html` | daftar 2 langkah (formulir → "Pilih kelasmu" gaya ClickUp) | belum ditinjau ulang sejak 2026-11-03 |
| `landing/bayar.html` | pilih versi, promo, metode → detail pesanan + hitung mundur 24 jam → berhasil | alur contoh, tanpa penyedia bayar |
| `landing/assets/` | logo, foto asli, tangkapan layar aplikasi, siluet SVG | asli kecuali ditandai |

Belum ada rancangan untuk: halaman Masuk, Paket Saya, ruang tryout, nilai + pembahasan, menu HP.

## 2. Gerbang sebelum kode produksi dimulai

Kode produksi baru dimulai setelah Gusti menjawab daftar ini. Rekomendasi saya ada di kolom kanan.

| No | Keputusan | Rekomendasi |
|---|---|---|
| 1 | Prototipe beranda + halaman kelas dinyatakan final | — |
| 2 | Paket, harga, masa aktif asli (pengganti DATA CONTOH) | wajib sebelum terbit |
| 3 | Jawaban FAQ asli | wajib sebelum terbit |
| 4 | Isi kelas IPDN dan TNI (masih DATA CONTOH) | wajib sebelum terbit |
| 5 | Izin tampil nama peserta CEST TKBI | tanpa izin: tampil "Peserta CEST TKBI" |
| 6 | Nomor WhatsApp admin, akun media sosial, jadwal kelas tatap muka | wajib sebelum terbit |
| 7 | Kelas di kartu tengah, siluet untuk kelas selain SKD | ikuti hasil penilaian halaman kelas |
| 8 | Penyedia pembayaran (QRIS, VA, e-wallet) | pilih yang punya webhook bertanda tangan + biaya per transaksi jelas |
| 9 | Cara menyatukan login 4 aplikasi (psiko-cat, dajiks-cest, CAT SKD, portal) | satu akun Supabase Auth bersama |
| 10 | Kerangka dan tempat terbit | Next.js 16 + Supabase di tim Vercel `ajiks`, sama dengan psiko-cat dan D AJIKS AKADEMI PLATFORM |
| 11 | Rancangan menu HP (sekarang tautan menu disembunyikan di layar sempit) | rancang sebelum kode, ikuti alur usul desain |
| 12 | Usulan gerak dari rekaman Choroo (judul huruf demi huruf, kartu bergiliran, ganti kelas, sorotan kaki halaman) | contoh dulu di halaman kelas |

## 3. Kerangka yang direkomendasikan

Alasan: tiga proyek D'Ajiks yang ada (psiko-cat, D AJIKS AKADEMI PLATFORM, blueprint-polri-ajiks) sudah Next.js 16; dua sudah memakai Supabase. Satu kerangka = satu cara kerja, satu login.

- **Next.js 16 App Router**, halaman pemasaran dirender statis (tanpa fungsi server per kunjungan).
- **CSS biasa**: satu `globals.css` berisi token dari DESIGN.md sebagai variabel CSS (`--navy-logo`, `--gold`, …) + CSS Modules per komponen. Tidak perlu Tailwind: prototipe sudah CSS biasa, pemindahan paling pendek.
- **Huruf** Inter Tight lewat `next/font/google` (disimpan sendiri saat build, tanpa tautan ke Google Fonts).
- **Lenis** `lenis@1.3.1` dari npm (bukan dari unpkg seperti prototipe).
- **Ikon**: panah dan centang yang sekarang SVG di dalam berkas dipindah ke satu komponen ikon.
- **Data**: Supabase (tabel di bagian 5).

## 4. Peta halaman

| Rute produksi | Dari prototipe | Render |
|---|---|---|
| `/` | `index.html` | statis |
| `/kelas/[kelas]` (`skd`, `ipdn`, `polri`, `tni`, `cpns`), versi lewat `?versi=tryout` | `kelas.html?k=&v=` | statis, `generateStaticParams` untuk 5 kelas |
| `/daftar` | `daftar.html` | statis + aksi server untuk membuat akun |
| `/masuk` | belum ada | perlu rancangan |
| `/bayar` | `bayar.html` | dinamis, wajib masuk |
| `/paket-saya`, tryout, nilai | belum ada | ikuti keputusan nomor 9 |

Tautan lama `kelas.html?k=…` tidak perlu dialihkan karena belum pernah terbit.

## 5. Data

Isi yang sekarang tertulis di dalam berkas dipindah ke tabel, supaya Gusti bisa mengganti paket/harga tanpa mengubah kode.

| Tabel | Kolom pokok | Sumber prototipe |
|---|---|---|
| `kelas` | `slug`, `nama`, `isi`, `ujian`, `siluet[]`, `urutan` | objek `KLS` di index/kelas |
| `paket` | `id`, `kelas_slug`, `versi` (penuh/tryout), `label`, `nama`, `harga`, `harga_coret`, `fitur[]`, `aktif`, `urutan` | objek `PAKET` (DATA CONTOH) |
| `materi` | `kelas_slug`, `judul`, `uraian`, `ikon` | daftar "Yang kamu pelajari" di kelas.html |
| `pengajar` | `nama`, `peran`, `foto`, `urutan` | 6 kartu asli |
| `testimoni` | `program`, `nama_tampil`, `kutipan`, `skor`, `izin_nama` | bento psikotes + TKBI; `testimoni-cest-tkbi-2026-11-04.md` |
| `faq` | `kategori`, `tanya`, `jawab`, `urutan` | 10 tanya-jawab (DATA CONTOH) |
| `pesanan` | `id`, `user_id`, `paket_id`, `harga`, `status`, `kedaluwarsa`, `ref_penyedia` | alur bayar.html |

Halaman pemasaran membaca tabel ini **saat build / revalidasi berkala** (mis. `revalidate` 1 jam atau revalidasi saat Gusti menyimpan perubahan), bukan setiap kunjungan. Pilih kolom yang dipakai saja, jangan `select("*")`.

## 6. Komponen dan perilakunya

Setiap komponen interaktif menjadi komponen klien kecil; sisanya komponen server. Nilai gerak persis ada di DESIGN.md bagian Gerak.

| Komponen | Perilaku yang harus dipertahankan | Pelajaran dari prototipe |
|---|---|---|
| `MenuAtas` | kapsul tembus pandang; berubah navy pekat setelah gulir > 40px | — |
| `MenuKelas` (bertingkat) | SATU pengendali status `open`: kursor masuk buka, keluar tutup setelah 150ms; perangkat berkursor klik hanya membuka; layar sentuh klik buka/tutup; Esc, klik di luar, gulir, fokus keluar menutup; `aria-expanded` | jangan gabungkan `:hover` + `:focus-within` + tombol JS (penyebab menu "muncul 2–3 kali") |
| `GulirHalus` | Lenis dipasang sekali di tata letak akar; mati bila "kurangi gerak"; saat pindah halaman gulir ke atas seketika; tautan `#bagian` ditangani sendiri: `preventDefault` + `lenis.scrollTo(target)` | jangan pakai `anchors: true` (Lenis 1.3.1 tidak mencegah lompatan bawaan: halaman melompat, tidak meluncur, dan alamat jadi `#faq` sehingga setiap muat ulang terkunci di bagian itu) |
| `Muncul` (`data-reveal`, `data-morph`) | IntersectionObserver, sekali; tanpa JS isi tetap tampil | pasang pembersihan cadangan 1,6 dtk; `transitionend` kadang tidak terpanggil sehingga efek sentuh kartu tertahan |
| `JudulBergerak` | pecah per kata; teks utuh tetap terbaca pembaca layar | tanda baca menempel digabung ke kata sebelumnya; warna sorot pakai kelas `.emas`, bukan `span` umum |
| `KartuPaket` | data dari tabel `paket`; kartu tengah lebih tinggi + cahaya emas; siluet hanya bila kelas punya `siluet` | — |
| `PilihKelas` + `PilihVersi` | kapsul pilihan; di halaman kelas mengganti URL tanpa memuat ulang | — |
| `AngkaMeteran` | berputar sekali saat masuk layar | lajur angka perlu `align-self:flex-start` |
| `KolomKutipan` | geser per langkah 2,2 dtk; berhenti saat disentuh kursor atau tab tersembunyi; bisa lebih dari satu di halaman | — |
| `FAQ` | selalu satu terbuka; tinggi panel dikunci ke keadaan terpanjang, diukur ulang setelah huruf dimuat dan saat ukuran layar berubah | — |
| `TabFitur` | panel tersembunyi pakai atribut `hidden` | `[hidden]` kalah oleh `display:grid`; perlu `[hidden]{display:none!important}` |
| `JejakHalaman` | "‹ Beranda / Kelas" | — |
| `KakiHalaman` | gaya Fiilo; tombol WhatsApp | — |

## 7. Pembayaran dan keamanan

- **Harga tidak boleh datang dari URL.** Prototipe mengirim `harga` lewat alamat (`bayar.html?…&harga=`); itu hanya untuk contoh. Di produksi peramban mengirim `paket_id`, server membaca harga dari tabel `paket`, lalu membuat `pesanan`.
- Status lunas hanya diubah oleh webhook penyedia bayar yang tanda tangannya diperiksa. Webhook harus aman dipanggil ulang (pesanan yang sudah lunas tidak diproses dua kali).
- Kode QR, nomor VA, dan nama bank hanya dari penyedia bayar, tidak pernah dibuat-buat.
- Halaman `/bayar` dan `/paket-saya` wajib masuk; halaman pemasaran tidak.
- Masukan formulir daftar diperiksa di server (nama, email, nomor HP).

## 8. Biaya (Vercel tim `ajiks`, Supabase)

- Beranda dan halaman kelas statis: 0 fungsi per kunjungan.
- Bila nanti ada middleware/proxy untuk login, `matcher` hanya untuk `/bayar`, `/paket-saya`, tryout, dan API; **jangan** untuk `/`, `/kelas/*`, gambar, huruf, SVG.
- Foto: ubah ke WebP/AVIF sekali di komputer lalu simpan di `public/` (lebih hemat daripada optimasi gambar Vercel per foto). Foto besar (rekaman, video) jangan masuk repo.
- Tanpa pengambilan data berulang dari peramban (tanpa polling). Percobaan ulang yang gagal selalu dibatasi.
- Perkiraan: per pembeli ±3–5 pemanggilan fungsi (buat pesanan, webhook, buka Paket Saya). Sebelum acara besar (tryout serentak), hitung terhadap batas paket Vercel.

## 9. Utang prototipe yang dibereskan saat pemindahan

1. Gaya menu, kartu, dan kaki halaman di `kelas.html` adalah salinan dari `index.html`. Skrip pembangunnya ada di folder sementara sesi dan akan hilang. Sampai pemindahan, ubah langsung di kedua berkas. Di produksi gaya ini menjadi satu komponen.
2. SELESAI 2026-11-04: ikon centang kartu paket kini `#031739`.
3. Kontras: judul kolom kaki halaman + label menu bertingkat SELESAI (`#526772`). Sisa: catatan kecil kartu paket `#6b7f88` (4,2:1).
4. Gaya yang ditulis langsung di tag (pembuka beranda, dll.) dipindah ke kelas CSS.
5. Lenis dari unpkg diganti paket npm.
6. Penanda "DATA CONTOH" dan "PERLU DIPASTIKAN" dihapus hanya setelah data asli masuk.
7. Design System artifact lama (Lexend + Source Sans 3) tidak dipakai untuk portal; acuan = DESIGN.md.

## 10. Urutan kerja

1. Gerbang bagian 2 terjawab → periksa: daftar keputusan tercatat di log.
2. Buat proyek Next.js + `globals.css` dari token DESIGN.md → periksa: halaman kosong memakai Inter Tight dan warna navy logo.
3. Pindahkan beranda per bagian (menu → pembuka → … → kaki halaman) → periksa tiap bagian: tangkapan layar 1440px dan 390px sama dengan prototipe.
4. Pindahkan halaman kelas (5 halaman statis) → periksa: 5 kelas × 2 versi tampil benar, jejak ke beranda berjalan.
5. Pasang komponen interaktif bagian 6 → periksa: uji papan ketik (Tab, Esc), "kurangi gerak", tanpa JS isi tetap tampil.
6. Pindahkan isi ke tabel Supabase (bagian 5) → periksa: ganti harga di tabel, halaman berubah setelah revalidasi.
7. Daftar + masuk → periksa: akun baru bisa masuk.
8. Pembayaran → periksa: pesanan uji di mode percobaan penyedia; ubah harga di URL tidak berpengaruh; webhook dipanggil dua kali tetap satu pelunasan.
9. Terbit pratinjau di Vercel → periksa: Lighthouse, kontras AA, tampilan Safari Mac + HP, jumlah fungsi per kunjungan beranda = 0.
10. Terbit produksi hanya atas perintah Gusti.

## 11. Pemeriksaan sebelum terbit

- [ ] Tidak ada lagi DATA CONTOH, [menyusul], atau PERLU DIPASTIKAN.
- [ ] Semua nama peserta yang tampil punya izin.
- [ ] Tidak ada janji "dijamin lolos".
- [ ] Tampilan 1440px dan 390px dicek; menu HP berjalan.
- [ ] Gerak mati saat "kurangi gerak"; isi tampil tanpa JS.
- [ ] Kontras AA untuk semua teks.
- [ ] Harga hanya dari server; webhook diuji.
