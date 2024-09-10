// API DIGIFLAZZ PRODUCTION
//wajib weblist ip address di digi
//untuk melihat ip ketik getip di WhatsApp 
const digiuser = 'xxxxxxxx' // username digi
const digiapi = 'xxxxxxxx' // product key digi
const nomorKu = '628xxxxxxxx@s.whatsapp.net' //GANTI NOMORMU

// SETTING KEUNTUNGAN MEMBER BERDASARKAN PERSEN (%)
const prmember = '1'
const prgold = '0,5'
const prplatinum = '0,3'
const prpartner = '0,2'

// API PAYDISINI
const keypaydis = 'xxxxxxxx'
const merchpaydis = '' //Kosongkan Jika Belum Verifikasi Merchant
const servpaydis = '11' //Buat 11 Jika Belum Verifikasi Merchant
const batas_time = '300'; //Batas waktu pembayaran (detik) minimal 1800 30 menit dan maximal 10800 3 jam
const fee_owner = 350; //Fee Untuk Kamu Buat Meringankan Biaya Penarikan
const fee_cus = '1'; //	1 fee ditanggung customer 2 fee ditanggung merchant

// API ARIE PULSA UNTUK CEK NICKNAME GAME
const ariekey = 'xxxxxxxx' // KOSONGKAN JIKA TIDAK ADA

module.exports = {
    digiuser,
    digiapi,
    ariekey,
    prmember,
    prgold,
    prplatinum,
    prpartner,
    keypaydis,
    merchpaydis,
    servpaydis,
    batas_time,
    fee_owner,
    fee_cus,
    nomorKu
}
