const Handler = require("./api/Handler").Handler;
const UserInfoService = require("./api/service/UserInfoService").UserInfoService;
const handler = new Handler(new UserInfoService());

exports.performUserInfoDetails = handler.handleUserInfoService;
