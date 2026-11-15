//Q3: Product Search E2E Test using playwright and page object model (POM)
import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/ProductPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';

test('Q3 - Product Search E2E', async ({ page }, testInfo) => {

  test.setTimeout(120000); // long E2E flow on a slow demo site

  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Open Demo Web Shop
  await page.goto('https://demowebshop.tricentis.com/');

  // Step 2: Search Product
  await productPage.searchProduct('Computing and Internet');

  // Step 3: Verify Search Result (exact title only)
  const productLink = page.getByRole('link', {
    name: 'Computing and Internet',
    exact: true
  });
  await expect(productLink).toBeVisible();

  // Step 4: Take Search Screenshot
  await testInfo.attach('Q3-Search-Result', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  });

  // Step 5: Open Product Details Page
  await productLink.click();

  // Step 6: Verify Product Details Page
  await expect(
    page.getByRole('heading', { name: 'Computing and Internet', exact: true })
  ).toBeVisible();

  // Step 7: Increase Product Quantity
  await page.locator('#addtocart_13_EnteredQuantity').fill('2');

  // Step 8: Add Product to Cart
  await page.locator('#add-to-cart-button-13').click();

  // Step 9: Verify Success Notification
  await expect(page.locator('.bar-notification.success'))
    .toContainText('The product has been added to your');

  // Step 10: Open Shopping Cart
  await cartPage.openCart();

  // Step 11: Verify Product in Cart
  await cartPage.verifyProduct('Computing and Internet');

  // Step 12: Verify Quantity
  await expect(cartPage.quantityInput).toHaveValue('2');

  // Step 13: Agree to Terms and Checkout
  await cartPage.agreeAndCheckout();

  // Step 14: Checkout as Guest
  await page.locator('input.checkout-as-guest-button').click();

  // Step 15: Billing, shipping, payment and confirm
  await checkoutPage.fillBillingDetails({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'United States',
    city: 'New York',
    address1: '123 Main St',
    zipCode: '10001',
    phoneNumber: '1234567890'
  });
  await checkoutPage.completeCheckout();
  await checkoutPage.verifyOrder();

  // Step 16: Final screenshot
  await testInfo.attach('Q3-Order-Confirmation', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  });
});