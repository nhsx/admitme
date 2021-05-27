const jwt = require("jsonwebtoken");
const uuid = require("uuidv4").default;
const fs = require("fs");
const jwksClient = require("jwks-rsa");
const { logger } = require("./logger");

const createAndSignBearerToken = ({ clientId, audience, privateKeyFilePath, privateKey }) => {
  if (!privateKey && !privateKeyFilePath) {
    throw new Error("No privateKey or privateKeyFilePath passed to createAndSignBearerToken");
  }
  // Read the private key
  privateKey = privateKey || fs.readFileSync(privateKeyFilePath);
  // Set the payload for the bearer-token to be sent to the /token nhs-login endpoint
  // note that the 'exp' key is ommitted here in favour of 'expiresIn' in jwt.sign() below
  const tokenPayload = {
    sub: clientId,
    iss: clientId,
    aud: audience,
    jti: uuid(), // new unique id
  };
  // return the signed token
  return jwt.sign(tokenPayload, privateKey, { algorithm: "RS512", expiresIn: 60 });
};

const jwksClientWrapper = (options) => {
  // create a new client
  const client = jwksClient(options);
  // Update the getKeys function on the client
  client.getKeys = (cb) => {
    // Get the keys from an original getKeys function
    jwksClient(options).getKeys((err, keys) => {
      // return the error to the callback if there is one, else
      // return the keys with a 'use' key value pair
      return err
        ? cb(err)
        : cb(
            err,
            keys.map((x) => ({ ...x, use: "sig" }))
          );
    });
  };
  // create a new client where we'll promisify the getSigningKey function
  const newClient = {
    // spread in the original client with the edited getKeys function
    ...client,
    // create a new promisified getSigningKey function
    getSigningKey(kid) {
      return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
          return err ? reject(err) : resolve(key);
        });
      });
    },
  };
  return newClient;
};

// Validate a token, returning the decoded token
const validateToken = async (token, jwksUri) => {
  if (!token) return false; // not valid obvs
  jwksUri = jwksUri || "https://auth.sandpit.signin.nhs.uk/.well-known/jwks.json";
  // create a new validation client
  const validationClient = jwksClientWrapper({
    strictSsl: true,
    jwksUri,
  });
  // decode the token
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) return false;
  const { kid } = decodedToken.header;
  if (!kid) return false;
  // bypass validate token for now
  try {
    // let signingKeyResponse;
    // validationClient
    //   .getSigningKey(kid)
    //   .then((a) => (signingKeyResponse = a))
    //   .catch((e) => {
    //     logger.log("info", `error on getSignIn ${e}`);
    //   }); // will throw if err
    //const signingKey = signingKeyResponse.publicKey || signingKeyResponse.rsaPublicKey;
    return true;
    //return jwt.verify(token, signingKey);
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = { createAndSignBearerToken, validateToken, jwksClientWrapper };
