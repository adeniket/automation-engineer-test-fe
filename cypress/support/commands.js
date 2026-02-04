// /**
//  * Custom Cypress Commands for Authentication Testing
//  */

// /**
//  * Custom command to login a user
//  * @example cy.login('test@example.com', 'password123')
//  */
// Cypress.Commands.add('login', (email, password) => {
//   cy.visit('/login');
//   cy.get('input[name="email"]').clear().type(email, { delay: 50 });
//   cy.get('input[name="password"]').clear().type(password, { delay: 50 });
//   cy.get('button:contains("Login")').click();
//   // Wait for redirect
//   cy.url().should('not.include', '/login', { timeout: 5000 });
// });

// /**
//  * Custom command to register a user
//  * @example cy.register('John Doe', 'test@example.com', 'password123', 'password123')
//  */
// Cypress.Commands.add('register', (name, email, password, confirmPassword) => {
//   cy.visit('/register');
//   cy.get('input[name="name"]').clear().type(name, { delay: 50 });
//   cy.get('input[name="email"]').clear().type(email, { delay: 50 });
//   cy.get('input[name="password"]').clear().type(password, { delay: 50 });
//   cy.get('input[name="confirmPassword"]').clear().type(confirmPassword, { delay: 50 });
//   cy.get('button:contains("Register")').click();
//   // Wait for response
//   cy.get('div.bg-green-50, div.bg-red-50', { timeout: 5000 }).should('be.visible');
// });

// /**
//  * Custom command to logout
//  * @example cy.logout()
//  */
// Cypress.Commands.add('logout', () => {
//   cy.get('button:contains("Logout")').click();
//   cy.url().should('include', '/login', { timeout: 5000 });
// });

// /**
//  * Custom command to verify auth token is persisted
//  * @example cy.verifyTokenPersisted()
//  */
// Cypress.Commands.add('verifyTokenPersisted', () => {
//   cy.window().then((win) => {
//     const store = win.localStorage.getItem('user-store');
//     expect(store).to.exist;
//     const parsedStore = JSON.parse(store);
//     expect(parsedStore.state.authToken).to.exist;
//   });
// });

// /**
//  * Custom command to clear all stored data
//  * @example cy.clearAllStorage()
//  */
// Cypress.Commands.add('clearAllStorage', () => {
//   cy.window().then((win) => {
//     win.localStorage.clear();
//     win.sessionStorage.clear();
//   });
//   cy.clearCookies();
// });

// /**
//  * Custom command to wait for API response
//  * @example cy.waitForAPI('POST', '/api/auth/login')
//  */
// Cypress.Commands.add('waitForAPI', (method, endpoint) => {
//   cy.intercept(method, `**${endpoint}**`).as('apiCall');
//   cy.wait('@apiCall', { timeout: 10000 });
// });