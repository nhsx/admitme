const fetch = require("node-fetch");
const { logger } = require("../../util/logger");

class QrcodeService {
  constructor() {
    this.performQrcodeDetails = (userid) => {
      return userid;
    };
  }
}
exports.QrcodeService = QrcodeService;
