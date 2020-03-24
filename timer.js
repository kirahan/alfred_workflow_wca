const { displayList } = require("./lib/scriptFilter");
const user_command = process.argv[2];
// 去除左边和右边的空格 replace(/(^\s*)/g,""),并且消除中间连续空格
const user_cmd = user_command.replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " ");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");
const adapter = new FileSync(path.join(__dirname + "/time.json"));
const db = low(adapter);

const { tnoodle } = require("./lib/wca/tnoodle");
const {
  timerPannelHelp,
  timerOnPannel,
  timerRestartPannel,
  timerStartPannel,
  timerStopPannel,
  scrambleSelectPannelHelp,
  scrambleSelectPannelDefault
} = require("./lib/defaultScriptFilterStyle/timerScrambleChoosenDefault");

// 已经输入了打乱类型
if (process.env.scramble_selected == "true") {
  // 提示s开始计时
  if (!user_command) {
    const pannel_timer_help = timerPannelHelp();
    console.log(JSON.stringify(pannel_timer_help.Data()));
  } else {
    const timer_state = db.get("state").value();
    const timer_stamp = db.get("timestamp").value();
    const type = db.get("scrambleType").value();
    const scramble = db.get("scrambleText").value();
    if (user_cmd == "s") {
      //
      if (timer_state == "timing") {
        const now_stamp = Date.now();
        let timer = (now_stamp - timer_stamp) / 1000;
        const pannel_timer_start = timerStartPannel({
            type,
            scramble,
            timer
        })
        console.log(JSON.stringify(pannel_timer_start.Data()));
        
      } else {
        const now_timestamp = Date.now();
        db.set("timestamp", now_timestamp)
          .set("state", "timing")
          .write();
        const data = new displayList();
        data
          .title(`Start timing...`)
          .valid(["set", false])
          .rerun("0.2");
        console.log(JSON.stringify(data.Data()));
      }
    } else if (user_cmd == "e") {
    if (timer_state == "timing") {
        const now_stamp = Date.now();
        let timer = (now_stamp - timer_stamp) / 1000;
        db.set("result", timer)
          .set("state", "stoped")
          .write();
        const pannel_timer_stop = timerStopPannel({
            type,
            scramble,
            timer
        })
        console.log(JSON.stringify(pannel_timer_stop.Data()));
      }else if(timer_state == "stoped"){
        const timer = db.get('result').value()
        const pannel_timer_stop = timerStopPannel({
            type,
            scramble,
            timer
        })
        console.log(JSON.stringify(pannel_timer_stop.Data()));
      }
    } else if (user_cmd == "r") {
        if(timer_state == "stoped"){
            tnoodle()
            .getScrmable({
                puzzleName: type,
                number: 1
            })
            .then(res => {
                    const scramble_text = res[0].scrambles[0];
                    db.set("state", "prepared").set("scrambleText", scramble_text).write();
                    const pannel_timer_restart = timerRestartPannel({
                        scramble: scramble_text,
                        type: type
                    });
                    console.log(JSON.stringify(pannel_timer_restart.Data()));
            });
        }
      
    } else if (user_cmd == 'zhaohan'){
        const data = new displayList()
        data
        .title('Bilibili @kira晗 点个关注不迷路')
        .icon('jpg','./img/bili_1.jpg')
        .additems()
        .title('点赞满100,出教程')
        .icon('jpg','./img/bili_2.jpg')
        .additems()
        .title('来个一键三连')
        .icon('jpg','./img/bili_3.jpg')
        console.log(JSON.stringify(data.Data()));
    }
  }
} // 还没有输入打乱类型
else {
  // 指令为空  显示输入打乱的提示框
  if (!user_command) {
    const pannel_scramble_select_default = scrambleSelectPannelDefault();
    console.log(JSON.stringify(pannel_scramble_select_default.Data()));
  } else {
    if (user_cmd.includes("-s")) {
      const scramble_type = user_cmd.split("-s")[0];
      tnoodle()
        .getScrmable({
          puzzleName: scramble_type,
          number: 1
        })
        .then(res => {
          const scramble_text = res[0].scrambles[0];
          db.set("scrambleText", scramble_text)
            .set("scrambleType", scramble_type)
            .write();
          const pannel_scramble_list = timerOnPannel({
            scramble: scramble_text,
            type: scramble_type
          });
          console.log(JSON.stringify(pannel_scramble_list.Data()));
        });
    } else {
      // 打乱类型选择列表
      const pannel_scramble_select_help = scrambleSelectPannelHelp({
        type: user_cmd
      });
      console.log(JSON.stringify(pannel_scramble_select_help.Data()));
    }
  }
}


