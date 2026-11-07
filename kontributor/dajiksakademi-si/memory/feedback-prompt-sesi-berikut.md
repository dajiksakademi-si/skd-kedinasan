---
name: feedback-prompt-sesi-berikut
description: "Saat percakapan mendekati batas context (~120k), otomatis tulis prompt siap-tempel untuk sesi berikutnya"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 67e884a1-3a0a-4b0b-8093-21793ce6e05f
  modified: 2026-10-25T16:29:51.771Z
---

Begitu percakapan terasa mendekati batas context (aturan global ~120k token; banyak baca file besar / output tool panjang), **tanpa diminta** tulis prompt siap-tempel untuk sesi berikutnya, di titik henti terdekat. Prompt itu ditaruh di blok kode dalam balasan, dan juga disimpan di log kerja yang sedang aktif (mis. `~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md`), lalu Gusti diminta `/compact` atau buka sesi baru.

**Why:** Gusti (2026-10-25) ingin perpindahan sesi tanpa kehilangan arah; checkpoint memory.md saja belum cukup untuk memulai sesi baru.

**Tambahan 2026-10-26 (Gusti: "automatically give the next prompt"):** di akhir SETIAP batch/titik henti yang menyarankan /compact atau sesi baru, prompt lengkap WAJIB ditampilkan di balasan dalam blok kode, bukan cuma "lihat log". Batch 2 TKP sempat melanggar ini (prompt hanya disimpan di log).

**How to apply:** Ikuti gaya prompt Gusti sendiri: skill yang dipakai, daftar "Baca dulu" (file + bagian), tugas yang jelas, dan aturan (satu pertanyaan per respons via AskUserQuestion bertanda Recommended, tanpa commit, cek.py OK, checkpoint ke memory.md). Claude tidak bisa membaca jumlah token pasti, jadi ini perkiraan; Gusti bisa cek dengan /context. Terkait [[skd-lead-instructor-skill]].
