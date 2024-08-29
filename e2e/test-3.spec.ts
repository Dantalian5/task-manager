import { test, expect } from '@playwright/test';

test('Test Dashboard Flux', async ({ page }) => {
  await page.goto('http://192.168.1.55:3000/');

  await expect(page).toHaveTitle(/FocusDesk | by MV/);
  await expect(page.getByRole('heading', { name: 'FocusDesk' })).toBeVisible();

  await page.getByRole('button', { name: 'Try the Demo' }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  await page
    .getByRole('button', { name: '+ Create New Board', exact: true })
    .click();
  await expect(page.getByText('Add New Board')).toBeVisible();
  await page.getByPlaceholder('e.g. New Board').click();
  await page.getByPlaceholder('e.g. New Board').fill('My First Board');
  await page.getByRole('button', { name: '+ Add New Column' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByRole('button', { name: 'Add New Column' }).click();
  await page.getByLabel('Column Name').fill('Todo');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('main')).toContainText('Todo(0)');

  await page.getByRole('button', { name: 'Add New Task' }).click();
  await page.getByPlaceholder('e.g. Add new task to board').click();
  await page
    .getByPlaceholder('e.g. Add new task to board')
    .fill('My First Task');
  await page.getByPlaceholder('e.g. Add new task description').click();
  await page
    .getByPlaceholder('e.g. Add new task description')
    .fill('This is an example task that shows FocusDesk Capabilities');
  await page.getByRole('button', { name: '+ Add SubTask' }).click();
  await page
    .locator('[id="react-aria2558966810-\\:r4q\\:"]')
    .fill('Create my first Board');
  await page.getByRole('button', { name: '+ Add SubTask' }).click();
  await page
    .locator('[id="react-aria2558966810-\\:r51\\:"]')
    .fill('Create my first Column');
  await page.getByRole('button', { name: '+ Add SubTask' }).click();
  await page
    .locator('[id="react-aria2558966810-\\:r58\\:"]')
    .fill('Create my first Task');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('main')).toContainText('My First Task');
  await page
    .getByRole('button', { name: 'My First Task 0 of 3 substasks' })
    .click();
  await page
    .getByRole('button', { name: 'My First Task 0 of 3 substasks' })
    .click();
  await page
    .locator('label')
    .filter({ hasText: 'Create my first Board' })
    .locator('svg')
    .click();
  await page.getByText('Close').click();
  await expect(page.locator('main')).toContainText('1 of 3 substasks');
});
