require('dotenv').config(); // Carga automáticamente .env

const { Vonage } = require('@vonage/server-sdk')
const vonage = new Vonage({
  apiKey: process.env.VONAGE_APIKEY,
  apiSecret: process.env.VONAGE_APISECRECT
})




const sendText = async (numberToSend, messsage) =>{
    try{
        const from = "Vonage APIs"
const to = numberToSend
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS(numberToSend, messsage) {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();
    }catch(e){

    }
    
};


module.exports = {
  sendText,
};