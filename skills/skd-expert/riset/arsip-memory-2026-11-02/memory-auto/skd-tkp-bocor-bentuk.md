---
name: skd-tkp-bocor-bentuk
description: "Bank TKP 80 bocor bentuk 81% (kunci = terpanjang ke-2, pola \"lalu\"); usulan A–K sudah DIPUTUSKAN Gusti 2026-10-25, engine belum diubah"
metadata:
  node_type: memory
  type: project
  originSessionId: 885be164-8a9f-487a-8762-9f4220f72e7b
  modified: 2026-10-25T09:49:43.176Z
---

Riset 2026-10-25 (`~/.claude/skills/skd-expert/riset/2026-10-25-tkp-vs-kepribadian.md`): bank TKP 80 bisa ditebak 65/80 tanpa membaca isi (buang terpanjang + verba pasif, pilih opsi dua-langkah). Kunci = opsi terpanjang ke-2 di 64/80.

**Why:** aturan engine "kunci strictly lebih pendek dari distraktor terpanjang" + kebiasaan menulis poin 4 lebih panjang memindahkan sinyal panjang, bukan menghapusnya. "lalu" tidak ada di daftar kata sambung validator.

**How to apply:** saat generate/audit TKP, ukur sebaran peringkat panjang kunci dan pola dua-langkah per paket, bukan hanya strictly-shorter. Jangan pakai tangga SJT psi-expert (menunda = 3) untuk poin TKP. Usulan A–K + L–W sudah diputuskan (memory.md root "lanjutan 8"; strictly-shorter DIHAPUS, diganti target tebakan ≤30% + sebaran panjang per paket). Diterapkan 2026-10-25: engine TKP v1.3 + validate_soal.js v1.3 (bank 80 kini 255 error, Batch 2 39 error — sengaja belum diperbaiki, audit menunggu perintah). Rencana diff: `~/.claude/skills/skd-expert/riset/2026-10-25-rencana-diff-tkp-v1.3.md`. Validator TKP yang hidup = `tmp/validate_soal.js` (HTML); `tmp/validate_tkp_json.js` usang (skema bank 50, 736 error ke JSON bank 80) — jangan pasang cek baru di sana. Terkait [[skd-lead-instructor-skill]], [[project-skd-paket-baku]].
