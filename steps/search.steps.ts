import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

When('I search for {string}', async ({ homePage }, term: string) => {
  await homePage.search(term);
});

Then('the search results page is shown', async ({ searchResultsPage }) => {
  await expect(searchResultsPage.heading).toBeVisible();
});

Then('at least one result matches {string}', async ({ searchResultsPage }, term: string) => {
  expect(await searchResultsPage.resultCount()).toBeGreaterThan(0);
  expect(await searchResultsPage.hasResultMatching(term)).toBe(true);
});
