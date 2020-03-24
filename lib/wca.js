const axios = require("axios");
const { db } = require("../server/db/db.js");
const {
  WCA_OAUTH_CLIENT_ID,
  WCA_OAUTH_SECRET,
  WCA_ORIGIN,
  WCA_OAUTH_REDIRECT_URI,
  LOCALHOST
} = require("./config");

// const localhost = axi

const authorizationUrl = () => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    redirect_uri: WCA_OAUTH_REDIRECT_URI,
    response_type: "code",
    scope: "public dob email manage_competitions"
  });
  return `${WCA_ORIGIN}/oauth/authorize?${params.toString()}`;
};

const oauthDataFromCode = async code => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    client_secret: WCA_OAUTH_SECRET,
    redirect_uri: WCA_OAUTH_REDIRECT_URI,
    code,
    grant_type: "authorization_code"
  });

  const tokenResponse = await axios.post(
    `${WCA_ORIGIN}/oauth/token?${params.toString()}`
  );
  const data = tokenResponseJsonToOauthData(tokenResponse.data);
  return data;
};

const refreshUserAccessToken = async user => {
  /* Refresh the token only if it expires in less than 5 minutes. */
  // console.log(user.oauth.expiresAt , Date.now() + 5 * 60 * 1000)
  //   user.oauth.expiresAt < Date.now() + 5 * 60 * 1000
  if (user.oauth.expiresAt < Date.now() + 5 * 60 * 1000) {
    const params = new URLSearchParams({
      client_id: WCA_OAUTH_CLIENT_ID,
      client_secret: WCA_OAUTH_SECRET,
      grant_type: "refresh_token",
      refresh_token: user.oauth.refreshToken
    });
    const tokenResponse = await axios.post(
      `${WCA_ORIGIN}/oauth/token?${params.toString()}`
    );
    const newtokendata = tokenResponseJsonToOauthData(tokenResponse.data);
    db.set("data.account.wca.oauth", newtokendata).write();
  }
};

const tokenResponseJsonToOauthData = tokenResponseJson => {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn
  } = tokenResponseJson;
  const expiresAt = Date.now() + expiresIn * 1000;
  return { accessToken, refreshToken, expiresAt };
};

module.exports = {
  authorizationUrl,
  oauthDataFromCode,
  refreshUserAccessToken
};
