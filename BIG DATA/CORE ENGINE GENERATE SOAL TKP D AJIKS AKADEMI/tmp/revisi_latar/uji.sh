#!/bin/sh
# sh revisi_latar/uji.sh <paket 1|2> <out.html>: rakit paket + validator + cek slot (abaikan beda latar).
cd "$(dirname "$0")/.."
p=$1; o=$2
node build_paket2.js "$o" paket1.html paket${p}_soal_01_15.js paket${p}_soal_16_30.js paket${p}_soal_31_45.js paket${p}_bahas_01_15.js paket${p}_bahas_16_30.js paket${p}_bahas_31_45.js paket${p}_pindai.json >/dev/null
node validate_soal.js "$o" 2>&1 | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s.slice(s.indexOf("{")));console.log("validator: galat",j.errors.length,"peringatan",j.warnings.length);j.errors.forEach(e=>console.log(" G",e));j.warnings.forEach(e=>console.log(" P",e));})'
# cek_slot dilewati: blueprint paket 1-2 sudah usang sejak revisi opsi 2026-10-28; pengganti = revisi_latar/cek.js
