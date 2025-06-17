Scope of work:
	- I focus on the Support For You Calculator E2E UI flow, from login => navigate to featues => choose options and get the estimated benefits
	- Do not focus on the return value of benefits after calculating.

1. FIRST - Project structure:
	- applied BDD testing with Cucumber framework, so that, the project is structured with:
	- 'features' folder includes the 'feature' file for test scenarios and 'step-definition' file for execution these test scenarios.
	- 'src' folder that includes all support files, like: config, test-data, hooks annotations, etc. 
	- in 'src' folder aslo has 'helpers' folder that includes actions and locators for each pageObjects as POM design pattern. There are also 'common' file that is used for all common actions, like: getText, click,etc.
	- 'report' folder is included all test resule, like screenshot, record video or HTML reporter.
	- Other config project files like cucumber.js, package.json, playwright.config.ts are at the root of structure.
	
2. SECOND - Apply POM:
 	- applied POM design pattern in all the project to help the scripts clean, easy to read, reusable and maintain.	
	- 'enums' and 'common.json' files are include all text, message, title, etc. that can be used in test, like select locator with text, verify return message etc. So that, whenever the UI has changed these text, we just need to update this 'enums' and 'common' file, instead of updating all working files in project.
	
3. THIRD - Implement test


4. FOURTH - Integrate with Jenkins and send notification via email