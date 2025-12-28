// pages/pim.page.ts
import { Page, expect } from "@playwright/test";

export class PimPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async navigateToPIM() {
    await this.page.getByRole("link", { name: "PIM" }).click();
    await expect(
      this.page.getByRole("heading", { name: /PIM/i })
    ).toBeVisible();
  }

  async addEmployee(first: string, last: string, imageRelativePath: string) {
    await this.navigateToPIM();

    await this.page.getByRole("button", { name: "Add" }).click();
    await expect(
      this.page.getByRole("heading", { name: /Add Employee/i })
    ).toBeVisible();

    await this.page.getByPlaceholder("First Name").fill(first);
    await this.page.getByPlaceholder("Last Name").fill(last);
    await this.page.setInputFiles('input[type="file"]', imageRelativePath);

    await this.page.getByRole("button", { name: "Save" }).click();


    await expect(
      this.page.getByRole("heading", { name: "Personal Details" })
    ).toBeVisible({ timeout: 20000 });
  }
  async searchEmployee(name: string) {
    await this.navigateToPIM();
    await this.page.getByRole("link", { name: "Employee List" }).click();

    await this.page
      .getByRole("textbox", { name: "Employee Name" })
      .fill(name);

    await this.page.getByRole("button", { name: "Search" }).click();

    const row = this.page
      .locator(".oxd-table-card")
      .filter({ hasText: name })
      .first();

    return row;
  }
}
