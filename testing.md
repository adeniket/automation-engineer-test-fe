## Frontend UI Automation Documentation
This document outlines the test strategy, architecture, and execution steps for the Frontend UI Automation project. The framework is built using Cypress for end-to-end (E2E) testing and integrates with GitHub Actions for Continuous Integration.

# 1. Getting Started
# 1. Getting Started
## Prerequisites
- Node.js (v22+)
- npm

## Installation
Clone the repository and install dependencies:
```bash
npm install
```

## Running Tests Locally
We rely on a **Live Backend** strategy for running frontend tests. This ensures tests run against a stable API without needing to seed a local database.

### 1. Start the App (Live Backend)
You must start the frontend with the `VITE_API_BASE_URL` pointing to the live instance:
```powershell
# PowerShell
$env:VITE_API_BASE_URL="https://automation-engineer-test-be.onrender.com/api"; $env:VITE_DISABLE_API_CACHING="true"; npm run dev

# Bash
VITE_API_BASE_URL=https://automation-engineer-test-be.onrender.com/api VITE_DISABLE_API_CACHING=true npm run dev
```

### 2. Run Cypress
In a separate terminal:

**Interactive Mode:**
```bash
npx cypress open
```

**Headless Mode:**
```bash
npx cypress run
```

### Reporting
The project uses Allure for reporting.
1. Tests generate JSON results in `allure-results/`.
2. Generate the HTML report:
```bash
npx allure-commandline generate allure-results --clean --single-file --output ./cypress/report
```
3. Open the report: `cypress/report/index.html` (or serve directly via `npx allure-commandline serve allure-results`).
**Reference:** Test results are stored in `automation-engineer-test-fe\allure-results\`.
# 2. CI/CD Pipeline Configuration

The Continuous Integration pipeline is defined in `.github/workflows/frontend.yml`. It automatically tests every Pull Request.

***Trigger:*** Pull Requests to `main` or `master`.

***Environment:*** `ubuntu-latest`.

### Pipeline Steps
1. **Checkout:** Pulls the code.
2. **Install Dependencies:** `npm install` (installs Cypress and Allure).
3. **Test Execution:** `npx cypress run`
    - **Crucial:** Injects `VITE_API_BASE_URL` pointing to the live Render backend.
    - Sets `VITE_DISABLE_API_CACHING=true` to ensure data freshness.
4. **Report Generation:** Generates Allure report to `./cypress/report`.
5. **Artifact Upload:** Uploads report as `allure-reports`.

# 3. Key Design Decisions

## 1. Local Frontend + Live Backend Strategy
Instead of mocking all APIs or spinning up a complex local backend, we connect the CI frontend to the persistent **Live Backend**.
- **Pros:** Real Integration Testing, Faster CI setup.
- **Cons:** Shared data state.
- **Mitigation:** Tests generate **unique data** (e.g., unique emails for registration) to avoid "User already exists" errors.

## 2. Page Object Model (POM)
(Preserved from original)
We utilize the Page Object Model design pattern...

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

# 5. Recommendations & Observations

## Observations
1. **Non-Unique Element Locators:**
   - **Issue:** Many tests rely on generic CSS classes (e.g., `.text-red-700`, `.max-w-6xl`) or text content.
   - **Impact:** Tests are brittle and susceptible to breaking when styles or copy change. It makes identifying specific elements difficult.


## Recommendations
1. **Implement `data-testid` Attributes:**
   - Add unique `data-testid` attributes to all interactive elements (inputs, buttons) and critical containers (error messages).
   - *Example:* `<button data-testid="login-submit">Login</button>` instead of `cy.get('button[type="submit"]')`.

2. **Dedicated Test Environment:**
   - Ideally, run tests against a dedicated ephemeral backend or a seeded staging environment where data can be reset after each run.

3. **Robust Error Handling:**
   - Ensure backend error messages are consistent (e.g., distinguishing between "User not found" and "Wrong password" vs generic security messages) and handle them gracefully in the UI.