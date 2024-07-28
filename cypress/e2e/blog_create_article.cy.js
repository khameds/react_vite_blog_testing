import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | create article", () => {
  before(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword)
    .then(() => {
    });
    
    
  });
 
 it("Create article", function () {
    cy.wait(3000);
    cy.visit("http://localhost:5173/dashboard");
    cy.contains('button','Ajouter un article').click();
    cy.get('#title').type("New article test");
    cy.get('#description').type("My new article test");
    cy.get('#categorie').select('Cypress');
    cy.get('._buttonAddArticle_wunh8_183').click();
    cy.contains('New article test');

      });

 
    });
