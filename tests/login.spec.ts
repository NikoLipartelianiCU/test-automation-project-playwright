import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Tests",()=>{

test("successful login",async({page})=>{
    const login = new LoginPage(page);
    await login.goto();
    await login.loginValid();
});

test("invalid login shows error",async({page})=>{
    const login = new LoginPage(page);
    await login.goto();
    await login.loginInvalid();
    await login.assertError();
});

});
