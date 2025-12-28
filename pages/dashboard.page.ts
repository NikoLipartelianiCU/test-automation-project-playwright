import { expect, Page } from "@playwright/test";

export class DashboardPage {
    constructor(private page:Page) {}

    pimMenu = 'a[href*="pim"]';

    async openPIM() {
        await this.page.click(this.pimMenu);
        await expect(this.page.locator('h6:has-text("PIM")')).toBeVisible();
    }
}

