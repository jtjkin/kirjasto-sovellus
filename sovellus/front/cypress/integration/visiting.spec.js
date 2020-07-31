const { initToken } = require("../../src/reducers/tokenReducer")

describe('General', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('Page opens', function() {
        cy.contains('käsikirjasto')
        cy.contains('Kirjaudu')
        cy.contains('Ei tiliä? Luo tili')
    })

    it('Password forgotten', function() {

    })

    it('New user', function() {
        cy.contains('Ei tiliä? Luo tili').click()

    })

    it('Login', function() {
        cy.get('#email-input-field').type('userThree@utu.fi')
        cy.get('#password-input-field').type('123456789')
        cy.contains('Kirjaudu').click()
    })

    
})