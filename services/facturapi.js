require('dotenv').config();
const Facturapi = require('facturapi').default;
const facturapi = new Facturapi(process.env.FACTURAPI_API_KEY);
module.exports = facturapi;