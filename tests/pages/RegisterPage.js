export class RegisterPage {

constructor(page) {
this.page = page;
this.maleRadio = page.locator('#gender-male');
this.firstName = page.locator('#FirstName');
this.lastName = page.locator('#LastName');
this.email = page.locator('#Email');
this.password = page.locator('#Password');
this.confirmPassword = page.locator('#ConfirmPassword');
this.registerButton = page.locator('#register-button');
this.successMessage = page.locator('.result');
}

async open() {
await this.page.goto('https://demowebshop.tricentis.com/register');
}

async register(firstName, lastName, email, password) {
await this.maleRadio.check();
await this.firstName.fill(firstName);
await this.lastName.fill(lastName);
await this.email.fill(email);
await this.password.fill(password);
await this.confirmPassword.fill(password);
await this.registerButton.click();
}
}

module.exports = { RegisterPage };