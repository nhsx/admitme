import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const createAndSignBearerToken = ({ clientId, audience, privateKey }) => {
  // Set the payload for the bearer-token to be sent to the /token nhs-login endpoint
  // note that the 'exp' key is ommitted here in favour of 'expiresIn' in jwt.sign() below
  const tokenPayload = {
    sub: clientId,
    iss: clientId,
    aud: audience,
    jti: uuidv4(), // new unique id
  };
  console.log(tokenPayload)
  // return the signed token
  return jwt.sign(tokenPayload, privateKey);
};
