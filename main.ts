// News image entry: copy the front page we drew for 25 November 2026 to /output/entry.png.
// Node 22, standard library only. Deterministic: the same bytes in, the same bytes out.
// The copy is verified byte for byte: a partial or mismatched write fails loudly
// instead of handing the judge a broken image.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

const sha = (p: string) => createHash("sha256").update(readFileSync(p)).digest("hex");
if (sha(src) !== sha(dst)) {
  throw new Error("news image: output bytes differ from entry.png");
}
console.log(`news image: wrote entry.png (${readFileSync(dst).length} bytes, sha256 ${sha(dst).slice(0, 12)}…)`);
