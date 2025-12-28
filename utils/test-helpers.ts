import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

export async function login(page:Page) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();             
    await loginPage.loginValid();       
}