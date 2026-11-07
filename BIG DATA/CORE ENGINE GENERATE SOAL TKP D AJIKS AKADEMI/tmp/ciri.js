// tebakan bentuk lain: koma, kata dua-langkah, alasan; persentase kunci di antara opsi yang punya ciri
const path=require('path'),[dir,pre]=process.argv.slice(2);
const items=['01_15','16_30','31_45'].flatMap(k=>require(path.join(dir,`${pre}_soal_${k}.js`)));
const L='ABCDE'.split('');
const ciri={koma:t=>/,/.test(t), duaLangkah:t=>/\b(lalu|kemudian|serta|sambil|sekaligus|disertai|setelah itu)\b|\bdan me/.test(t), santai:t=>/\b(toh|biar|siapa tahu|cukup)\b/.test(t), alasan:t=>/\b(karena|mengingat|demi|agar|supaya)\b/.test(t)};
for(const [nm,f] of Object.entries(ciri)){let k=0,tot=0,soal=0,hit=0;
 for(const s of items){const has=L.filter(l=>f(s.opts[l]));tot+=has.length;if(has.includes(s.kunci))k++;if(has.length){soal++;if(has.includes(s.kunci))hit+=1/has.length;}}
 console.log(`${pre} ${nm}: opsi ber-ciri ${tot}, di kunci ${k} (${(k/tot*100).toFixed(0)}% opsi ber-ciri adalah kunci; acak 20%) · tebak "pilih yg ber-ciri" ${hit.toFixed(1)}/${soal} soal`);}
