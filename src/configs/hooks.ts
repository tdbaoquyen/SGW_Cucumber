import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";
import * as common from "../../src/helper/common.json";

let browser : Browser;
let page : Page;

BeforeAll (async function () {
    browser = await chromium.launch({
        headless : false,
        slowMo : 1000
    });
});

Before (async function (scenario) {
    page = await browser.newPage({
        viewport: { width: 1820 , height : 900},
        recordVideo: {
            dir: `./reports/videos/` + scenario.pickle.name
        }
    });
    await page.setDefaultTimeout(60*1000);
    await page.goto(common.BASE_URL);
});

After (async function (scenario) {
    const scenarioStatus = scenario.result?.status;
    if(scenarioStatus === "FAILED"){
        const image = await page.screenshot({
            path: `./reports/screenshots/${scenario.pickle.name}.png` 
        });
        await this.attach(image, 'image/png')
    }
    // await page.close();
});

AfterAll (async function () {
    await browser.close();
});

export { page };
