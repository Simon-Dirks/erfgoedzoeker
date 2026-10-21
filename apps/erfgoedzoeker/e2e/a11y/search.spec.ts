import { expect, test } from '@playwright/test';
import { axeBuilder } from './helpers/axe-helper';
import { goToSearchResults } from './helpers/search-helpers';

test.describe('Search page', () => {
  test('has no WCAG 2.2 AA violations', async ({ page }) => {
    await goToSearchResults(page);

    // Check accessibility
    const results = await axeBuilder(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
