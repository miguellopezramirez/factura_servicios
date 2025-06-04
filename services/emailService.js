require('dotenv').config(); // Carga automáticamente .env
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendFactura = async (email, factura) => {
  const msg = {
  to: email, // Change to your recipient
  from: 'guelito002@gmail.com', // Change to your verified sender
  subject: 'factura nueva',
  text: 'La información de tu factura es: ' + factura,
  html: '<strong> Factura: '+ factura +'</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  // En producción, implementar con Nodemailer, SendGrid, etc.
  return true;
};

module.exports = {
  sendFactura,
};