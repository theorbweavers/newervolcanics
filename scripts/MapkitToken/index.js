const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID;
const APPLE_MAPKIT_ID = process.env.APPLE_MAPKIT_ID;
const APPLE_MAPKIT_AUTHKEY_LOCATION = process.env.APPLE_MAPKIT_AUTHKEY_LOCATION;

const authKey = fs.readFileSync(APPLE_MAPKIT_AUTHKEY_LOCATION, 'utf8');

if (!APPLE_TEAM_ID && !APPLE_MAPKIT_ID && !APPLE_MAPKIT_AUTHKEY)
  throw new Error('Information required');

const generateMapkitAuthToken = (
  clientId,
  keyId,
  authKey,
  expiry = 15778800
) => {
  const issuedAt = Date.now() / 1000;
  const expireAt = Date.now() / 1000 + expiry;
  const header = { kid: keyId, typ: 'JWT', alg: 'ES256' };
  const claims = {
    iss: clientId,
    iat: issuedAt,
    exp: expireAt,
  };

  // if (process.env.ORIGIN) claims.origin = process.env.ORIGIN;

  const jwToken = jwt.sign(claims, authKey, { header: header });
  return jwToken;
};

const token = generateMapkitAuthToken(APPLE_TEAM_ID, APPLE_MAPKIT_ID, authKey);

console.log(token);
