import { test, expect } from '@playwright/experimental-ct-react';
import { MessageProvider } from '../src/app/providers/MessageProvider';
import App from '../src/app/app';

test('App component loads and displays users', async ({ mount, page }) => {
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          roles: ['admin'],
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          roles: ['user'],
        },
      ]),
    });
  });

  await page.route('**/api/roles', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, role: 'admin' },
        { id: 2, role: 'user' },
      ]),
    });
  });
  const component = await mount(
    <MessageProvider>
      <App />
    </MessageProvider>
  );

  await expect(component.locator('h4')).toContainText('Users');

  await expect(component.locator('table')).toBeVisible();

  await expect(component.locator('tr').nth(1)).toContainText('John Doe');
  await expect(component.locator('tr').nth(2)).toContainText('Jane Smith');
});
