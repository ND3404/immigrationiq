#!/usr/bin/env node
// Generates public/og-visa-bulletin.png — the 1200×630 Open Graph card shown
// when the /visa-bulletin page is shared. Placeholder built from brand assets
// (navy gradient + IQ monogram + red underline). Rerun to regenerate:
//   node scripts/gen-og-image.mjs
import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const W = 1200, H = 630;
const NAVY_900 = '#000f3d', NAVY_800 = '#001951', NAVY_500 = '#003087', RED = '#B22234';

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background: diagonal navy gradient.
const grad = ctx.createLinearGradient(0, 0, W, H);
grad.addColorStop(0, NAVY_900);
grad.addColorStop(0.55, NAVY_800);
grad.addColorStop(1, NAVY_500);
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

// Subtle top accent bar (red).
ctx.fillStyle = RED;
ctx.fillRect(0, 0, W, 10);

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// IQ monogram box, centered horizontally near the top.
const boxSize = 150, boxX = (W - boxSize) / 2, boxY = 90;
ctx.fillStyle = 'rgba(255,255,255,0.10)';
roundRect(boxX, boxY, boxSize, boxSize, 28);
ctx.fill();
ctx.strokeStyle = 'rgba(255,255,255,0.35)';
ctx.lineWidth = 2;
roundRect(boxX, boxY, boxSize, boxSize, 28);
ctx.stroke();

ctx.fillStyle = '#ffffff';
ctx.font = 'bold 78px Georgia, "Times New Roman", serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('IQ', W / 2, boxY + boxSize / 2 - 8);
// Red underline under the monogram.
ctx.fillStyle = RED;
roundRect(boxX + 35, boxY + boxSize - 30, boxSize - 70, 7, 3.5);
ctx.fill();

// Title.
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 96px Arial, "Helvetica Neue", sans-serif';
ctx.fillText('Visa Bulletin', W / 2, 340);

// Subtitle.
ctx.fillStyle = '#9db8e8';
ctx.font = '34px Arial, "Helvetica Neue", sans-serif';
ctx.fillText('Priority dates & USCIS filing charts, updated monthly', W / 2, 415);

// Footer wordmark.
ctx.font = 'bold 32px Georgia, serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('ImmigrationIQ', W / 2, 545);
ctx.font = '26px Arial, sans-serif';
ctx.fillStyle = '#7f9ad6';
ctx.fillText('immigrationiq.us', W / 2, 585);

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og-visa-bulletin.png');
writeFileSync(out, canvas.toBuffer('image/png'));
console.log(`Wrote ${out} (${W}×${H})`);
