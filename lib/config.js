// 获取alfred里面配置的环境变量，非常重要
// const serverPort = process.env.port
const serverPort = 45321;
module.exports = {
  WCA_OAUTH_CLIENT_ID: "JGtgSGMev3ei7ipBEcrCvQZSBKnTsaoyHhwdYe0Qjys",
  WCA_OAUTH_SECRET: "DoaanVkhQ7Y5clYkObUC5l55AaCFhoVgQEBjsTlWQtI",
  WCA_ORIGIN: "https://www.worldcubeassociation.org",
  SEVERPORT: serverPort,
  WCA_OAUTH_REDIRECT_URI: `http://localhost:${serverPort}/api/oauth`,
  LOCALHOST: `http://localhost:${serverPort}`
};
