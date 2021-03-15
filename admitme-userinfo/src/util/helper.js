const jwksClient = require("jwks-rsa");
const { logger } = require("./logger");

module.exports.getToken = (params) => {
  logger.log("info", "params.headers", params.headers);
  // extract and return the Bearer Token from the Lambda event parameters
  if (!params.headers) {
    throw new Error('Expected "headers"');
  }

  const tokenString = params.headers.Authorization;
  if (!tokenString) {
    throw new Error('Expected "event.Authorization" parameter to be set');
  }

  const match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new Error(`Invalid Authorization token - ${tokenString} does not match "Bearer .*"`);
  }
  return match[1];
};

module.exports.jwtOptions = {
  audience: "1af2d3e2-0d23-4c84-ae90-25eb6a59a4bd",
  issuer: "https://btgroupauthdev.b2clogin.com/15866032-2fb5-4e00-889e-49aa4e5cfe8a/v2.0/",
};

module.exports.client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10, // Default value
  jwksUri: "https://btgroupauthdev.b2clogin.com/btgroupauthdev.onmicrosoft.com/b2c_1_susi_test/discovery/v2.0/keys",
});
