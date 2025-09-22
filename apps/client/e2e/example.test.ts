import { test, expect } from '@playwright/test';

// Mock API responses for e2e tests so the backend isn't required
// Keep this lightweight and close to the tests for clarity
const usersBody = [
  { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['admin'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', roles: ['user'] },
];
const rolesBody = [
  { id: 1, role: 'admin' },
  { id: 2, role: 'user' },
];

test.beforeEach(async ({ page }) => {
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(usersBody),
    });
  });
  await page.route('**/api/roles', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(rolesBody),
    });
  });
});

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
