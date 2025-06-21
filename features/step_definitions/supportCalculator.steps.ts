import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../../src/configs/hooks";
import { commonText, ListInfoFields, ListSupportOptions } from "../../src/helper/enums";
import * as common from "../../src/helper/common.json";
import assert from "assert";
import { CommonActions } from "../../src/helper/commonActions";
import { HomePage } from "../../src/helper/pageSelectors/homePage";
import { SupportSelectors } from "../../src/helper/pageSelectors/supportCalculator";
import { BenefitsSelectors } from "../../src/helper/pageSelectors/estimatedBenefits";
import { LowIncome } from "../../src/configs/data/data";
import * as testData from "../../src/configs/data/testData.json";

const commonActions = new CommonActions();
// const lowIncome = testData.schemes["Family with low total income"];
// const elderHouseHold = testData.schemes["Family having elderly person"];
// const manyChildren = testData.schemes["Family having many childrens"];
// const youngHouseHold = testData.schemes["Financial plan for Young people"];

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

Then ( 'I back to homepage', async () => {
    await page.hover(HomePage.LOGO_HOMEPAGE);
    await page.click(HomePage.LOGO_HOMEPAGE, { timeout : common.WAIT_TIMEOUT});
    await commonActions.isDisplayed(HomePage.FEATURED_RESOURCES_TITLE);
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_CALCULATOR_TITLE));
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.CARE_SERVICES_TITLE));
    await commonActions.isDisplayed(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_RECOMMENDER_TITLE));
    console.log(`===== SUCCESS: The ${common.TITLE.FEATURES_TITLE} title is not loaded!`);
})

// When ( 'I enter household information as {string}', async (scheme : string) => {
//     await page.hover(SupportSelectors.START_BUTTON);
//     await page.click(SupportSelectors.START_BUTTON);

//     switch (scheme) {
//         case lowIncome.expectedResult.schemes :
//             await commonActions.enterFamilyWithLowTotalIncome();
//             break;
//         case elderHouseHold.expectedResult.schemes :
//             await commonActions.enterFamilyHavingElderlyPersonData();
//             break;
//         case manyChildren.expectedResult.schemes :
//             await commonActions.enterFamilyHavingManyChildrensData();
//             break;
//         case youngHouseHold.expectedResult.schemes :
//             await commonActions.enterFinancialPlanForYoungPeopleData();
//             break;
//         default :
//             throw new Error(`Unknown scheme: ${scheme}`);
//     }
// })

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
//     await page.waitForSelector(BenefitsSelectors.BENEFITS_INDIVIDUAL_SUMMARY(
//         common.LABEL.YOUR_INDIVIDUAL_BENEFITS), { timeout : common.WAIT_TIMEOUT});
    
//     switch (expectedResult) {
//         case lowIncome.expectedResult.type :
//             await commonActions.verifyIndividualBenefits(lowIncome.expectedResult.individualBenefits);
//             break;
//         case elderHouseHold.expectedResult.type :
//             await commonActions.verifyIndividualBenefits(elderHouseHold.expectedResult.individualBenefits);
//             break;
//         case manyChildren.expectedResult.type :
//             await commonActions.verifyIndividualBenefits(manyChildren.expectedResult.individualBenefits);
//             break;
//         case youngHouseHold.expectedResult.type : 
//             await commonActions.verifyIndividualBenefits(youngHouseHold.expectedResult.individualBenefits);
//             break;
//         default :
//             throw new Error(`Unknown expected result: ${expectedResult}`);
//     }
// })

When ( 'I enter household information with valid values', async () => {
    await page.hover(SupportSelectors.START_BUTTON);
    await page.click(SupportSelectors.START_BUTTON);

    await commonActions.selectValue(ListInfoFields.YearOfBirth, LowIncome.yearOfBirth);
    // await page.fill(`${SupportSelectors.FIELDSET_SELECT(ListInfoFields.YearOfBirth)}//input`, LowIncome.yearOfBirth);
    // await page.click(SupportSelectors.FIELDSET_OPTION(ListInfoFields.YearOfBirth, LowIncome.yearOfBirth));
    // await page.waitForTimeout(3000);
    
    // await page.hover(SupportSelectors.FIELDSET_SELECT(ListInfoFields.AssessableIncome));
    // const recentIncome = await page.locator(SupportSelectors.FIELDSET_LISTBOX(ListInfoFields.AssessableIncome));
    // await recentIncome.selectOption(LowIncome.recentAssessableIncome, { timeout : common.SHORT_WAIT_TIMEOUT });

    await commonActions.selectChoice(ListInfoFields.HousingType, LowIncome.housingType);
    await commonActions.selectChoice(ListInfoFields.PropertyOwnership, LowIncome.propertyOwnership);
    await commonActions.selectYesNo(ListInfoFields.MoreThan1Property, LowIncome.ownMoreThanOneProperty);
    await page.hover(SupportSelectors.ADD_MEMBER);
    await page.click(SupportSelectors.ADD_MEMBER);
    await commonActions.selectMemberValue(LowIncome.member, ListInfoFields.YearOfBirth, LowIncome.mem_yearOfBirth);
    await commonActions.selectMemberValue(LowIncome.member, ListInfoFields.AssessableIncome, LowIncome.mem_recentAssessableIncome);
});

Then ( 'I should see the Estimated Benefits page', async () => {
    await commonActions.verifyIndividualBenefits(LowIncome.individualBenefits);
})




