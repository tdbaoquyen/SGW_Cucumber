
Feature: Support For You Calculator
    As a user using the support programming
    I want to use the Support For You Calculator Feature
    So that I can have the summary for my Benefits in various schemes

Background:
    Given I navigate to the homepage

Scenario Outline: Summary benefits in various valid schemes
    Given I am on the Support For You Calculator feature
    When I enter household information as '<scheme>'
    And I click the show estimated benefits button
    Then I should see the Estimated Benefits page
    And I back to homepage

    Examples:
    | scheme                           | 
    | Family with low total income     |
    | Family having elderly person     | 
    | Family having many childrens     | 
    | Financial plan for Young people  | 

Scenario: Validation errors for invalid inputs
   Given I am on the Support For You Calculator feature
   When I click the show estimated benefits button without any information
   Then the warning error is displayed in each required field
   And the Show estimated Benefits page is not loaded
   And I back to homepage
