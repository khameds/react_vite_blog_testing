import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | consult and update a article", () => {
  before(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword)
    .then(() => {
    });
     
  });
 

  it("consult and update a comment", function () {
    cy.wait(3000);
    cy.visit("http://localhost:5173/dashboard");
    cy.get('a[href="/article-details/20"]').click();
    cy.contains('button','Editer').first().click();
    cy.get('#description').click().clear().type('Cum enim non instituto aliquo aut more aut lege sit opinio constituta maneatque ad unum omnium firma consensio.');
    cy.contains('button','Modifier').click();
    cy.contains('Cum enim non instituto aliquo aut more aut lege sit opinio constituta maneatque ad unum omnium firma consensio.').click();
  
  });

 
    });



    

