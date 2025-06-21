import assert from "assert";
import { page } from "../configs/hooks";
import * as common from "../../src/helper/common.json";
import { SupportSelectors } from "./pageSelectors/supportCalculator";
import { ListInfoFields } from "./enums";
import { BenefitsSelectors } from "./pageSelectors/estimatedBenefits";
import { LowIncome, ElderHouseHold, ManyChildren, YoungHouseHold } from "../configs/data/data";
import * as testData from "../configs/data/testData.json";

// const lowIncome = testData.schemes["Family with low total income"];
// const elderHouseHold = testData.schemes["Family having elderly person"];
// const manyChildren = testData.schemes["Family having many childrens"];
// const youngHouseHold = testData.schemes["Financial plan for Young people"];

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

    public async selectValue(label:string, option:string): Promise<void> {
        await page.hover(SupportSelectors.FIELDSET_SELECT(label));
        await page.fill(`${SupportSelectors.FIELDSET_SELECT(label)}//input`, option);
        assert.equal(
            await page.isVisible(SupportSelectors.FIELDSET_OPTION(label, option)),
            true,
        )
        await page.click(SupportSelectors.FIELDSET_OPTION(label, option));
        await page.waitForTimeout(3000);
        console.log(` ===== SUCCESS: Selected value '${option}' in ${label} field`);
    };

    public async selectMemberValue(member: string, label:string, option:string) : Promise<void> {
        await page.fill(SupportSelectors.MEMBER_FIELD_SELECT(member, label), option);
        assert.equal(
            await page.isVisible(SupportSelectors.MEMBER_FIELD_OPTION(member, label, option)),
            true,
        )
        await page.click(SupportSelectors.MEMBER_FIELD_OPTION(member, label, option));
        await page.waitForTimeout(1000);
    };

    public async selectYesNo(label: string, choice:string) : Promise<void> {
        await page.click(SupportSelectors.FILEDSET_CHOICE(label, choice), { timeout : common.SHORT_WAIT_TIMEOUT});
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
        const YOB = LowIncome.yearOfBirth;
        const income = LowIncome.recentAssessableIncome;
        const houseType = LowIncome.housingType;
        const property =  LowIncome.propertyOwnership;
        const moreThan1Property = LowIncome.ownMoreThanOneProperty;
        const member = LowIncome.member;
        const subYOB = LowIncome.mem_yearOfBirth;
        const subIncome = LowIncome.mem_recentAssessableIncome;

        console.log(`===== START: Enter data for: Family with low total income`);
        // add main household
        await this.selectValue(ListInfoFields.YearOfBirth, YOB);
        await this.selectChoice(ListInfoFields.AssessableIncome, income);
        await this.selectChoice(ListInfoFields.HousingType, houseType);
        await this.selectChoice(ListInfoFields.PropertyOwnership, property);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, moreThan1Property);
        // add member
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(member, ListInfoFields.YearOfBirth, subYOB);
        await this.selectMemberValue(member, ListInfoFields.AssessableIncome, subIncome);
        console.log(`===== SUCCESS: Enter data for: Family with low total income`);
    };

    public async enterFamilyHavingElderlyPersonData() {
        const YOB = ElderHouseHold.yearOfBirth;
        const income = ElderHouseHold.recentAssessableIncome;
        const houseType = ElderHouseHold.housingType;
        const property = ElderHouseHold.propertyOwnership;
        const moreThan1Property = ElderHouseHold.ownMoreThanOneProperty;
        const member = ElderHouseHold.member;
        const subYOB = ElderHouseHold.mem_yearOfBirth;
        const subIncome = ElderHouseHold.mem_recentAssessableIncome;
        const subCPF = ElderHouseHold.mem_cpfMediSaveBalance;

        console.log(`===== START: Enter data for: Family having elderly person`);
        // add main household
        await this.selectValue(ListInfoFields.YearOfBirth, YOB);
        await this.selectValue(ListInfoFields.AssessableIncome, income);
        await this.selectValue(ListInfoFields.HousingType, houseType);
        await this.selectValue(ListInfoFields.PropertyOwnership, property);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, moreThan1Property);
        // add member
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(member, ListInfoFields.YearOfBirth, subYOB);
        await this.selectMemberValue(member, ListInfoFields.AssessableIncome, subIncome);
        await this.selectMemberValue(member, ListInfoFields.CPFBalance, subCPF);
        console.log(`===== SUCCESS: Enter data for: Family having elderly person`);
    };

    public async enterFamilyHavingManyChildrensData() {
        const YOB = ManyChildren.yearOfBirth;
        const income = ManyChildren.recentAssessableIncome;
        const houseType = ManyChildren.housingType;
        const property = ManyChildren.propertyOwnership;
        const moreThan1Property = ManyChildren.ownMoreThanOneProperty;
        const member1 = ManyChildren.member_1;
        const subYOB_1 = ManyChildren.mem_1_yearOfBirth;
        const member2 = ManyChildren.member_2;
        const subYOB_2 = ManyChildren.mem_2_yearOfBirth;
        const subChild_2 = ManyChildren.mem_2_isThirdOrSubsequentChild;
        const member3 = ManyChildren.member_3;
        const subYOB_3 = ManyChildren.mem_3_yearOfBirth;
        const subChild_3 = ManyChildren.mem_3_isThirdOrSubsequentChild;
        
        console.log(`===== START: Enter data for: Family having many childrens`);
        // add main household
        await this.selectValue(ListInfoFields.YearOfBirth, YOB);
        await this.selectValue(ListInfoFields.AssessableIncome, income);
        await this.selectValue(ListInfoFields.HousingType, houseType);
        await this.selectValue(ListInfoFields.PropertyOwnership, property);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, moreThan1Property);
        // add child 1
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(member1, ListInfoFields.YearOfBirth, subYOB_1);
        // add child 2
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(member2, ListInfoFields.YearOfBirth, subYOB_2);
        await this.selectMemberValue(member2, ListInfoFields.SubsequentChild, subChild_2);
        // add child 3
        await page.click(SupportSelectors.ADD_MEMBER);
        await this.selectMemberValue(member3, ListInfoFields.YearOfBirth, subYOB_3);
        await this.selectMemberValue(member3, ListInfoFields.SubsequentChild, subChild_3);
        console.log(`===== SUCCESS: Enter data for: Family having many childrens`);
    };

    public async enterFinancialPlanForYoungPeopleData() {
        const YOB = YoungHouseHold.yearOfBirth;
        const income = YoungHouseHold.recentAssessableIncome;
        const houseType = YoungHouseHold.housingType;
        const property = YoungHouseHold.propertyOwnership;
        const moreThan1Property = YoungHouseHold.ownMoreThanOneProperty;
        
        console.log(`===== START: Enter data for: Financial plan for Young people`);
        // add main household
        await this.selectValue(ListInfoFields.YearOfBirth, YOB);
        await this.selectValue(ListInfoFields.AssessableIncome, income);
        await this.selectValue(ListInfoFields.HousingType, houseType);
        await this.selectValue(ListInfoFields.PropertyOwnership, property);
        await this.selectYesNo(ListInfoFields.MoreThan1Property, moreThan1Property);
        console.log(`===== SUCCESS: Enter data for: Financial plan for Young people`);
    };

    public async verifyIndividualBenefits(expectedResult:string) {
        const actualResult = await this.getText(BenefitsSelectors.BENEFITS_INDIVIDUAL_SUMMARY(common.LABEL.YOUR_INDIVIDUAL_BENEFITS));
        assert.equal(
            actualResult.trim(),
            expectedResult.trim(),
            `FAIL REASON: The 'Your individual benefits' expected ${expectedResult} but got ${actualResult}!!`
        )
    };
    
}