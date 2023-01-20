import { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

const client = new Client({
    puppeteer: {
		args: ['--no-sandbox'],
		executablePath: '/path/to/chromium',
	},
    	ffmpeg: '/path/to/ffmpeg',
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    const chat = await msg.getChat()
    const isGroup = chat.isGroup
    // ignores if from group
    if(!isGroup){
        if(msg.hasMedia) {
            const sticker = await msg.downloadMedia()
            client.sendMessage(msg.from, sticker, { sendMediaAsSticker: true})
        }
    }
});

client.initialize();
