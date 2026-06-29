import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Shopping cart page (/cart).
 */
export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly cartSection: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'My Cart' });
    this.cartSection = page.locator('#cart');
    // Shown only when the cart has no items.
    this.emptyMessage = this.cartSection.getByText('currently empty', { exact: false });
  }

  async open(): Promise<void> {
    await this.goto('/cart');
  }

  async isEmpty(): Promise<boolean> {
    return (await this.emptyMessage.count()) > 0;
  }

  /** True if a line item whose text contains the product name is present. */
  async containsProduct(name: string): Promise<boolean> {
    return (await this.cartSection.getByText(name, { exact: false }).count()) > 0;
  }
}
