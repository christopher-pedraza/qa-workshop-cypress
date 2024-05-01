describe("Pruebas de stackoverflow", () => {
  it("Buscar en stackoverflow", () => {
    cy.visit("https://stackoverflow.com/");
    cy.get('input[name="q"]')
      .type("Cypress")
      .type("{enter}");
    cy.get(".question-summary").should("be.visible");
  });
});
