import LoginPage from '../support/pages/LoginPage';
import loginutil from '../util/loginutil';

describe('Auth State Tests', function() {

    // Load login data fixture before each test
  beforeEach(function() {
    cy.visit('');
    cy.fixture('loginData.json').as('loginData');
  });

    it('should maintain auth state after page refresh', function() {
        // Perform login
        loginutil.login('valid');
        // Assert successful login
      LoginPage.verifySuccessMessage().should('contain', 'Login successful');
        // Refresh the page
        cy.reload();
        // Assert user is still logged in
        cy.contains('Logout').should('be.visible');
    });
    it('should maintain auth state across different pages', function() {
        // Perform login
        loginutil.login('valid');
        // Assert successful login
      LoginPage.verifySuccessMessage().should('contain', 'Login successful');
        // Refresh the page
        cy.reload();
        // Assert logout button is visible
        LoginPage.getLogoutButton().should('be.visible');
        // Navigate back to the login page
        LoginPage.clickLogoutButton();
        // Assert redirection to login page
        cy.url().should('include', '/login');
        // Assert login button is visible again
        LoginPage.getLoginButton().should('be.visible');
    });
    it('should clear authentication token on logout', function() {
    // Perform login first
    loginutil.login('valid');
        LoginPage.clickLogoutButton();
        
        cy.window().then((win) => {
            const store = win.localStorage.getItem('user');
            
            // 3. FIXED: Handle both scenarios (Store exists but empty, or Store is gone)
            if (store) {
                const parsedStore = JSON.parse(store);
                // Assert token is null, undefined, or empty string
                expect(parsedStore.state.authToken).to.be.not.ok; 
            } else {
                // If store is null, the token is definitely gone. Test passes.
                expect(store).to.be.null; 
            }
        });
    });
});


   