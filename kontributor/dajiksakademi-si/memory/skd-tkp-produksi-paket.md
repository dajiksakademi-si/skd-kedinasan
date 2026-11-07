---
name: skd-tkp-produksi-paket
description: "Paket 1 + 2 TKP 45/45 tuntas, revisi opsi nilai 4 selesai, engine v1.3.5, validator 0 galat; menunggu kesan pengajar atas Paket 1"
metadata:
  type: project
---
**Status 2026-10-28:** Paket 1 dan Paket 2 TKP tuntas, validator `tmp/validate_soal.js` 0 galat, PDF terbaru di `tmp/pdfs/`. Revisi opsi nilai 4 dikerjakan di kedua paket (Paket 2 disetujui pengajar; Paket 1 menunggu kesan pengajar). Engine TKP v1.3.5.

**Aturan yang masih berlaku:**
- Nilai 4 sama lengkap dengan kunci; beda di inti aspek. Tebak buang-pembatas ≤ 25% per paket.
- Kunci ≤ 5 huruf di atas opsi lain terpanjang, bukan satu-satunya opsi dua baris.
- Jangan pola "Setiap bulan Anda, <jabatan>, …" (validator menolak).
- Alur batch: cek latar → tulis soal → cek_slot + lintas paket → baru pembahasan. Cek buta pakai `tmp/buat_buta.py` + `tmp/banding.py`.

**Rincian:** `riset/2026-10-25-log-produksi-tkp-3paket.md`, `riset/2026-10-28-log-revisi-opsi-tkp.md`. Terkait [[skd-tkp-bocor-bentuk]], [[skd-tkp-jalan-pintas]], [[feedback-wording-soal-mentor]].
