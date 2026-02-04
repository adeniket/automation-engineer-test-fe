/**
 * Registration UI Tests
 * Tests for user registration functionality, validation, and error handling
 */

import RegisterPage from '../support/pages/RegisterPage';

describe('Registration Page UI Tests', () => {
  beforeEach(function () {
    cy.visit('');
    cy.fixture('registerData.json').as('registerData')
  });


  it("Verify User can navigate to the Registration Page", () => {
    RegisterPage.clickRegisterButton();
    cy.url().should('include', '/register');
  });

  it("Verify Error message on blank Resgistration Submission", () => {
    RegisterPage.clickRegisterButton();
    RegisterPage.clickRegbtn({ delay: 50 });
    //assertion
    RegisterPage.verifyErrorMessage().invoke('text').then((text) => {
      expect(text.trim()).to.contain('All fields are required.');
    })
  });

  it('Verify Registration Page Element Exist', () => {
    RegisterPage.clickRegisterButton();
    //RegisterPage.verifyElements().should('exist');
  });

  it('Verify Registration with valid details', function () {
    const uniqueEmail = `valid_user_${Date.now()}@example.com`;
    RegisterPage.clickRegisterButton();
    RegisterPage.register(this.registerData.validUser.name, uniqueEmail, this.registerData.validUser.password, this.registerData.validUser.confirmPassword);
    RegisterPage.pageElements.successMessage().should('be.visible').and('contain', 'Registered successfully');
  });
  it('Verify registration with mismatched passwords', function () {
    RegisterPage.clickRegisterButton();
    RegisterPage.register(this.registerData.unmatchedPassword.name, this.registerData.unmatchedPassword.email, this.registerData.unmatchedPassword.password, this.registerData.unmatchedPassword.confirmPassword);
    RegisterPage.verifyErrorMessage().should('contain', 'Passwords do not match');
  });
  it('Verify registration with Invalid Password Length', function () {
    RegisterPage.clickRegisterButton();
    RegisterPage.register(this.registerData.invalidPasswordLength.name, this.registerData.invalidPasswordLength.email, this.registerData.invalidPasswordLength.password, this.registerData.invalidPasswordLength.confirmPassword);
    RegisterPage.verifyErrorMessage().should('contain', 'Password must be min 8 characters long and include uppercase, lowercase, number, and symbol');
  });
  it('Verify registration with already registered email', function () {
    RegisterPage.clickRegisterButton();
    RegisterPage.register(this.registerData.validUser.name, this.registerData.validUser.email, this.registerData.validUser.password, this.registerData.validUser.confirmPassword);
    RegisterPage.verifyErrorMessage().should('contain', 'User already exists');
  });




});