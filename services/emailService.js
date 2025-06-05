require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const waitForFile = async (filePath, timeout = 5000) => {
  const interval = 100;
  let elapsed = 0;
  while (elapsed < timeout) {
    if (fs.existsSync(filePath)) return true;
    await new Promise((r) => setTimeout(r, interval));
    elapsed += interval;
  }
  return false;
};

const sendFactura = async (email, message, pdfPath) => {
  try {
   const resolvedPath = path.resolve(pdfPath);
  console.log('📄 Buscando PDF en:', resolvedPath);
    const fileReady = await waitForFile(resolvedPath);
  if (!fileReady) {
    console.error('❌ El archivo no está disponible después de esperar.');
    return false;
  }
 const data = fs.readFileSync(resolvedPath);
    const msg = {
      to: email,
      from: 'guelito002@gmail.com', // Debe estar verificado en SendGrid
      subject: 'Factura nueva desde ITT Servicios WEB',
      text: `La información de tu factura es: ${message}`,
      attachments: [
        {
          content: data.toString('base64'),
          filename: path.basename(pdfPath) || 'factura.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
          content_id: 'factura',
        },
      ],
    };

    await sgMail.send(msg);
    console.log('📧 Email enviado con éxito a', email);
    return true;
  } catch (error) {
    console.error('❌ Error al enviar correo:', error.response?.body || error.message);
    return false;
  }
};

module.exports = {
  sendFactura,
};
