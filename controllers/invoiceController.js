const facturapi = require('../services/facturapi');
const {sendFactura} = require('../services/emailService')
const {sendText} = require('../services/sms');
const {sendWhatsapp} = require('../services/whatsapp')
const { generarPDF } = require('../services/pdfService');

const resolvers = {
  Mutation: {
    createFactura: async (_, { 
      customer_id, 
      items, 
      payment_form, 
      payment_method = "PUE", 
      use = "G01", 
      type = "I" 
    }) => {
      // Validación básica
      if (!items || items.length === 0) {
        throw new Error('Debe incluir al menos un producto');
      }
      const cliente = await facturapi.customers.retrieve(customer_id);
      const factura = await facturapi.invoices.create({
        customer: customer_id,
        items: items.map(item => ({
          product: item.product_id,
          quantity: item.quantity
        })),
        payment_form,
        payment_method,
        use,
        type,
        date: new Date().toISOString()
      })
      
      await sendText(cliente.phone, "Ya está lista la factura por su compra en DSW"),
      await sendWhatsapp(cliente.phone, "Ya está lista la factura por su compra en DSW")
      
      
    var pdfPath

      // Generar PDF con los datos de la factura
    try {
      pdfPath = await generarPDF(factura, items, `factura-${factura.id}.pdf`);
      console.log('PDF generado en:', pdfPath);
      
    } catch (error) {
      console.error('Error al generar el PDF:', error.message);
    
    }finally{
      try{
      await sendFactura(cliente.email, "Ya está lista la factura por su compra en DSW", pdfPath)
      }
      catch(error){
        console.error('Error al enviar el PDF:', error.message);
      }
    }


      return {
        id: factura.id,
        customer_id: factura.customer.id,
        date: factura.date,
        payment_form: factura.payment_form,
        payment_method: factura.payment_method,
        use: factura.use,
        type: factura.type,
        status: factura.status,
        total: factura.total / 100, 
        items: factura.items.map(item => ({
          product_id: item.product.id, 
          quantity: item.quantity
        }))
      };
    }
  }
};

module.exports = resolvers;