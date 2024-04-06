describe("Suite de pruebas para banco BBVA", () => {
	beforeEach(() => {
		cy.visit('http://zero.webappsecurity.com/')
	})

	it('Validar pagina de inicio', () => {
		// Validar que la imagen de la pagina de inicio sea visible
		cy.get('.active > img').should('be.visible')
		// validar que exista el texto de Online Banking
		cy.get('.active > .custom > h4')
	})

	it('Prueba de transferencia de fondos', () => {
		// Validar la pagina de transferencia de fondos
		// Usar el usuario username
		// Usar la contraseña password
		cy.get('#signin_button').click()
		cy.get('#user_login').type('username')
		cy.get('#user_password').type('password')
		// cy.get('.btn').click()
		// cy.visit('http://zero.webappsecurity.com/bank/transfer-funds.html')
	})

	it('Validar apartado de feedback', () => {
		// Llenar los campos necesarios
		// Enviar el feedback dando click al boton de enviar
		cy.get('#feedback > div > strong').click()
		cy.get('#name').type('Nombre')
		cy.get('#email').type('correo@mail.mx')
		cy.get('#subject').type('Página lenta')
		cy.get('#comment').type('Medio lenta su página... ni pude hacer login...')
		cy.get('.btn-signin').click()
		cy.get('.offset3').contains('Thank you for your comments')
	})
})