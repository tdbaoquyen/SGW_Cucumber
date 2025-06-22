import assert from "assert";
import { page } from "../configs/hooks";
import * as common from "../../src/helper/common.json";
import { SupportSelectors } from "./pageSelectors/supportCalculator";
import { commonText, ListInfoFields, EstimatedYear } from "./enums";
import { BenefitsSelectors } from "./pageSelectors/estimatedBenefits";
import { LowIncome, ElderHouseHold, ManyChildren, YoungHouseHold } from "../configs/data/data";

export class CommonActions {

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
    };

    public async selectValue(label:string, option:string): Promise<void> {
        await page.hover(SupportSelectors.FIELDSET_SELECT(label), {timeout: common.SHORT_WAIT_TIMEOUT});
        await page.fill(`${SupportSelectors.FIELDSET_SELECT(label)}//input`, option);
        console.log('Selector (option):', SupportSelectors.FIELDSET_OPTION(label, option));

        assert.equal(
            await page.isVisible(SupportSelectors.FIELDSET_OPTION(label, option)),
            true,
        )
        console.log(` ===== SUCCESS: Fill value for '${label}' field!!`)
        await page.click(SupportSelectors.FIELDSET_OPTION(label, option));
        console.log(` ===== SUCCESS: Selected value '${option}' in '${label}' field`);
    };

    public async selectYesNo(label: string, choice: string) : Promise<void> {
        const radioButton = await page.locator(SupportSelectors.FILEDSET_CHOICE(label, choice));
        if (await radioButton.isVisible() && await radioButton.isEnabled()) {
            await radioButton.click();
            console.log(`✅ Clicked "${choice}" for question "${label}"`);
        } else {
            throw new Error(`❌ Radio button "${choice}" for question "${label}" is not clickable`);
        }
    };

    public async selectChoice(label: string, choice:string) : Promise<void> {
        await page.click(SupportSelectors.FIELDSET_SELECT(label));
        assert.equal(
            await page.isVisible(SupportSelectors.FIELDSET_OPTION(label, choice)),
            true,
        )
        await page.click(SupportSelectors.FIELDSET_OPTION(label, choice));
        console.log(` ===== SUCCESS: Selected value '${choice}' in ${label} field`);
    };

    public async selectMemberValue(member: string, label:string, option:string) : Promise<void> {
        await page.fill(`${SupportSelectors.MEMBER_FIELD_SELECT(member, label)}//input`, option);
        assert.equal(
            await page.isVisible(SupportSelectors.MEMBER_FIELD_OPTION(member, label, option)),
            true,
        )
        console.log(` ===== SUCCESS: Fill value for '${label}' field of '${member}' member!!`)
        await page.click(SupportSelectors.MEMBER_FIELD_OPTION(member, label, option));
        await page.waitForTimeout(1000);
    };
    
    public async selectMemberOption(member: string, label: string, choice:string) : Promise<void> {
        await page.click(SupportSelectors.MEMBER_FIELD_SELECT(member, label));
        assert.equal(
            await page.isVisible(SupportSelectors.MEMBER_FIELD_OPTION(member, label, choice)),
            true,
        )
        await page.click(SupportSelectors.MEMBER_FIELD_OPTION(member, label, choice));
        console.log(` ===== SUCCESS: Selected value '${choice}' in '${label}' field of '${member}' member!!`);
    };
        
    public async selectMemberChoice(member: string, label: string, choice:string) : Promise<void> {
        assert.equal(
            await page.isVisible(SupportSelectors.MEMBER_FIELD_CHOICE(member, label, choice)),
            true,
        )
        await page.click(SupportSelectors.MEMBER_FIELD_CHOICE(member, label, choice));
        console.log(` ===== SUCCESS: Selected value '${choice}' in '${label}' field of '${member}' member!!`);
    };

    public async isDisplayed(location:string){
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
            `FAIL REASON: This element is not displayed!!`
        )
    }

    public async scrollToView(location:string) : Promise<void> {
        await page.waitForSelector(location),
        assert.equal(
            await page.isVisible(location),
            true,
        )
        await page.locator(location).scrollIntoViewIfNeeded();
        await page.waitForTimeout(common.SHORT_WAIT_TIMEOUT);
    };

    public async enterFamilyWithLowTotalIncome() {
        console.log(`===== START: Enter data for: Family with low total income`);
        await this.selectValue(ListInfoFields.YearOfBirth, LowIncome.yearOfBirth);
        await this.selectChoice(ListInfoFields.AssessableIncome, LowIncome.recentAssessableIncome);
        await this.selectChoice(ListInfoFields.HousingType, LowIncome.housingType);
        await this.selectChoice(ListInfoFields.PropertyOwnership, LowIncome.propertyOwnership);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, LowIncome.ownMoreThanOneProperty);
    
        await page.hover(SupportSelectors.ADD_MEMBER);
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(LowIncome.member, ListInfoFields.YearOfBirth, LowIncome.mem_yearOfBirth);
        await this.selectMemberOption(LowIncome.member, ListInfoFields.AssessableIncome, LowIncome.mem_recentAssessableIncome);
        console.log(`===== SUCCESS: Enter data for: Family with low total income`);
    };

    public async enterFamilyHavingElderlyPersonData() {
        console.log(`===== START: Enter data for: Family having elderly person`);
        await this.selectValue(ListInfoFields.YearOfBirth, ElderHouseHold.yearOfBirth);
        await this.selectChoice(ListInfoFields.AssessableIncome, ElderHouseHold.recentAssessableIncome);
        await this.selectChoice(ListInfoFields.HousingType, ElderHouseHold.housingType);
        await this.selectChoice(ListInfoFields.PropertyOwnership, ElderHouseHold.propertyOwnership);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, ElderHouseHold.ownMoreThanOneProperty);
    
        await page.hover(SupportSelectors.ADD_MEMBER);
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(ElderHouseHold.member, ListInfoFields.YearOfBirth, ElderHouseHold.mem_yearOfBirth);
        await this.selectMemberOption(ElderHouseHold.member, ListInfoFields.AssessableIncome, ElderHouseHold.mem_recentAssessableIncome);
        await this.selectMemberChoice(ElderHouseHold.member, ListInfoFields.CPFBalance, ElderHouseHold.mem_cpfMediSaveBalance);
        console.log(`===== SUCCESS: Enter data for: Family having elderly person`);
    };

    public async enterFamilyHavingManyChildrensData() {
        console.log(`===== START: Enter data for: Family having many childrens`);
        await this.selectValue(ListInfoFields.YearOfBirth, ManyChildren.yearOfBirth);
        await this.selectChoice(ListInfoFields.AssessableIncome, ManyChildren.recentAssessableIncome);
        await this.selectChoice(ListInfoFields.HousingType, ManyChildren.housingType);
        await this.selectChoice(ListInfoFields.PropertyOwnership, ManyChildren.propertyOwnership);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, ManyChildren.ownMoreThanOneProperty);
    
        await page.hover(SupportSelectors.ADD_MEMBER);
        await page.click(SupportSelectors.ADD_MEMBER);
        // add child 1
        await this.selectMemberValue(ManyChildren.member_1, ListInfoFields.YearOfBirth, ManyChildren.mem_1_yearOfBirth);
        // add child 2
        await page.hover(SupportSelectors.ADD_MEMBER);
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(ManyChildren.member_2, ListInfoFields.YearOfBirth, ManyChildren.mem_2_yearOfBirth);
        await this.selectMemberChoice(ManyChildren.member_2, ListInfoFields.IsSubsequentChild, ManyChildren.mem_2_isThirdOrSubsequentChild);
        console.log(`===== SUCCESS: Enter data for: Family having many childrens`);
    };

    public async enterFinancialPlanForYoungPeopleData() {
        console.log(`===== START: Enter data for: Financial plan for Young people`);
        await this.selectValue(ListInfoFields.YearOfBirth, YoungHouseHold.yearOfBirth);
        await this.selectChoice(ListInfoFields.AssessableIncome, YoungHouseHold.recentAssessableIncome);
        await this.selectChoice(ListInfoFields.HousingType, YoungHouseHold.housingType);
        await this.selectChoice(ListInfoFields.PropertyOwnership, YoungHouseHold.propertyOwnership);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, YoungHouseHold.ownMoreThanOneProperty);
        console.log(`===== SUCCESS: Enter data for: Financial plan for Young people`);
    };

    public async verifyIndividualBenefits(year:string) {
        const yearStatus = await page.getAttribute(BenefitsSelectors.BENEFITS_YEAR(year), "aria-selected");
        if(yearStatus === "true"){
            assert.equal(
                await page.isVisible(BenefitsSelectors.ESTIMATED_BENEFITS_PAGE_TITLE),
                true,
                `FAIL REASON: The '${common.TITLE.ESTIMATED_BENEFITS_PAGE_TITLE}' title is NOT displayed!!`
            );
            console.log(`===== SUCCESS: Showing the '${common.TITLE.ESTIMATED_BENEFITS_PAGE_TITLE}' title!!`);
            assert.equal(
                await page.isVisible(BenefitsSelectors.ESTIMATED_BENEFITS_DEFAULT_CONTENT(common.TITLE.ESTIMATED_DEFAULT_CONTENT)),
                true,
                `FAIL REASON: The '${common.TITLE.ESTIMATED_DEFAULT_CONTENT}' title is NOT displayed!!`
            );
            console.log(`===== SUCCESS: Showing the '${common.TITLE.ESTIMATED_BENEFITS_PAGE_TITLE}' title!!`);
        }
        else{
            await page.click(BenefitsSelectors.BENEFITS_YEAR(year));
        }
    };
    
}   