---
name: Portal Terpadu D'Ajiks Akademi
description: Satu pintu persiapan TNI/POLRI, CPNS, dan sekolah kedinasan — navy logo, aksen emas, Inter Tight, gerak halus gaya Choroo.
colors:
  navy-logo: "#031739"
  navy-2: "#062044"
  navy-3: "#08254b"
  navy-4: "#0f3360"
  navy-5: "#0d2e5c"
  gold: "#e8c766"
  gold-deep: "#c9a24a"
  gold-glow: "#d4af4f"
  gold-text: "#9a7416"
  gold-price: "#7a5710"
  ink: "#172a35"
  ink-2: "#24333d"
  body-text: "#3d5260"
  muted: "#526772"
  line: "#e3e8f0"
  line-strong: "#dbe0ea"
  surface: "#ffffff"
  surface-soft: "#f7f8fb"
  surface-well: "#e8ecf3"
  surface-chip: "#eef1f6"
  on-navy: "#dfe5f3"
  on-navy-muted: "#b7c3d2"
  success: "#087453"
  danger: "#b42342"
typography:
  display:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  display-kelas:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "46px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  quote:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(26px, 3.3vw, 42px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body-lead:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  sm: "12px"
  md: "16px"
  card: "20px"
  tier: "22px"
  well: "28px"
  panel: "32px"
  pill: "999px"
spacing:
  gutter-desktop: "40px"
  gutter-mobile: "16px"
  container: "1240px"
  section: "96px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy-logo}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy-3}"
    rounded: "{rounded.pill}"
    height: "56px"
  button-masuk:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy-logo}"
    rounded: "{rounded.pill}"
    height: "54px"
  chip-active:
    backgroundColor: "{colors.navy-logo}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    height: "48px"
  tier-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.tier}"
    padding: "10px"
  tier-head:
    backgroundColor: "{colors.navy-logo}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "18px 20px 22px"
  well:
    backgroundColor: "{colors.surface-well}"
    rounded: "{rounded.well}"
    padding: "10px"
---

# Pedoman Merek: Portal Terpadu D'Ajiks Akademi

Disusun 2026-11-04 dari keputusan Gusti selama 2026-11-02 s.d. 2026-11-04 dan dari nilai yang benar-benar dipakai di prototipe `landing/`. Rincian kronologis tiap keputusan ada di `~/.claude/skills/skd-expert/riset/log-portal-terpadu.md`. Rencana penulisan kode produksi ada di [RENCANA-KODE.md](RENCANA-KODE.md).

Sumber kebenaran tampilan: berkas prototipe `landing/index.html` (beranda) dan `landing/kelas.html` (halaman kelas). Bila pedoman ini dan prototipe berbeda, prototipe yang sudah disetujui Gusti yang benar; perbarui pedoman ini.

## Overview

**Watak:** bimbel kedinasan yang profesional, tenang, dan bisa dipercaya. Kesan mewah datang dari navy pekat logo dan emas yang dipakai hemat, bukan dari hiasan.

**Arah yang dipilih Gusti (berlaku):**
- Navy = warna latar logo utama D'Ajiks, emas = aksen. Logo emblem dan lockup asli, tidak digambar ulang.
- Huruf satu keluarga: Inter Tight (dipilih karena mirip huruf Billdr yang disukai Gusti: bersih).
- Hanya mode terang.
- Latar besar memakai gradasi gaya Keytail: navy di atas, turun ke biru, emas pucat, lalu putih.
- Foto asli D'Ajiks (kelas, jasmani, simulasi CEST) diberi cahaya emas lembut di belakang (gaya Tavus).
- Gerak halus gaya Choroo: gulir licin, kata judul naik berurutan, kartu "berubah bentuk" saat masuk layar.
- Acuan luar hanya diambil logika susunannya (Letters, Hearth, Bailey Hart, Upodes, Fiilo, ClickUp, Choroo, Al Faiz), tidak menyalin merek atau isi.

**Arah yang sudah ditinggalkan:** lintasan lari (2026-11-02), susunan viracun.id + Poppins (diganti), tekstur kertas navy, Lexend + Source Sans 3 dari Design System lama (artifact 8KY25f7QTbo9vFAqALGg4g kini usang untuk portal ini).

## Colors

| Peran | Nilai | Pakai untuk |
|---|---|---|
| Navy logo | `#031739` (rona 218°) | menu setelah digulir, kepala kartu paket, tombol navy, judul, kepala halaman kelas |
| Navy bertingkat | `#062044` `#08254b` `#0f3360` `#0d2e5c` | gradasi dan hover; bukan warna baru |
| Emas | `#e8c766` | tombol utama, kata yang disorot di latar navy, angka aktif, panah dalam lingkaran navy |
| Emas teks | `#9a7416` | kata yang disorot di judul berlatar putih (4,3:1, hanya untuk judul besar) |
| Emas harga | `#7a5710` | harga dan label kecil di latar putih (6,6:1) |
| Emas cahaya | `#d4af4f` / `#c9a24a` | pendar foto, garis fokus papan ketik |
| Teks | `#172a35` utama, `#3d5260` badan, `#526772` keterangan | |
| Garis & permukaan | `#e3e8f0` garis, `#f7f8fb` kaki halaman, `#e8ecf3` wadah bento/mosaik/FAQ | |

Aturan:
- Navy lama `#16224a` (keunguan) DILARANG; semua navy harus serumpun rona logo 218°.
- Emas hanya untuk satu hal penting per area (tombol utama, kata sorot, angka). Jangan jadi warna latar besar.
- Sorotan kata = **warna teks emas**, bukan kotak berlatar emas (keputusan 2026-11-04).
- Gradasi beranda (atas ke bawah): `#031739 0%, #041a3d 10%, #062044 17%, #0c2a52 23%, #1f3d68 29%, #43608a 36%, #7d93b0 43%, #b7c3d2 50%, #e4e2d8 58%, #f6f2e8 68%, #ffffff 82%`. Peralihan ke putih sudah di batas aman: lebih tinggi lagi membuat tulisan putih di sekitar tombol tidak terbaca.
- Panel kelas beranda: `#031739 → #0d2e5c → #2a4a78 → #9fb2ca → #efe3c1 → #f7f1e1`.
- Panel penutup: navy `#062044 → #14365f` dengan bercak biru `rgba(70,104,150)` dan `rgba(120,146,180)` serta sedikit emas.
- Kontras minimal WCAG AA. Judul kolom kaki halaman dan label menu bertingkat sudah `#526772` (2026-11-04). Sisa: catatan kecil di bawah tombol kartu paket masih `#6b7f88` (4,2:1).

## Typography

- Satu keluarga: **Inter Tight** 400/500/600/700. Tidak memakai Cinzel, Poppins, Lexend, atau huruf serif.
- Judul 600 dengan jarak huruf rapat (`-0.035em`, judul halaman kelas `-0.045em`).
- Skala: judul pembuka 64px (HP 38px), judul halaman kelas 72px (HP 44px), judul bagian 46px (HP 32px), kutipan penutup 26–42px mengikuti lebar layar, judul kartu 21–22px, pengantar 18–19px, badan 16–17px, keterangan 13–15px.
- Angka harga dan skor memakai angka sama lebar (`tabular-nums`).
- Judul memakai `text-wrap: balance`, paragraf `text-wrap: pretty`.

## Layout

- Kontainer 1240px, tepi 40px (HP 16px). Batas layar sempit: 900px.
- Urutan beranda: menu kapsul → pembuka (judul + 2 foto) → Fitur unggulan (tab) → Tiga langkah → Pilih kelasmu (panel gradasi + kartu paket) → Belajar tatap muka di Kendari (pola "Browse by Space" Choroo: 7 foto dalam 3 kolom bertingkat, kolom tengah diam saat digulir, nomor emas + judul + keterangan + garis emas) → Testimoni psikotes IPDN (bento) → Testimoni CEST TKBI (bento) → Pengajar (7 orang asli) → FAQ (statis) → Panel penutup (satu kutipan prinsip) → Kaki halaman.
- Halaman kelas (`kelas.html?k=skd|ipdn|polri|tni|cpns&v=penuh|tryout`): jejak "‹ Beranda / Kelas" → kepala navy + siluet subtes → kapsul pilihan kelas + pilihan versi → 3 kartu paket → "Yang kamu pelajari" → foto suasana → kaki halaman.
- Kartu paket: 3 kartu, kartu tengah lebih tinggi dan bercahaya emas (logika Al Faiz). Di HP bertumpuk, lebar maks 440px.
- Pola "wadah": kumpulan kartu (bento testimoni, FAQ) diletakkan dalam wadah abu `#e8ecf3` bersudut 28px dengan celah 10px.

## Elevation & Depth

- Datar dengan bayangan lembut bernada navy, tidak pernah hitam murni: kartu `0 18px 44px -24px rgba(3,23,57,.3)`, kartu paket `0 24px 50px -30px rgba(3,23,57,.55)`.
- **Cahaya emas** (`.glow`) di belakang foto penting dan kartu paket tengah: garis 1,5px emas + pendar `rgba(212,175,79,.45)` dan `.2`.
- Cahaya biru (`.glow-blue`) untuk tangkapan layar aplikasi.
- Menu atas: kapsul tembus pandang (putih 7% + blur 14px) di atas pembuka, berubah navy pekat 90% + bayangan setelah digulir lebih dari 40px.

## Shapes

- Semua tombol, kapsul pilihan, dan menu = kapsul penuh (999px).
- Kartu 20–22px, kepala kartu paket 16px, wadah 28px, panel besar 32px (HP 24px), kotak ikon 16px.
- Tombol berpanah: lingkaran 38–44px di ujung kanan berisi panah ganda (`›`), warnanya kebalikan tombol (tombol emas → lingkaran navy berpanah emas).
- Siluet subtes (TWK gedung + naskah, TIU kubus + jaring-jaring tangga, TKP dua orang + balon percakapan): SVG garis emas `#e8c766` tebal 3 di `landing/assets/siluet/`, dibuat lewat codex. Dipakai pudar di kepala kartu paket dan kepala halaman kelas.
- Ikon garis halaman siswa (`paket.svg`, `nilai.svg`, `bahas.svg`, codex 2026-11-04): gaya sama dengan siluet subtes, tetapi garis tetap 1,75px di ukuran apa pun (`vector-effect:non-scaling-stroke`) supaya jelas saat kecil. Dipakai di kotak navy 46px berbingkai emas tipis (panel kiri halaman Masuk).

## Components

- **Menu atas:** kapsul melayang; tautan; menu "Kelas" bertingkat (kolom Pilih kelas | Pilih versi) dengan satu pengendali; tombol Masuk putih dengan lingkaran navy berpanah emas. Logo tertaut ke beranda.
- **Kartu paket:** kepala navy dengan pendar emas pojok kiri atas (kekuatan 0,26 / 0,55 / 0,4 untuk kartu 1/2/3), label paket kapsul, harga coret + persen potongan, harga putih besar, masa aktif; badan putih dengan daftar centang; tombol emas "Pilih paket ini" + lingkaran panah; catatan cara bayar.
- **Bento testimoni:** 3 kolom (kartu angka skor dengan angka meteran, foto + label D'AJIKS AKADEMI, kolom kutipan bergeser), tinggi tetap 600px.
- **FAQ statis:** kategori di kiri, daftar tanya-jawab di tengah (selalu satu terbuka, tinggi panel dikunci), kartu admin + tombol Daftar di kanan.
- **Kaki halaman gaya Fiilo:** lambang + nama + satu kalimat + tombol WhatsApp; kolom Kelas/Portal/Bantuan; garis pemisah bertanda plus di tepi; hak cipta di tengah.
- **Jejak halaman (halaman kelas):** kapsul "‹ Beranda" + "/" + "Kelas" berwarna emas.

### Gerak

Semua gerak mati bila pengguna mengaktifkan "kurangi gerak" di perangkatnya, dan isi tetap tampil tanpa JavaScript.

| Gerak | Nilai |
|---|---|
| Gulir halus (Lenis 1.3.1, sama dengan Choroo) | `duration 0.9`, easing `1 - (1 - t)^3`, roda/bantalan sentuh saja, layar sentuh tetap bawaan, tautan #bagian ikut halus |
| Tekan tombol | mengecil `scale(.97)` 160ms; kartu paket `scale(.985)` |
| Kurva UI | `cubic-bezier(.23,1,.32,1)`; kurva masuk layar `cubic-bezier(.16,1,.3,1)` |
| Menu bertingkat | pudar 180ms + turun 6px 220ms; tutup 150ms setelah kursor keluar |
| Muncul saat digulir | naik 28px, 0,9 dtk |
| Kartu "berubah bentuk" | dari 94% + turun 48px, 1,1 dtk; foto di dalamnya dari 112%, 1,4 dtk |
| Kata judul naik | dari balik garis, berurutan 45ms per kata, maks 700ms |
| Sentuh kartu paket | beranda: naik 6px + cahaya emas; halaman kelas: kepala navy membesar 5% di dalam bingkai, panah geser 3px |
| Foto (suasana kelas, pengajar, testimoni, halaman kelas) | sama dengan Choroo: membesar 1 ke 1,05 dalam 0,5 dtk (`cubic-bezier(.25,.46,.45,.94)`), kembali dengan kebalikannya (`cubic-bezier(.55,.085,.68,.53)`) |
| Angka meteran | sekali saat masuk layar, 1,2 dtk |
| Kutipan testimoni | geser satu langkah tiap 2,2 dtk, yang tidak disorot 40%; berhenti saat disentuh kursor |
| Foto pembuka | mendekat pelan dari 108%, 18 dtk, sekali |

Usulan gerak dari rekaman Choroo 2026-11-04 (belum disetujui): judul huruf demi huruf, kartu masuk bergiliran, ganti kelas dengan gerak ulang, sorotan latar di tautan kaki halaman.

## Do's and Don'ts

**Lakukan**
- Pakai bukti nyata: foto asli, nama pengajar asli, testimoni dengan izin.
- Tandai data yang belum asli dengan pita "DATA CONTOH" atau "[menyusul]". Jangan mengarang orang, angka, harga, atau nomor.
- Uji setiap perubahan di layar komputer dan layar sempit.
- Ikuti alur usul desain: usul bernomor → satu pertanyaan → contoh satu unit → tangkapan layar → perluas.

**Jangan (ditolak Gusti)**
- Tulisan besar "D'AJIKS" di kaki halaman.
- Bingkai foto khas/gapura/kubah (semua prototipe A–M ditolak). Jangan usulkan bentuk bingkai tanpa acuan dari Gusti.
- Tekstur navy/kertas, awan tie-dye.
- Pita teks berjalan.
- Tombol gradasi ungu.
- Kotak geser kata-kata di panel penutup.
- Huruf Cinzel, Poppins, Big Shoulders.
- Lambang negara, tanda kepangkatan, atau simbol bermuatan sebagai hiasan.
- Janji "dijamin lolos", emoji.
