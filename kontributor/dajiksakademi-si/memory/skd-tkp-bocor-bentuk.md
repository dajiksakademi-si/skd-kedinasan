---
name: skd-tkp-bocor-bentuk
description: "Bank TKP 80 lama tertebak 81% dari bentuk; engine + validator v1.3 diterapkan; bank 80 masih ±252 galat struktur (sengaja belum diperbaiki)"
metadata:
  type: project
---
Riset `riset/2026-10-25-tkp-vs-kepribadian.md`: bank TKP 80 bisa ditebak 65/80 tanpa membaca isi. Usulan A–K + L–W diputuskan Gusti 2026-10-25; aturan "kunci strictly lebih pendek" DIHAPUS, diganti target tebakan ≤ 30% + sebaran panjang per paket.

**How to apply:** saat generate/audit TKP, ukur sebaran peringkat panjang kunci dan pola dua langkah per paket. Jangan pakai tangga SJT psi-expert (menunda = 3). Validator yang hidup = `tmp/validate_soal.js`; `tmp/validate_tkp_json.js` usang, jangan dipasangi cek baru. Bank 80 lama sengaja belum diperbaiki; audit menunggu perintah. Terkait [[skd-tkp-produksi-paket]].
