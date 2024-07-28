import { faker } from "@faker-js/faker";
import '@percy/cypress';

const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
  userFirstname,
  userLastname
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

describe("Admin | Authentification success", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrlBackoffice"));
  });

  it("Login as an admin", function () {
    cy.signin(adminMail, adminPassword).then(() => {
      cy.get("nav").should("have.attr", "data-headlessui-state");
    });
  });

  it('Visual regression test', () => {
    cy.percySnapshot('Authentification page');
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

describe("Blog | User profile", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail,userPassword);
    cy.wait(4000);
    cy.get('a[href="/profile-page"]').click();
    cy.url().should('include', '/profile-page');
    cy.reload(true);  
  });

  it("Retrieve user infos", function () {
    cy.contains(userFirstname);
    cy.contains(userLastname);
  });

  it('Password update', () => {
    cy.get('button:contains("Modifier mon mot de passe")').click();

    cy.get('#oldPassword').type(userPassword);
    cy.get('#newPassword').type(userPassword);
    cy.get('#passwordEditForm  button:contains("Modifier mon mot de passe")').click();
  });

  it('Visual regression test', () => {
    cy.percySnapshot('Authentification page');
  });

});