// import { page } from "../src/configs/hooks";
import { test, type Page } from '@playwright/test';
import assert from "assert";
import { LowIncome } from "../src/configs/data/data";
import { commonText, ListInfoFields } from "../src/helper/enums";
import * as common from "../src/helper/common.json";
import { CommonActions } from "../src/helper/commonActions";
import { HomePage } from "../src/helper/pageSelectors/homePage";
import { SupportSelectors } from "../src/helper/pageSelectors/supportCalculator";
import { BenefitsSelectors } from "../src/helper/pageSelectors/estimatedBenefits";


test.beforeEach ( async ({page}) => {
    await page.goto(common.BASE_URL, {
        waitUntil : "domcontentloaded"
    });   
});

test.afterAll( async ({page}) => {
    await page.close();
});

test.describe ( "Get estimated benefits with valid various schemes", () => {
    test( "Get estimated benefits with scheme 'Family with low total income' ", async ({page}) => {
        // access to homepage
        await page.isVisible(HomePage.LOGO_HOMEPAGE);
        await page.isVisible(HomePage.READ_IN_LANGUAGE(commonText.LANG_ENGLISH));
        assert.equal(
            await page.isDisabled(HomePage.READ_IN_LANGUAGE(commonText.LANG_ENGLISH)),
            true,
            `FAIL REASON: Read this in: '${commonText.LANG_ENGLISH}' is not choosed!!`
        );
        await page.isVisible(HomePage.FEATURED_RESOURCES_TITLE);
        await page.isVisible(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_CALCULATOR_TITLE));
        await page.isVisible(HomePage.FEATURED_CARD_TITLE(common.TITLE.CARE_SERVICES_TITLE));
        await page.isVisible(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_RECOMMENDER_TITLE));
    
        // navigate to Support Calculator card
        await page.hover(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_CALCULATOR_TITLE));
        await page.click(HomePage.FEATURED_CARD_TITLE(common.TITLE.SUPPORT_CALCULATOR_TITLE));
        await page.isVisible(SupportSelectors.SUPPORT_CALCULATOR_TITLE);
        console.log(` ===== SUCCESS: Navigating to '${common.TITLE.SUPPORT_CALCULATOR_TITLE}'`);

        // select value in all fields
        await page.hover(SupportSelectors.FIELDSET_LABEL(ListInfoFields.YearOfBirth));
        await page.hover(SupportSelectors.FIELDSET_SELECT(ListInfoFields.YearOfBirth));
        await page.fill(`${SupportSelectors.FIELDSET_SELECT(ListInfoFields.YearOfBirth)}//input`, LowIncome.yearOfBirth);
        await page.click(SupportSelectors.FIELDSET_OPTION(ListInfoFields.YearOfBirth, LowIncome.yearOfBirth));
        await page.waitForTimeout(3000);
        // await commonActions.selectValue(ListInfoFields.YearOfBirth, LowIncome.yearOfBirth);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.YearOfBirth}' with '${LowIncome.yearOfBirth}'`);
        
        await page.hover(SupportSelectors.FIELDSET_LABEL(ListInfoFields.AssessableIncome));
        await page.click(SupportSelectors.FIELDSET_SELECT(ListInfoFields.AssessableIncome));
        await page.click(SupportSelectors.FIELDSET_OPTION(ListInfoFields.AssessableIncome, LowIncome.recentAssessableIncome));
        await page.waitForTimeout(3000);
        // await commonActions.selectChoice(ListInfoFields.AssessableIncome, LowIncome.recentAssessableIncome);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.AssessableIncome}' with '${LowIncome.recentAssessableIncome}'`);
        
        await page.hover(SupportSelectors.FIELDSET_LABEL(ListInfoFields.HousingType));
        await page.click(SupportSelectors.FIELDSET_SELECT(ListInfoFields.HousingType));
        await page.click(SupportSelectors.FIELDSET_OPTION(ListInfoFields.HousingType, LowIncome.housingType));
        await page.waitForTimeout(3000);
        // await commonActions.selectChoice(ListInfoFields.HousingType, LowIncome.housingType);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.HousingType}' with '${LowIncome.housingType}'`);
        
        await page.hover(SupportSelectors.FIELDSET_LABEL(ListInfoFields.PropertyOwnership));
        await page.click(SupportSelectors.FIELDSET_SELECT(ListInfoFields.PropertyOwnership));
        await page.click(SupportSelectors.FIELDSET_OPTION(ListInfoFields.PropertyOwnership, LowIncome.propertyOwnership));
        await page.waitForTimeout(3000);
        // await commonActions.selectChoice(ListInfoFields.PropertyOwnership, LowIncome.propertyOwnership);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.PropertyOwnership}' with '${LowIncome.propertyOwnership}'`);
        
        await page.hover(SupportSelectors.FIELDSET_LABEL(ListInfoFields.MoreThan1Property));
        await page.click(SupportSelectors.FIELDSET_SELECT(ListInfoFields.MoreThan1Property));
        await page.click(SupportSelectors.FIELDSET_OPTION(ListInfoFields.MoreThan1Property, LowIncome.ownMoreThanOneProperty));
        await page.waitForTimeout(3000);
        // await commonActions.selectYesNo(ListInfoFields.MoreThan1Property, LowIncome.ownMoreThanOneProperty);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.MoreThan1Property}' with '${LowIncome.ownMoreThanOneProperty}'`);
        
        await page.hover(SupportSelectors.MEMBER_FIELD_SELECT(LowIncome.member, ListInfoFields.YearOfBirth));
        await page.click(SupportSelectors.MEMBER_FIELD_SELECT(LowIncome.member, ListInfoFields.YearOfBirth));
        await page.click(SupportSelectors.MEMBER_FIELD_OPTION(LowIncome.member, ListInfoFields.YearOfBirth, LowIncome.mem_yearOfBirth));
        await page.waitForTimeout(3000);
        // await commonActions.selectMemberValue(LowIncome.member, ListInfoFields.YearOfBirth, LowIncome.mem_yearOfBirth);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.YearOfBirth}' with '${LowIncome.mem_yearOfBirth}' for: '${LowIncome.member}'`);
       
        await page.hover(SupportSelectors.MEMBER_FIELD_SELECT(LowIncome.member, ListInfoFields.AssessableIncome));
        await page.click(SupportSelectors.MEMBER_FIELD_SELECT(LowIncome.member, ListInfoFields.AssessableIncome));
        await page.click(SupportSelectors.MEMBER_FIELD_OPTION(LowIncome.member, ListInfoFields.AssessableIncome, LowIncome.mem_recentAssessableIncome));
        await page.waitForTimeout(3000);
        // await commonActions.selectMemberValue(LowIncome.member,ListInfoFields.AssessableIncome, LowIncome.mem_recentAssessableIncome);
        console.log(` ===== SUCCESS: Selecting '${ListInfoFields.AssessableIncome}' with '${LowIncome.mem_recentAssessableIncome}' for: '${LowIncome.member}'`);

        // click Show estimated benefits button
        await page.hover(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
        await page.click(SupportSelectors.SHOW_ESTIMATED_BENEFITS);
        console.log(` ===== SUCCESS: Clicking on 'Show estimated Benefits' button`);
    });

});
