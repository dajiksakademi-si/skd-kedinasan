# usage: sh jalan_p1.sh <outdir> <revisi.js>:<soalfile> [...] — salin data asli Paket 1, jalankan revisi berurutan di salinan, rakit, validasi, ukur
T="$(cd "$(dirname "$0")/.." && pwd)"; O="$1"; shift
rm -rf "$O" && mkdir -p "$O" && cp "$T"/paket1_soal_*.js "$T"/paket1_bahas_*.js "$T"/paket1_pindai.json "$O/"
for P in "$@"; do R="$(cd "$(dirname "${P%%:*}")" && pwd)/$(basename "${P%%:*}")"; F="${P##*:}"
  node "$R" "$O" || exit 1
  (cd "$O" && node "$T/patch_soal.js" "$F" patch.json) || exit 1
done
cd "$O" && KAKI="$(grep 'footer-note">' "$T/paket1.html")" JUDUL='Paket 1 TKP — Draf Produksi (engine v1.3.4)' node "$T/build_paket2.js" paket1_rev.html "$T/paket1.html" paket1_soal_*.js paket1_bahas_*.js paket1_pindai.json >/dev/null || exit 1
node "$T/validate_soal.js" paket1_rev.html | node -e 'const j=JSON.parse(require("fs").readFileSync(0));console.log("galat",j.errors);console.log("peringatan non-absolut",j.warnings.filter(w=>!/absolute word/.test(w)));console.log(JSON.stringify(j).match(/"tebakan[^}]*}/)[0])'
node "$T/cek_pindai.js" paket1_pindai.json paket1_soal_*.js 2>&1 | tail -1; node "$T/cek_lintas_paket.js" paket1_rev.html 2>&1 | tail -3
node "$T/ukur.js" "$PWD" paket1 | sed -n 2,7p; for f in paket1_soal_*.js; do node "$T/revisi_opsi/pembatas.js" "$PWD/$f"; done
