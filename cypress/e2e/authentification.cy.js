import { faker } from "@faker-js/faker";
const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
} = require("../fixtures/users.json");

describe("Authentification success", () => {
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
});

describe("Authentification failure", () => {
  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.visit(Cypress.env("baseUrl"));
  });

  it("Login with invalid creditentials", function () {
    cy.signin(faker.internet.email(), faker.internet.password())
    .then(() => {
    });
  });

  it("Login without a password", function () {
    cy.signin(userMail, null)
    .then(() => {
    });
  });
});
