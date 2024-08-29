import { test, expect } from '@playwright/test';

test('Test Home & About', async ({ page }) => {
  await page.goto('http://192.168.1.55:3000/');

  await expect(page).toHaveTitle(/FocusDesk | by MV/);
  await expect(page.getByRole('heading', { name: 'FocusDesk' })).toBeVisible();

  const linkAbout = await page.getByRole('link', { name: /About/ });
  await linkAbout.click();
  await expect(page).toHaveURL(/\/about/);
  await expect(
    page.getByRole('heading', { name: 'What is FocusDesk?' })
  ).toBeVisible();

  const linkHome = await page.getByRole('link', { name: /Home/ });
  await linkHome.click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: 'FocusDesk' })).toBeVisible();
});
