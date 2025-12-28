import { test, expect } from '@playwright/test';
import { PimPage } from '../pages/pim.page';
import { login } from '../utils/test-helpers';

test.describe('Employee Management ', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);                
  });

  test('Add employee', async ({ page }) => {
    const pim = new PimPage(page);

    const first = 'John' + Math.floor(Math.random() * 9000);
    const last  = 'Doe'  + Math.floor(Math.random() * 9000);

    await pim.addEmployee(first, last, 'tests/files/photo.jpg');

  });

  test('Search employee', async ({ page }) => {
    const pim = new PimPage(page);

    const first = 'John' + Math.floor(Math.random() * 9000);
    const last  = 'Doe'  + Math.floor(Math.random() * 9000);

    await pim.addEmployee(first, last, 'tests/files/photo.jpg');
    const row = await pim.searchEmployee(first);
    await expect(row).toBeVisible();     
  });

  test('Edit employee', async ({ page }) => {
    const pim = new PimPage(page);

    const first = 'John' + Math.floor(Math.random() * 9000);
    const last  = 'Doe'  + Math.floor(Math.random() * 9000);

    await pim.addEmployee(first, last, 'tests/files/photo.jpg');
    const row = await pim.searchEmployee(first);
    await expect(row).toBeVisible();

    await row.click();                     
    await page.fill('input[name="lastName"]', 'Edited');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('input[name="lastName"]'))
      .toHaveValue(/Edited/);             
  });

});
