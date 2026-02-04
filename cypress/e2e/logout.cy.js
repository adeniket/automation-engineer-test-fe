/**
 * Logout Behavior Tests
 * Tests for logout functionality and related behaviors
 */

import LoginPage from '../support/pages/LoginPage';
import loginutil from '../util/loginutil';

describe('Logout Behavior Tests', function() {
    // Load login data fixture before each test
  beforeEach(function() {
    cy.visit('');
   cy.fixture('loginData.json').as('loginData');
  });

  it('should logout successfully and redirect to login page', function() {
    // Perform login first
    loginutil.login('valid');
    LoginPage.getLogoutButton().click();
    // Assert redirection to login page
    cy.url().should('include', '/login');
        // Assert login button is visible again
    LoginPage.getLoginButton().should('be.visible');
  });

});