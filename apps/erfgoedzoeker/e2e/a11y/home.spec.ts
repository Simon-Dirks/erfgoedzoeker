import { expect, test } from '@playwright/test';
import { axeBuilder } from './helpers/axe-helper';

test.describe('Home page', () => {
  test('has no WCAG 2.2 AA violations', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Wait briefly to ensure everything's fully rendered and styled
    await page.waitForTimeout(500);

    const results = await axeBuilder(page).analyze();

    expect(results.violations).toEqual([]);
  });

  test('search input is reachable and operable by keyboard', async ({
    page,
  }) => {
    await page.goto('/');

    const searchInput = page.getByRole('combobox').first();
    await searchInput.focus();
    await expect(searchInput).toBeFocused();

    await searchInput.fill('brief');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/search/);
  });
});
