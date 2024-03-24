/// <reference types="cypress" />

const faker = require('faker')

describe('User tests - DELETE method', () => {
  beforeEach(() => {
    const payload = {
      nome: `${faker.name.findName()}`,
      email: `${faker.internet.email()}`,
      password: `${faker.internet.password()}`,
      administrador: `${faker.datatype.boolean()}`
    }
    cy.postUser(payload).as('responsePost')
  })

  it('delete a user', () => {
    const schema = require('../../support/schemas/users/deleteUsers.schema')

    cy.get('@responsePost').then(response => {
      cy.deleteUser(response.body._id).should(response => {
        expect(response.status).to.be.equal(200)
        expect(response.body.message).to.be.equal('Registro excluído com sucesso')
        return schema.validateAsync(response.body)
      })
    })
  })
})
