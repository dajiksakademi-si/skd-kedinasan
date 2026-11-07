// node banding_wording.js <lama.js> <baru.js> <out.html> <judul>: PDF sebelum/sesudah per soal.
const fs = require('fs'), path = require('path');
const [lf, bf, out, judul] = process.argv.slice(2);
const lama = require(path.resolve(lf)), baru = require(path.resolve(bf));
const src = fs.readFileSync(path.join(path.dirname(path.resolve(bf)), 'pdfs/paket2/Paket_2_TKP_Pembahasan.html'), 'utf8');
const head = src.slice(0, src.indexOf('</style>'));
const w = (t) => t.replace(/&hellip;/g, '').split(/\s+/).filter(Boolean).length;
const sk = (s, l) => s.poin[l].match(/^\d/)[0];
const css = `.duo{display:flex;gap:5mm}.col{flex:1;border:1px solid #ccc;border-radius:4px;padding:3mm 4mm;font-size:9.6pt}.col h4{margin:0 0 2mm;font-family:Helvetica,Arial;font-size:9pt;letter-spacing:1px;text-transform:uppercase}.lama h4{color:#999}.baru{border:2px solid #2f7d4f}.baru h4{color:#2f7d4f}.col ol{padding-left:4.5mm;margin:2mm 0}.col li{margin:1mm 0}.k{font-weight:bold}.n{font-family:Helvetica,Arial;font-size:8pt;color:#666;margin-top:2mm}`;
let html = `${head}${css}</style></head><body><h2 class="section-title">${judul}</h2><p>Kiri: versi lama. Kanan: versi baru gaya mentor. Tema, kunci, dan skor tetap.</p>`;
for (const b of baru) {
  const a = lama.find((x) => x.n === b.n);
  const col = (cls, t, s) => { const ow = Object.values(s.opts).map(w); return `<div class="col ${cls}"><h4>${t}</h4><p>${s.stem}</p><ol type="A">${Object.keys(s.opts).map((l) => `<li class="${l === s.kunci ? 'k' : ''}">${s.opts[l]} <i>(skor ${sk(s, l)})</i></li>`).join('')}</ol><div class="n">${w(s.stem)} kata · pilihan ${Math.min(...ow)}–${Math.max(...ow)} kata</div></div>`; };
  html += `<div class="soal" style="page-break-inside:avoid;margin-bottom:6mm"><div class="soal-head"><span class="soal-num">Soal No ${b.n}</span><span class="badge">${b.dim}</span></div><div class="duo">${col('lama', 'Sebelum', a)}${col('baru', 'Sesudah', b)}</div></div>`;
}
fs.writeFileSync(out, html + '</body></html>');
