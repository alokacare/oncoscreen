import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.SHOWCASE_URL || 'http://127.0.0.1:4179';
const output = path.resolve(import.meta.dirname, '../public/media');
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const pause = (ms) => page.waitForTimeout(ms);

await page.goto(baseUrl, { waitUntil: 'networkidle' });
await page.screenshot({ path: path.join(output, '01-overview.png') });
await pause(1500);
await page.getByRole('button', { name: /Launch synthetic walkthrough/i }).click();
await pause(1200);
await page.screenshot({ path: path.join(output, '02-patient.png') });
await page.getByRole('button', { name: 'Yes' }).first().click();
await pause(850);
await page.getByRole('button', { name: 'No' }).click();
await pause(850);
await page.getByRole('button', { name: 'Yes' }).first().click();
await pause(1000);
await page.getByRole('button', { name: /Submit for professional review/i }).click();
await pause(1400);
await page.getByRole('button', { name: 'Technician' }).click();
await pause(1400);
await page.screenshot({ path: path.join(output, '03-operations.png') });
await page.getByRole('button', { name: 'Clinician' }).click();
await pause(1500);
await page.screenshot({ path: path.join(output, '04-review.png') });
await page.getByRole('button', { name: /Request follow-up/i }).click();
await pause(1200);
await page.getByRole('button', { name: 'Audit' }).click();
await pause(1500);
await page.screenshot({ path: path.join(output, '05-audit.png') });
await pause(1200);
await page.getByRole('button', { name: 'AI Roadmap' }).click();
await pause(1500);
await page.screenshot({ path: path.join(output, '06-ai-roadmap.png'), fullPage: true });
await pause(1200);

await context.close();

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
await mobilePage.getByRole('button', { name: /Launch synthetic walkthrough/i }).click();
await mobilePage.waitForTimeout(600);
await mobilePage.screenshot({ path: path.join(output, '07-mobile.png'), fullPage: true });
await mobileContext.close();
await browser.close();
console.log(`Media written to ${output}`);
