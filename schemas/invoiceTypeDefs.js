const { gql } = require('apollo-server');

const typeDefs = gql`
  type LineItem {
    product_id: String!  # ID del producto en Facturapi
    quantity: Int!       # Cantidad
  }

  type Factura {
    id: String!
    customer_id: String!
    date: String!
    payment_form: String!
    payment_method: String!
    use: String!
    type: String!
    status: String!
    total: Float!
    items: [LineItem!]!
  }

  input LineItemInput {
    product_id: String!
    quantity: Int!
  }

  type Mutation {
    createFactura(
      customer_id: String!
      items: [LineItemInput!]!
      payment_form: String!
      payment_method: String = "PUE"
      use: String = "G01"
      type: String = "I"
    ): Factura!
  }
`;

module.exports = typeDefs;