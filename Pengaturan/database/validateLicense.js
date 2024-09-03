const axios = require("axios");
async function getlicensi(_0x419979) {
  var _0x3bbfe7 = {
    'method': 'GET',
    'url': 'https://ncpulsa.com/api/',
    'data': new URLSearchParams(Object.entries({
      'api_key': _0x419979,
      'action': 'licensi-key'
    }))
  };
  try {
    const _0x47fcc6 = await axios(_0x3bbfe7);
    const _0x381bbe = _0x47fcc6.data;
    if (_0x381bbe.status === false) {
      return _0x381bbe.data && _0x381bbe.data.pesan ? {
        'status': false,
        'message': _0x381bbe.data.pesan
      } : {
        'status': false,
        'message': "Unknown error"
      };
    } else {
      return _0x381bbe.status === true ? {
        'status': true,
        'message': "Langganan Aktif."
      } : {
        'status': false,
        'message': "Parameter tidak lengkap."
      };
    }
  } catch (_0xc96c36) {
    return {
      'status': false,
      'message': "Error making request"
    };
  }
}
module.exports = {
  'getlicensi': getlicensi
};