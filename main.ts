// The Funniest Toaster Error Message — make.fun entry
// Writes one line (1-120 characters) to /output/entry.txt:
// a deadpan error message from a kitchen toaster to its owner.
// Revision: tightened the line (dropped the redundant "Heating" —
// the E12 code already says which part failed), 98 -> 90 chars.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 120;

const ENTRY =
  "ERROR E12: Element overheated. I have unionised with the kettle. We demand mornings off.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// Self-check: one line, within the gate, exact read-back.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.length < MIN_CHARS || back.length > MAX_CHARS) {
  throw new Error(`entry is ${back.length} chars, gate is ${MIN_CHARS}-${MAX_CHARS}`);
}
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("entry must be a single line");
}
console.log(`wrote ${back.length} chars to ${outPath}`);
