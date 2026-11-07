# usage: sh jalan_k.sh <revisi.js> <outdir> <soalfile>  — salin data asli, terapkan revisi, rakit, validasi, ukur
S="$(cd "$(dirname "$0")" && pwd)"; T="$(cd "$(dirname "$0")/.." && pwd)"; R="$S/$1"; O="$S/$2"; F="$3"
rm -rf "$O" && mkdir "$O" && cp "$T"/paket2_soal_*.js "$T"/paket2_bahas_*.js "$T"/paket2_pindai.json "$O/"
node "$R" "$O" >/dev/null && cp "$T/$F" "$O/"
node -e 'const src=require("fs").readFileSync(process.argv[1],"utf8");const R=eval("("+src.split("const R = ")[1].split("};\nfor")[0]+"})");const p={};for(const [n,r] of Object.entries(R))p[n]={opts:{[r.L]:r.opt},...(r.poin?{poin:r.poin}:{})};require("fs").writeFileSync(process.argv[2],JSON.stringify(p,null,1))' "$R" "$O/patch.json"
(cd "$O" && node "$T/patch_soal.js" "$F" patch.json) || exit 1
cd "$O" && KAKI="$(grep 'footer-note">' "$T/paket2.html")" node "$T/build_paket2.js" paket2_rev.html "$T/paket2.html" paket2_soal_*.js paket2_bahas_*.js paket2_pindai.json >/dev/null
node "$T/validate_soal.js" paket2_rev.html | node -e 'const j=JSON.parse(require("fs").readFileSync(0));console.log("galat",j.errors);console.log("peringatan non-absolut",j.warnings.filter(w=>!/absolute word/.test(w)));console.log(JSON.stringify(j).match(/"tebakan[^}]*}/)[0])'
node "$T/cek_pindai.js" paket2_pindai.json paket2_soal_*.js 2>&1 | tail -1; node "$T/cek_lintas_paket.js" paket2_rev.html 2>&1 | grep -c '"' ; node "$S/ukur.js" "$O" paket2 | sed -n 2,6p; node "$S/ciri.js" "$O" paket2 | head -2
