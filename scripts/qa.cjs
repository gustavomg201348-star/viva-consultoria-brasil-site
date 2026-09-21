const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:8765";
const routes = [
  "/",
  "/sobre.html",
  "/servicos.html",
  "/contato.html",
  "/politica-de-privacidade/",
  "/termos-de-uso/",
  "/exclusao-de-dados/"
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });
  const outDir = path.join(__dirname, "..", "tmp");
  fs.mkdirSync(outDir, { recursive: true });
  const failures = [];

  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src));
    if (!response || !response.ok() || overflow || brokenImages.length || errors.length) {
      failures.push({ route, status: response && response.status(), overflow, brokenImages, errors });
    }
    await page.close();
  }

  for (const [name, viewport] of Object.entries({ desktop: { width: 1365, height: 900 }, mobile: { width: 390, height: 844 } })) {
    const page = await browser.newPage({ viewport });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(outDir, `qa-${name}.png`), fullPage: true });
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      heroHeight: document.querySelector(".hero")?.getBoundingClientRect().height,
      menuVisible: getComputedStyle(document.querySelector(".main-menu")).display
    }));
    if (name === "mobile") {
      await page.locator(".menu-toggle").click();
      const expanded = await page.locator(".menu-toggle").getAttribute("aria-expanded");
      const mobileMenuDisplay = await page.locator(".main-menu").evaluate((element) => getComputedStyle(element).display);
      if (expanded !== "true" || mobileMenuDisplay === "none") {
        failures.push({ route: "/", mobileMenu: { expanded, display: mobileMenuDisplay } });
      }
    }
    console.log(name.toUpperCase(), JSON.stringify(metrics));
    await page.close();
  }

  await browser.close();
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log(`PASS ${routes.length} routes`);
})();
