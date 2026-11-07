import fs from 'node:fs';

const file = process.argv[2];
// --versi=1.5 (default): bank 101 · --versi=1.6: paket 30 engine v1.6 (grid 7/6/6/3/2/6, Bahasa 3 paragraf + 3 kaidah)
const versi = (process.argv.find((a) => a.startsWith('--versi=')) || '--versi=1.5').slice(8);
if (!file || !['1.5', '1.6'].includes(versi)) {
  console.error('usage: node tmp/validate_bank_100.mjs <bank.json> [--versi=1.5|1.6] [--only=001-025]');
  process.exit(2);
}
const v16 = versi === '1.6';

// --only=a-b: report item-level errors only for that id range (batch work); bank-level checks skipped
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split('-').map(Number);
const inRange = (q) => !only[0] || (Number(q.id.slice(-3)) >= only[0] && Number(q.id.slice(-3)) <= only[1]);
const bank = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const warnings = [];
const letters = ['A', 'B', 'C', 'D', 'E'];
const required = [
  'id', 'sumber', 'no_urut_sumber', 'no_urut_gabungan', 'tema', 'subtema',
  'tipe_kode', 'tipe_nama', 'kategori_jawaban', 'level_kognitif',
  'konstruk_dua_kutub', 'bentuk_tegangan', 'jangkar_faktual', 'landasan', 'status_kunci',
  'soal', 'opsi', 'kunci', 'pembahasan', 'analisis_opsi',
];
const allowedSources = new Set([
  'UUD1945', 'UU20_2023_ASN', 'PERMENPANRB17_2024', 'UU20_2001_TIPIKOR',
  'PERKPK1_2026', 'KPK_GRATIFIKASI', 'UU27_2022_PDP', 'UU3_2002', 'UU24_2009',
  'PERBPIP2_2022', 'PERBPIP4_2022', 'BPIP_ARSIP_I', 'BPIP_ARSIP_II',
  'ANRI_KONGRES_PEREMPUAN', 'ANRI_PROKLAMASI', 'KEMDIKBUD_SISTEM_AMONG',
  'UU14_2008_KIP', 'PERPRES8_2026', 'EYD_V', 'TBBI_ED4',
]);
if (v16) ['UU30_2014', 'KBBI_DARING', 'UU43_2008', 'UU23_2019', 'KPK_NILAI', 'UU17_2014', 'UU23_2014', 'MK_NK1', 'UU5_2010'].forEach((code) => allowedSources.add(code));
const expectedThemes = v16 ? {
  'Pancasila & ideologi': 7,
  'Nasionalisme & bela negara': 6,
  'Integritas aparatur': 6,
  'Hukum & ketatanegaraan': 3,
  'Radikalisme & ketahanan sosial': 2,
  'Bahasa Indonesia': 6,
} : {
  'Pancasila & ideologi': 30,
  'Nasionalisme & bela negara': 25,
  'Integritas aparatur': 20,
  'Hukum & ketatanegaraan': 12,
  'Radikalisme & ketahanan sosial': 8,
  'Bahasa Indonesia': 6,
};
const expectedLevels = { C3: 20, C4: 51, C5: 30 }; // v1.6 dicek terpisah: C2+C3 6 · C4 15 · C5 9
const expectedKeys = { A: 20, B: 20, C: 20, D: 21, E: 20 }; // 101: soal Bahasa ke-101 kunci D; v1.6: 4-7 per huruf

const countBy = (items, key) => items.reduce((out, item) => {
  const value = item[key];
  out[value] = (out[value] || 0) + 1;
  return out;
}, {});
const words = (text) => text.trim().split(/\s+/u).filter(Boolean).length;
const normalized = (text) => text.toLocaleLowerCase('id-ID')
  .normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const sentenceCount = (text) => (text.match(/[.!?](?=\s|$)/g) || []).length;
const sameCounts = (actual, expected) => Object.keys(expected)
  .every((key) => actual[key] === expected[key])
  && Object.keys(actual).every((key) => Object.hasOwn(expected, key));

if (!bank.meta || !Array.isArray(bank.soal)) errors.push('root must contain meta and soal[]');
const items = Array.isArray(bank.soal) ? bank.soal : [];
// v1.5: bank 101 (soal Bahasa ke-101 untuk 3 paket × 2 Bahasa) · v1.6: paket 30
const expectedTotal = v16 ? 30 : 101;
if (bank.meta?.jumlah_soal !== expectedTotal) errors.push(`meta.jumlah_soal must equal ${expectedTotal}`);
if (items.length !== expectedTotal) errors.push(`soal.length=${items.length}, expected ${expectedTotal}`);

const ids = new Set();
const stems = new Set();
let factual = 0;
for (const [index, q] of items.entries()) {
  const n = index + 1;
  const label = q.id || `index-${n}`;
  // v1.6: soal Bahasa punya anatomi sendiri (tanpa wajib dua kutub); rumpun paragraf | kaidah
  const bahasa16 = v16 && q.tema === 'Bahasa Indonesia';
  const kaidah = bahasa16 && q.rumpun === 'kaidah';
  if (bahasa16 && !['paragraf', 'kaidah'].includes(q.rumpun)) errors.push(`${label}: rumpun must be paragraf or kaidah`);
  for (const field of required) {
    if (bahasa16 && ['konstruk_dua_kutub', 'bentuk_tegangan'].includes(field)) continue;
    if (!(field in q)) errors.push(`${label}: missing ${field}`);
  }
  if (v16) {
    if (!/^DAJ-TWK-\d{3}$/.test(q.id || '')) errors.push(`${label}: invalid id`);
  } else {
    if (q.id !== `DAJ-TWK-${String(n).padStart(3, '0')}`) errors.push(`${label}: unexpected sequential id`);
    if (q.no_urut_sumber !== n || q.no_urut_gabungan !== n) errors.push(`${label}: numbering mismatch`);
  }
  if (ids.has(q.id)) errors.push(`${label}: duplicate id`);
  ids.add(q.id);
  const stemKey = normalized(q.soal || '');
  if (stems.has(stemKey)) errors.push(`${label}: duplicate normalized stem`);
  stems.add(stemKey);
  const sc = sentenceCount(q.soal || '');
  if (!bahasa16 && (sc < 3 || sc > 4)) errors.push(`${label}: stem must contain 3-4 terminal sentences (${sc})`);
  // v1.5: two poles stay mandatory, wording varies T1-T5; v1.6 adds T6 (dua sebab di kasus)
  if (!(bahasa16 && !q.bentuk_tegangan) && !/^T[1-6]$/.test(q.bentuk_tegangan || '')) errors.push(`${label}: bentuk_tegangan must be T1-T6`);
  if (!['ALASAN', 'WUJUD', 'SIKAP', 'RELASI', 'DEFINISI', 'AKIBAT'].includes(q.kategori_jawaban)) {
    errors.push(`${label}: invalid kategori_jawaban`);
  }
  if (!['C2', 'C3', 'C4', 'C5'].includes(q.level_kognitif)) errors.push(`${label}: invalid level`);
  if (!/^[E][1-8]$/.test(q.tipe_kode || '')) errors.push(`${label}: invalid engine code`);
  if (!bahasa16 && !q.konstruk_dua_kutub?.includes('↔')) errors.push(`${label}: konstruk must contain ↔`);
  if (q.status_kunci !== 'kuat') errors.push(`${label}: status_kunci must be kuat`);
  if (typeof q.jangkar_faktual !== 'boolean') errors.push(`${label}: jangkar_faktual must be boolean`);
  if (q.jangkar_faktual) factual += 1;
  if (q.kategori_jawaban === 'RELASI' && /dalam bentuk/iu.test(q.soal || '')) errors.push(`${label}: RELASI must not use "dalam bentuk"`);
  const connector = /\b(sambil|sekaligus|serta|dengan tetap|sedangkan|lalu)\b/iu;
  const withConnector = letters.filter((letter) => connector.test(q.opsi?.[letter] || ''));
  if (withConnector.length === 1 && withConnector[0] === q.kunci) errors.push(`${label}: key is the only option with a two-sided connector`);
  // Gerbang 1 hint: long content words shared by key and stem
  const stemWords = new Set(normalized(q.soal || '').split(' ').filter((w) => w.length > 5));
  const shared = normalized(q.opsi?.[q.kunci] || '').split(' ').filter((w) => stemWords.has(w));
  if (shared.length) warnings.push(`${label}: key shares stem words: ${shared.join(', ')}`);
  if (!Array.isArray(q.landasan) || q.landasan.length < 1) errors.push(`${label}: landasan must be nonempty`);
  for (const src of q.landasan || []) {
    if (!allowedSources.has(src.kode)) errors.push(`${label}: unknown source code ${src.kode}`);
    if (!src.rujukan?.trim()) errors.push(`${label}: empty source reference`);
  }
  if (!letters.includes(q.kunci)) errors.push(`${label}: invalid key`);
  if (JSON.stringify(Object.keys(q.opsi || {}).sort()) !== JSON.stringify(letters)) errors.push(`${label}: opsi must be A-E`);
  if (JSON.stringify(Object.keys(q.analisis_opsi || {}).sort()) !== JSON.stringify(letters)) errors.push(`${label}: analisis_opsi must be A-E`);
  // v1.6 Pilar 4 no 4: opsi soal kaidah boleh nomor kalimat/kata/kalimat contoh
  const lengths = letters.map((letter) => words(q.opsi?.[letter] || ''));
  if (!kaidah) {
    if (lengths.some((length) => length < 8 || length > 14)) errors.push(`${label}: option word counts ${lengths.join(',')} outside 8-14`);
    if (Math.max(...lengths) - Math.min(...lengths) > 4) errors.push(`${label}: option word-count spread >4 (${lengths.join(',')})`);
    const keyLength = lengths[letters.indexOf(q.kunci)];
    if (keyLength === Math.max(...lengths) && lengths.filter((x) => x === keyLength).length === 1) {
      errors.push(`${label}: key is uniquely longest (${lengths.join(',')})`);
    }
  }
  const optionValues = letters.map((letter) => normalized(q.opsi?.[letter] || ''));
  if (q.tipe_kode !== 'E8' && new Set(optionValues).size !== 5) errors.push(`${label}: duplicate option text`);
  for (const letter of letters) {
    const text = q.opsi?.[letter] || '';
    if (/\b(selalu|semua|tidak pernah|mutlak|satu-satunya|seluruhnya)\b/iu.test(text)) {
      errors.push(`${label}${letter}: forbidden absolute word`);
    }
    const analysis = q.analisis_opsi?.[letter] || '';
    if (letter === q.kunci && !/KUNCI/iu.test(analysis)) errors.push(`${label}${letter}: key analysis lacks KUNCI`);
    if (letter !== q.kunci && !/\bD(?:10|[1-9])\b/u.test(analysis)) errors.push(`${label}${letter}: distractor analysis lacks D1-D10`);
  }
  if ((q.pembahasan || '').length < 450) errors.push(`${label}: pembahasan too short`);
  // 2026-10-25: pembahasan siswa bebas istilah penyusun soal; kode D/T/level tetap di analisis_opsi
  const jargon = [
    ...((q.pembahasan || '').match(/\bD(?:10|[1-9])\b|\bT[1-6]\b|\bC[2-5]\b|\bL[1-3]\b|\b(?:ALASAN|WUJUD|SIKAP|RELASI|DEFINISI|AKIBAT)\b/gu) || []),
    ...((q.pembahasan || '').match(/\bstem\b|\bkutub\b|\bkonstruk|distraktor|cocok-kata|salah kategori|(?:konsep|nilai|semboyan) tetangga/giu) || []),
  ];
  if (jargon.length) errors.push(`${label}: pembahasan uses item-writer jargon: ${[...new Set(jargon)].join(', ')}`);
  if (!letters.every((letter) => new RegExp(`\\b${letter}\\b`, 'u').test(q.pembahasan || ''))) {
    errors.push(`${label}: pembahasan must discuss A-E`);
  }
}

const themeCounts = countBy(items, 'tema');
const levelCounts = countBy(items, 'level_kognitif');
const keyCounts = countBy(items, 'kunci');
if (!sameCounts(themeCounts, expectedThemes)) errors.push(`theme distribution mismatch: ${JSON.stringify(themeCounts)}`);
if (v16) {
  // Pilar 6 peta paket 30 + Gerbang 4 v1.6
  const easy = (levelCounts.C2 || 0) + (levelCounts.C3 || 0);
  if (easy !== 6 || levelCounts.C4 !== 15 || levelCounts.C5 !== 9) errors.push(`level distribution mismatch (C2-C3 6 / C4 15 / C5 9): ${JSON.stringify(levelCounts)}`);
  if (!letters.every((l) => (keyCounts[l] || 0) >= 4 && (keyCounts[l] || 0) <= 7)) errors.push(`key distribution outside 4-7 per letter: ${JSON.stringify(keyCounts)}`);
  if (factual < 9) errors.push(`factual anchors=${factual}, expected >=9`);
  const rumpun = countBy(items.filter((q) => q.tema === 'Bahasa Indonesia'), 'rumpun');
  if (rumpun.paragraf !== 3 || rumpun.kaidah !== 3) errors.push(`Bahasa must be 3 paragraf + 3 kaidah: ${JSON.stringify(rumpun)}`);
  const e7 = items.filter((q) => q.tipe_kode === 'E7').length;
  if (e7 > 2) errors.push(`E7 pernyataan bernomor in ${e7} items, max 2`);
  const opener = items.filter((q) => /di tengah perkembangan/iu.test(q.soal || '')).length;
  if (opener > 2) errors.push(`"Di tengah perkembangan" in ${opener} stems, max 2`);
  const keyTexts = countBy(items.map((q) => ({ k: normalized(q.opsi?.[q.kunci] || '') })), 'k');
  for (const [text, n] of Object.entries(keyTexts)) if (n > 1) errors.push(`same key text in ${n} items: ${text}`);
} else {
  if (!sameCounts(levelCounts, expectedLevels)) errors.push(`level distribution mismatch: ${JSON.stringify(levelCounts)}`);
  if (!sameCounts(keyCounts, expectedKeys)) errors.push(`key distribution mismatch: ${JSON.stringify(keyCounts)}`);
  if (factual < 30) errors.push(`factual anchors=${factual}, expected >=30`);
}

for (let i = 0; i < items.length; i += 1) {
  const a = new Set(normalized(items[i].soal || '').split(' ').filter((w) => w.length > 4));
  for (let j = i + 1; j < items.length; j += 1) {
    const b = new Set(normalized(items[j].soal || '').split(' ').filter((w) => w.length > 4));
    const intersection = [...a].filter((word) => b.has(word)).length;
    const union = new Set([...a, ...b]).size || 1;
    const score = intersection / union;
    if (score >= 0.72) warnings.push(`${items[i].id}/${items[j].id}: stem Jaccard=${score.toFixed(2)}`);
  }
}

// v1.5: L2 frame variety (bank-level)
const tidakHanya = items.filter((q) => /tidak hanya/iu.test(q.soal || '') && /tetapi juga/iu.test(q.soal || '')).length;
if (tidakHanya > items.length * 0.2) errors.push(`"tidak hanya … tetapi juga" in ${tidakHanya}/${items.length} stems, max 20%`);
const formCounts = countBy(items.filter((q) => q.bentuk_tegangan), 'bentuk_tegangan');
for (const [form, n] of Object.entries(formCounts)) {
  if (n > items.length * 0.3) errors.push(`bentuk_tegangan ${form} in ${n}/${items.length} stems, max 30%`);
}

if (only[0]) {
  const keep = (m) => { const id = (m.match(/DAJ-TWK-(\d{3})/) || [])[1]; return id && Number(id) >= only[0] && Number(id) <= only[1]; };
  errors.splice(0, errors.length, ...errors.filter(keep));
  warnings.splice(0, warnings.length, ...warnings.filter(keep));
}
console.log(JSON.stringify({
  file,
  versi,
  item_count: items.length,
  themes: themeCounts,
  levels: levelCounts,
  keys: keyCounts,
  factual_anchors: factual,
  bentuk_tegangan: formCounts,
  tidak_hanya: tidakHanya,
  warnings,
  errors,
}, null, 2));
if (errors.length) process.exit(1);
