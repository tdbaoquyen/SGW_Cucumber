import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../../src/configs/hooks";
import { commonText, EstimatedYear, ListInfoFields } from "../../src/helper/enums";
import * as common from "../../src/helper/common.json";
import assert from "assert";
import { CommonActions } from "../../src/helper/commonActions";
import { HomePage } from "../../src/helper/pageSelectors/homePage";
import { SupportSelectors } from "../../src/helper/pageSelectors/supportCalculator";
import { BenefitsSelectors } from "../../src/helper/pageSelectors/estimatedBenefits";
import { LowIncome, ElderHouseHold, ManyChildren, YoungHouseHold } from "../../src/configs/data/data";

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
    const listFields = [
        ListInfoFields.YearOfBirth,
        ListInfoFields.HousingType,
        ListInfoFields.PropertyOwnership,
        ListInfoFields.MoreThan1Property,
    ];
    for(const field of listFields){
        await page.hover(SupportSelectors.FIELDSET_LABEL(field));
        if(await page.isVisible(SupportSelectors.FILEDSET_DEFAULT(field))){
            assert.equal(
                commonText.DEFAUL_OPTION,
                await commonActions.getText(SupportSelectors.FILEDSET_DEFAULT(field)),
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
        await page.isVisible(BenefitsSelectors.ESTIMATED_BENEFITS_PAGE_TITLE),
        false,
        `FAIL REASON: The '${common.TITLE.ESTIMATED_BENEFITS_PAGE_TITLE}' page is displayed!!`
    );
    console.log(`===== SUCCESS: The ${common.TITLE.ESTIMATED_BENEFITS_PAGE_TITLE} page is not loaded!`);
    assert.equal(
        await page.isVisible(SupportSelectors.SUPPORT_CALCULATOR_TITLE),
        true,
        `FAIL REASON: The '${common.TITLE.SUPPORT_CALCULATOR_TITLE}' page is not displayed!!`
    );
    console.log(`===== SUCCESS: The ${common.TITLE.SUPPORT_CALCULATOR_TITLE} page is not loaded!`);
})

Then ( 'I back to homepage', async () => {
    await page.hover(HomePage.LOGO_HOMEPAGE);
    await page.click(HomePage.LOGO_HOMEPAGE, { timeout : common.WAIT_TIMEOUT});
    await commonActions.isDisplayed(HomePage.FEATURED_RESOURCES_TITLE);
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_CALCULATOR_TITLE));
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.CARE_SERVICES_TITLE));
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_RECOMMENDER_TITLE));
    console.log(`===== SUCCESS: The ${common.TITLE.FEATURES_TITLE} title is not loaded!`);
})

When ( 'I enter household information as {string}', async (scheme : string) => {
    await page.hover(SupportSelectors.START_BUTTON);
    await page.click(SupportSelectors.START_BUTTON);

    switch (scheme) {
        case LowIncome.schemes :
            await commonActions.enterFamilyWithLowTotalIncome();
            break;
        case ElderHouseHold.schemes :
            await commonActions.enterFamilyHavingElderlyPersonData();
            break;
        case ManyChildren.schemes :
            await commonActions.enterFamilyHavingManyChildrensData();
            break;
        case YoungHouseHold.schemes :
            await commonActions.enterFinancialPlanForYoungPeopleData();
            break;
        default :
            throw new Error(`Unknown scheme: ${scheme}`);
    }
})

When ( 'I click the show estimated benefits button', async () => {
    await page.hover(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
    assert.equal(
        await page.isEnabled(SupportSelectors.SHOW_ESTIMATED_BENEFITS),
        true,
        `FAIL REASON: This '${commonText.BUTTON_SHOW_BENEFITS} button is not displayed!!`
    )
    await page.click(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
    console.log(`===== SUCCESS: Click the ${commonText.BUTTON_SHOW_BENEFITS} button`);
});

// Then ( 'I should see the {string}', async (expectedResult:string) => {   
//     switch (expectedResult) {
//         case LowIncome.type :
//             await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2025);
//             break;
//         case ElderHouseHold.type :
//             await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2025);
//             break;
//         case ManyChildren.type :
//             await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2025);
//             break;
//         case YoungHouseHold.type : 
//             await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2025);
//             break;
//         default :
//             throw new Error(`Unknown expected result: ${expectedResult}`);
//     }
// });

When ( 'I enter household information with Low total income scheme', async () => {
    await page.hover(SupportSelectors.START_BUTTON);
    await page.click(SupportSelectors.START_BUTTON);

    await commonActions.enterFamilyWithLowTotalIncome();
});

Then ( 'I should see the Estimated Benefits page', async () => {
    await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2025);
    await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2026);
    await commonActions.verifyIndividualBenefits(EstimatedYear.YEAR_2027);
})




