const {
  adminMail,
  adminPassword,
  userMail,
  userPassword,
  userFirstname,
  userLastname
} = require("../fixtures/users.json");

describe("Blog | Authentification user", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail,userPassword);
    cy.wait(4000);
    cy.get('a[href="/profile-page"]').click();
    cy.url().should('include', '/profile-page');
    cy.reload(true);  
  });

  it("Profile page contains users' infos", function () {
    cy.contains(userFirstname);
    cy.contains(userLastname);
  });
});

describe("Blog | Authentification user", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.signin(userMail,userPassword);
    cy.wait(4000);
    cy.get('a[href="/profile-page"]').click();
    cy.url().should('include', '/profile-page');
    cy.reload(true);  
  });

  it('Should display the "Modifier mon mot de passe" button', () => {
    cy.get('button._editPassword_krndv_7').should('be.visible');
  });
  it('Should display the "Désactiver mon compte" button', () => {
    cy.get('button._desactiveAccount_krndv_35').should('be.visible');
  });
  it('Should display the "Modifier mon mot de passe" button', () => {
    cy.get('button:contains("Modifier mon mot de passe")').click();
  });
  it('Should display the "Desactiver mon compte" button', () => {
    cy.get('button:contains("Desactiver mon compt').click();
  });
 });
