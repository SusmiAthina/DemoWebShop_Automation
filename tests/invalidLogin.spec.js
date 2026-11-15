//Q1: Invalid Login Test using playwright and page object model (POM) 
import { LoginPage } from './pages/LoginPage.js';
import { test, expect } from '@playwright/test';

test('Q1 - Invalid Login', async ({ page }, testInfo) => {

const loginPage = new LoginPage(page);

// Open Login Page
await loginPage.open();

// Enter invalid login details
await loginPage.login(
'wronguser@example.com',
'WrongPassword123'
);

// Verify error message
await expect(loginPage.errorMessage).toBeVisible();

await expect(loginPage.errorMessage)
.toContainText('Login was unsuccessful');

// Verify user is not logged in
await expect(
page.getByRole('link', { name: 'Log in' })
).toBeVisible();

await expect(
page.getByRole('link', { name: 'Log out' })
).toHaveCount(0);

// Attach screenshot
await testInfo.attach('Invalid-Login-Result', {
body: await page.screenshot({ fullPage: true }),
contentType: 'image/png'
});

});