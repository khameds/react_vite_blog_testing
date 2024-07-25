import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Admin | Authentification success", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrlBackoffice"));
  });

  it("Login as an admin", function () {
    cy.signin(adminMail, adminPassword).then(() => {
      cy.get("nav").should("have.attr", "data-headlessui-state");
    });
  });
});

describe("Admin | Authentification failure", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrlBackoffice"));
  });

  it("Login with invalid creditentials", function () {
    cy.signin(faker.internet.email(), faker.internet.password()).then(() => {
      cy.get("nav") 
      .should('not.exist');
    });
  });

  it("Login without a password", function () {
    cy.signin(userMail, null).then(() => {
      cy.get("nav") 
      .should('not.exist');
    });
  });

  it("Login as a regular user", function () {
    cy.signin(userMail, userPassword).then(() => {
      cy.get("nav") 
      .should('not.exist');
    });
  });
});
