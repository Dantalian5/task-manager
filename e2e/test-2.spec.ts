import { test, expect } from '@playwright/test';

test('Test Login', async ({ page }) => {
  await page.goto('http://192.168.1.55:3000/');

  await expect(page).toHaveTitle(/FocusDesk | by MV/);
  await expect(page.getByRole('heading', { name: 'FocusDesk' })).toBeVisible();

  const linkLogin = await page.getByRole('link', { name: 'Log in' });
  await linkLogin.click();
  await expect(page).toHaveURL(/\/login/);

  await page.getByPlaceholder('e.g. your@email.com').fill('');
  await page.getByPlaceholder('*****').fill('');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();

  await page.getByPlaceholder('e.g. your@email.com').fill('Test');
  await page.getByPlaceholder('*****').fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Invalid email')).toBeVisible();
  await expect(
    page.getByText('Password must be more than 4 characters')
  ).toBeVisible();
});
