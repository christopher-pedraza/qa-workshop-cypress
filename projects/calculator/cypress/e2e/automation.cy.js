function randomMail() {
  //   return "g8rawdt64xxtr@test.com";
  return (
    Math.random()
      .toString(36)
      .substring(2) + "@test.com"
  );
}

describe("Prueba de funcionalidad de http://www.automationpractice.pl/", () => {
  beforeEach(() => {
    cy.visit("http://www.automationpractice.pl/index.php");
  });

  const mail = randomMail();

  const registro = () => {
    cy.get(".login").click();
    cy.get("#email_create").type(mail);
    cy.get("#SubmitCreate > span").click();
    cy.get("#id_gender1").click();
    cy.get("#customer_firstname").type("Nombre");
    cy.get("#customer_lastname").type("Apellido");
    cy.get("#passwd").type("password");
    cy.get("#days").select("4");
    cy.get("#months").select("1");
    cy.get("#years").select("2003");
    cy.get("#submitAccount > span").click();
    cy.get(".myaccount-link-list > :nth-child(1) > a > span").click();
    cy.get("#firstname").type("Nombre");
    cy.get("#lastname").type("Apellido");
    cy.get("#address1").type("Calle 123");
    cy.get("#city").type("Ciudad");
    cy.get("#id_state").select("Alabama");
    cy.get("#postcode").type("12345");
    cy.get("#phone_mobile").type("1234567890");
    cy.get("#alias")
      .clear()
      .type("Casa");
    cy.get("#submitAddress > span").click();
    cy.get(".page-subheading").should("have.text", "Casa");
  };

  const login = () => {
    cy.get(".login").click();
    cy.get("#email").type(mail);
    cy.get("#passwd").type("password");
    cy.get("#SubmitLogin > span").click();
  };

  const agregarCarrito = () => {
    cy.get("#search_query_top").type("Faded");
    cy.get("#searchbox > .btn").click();
    cy.get(".product-container").should("have.length", 1);
    cy.get(".lnk_view > span").click();
    cy.get("#group_1").select("L");
    cy.get("#color_13").click();
    cy.get(".exclusive > span").click();
    cy.get(".cross").click();
    cy.get('[title="View my shopping cart"]').click();
  };

  it("Prueba de registro", () => {
    registro();
  });

  it("Prueba de login", () => {
    login();
    cy.get(":nth-child(4) > a > span").click();
    cy.get("#email").should("have.value", mail);
  });

  it("Prueba de busqueda", () => {
    cy.get("#search_query_top").type("Faded");
    cy.get("#searchbox > .btn").click();
    cy.get(".product-container").should("have.length", 1);
  });

  it("Prueba de agregar al carrito", () => {
    login();
    agregarCarrito();
    cy.get("#summary_products_quantity").should("have.text", "1 product");
  });

  it("Comprar un producto", () => {
    login();
    agregarCarrito();
    cy.get(".cart_navigation > .button > span").click();
    cy.get(".cart_navigation > .button > span").click();
    cy.get("#cgv").click();
    cy.get(".cart_navigation > .button > span").click();
    cy.get(".bankwire").click();
    cy.get("#cart_navigation > .button > span").click();
    cy.get(".alert").should("have.text", "Your order on My Shop is complete.");
  });
});
