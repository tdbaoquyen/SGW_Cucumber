import { commonText } from "../enums";
import * as common from "../common.json";

export const HomePage = {
    LOGO_HOMEPAGE: `//span[contains (@class,"StyledNavBarBrand")]//div[@role="button"]`,
    LOGIN_BUTTON : `//button[@type="button"]//span[normalize-space()='${commonText.LOG_IN}']`,
    READ_IN_LANGUAGE: (language:string) => `//div[contains(@class,"LanguageList")]//span[text()="${language}"]/ancestor::button`,
    FEATURED_RESOURCES_TITLE: `//div[contains(@class,"TitleSection")]//span[normalize-space()="${common.TITLE.FEATURES_TITLE}"]`,
    FEATURED_CARD: (title:string) => `//div[contains(@class,"FeatureCardContainer")]//span[normalize-space()="${title}"]/ancestor::a`,
    FEATURED_CARD_TITLE: (title:string) => `//div[contains(@class,"FeatureCardContainer")]//span[normalize-space()="${title}"]`,
}