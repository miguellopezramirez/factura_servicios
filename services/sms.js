require('dotenv').config(); // Carga automáticamente .env

const axios = require('axios');

const apikey = process.env.SMS_MOBILE_API


const sendText = async (numberToSend, messsage) =>{
        const url = `https://api.smsmobileapi.com/sendsms/?apikey=${apikey}&recipients=${numberToSend}&message=${messsage}`;

        await axios.get(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};


module.exports = {
  sendText,
};