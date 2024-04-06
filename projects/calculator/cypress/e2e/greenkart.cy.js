describe('Prueba de funcionalidad de la pagina de greenkart', () => {
	beforeEach(() => {
		cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
	})

	it('Probar que al escribir ca se muestren 4 elementos', () => {
		cy.get('.search-keyword').type('ca')
		cy.wait(2000)
		cy.get('.product:visible').should('have.length', 4)
	})

	it('Realizar una orden de producto', () => {
		cy.get('.search-keyword').type('p')
		cy.wait(2000)
		cy.get(':nth-child(2) > .stepper-input > .increment').click()
		cy.get(':nth-child(2) > .stepper-input > .increment').click()
		cy.get(':nth-child(2) > .product-action > button').click()
		cy.get('.cart-icon > img').click()
		cy.get('.cart-preview > .action-block > button').click()
		cy.get('[style="text-align: right; width: 100%; margin-top: 20px; margin-right: 10px;"] > :nth-child(14)').click()
		cy.get('select').click()

	})
})