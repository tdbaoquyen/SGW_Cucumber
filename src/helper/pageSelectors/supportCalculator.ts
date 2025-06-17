import { commonText } from "../enums";
import * as common from "../common.json";

export const SupportSelectors = {
    // main feature card
    NAVIGATED_BAR_BUTTON: (button: string) => `//div[contains(@class,"ButtonWrapper")]//span[@data-id="button-label" and text()="${button}"]`,
    SUPPORT_CALCULATOR_TITLE: `//div[contains(@class,"ContentWrapper")]//span[normalize-space()="${common.TITLE.SUPPORT_CALCULATOR_TITLE}"]`,
    START_BUTTON: `//div[contains(@class,"ButtonWrapper")]//span[text()="${commonText.BUTTON_START}"]/parent::button`,

    // sub feature card
    INFO_TITLE: (label:string) => `//div[contains(@class,"HeaderWrapper")]//span[normalize-space()="${label}"]`,
    FIELDSET_LABEL: (label:string) => `//fieldset[contains(@class,"Fieldset")]//label[contains(@class,"Label") and normalize-space()="${label}"]`,
    FIELDSET: (label:string) => `${SupportSelectors.FIELDSET_LABEL(label)}/ancestor::fieldset[contains(@class,"Fieldset")]`,
    FIELDSET_SELECT: (label:string) => `${SupportSelectors.FIELDSET(label)}//div[contains(@class,"StyledDropdow")]`,
    FIELDSET_DROPDOWN: (label:string) => `${SupportSelectors.FIELDSET_SELECT(label)}//div[@role="listbox"]`,
    FIELDSET_OPTION: (label:string, option:string) => `${SupportSelectors.FIELDSET(label)}//div[@role="listbox"]//div[@role="option"]//div[text()="${option}"]`,
    FILEDSET_OPTION_DISPLAYED: (label:string) => `${SupportSelectors.FIELDSET_SELECT(label)}//div[contains(@class,"single-value")]`,
    FIELDSET_ERROR: (label:string) => `${SupportSelectors.FIELDSET(label)}//span[normalize-space()="${common.ERROR.REQUIRED_FIELD}"]/ancestor::div[contains(@class,"TextWrapper")]`,

    // buttons
    ADD_MEMBER: `//div[contains(@style,"box-sizing")]//span[normalize-space()="${commonText.BUTTON_ADD_MEMBER}"]/ancestor::button`,
    SHOW_ESTIMATED_BENEFITS: `//div[contains(@class,"ButtonWrapper")]//span[normalize-space()="${commonText.BUTTON_SHOW_BENEFITS}"]/ancestor::button`,
    REMOVE_BUTTON: `//div[contains(@class, "ElementSpacedWrapper")]//span[text() = "${commonText.BUTTON_REMOVE}"]/ancestor::button`,

    // add household member
    MEMBER_X: (X: string) => `//div[contains(@class, "ElementSpacedWrapper")]//span[normalize-space() = "${commonText.MEMBER_TAG} {X}"]`
}