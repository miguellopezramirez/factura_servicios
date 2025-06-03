const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');
const customerTypeDefs = require('./schemas/customerTypeDefs');
const customerResolvers = require('./controllers/customerController'); 
const invoiceTypeDefs = require('./schemas/invoiceTypeDefs');
const invoiceResolvers = require('./controllers/invoiceController'); 
const productTypeDefs = require('./schemas/productTypeDefs');
const productResolvers = require('./controllers/productController');
// Combinar typeDefs y resolvers
const typeDefs = [customerTypeDefs, invoiceTypeDefs,productTypeDefs]; // Un arreglo con ambos schemas
const resolvers = merge({}, customerResolvers, invoiceResolvers,productResolvers); // Fusión de resolvers

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor corriendo en ${url}`);
});