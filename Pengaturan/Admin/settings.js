const chalk = require("chalk")
const fs = require("fs")

//________[ PERLENGKAPAN ]________//
global.owner = '628xxxxxxxx' //Ganti Jadi No Lu
global.ownerku = ['628xxxxxxxx']
global.ownerNomor = '628xxxxxxxx'
global.botname = '𝐍𝐜𝐏𝐮𝐥𝐬𝐚' //Ganti Jadi Nama Bot Lu
global.namabot = '𝗡𝗰𝗣𝘂𝗹𝘀𝗮' 
global.ownername = '𝘕𝘤𝘗𝘶𝘭𝘴𝘢' 
global.ownerName = '𝐍𝐜𝐏𝐮𝐥𝐬𝐚' //Ganti Jadi Nama Lu
global.footer = '𝙋𝙏 𝙉𝘾𝙋𝙐𝙇𝙎𝘼 𝘿𝙄𝙂𝙄𝙏𝘼𝙇'
global.packname = `BotWa` 
global.struk = `Ncpulsa` 
global.toko = `© 𝐏𝐓 𝐍𝐂𝐏𝐔𝐋𝐒𝐀 𝐃𝐈𝐆𝐈𝐓𝐀𝐋`
global.youtube = `@rootnet87`
global.sessionName = `NcPulsa`
global.anticall = false //anti telpon di wa false = mati true = aktif

//________[ THUMBNAIL ]________//
global.qris = fs.readFileSync("./image/qris.jpg") //Sesuaikan Dengan Nama Gambar Qris Di Folder Image

//________[ GC MEMBER ]________//
global.gcresmi = 'https://chat.whatsapp.com/F11xsNpGSqKJDcOYZfKWO0' //Ganti Dengan Link Groupmu

//________[ DATA REKENING ]________//
global.rekening = `

》 *SCAN QRIS HANYA UNTUK DANA SELAIN DANA UANG AKAN DITAHAN 1x24 JAM*

》 Silahkan Transfer Ke Salah Satu Rekening
》 OVO/GOPAY : 08xxxxxxxx
》 BSI : xxxxxxxx
》 BRI : xxxxxxxx
》 BCA : xxxxxxxx
》 SEABANK : xxxxxxxx
》 BNI  : xxxxxxxx
》 DANA : xxxxxxxx 
》 *ATAS NAMA : xxxxxxxx*

`

//________[ INFO UPLEVEL ]________//
global.hargalevel = `Keuntungan UPLEVEL Kamu Akan Mendapatkan Harga Special Dan Yang Pasti Lebih Murah.
Khusus Level Partner Akan Mendapatkan Pelayanan Khsusus Dari Kami.

LIST BIAYA UPLEVEL :
*GOLD : Rp 50.000*
*PLATINUM : Rp 100.000*
*PARTNER : Rp 150.000*
`

global.mess = {
    wait: 'Sedang Di Proses',
    succes: 'Sukses',
    admin: 'Layanan Khsusus Admin',
    botAdmin: 'BOT Harus Jadi Admin',
    owner: 'Layanan Khusus Owner',
    group: 'Hanya Bisa Didalam Group',
    private: 'Silahkan Private Chat Dengan BOT',
    bot: 'Fitur Special BOT',
    error: 'Layanan Error',    
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})