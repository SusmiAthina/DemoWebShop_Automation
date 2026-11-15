export class ProductPage {

constructor(page) {
this.page = page;
this.searchBox = page.locator('#small-searchterms');
this.searchButton = page.locator('.search-box-button');
this.productItems = page.locator('.product-item');
}

async searchProduct(productName) {
await this.searchBox.fill(productName);
await this.searchButton.click();
}

async openProduct(productName) {
await this.page.getByRole('link', {
name: productName,
exact: true
}).click();
}
}