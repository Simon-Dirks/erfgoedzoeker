import { Page } from '@playwright/test';

export async function goToSearchResults(
  page: Page,
  query = 'brief',
): Promise<void> {
  await page.goto(`/search?q=${query}`);

  // Wait for results to load
  await page
    .getByText(/resultaten/i)
    .first()
    .waitFor({ state: 'visible', timeout: 20_000 });

  // Wait for search button to render
  await page.waitForSelector('.btn-primary.btn-sm', {
    state: 'visible',
    timeout: 5000,
  });

  // Wait briefly to ensure everything's fully rendered and styled
  await page.waitForTimeout(300);
}
