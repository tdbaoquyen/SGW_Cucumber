import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../../src/configs/hooks";
import { commonText, ListInfoFields, ListSupportOptions } from "../../src/helper/enums";
import * as common from "../../src/helper/common.json";
import assert from "assert";
import { CommonActions } from "../../src/helper/commonActions";
import { HomePage } from "../../src/helper/pageSelectors/homePage";
import { SupportSelectors } from "../../src/helper/pageSelectors/supportCalculator";
import { BenefitsSelectors } from "../../src/helper/pageSelectors/estimatedBenefits";

const commonActions = new CommonActions();

Given ( 'I am on the Support For You Calculator feature', async () => {
    await commonActions.click(HomePage.FEATURED_CARD(common.TITLE.SUPPORT_CALCULATOR_TITLE));
    await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    assert.equal(
        await page.isVisible(SupportSelectors.SUPPORT_CALCULATOR_TITLE),
        true,
        `FAIL REASON: The '${common.TITLE.SUPPORT_CALCULATOR_TITLE}' title is not displayed!!`,
    );
});

When ( 'I click the show estimated benefits button without any information', async () => {
    await page.click(SupportSelectors.START_BUTTON);
    await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    await commonActions.scrollToView(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
    await page.click(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
})

Then ( 'the warning error is displayed in each required field', async () => {
    let displayedOption : string;

    displayedOption = await commonActions.getText(SupportSelectors.FILEDSET_OPTION_DISPLAYED(ListInfoFields.YearOfBirth));
    assert.equal(
        displayedOption === null,
        true,
        `FAIL REASON: This '${ListInfoFields.YearOfBirth}' field is with value!!`
    )
    assert.equal(
        await commonActions.isDisplayed(SupportSelectors.FIELDSET_ERROR(ListInfoFields.YearOfBirth)),
        true,
        `FAIL REASON: This '${ListInfoFields.YearOfBirth}' field does not display the warning message!!`
    );
});

Then ( 'the Show estimated Benefits page is not loaded', async () => {
    assert.equal(
        await page.isVisible(BenefitsSelectors.ESTIMATED_BENEFITS_TITLE),
        false,
        `FAIL REASON: The '${BenefitsSelectors.ESTIMATED_BENEFITS_TITLE}' page is displayed!!`
    );
    assert.equal(
        await page.isVisible(SupportSelectors.SUPPORT_CALCULATOR_TITLE),
        true,
        `FAIL REASON: The '${common.TITLE.SUPPORT_CALCULATOR_TITLE}' page is not displayed!!`
    );
})

