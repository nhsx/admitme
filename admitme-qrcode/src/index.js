const Handler = require("./api/Handler").Handler;
const QrcodeService = require("./api/service/qrcodeService").QrcodeService;
const handler = new Handler(new QrcodeService());

exports.performQrCodeDetails = handler.handleQrcodeDetails;
