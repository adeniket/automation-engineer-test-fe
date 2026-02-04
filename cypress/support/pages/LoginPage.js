/**
 * LoginPage - Page Object Model for Login functionality
 * Encapsulates all selectors and interactions for the login page
 */
class LoginPage {
  // Selectors
  elements = {
    emailInput: () => cy.get('input[name="email"]', { timeout: 10000 }),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.contains('button', 'Login'),
    errorMessage: () => cy.get('div.bg-red-50'),
    successMessage: () => cy.get('div.bg-green-50'),
    pageTitle: () => cy.get('.text-2xl'),
    logoutBtn: () => cy.contains('button', 'Logout'),
    createShift: () => cy.get('button[type="button"]').contains('Create Shift'),
    shiftBackButton: () => cy.contains('button', 'Back to Shifts')

  }


  verifyPageLoaded() {
    const el = this.elements;
    return (
      el.emailInput(),
      el.passwordInput(),
      el.loginButton()
    )
  }


  enterEmail() {
    this.elements.emailInput().click();;
  }

  enterPassword() {
    this.elements.passwordInput().click();
  }
  getPageTitle() {
    return this.elements.pageTitle();
  }


  clickLoginButton() {
    this.elements.loginButton().click({ delay: 50 });
  }
  login(email, password) {
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.clickLoginButton();
  }


  clickLogoutButton() {
    this.elements.logoutBtn().click();
  }
  getLogoutButton() {
    return this.elements.logoutBtn();
  }
  getLoginButton() {
    return this.elements.loginButton();
  }

  verifyErrorMessage() {
    return this.elements.errorMessage();
  }


  verifySuccessMessage() {
    return this.elements.successMessage();
  }
  clickCreateShift() {
    this.elements.createShift().click();
  }
  clickBackToShifts() {
    this.elements.shiftBackButton().click();
  }


}

export default new LoginPage();
