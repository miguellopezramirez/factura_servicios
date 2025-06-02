const { gql } = require('apollo-server');

const typeDefs = gql`
  type Cliente {
    id: String!
    legal_name: String!
    tax_id: String!
    tax_system: String!
    email: String
    phone: String
    address: Direccion!
  }

  type Direccion {
    street: String!
    exterior: String!
    interior: String
    neighborhood: String!
    city: String!
    municipality: String!
    zip: String!
    country: String!
  }

  input DireccionInput {
    street: String!
    exterior: String!
    interior: String
    neighborhood: String!
    city: String!
    municipality: String!
    zip: String!
    country: String
  }

  type Query {
    getClientes: [Cliente!]!
    getCliente(id: String!): Cliente
  }

  type Mutation {
    createCliente(
      legal_name: String!
      tax_id: String!
      tax_system: String!
      address: DireccionInput!
      email: String
      phone: String
    ): Cliente!

    updateCliente(
      id: String!
      legal_name: String
      tax_id: String
      tax_system: String
      address: DireccionInput
      email: String
      phone: String
    ): Cliente!

    deleteCliente(id: String!): DeleteResponse!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
    id: String
  }
`;

module.exports = typeDefs;