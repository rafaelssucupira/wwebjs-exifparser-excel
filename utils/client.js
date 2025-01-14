import qrcode from 'qrcode-terminal';
import WAWebJS from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } = WAWebJS;

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    qrcode.generate( qr, { small : true } );
    console.log('QR RECEIVED', qr);
});

export {
	client,
	MessageMedia
}
