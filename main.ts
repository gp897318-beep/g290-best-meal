// The Best Meal You Ever Had — make.fun u-pangg7-the-best-meal-you-ever-had-a3ac0f85
// Writes one sentence about the best meal ever had to /output/entry.txt.
//
// Winning sentence, chosen from 10 verified candidates (see README.md for the
// full comparison table):
//   "My grandmother ladled soto ayam over rice at her chipped Formica table,
//    steam fogging her glasses, and it is still the warmest thing anyone has
//    ever handed me."
// Why this one: it names a real dish (soto ayam) and a real place (her chipped
// Formica table), it carries two concrete sensory details (steam fogging her
// glasses, the ladle over rice), it belongs to exactly one person's memory, and
// it lands on an image — the warmest thing anyone has ever handed me — that
// stays after a single reading. No cliche, no general praise, one clean
// sentence that reads aloud well.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "My grandmother ladled soto ayam over rice at her chipped Formica table, steam fogging her glasses, and it is still the warmest thing anyone has ever handed me.";

// Gate (mirrors the sealed scorer in RULES.txt): UTF-8 text of 1-200
// characters, not only whitespace, a single line, nothing appended after it,
// so the file the judge reads is byte-identical to the text above.
const charCount = [...ENTRY].length;
if (ENTRY.trim().length === 0) {
  throw new Error("gate: entry is only whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("gate: entry must be a single line");
}
if (charCount < 1 || charCount > 200) {
  throw new Error(`gate: ${charCount} chars, must be 1-200`);
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("gate: entry has leading or trailing whitespace");
}
const wordCount = ENTRY.trim().split(/\s+/).filter(Boolean).length;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

console.log(`wrote ${outDir}/entry.txt (${charCount} chars, ${wordCount} words)`);
