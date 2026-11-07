// usage: node ukur.js <tmpdir> <prefix>   — ukur bocor panjang opsi per paket
const path = require('path'), [dir, pre] = process.argv.slice(2);
const items = ['01_15','16_30','31_45'].flatMap(k => require(path.join(dir, `${pre}_soal_${k}.js`)));
const W = t => t.replace(/&\w+;/g,' ').split(/\s+/).filter(Boolean).length;
const C = t => t.replace(/&\w+;/g,' ').length;
const L = 'ABCDE'.split('');
let r1=0,r2=0,top1=0,top1c=0, d54=[], dmin=[], low=[], rows=[];
for (const s of items) {
  const sk = Object.fromEntries(L.map(l => [l, +s.poin[l][0]]));
  const w = Object.fromEntries(L.map(l => [l, W(s.opts[l])])), c = Object.fromEntries(L.map(l => [l, C(s.opts[l])]));
  const k = s.kunci, k4 = L.find(l => sk[l]===4);
  const rank = (m, l) => 1 + L.filter(x => m[x] > m[l]).length;
  const max = Math.max(...L.map(l=>w[l])), ties = L.filter(l=>w[l]===max);
  if (ties.includes(k)) top1 += 1/ties.length;          // tebak "pilih terpanjang" (seri dibagi)
  const maxc = Math.max(...L.map(l=>c[l])); if (c[k]===maxc) top1c++;
  if (rank(w,k)===1) r1++; else if (rank(w,k)===2) r2++;
  d54.push(w[k]-w[k4]); dmin.push(w[k]-Math.min(...L.map(l=>w[l])));
  L.filter(l=>sk[l]<=3).forEach(l=>low.push(w[l]));
  const kmean = L.filter(l=>l!==k).reduce((a,l)=>a+c[l],0)/4;
  rows.push({n:s.n, k, kata:L.map(l=>`${l}${sk[l]}:${w[l]}`).join(' '), d54:w[k]-w[k4], dmin:w[k]-Math.min(...L.map(l=>w[l])), rk:rank(w,k), rkc:rank(c,k), hurufLebih: Math.round(c[k]-kmean)});
}
const n = items.length, avg = a => (a.reduce((x,y)=>x+y,0)/a.length).toFixed(1), hist = a => Object.entries(a.reduce((m,x)=>(m[x]=(m[x]||0)+1,m),{})).map(([k,v])=>`${k}:${v}`).join(' ');
console.log(`== ${pre} (${n} soal)`);
console.log(`kunci peringkat kata 1 (termasuk seri): ${r1} · peringkat 2: ${r2}`);
console.log(`tebak "pilih terpanjang (kata)": ${top1.toFixed(1)}/${n} = ${(top1/n*100).toFixed(0)}% (acak 20%)`);
console.log(`tebak "pilih terpanjang (huruf)": ${top1c}/${n} = ${(top1c/n*100).toFixed(0)}%`);
console.log(`selisih kata kunci-poin4: rata ${avg(d54)} · sebaran ${hist(d54)}`);
console.log(`selisih kata kunci-terpendek: rata ${avg(dmin)} · sebaran ${hist(dmin)}`);
console.log(`panjang poin 1-3: rata ${avg(low)} · sebaran ${hist(low)}`);
console.log(`peringkat huruf kunci: ${hist(rows.map(r=>r.rkc))}`);
rows.sort((a,b)=>(a.rkc-b.rkc)||(b.hurufLebih-a.hurufLebih));
console.log('5 terparah (kunci terpanjang menurut huruf, selisih huruf terbesar vs rata opsi lain):');
rows.slice(0,5).forEach(r=>console.log(`  no ${r.n} kunci ${r.k} | ${r.kata} | +${r.hurufLebih} huruf, rank kata ${r.rk}`));
