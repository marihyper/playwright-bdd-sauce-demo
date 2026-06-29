import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

// Shared navigation steps — reused across every feature.

Given('I am on the homepage', async ({ homePage }) => {
  await homePage.open();
});

When('I click the {string} link in the main menu', async ({ homePage }, name: string) => {
  await homePage.clickMainMenu(name);
});

Then('the main menu shows a {string} link', async ({ homePage }, name: string) => {
  await expect(homePage.mainMenu.getByRole('link', { name, exact: true })).toBeVisible();
});

Then('I am taken to the collections page', async ({ page }) => {
  await expect(page).toHaveURL(/\/collections\/all/);
});
