const fetch = require('node-fetch');
const {
  WCA_OAUTH_CLIENT_ID,
  WCA_OAUTH_SECRET,
  WCA_ORIGIN,
  WCA_OAUTH_REDIRECT_URI,
  LOCALHOST,
} = require('./config');


const authorizationUrl = () => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    redirect_uri: WCA_OAUTH_REDIRECT_URI,
    response_type: 'code',
    scope: 'public dob email manage_competitions',
  });
  return `${WCA_ORIGIN}/oauth/authorize?${params.toString()}`;
};

const oauthDataFromCode = async code => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    client_secret: WCA_OAUTH_SECRET,
    redirect_uri: WCA_OAUTH_REDIRECT_URI,
    code,
    grant_type: 'authorization_code',
  });
  console.log(`${WCA_ORIGIN}/oauth/token?${params.toString()}`)
  const tokenResponse = await fetch(
    `${WCA_ORIGIN}/oauth/token?${params.toString()}`,
    { method: 'POST' }
  );
  const data = tokenResponseJsonToOauthData(await tokenResponse.json())
  // console.log(data)
  return data;
};

const refreshUserAccessToken = async user => {
  /* Refresh the token only if it expires in less than 5 minutes. */
  console.log('in refresh useraccess token')
  // console.log(user.oauth.expiresAt , Date.now() + 5 * 60 * 1000)
  if (true) {
    const params = new URLSearchParams({
      client_id: WCA_OAUTH_CLIENT_ID,
      client_secret: WCA_OAUTH_SECRET,
      grant_type: 'refresh_token',
      refresh_token: user.oauth.refreshToken,
    });
    const tokenResponse = await fetch(
      `${WCA_ORIGIN}/oauth/token?${params.toString()}`,
      { method: 'POST' }
    );
    user.oauth = tokenResponseJsonToOauthData(await tokenResponse.json())
    const refresh_req = await fetch(
      `${LOCALHOST}/api/refreshtoken}`,
      { method: 'POST' ,
        body : user.oauth
      }
    );
    // db.set('data.account.wca.oauth',user.oauth).write()


  }
};

const tokenResponseJsonToOauthData = tokenResponseJson => {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = tokenResponseJson;
  const expiresAt = Date.now() + expiresIn * 1000;
  return { accessToken, refreshToken, expiresAt };
};

module.exports = {
  authorizationUrl,
  oauthDataFromCode,
  refreshUserAccessToken,
};