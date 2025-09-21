import { test, expect } from '@playwright/experimental-ct-react';

import App from '../../client/src/app/app';

test('should work', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('Learn React');
});
