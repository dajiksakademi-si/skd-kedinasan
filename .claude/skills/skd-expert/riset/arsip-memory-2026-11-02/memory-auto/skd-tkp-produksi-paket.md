---
name: skd-tkp-produksi-paket
description: "Produksi 3 paket TKP baru — paket 1 45/45, putusan reviu cek buta DITERAPKAN 2026-10-26, engine v1.3.2, validator 0 error"
metadata:
  node_type: memory
  type: project
  originSessionId: 4d44c661-6529-426f-9fa4-8605671ccf94
  modified: 2026-10-25T23:37:10.295Z
---

Paket 1 TKP (pilot) selesai 45/45 pada 2026-10-26 di `BIG DATA/CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/tmp/paket1.html`. Blueprint ada di `tmp/blueprint_paket1.json`. Hasilnya: validate 0 error, cek_slot 45/45, lintas paket 0 error. Log lengkap, titik lemah, dan prompt sesi berikut ada di `~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md`.

**Why:** pilot ini dipakai untuk menguji engine v1.3.1 sebelum paket 2 dan 3 dibuat.

**How to apply:** cek buta (Sonnet, `tmp/buat_buta.py` + `tmp/banding.py`) selesai 2026-10-26: kunci 45/45 sama, poin 4 beda di 22 soal. Angka 45/45 jangan dibaca sebagai bukti valid; penilai bilang kunci tertebak dari jenis mekanisme ("mekanisme baku / sepakati bersama"). Langkah berikutnya: reviu per item bersama Gusti (`riset/2026-10-26-cek-buta-tkp-paket1.md`). Putusan Gusti: pembuka "Anda" 14× (soal 1–15) ditulis ulang nanti, bersama revisi item. Reviu putusan SELESAI dan DITERAPKAN 2026-10-26 (cadangan `tmp/paket1_pra_reviu.html`; engine v1.3.2 Pilar 4 no. 3a opsi "sepakat" + cek validator; validate 0 error setelah Gusti memutus 5 error). Sebelum mencabut kode J, cek soal itu masih punya ≥1 kode. Versi buta belum diregenerate; pelajaran rancang poin 4: jangan J6 (ulang cara gagal di stem), jangan "lapor atasan" tanpa pemicu J3, jangan satu-kutub. Script buta/banding dipakai ulang untuk paket 2 dan 3. Alur per batch yang terbukti jalan:
1. Ringkas slot blueprint dan cek latar berdekatan, termasuk dua soal AR di latar yang sama.
2. Tulis soal + meta di scratchpad.
3. Jalankan cek_slot dan lintas paket di salinan, sebelum pembahasan ditulis.
4. Tulis pembahasan, lalu sisipkan.

Terkait [[skd-tkp-bocor-bentuk]], [[project-skd-paket-baku]], [[feedback-prompt-sesi-berikut]].

**Koreksi tata bahasa stem (2026-10-26, temuan Gusti di PDF):** "Setiap bulan Anda, pendamping …, merekap" terbaca "bulan milik Anda". Diperbaiki jadi "Sebagai <jabatan>, setiap bulan Anda merekap" di paket 1 no. 6/23/25 + paket 2 no. 12; PDF paket 1 dibuat ulang. Validator `tmp/validate_soal.js` kini error bila keterangan waktu/aspek langsung disusul "Anda, <jabatan>," (aturan B-12 di skill).

- 2026-10-28: masukan pengajar atas PDF Paket 2: kunci masih tertebak karena paling panjang; minta nilai 4 dan 5 sama panjang, pembeda pada isi sikap (4 = konteks cerita saja, 5 = konteks + inti aspek). Prompt persiapan revisi disimpan di riset/2026-10-28-log-revisi-opsi-tkp.md, BELUM dikerjakan.
- 2026-10-28 sesi persiapan: diukur — panjang kata TIDAK bocor (tebak terpanjang P1 13%, P2 15%); bocor = nilai 4 kurang lengkap + kata pembatas (P2 nilai 4: 20 opsi, kunci 3). Usulan aturan + 3 contoh (P2 no 1/14/43) diajukan, menunggu putusan cakupan. Belum ada soal diubah. Skrip tmp/ukur.js, tmp/ciri.js.
- 2026-10-28 Gusti pilih opsi A (Paket 2 dulu, aturan isi 1+2). Kelompok 1–15: 8 nilai 4 direvisi di salinan, validator 0 galat, menunggu persetujuan; PDF banding tmp/pdfs/mockup_wording/Banding_Opsi_P2_01_15.pdf.
- 2026-10-28 REVISI OPSI PAKET 2 TUNTAS: 23 nilai 4 ditulis ulang (sama lengkap dengan kunci, beda di inti aspek), pembatas nilai 4 20→3, tebak buang-pembatas 30%→25%, PDF dibangun ulang (23/52 hlm). Berikut: kesan pengajar, lalu putusan aturan engine + Paket 1.
- 2026-10-28 aturan huruf DISETUJUI: engine v1.3.4 (kunci ≤ 5 huruf di atas opsi lain terpanjang, bukan satu-satunya dua baris), validator + PDF pembahasan tanpa kunci tebal; Paket 2 soal 1/2/14/43 dipadatkan, 0 galat, PDF baru. Paket 1 galat huruf di 5/21/31/44 (belum).
- 2026-10-28 Pengajar SETUJU perbaikan Paket 2. Berikut Paket 1: prompt siap tempel di riset/2026-10-28-log-revisi-opsi-tkp.md ("Prompt sesi berikut — Paket 1"); aturan isi 1–2 belum masuk engine (ditanyakan di awal sesi).
- 2026-10-28 sesi Paket 1: aturan isi 1–2 MASUK engine v1.3.5 Pilar 4 no. 2a + validator (tebak buang-pembatas ≤ 25%, persen bulat). Paket 1 sebelum revisi: 6 galat (huruf 5/21/31/44 + pembatas 26%). Berikut: revisi kelompok 1–15 Paket 1.
- 2026-10-28 REVISI OPSI PAKET 1 TUNTAS: 17 nilai 4 + 4 kunci, diterapkan setelah Gusti setuju tiap kelompok; validator 0 galat; PDF baru (23/51 hlm). Berikut: kesan pengajar atas Paket 1. Cadangan pra-revisi di scratchpad sesi e2c5accb cadangan_pra_opsi_p1/.
