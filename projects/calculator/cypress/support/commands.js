// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { expect } = require("chai");

// adw6ag165ea1d6@test.com
// Zyz44pE4
Cypress.Commands.add("LoginAPI", () => {
  cy.fixture("login").then(data => {
    cy.request(
      "POST",
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      data,
    ).then(response => {
      expect(response.status).to.eq(200);
      Cypress.env("token", response.body.token);
    });
  });
});
