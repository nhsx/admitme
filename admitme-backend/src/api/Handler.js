const { logger } = require("../util/logger");
const Result = require("../util/result");

class Handler {
  constructor(userInfoService) {
    this.handleUserInfoService = async (event, context, callback) => {
		
	console.log('In handler : '+JSON.stringify(event.body));
	
	
      const parseEvent = JSON.parse(event.body);
      const code =  parseEvent.code;
      const redirectUri = parseEvent.redirectUri;
      try {
        logger.log("info", `Handler fetching user info details for code ${code} -- ${redirectUri}`);
        if (!code) {
          logger.log("error", `Bad Request 400 returned for ${code}`);
          return new Result.BadRequest_400("code passed in invalid");
        } else {
          const userInfoData = await this.userInfoService.performUserInfo(code, redirectUri);
          if (userInfoData != null) {
            logger.log("info", `Success 200 returned for ${code}`);
            return new Result.OK_200(userInfoData);
          } else {
            logger.log("error", `Not Found 404 returned for ${code}`);
            return new Result.Not_Found_404(`Data for code ${code} is not Found`);
          }
        }
      } catch (e) {
        console.log(e, "err");
        logger.log("error", `Internal Server error 500 returned for ${code}`);
        return new Result.InternalServerError_500(e);
      }
    };
    this.userInfoService = userInfoService;
  }
}
exports.Handler = Handler;
