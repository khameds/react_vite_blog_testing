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

Cypress.Commands.add("signup", (firstName, lastName, email, password, pseudo, avatar) => {
    if(firstName)
        cy.get("#firstName").type(firstName);
    if(lastName)
        cy.get("#lastName").type(lastName);
    if(email)
        cy.get("#email").type(email);
    if(password)
        cy.get("#spassword").type(password);
    if(pseudo)
        cy.get("#pseudo").type(pseudo);
    if(avatar)
        cy.get("#avatar").type(avatar);
    cy.get('button:contains("S\'enregistrer")').click();
  });
  
  Cypress.Commands.add("signin", (email, password) => {
    if(email)
        cy.get("#email").type(email);
    if(password)
        cy.get("#password").type(password);
    cy.get('button:contains("Se connecter")').click();
  });