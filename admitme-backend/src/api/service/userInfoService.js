const axios = require("axios");
const querystring = require("query-string");
const jwt = require("jsonwebtoken");

const appConfig = require("../../util/config");
const { logger } = require("../../util/logger");
const { createAndSignBearerToken, validateToken } = require("../../util/token");

class UserInfoService {
  constructor() {
    this.performUserInfo = async (code, redirectUri) => {
      logger.log(
        "info",
        `Get token for user with code ${code} -- ${redirectUri}`
      );

      const signedBearerToken = createAndSignBearerToken({
        clientId: appConfig.clientId,
        audience: `${appConfig.nhsRootDomain}/token`,
        privateKeyFilePath: appConfig.privateKeyFilePath,
      });

      const formData = {
        code,
        client_id: appConfig.clientId,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: signedBearerToken,
      };

      const response = await axios.post(
        `${appConfig.nhsRootDomain}/token`,
        querystring.stringify(formData)
      );
      // get the id_token out of the response (this is the JWT)
      const { id_token } = response.data;
      // decode the token
      const decodedToken = jwt.decode(id_token, { complete: true });
      // Validate the token
      const isValid = Boolean(validateToken(id_token));
      const tokenResult = {
        isValid,
        tokenResponse: response.data,
        decodedToken,
      };
      const { access_token } = tokenResult.tokenResponse;
      // get the data from the nhs userinfo endpoint
      const { data } = await axios({
        url: appConfig.nhsRootDomain + "/userinfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    };
  }
}

exports.UserInfoService = UserInfoService;
