describe('Prueba de funcionalidad de la calculadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.contains('AC').click()
  })

  it('Prueba de sumas', () => {
    cy.contains('2').click()
    // No checa la funcionalidad de las sumas porque existe el boton de negativo +/-
    // cy.contains('+').click()
    cy.get(':nth-child(4) > .orange > button').click()
    cy.contains('6').click()
    cy.contains('=').click()
    cy.get('.component-display').first().should('have.text', '8')
  })

  it('Prueba de restas', () => {
    // 1
    cy.get(':nth-child(4) > :nth-child(1) > button').click()
    // 5
    cy.get(':nth-child(3) > :nth-child(2) > button').click()
    // - 
    cy.get(':nth-child(3) > .orange > button').click()
    // 5
    cy.get(':nth-child(3) > :nth-child(2) > button').click()
    cy.contains('=').click()
    cy.get('.component-display').first().should('have.text', '10')
  })

  it('Prueba de division', () => {
    // 1
    cy.get(':nth-child(4) > :nth-child(1) > button').click()
    // 5
    cy.get(':nth-child(3) > :nth-child(2) > button').click()
    // %
    cy.get(':nth-child(1) > .orange > button').click()
    // 3
    cy.get(':nth-child(4) > :nth-child(3) > button').click()
    cy.contains('=').click()
    cy.get('.component-display').first().should('have.text', '5')
  })

  it('Prueba de multiplicacion', () => {
    // 1
    cy.get(':nth-child(4) > :nth-child(1) > button').click()
    // 5
    cy.get(':nth-child(3) > :nth-child(2) > button').click()
    // *
    cy.get(':nth-child(2) > .orange > button').click()
    // 2
    cy.get(':nth-child(4) > :nth-child(2) > button').click()
    cy.contains('=').click()
    cy.get('.component-display').first().should('have.text', '30')
  })

  it('Prueba de negativos', () => {
    // 6
    cy.get(':nth-child(3) > :nth-child(3) > button').click()
    // +/-
    cy.get(':nth-child(1) > :nth-child(2) > button').click()
    // *
    cy.get(':nth-child(2) > .orange > button').click()
    // 5
    cy.get(':nth-child(3) > :nth-child(2) > button').click()
    cy.contains('=').click()
    cy.get('.component-display').first().should('have.text', '-30')
  })

  it('Prueba de porcentaje', () => {
    // 6
    cy.get(':nth-child(3) > :nth-child(3) > button').click()
    // 5
    cy.get(':nth-child(3) > :nth-child(2) > button').click()
    cy.contains('%').click()
    cy.get('.component-display').first().should('have.text', '0.65')
  })
})