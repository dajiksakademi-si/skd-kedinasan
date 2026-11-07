// usage: node pembatas.js <file soal.js> — per nilai: opsi berkata pembatas; tebak "buang berkata pembatas, acak sisanya"; kunci/nilai4 dua-langkah
const items=require(require('path').resolve(process.argv[2]));const L=[...'ABCDE'];
const re=/\b(tanpa|cukup|saja|hanya|dulu|nanti|belum|usai|sendiri|bulan depan|toh|biar|siapa tahu)\b/i, dl=/\b(lalu|kemudian|serta|sambil|sekaligus|disertai|setelah itu)\b|\bdan me/;
const c={1:0,2:0,3:0,4:0,5:0};let h=0,k2=0,p42=0;
for(const s of items){L.forEach(l=>{if(re.test(s.opts[l]))c[s.poin[l][0]]++});const ok=L.filter(l=>!re.test(s.opts[l]));const pool=ok.length?ok:L;if(pool.includes(s.kunci))h+=1/pool.length;
const l4=L.find(l=>s.poin[l][0]==='4');if(dl.test(s.opts[s.kunci]))k2++;if(dl.test(s.opts[l4]))p42++;}
console.log(`pembatas per nilai ${JSON.stringify(c)} · tebak buang-pembatas ${(h/items.length*100).toFixed(0)}% · dua-langkah kunci ${k2} / nilai4 ${p42}`);
