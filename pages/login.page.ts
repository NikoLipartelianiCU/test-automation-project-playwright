import { expect, Page } from "@playwright/test";

export class LoginPage {
    constructor(private page:Page) {}

    username = 'input[name="username"]';
    password = 'input[name="password"]';
    loginBtn = 'button[type="submit"]';

    async goto(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/");
    }

    async loginValid(){
        await this.page.fill(this.username,"Admin");
        await this.page.fill(this.password,"admin123");
        await this.page.click(this.loginBtn);

        await this.page.waitForURL(/dashboard/);
        await expect(this.page.getByRole('heading',{name:/Dashboard/i})).toBeVisible();
    }

    async loginInvalid(){
        await this.page.fill(this.username,"wrong");
        await this.page.fill(this.password,"wrong");
        await this.page.click(this.loginBtn);
    }

    async assertError(){
        await expect(this.page.locator(".oxd-alert-content-text")).toContainText("Invalid");
    }
}
