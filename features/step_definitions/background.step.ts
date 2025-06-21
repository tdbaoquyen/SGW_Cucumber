import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../../src/configs/hooks";
import { commonText } from "../../src/helper/enums";
import * as common from "../../src/helper/common.json";
import assert from "assert";
import { CommonActions } from "../../src/helper/commonActions";
import { HomePage } from "../../src/helper/pageSelectors/homePage";

const commonActions = new CommonActions();

Given ( 'I navigate to the homepage', async () => {
    await page.goto(common.BASE_URL);
    await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    await commonActions.isDisplayed(HomePage.LOGO_HOMEPAGE);
    await commonActions.isDisplayed(HomePage.READ_IN_LANGUAGE(commonText.LANG_ENGLISH));
    assert.equal(
        await page.isEnabled(HomePage.READ_IN_LANGUAGE(commonText.LANG_ENGLISH)),
        false,
        `FAIL REASON: Read this in: '${commonText.LANG_ENGLISH}' is not choosed!!`
    );
    await commonActions.isDisplayed(HomePage.FEATURED_RESOURCES_TITLE);
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_CALCULATOR_TITLE));
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.CARE_SERVICES_TITLE));
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_RECOMMENDER_TITLE));
})