import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * The storefront homepage with its featured product grid.
 */
export class HomePage extends BasePage {
  readonly productGrid: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productGrid = page.locator('section.product-grid');
    // Each product card is an anchor with an id like "product-1".
    this.productCards = this.productGrid.locator('a[id^="product-"]');
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  /** Number of product cards rendered in the grid. */
  async productCount(): Promise<number> {
    return this.productCards.count();
  }

  /** The visible title of the nth product card (0-based). */
  async productTitle(index = 0): Promise<string> {
    return (await this.productCards.nth(index).locator('h3').innerText()).trim();
  }

  /** Click the nth product card to open its detail page. */
  async openProduct(index = 0): Promise<void> {
    await this.productCards.nth(index).click();
  }
}
