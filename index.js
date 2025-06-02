const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');

const customerTypeDefs = require('./schemas/customerTypeDefs');
const customerResolvers = require('./controllers/customerController'); 

// Combinar typeDefs y resolvers
const typeDefs = [customerTypeDefs]; // Un arreglo con ambos schemas
const resolvers = merge({}, customerResolvers); // Fusión de resolvers

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor corriendo en ${url}`);
});