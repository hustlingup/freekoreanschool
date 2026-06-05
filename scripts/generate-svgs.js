import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MODEL = 'claude-haiku-4-5-20251001';
const SAMPLES_ONLY = process.argv.includes('--samples-only');

const manifest = JSON.parse(await readFile(resolve(__dirname, 'image-manifest.json'), 'utf8'));
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function generateSVG(prompt) {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 3000,
    messages: [{
      role: 'user',
      content: `${prompt}\n\nIMPORTANT: Output ONLY valid SVG code. Start directly with <svg. Do NOT use markdown code blocks. Do NOT add any explanation before or after the SVG.`
    }]
  });
  const text = msg.content[0].text.trim();
  const match = text.match(/<svg[\s\S]*<\/svg>/i);
  return match ? match[0] : text;
}

const allEntries = [...(manifest.indexed || []), ...(manifest.foodBg || [])];
const entriesToProcess = SAMPLES_ONLY
  ? allEntries.filter(e => e.isSample)
  : allEntries;

console.log(`\nGenerating ${entriesToProcess.length} SVG${entriesToProcess.length !== 1 ? 's' : ''}${SAMPLES_ONLY ? ' (samples only)' : ''}...\n`);

let generated = 0;
let skipped = 0;
let failed = 0;

for (const entry of entriesToProcess) {
  const outPath = resolve(ROOT, entry.svgPath);

  if (await fileExists(outPath)) {
    console.log(`⏭  ${entry.id} (already exists)`);
    skipped++;
    continue;
  }

  await mkdir(dirname(outPath), { recursive: true });

  try {
    const svg = await generateSVG(entry.prompt);
    await writeFile(outPath, svg, 'utf8');
    const size = (svg.length / 1024).toFixed(1);
    console.log(`✓  ${entry.id}  (${size} KB)`);
    generated++;
  } catch (err) {
    console.error(`✗  ${entry.id}: ${err.message}`);
    failed++;
  }

  await new Promise(r => setTimeout(r, 600));
}

console.log(`\n─────────────────────────────────────`);
console.log(`Generated: ${generated}  Skipped: ${skipped}  Failed: ${failed}`);

if (SAMPLES_ONLY) {
  console.log(`\nSamples saved to assets/images/`);
  console.log(`Open them in a browser to review the visual style.`);
  console.log(`If the style looks good, run: node scripts/generate-svgs.js`);
  console.log(`If adjustments needed, edit the prompts in image-manifest.json and re-run with --samples-only.`);
}
