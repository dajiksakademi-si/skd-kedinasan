// usage: [JUDUL='..'] [KAKI='<div ..>'] node build_paket2.js <out.html> <head-src.html> <data.js ...>  (JUDUL/KAKI: judul halaman + catatan kaki, bawaan Paket 2)
// data.js berisi array soal; file yang berisi objek {n: {reviu, siswa}} = pembahasan, digabung per nomor.
const fs = require('fs');
const [out, headSrc, ...data] = process.argv.slice(2);
const head = fs.readFileSync(headSrc, 'utf8').split('<!-- SOAL 1 -->')[0]
  .replace(/<title>[^<]*<\/title>/, `<title>${process.env.JUDUL || 'Paket 2 TKP — Draf Produksi (engine v1.3.2)'}</title>`);
const cls = (d) => 'dim-' + d.replace(/\s+/g, '');
const poinHtml = (p) => 'ABCDE'.split('').map((l) => l + '=' + p[l].replace(/^(\d) (S[1-5])/, '$1 <code class="sumbu">$2</code>')).join(' &middot; ');
const mods = data.map((f) => require(require('path').resolve(f)));
const items = mods.filter(Array.isArray).flat();
// file pindai (paket2_pindai.json) = {meta, soal: {n: {aspek, penentu, arti, coret, sisa, tanda}}}
const pindaiMod = mods.find((m) => !Array.isArray(m) && m.meta && m.soal);
const bahas = Object.assign({}, ...mods.filter((m) => !Array.isArray(m) && m !== pindaiMod));
const pindai = (s) => { const d = pindaiMod && pindaiMod.soal[s.n]; if (!d) return '';
  const [p4, k] = Object.keys(d.sisa);
  return `    <div class="pindai"><div class="pt">Pindai Cepat D'Ajiks <span>± 30 detik</span></div><ol>
      <li><b>Aspek:</b> ${d.aspek}</li>
      <li><b>Kalimat penentu:</b> "${d.penentu}". ${d.arti}</li>
      <li><b>Coret:</b> ${Object.entries(d.coret).map(([l, a]) => `${l} (${a})`).join(', ')}. Tinggal ${p4} dan ${k}. ${p4}: ${d.sisa[p4]}. ${k}: ${d.sisa[k]}. <b>Pilih ${k}.</b></li>
    </ol><div class="tanda"><b>Tanda cepat:</b> ${d.tanda}</div></div>
`; };
const cssPindai = `  .pindai{border:2px solid #1f5f8b;border-radius:5px;background:#f2f8fc;padding:3mm 5mm;margin:0 0 4mm;font-family:"Helvetica Neue",Arial,sans-serif;font-size:10pt}
  .pindai .pt{font-weight:bold;color:#1f5f8b;letter-spacing:1px;text-transform:uppercase;font-size:9.5pt;margin-bottom:2mm}
  .pindai .pt span{float:right;font-weight:normal;color:#555;text-transform:none;letter-spacing:0}
  .pindai ol{margin:0;padding-left:5mm}.pindai li{margin:1.5mm 0}
  .pindai .tanda{margin-top:2.5mm;padding:2mm 3mm;background:#fff6d6;border-left:4px solid #d9a400}
`;
const skor = (s, l) => s.poin[l][0];
const pembahasan = (s) => { const b = bahas[s.n]; if (!b) return ''; const w = b.siswa;
  const urut = 'ABCDE'.split('').sort((x, y) => skor(s, y) - skor(s, x));
  return `  <div class="pembahasan">
    <div class="ph-title">Pembahasan Reviu</div>
    <ol>
${b.reviu.map((li) => `      <li>${li}</li>`).join('\n')}
    </ol>
${(b.catatan || []).map((c) => `    <p>${c}</p>\n`).join('')}  </div>
  <div class="pembahasan-siswa">
${pindai(s)}    <div class="ph-title">Pembahasan Siswa</div>
    <p><b>Yang ditanya:</b> ${w.tanya}</p>
    <ul>
${urut.map((l) => `      <li><b>${l} (skor ${skor(s, l)})</b>: ${w.opsi[l]}</li>`).join('\n')}
    </ul>
    <p><b>Kunci ${s.kunci}</b>, karena ${w.kunci}</p>
    <p><b>Analogi:</b> ${w.analogi}</p>
    <p><b>Jebakan:</b> ${w.jebakan}</p>
    <p><b>Tips:</b> ${w.tips}</p>
  </div>
`; };
const blok = items.map((s) => `<!-- SOAL ${s.n} -->
<div class="soal">
  <div class="soal-head">
    <span class="soal-num">Soal No ${s.n}</span>
    <span class="badge ${cls(s.dim)}">${s.dim}</span>
  </div>
  <div class="stem">
    ${s.stem} (${s.dim})
  </div>
  <ul class="options">
${'ABCDE'.split('').map((l) => { const k = l === s.kunci ? ' kunci' : ''; return `    <li><span class="opt-letter${k}">${l}.</span><span class="opt-text${k}">${s.opts[l]}</span></li>`; }).join('\n')}
  </ul>
  <div class="meta">
    <div><span class="label">Kunci</span>${s.kunci}</div>
    <div><span class="label">Konstruk</span>${s.konstruk}</div>
    <div><span class="label">Fakta penentu</span>"${s.fakta}"</div>
    <div><span class="label">Pasangan</span>${s.pasangan}</div>
    <div><span class="label">Latar</span>${s.latar}</div>
${s.tangga ? `    <div><span class="label">Tangga AR</span>${s.tangga}</div>\n` : ''}    <div><span class="label">Poin</span>${poinHtml(s.poin)}</div>
    <div><span class="label">Level</span>${s.level}</div>
  </div>
${pembahasan(s)}</div>
`).join('\n');
fs.writeFileSync(out, (pindaiMod ? head.replace('</style>', cssPindai + '</style>') : head) + blok + `\n<!-- AKHIR SOAL -->\n${process.env.KAKI ? process.env.KAKI + '\n' : '\n'}</body>\n</html>\n`);
console.log(`${items.length} soal -> ${out}`);
