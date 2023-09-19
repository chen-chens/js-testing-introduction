const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("Expect: Output name and age string", () => {
    const testOutput = generateText("Joanna", 18);
    expect(testOutput).toBe("Joanna (18 years old)");
});

test("Expect: input string w/ undefined", () => {
    const testOutput = generateText();
    expect(testOutput).toBe("undefined (undefined years old)");
});

test("Expect: checkValue & return results", () => {
    const testOutput1 = checkAndGenerate("Joanna", 18);
    expect(testOutput1).toBe("Joanna (18 years old)")

    const testOutput2 = checkAndGenerate();
    expect(testOutput2).toBe(false);
});

test("Expect: user type inputs & click to get results", async () => {
    const browser = await puppeteer.launch({
        slowMo: 80,
        headless: false, // 代表我想看到 puppeteer 開啟 瀏覽器 的 GUI
    });

    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html"); // 帶入 Live Demo 路徑，或 檔案路徑
    await page.click("input#name");
    await page.type("input#name", "Joanna");
    await page.click("input#age");
    await page.type("input#age", '18');
    await page.click("button#btnAddUser");

    const textContent = await page.$eval(".user-item", el => el.textContent);
    expect(textContent).toBe("Joanna (18 years old)");
});