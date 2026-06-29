import { Locator, Page } from '@playwright/test';

/**
 * Shared building block for all page objects: holds the Page handle and
 * exposes header elements (main menu, search box, cart) present on every page.
 */
export class BasePage {
  readonly page: Page;
  readonly mainMenu: Locator;
  readonly searchInput: Locator;
  readonly cartCount: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Left sidebar accordion menu: Home, Catalog, Blog, About Us, ...
    this.mainMenu = page.locator('#main-menu');
    // Header search form input (name="q").
    this.searchInput = page.locator('input[name="q"]');
    // Header cart count badge, e.g. "(0)" / "(1)".
    this.cartCount = page.locator('#cart-target-desktop');
    this.checkoutLink = page.locator('a.checkout');
  }

  /** Navigate to a path relative to baseURL (defaults to the homepage). */
  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /** Click a link in the main (left sidebar) menu by its visible name. */
  async clickMainMenu(name: string): Promise<void> {
    await this.mainMenu.getByRole('link', { name, exact: true }).click();
  }

  /** Type a term into the header search box and submit it. */
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}
