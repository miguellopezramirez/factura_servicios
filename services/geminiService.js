// /services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Genera un resumen de compra natural con Gemini.
 * @param {Object} factura - Información de la factura.
 * @returns {Promise<string>} Resumen generado.
 */
async function generarResumenCompra(factura) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });

  const productos = factura.items.map(
    (item) => `${item.quantity} x ${item.product.name}`
  ).join(", ");

  const prompt = `Redacta un mensaje amable y personalizado para un cliente que acaba de comprar lo siguiente: ${productos}, por un total de $${factura.total} pesos méxicanos. El cliente se llama ${factura.customer.name}. y nuestra empresa se llama ITT Servicios WEB`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error al generar resumen con Gemini:", error);
    return "Gracias por tu compra. Recibirás más detalles pronto.";
  }
}

module.exports = {
  generarResumenCompra,
};
