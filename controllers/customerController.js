const facturapi = require('../services/facturapi');

const resolvers = {
  Query: {
    getClientes: async () => {
      const { data: clientes } = await facturapi.customers.list();
      return clientes;
    },
    getCliente: async (_, { id }) => {
      const cliente = await facturapi.customers.retrieve(id);
      return cliente;
    },
  },
  
  Mutation: {
    createCliente: async (_, { 
      legal_name, 
      tax_id, 
      tax_system, 
      address, 
      email, 
      phone 
    }) => { 
      // Validar RFC
      if (!/^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]([0-9A])?$/.test(tax_id)) {
        throw new Error('RFC inválido');
      }
      const cliente = await facturapi.customers.create({
        legal_name,
        tax_id,
        tax_system,
        address,
        email,
        phone
      });
      return cliente;
    },

    updateCliente: async (_, { id, ...updates }) => {
      if (updates.tax_id && !/^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]([0-9A])?$/.test(updates.tax_id)) {
        throw new Error('RFC inválido');
      }
      if (updates.address) {
        updates.address.country = updates.address.country || "MEX";
      }
      const cliente = await facturapi.customers.update(id, updates);
      return cliente;
    },
    
    deleteCliente: async (_, { id }) => {
      try {
        await facturapi.customers.del(id);
        return { success: true, message: "Cliente eliminado", id };
      } catch (error) {
        return { success: false, message: error.message, id: null };
      }
    }
  }
};

module.exports = resolvers;