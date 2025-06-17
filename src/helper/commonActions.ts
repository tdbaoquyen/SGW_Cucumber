import assert from "assert";
import { Page } from '@playwright/test';
import { page } from "../configs/hooks";
import * as common from "../../src/helper/common.json";

export class CommonActions {
    // constructor(private page: Page = page) {}

    public async getElement(location:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        return await page.locator(location);
    };

    public async getText(location:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        const element = await page.locator(location);
        return await element.innerText();
    };

    public async click(location:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        const element = await page.locator(location);
        await element.waitFor({ state : "visible"});
        await element.click();
    };

    public async type(location:string, value:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        await page.fill(location, value);
        await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    };

    public async selectOption(location:string, option:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        await page.selectOption(location, option);
        await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    }

    async isDisplayed(location:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
            `FAIL REASON: This element is not displayed!!`
        )
    }

    public async scrollToView(location:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        await page.locator(location).scrollIntoViewIfNeeded();
        await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    };

}