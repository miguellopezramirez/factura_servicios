// typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Producto {
    id: String!
    description: String!
    product_key: String!
    price: Float!
    unit_key: String!
    unit_name: String!
    sku: String
  }

  type Query {
    getProductos: [Producto!]!
    getProducto(id: String!): Producto
  }

  type Mutation {
    createProducto(
      description: String!
      product_key: String!
      price: Float!
      unit_key: String!
      unit_name: String!
      sku: String!
    ): Producto!
    
    updateProducto(
      id: String!
      description: String
      product_key: String
      price: Float
      unit_key: String
      unit_name: String
      sku: String
    ): Producto!
    
    deleteProducto(id: String!): DeleteResponse!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
    id: String
  }
`;
module.exports = typeDefs; // Exporta directamente la definición