const facturapi = require('../services/facturapi');

const resolvers = {
  Query: {
    getProductos: async () => {
      try {
        const { data: productos } = await facturapi.products.list();
        return productos;
      } catch (error) {
        throw new Error('Error al obtener los productos');
      }
    },
    getProducto: async (_, { id }) => {
      try {
        return await facturapi.products.retrieve(id);
      } catch (error) {
        throw new Error(`Error al obtener el producto con ID ${id}`);
      }
    }
  },
  Mutation: {
    createProducto: async (_, args) => {
      try {
        // Mapeamos los argumentos directamente al formato que espera Facturapi
        const productoData = {
          description: args.description,
          product_key: args.product_key,
          price: args.price,
          unit_key: args.unit_key,
          unit_name: args.unit_name,
          sku: args.sku || undefined // Solo envía sku si existe
        };
        
        const producto = await facturapi.products.create(productoData);
        return producto;
      } catch (error) {
        throw new Error('Error al crear el producto: ' + error.message);
      }
    },
    updateProducto: async (_, { id, input }) => {
      try {
        const producto = await facturapi.products.update(id, input);
        return producto;
      } catch (error) {
        throw new Error(`Error al actualizar el producto con ID ${id}: ${error.message}`);
      }
    },
    deleteProducto: async (_, { id }) => {
      try {
        await facturapi.products.del(id);
        return { success: true, message: "Producto eliminado", id };
      } catch (error) {
        return { success: false, message: error.message, id: null };
      }
    }
  }
};

module.exports = resolvers;