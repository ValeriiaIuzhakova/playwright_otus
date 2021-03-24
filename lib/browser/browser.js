import playwright from 'playwright';

let browser;
let context;
let page;

async function launch() {
    browser = await playwright.chromium.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

    });
    context = await browser.newContext();
    page = await context.newPage();

    return {
        browser,
        context,
        page,
    };
}

async function login() {
    await page.goto('https://app.pipedrive.com/auth/login');

    await page.fill('[data-test="login"]', 'sv-2007@rambler.ru');
    await page.fill('[data-test="password"]', 'aB123456');
    await page.click('[data-test="submit-button"]');
}

async function closeAll() {
    await page.close();
    await browser.close();
}

export {
    launch,
    login,
    closeAll,
};
