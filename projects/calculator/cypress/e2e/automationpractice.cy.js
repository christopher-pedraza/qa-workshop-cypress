const neatCSV = require("neat-csv");
let productName, idFactura;

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
    cy.get(".card-body b")
      .eq(1)
      .then(el => {
        productName = el.text();
      });
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
    cy.wait(2000);
    cy.get(".order-summary button")
      .eq(0)
      .click();
    cy.get(".ng-star-inserted")
      .eq(1)
      .then(el => {
        // Remover los primeros y ultimos 3 caracteres que incluyen espacios y |
        // Esta de esta forma: " | ##### | "
        idFactura = el.text().substring(3, el.text().length - 3);
      });
    // Abrir archivo de csv que esta en la carpeta de descargas
    cy.readFile(
      Cypress.config("fileServerFolder") +
        "/cypress/downloads/order-invoice_adw6ag165ea1d6.csv",
    ).then(async text => {
      const csv = await neatCSV(text);
      console.log("CSV: ", csv);
      const actualProduct = csv[0]["Product Name"];
      expect(productName).to.equal(actualProduct);
      const actualIdFactura = csv[0]["Invoice Number"];
      console.log(
        `Expect idFactura ${idFactura} to equal actualIdFactura ${actualIdFactura}`,
      );
      expect(idFactura).to.equal(actualIdFactura);
    });
  });
});
