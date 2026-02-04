import { de } from "zod/v4/locales"

class LandingPage {
pageElements = {
    ortaLogo: () => cy.get('.basis-0'),
    loginLink: () => cy.get('.flex > .text-sm'),
    registerLink: () => cy.get('.gap-4 > .flex > .z-0'),
    loginHeader: () => cy.get('.text-2xl'),
    Emailfield: () => cy.get(':nth-child(1) > .relative > .inline-flex'),
    Passwordfield: () => cy.get(':nth-child(2) > .relative > .inline-flex'),
    loginButton: () => cy.get('.gap-4 > .z-0'),
    forgotPasswordLink: () => cy.get(':nth-child(1) > .text-orange-600'),
    registerLink: () => cy.get(':nth-child(2) > .text-orange-600'),

}


// Method to interact with
verifyAllElementsExist() {
        const el = this.pageElements
     return ( 
        el.ortaLogo(),
        el.loginLink(),
        el.registerLink(),
        el.loginHeader(),
        el.Emailfield(),
        el.Passwordfield(),
        el.loginButton(),
        el.forgotPasswordLink(),
        el.registerLink()
)
}
}
export default new LandingPage();