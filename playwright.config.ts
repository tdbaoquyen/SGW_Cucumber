import { defineConfig } from '@playwright/test';
 /*
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests',
  timeout: 30000, // Increase global timeout to 30 seconds

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'always' }], 
    ['json', { outputFile: 'reports/test-results.json' }]
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10000, // Increase action timeout to 10 seconds
    navigationTimeout: 20000, // Increase navigation timeout to 20 seconds
    baseURL: 'https://supportgowhere.life.gov.sg',
    headless: process.env.CI ? true : true, // run headless mode on CI
    viewport: { width: 1280, height: 720},
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: 'on-first-retry',
    // a
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',  // Use Google Chrome instead of Chromium
        launchOptions: {
          args: ['--no-sandbox']
        } 
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
