#!/bin/sh
# Rakit bank 80 soal dari potongan di tmp/. Urutan blok soal ikut urutan nomor file.
set -e
cd "$(dirname "$0")/.."
cat tmp/part_head.html tmp/part_cover.html tmp/part_soal_1_12.html tmp/soal_new/*.html tmp/part_footer.html > Bank_Soal_TKP_HOTS_80.html
