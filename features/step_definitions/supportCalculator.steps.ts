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
    await page.hover(HomePage.FEATURED_CARD(common.TITLE.SUPPORT_CALCULATOR_TITLE));
    await page.click(HomePage.FEATURED_CARD(common.TITLE.SUPPORT_CALCULATOR_TITLE), {
        timeout : common.WAIT_TIMEOUT,
    });
    assert.equal(
        await page.isVisible(SupportSelectors.SUPPORT_CALCULATOR_TITLE),
        true,
        `FAIL REASON: The '${common.TITLE.SUPPORT_CALCULATOR_TITLE}' title is not displayed!!`,
    );
    console.log(`===== SUCCESS: Navigate to the ${common.TITLE.SUPPORT_CALCULATOR_TITLE} page`);
})

When ( 'I click the show estimated benefits button without any information', async () => {
    await page.hover(SupportSelectors.START_BUTTON);
    await page.click(SupportSelectors.START_BUTTON);
    await page.hover(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
    assert.equal(
        await page.isEnabled(SupportSelectors.SHOW_ESTIMATED_BENEFITS),
        true,
        `FAIL REASON: This '${commonText.BUTTON_SHOW_BENEFITS} button is not displayed!!`
    )
    await page.click(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
    console.log(`===== SUCCESS: Click the ${commonText.BUTTON_SHOW_BENEFITS} button`);
})

Then ( 'the warning error is displayed in each required field', async () => {
    let displayedOption : string;
    const listFields = [
        ListInfoFields.YearOfBirth,
        ListInfoFields.HousingType,
        ListInfoFields.PropertyOwnership,
        ListInfoFields.MoreThan1Property,
    ];
    for(const field of listFields){
        await page.hover(SupportSelectors.FIELDSET_LABEL(field));
        if(await page.isVisible(SupportSelectors.FILEDSET_OPTION_DISPLAYED(field))){
            displayedOption = await commonActions.getText(SupportSelectors.FILEDSET_OPTION_DISPLAYED(field));
            assert.equal(
                displayedOption === commonText.DEFAUL_OPTION,
                true,
                `FAIL REASON: This '${field}' field is with value!!`
                )
            }
        assert.equal(
            await page.isVisible(SupportSelectors.FIELDSET_ERROR(field)),
            true,
            `FAIL REASON: This '${field}' field does not display the warning message!!`
            );
        console.log(`===== SUCCESS: The ${field} field displays warning message!`);
    }
    
})

Then ( 'the Show estimated Benefits page is not loaded', async () => {
    assert.equal(
        await page.isVisible(BenefitsSelectors.ESTIMATED_BENEFITS_TITLE),
        false,
        `FAIL REASON: The '${common.TITLE.ESTIMATED_BENEFITS_TITLE}' page is displayed!!`
    );
    console.log(`===== SUCCESS: The ${common.TITLE.ESTIMATED_BENEFITS_TITLE} page is not loaded!`);
    assert.equal(
        await page.isVisible(SupportSelectors.SUPPORT_CALCULATOR_TITLE),
        true,
        `FAIL REASON: The '${common.TITLE.SUPPORT_CALCULATOR_TITLE}' page is not displayed!!`
    );
    console.log(`===== SUCCESS: The ${common.TITLE.SUPPORT_CALCULATOR_TITLE} page is not loaded!`);
})

