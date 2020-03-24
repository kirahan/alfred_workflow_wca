const axios = require("axios");
const { SEVERPORT } = require("./lib/config");
const WcaidandItem = process.argv[2];
const getWcaidFromIndexjs = process.env.indextoperson;

const http = axios.create({
  baseURL: `http://localhost:${SEVERPORT}`
});

// alfred's data structure of Script Filter module
const { displayList } = require("./lib/scriptFilter");
const {
  personResDataToScriptFilterData
} = require("./lib/wca/personResDataToSimpleData");

// 去除左边的空格 replace(/(^\s*)/g,""),并且消除中间连续空格
let user_cmd = WcaidandItem.replace(/(^\s*)/g, "")
  .replace(/\s+/g, " ")
  .split(" ");
// 当参数只有wcaid的时候
if (user_cmd.length == 1) {
  const [wcaid] = user_cmd;
  let data = new displayList();
  data
    .title(`Show result with wcaid:${wcaid}`)
    .subtitle("please input right wcaid, then press space button")
    .valid(["set", false]);
  console.log(JSON.stringify(data.Data()));
} else {
  let [wcaid, cmd2, cmd3 = undefined] = user_cmd;

  // 如果从index过来就直接执行，因为必定是正确的wcaid
  if (user_cmd.length == 2 && cmd2 == "") {
    http
      .get(`/api/person/${wcaid}`)
      .then(res => {
        const pannel_data = personResDataToScriptFilterData(res.data[0]);
        console.log(JSON.stringify(pannel_data.Data()));
      })
      .catch(err => {
        console.log(err);
      });
  }
}
