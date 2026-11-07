// JSON mechanical gate for the 50-item TKP learning bank.
// usage: node tmp/validate_tkp_json.js <bank.json>
'use strict';

const fs = require('fs');
const file = process.argv[2];
if (!file) throw new Error('usage: node tmp/validate_tkp_json.js <bank.json>');

const bank = JSON.parse(fs.readFileSync(file, 'utf8'));
const letters = ['A', 'B', 'C', 'D', 'E'];
const dims = ['Profesionalisme', 'Pelayanan Publik', 'Jejaring Kerja', 'Sosial Budaya', 'TIK', 'Anti Radikalisme'];
const expectedDims = { Profesionalisme: 10, 'Pelayanan Publik': 10, 'Jejaring Kerja': 8, 'Sosial Budaya': 8, TIK: 7, 'Anti Radikalisme': 7 };
// v1.2: Rendah-Sedang dihapus dari engine (ENGINE_GENERATE_SOAL_TKP.md Pilar 6) — cuma
// Tinggi/Sangat Tinggi yang valid. Band, bukan angka pas: 55-65% Tinggi / 35-45% Sangat
// Tinggi dari total soal (lihat band() di bawah), sesuai persis rentang yang didokumentasikan.
const validLevels = ['Tinggi', 'Sangat Tinggi'];
const levelBand = { Tinggi: [0.55, 0.65], 'Sangat Tinggi': [0.35, 0.45] };
const errors = [];
const warnings = [];
const review = [];
const count = (xs) => xs.reduce((out, x) => ((out[x] = (out[x] || 0) + 1), out), {});
const words = (text) => String(text).trim().split(/\s+/u).filter(Boolean).length;
const norm = (text) => String(text).toLocaleLowerCase('id-ID').normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const sameCounts = (actual, expected, label) => {
  for (const [key, value] of Object.entries(expected)) if ((actual[key] || 0) !== value) errors.push(`${label} ${key}=${actual[key] || 0}, expected ${value}`);
};

if (!bank.meta || !Array.isArray(bank.soal)) errors.push('root must contain meta and soal[]');
const items = Array.isArray(bank.soal) ? bank.soal : [];
if (items.length !== 50) errors.push(`item_count=${items.length}, expected 50`);

const ids = new Set();
const stems = new Set();
const konstrukKeys = new Set();
let missingKonstruk = 0;
const closingCounts = {};
const pairCounts = {};
const axisRoles = { poin_3: {}, poin_4: {} };
for (const [index, item] of items.entries()) {
  const label = `Soal ${index + 1}`;
  if (!item.id || ids.has(item.id)) errors.push(`${label}: id missing/duplicate`);
  ids.add(item.id);
  if (!dims.includes(item.dimensi)) errors.push(`${label}: invalid dimensi`);
  if (!validLevels.includes(item.level)) errors.push(`${label}: invalid level (Rendah-Sedang dihapus di v1.2, cuma Tinggi/Sangat Tinggi)`);
  if (!item.soal || !item.soal.endsWith(`(${item.dimensi})`)) errors.push(`${label}: stem must end with dimension tag`);
  const stem = norm(item.soal);
  if (stems.has(stem)) errors.push(`${label}: duplicate normalized stem`);
  stems.add(stem);
  if (!item.penutup) errors.push(`${label}: missing penutup`);
  // Gerbang 4 — tidak boleh ada dua soal dengan konstruk + kunci yang sama.
  if (item.konstruk) {
    if (!/\bvs\b/i.test(item.konstruk)) errors.push(`${label}: konstruk harus menyebut dua kutub ("... vs ...")`);
    const konstrukKey = `${norm(item.konstruk)}|${item.kunci}`;
    if (konstrukKeys.has(konstrukKey)) errors.push(`${label}: konstruk + kunci identik dengan soal sebelumnya (Gerbang 4)`);
    konstrukKeys.add(konstrukKey);
  } else missingKonstruk += 1;
  closingCounts[item.penutup] = (closingCounts[item.penutup] || 0) + 1;

  const opts = item.opsi || {};
  if (Object.keys(opts).sort().join('') !== 'ABCDE') errors.push(`${label}: opsi must be exactly A-E`);
  const lengths = letters.map((letter) => words(opts[letter]));
  for (const [i, length] of lengths.entries()) if (length < 10 || length > 20) errors.push(`${label}${letters[i]}: ${length} words, expected 10-20`);
  if (Math.max(...lengths) - Math.min(...lengths) > 6) errors.push(`${label}: option word-count spread exceeds 6 (${lengths.join(',')})`);
  if (!letters.includes(item.kunci)) errors.push(`${label}: invalid kunci`);
  const keyIndex = letters.indexOf(item.kunci);
  if (keyIndex >= 0 && lengths[keyIndex] >= Math.max(...lengths.filter((_, i) => i !== keyIndex))) errors.push(`${label}: kunci must be strictly shorter than a distractor (${lengths.join(',')})`);
  for (const [i, letter] of letters.entries()) if (!/^(Me|Ber)/i.test(String(opts[letter]).trim())) errors.push(`${label}${letter}: must begin with active verb Me-/Ber-`);

  const points = item.poin || {};
  const values = letters.map((letter) => points[letter] && points[letter].nilai).sort((a, b) => a - b);
  if (JSON.stringify(values) !== JSON.stringify([1, 2, 3, 4, 5])) errors.push(`${label}: poin must be 1-5 exactly once`);
  const p3 = letters.find((letter) => points[letter] && points[letter].nilai === 3);
  const p4 = letters.find((letter) => points[letter] && points[letter].nilai === 4);
  const p5 = letters.find((letter) => points[letter] && points[letter].nilai === 5);
  if (p5 !== item.kunci) errors.push(`${label}: poin 5 must be kunci`);
  // Gerbang 3 (bagian yang bisa dimekanisasi): larang bahasa kabur, dan pastikan tiap
  // pembelaan beneran bersinggungan sama diksi opsi yang dijatuhkannya (bukan simpulan umum).
  // Ini MENYEMPITKAN bottleneck, bukan menutupnya — kebenaran argumennya tetap butuh baca
  // manual (lihat [[tkp-script-flags-need-adjudication]] di memory Claude untuk kalibrasi).
  const vaguePhrase = /\b(kurang lengkap|kurang proaktif|belum tentu|tidak cukup lengkap|kurang optimal|kurang maksimal)\b/i;
  for (const [pointLetter, role] of [[p3, 'poin_3'], [p4, 'poin_4']]) {
    const point = points[pointLetter] || {};
    if (!/^S[1-5]$/.test(point.sumbu || '')) errors.push(`${label}: ${role} missing S1-S5`);
    if (!point.alasan || !point.alasan.includes(point.sumbu || '')) errors.push(`${label}: ${role} needs specific alasan containing its sumbu`);
    if (point.alasan && vaguePhrase.test(point.alasan)) errors.push(`${label}: ${role} alasan uses vague hand-wave ("${point.alasan.match(vaguePhrase)[0]}") instead of a specific sumbu+frasa — Gerbang 3`);
    axisRoles[role][point.sumbu] = (axisRoles[role][point.sumbu] || 0) + 1;
  }
  if (p3 && p4 && points[p3].sumbu === points[p4].sumbu) errors.push(`${label}: poin 3 and 4 use same sumbu`);
  if (!letters.some((letter) => /^J[1-4]$/.test((points[letter] || {}).jebakan || ''))) errors.push(`${label}: needs at least one J1-J4 jebakan`);
  if (!item.pembahasan || !item.pembahasan.kunci_vs_poin_4 || !item.pembahasan.kunci_vs_poin_3) {
    errors.push(`${label}: missing Gerbang 3 comparisons`);
  } else {
    for (const [role, letter] of [['kunci_vs_poin_4', p4], ['kunci_vs_poin_3', p3]]) {
      const text = item.pembahasan[role];
      if (vaguePhrase.test(text)) errors.push(`${label}: pembahasan.${role} uses vague hand-wave ("${text.match(vaguePhrase)[0]}") — Gerbang 3`);
      if (letter && opts[letter]) {
        const optWords = new Set(norm(opts[letter]).split(' ').filter((w) => w.length > 4));
        const textWords = norm(text).split(' ').filter((w) => w.length > 4);
        if (!textWords.some((w) => optWords.has(w))) review.push(`${label}: pembahasan.${role} shares no distinctive word with opsi ${letter}'s own text — check it actually engages that option, not a generic dismissal`);
      }
    }
  }

  // Pilar 4 no.3 — kunci dilarang jadi satu-satunya opsi berpola gabungan "A sambil/sekaligus B".
  const comboLetters = letters.filter((letter) => /\b(sambil|sekaligus|serta|disertai)\b/i.test(String(opts[letter])));
  if (comboLetters.includes(item.kunci) && comboLetters.length < 2) errors.push(`${label}: kunci satu-satunya opsi berpola gabungan (${comboLetters.join(',')}) — Pilar 4 no.3`);

  // Pilar 4 no.11 — kunci dilarang sandar ke sumber daya/unit yang tidak disebut stem.
  // Heuristik: kalau kunci MEMBENTUK entitasnya sendiri itu sah; kalau kunci MERUTEKAN ke
  // entitas yang kata intinya tidak ada di stem, itu pola "muncul dari udara" (batch 2 Soal 1).
  const normStem = norm(item.soal);
  const kunciText = String(opts[item.kunci] || '');
  const heads = /\b(tim|unit|bagian|bidang|divisi|seksi|satuan|panitia|pokja|posko|sekretariat|petugas|staf|operator|konsultan|vendor|fasilitator|mediator|pendamping|penyelia|bendahara|inspektorat|humas|kasir|arsiparis)\b(\s+[A-Za-z]+)?/gi;
  const stopword = /^(sebelum|sesudah|setelah|agar|supaya|kepada|dari|yang|untuk|dan|atau|pada|dengan|itu|tersebut|ini|di|ke|sesuai|sampai|lalu|kemudian|secara|tanpa|bila|jika|karena|saat|serta|sambil|sekaligus|dalam|atas|antara|melalui|akan|bisa|dapat|harus)$/i;
  for (const match of kunciText.matchAll(heads)) {
    const head = norm(match[1]);
    const tail = (match[2] || '').trim();
    const isVerbTail = /^(me|ber|di|ter)[a-z]{3,}/i.test(tail);
    const phrase = tail && !stopword.test(tail) && !isVerbTail ? `${match[1]} ${tail}` : match[1];
    const before = kunciText.slice(Math.max(0, match.index - 40), match.index);
    if (/\b(membentuk|menyusun|membuat|mengadakan|menyiapkan|merancang|pembentukan)\b/i.test(before)) continue;
    if (!new RegExp(`\\b${head}\\b`).test(normStem)) {
      errors.push(`${label}: kunci merutekan ke "${phrase}" tapi "${head}" tidak disebut di stem — Pilar 4 no.11 (sumber daya tak disebut)`);
    } else {
      review.push(`${label}: kunci melibatkan "${phrase}" (ada di stem) — verifikasi manual apakah level kewenangannya memang tepat menangani masalah ini (Pilar 4 no.11 arah kedua)`);
    }
  }
  if (p3 && p4) {
    const pair = [points[p3].sumbu, points[p4].sumbu].sort().join('-');
    pairCounts[pair] = (pairCounts[pair] || 0) + 1;
  }
}

if (missingKonstruk) warnings.push(`${missingKonstruk} soal tanpa field "konstruk" — cek duplikat konstruk dilewati padahal format engine mewajibkan KONSTRUK.`);

// Gerbang 4 — deteksi reskin: stem beda kata tapi kerangka kasusnya itu-itu juga.
const bags = items.map((x) => new Set(norm(x.soal).split(' ').filter((w) => w.length > 4)));
for (let i = 0; i < bags.length; i += 1) {
  for (let j = i + 1; j < bags.length; j += 1) {
    const intersection = [...bags[i]].filter((w) => bags[j].has(w)).length;
    const union = new Set([...bags[i], ...bags[j]]).size || 1;
    const score = intersection / union;
    if (score >= 0.72) errors.push(`Soal ${i + 1}/${j + 1}: stem nyaris identik (Jaccard ${score.toFixed(2)}) — indikasi reskin`);
    else if (score >= 0.55) review.push(`Soal ${i + 1}/${j + 1}: stem mirip (Jaccard ${score.toFixed(2)}) — pastikan konteksnya beda, bukan reskin`);
  }
}

for (const [closing, n] of Object.entries(closingCounts)) if (n > 2) errors.push(`penutup "${closing}" used ${n}x, max 2`);
sameCounts(count(items.map((x) => x.dimensi)), expectedDims, 'dimensi');

// Kurva kesulitan: BAND sesuai Pilar 6 (55-65% Tinggi / 35-45% Sangat Tinggi), bukan angka
// pas — total soal jadi penyebutnya, bukan hardcode 50, supaya skrip ini tetap benar kalau
// ukuran paket berubah.
const levelCounts = count(items.map((x) => x.level));
const total = items.length || 1;
for (const [level, [lo, hi]] of Object.entries(levelBand)) {
  const n = levelCounts[level] || 0;
  const pct = n / total;
  if (pct < lo || pct > hi) errors.push(`level ${level}=${n}/${total} (${(pct * 100).toFixed(0)}%), expected ${(lo * 100).toFixed(0)}-${(hi * 100).toFixed(0)}% (Pilar 6)`);
}

// Distribusi kunci A-E: Pilar 6 bilang ini "heuristik desain, bukan proporsi resmi —
// sesuaikan bila user beri kisi lain". JANGAN jadikan angka pas (mis. "harus tepat 10/huruf")
// jadi hard error — itu bisa maksa penulis soal korbanin kualitas konstruksi cuma buat kejar
// kuota yang sebenarnya gak wajib. Cuma flag kalau distribusinya jomplang parah (indikasi pola
// tebakan nyata: satu huruf nyaris gak pernah dipakai, atau dominan berlebihan).
const kunciCounts = count(items.map((x) => x.kunci));
for (const letter of letters) {
  const n = kunciCounts[letter] || 0;
  const pct = n / total;
  if (pct < 0.10 || pct > 0.30) review.push(`kunci ${letter}=${n}/${total} (${(pct * 100).toFixed(0)}%) — di luar rentang wajar ~13-27% ala Pilar 6, cek manual (bukan hard error, jangan dipaksa pas)`);
}

// Sebaran sumbu presisi per peran (poin_3/poin_4) dan pasangan sumbu: ENGINE_GENERATE_SOAL_TKP.md
// TIDAK menetapkan target angka untuk ini sama sekali (beda dari kurva kesulitan & distribusi
// kunci yang memang didokumentasikan). Dulu skrip ini maksa "tepat 10 tiap sumbu" dan "tepat 5
// tiap pasangan" — itu target buatan skrip sendiri, bukan aturan engine. Diturunkan jadi laporan
// info doang (sudah ada di field "sumbu"/"pairs" pada output JSON) supaya gak nolak batch yang
// sebenarnya sah, atau maksa penulis soal pilih sumbu yang gak natural demi kuota palsu.
warnings.push('Sebaran sumbu presisi (per-peran & per-pasangan) TIDAK divalidasi sebagai target angka — itu bukan aturan di ENGINE_GENERATE_SOAL_TKP.md. Field "sumbu" dan "pairs" di output ini cuma info buat eyeball kewajaran, bukan pass/fail.');
warnings.push('Tone/valence, real-world authority, and reversal defensibility remain manual gates.');
warnings.push('Pilar 4 no.11 dicek pakai heuristik kata-inti unit/sumber daya — bisa meleset di frasa tak lazim; daftar "review" wajib dibaca manual, bukan dianggap lolos.');
warnings.push('Gerbang 3: skrip ini cuma cek bahasa kabur + cakupan per-huruf + overlap kata dengan opsi — KEBENARAN argumennya (apa sumbu itu beneran valid buat opsi itu) tetap harus dibaca manual, bukan diasumsikan lolos dari 0 errors.');
console.log(JSON.stringify({ file, item_count: items.length, dimensi: count(items.map((x) => x.dimensi)), level: count(items.map((x) => x.level)), kunci: count(items.map((x) => x.kunci)), sumbu: axisRoles, pairs: pairCounts, review, warnings, errors }, null, 2));
if (errors.length) process.exit(1);
