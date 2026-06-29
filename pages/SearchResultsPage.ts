import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Search results page (/search?q=...). Reuses the product-grid layout.
 */
export class SearchResultsPage extends BasePage {
  readonly heading: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Search Results' });
    this.results = page.locator('section.product-grid a[id^="product-"]');
  }

  /** Number of products returned by the search. */
  async resultCount(): Promise<number> {
    return this.results.count();
  }

  /** True if at least one result's title contains the given term (case-insensitive). */
  async hasResultMatching(term: string): Promise<boolean> {
    const titles = await this.results.locator('h3').allInnerTexts();
    return titles.some((t) => t.toLowerCase().includes(term.toLowerCase()));
  }
}
