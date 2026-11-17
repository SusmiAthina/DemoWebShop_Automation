Demo Web Shop Automation & API Testing
Project Overview
This project focuses on automating the Demo Web Shop website using Playwright and JavaScript. It includes UI automation test cases and API testing.

Technology Stack
JavaScript
Node.js
Playwright
Page Object Model (POM)
Postman
Newman
Allure Report
UI Automation Test Cases
Q1: Invalid Login
Verify login with invalid credentials.
Validate the appropriate error message.
Q2: User Registration and Add to Cart
Register a new user.
Select a product.
Add the product to the shopping cart.
Verify the product in the cart.
Q3: Product Search E2E
Search for a product.
Verify search results.
Add the product to the cart.
Complete the checkout process.
Verify successful order confirmation.
Project Structure
Demoshop_Automation/
│
├── tests/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ProductPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   │
│   ├── invalidLogin.spec.js
│   ├── registerAddToCart.spec.js
│   └── productSearch.spec.js
│
├── playwright.config.js
├── package.json
└── README.md
Installation and Setup
Install Node.js.
Clone the repository.
Open the project folder in VS Code.
Install dependencies:
npm install
Install Playwright browsers:
npx playwright install
Run Individual Tests
Q1 - Invalid Login
npx playwright test tests/invalidLogin.spec.js --project=chromium
Q2 - Register and Add to Cart
npx playwright test tests/registerAddToCart.spec.js --project=chromium
Q3 - Product Search E2E
npx playwright test tests/productSearch.spec.js --project=chromium
Run All Tests
npx playwright test
HTML Report
Generate and open the Playwright HTML report:

npx playwright show-report
Allure Report
Generate Allure report:

npx allure generate allure-results --clean
Open Allure report:

npx allure open allure-report
API Testing
API testing is performed using Postman and Newman.

PS C:\Users\Susmita\Desktop\Demoshop_Automation> Copy-Item .\tests\README.md .

API Automation
API testing is performed using Postman and Newman.

API: https://jsonplaceholder.typicode.com/users

Test Scenarios:
1. GET All Users - Validate status code 200 and user details.
2. GET Single User - Retrieve a user using a dynamic ID.
3. PUT Update User - Update user name, email, and company name.

Run API Tests:
newman run ./api-tests/API_Automation_JSONplaceholder.json

API Allure Report:
The API Allure HTML report is available in:
_api_run/allure-report

Generate API Allure Report:
allure generate .\_api_run\allure-results --clean -o .\_api_run\allure-report

Open API Allure Report:
allure open .\_api_run\allure-report

Screenshots:
Q3 Search Result: screenshots/Q3-Search-Result.png
Q3 Order Confirmation: screenshots/Q3-Order-Confirmation.png
