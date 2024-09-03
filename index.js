

require("./Pengaturan/Admin/settings")
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@whiskeysockets/baileys")
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const path = require('path')
const readline = require("readline");
const axios = require('axios')
const FileType = require('file-type')
const yargs = require('yargs/yargs')
const _ = require('lodash')
const { Boom } = require('@hapi/boom')
const { uncache, nocache } = require('./Pengaturan/text')
const PhoneNumber = require('awesome-phonenumber')
const { color, bgcolor } = require('./Pengaturan/function/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const NodeCache = require("node-cache")
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')
const usePairingCode = true
///
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})
};
//=================================================//
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}
//=================================================//
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
//=================================================//
require('./NcPulsa.js')
nocache('../NcPulsa.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))
//=================================================//
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
//=================================================//
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`./src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
game: {},
database: {},
settings: {},
setting: {},
others: {},
sticker: {},
...(global.db.data || {})}
  global.db.chain = _.chain(global.db.data)}
loadDatabase()
//=================================================//
//=================================================//
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)
  const NcPulsa = makeWASocket({
  logger: pino({ level: 'silent' }),
  printQRInTerminal: !usePairingCode,
  auth: state,
  browser: ['Chrome (Linux)', '', '']
  });
  
  if(usePairingCode && !NcPulsa.authState.creds.registered) {
  const phoneNumber = await question(color('\n\n\nSilahkan masukin nomor Whatsapp Awali dengan 62:\n', 'magenta'));
  const code = await NcPulsa.requestPairingCode(phoneNumber.trim())
  console.log(color(`⚠︎ Kode Pairing Bot Whatsapp kamu :`,"gold"), color(`${code}`, "white"))
  
  }
  store.bind(NcPulsa.ev)
//=================================================//
NcPulsa.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}
//=================================================//
NcPulsa.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!NcPulsa.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = smsg(NcPulsa, mek, store)
require("./NcPulsa")(NcPulsa, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

NcPulsa.ev.on('call', async (celled) => {
let botNumber = await NcPulsa.decodeJid(NcPulsa.user.id)
let koloi = global.anticall
if (!koloi) return
console.log(celled)
for (let kopel of celled) {
if (kopel.isGroup == false) {
if (kopel.status == "offer") {
let nomer = await NcPulsa.sendTextWithMentions(kopel.from, `*${NcPulsa.user.name}* tidak bisa menerima panggilan. Maaf @${kopel.from.split('@')[0]} kamu diblokir karena melanggar aturan. Silahkan hubungi Owner membuka blok dan dikenakan denda 10k atau saldomu akan hangus!`)
NcPulsa.sendContact(kopel.from, ownerku.map( i => i.split("@")[0]), nomer)
await sleep(8000)
await NcPulsa.updateBlockStatus(kopel.from, "block")
}
}
}
})
//=================================================//
// NcPulsa.ev.on('group-participants.update', async (anu) => {
// if (!wlcm.includes(anu.id)) return
// console.log(anu)
// try {
// let metadata = await NcPulsa.groupMetadata(anu.id)
// let participants = anu.participants
// for (let num of participants) {
// // Get Profile Picture User
// try {
// ppuser = await NcPulsa.profilePictureUrl(num, 'image')
// } catch {
// ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
// }

// // Get Profile Picture Group
// try {
// ppgroup = await NcPulsa.profilePictureUrl(anu.id, 'image')
// } catch {
// ppgroup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
// }

// if (anu.action == 'add') {
// NcPulsa.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Haii Kak *@${num.split("@")[0]}* Selamat Datang Di Group *${metadata.subject}* 👋
//  ▬▭▬▭▬▭▬▭▬▬▭▬▭▬
// Terima Kasih Sudah Bergabung Jangan Lupa Baca Deskripsi Yah
// ▬▭▬▭▬▭▬▭▬▬▭▬▭▬
// Creator : https://wa.me/6281214281312`})
// } else if (anu.action == 'remove') {
// NcPulsa.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Karena Untuk Setiap Ucapan Selamat Datang Akan Selalu Diakhiri Dengan Ucapan Selamat Tinggal 👋
// ▬▭▬▭▬▭▬▭▬▬▭▬▭▬
// Selamat Tinggal *@${num.split("@")[0]}* Di Group *${metadata.subject}*
// ▬▭▬▭▬▭▬▭▬▬▭▬▭▬
// Creator : https://wa.me/6281214281312`})
// } else if (anu.action == 'promote') {
// NcPulsa.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Ciee Jadi Admin Di Group ${metadata.subject} ${metadata.desc}`  })
// } else if (anu.action == 'demote') {
// NcPulsa.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Ciee Di Hapus Jadi Admin Di Group ${metadata.subject} ${metadata.desc}`})
//   }
// }
// } catch (err) {
// console.log(err)
// }
// })
//=================================================//
NcPulsa.ev.on('contacts.update', update => {
for (let contact of update) {
let id = NcPulsa.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }}})
//=================================================//
NcPulsa.getName = (jid, withoutContact  = false) => {
id = NcPulsa.decodeJid(jid)
withoutContact = NcPulsa.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = NcPulsa.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === NcPulsa.decodeJid(NcPulsa.user.id) ?
NcPulsa.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')}
//=================================================//
NcPulsa.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await NcPulsa.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await NcPulsa.getName(i + '@s.whatsapp.net')}\nFN:${await NcPulsa.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:nurizimacell@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/H1Ejv9jh7Yz8OCN2qe3BvV\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`})}
//=================================================//
NcPulsa.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })}
//=================================================//
//Kalau Mau Self Lu Buat Jadi false
NcPulsa.public = true
//=================================================//
//=================================================//
NcPulsa.ev.on('creds.update', saveCreds)
 //=================================================//
  NcPulsa.downloadMediaMessage = async (message) => {
 let mime = (message.msg || message).mimetype || ''
 let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
 const stream = await downloadContentFromMessage(message, messageType)
 let buffer = Buffer.from([])
 for await(const chunk of stream) {
 buffer = Buffer.concat([buffer, chunk])}
 return buffer} 
 //=================================================//
 NcPulsa.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await NcPulsa.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })}
//=================================================//
NcPulsa.sendText = (jid, text, quoted = '', options) => NcPulsa.sendMessage(jid, { text: text, ...options }, { quoted })
//=================================================//
NcPulsa.sendTextWithMentions = async (jid, text, quoted, options = {}) => NcPulsa.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
 //=================================================//
NcPulsa.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await NcPulsa.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}
 //=================================================//
// NcPulsa.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
// let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
// let buffer
// if (options && (options.packname || options.author)) {
// buffer = await writeExifVid(buff, options)
// } else {
// buffer = await videoToWebp(buff)}
// await NcPulsa.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
// return buffer}
 //=================================================//
//  NcPulsa.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
// let quoted = message.msg ? message.msg : message
// let mime = (message.msg || message).mimetype || ''
// let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
// const stream = await downloadContentFromMessage(quoted, messageType)
// let buffer = Buffer.from([])
// for await(const chunk of stream) {
// buffer = Buffer.concat([buffer, chunk])}
// let type = await FileType.fromBuffer(buffer)
// trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// // save to file
// await fs.writeFileSync(trueFileName, buffer)
// return trueFileName}
//=================================================
 NcPulsa.cMod = (jid, copy, text = '', sender = NcPulsa.user.id, options = {}) => {
//let copy = message.toJSON()
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === NcPulsa.user.id
return proto.WebMessageInfo.fromObject(copy)}

// NcPulsa.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
// let types = await NcPulsa.getFile(PATH, true)
// let { filename, size, ext, mime, data } = types
// let type = '', mimetype = mime, pathFile = filename
// if (options.asDocument) type = 'document'
// if (options.asSticker || /webp/.test(mime)) {
// let { writeExif } = require('./lib/sticker.js')
// let media = { mimetype: mime, data }
// pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
// await fs.promises.unlink(filename)
// type = 'sticker'
// mimetype = 'image/webp'}
// else if (/image/.test(mime)) type = 'image'
// else if (/video/.test(mime)) type = 'video'
// else if (/audio/.test(mime)) type = 'audio'
// else type = 'document'
// await NcPulsa.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
// return fs.promises.unlink(pathFile)}

NcPulsa.parseMention = async(text) => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}
//=================================================//
NcPulsa.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message}}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo}} : {})} : {})
await NcPulsa.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage}
//=================================================//
// NcPulsa.getFile = async (PATH, save) => {
// let res
// let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
// //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
// let type = await FileType.fromBuffer(data) || {
// mime: 'application/octet-stream',
// ext: '.bin'
// }
// filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
// if (data && save) fs.promises.writeFile(filename, data)
// return {
// res,
// filename,
// 	size: await getSizeMedia(data),
// ...type,
// data
// }
// }

NcPulsa.serializeM = (m) => smsg(NcPulsa, m, store)
NcPulsa.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
if (connection === "close") {
  let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
  if (reason === DisconnectReason.badSession) {
console.log(`Bad Session File, Please Delete Session and Scan Again`);
process.exit();
  } else if (reason === DisconnectReason.connectionClosed) {
console.log("Connection closed, reconnecting....");
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionLost) {
console.log("Connection Lost from Server, reconnecting...");
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionReplaced) {
console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
process.exit();
  } else if (reason === DisconnectReason.loggedOut) {
console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
process.exit();
  } else if (reason === DisconnectReason.restartRequired) {
console.log("Restart Required, Restarting...");
connectToWhatsApp();
  } else if (reason === DisconnectReason.timedOut) {
console.log("Connection TimedOut, Reconnecting...");
connectToWhatsApp();
  } else {
console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
connectToWhatsApp();
  }
} else if (connection === "open") {
  NcPulsa.sendMessage('6282162627474' + "@s.whatsapp.net", { text: `*Lapor! 🫡*\n\n_Sc Bot NcPulsa berhasil terhubung ke server dengan baik_` });
}
// console.log('Connected...', update)
});

NcPulsa.ev.on('creds.update', saveCreds)

NcPulsa.sendText = (jid, text, quoted = '', options) => NcPulsa.sendMessage(jid, { text: text, ...options }, { quoted, ...options })
// console.log('Connected...', update)
return NcPulsa
}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})