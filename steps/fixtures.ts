import { test as base, createBdd } from 'playwright-bdd';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CartPage } from '../pages/CartPage';

/** Page Object fixtures, created fresh per scenario. */
type Pages = {
  homePage: HomePage;
  productPage: ProductPage;
  searchResultsPage: SearchResultsPage;
  cartPage: CartPage;
};

/** Mutable state shared between steps within a single scenario. */
type World = {
  lastProductName?: string;
};

export const test = base.extend<Pages & { world: World }>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  world: async ({}, use) => {
    await use({});
  },
});

/**
 * Bind the BDD step helpers to our extended `test`, so every step definition
 * can pull in the Page Object fixtures (homePage, productPage, ...) and `world`.
 */
export const { Given, When, Then } = createBdd(test);
