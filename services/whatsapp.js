const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

let sock;

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

  sock = makeWASocket({
    auth: state,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('📲 Escanea el siguiente código QR:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut);
      console.log('🔌 Conexión cerrada, reconectando:', shouldReconnect);
      if (shouldReconnect) connectToWhatsApp();
    } else if (connection === 'open') {
      console.log('✅ Conectado a WhatsApp');
      cleanAuthFolder(); // limpia la carpeta
    }
  });

}

connectToWhatsApp();

const fs = require('fs');
const path = require('path');

function cleanAuthFolder() {
  const basePath = path.resolve('./auth_info');

  const allowed = ['creds.json', 'keys']; // lo que NO se borra

  fs.readdirSync(basePath).forEach(file => {
    const fullPath = path.join(basePath, file);

    if (!allowed.includes(file)) {
      if (fs.statSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
    }
  });

  console.log('🧹 Archivos innecesarios de sesión eliminados');
}


// Función para enviar mensajes
const sendWhatsapp = async (number, message) => { 
    const nuevoNumero = number.slice(0, 3) + "1" + number.slice(3);
  const phone = nuevoNumero.includes('@s.whatsapp.net')
    ? nuevoNumero
    : nuevoNumero.replace(/\D/g, '') + '@s.whatsapp.net';

  try {
    await sock.sendMessage(phone, { text: message });
    cleanAuthFolder(); // limpia la carpeta
    
  } catch (error) {
    
  }
};

module.exports = {
  sendWhatsapp,
};
