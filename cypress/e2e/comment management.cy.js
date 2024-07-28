import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | consult and update a article", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail, userPassword);
    cy.wait(3000);
  });
 

  it("Consult a comment", function () {
    
    const comment = faker.lorem.sentence(3);
    cy.visit("http://localhost:5173/dashboard");
    cy.get('a[href="/article-details/20"]').click();  
  });

  it("Update a comment", function () {
    
    const comment = faker.lorem.sentence(3);
    cy.visit("http://localhost:5173/dashboard");
    cy.get('a[href="/article-details/20"]').click();
    cy.contains('button','Editer').first().click();
    cy.get('#description').click().clear().type(comment);
    cy.contains('button','Modifier').click();
    cy.contains(comment).click();
  });
});



    

