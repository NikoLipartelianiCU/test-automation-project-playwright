import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    page.setDefaultTimeout(15000);
    await use(page);
  }
});
