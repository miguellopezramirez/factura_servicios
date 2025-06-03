const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');
const customerTypeDefs = require('./schemas/customerTypeDefs');
const customerResolvers = require('./controllers/customerController'); 
const invoiceTypeDefs = require('./schemas/invoiceTypeDefs');
const invoiceResolvers = require('./controllers/invoiceController'); 

// Combinar typeDefs y resolvers
const typeDefs = [customerTypeDefs, invoiceTypeDefs]; // Un arreglo con ambos schemas
const resolvers = merge({}, customerResolvers, invoiceResolvers); // Fusión de resolvers

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor corriendo en ${url}`);
});