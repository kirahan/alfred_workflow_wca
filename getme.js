const fs = require('fs')
const {authorizationUrl,oauthDataFromCode,refreshUserAccessToken} = require('./lib/wca-oauth')
const  wcaApi = require('./lib/wca-api');
const fetch = require('node-fetch');
const axios = require('axios')
// let oauth = {
//     accessToken: '6VXgD8MyUsNQF_K_qOCsUb1XE066Ca4r7qCj3PTAueo',
//     refreshToken: 'l4WwFfZJwu66N2SzII9Fie27ESR_eaBdGb5p4rSGP_s',
//     expiresAt: '2020-02-25T00:03:41.586Z'
//   }
// const me =  wcaApi({ oauth }).getMe()
// console.log(me)

const baseApiUrl = 'https://www.worldcubeassociation.org/api/v0/me';
const options = {
headers: {
Authorization:`Bearer MPabf4PujobGz-Npad22DjM8H64sQTa6eOAmMV_D3j8`,
'Content-Type': 'application/json',
},
};
async function get(){
    const res = await axios.get(baseApiUrl,{
        headers : {
            Authorization:`Bearer MPabf4PujobGz-Npad22DjM8H64sQTa6eOAmMV_D3j8`,
            'Content-Type': 'application/json',}
    })
    // const response = await fetch(baseApiUrl, options);
    console.log(res.data)
    
}

get()



