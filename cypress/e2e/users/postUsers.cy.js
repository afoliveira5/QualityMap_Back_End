/// <reference types="cypress" />

describe('User tests - POST method', () => {
  const faker = require('faker')
  const payload = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: `${faker.datatype.boolean()}`
  }

  it('create a user and validade the response schema', () => {
    const schema = require('../../support/schemas/users/postUsers.schema')

    cy.postUser(payload).should(response => {
      expect(response.status).to.be.equal(201)
      expect(response.body.message).to.be.equal('Cadastro realizado com sucesso')
      schema.validateAsync(response.body)
    })
  })
})
