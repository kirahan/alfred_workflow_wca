const axios = require("axios")
const { SEVERPORT } = require("./lib/config")
const { db } = require("./server/db/db")
// choose which command will execute
// cause sereral unit run index.js
// 1. search_main_sf: check if logged, then give the right filter, auth or show search command list
// 2.
const action_command = process.argv[2]
const user_command = process.argv[3]

const http = axios.create({
  baseURL: `http://localhost:${SEVERPORT}`
})

// alfred's data structure of Script Filter module
const { displayList } = require("./lib/scriptFilter")

const {
    searchRecordPannelDefault,
    searchRulePannelDefault,
    searchRulePannelHelp,
    searchPannelDefault,
    searchPersonPannelHelp,
    searchPersonPannelDefault,
    searchCompetitionPannelHelp,
    searchCompetitionPannelDefault
} 
= require('./lib/defaultScriptFilterStyle/searchDefault')

const {
  personResDataToScriptFilterData
} = require("./lib/wca/personResDataToSimpleData")

const {competitionResDataToScriptFilterData}= require('./lib/wca/competitionResDataToSimpleData')

const {
    searchRuleResDataToSimpleData,
    searchUsersResDataToSimpleData,
    searchCompetitionResDataToSimpleData
} = require("./lib/wca/searchResDataToSimpleData")
const {
  recordResDataToScriptFilterData,
  recordCountrySearchResDataToScriptFilterData
} = require("./lib/wca/recordResDataToSimpleData")

if (action_command == "search_main_sf") {
  const isLogged = async () => {
    const res = await http.get("/api/islogged")
    const isLogged = res.data.isLogged
    if (!isLogged) {
      const loginUrl = res.data.loginUrl
      let data = new displayList()
      data
        .title("WCA need authorization before search")
        .arg(`login,${loginUrl}`)
      console.log(JSON.stringify(data.Data()))
    } else {
      let data = new displayList()
      data
        .title("WCA has logged, -h to list all command")
        .arg(`logged`)
        .additems()
        .title("my")
        .subtitle("show my own infomation")
        .additems()
        .title("records")
        .subtitle("search the record")
        .autocomplete("record")
        .valid(["set", false])

      process.env.islogged = true
      console.log(JSON.stringify(data.Data()))
    }
  }

  // console.log(process.env.islogged)
  // 通过增加环境变量islogged保证每次脚本只调用一次接口去验证是否登录，
  // 第一次之后都会跳过logged()函数
  if (process.env.islogged) {
    // 去除左右两边的空格 replace(/(^\s*)|(\s*$)/g,""),并且消除中间连续空格
    // 去除左边的空格 replace(/(^\s*)/g,""),并且消除中间连续空格
    let user_cmd = user_command
      .replace(/(^\s*)/g, "")
      .replace(/\s+/g, " ")
      .split(" ")
    // 显示默认面板 当只输入了一个指令的时候 
    if (user_cmd.length == 1) {
      const pannel_search_default = searchPannelDefault({cmd : user_cmd[0]})
      console.log(JSON.stringify(pannel_search_default.Data()))
    } else {
      let [cmd1, cmd2, cmd3 = undefined] = user_cmd
      //    console.log('in this line',cmd1)
      if (cmd1 == "my") {
        const data = new displayList()
        http.get("/api/myinfo").then(res=>{
              http
              .get(`/api/search/users/${res.data.wcaId}`)
              .then(res => {
                const pannel_user_data = searchUsersResDataToSimpleData(
                  res.data
                )
                console.log(JSON.stringify(pannel_user_data.Data()))
              })
              .catch(err => {
                console.log(err)
              })
        }).catch(err=>{
          console.log(err)
        })
      } else if (cmd1 == "record") {
        const localrecord = db.get("data.result.records").value()
        const matchingtable = ["w", "af", "eu", "as", "na", "sa", "oc"]
        const short2long = {
          w: "world_records",
          af: "_Africa",
          eu: "_Europe",
          as: "_Asia",
          na: "_North America",
          oc: "_Oceania",
          sa: "_South America"
        }
        //初始化界面
        if (!cmd2) {
          const panner_record_default = searchRecordPannelDefault({
              record : localrecord
          })
          console.log(JSON.stringify(panner_record_default.Data()))
        }
        // 当有参数输入
        // cmd2表示区域 默认值是 world_records 表示世界纪录
        // cmd2 可用的简称有 w for WR | af,eu,as,na,sa,oc for CR
        // cmd3表示项目 默认值是''表示全部项目
        else if(cmd2=='update'){
            
            http.get(`/api/updaterecord`)
              .then(res => {
                let data = new displayList()
                    data
                    .title(`Updated finfish`)
                    .subtitle("press enter button to continue")
                    .valid(["set", false])
                    .autocomplete('record ')
                    .icon("jpg", "./img/help.jpg")
                console.log(JSON.stringify(data.Data()))
              })
              .catch(err => {
                console.log(err)
              })
        }
        else
        {
          // 当cmd2输入为简称的时候 可用的简称有 w for WR | af,eu,as,na,sa,oc for CR
          if (matchingtable.includes(cmd2)) {
            let realRecordData
            // wr he cr 目录不一样
            realRecordData =
              cmd2 == "w"
                ? localrecord[short2long.w]
                : localrecord.continental_records[short2long[cmd2]]
            const pannel_record_data = recordResDataToScriptFilterData({
              recordResult: realRecordData,
              region: short2long[cmd2],
              event: cmd3
            })
            console.log(JSON.stringify(pannel_record_data.Data()))
          } else {
            // 当没有输入cmd3 并且region不为简称的时候，ScriptFilter显示区域列表，而不是具体项目记录
            if (cmd3 == undefined) {
              const pannel_counry_search_data = recordCountrySearchResDataToScriptFilterData(
                {
                  recordResult: localrecord.national_records,
                  region: cmd2
                }
              )
              console.log(JSON.stringify(pannel_counry_search_data.Data()))
            }
            // 当有cmd3输入，并且region不为简称的时候
            else {
              const pannel_record_data = recordResDataToScriptFilterData({
                recordResult: localrecord.national_records[cmd2],
                region: cmd2,
                event: cmd3
              })
              console.log(JSON.stringify(pannel_record_data.Data()))
            }
          }
        }
      } else if (cmd1 == "person") {
        if (!cmd2) {
          const pannel_person_default =  searchPersonPannelDefault({})
          console.log(JSON.stringify(pannel_person_default.Data()))
        } else {
          const wholestr = String(user_cmd.slice(1)).replace(/,/g, " ")
          //开启user搜索，显示搜索结果的面板，最多20个
          if (wholestr.match(/=/g)) {
            const nameOrwcaid = wholestr.substr(0, wholestr.length - 1)
            http
              .get(`/api/search/users/${nameOrwcaid}`)
              .then(res => {
                const pannel_user_data = searchUsersResDataToSimpleData(
                  res.data
                )
                console.log(JSON.stringify(pannel_user_data.Data()))
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            // 输入没有结束的时候，显示2个面板
            const pannel_person_help = searchPersonPannelHelp({
                content : wholestr
            })
            console.log(JSON.stringify(pannel_person_help.Data()))
          }
        }
      } else if (cmd1 == 'competition'){
          
          if (!cmd2){
            const pannel_competition_default = searchCompetitionPannelDefault({})
            console.log(JSON.stringify(pannel_competition_default.Data()))
          }else{
            // 将分割好的cmd重新复合，
            const wholestr = String(user_cmd.slice(1)).replace(/,/g, " ")
            // 搜索比赛
            if (wholestr.match(/=$/g)!=null) {
                const title = wholestr.substr(0, wholestr.length - 1)
                
                http.get(`/api/search/competition/${title}`)
                .then(res => {
                    // 保存搜索结果
                    db.set('data.result.competitions',res.data).write()
                    const pannel_competition_data = searchCompetitionResDataToSimpleData(
                    res.data
                    )
                    console.log(JSON.stringify(pannel_competition_data.Data()))
                })
                .catch(err => {
                    console.log(err)
                })
            }
            // 显示比赛详情
            else if(wholestr.match(/\?$/g)!=null){
                const competitionId = wholestr.substr(0, wholestr.length - 1)
                const searchdata = db.get('data.result.competitions').value()
                let competitionBaseInfo
                // 从本地获得比赛基本数据
                for(let info of searchdata){
                    if(competitionId == info.id){
                        competitionBaseInfo = info
                        break
                    }
                }
                http.get(`/api/competition/${competitionId}/wcifpublic`)
                .then(res => {
                    const pannel_competition_data = competitionResDataToScriptFilterData({
                        baseinfo : competitionBaseInfo,
                        wcif :res.data
                    })
                    console.log(JSON.stringify(pannel_competition_data.Data()))
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else{
            // 没有结果的时候显示2个提示面板
                const pannel_competition_help = searchCompetitionPannelHelp({
                    content : wholestr
                })
                console.log(JSON.stringify(pannel_competition_help.Data()))
              
            }
          }
      }else if(cmd1 == 'rule'){
          if(!cmd2){
            const pannel_rule_default = searchRulePannelDefault({})
            console.log(JSON.stringify(pannel_rule_default.Data()))
          }else{
            const wholestr = String(user_cmd.slice(1)).replace(/,/g, " ")
            //开启rule搜索，显示搜索结果的面板，最多20个
            if (wholestr.match(/=/g)) {
              const indexOrtitle = wholestr.substr(0, wholestr.length - 1)
              http
                .get(`/api/search/rule/${indexOrtitle}`)
                .then(res => {
                  const pannel_rule_data = searchRuleResDataToSimpleData(
                    res.data.slice(0,20)
                  )
                  console.log(JSON.stringify(pannel_rule_data.Data()))
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              // 输入没有结束的时候，显示2个面板
              const pannel_rule_help = searchRulePannelHelp({
                  content : wholestr
              })
              console.log(JSON.stringify(pannel_rule_help.Data()))
            }
          }
      }
    }
  } else {
    isLogged()
  }
} else if (action_command == "search_body_sf") {
  let user_cmd = user_command.split(" ")
  console.log(user_cmd)
}
