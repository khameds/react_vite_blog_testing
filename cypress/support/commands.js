// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("signup", (firstName, lastName, email, password) => {
    if(firstName)
        cy.get("#firstName").type(firstName);
    if(lastName)
        cy.get("#lastName").type(lastName);
    if(email)
        cy.get("#signup-email").type(email);
    if(password)
        cy.get("#signup-password").type(password);
    cy.get('[data-qa="signup-submit-button"]').click();
  });
  
  Cypress.Commands.add("signin", (email, password) => {
    if(email)
        cy.get("#signin-email").type(email);
    if(password)
        cy.get("#signin-password").type(password);
    cy.get('[data-qa="signin-submit-button"]').click();
  });