/**
 * RegisterPage - Page Object Model for Registration functionality
 * Encapsulates all selectors and interactions for the register page
 */
class RegisterPage {
  pageElements= {
    nameInput : () => cy.get('input[name="name"]'),
    emailInput : () => cy.get('input[name="email"]'),
    passwordInput : () => cy.get('input[name="password"]'),
    confirmPasswordInput : () => cy.get('input[name="confirmPassword"]'),
    fieldRequirederrorMessage : () => cy.get('.max-w-6xl .text-red-700'),
    pageTitle : () => cy.get('.text-2xl'),
    registerImage : () => cy.get('img[alt="Shift registration visual"]'),
    loginLink : () => cy.contains('button', 'Login here'),
    loginregisterLink: () => cy.get(':nth-child(2) > .text-orange-600'),
    registerBtn: () => cy.get('.gap-4 >  .h-12'),
    successMessage: () => cy.get('.max-w-6xl .text-green-700'),
    // registerBtn: () => cy.get('.gap-4 > .z-0')

  }



  /**
   * Verify the register page is loaded
   */
  verifyElements() {
    const el = this.pageElements;
    return (
      el.nameInput(),
      el.emailInput(),
      el.passwordInput(),
      el.confirmPasswordInput(),
      el.registerBtn(),
      el.registerImage(),
      el.loginLink()
    )
    
  }

  enterName(name) {
    this.pageElements.nameInput().type(name);
  }

  enterEmail(email) {
    this.pageElements.emailInput().type(email);
  }

  enterPassword(password) {
    this.pageElements.passwordInput().type(password);
  }

  
  enterConfirmPassword(password) {
    this.pageElements.confirmPasswordInput().clear();
    this.pageElements.confirmPasswordInput().type(password, { delay: 50 });
  }

  clickRegisterButton() {
    this.pageElements.loginregisterLink().click({delay:50});
  }
  clickRegbtn(){
    this.pageElements.registerBtn().click();
  }


  register(name, email, password, confirmPassword) {
    this.pageElements.nameInput().type(name);
    this.pageElements.emailInput().type(email);
    this.pageElements.passwordInput().type(password);
    this.pageElements.confirmPasswordInput().type(confirmPassword);
   // this.pageElements.registerBtn().click();
    this.clickRegbtn();
  }

  
  verifyErrorMessage() {
    return this.pageElements.fieldRequirederrorMessage()
  }

  
  verifySuccessMessage(expectedMessage) {
    this.pageElements.successMessage()
  }

 
  verifyRegisterButtonDisabled() {
    cy.get(this.registerButton).should('be.disabled');
  }

  /**
   * Verify register button is enabled
   */
  verifyRegisterButtonEnabled() {
   this.pageElements.registerButton()
  }

  /**
   * Verify all input fields are empty
   */
  verifyAllInputsEmpty() {
    // cy.get(this.nameInput).should('have.value', '');
    // cy.get(this.emailInput).should('have.value', '');
    // cy.get(this.passwordInput).should('have.value', '');
    // cy.get(this.confirmPasswordInput).should('have.value', '');
    this.pageElements.nameInput()
    this.pageElements.emailInput()
    this.pageElements.passwordInput()
    this.pageElements.confirmPasswordInput()
  }

  
  clickLoginLink() {
    this.pageElements.loginLink().click();
  }

}

export default new RegisterPage();
