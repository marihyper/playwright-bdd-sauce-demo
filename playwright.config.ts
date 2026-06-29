import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

/**
 * BDD wiring: `bddgen` reads the .feature files in `features/` and the step
 * definitions in `steps/`, and generates runnable Playwright test files into
 * `testDir`. Run `npx bddgen` before `npx playwright test` (the npm scripts do
 * this for you).
 */
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.ts',
});

/**
 * Playwright configuration for the Sauce Demo (Shopify) BDD test suite.
 * Target: https://sauce-demo.myshopify.com/ (a live, public storefront).
 */
export default defineConfig({
  testDir,
  // Run tests within each file in parallel.
  fullyParallel: true,
  // Fail the build on CI if test.only is accidentally left in the source.
  forbidOnly: !!process.env.CI,
  // Retry on CI only — helps absorb transient network flakiness against a live site.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: 'https://sauce-demo.myshopify.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
