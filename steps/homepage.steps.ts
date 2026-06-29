import { expect } from '@playwright/test';
import { Then } from './fixtures';

Then('the page title contains {string}', async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text, 'i'));
});

Then('at least one product is shown in the grid', async ({ homePage }) => {
  await expect(homePage.productGrid).toBeVisible();
  expect(await homePage.productCount()).toBeGreaterThan(0);
});
