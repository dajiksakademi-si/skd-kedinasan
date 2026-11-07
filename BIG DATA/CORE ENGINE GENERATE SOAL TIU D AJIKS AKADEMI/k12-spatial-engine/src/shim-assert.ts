// Pengganti node:assert/strict untuk versi browser (mockup). Pesan galat sama, jadi aturan dasar tetap ditegakkan.
function assert(c: unknown, m?: string): asserts c { if (!c) throw new Error(m ?? "syarat tidak terpenuhi"); }
assert.ok = assert;
assert.equal = (a: unknown, b: unknown, m?: string) => { if (a !== b) throw new Error(m ?? `${a} ≠ ${b}`); };
assert.notEqual = (a: unknown, b: unknown, m?: string) => { if (a === b) throw new Error(m ?? `${a} = ${b}`); };
export default assert;
