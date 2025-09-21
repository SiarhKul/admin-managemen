import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h4')).toContainText('Users');
});

test('app component renders', async ({ page }) => {
  await page.goto('/');

  // Test that the UserTable component renders
  await expect(page.locator('h4')).toContainText('Users');
  await expect(page.locator('.ant-table')).toBeVisible();
});
