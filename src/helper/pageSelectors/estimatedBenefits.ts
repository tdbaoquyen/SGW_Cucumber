import * as common from "../common.json";

export const BenefitsSelectors = {
    ESTIMATED_BENEFITS_TITLE: `//div[contains(@class,"ContentWrapper")]//span[normalize-space()="${common.TITLE.ESTIMATED_BENEFITS_TITLE}"]`,
    TABLE_YEAR : (year:string) => `//div[@data-testid="scroll-content"]//span[normalize-space()="${year}"]/ancestor::button`,
    TOTAL_BENEFITS : `//div[contains(@class,"TotalBenefitsWrapper")]//span[text()="${common.TITLE.ESTIMATED_DEFAULT_CONTENT}"]`,
    BENEFITS_OPTION_LABEL : (label:string) => `//div[contains(@class,"SchemesPayoutContainer")]//span[text()="${label}"]/ancestor::div[contains(@class,"BCTextLinkWrapper")]`,
    BENEFITS_OPTION: (label:string) => `${BenefitsSelectors.BENEFITS_OPTION_LABEL(label)}/ancestor::div[contains(@class,"SchemeContentWrapper")]`,
    BENEFITS_OPTION_SUBTITLE : (label:string, text:string) => `${BenefitsSelectors.BENEFITS_OPTION(label)}//span[text()="${text}"]`,
    BENEFITS_INDIVIDUAL_SUMMARY : `//div[@data-testid="wrapper-container"]//div[contains(@class,"ProfileWrapper")]//span[text()="${common.MESSAGE.YOUR_INDIVIDUAL_BENEFITS}"]`,
}