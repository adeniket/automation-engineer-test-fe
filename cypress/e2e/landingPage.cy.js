import LandingPage from "../support/pages/landingPage";
describe('Landing Page Tests', () => {
    beforeEach(() => {
      cy.visit('');
    });
  
  it('Verify All Element Exist on the Landing Page', () => {
    // Assert that all elements are present
    LandingPage.verifyAllElementsExist().should ('exist');
  })
  it('Verify user is on landing page', () => {
    // Assert that URL is correct
    cy.url().should('eq', 'http://localhost:5173/login')
  })
  it('Logo is visible', () => {
    // Assert that logo is visible
    LandingPage.pageElements.ortaLogo().should('be.visible')
  })

  it('Allows typing into email and password fields', () => {
    // Type into email and password fields and assert the values
    LandingPage.pageElements.Emailfield().find('input').type('test@example.com').should('have.value', 'test@example.com')
    LandingPage.pageElements.Passwordfield().find('input').type('P@ssw0rd').should('have.value', 'P@ssw0rd')
  })

  it('Register link navigates to register page', () => {
    // Click register link and assert URL
    LandingPage.pageElements.registerLink().click()
    cy.url().should('include', '/register')
  })

  it('Forgot password link navigates to forgot-password page', () => {
    // Click forgot password link and assert URL
    LandingPage.pageElements.forgotPasswordLink().click()
    cy.url().should('include', '/forgot-password')
  })
})