describe("JWT session", () => {
  beforeEach(() => {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function(window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
  });

  it("Comprar par de tenis", () => {
    cy.get(".card-body button:last-of-type")
      .eq(1) // segundo del array
      .click();

    // El boton tiene un routerlink con la ruta /dashboard/cart
    // *= "cart" significa que contiene la palabra cart
    cy.get("[routerlink *= 'cart']").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder *= 'Country']").type("mex");
    // each permite iterar sobre un array de elementos
    // $ se utiliza para referenciar al elemento
    cy.get(".ta-results button").each(($el, index, $list) => {
      if ($el.text() === " Mexico") {
        cy.wrap($el).click();
      }
    });

    cy.get(".action__submit").click();
  });
});
