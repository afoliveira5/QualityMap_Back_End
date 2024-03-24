/// <reference types="cypress" />

describe('User tests - PUT method', () => {
  const faker = require('faker')
  const payload = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: `${faker.datatype.boolean()}`
  }

  beforeEach(() => {
    cy.postUser(payload).as('responsePost')
  })

  it('edit a user', () => {
    const schema = require('../../support/schemas/users/putUsers.schema')
    payload.email = faker.internet.email()

    cy.get('@responsePost').then(response => {
      cy.putUser(response.body._id, payload).should(response => {
        expect(response.status).to.be.equal(200)
        expect(response.body.message).to.be.equal('Registro alterado com sucesso')
        return schema.validateAsync(response.body)
      })
    })
  })
})
