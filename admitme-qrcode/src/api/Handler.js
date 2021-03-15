const { logger } = require("../util/logger");
const Result = require("../util/result");

class Handler {
  constructor(qrcodeService) {
    this.handleQrcodeDetails = async (event, context, callback) => {
      const accountId = event.queryStringParameters.accountid;
      const productID = event.queryStringParameters.productid;

      try {
        logger.log("info", `Handler fetching user details for accountId ${accountId}`);
        if (!accountId) {
          logger.log("error", `No accountid defined [${accountId}]`);
          return new Result.BadRequest_400("AccountID passed in invalid");
        } else {
          let QrcodeDetails = await this.qrcodeService.performQrcodeDetails(accountId);
          if (QrcodeDetails != null) {
            logger.log("info", `Success 200 returned for [${accountId}]`);
            return new Result.OK_200(QrcodeDetails);
          } else {
            logger.log("error", `Not Found 404 returned for [${accountId}]`);
            return new Result.Not_Found_404(`Data for AccountID ${accountId} is not Found`);
          }
        }
      } catch (e) {
        logger.log("error", `Internal Server error 500 returned for [${accountId}]`);
        return new Result.InternalServerError_500(e);
      }
    };
    this.qrcodeService = qrcodeService;
  }
}
exports.Handler = Handler;
