export class CartPage {

  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('.cart-label');
    this.cartTable = page.locator('.cart');
    this.quantityInput = page.locator('.qty-input');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async openCart() {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
  }

  async verifyProduct(productName) {
    await this.cartTable.getByText(productName).waitFor();
  }

  async agreeAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}