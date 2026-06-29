import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Product detail page, e.g. /collections/frontpage/products/grey-jacket.
 */
export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1[itemprop="name"]');
    // The theme's JS rewrites the inner markup of #product-price, so target the
    // heading itself rather than the (transient) itemprop span inside it.
    this.price = page.locator('#product-price');
    this.image = page.locator('#feature-image');
    this.addToCartButton = page.locator('#add');
  }

  async titleText(): Promise<string> {
    return (await this.title.innerText()).trim();
  }

  async priceText(): Promise<string> {
    return (await this.price.innerText()).trim();
  }

  /**
   * Add the product to the cart. The Sauce app handles this via AJAX (updating
   * the header cart count) rather than navigating away, so callers should assert
   * on the cart count and/or visit /cart afterwards.
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
