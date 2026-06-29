import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

When('I add the product to the cart', async ({ productPage }) => {
  await productPage.addToCart();
});

Then('the cart count shows {int} item', async ({ productPage }, count: number) => {
  // The Sauce app adds via AJAX and increments the header cart count.
  await expect(productPage.cartCount).toHaveText(new RegExp(`\\(${count}\\)`));
});

Then('the product appears in the cart', async ({ cartPage, world }) => {
  await cartPage.open();
  await expect(cartPage.heading).toBeVisible();
  expect(await cartPage.isEmpty()).toBe(false);
  if (world.lastProductName) {
    expect(await cartPage.containsProduct(world.lastProductName)).toBe(true);
  }
});
