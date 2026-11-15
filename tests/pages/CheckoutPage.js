import { expect } from '@playwright/test';

export class CheckoutPage {

  constructor(page) {
    this.page = page;

    // Billing address
    this.firstName = page.locator('#BillingNewAddress_FirstName');
    this.lastName = page.locator('#BillingNewAddress_LastName');
    this.email = page.locator('#BillingNewAddress_Email');
    this.country = page.locator('#BillingNewAddress_CountryId');
    this.city = page.locator('#BillingNewAddress_City');
    this.address1 = page.locator('#BillingNewAddress_Address1');
    this.zip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phone = page.locator('#BillingNewAddress_PhoneNumber');

    // Continue buttons for each step
    this.billingContinue = page.locator('#billing-buttons-container input.new-address-next-step-button');
    this.shippingMethodContinue = page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');
    this.shippingAddressContinue = page.locator('#shipping-buttons-container input.new-address-next-step-button');
    this.paymentMethodContinue = page.locator('#payment-method-buttons-container input.payment-method-next-step-button');
    this.paymentInfoContinue = page.locator('#payment-info-buttons-container input.payment-info-next-step-button');
    this.confirmButton = page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');

    // Order success
    this.successTitle = page.locator('.order-completed .title strong');
    this.orderNumber = page.locator('.order-completed .details ');
  }

  async fillBillingDetails({
    firstName, lastName, email, country, city,
    address, address1, zip, zipCode, postalCode,
    phone, phoneNumber
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    if (country) await this.country.selectOption({ label: country });
    if (city) await this.city.fill(city);

    const addr = address || address1;
    if (addr) await this.address1.fill(addr);

    const zipValue = zip || zipCode || postalCode;
    if (zipValue) await this.zip.fill(zipValue);

    const phoneValue = phone || phoneNumber;
    if (phoneValue) await this.phone.fill(phoneValue);

    await this.billingContinue.click();
  }

  async completeCheckout() {

// Shipping Address
await expect(this.shippingAddressContinue).toBeVisible({ timeout: 15000 });
await this.shippingAddressContinue.click();

// Shipping Method
await expect(this.shippingMethodContinue).toBeVisible({ timeout: 15000 });
await this.shippingMethodContinue.click();

// Payment Method
await expect(this.paymentMethodContinue).toBeVisible({ timeout: 15000 });
await this.paymentMethodContinue.click();

// Payment Information
await expect(this.paymentInfoContinue).toBeVisible({ timeout: 15000 });
await this.paymentInfoContinue.click();

// Confirm Order
await expect(this.confirmButton).toBeVisible({ timeout: 15000 });
await this.confirmButton.click();
}

  async verifyOrder() {
    await expect(this.successTitle)
      .toContainText('Your order has been successfully processed!', { timeout: 20000 });
    await expect(this.orderNumber).toBeVisible();
  }
}