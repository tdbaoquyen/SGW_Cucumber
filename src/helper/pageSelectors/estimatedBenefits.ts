import * as common from "../common.json";

export const BenefitsSelectors = {
    ESTIMATED_BENEFITS_PAGE_TITLE: `//div[contains(@class,"ContentWrapper")]//span[normalize-space()="${common.TITLE.ESTIMATED_BENEFITS_PAGE_TITLE}"]`,
    ESTIMATED_BENEFITS_DEFAULT_CONTENT: (text:string) => `//div[contains(@class,"TotalBenefitsWrapper")]//span[contains(@class,"StyledSpan") and text()="${text}"]`,

    BENEFITS_YEAR : (year:string) => `//span[normalize-space()="${year}"]/parent::button`,
    
    BENEFITS_OPTION_SUBTITLE : (label:string) => `//div[contains(@id,"panel--0")]//button[@data-testid="header-container"]//span[normalize-space()="${label}"]`,
    BENEFITS_OPTION_MEM_SUBTITLE : (member:string) => `//div[contains(@id,"panel--0")]//button[@data-testid="header-container"]//span[normalize-space()="${member} benefits"]`,
    BENEFITS_SUBTITLE_SUMMARY : (label:string) => `//div[contains(@id,"panel--0")]//button[@data-testid="header-container"]//span[normalize-space()="${label}"]/parent::div//div/span`,
    BENEFITS_MEM_SUBTITLE_SUMMARY : (member:string) => `//div[contains(@id,"panel--0")]//button[@data-testid="header-container"]//span[normalize-space()="${member} benefits"]/parent::div//div/span`,

}