import { faker } from "@faker-js/faker";

const {
  userMail,
  userPassword,
  userPseudo,
  userFirstName,
  userLastname,
  userAvatar,
} = require("../fixtures/cyr_users.json");

describe("User view home page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("User click inscription", function () {
    cy.get("._buttonStyle_1lrjo_107 > ._button_1ahi6_1").click();
    cy.get("#firstname").type(userFirstName);
    cy.get("#lastname").type(userLastname);
    cy.get("#pseudo").type(userPseudo);
    cy.get("#avatar").type(userPseudo);
    cy.get("#password").type(userAvatar);
    cy.get("#email").type(useremail);
  });
});
