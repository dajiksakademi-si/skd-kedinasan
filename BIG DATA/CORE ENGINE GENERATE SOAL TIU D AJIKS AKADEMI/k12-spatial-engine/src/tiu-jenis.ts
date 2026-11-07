import type { Draft } from "./k12-spasial-core";
import { ANA_OBJ, MTX_PUTAR, anaObj, mtxPutar } from "./tiu-fig-ana-mtx";
import { BEDA_HITUNG, BEDA_HITUNG_S, BEDA_PUTAR, SERI_KUADRAN, SERI_P3, bedaHitung, bedaPutar, seriKuadran, seriP3 } from "./tiu-fig-beda-seri";
import { BEDA_TUMPUK, MTX_HITUNG, bedaTumpuk, mtxHitung } from "./tiu-fig-baru";
import { ANA_UBAH, MTX_GABUNG, anaUbah, mtxGabung } from "./tiu-fig-ubah";
import { BEDA_PUTAR_S, SERI_KUADRAN_S, bedaPutarS, seriKuadranS } from "./tiu-fig-siluet";

// Daftar jenis soal gambar TIU: nama, asal logika (Al Faiz), contoh spesifikasi, dan pembuatnya.
// Dipakai CLI (tiu-generate) dan mockup browser; menambah jenis cukup di sini.
type J = { nama: string; asal: string; contoh: object[]; buat: (s: never) => Draft };
export const JENIS: Record<string, J> = {
  "FIG-BEDA-PUTAR": { nama: "Gambar berbeda: diputar atau dicermin", asal: "Paket 41 no. 62", contoh: [...BEDA_PUTAR, ...BEDA_PUTAR_S], buat: (x: never) => ("acak" in (x as object) ? bedaPutarS(x) : bedaPutar(x)) },
  "FIG-BEDA-HITUNG": { nama: "Gambar berbeda: hitung jenis bulatan", asal: "Paket 41 no. 61", contoh: [...BEDA_HITUNG, ...BEDA_HITUNG_S], buat: bedaHitung },
  "FIG-BEDA-TUMPUK": { nama: "Gambar berbeda: depan-belakang + ukuran hiasan", asal: "Paket 41 no. 62", contoh: BEDA_TUMPUK, buat: bedaTumpuk },
  "FIG-SERI-P3": { nama: "Seri selang tiga", asal: "Part 39 no. 58", contoh: SERI_P3, buat: seriP3 },
  "FIG-SERI-KUADRAN": { nama: "Seri empat kuadran", asal: "Paket 41 no. 58", contoh: [...SERI_KUADRAN, ...SERI_KUADRAN_S], buat: (x: never) => ("dua" in (x as object) ? seriKuadranS(x) : seriKuadran(x)) },
  "FIG-ANA-OBJ": { nama: "Analogi per objek (putar, cermin, warna, tukar)", asal: "Paket 41 no. 59–60, 65", contoh: ANA_OBJ, buat: anaObj },
  "FIG-ANA-UBAH": { nama: "Analogi ubah jumlah + tukar + cermin", asal: "Paket 41 no. 59 (pembahasan resmi)", contoh: ANA_UBAH, buat: anaUbah },
  "FIG-MTX-PUTAR": { nama: "Matriks putar/cermin", asal: "Part 39 no. 64–65, Paket 41 no. 63", contoh: MTX_PUTAR, buat: mtxPutar },
  "FIG-MTX-HITUNG": { nama: "Matriks hitung cabang + objek kecil", asal: "Paket 41 no. 64", contoh: MTX_HITUNG, buat: mtxHitung },
  "FIG-MTX-GABUNG": { nama: "Matriks gabung kolom + ujung lancip jadi tumpul", asal: "Paket 41 no. 65 (pembahasan resmi)", contoh: MTX_GABUNG, buat: mtxGabung },
};
