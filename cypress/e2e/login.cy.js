/**
 * Login UI Tests
 * Tests for user login functionality, validation, and error handling
 */

import LoginPage from '../support/pages/LoginPage';

describe('Login Page UI Tests', function() {
  // Load login data fixture before each test
  beforeEach(function() {
    cy.visit('');
    cy.fixture('loginData.json').as('loginData');
  });

    it('should load the login page with all required elements', () => {
      // Assert that login page elements are loaded
      LoginPage.verifyPageLoaded();
    });

    it('should display the correct page title', () => {
      // Assert that the page title is correct
      LoginPage.getPageTitle().should('contain', 'Shift Manager Login');
    });

    it('should display the landing image', () => {
      // Assert that the landing image is visible
      cy.url().should('include', '/login');
    });

    it('should have all input fields visible', () => {
      // Assert that email and password input fields are visible
     LoginPage.verifyPageLoaded().should('be.visible')
    });

    it('Verify Workers valid login', function() {
      LoginPage.login(this.loginData.validloginWorker.email, this.loginData.validloginWorker.password);
      // Assert successful login
      LoginPage.verifySuccessMessage().should('contain', 'Login successful');
      // Assert logout button is visible once worker is logged in
      LoginPage.getLogoutButton().should('be.visible');
    });
    it('Verify Admin valid login', function() {
      LoginPage.login(this.loginData.validloginAdmin.email, this.loginData.validloginAdmin.password);
      // Assert successful login
      LoginPage.verifySuccessMessage().should('contain', 'Login successful');
      // Assert logout button is visible once admin is logged in
      LoginPage.getLogoutButton().should('be.visible');
    });
    it('should display error message for invalid login', function() {
      LoginPage.login(this.loginData.invalidlogin.email, this.loginData.invalidlogin.password);
      // Assert error message is displayed
      LoginPage.verifyErrorMessage().should('contain', 'Invalid email or password');
    });
    it('should display validation messages for empty fields', function() {
      LoginPage.enterEmail();
      LoginPage.enterPassword();
      LoginPage.clickLoginButton();
      // Assert validation messages are displayed
      LoginPage.verifyErrorMessage().should('contain', 'All fields are required.');
  });
   it('Verify Unregistered user cannot login', function() {
    LoginPage.login(this.loginData.unregisteredUser.email, this.loginData.unregisteredUser.password);
    // Assert error message for unregistered user
    LoginPage.verifyErrorMessage().should('contain', 'User does not exist');
  });
});
    