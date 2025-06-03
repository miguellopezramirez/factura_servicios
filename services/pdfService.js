// services/pdfService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Genera un PDF de una factura y lo guarda localmente.
 * @param {Object} factura - Datos de la factura
 * @param {Array} items - Productos facturados
 * @param {String} filename - Nombre del archivo de salida
 * @returns {String} Ruta al archivo generado
 */

function generarPDF(factura, items, filename = 'factura.pdf') {
  const doc = new PDFDocument();
  const outputPath = path.join(__dirname, '..', 'temp', filename);

  // Asegurarse de que el directorio exista
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Encabezado
  doc.fontSize(20).text('Factura Electrónica', { align: 'center' });
  doc.moveDown();
  
  // Info cliente
  doc.fontSize(12).text(`Cliente: ${factura.customer?.legal_name || 'N/A'}`);
  doc.text(`Fecha: ${factura.date}`);
  doc.text(`Forma de pago: ${factura.payment_form}`);
  doc.text(`Método de pago: ${factura.payment_method}`);
  doc.moveDown();

  // Tabla de productos
  doc.text('Productos:', { underline: true });
  items.forEach((item, i) => {
    doc.text(`${i + 1}. Producto: ${item.product_id} - Cantidad: ${item.quantity}`);
  });

  doc.moveDown();
  doc.text(`Total: $${factura.total || '---'}`, { bold: true });

  doc.end();

  return outputPath;
}

module.exports = { generarPDF };
