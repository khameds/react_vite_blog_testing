import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | consult an article", () => {
  before(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword)
    .then(() => {
    });
    
    
  });
 

  it("check the content of an article", function () {
    cy.wait(3000);
    cy.visit("http://localhost:5173/dashboard");
    cy.get('a[href="/article-details/20"]').click();
    cy.contains('Demulceo incidunt calco.').should('exist');

  
  });

 
    });