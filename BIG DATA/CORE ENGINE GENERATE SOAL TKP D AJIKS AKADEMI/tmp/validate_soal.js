// Verifikasi mekanis output HTML ENGINE_GENERATE_SOAL_TKP.md — cek yang wajib
// dijalankan skrip, bukan diperkirakan manual (lihat memory tkp-verify-dont-estimate).
// usage: node tmp/validate_soal.js <bank.html>
'use strict';
const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('usage: node tmp/validate_soal.js <bank.html>');
  process.exit(2);
}
const html = fs.readFileSync(file, 'utf8');
const letters = ['A', 'B', 'C', 'D', 'E'];
const errors = [];
const warnings = [];

const allowedDims = new Map([
  ['Profesionalisme', 'Profesionalisme'],
  ['PelayananPublik', 'Pelayanan Publik'],
  ['JejaringKerja', 'Jejaring Kerja'],
  ['SosialBudaya', 'Sosial Budaya'],
  ['TIK', 'TIK'],
  ['AntiRadikalisme', 'Anti Radikalisme'],
]);
// v1.2: Rendah-Sedang dihapus dari engine (ENGINE_GENERATE_SOAL_TKP.md Pilar 6) — semua soal
// wajib Tinggi atau Sangat Tinggi, nol pengecualian.
const allowedLevels = ['Tinggi', 'Sangat Tinggi'];
const closingPhrases = [
  'sikap anda adalah',
  'apa yang anda lakukan',
  'langkah paling tepat adalah',
  'apa tindakan paling tepat',
  'tindakan paling tepat adalah',
  'respons paling tepat adalah',
  'langkah pertama yang anda ambil adalah',
  'apa respons anda',
];

const decode = (s) => (s || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&hellip;/g, '...').replace(/&middot;/g, '·')
  .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();
const words = (text) => text.split(/\s+/u).filter(Boolean).length;
// v1.3.2 Pilar 4 no.3a (status uji): opsi berbunyi "sepakat/bersama [pihak]". Heuristik kata;
// "milik/jadwal bersama" dan "bersama kartunya" bukan pola ini.
const sepakatRe = /\b(menyepakati|disepakati|kesepakatan|merumuskan|mengajak)\b|(?<!\b(milik|jadwal) )\bbersama (?!kartu)\w/;
const normalized = (text) => text.toLocaleLowerCase('id-ID')
  .normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const field = (block, label) => {
  const m = block.match(new RegExp(`<span class="label">${label}</span>([\\s\\S]*?)</div>`));
  return m ? decode(m[1]) : null;
};
// v1.3: pola gabungan dua-langkah (Pilar 4 no.3)
const comboRe = /\b(sambil|sekaligus|serta|disertai|lalu|kemudian|setelah itu)\b|\bdan\s+me[a-z]/i;
// v1.3.5 Pilar 4 no.2a: kata pembatas yang mengumumkan kekurangan opsi (sama dengan tmp/revisi_opsi/pembatas.js)
const pembatasRe = /\b(tanpa|cukup|saja|hanya|dulu|nanti|belum|usai|sendiri|bulan depan|toh|biar|siapa tahu)\b/i;
// v1.3: istilah dapur di pembahasan siswa (regex TWK validate_bank_100.mjs + kode TKP)
const dapurRe = /\bstem\b|\bkutub\b|\bkonstruk|distraktor|cocok-kata|salah kategori|(?:konsep|nilai|semboyan) tetangga|\bsumbu\b|\bJ[1-6]\b|\bS[1-5]\b|\bL[1-3]\b/giu;
// v1.3: Tangga AR (engine Pilar 6), dicocokkan ke kadar bukti
const tanggaAR = [/dugaan/i, /ucapan|candaan/i, /kabar/i, /konten menyebar/i, /pola nyata|terorganisasi/i, /ajakan|tindakan nyata/i];
const stopwords = new Set(['dengan', 'untuk', 'kepada', 'dalam', 'tidak', 'sudah', 'belum', 'karena', 'secara', 'tersebut', 'bahwa', 'sebagai', 'antara', 'setiap', 'masih', 'akan', 'yang', 'sedang', 'telah', 'hanya', 'semua', 'bagi', 'pada', 'dari', 'agar', 'supaya']);
const contentWords = (text) => normalized(text).split(' ').filter((w) => w.length >= 5 && !stopwords.has(w));
const items = []; // per soal, untuk cek per paket di akhir

const blocks = [...html.matchAll(/<!--\s*SOAL\s*(\d+)\s*-->([\s\S]*?)(?=<!--\s*SOAL\s*\d+\s*-->|$)/g)];
if (!blocks.length) errors.push('no "<!-- SOAL n -->" markers found — is this the right file?');

const stems = new Set();
const konstrukKunci = new Set();
const dimCounts = {};
const levelCounts = {};
const keyCounts = {};
const phraseCounts = Object.fromEntries(closingPhrases.map((p) => [p, 0]));

for (const [, numStr, raw] of blocks) {
  const n = Number(numStr);
  const label = `Soal ${n}`;

  const numMatch = raw.match(/<span class="soal-num">Soal No (\d+)<\/span>/);
  if (!numMatch || Number(numMatch[1]) !== n) errors.push(`${label}: soal-num text doesn't match comment marker`);

  const dimMatch = raw.match(/<span class="badge dim-([A-Za-z]+)">([^<]+)<\/span>/);
  const dimName = dimMatch ? allowedDims.get(dimMatch[1]) : null;
  if (!dimMatch) {
    errors.push(`${label}: missing dimension badge`);
  } else if (!allowedDims.has(dimMatch[1]) || allowedDims.get(dimMatch[1]) !== dimMatch[2].trim()) {
    errors.push(`${label}: unknown/mismatched dimension "${dimMatch[1]}"/"${dimMatch[2]}"`);
  } else {
    const dim = allowedDims.get(dimMatch[1]);
    dimCounts[dim] = (dimCounts[dim] || 0) + 1;
  }

  const stemMatch = raw.match(/<div class="stem">([\s\S]*?)<\/div>/);
  const stem = stemMatch ? decode(stemMatch[1]) : '';
  if (!stem) errors.push(`${label}: missing stem`);
  const stemKey = normalized(stem);
  if (stemKey && stems.has(stemKey)) errors.push(`${label}: duplicate normalized stem`);
  stems.add(stemKey);
  const stemLower = stem.toLowerCase();
  // "Setiap bulan Anda, pendamping ..., merekap" terbaca "bulan milik Anda": keterangan waktu/aspek
  // langsung disusul "Anda, <jabatan>," → tulis "Sebagai <jabatan>, setiap bulan Anda merekap".
  const sisip = stem.match(/\b(bulan|minggu|pekan|hari|pagi|siang|sore|malam|ini|itu|kemarin|besok|tadi|pernah|sudah|belum)\s+Anda,\s+[a-z]/iu);
  if (sisip) errors.push(`${label}: "${sisip[1]} Anda, <jabatan>," terbaca "${sisip[1]} milik Anda" — tulis "Sebagai <jabatan>, ... ${sisip[1]} Anda <kerja>"`);
  for (const phrase of closingPhrases) {
    if (stemLower.includes(phrase)) { phraseCounts[phrase] += 1; break; }
  }

  const opts = [...raw.matchAll(/<li><span class="opt-letter( kunci)?">([A-E])\.<\/span><span class="opt-text( kunci)?">([\s\S]*?)<\/span><\/li>/g)]
    .map((m) => ({ letter: m[2], isKunci: !!m[1], text: decode(m[4]) }));
  if (opts.length !== 5 || opts.some((o, i) => o.letter !== letters[i])) {
    errors.push(`${label}: opsi must be exactly A-E in order (got ${opts.map((o) => o.letter).join(',')})`);
  }

  const metaKunci = field(raw, 'Kunci');
  const flaggedKunci = opts.filter((o) => o.isKunci);
  if (flaggedKunci.length !== 1) errors.push(`${label}: exactly one opsi must carry the "kunci" class (found ${flaggedKunci.length})`);
  if (metaKunci && flaggedKunci[0] && metaKunci !== flaggedKunci[0].letter) {
    errors.push(`${label}: meta Kunci=${metaKunci} but opt-text.kunci is on ${flaggedKunci[0].letter}`);
  }
  if (metaKunci) keyCounts[metaKunci] = (keyCounts[metaKunci] || 0) + 1;

  const konstruk = field(raw, 'Konstruk');
  if (!konstruk) errors.push(`${label}: missing Konstruk`);
  else if (!/\bvs\b/i.test(konstruk)) errors.push(`${label}: Konstruk must state two poles ("... vs ...")`);
  if (konstruk && metaKunci) {
    const dupKey = `${normalized(konstruk)}|${metaKunci}`;
    if (konstrukKunci.has(dupKey)) errors.push(`${label}: same konstruk+kunci as an earlier soal`);
    konstrukKunci.add(dupKey);
  }

  const level = field(raw, 'Level');
  if (!level || !allowedLevels.includes(level)) errors.push(`${label}: invalid Level "${level}"`);
  else levelCounts[level] = (levelCounts[level] || 0) + 1;

  // opsi: panjang kata (Pilar 5), verb aktif (Pilar 4 no.4), kata absolut (Pilar 4 no.5),
  // pola gabungan dua-langkah (Pilar 4 no.3, v1.3)
  const lengths = [];
  const combo = {};
  let comboCount = 0;
  let comboKunci = false;
  for (const o of opts) {
    const wc = words(o.text);
    lengths.push(wc);
    if (wc < 10 || wc > 20) errors.push(`${label}${o.letter}: option is ${wc} words, must be 10-20`);
    const [w1, w2] = o.text.split(/\s+/u);
    const isVerb = (w) => /^(Me|Ber)[a-z]/i.test(w || '');
    if (!isVerb(w1) && isVerb(w2)) warnings.push(`${label}${o.letter}: opens with an adverb before the verb ("${w1} ${w2}") — Pilar 4 no.4 says start with the active verb`);
    else if (!isVerb(w1)) errors.push(`${label}${o.letter}: doesn't open with an active verb (Me-/Ber-) — looks nominal/passive`);
    if (/\b(selalu|semua|tanpa kecuali|mutlak)\b/i.test(o.text)) warnings.push(`${label}${o.letter}: absolute word — confirm it's a genuine categorical case (Pilar 4 no.5)`);
    if (comboRe.test(o.text)) {
      combo[o.letter] = true;
      comboCount += 1;
      if (o.isKunci) comboKunci = true;
    }
  }
  // v1.3: aturan strictly-shorter dicabut; panjang dicek per paket (modul tebakan di bawah)
  if (lengths.length === 5) {
    const spread = Math.max(...lengths) - Math.min(...lengths);
    if (spread > 3) errors.push(`${label}: option word-count spread ${spread} > 3 (${lengths.join(',')})`);
  }
  // v1.3.4 Pilar 4 no.2: panjang yang terlihat = huruf, bukan kata. Kunci maks 5 huruf di atas opsi
  // lain terpanjang, dan bukan satu-satunya opsi dua baris (>= 96 huruf pada tata letak PDF paket).
  const kunciOpt = opts.find((o) => o.isKunci);
  if (kunciOpt && opts.length === 5) {
    const lain = opts.filter((o) => o !== kunciOpt).map((o) => o.text.length);
    const lebih = kunciOpt.text.length - Math.max(...lain);
    if (lebih > 5) errors.push(`${label}: kunci ${lebih} huruf lebih panjang dari opsi lain terpanjang (maks 5, Pilar 4 no.2)`);
    if (kunciOpt.text.length >= 96 && lain.every((c) => c < 96)) errors.push(`${label}: kunci satu-satunya opsi dua baris (${kunciOpt.text.length} huruf, Pilar 4 no.2)`);
  }
  if (comboKunci && comboCount < 2) errors.push(`${label}: kunci is the only two-step combo opsi (sambil/sekaligus/serta/disertai/lalu/kemudian/setelah itu/dan me-) (Pilar 4 no.3)`);

  // Poin line: A=n <code class="sumbu">Sx</code> +Jy (kunci) per opsi (Pilar 3)
  const poinBlock = raw.match(/<span class="label">Poin<\/span>([\s\S]*?)<\/div>/);
  const poinText = poinBlock ? poinBlock[1] : '';
  const segs = poinText.split('&middot;');
  const points = {};
  const sumbu = {};
  const jebakan = {}; // huruf -> kode J
  for (const seg of segs) {
    const l = seg.match(/([A-E])\s*=\s*(\d)/);
    if (!l) continue;
    points[l[1]] = Number(l[2]);
    const s = seg.match(/<code class="sumbu">(S[1-5])<\/code>/);
    if (s) sumbu[l[1]] = s[1];
    const j = seg.match(/J[1-6]/);
    if (j) jebakan[l[1]] = j[0];
  }
  const hasJebakan = Object.keys(jebakan).length > 0;
  const pointValues = letters.map((l) => points[l]);
  if (JSON.stringify([...pointValues].sort()) !== JSON.stringify([1, 2, 3, 4, 5])) {
    errors.push(`${label}: poin per opsi must be exactly {1,2,3,4,5} once each (got ${JSON.stringify(points)})`);
  }
  if (!hasJebakan) errors.push(`${label}: no J1-J6 kode-jebakan tagged anywhere (Pilar 3 minimum 1 per soal)`);
  if (metaKunci && jebakan[metaKunci]) errors.push(`${label}: kode-jebakan ${jebakan[metaKunci]} on the kunci (${metaKunci}) — Pilar 3 v1.3: tempel di poin 2/3/4 saja`);
  const letter3 = letters.find((l) => points[l] === 3);
  const letter4 = letters.find((l) => points[l] === 4);
  if (letter3 && !sumbu[letter3]) errors.push(`${label}: poin-3 opsi (${letter3}) missing sumbu presisi tag`);
  if (letter4 && !sumbu[letter4]) errors.push(`${label}: poin-4 opsi (${letter4}) missing sumbu presisi tag`);
  if (letter3 && letter4 && sumbu[letter3] && sumbu[letter4] && sumbu[letter3] === sumbu[letter4]) {
    errors.push(`${label}: poin-3 and poin-4 use the same sumbu presisi (${sumbu[letter3]}) — must differ`);
  }
  const letter5 = letters.find((l) => points[l] === 5);
  if (letter5 && metaKunci && letter5 !== metaKunci) errors.push(`${label}: poin-5 opsi (${letter5}) is not the kunci (${metaKunci})`);

  // Gerbang 3: pembahasan must argue kunci-vs-poin4 and kunci-vs-poin3 separately, and each
  // argument must be SPECIFIC — not "kurang lengkap"/"kurang proaktif" hand-waving, and it must
  // actually engage with the distractor's own wording (a quotable phrase), not just its letter.
  // This narrows the bottleneck but does not close it: it catches vague language and sentences
  // that don't share a single substantial word with the option they claim to defeat, but it
  // cannot verify the argument is actually TRUE — that step stays a human/LLM read.
  const vsMatches = [...raw.matchAll(/<b>Kunci vs ([A-E])[^:<]*:<\/b>\s*([\s\S]*?)(?=<br>|<\/li>|$)/g)];
  if (vsMatches.length < 2) errors.push(`${label}: pembahasan needs 2 "Kunci vs" comparisons (poin-4 and poin-3), found ${vsMatches.length}`);
  const vsLetters = new Set(vsMatches.map((m) => m[1]));
  if (letter4 && !vsLetters.has(letter4)) errors.push(`${label}: no "Kunci vs ${letter4}" sentence for the poin-4 opsi — Gerbang 3 needs a defense named per letter, not just a count`);
  if (letter3 && !vsLetters.has(letter3)) errors.push(`${label}: no "Kunci vs ${letter3}" sentence for the poin-3 opsi — Gerbang 3 needs a defense named per letter, not just a count`);
  const vaguePhrase = /\b(kurang lengkap|kurang proaktif|belum tentu|tidak cukup lengkap|kurang optimal|kurang maksimal)\b/i;
  for (const [, vsLetter, vsTextRaw] of vsMatches) {
    const vsText = decode(vsTextRaw);
    if (vaguePhrase.test(vsText)) errors.push(`${label}: "Kunci vs ${vsLetter}" uses vague hand-wave ("${vsText.match(vaguePhrase)[0]}") instead of naming a sumbu presisi + specific phrase — Gerbang 3`);
    const opt = opts.find((o) => o.letter === vsLetter);
    if (opt) {
      const optWords = new Set(normalized(opt.text).split(' ').filter((w) => w.length > 4));
      const vsWords = normalized(vsText).split(' ').filter((w) => w.length > 4);
      const overlap = vsWords.some((w) => optWords.has(w));
      if (!overlap) warnings.push(`${label}: "Kunci vs ${vsLetter}" shares no distinctive word with opsi ${vsLetter}'s own text — check it actually quotes/engages that option, not a generic dismissal`);
    }
  }

  // v1.3 Pilar 1: fakta penentu — kutipan persis dari stem, tidak berbagi kata isi dengan kunci
  const fakta = field(raw, 'Fakta penentu');
  if (!fakta) errors.push(`${label}: missing "Fakta penentu" field (Pilar 1 v1.3)`);
  else {
    const faktaKey = normalized(fakta.replace(/^["“”']+|["“”']+$/g, ''));
    if (!normalized(stem).includes(faktaKey)) errors.push(`${label}: Fakta penentu "${fakta}" is not a verbatim quote of the stem`);
    const kunciOpt = opts.find((o) => o.isKunci);
    if (kunciOpt) {
      const kunciWords = new Set(contentWords(kunciOpt.text));
      const shared = [...new Set(contentWords(fakta))].filter((w) => kunciWords.has(w));
      if (shared.length) warnings.push(`${label}: Fakta penentu shares content word(s) with kunci (${shared.join(', ')}) — Gerbang 1 cocok-kata risk`);
    }
  }

  // v1.3 Pilar 6: pasangan kontras (cek timbal balik/jarak di akhir)
  const pasanganRaw = field(raw, 'Pasangan');
  let pasangan = null;
  if (pasanganRaw === null) errors.push(`${label}: missing "Pasangan" field (nomor soal atau "—")`);
  else if (/^\d+$/.test(pasanganRaw)) pasangan = Number(pasanganRaw);
  else if (!/^[—–-]$/.test(pasanganRaw)) errors.push(`${label}: Pasangan "${pasanganRaw}" must be a soal number or "—"`);

  // v1.3 Pilar 6: tangga AR wajib di soal Anti Radikalisme
  if (dimName === 'Anti Radikalisme') {
    const tangga = field(raw, 'Tangga AR');
    if (!tangga) errors.push(`${label}: missing "Tangga AR" field (Anti Radikalisme)`);
    else if (!tanggaAR.some((re) => re.test(tangga))) errors.push(`${label}: Tangga AR "${tangga}" is not one of the 6 rungs`);
  }

  // v1.3 C-5: pembahasan siswa bebas istilah dapur
  const siswaStart = raw.indexOf('<div class="pembahasan-siswa">');
  if (siswaStart < 0) warnings.push(`${label}: no <div class="pembahasan-siswa"> block`);
  else {
    const rest = raw.slice(siswaStart + 1);
    const end = rest.search(/<div class="pembahasan[ "]/);
    const siswa = decode(end < 0 ? rest : rest.slice(0, end));
    const hits = [...new Set(siswa.match(dapurRe) || [])];
    if (hits.length) errors.push(`${label}: pembahasan siswa uses istilah dapur (${hits.join(', ')})`);
  }

  items.push({
    n, dimName, lengths, combo, points, jebakan, pasangan,
    kunci: metaKunci,
    letter4,
    firstWords: Object.fromEntries(opts.map((o) => [o.letter, normalized(o.text).split(' ')[0]])),
    sepakat: opts.filter((o) => sepakatRe.test(normalized(o.text))).map((o) => o.letter),
    pembatas: opts.filter((o) => pembatasRe.test(o.text)).map((o) => o.letter),
  });
}

const itemCount = blocks.length;
// Pilar 2 cap berskala: 2 per 12 soal (paket 45 → 8). Cap tetap 2 dengan 8 penutup sah memberi
// plafon 16 soal per paket — mustahil untuk paket besar. Niat aturannya variasi penutup.
const phraseCap = Math.max(2, Math.ceil(itemCount / 12) * 2);
for (const [phrase, count] of Object.entries(phraseCounts)) {
  if (count > phraseCap) errors.push(`closing phrase "${phrase}" used ${count}x across ${itemCount} soal, max ${phraseCap} (Pilar 2: 2 per 12 soal)`);
}

// v1.3 ambang per paket: error bila file >= 30 soal, peringatan bila lebih kecil (batch kecil berisik)
const paketIssue = (msg) => (itemCount >= 30 ? errors : warnings).push(msg);
const pct = (x) => `${Math.round((x / itemCount) * 100)}%`;

// Modul tebakan (Pilar 4 no.2-3): tiap tebakan memilih huruf dari bentuk opsi saja; skor = berapa
// soal tebakan itu kena target. Seri = 1/k. Tambah tebakan baru cukup dengan menambah baris.
const byRank = (it, rank, pool = letters) => {
  const sorted = pool.map((l, i) => ({ l, len: it.lengths[letters.indexOf(l)] })).sort((a, b) => b.len - a.len);
  if (sorted.length < rank) return [];
  const len = sorted[rank - 1].len;
  return sorted.filter((x) => x.len === len).map((x) => x.l);
};
const tebakan = [
  { nama: 'kunci = opsi terpanjang', target: 'kunci', tebak: (it) => byRank(it, 1), batas: 0.20 },
  { nama: 'kunci = opsi terpanjang ke-2', target: 'kunci', tebak: (it) => byRank(it, 2), batas: 0.30 },
  { nama: 'poin 4 = opsi terpanjang', target: 'letter4', tebak: (it) => byRank(it, 1), batas: 0.30 },
  { nama: 'kunci = opsi dua-langkah terpanjang', target: 'kunci', tebak: (it) => byRank(it, 1, letters.filter((l) => it.combo[l])), batas: 0.30 },
  { nama: 'buang berkata pembatas, acak sisanya', target: 'kunci', tebak: (it) => { const ok = letters.filter((l) => !it.pembatas.includes(l)); return ok.length ? ok : letters; }, batas: 0.25, bulat: true },
];
const tebakanHasil = {};
for (const t of tebakan) {
  let hit = 0;
  for (const it of items) {
    const guess = it.lengths.length === 5 ? t.tebak(it) : [];
    if (guess.includes(it[t.target])) hit += 1 / guess.length;
  }
  tebakanHasil[t.nama] = `${hit.toFixed(1)}/${itemCount} (${pct(hit)}, batas ${t.batas * 100}%)`;
  // bulat: batas dibaca dalam persen bulat, sama seperti angka yang dilaporkan ke Gusti (Paket 2 = 25%)
  const kena = t.bulat ? Math.round((hit / itemCount) * 100) > t.batas * 100 : hit / itemCount > t.batas;
  if (kena) paketIssue(`tebakan "${t.nama}" kena ${hit.toFixed(1)}/${itemCount} (${pct(hit)}) > ${t.batas * 100}% (Pilar 4 no.2-3)`);
}

// Pilar 4 no.3a (status uji): tebakan "pilih opsi sepakat bila ada" — dari semua opsi berpola
// sepakat, yang kunci maks 60% (bukan-kunci ≈ kunci). Dicek bila pola muncul >= 4 opsi.
const sepakatKunci = items.filter((it) => it.sepakat.includes(it.kunci)).map((it) => it.n);
const sepakatBukan = items.flatMap((it) => it.sepakat.filter((l) => l !== it.kunci).map((l) => `${it.n}${l}`));
const sepakatTotal = sepakatKunci.length + sepakatBukan.length;
const sepakatHasil = `kunci ${sepakatKunci.length} [${sepakatKunci.join(', ')}] · bukan-kunci ${sepakatBukan.length} [${sepakatBukan.join(', ')}]`;
if (sepakatTotal >= 4 && sepakatKunci.length / sepakatTotal > 0.6) {
  paketIssue(`opsi berpola sepakat: ${sepakatHasil}; kunci ${Math.round((sepakatKunci.length / sepakatTotal) * 100)}% > 60% (Pilar 4 no.3a)`);
}

// Kata pertama → poin (U): kata pembuka yang menumpuk di satu poin jadi sinyal
const firstWordPoin = {};
for (const it of items) {
  for (const l of letters) {
    const w = it.firstWords[l];
    if (!w || !it.points[l]) continue;
    firstWordPoin[w] = firstWordPoin[w] || {};
    firstWordPoin[w][it.points[l]] = (firstWordPoin[w][it.points[l]] || 0) + 1;
  }
}
for (const [w, perPoin] of Object.entries(firstWordPoin)) {
  const total = Object.values(perPoin).reduce((a, b) => a + b, 0);
  const [topPoin, top] = Object.entries(perPoin).sort((a, b) => b[1] - a[1])[0];
  if (total < 5 || top / total < 0.6) continue;
  const msg = `kata pembuka "${w}" muncul ${total}x, ${top}x di poin ${topPoin} (${Math.round((top / total) * 100)}%) — sinyal bentuk`;
  if (total >= 8) paketIssue(msg);
  else warnings.push(msg);
}

// Sebaran jebakan (Pilar 3 v1.3)
const jebakan34 = items.filter((it) => letters.some((l) => it.jebakan[l] && [3, 4].includes(it.points[l]))).length;
if (jebakan34 < itemCount / 3) paketIssue(`jebakan di poin 3/4 hanya ${jebakan34}/${itemCount} soal, minimal sepertiga (Pilar 3)`);
const kodePoin = {};
for (const it of items) {
  for (const [l, kode] of Object.entries(it.jebakan)) {
    kodePoin[kode] = kodePoin[kode] || {};
    kodePoin[kode][it.points[l]] = (kodePoin[kode][it.points[l]] || 0) + 1;
  }
}
for (const [kode, perPoin] of Object.entries(kodePoin)) {
  const total = Object.values(perPoin).reduce((a, b) => a + b, 0);
  const [topPoin, top] = Object.entries(perPoin).sort((a, b) => b[1] - a[1])[0];
  if (total >= 4 && top / total > 0.5) paketIssue(`${kode} muncul ${total}x, ${top}x di poin ${topPoin} (> 50%) — sebar ke poin lain (Pilar 3)`);
}

// Pasangan kontras (Pilar 6 v1.3): nomor ada, timbal balik, jarak >= 5, minimal 3 pasang
const byNum = new Map(items.map((it) => [it.n, it]));
const pairs = new Set();
for (const it of items) {
  if (it.pasangan === null) continue;
  const other = byNum.get(it.pasangan);
  if (!other) { errors.push(`Soal ${it.n}: Pasangan ${it.pasangan} does not exist in this file`); continue; }
  if (other.pasangan !== it.n) errors.push(`Soal ${it.n}: Pasangan ${it.pasangan} is not reciprocal (Soal ${other.n} → ${other.pasangan ?? '—'})`);
  if (Math.abs(other.n - it.n) < 5) errors.push(`Soal ${it.n}: Pasangan ${it.pasangan} is < 5 numbers away`);
  pairs.add([it.n, other.n].sort((a, b) => a - b).join('-'));
}
if (pairs.size < 3) paketIssue(`pasangan kontras ${pairs.size}, minimal 3 per paket (Pilar 6)`);

// Distribusi kunci (Pilar 6): huruf kunci yang sama tidak berderet > 2
for (let i = 2; i < items.length; i += 1) {
  const [a, b, c] = items.slice(i - 2, i + 1).map((it) => it.kunci);
  if (a && a === b && b === c) paketIssue(`Soal ${items[i - 2].n}-${items[i].n}: kunci ${a} berderet 3x (Pilar 6)`);
}


if (itemCount === 30) {
  const expectedDims = {
    Profesionalisme: 6, 'Pelayanan Publik': 6, 'Jejaring Kerja': 5,
    'Sosial Budaya': [4, 5], TIK: 4, 'Anti Radikalisme': [4, 5],
  };
  for (const [dim, expected] of Object.entries(expectedDims)) {
    const actual = dimCounts[dim] || 0;
    const ok = Array.isArray(expected) ? expected.includes(actual) : actual === expected;
    if (!ok) warnings.push(`dimension "${dim}" count=${actual}, expected ${JSON.stringify(expected)} (Pilar 6 default grid)`);
  }
  for (const letter of letters) {
    const c = keyCounts[letter] || 0;
    if (c < 4 || c > 8) errors.push(`kunci letter ${letter} used ${c}x, must be 4-8 per 30 soal (Pilar 6)`);
  }
}

// Peta paket 45 (Pilar 6). Grid = heuristik engine: KepmenPANRB 406/2026 tidak mengatur porsi per aspek.
if (itemCount === 45) {
  const grid45 = {
    Profesionalisme: 9, 'Pelayanan Publik': 9, 'Jejaring Kerja': 7,
    'Sosial Budaya': 7, TIK: 6, 'Anti Radikalisme': 7,
  };
  for (const [dim, expected] of Object.entries(grid45)) {
    const actual = dimCounts[dim] || 0;
    if (actual !== expected) errors.push(`dimension "${dim}" count=${actual}, must be ${expected} per paket 45 (Pilar 6)`);
  }
  const tinggi = levelCounts.Tinggi || 0;
  const sangat = levelCounts['Sangat Tinggi'] || 0;
  if (tinggi < 25 || tinggi > 29 || sangat < 16 || sangat > 20) {
    errors.push(`level Tinggi ${tinggi} / Sangat Tinggi ${sangat}, must be 25-29 / 16-20 (default 27/18, Pilar 6)`);
  }
  for (const letter of letters) {
    const c = keyCounts[letter] || 0;
    if (c < 7 || c > 11) errors.push(`kunci letter ${letter} used ${c}x, must be 7-11 per 45 soal (Pilar 6)`);
  }
}

console.log(JSON.stringify({
  file,
  item_count: itemCount,
  dimensi: dimCounts,
  level: levelCounts,
  kunci: keyCounts,
  closing_phrases: phraseCounts,
  tebakan: tebakanHasil,
  sepakat: sepakatHasil,
  jebakan_poin: kodePoin,
  pasangan: [...pairs],
  warnings,
  errors,
  manual_gates_not_scripted: [
    'Gerbang 3 TRUTH of the defense (script now catches vague phrasing + missing per-letter coverage + zero word-overlap with the option; it cannot verify the reasoning is actually correct)',
    'jangkar realita >=40% konkret detail',
    'poin 1 not karikatural / poin 2 not blatantly tercela',
    'leksikon per dimensi consistency',
  ],
}, null, 2));
if (errors.length) process.exit(1);
