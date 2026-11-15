import { test, expect } from '@playwright/test';
import { RegisterPage } from './pages/RegisterPage.js';

test('Q2 - Register and Add Product to Cart', async ({ page }) => {

  const registerPage = new RegisterPage(page);

  // Open Registration Page
  await page.goto('https://demowebshop.tricentis.com/register');

  // Select Gender
  await page.locator('#gender-male').check();

  // Fill Registration Form
  await page.locator('#FirstName').fill('Susmita');
  await page.locator('#LastName').fill('Alam');

  // Generate a unique email
  const email = `susmita${Date.now()}@example.com`;
  await page.locator('#Email').fill(email);

  await page.locator('#Password').fill('Test@12345');
  await page.locator('#ConfirmPassword').fill('Test@12345');

  // Click Register Button
  await page.locator('#register-button').click();

  // Verify Registration Success
  await expect(page.locator('.result')).toContainText('Your registration completed');

  // Click Continue after successful registration
  await page.getByRole('button', { name: 'Continue' }).click();

  // Go to Books page
  await page.goto('https://demowebshop.tricentis.com/books');

  // Add Computing and Internet book to cart (scoped to that product only)
  await page
    .locator('.product-item')
    .filter({ hasText: 'Computing and Internet' })
    .locator('.product-box-add-to-cart-button')
    .click();

  // Verify the "added to cart" notification
  await expect(page.locator('.bar-notification.success')).toContainText('The product has been added to your');

  // Verify the book is in the cart
  await page.goto('https://demowebshop.tricentis.com/cart');
  await expect(page.locator('.cart .product-name')).toContainText('Computing and Internet');
});