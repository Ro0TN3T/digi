// API DIGIFLAZZ PRODUCTION
const digiuser = 'xxxxxxxx' // username digi
const digiapi = 'xxxxxxxx' // product key digi
const nomorKu = '628xxxxxxxx@s.whatsapp.net' //GANTI NOMORMU

// SETTING KEUNTUNGAN MEMBER BERDASARKAN PERSEN (%)
const prmember = '1'
const prgold = '1'
const prplatinum = '1'
const prpartner = '1'

// API PAYDISINI
const keypaydis = 'xxxxxxxx'
const merchpaydis = '' //Kosongkan Jika Belum Verifikasi Merchant
const servpaydis = '11' //Buat 11 Jika Belum Verifikasi Merchant
const batas_time = '300'; //Batas waktu pembayaran (detik) minimal 1800 30 menit dan maximal 10800 3 jam
const fee_owner = 350; //Fee Untuk Kamu Buat Meringankan Biaya Penarikan
const fee_cus = '1'; //	1 fee ditanggung customer 2 fee ditanggung merchant

// API ARIE PULSA UNTUK CEK NICKNAME GAME DAN LISENSI
const ariekey = 'xxxxxxxx' // API KEY https://ariepulsa.com

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