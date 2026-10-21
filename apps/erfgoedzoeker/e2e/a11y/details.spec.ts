import { expect, test } from '@playwright/test';
import { axeBuilder } from './helpers/axe-helper';
import { goToSearchResults } from './helpers/search-helpers';

test.describe('Details page', () => {
  test('has no WCAG 2.2 AA violations after navigating from a search result', async ({
    page,
  }) => {
    await goToSearchResults(page);

    // Navigate to the first result's details page
    const firstResultLink = page.locator('a[href^="/details"]').first();
    await firstResultLink.waitFor({ state: 'visible', timeout: 5000 });
    await firstResultLink.click();

    await expect(page).toHaveURL(/\/details\//);

    // Wait for the loading spinner to disappear once details content loads
    await page
      .locator('.spinner-container')
      .waitFor({ state: 'hidden', timeout: 20_000 })
      .catch(() => {});

    // Check accessibility
    const results = await axeBuilder(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
