 ## Here is a comprehensive  documentation file for the project. It covers the setup, architecture, and strategy based on the code provided.

 ## Frontend UI Automation Documentation
This document outlines the test strategy, architecture, and execution steps for the Frontend UI Automation project. The framework is built using Cypress for end-to-end (E2E) testing and integrates with GitHub Actions for Continuous Integration.

# 1. Getting Started
Prerequisites
Node.js (Latest Stable Version)

npm (Node Package Manager)

## Installation
Clone the repository and install the project dependencies:

```
Bash
npm install
```

## Running Tests Locally
You can execute the tests in two modes:

### 1. Interactive Mode (Test Runner) Opens the Cypress UI to visually debug and run specific spec files.

```
Bash
npx cypress open
```
### 2. Headless Mode (CI Simulation) Runs all tests in the terminal, similar to how they run in the CI environment.

```
Bash
npx cypress run
```
### Reporting
The project uses Allure for test reporting. To generate and view the report after a run:
```
Bash
npx allure-commandline generate allure-results --clean --single-file --output ./cypress/report
```
# 2. CI/CD Pipeline Configuration

The Continuous Integration pipeline is defined in .github/workflows/frontend.yml. It ensures that every Pull Request is automatically tested before merging.

***Trigger:*** The pipeline activates on pull_request events targeting the branches: - frontendSetup.

***Environment:*** Runs on ubuntu-latest.

### Pipeline Steps
***Checkout:*** Pulls the latest code using actions/checkout@v3.

***Install Dependencies:*** Runs npm install to set up the environment.

***Test Execution:*** Executes the full suite via npx cypress run.

***Report Generation:*** Generates a single-file Allure report, ensuring it runs even if tests fail (if: always()).

***Artifact Upload:*** Uploads the test report to GitHub Artifacts for review.

# 3. Key Design Decisions
## Page Object Model (POM)
We utilize the Page Object Model design pattern to separate test logic (assertions) from page details (selectors). This enhances maintainability and reduces code duplication.

* **LoginPage.js:** Encapsulates interactions for the Login UI. It includes methods for actions (enterEmail, clickLoginButton) and specific element verifications (verifySuccessMessage, getLogoutButton).

* **landingPage.js:** Manages selectors for the Landing page, including the logo, login/register links, and input fields. It provides a method verifyAllElementsExist to batch-verify the presence of core UI components.

* **RegisterPage:** (Referenced in register.cy.js) Handles the registration form interactions and error validation.

## Utility Helpers
To keep tests clean and readable, reusable logic is abstracted into utility classes.

* **loginutil:**  A helper module that manages login workflows. It uses a switch statement to handle different test scenarios ('valid', 'invalid') by pulling data directly from fixtures (loginData.json). This allows test files to perform complex login actions with a single line of code: loginutil.login('valid').

## Data-Driven Testing
Test data is separated from test logic using Cypress Fixtures.

* **loginData.json:** Stores credentials for different user personas (Workers, Admins, Unregistered users) to ensure tests can be easily updated without modifying the code.

# 4. Test Strategy & Coverage
The test suite is divided into functional areas covering the critical user journey.

## A. Authentication & State (authStatePage.cy.js)
Focuses on security and session persistence.

* **Session Persistence:** Verifies that a user remains logged in after a page refresh (cy.reload()).

* **Navigation persistence:** Ensures auth state is maintained when navigating between pages and then returning.

* **Security (Logout):** Critically verifies that the authentication token is removed from localStorage upon logout. It specifically checks for two scenarios: the store being empty or the store being completely null.

## B. Login Functionality (login.cy.js)
Validates the core entrance to the application.

* **UI Verification:** Checks for the presence of the title "Shift Manager Login", landing image, and input fields.

* **Role-Based Login:** Verifies successful login for both "Worker" and "Admin" personas using data from fixtures.

* **Negative Testing:** Validates error messages for invalid credentials ("Invalid email or password"), empty fields ("All fields are required"), and unregistered users.

## C. Registration (register.cy.js)
Ensures new users can sign up and verifies form validation logic.

* **Navigation:** Checks links between the Landing page and Registration page.

# Validation Rules:

* Blank submission triggers "All fields are required".

* Mismatched passwords trigger "Passwords do not match".

* Weak passwords trigger complexity warnings (uppercase, symbol, min length).

* Duplicate emails trigger "User already exists".

## D. Landing Page (landingPage.cy.js)
Smoke tests for the initial user interface.

* Element Presence: Verifies the logo, email/password fields, and navigation links exist.

* Routing: Confirms correct URL redirection for Login, Register, and Forgot Password links.

## E. Logout Flow (logout.cy.js)
Redirection: Confirms that clicking logout redirects the user back to /login and renders the login button visible again.