import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

// "I open the first product" is reused by both the product and cart features.
When('I open the first product', async ({ homePage, world }) => {
  world.lastProductName = await homePage.productTitle(0);
  await homePage.openProduct(0);
});

Then('the product name is displayed', async ({ productPage, world }) => {
  await expect(productPage.title).toBeVisible();
  if (world.lastProductName) {
    expect(await productPage.titleText()).toBe(world.lastProductName);
  }
});

Then('the product image is displayed', async ({ productPage }) => {
  await expect(productPage.image).toBeVisible();
});

Then('the product price looks like a price', async ({ productPage }) => {
  // Live site: assert a currency-shaped price rather than a hard-coded value.
  expect(await productPage.priceText()).toMatch(/£\s?\d+(\.\d{2})?/);
});

Then('an {string} action is available', async ({ productPage }, _label: string) => {
  await expect(productPage.addToCartButton).toBeVisible();
});
