import { faker } from "@faker-js/faker";
const {
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | Article management", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword);
    cy.wait(3000);
  });
 
  it("Create article", function () {
    cy.visit("http://localhost:5173/dashboard");
    cy.contains('button','Ajouter un article').click();
    cy.get('#title').type("New article test");
    cy.get('#description').type("My new article test");
    cy.get('#categorie').select('Cypress');
    cy.get('#loginForm button:contains("Ajouter")').click();
    cy.contains('New article test');

  });

  it("check the content of an article", function () { 
    cy.visit("http://localhost:5173/dashboard");
    cy.get('a[href="/article-details/20"]').click();
    // cy.contains('Demulceo incidunt calco.').should('exist');
  });
});

describe("Blog | Article filtering using categories", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword)
    cy.wait(3000);
  });

  it("Display selected categories", function () {
    cy.wait(3000);
    cy.visit("http://localhost:5173/dashboard");
    cy.get('span').contains('Postman').click();
    cy.contains('User-friendly zero defect attitude').should('exist');
    cy.get('span').contains('Cypress').click();
    cy.contains('Diverse directional structure').should('exist');
    cy.get('span').contains('JMeter').click();
    cy.contains('Expanded 4th generation definition').should('exist');
    cy.get('span').contains('Selenium').click();
    cy.contains('Triple-buffered incremental contingency').should('exist');
  });

  it("Hide non-selected categories", function () {
    cy.visit("http://localhost:5173/dashboard");
    cy.get('span').contains('Postman').click();
    cy.contains('Diverse directional structure').should('not.exist');
    cy.get('span').contains('Cypress').click();
    cy.contains('User-friendly zero defect attitude').should('not.exist');
    cy.get('span').contains('JMeter').click();
    cy.contains('User-friendly zero defect attitude').should('not.exist');
    cy.get('span').contains('Selenium').click();
    cy.contains('User-friendly zero defect attitude').should('not.exist');
  });
});