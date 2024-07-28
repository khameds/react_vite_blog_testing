import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | filter article by category| article exists in the category", () => {
  before(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword)
    .then(() => {
    });
    
    
  });
 

  it("Article exists", function () {
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
 
    });

describe("Blog | filter article by category | article does not exist in the category", () => {
  before(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword)
      .then(() => {
        });
        
        
      });
     
    
      it("Article does not exist in the category", function () {
        cy.wait(3000);
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