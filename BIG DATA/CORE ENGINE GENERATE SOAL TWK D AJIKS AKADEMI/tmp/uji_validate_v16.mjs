// Uji kecil validator v1.6: paket contoh 30 soal lolos, tiap pelanggaran aturan v1.6 gagal.
// Jalankan dari folder engine TWK: node tmp/uji_validate_v16.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const validator = 'tmp/validate_bank_100.mjs';
const bank = JSON.parse(fs.readFileSync('bank_soal_100.json', 'utf8'));
const byId = Object.fromEntries(bank.soal.map((q) => [q.id, q]));
const paket1 = JSON.parse(fs.readFileSync('tmp/v15/paket_twk_1.json', 'utf8')).soal.map((q) => q.id);

// paket 1 v1.5 (9/7/6/4/2/2) → grid v1.6 7/6/6/3/2/6; level 6/15/9 dan kunci 4-7 tetap terjaga
const drop = ['DAJ-TWK-025', 'DAJ-TWK-011', 'DAJ-TWK-049', 'DAJ-TWK-079'];
const ids = [...paket1.filter((id) => !drop.includes(id)), 'DAJ-TWK-096', 'DAJ-TWK-099', 'DAJ-TWK-100', 'DAJ-TWK-101'];
const rumpun = {
  'DAJ-TWK-096': 'paragraf', 'DAJ-TWK-097': 'paragraf', 'DAJ-TWK-098': 'paragraf',
  'DAJ-TWK-099': 'kaidah', 'DAJ-TWK-100': 'kaidah', 'DAJ-TWK-101': 'kaidah',
};
const fresh = () => ({
  meta: { jumlah_soal: 30 },
  // soal Bahasa v1.6 tanpa bentuk tegangan
  soal: ids.map((id) => ({ ...structuredClone(byId[id]), ...(rumpun[id] && { rumpun: rumpun[id], bentuk_tegangan: null }) })),
});

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uji-twk-'));
const run = (pkg, versi = '1.6') => {
  const file = path.join(dir, 'paket.json');
  fs.writeFileSync(file, JSON.stringify(pkg));
  const out = spawnSync('node', [validator, file, `--versi=${versi}`], { encoding: 'utf8' });
  return { code: out.status, errors: JSON.parse(out.stdout).errors };
};
const mustFail = (name, mutate, pattern) => {
  const pkg = fresh();
  mutate(pkg.soal);
  const { code, errors } = run(pkg);
  assert.equal(code, 1, `${name}: harus gagal`);
  assert.ok(errors.some((e) => pattern.test(e)), `${name}: error tidak muncul, dapat ${JSON.stringify(errors)}`);
  console.log(`ok  gagal sesuai harapan: ${name}`);
};
const find = (soal, id) => soal.find((q) => q.id === id);

// 1. paket contoh lolos v1.6
const base = run(fresh());
assert.deepEqual(base.errors, [], `paket contoh harus 0 error, dapat ${JSON.stringify(base.errors)}`);
console.log('ok  paket contoh 30 soal lolos v1.6');

// 2. yang boleh di v1.6 tetap lolos: T6, opsi kaidah berupa satu kata, Bahasa tanpa dua sisi
{
  const pkg = fresh();
  find(pkg.soal, 'DAJ-TWK-023').bentuk_tegangan = 'T6';
  const k = find(pkg.soal, 'DAJ-TWK-099');
  k.opsi = { A: 'Senin', B: 'Barat', C: 'Selatan', D: 'Kementerian', E: 'Danau' };
  const p = find(pkg.soal, 'DAJ-TWK-096');
  delete p.konstruk_dua_kutub;
  delete p.bentuk_tegangan;
  assert.deepEqual(run(pkg).errors, [], 'T6 / opsi kaidah pendek / Bahasa tanpa dua sisi harus lolos');
  console.log('ok  T6, opsi kaidah pendek, Bahasa tanpa dua sisi diterima');
}

// 3. tiap pelanggaran v1.6 harus gagal
mustFail('grid tema', (s) => { find(s, 'DAJ-TWK-023').tema = 'Nasionalisme & bela negara'; }, /theme distribution/);
mustFail('Bahasa 2 paragraf + 4 kaidah', (s) => { find(s, 'DAJ-TWK-096').rumpun = 'kaidah'; }, /3 paragraf \+ 3 kaidah/);
mustFail('soal Bahasa tanpa rumpun', (s) => { delete find(s, 'DAJ-TWK-097').rumpun; }, /rumpun must be/);
mustFail('E7 lebih dari 2', (s) => { find(s, 'DAJ-TWK-023').tipe_kode = 'E7'; }, /E7 pernyataan bernomor/);
mustFail('kode D9 di pembahasan siswa', (s) => { find(s, 'DAJ-TWK-023').pembahasan += ' Opsi ini D9.'; }, /jargon: D9/);
mustFail('kode T6 di pembahasan siswa', (s) => { find(s, 'DAJ-TWK-023').pembahasan += ' Bentuk T6.'; }, /jargon: T6/);
mustFail('kunci kembar', (s) => {
  const a = find(s, 'DAJ-TWK-023');
  const b = find(s, 'DAJ-TWK-012');
  b.opsi[b.kunci] = a.opsi[a.kunci];
}, /same key text/);
mustFail('level tidak 6/15/9', (s) => { find(s, 'DAJ-TWK-023').level_kognitif = 'C5'; }, /level distribution/);
mustFail('kunci lebih dari 7 per huruf', (s) => {
  for (const id of ['DAJ-TWK-023', 'DAJ-TWK-007']) {
    const q = find(s, id);
    [q.opsi.E, q.opsi[q.kunci]] = [q.opsi[q.kunci], q.opsi.E];
    [q.analisis_opsi.E, q.analisis_opsi[q.kunci]] = [q.analisis_opsi[q.kunci], q.analisis_opsi.E];
    q.kunci = 'E';
  }
}, /key distribution outside 4-7/);
mustFail('distraktor tanpa kode D1-D10', (s) => {
  const q = find(s, 'DAJ-TWK-023');
  const other = ['A', 'B', 'C', 'D', 'E'].find((l) => l !== q.kunci);
  q.analisis_opsi[other] = 'Opsi ini kurang tepat.';
}, /lacks D1-D10/);

// 4. bank 101 v1.5 (tanpa argumen versi) tetap 0 error
const v15 = spawnSync('node', [validator, 'bank_soal_100.json'], { encoding: 'utf8' });
assert.equal(v15.status, 0, 'bank 101 v1.5 harus tetap 0 error');
assert.deepEqual(JSON.parse(v15.stdout).errors, []);
console.log('ok  bank 101 v1.5 tetap 0 error');

fs.rmSync(dir, { recursive: true });
console.log('SEMUA UJI LULUS');
