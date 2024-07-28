import { faker } from "@faker-js/faker";
import '@percy/cypress';

const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Blog | Authentification success", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("Login as an admin", function () {
    cy.signin(adminMail, adminPassword)
    .then(() => {
      cy.url().should("include", "");
    });
  });

  it("Login as a regular user", function () {
    cy.signin(userMail, userPassword)
    .then(() => {

    });
  });

  it('Visual regression test', () => {
    cy.percySnapshot('Authentification page');
  });
});

describe("Blog | Authentification failure", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("Login with invalid creditentials", function () {
    cy.signin(faker.internet.email(), faker.internet.password())
    .then(() => {
      // cy.get("#email")
      // .should("have.prop", "validity")
      // .and("have.property", "valid", false);
      cy.get("nav") 
      .should('not.exist');
    });
  });

  it("Login without a password", function () {
    cy.signin(userMail, null)
    .then(() => {
      cy.get("nav") 
      .should('not.exist');
    });
  });
});
