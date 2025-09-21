import { test, expect } from '@playwright/experimental-ct-react';

import App from '../../client/src/app/app';

test('Test <App/>', async ({ mount, page }) => {
  const component = await mount(<App />);
  console.log(component);
  await expect(component.locator('h4')).toContainText('Users');
});
