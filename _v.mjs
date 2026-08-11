import { chromium } from "playwright-core";
const OUT = "/tmp/claude-0/-home-user-bonitosound/65d89385-6c10-5815-9cd4-228c8493aeb0/scratchpad";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const errs = [];
for (const [w, h, tag] of [[1280, 900, "desk"], [390, 844, "mob"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on("pageerror", (e) => errs.push(`${tag}: ${e}`));
  page.on("console", (m) => { if (m.type() === "error") errs.push(`${tag}: ${m.text()}`); });
  await page.goto("http://localhost:3411/experiencias", { waitUntil: "load", timeout: 25000 });
  await page.waitForTimeout(1500);
  const ovf = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ovf > 2) errs.push(`${tag}: OVERFLOW ${ovf}px`);
  await page.screenshot({ path: `${OUT}/ea_${tag}.png` });
  await page.close();
}
await browser.close();
console.log(errs.length ? errs.join("\n") : "sin errores");
