const  {tnoodle}= require('./lib/wca/tnoodle')
const user_command = process.argv[2];



// alfred's data structure of Script Filter module
const {
    scramblePannelHelp,
    scramblePannelDefault
} = require('./lib/defaultScriptFilterStyle/scrambleDefault')

const {
    scrambleResDataToScriptFilterData
} = require('./lib/wca/scrambleResDataToSimpleData')

// 去除左边的空格 replace(/(^\s*)/g,""),并且消除中间连续空格
let user_cmd = user_command
.replace(/(^\s*)/g, "")
.replace(/\s+/g, " ")
.split(" ")

let [cmd1, cmd2= undefined] = user_cmd

// 显示默认面板
if(!cmd1){
    const pannel_scramble_default = scramblePannelDefault()
    console.log(JSON.stringify(pannel_scramble_default.Data()))
}else{
    // 显示打乱项目选择的帮助面板
    if(cmd2 == undefined){
        const pannel_scramble_help = scramblePannelHelp(
            {type: cmd1}
        )
        console.log(JSON.stringify(pannel_scramble_help.Data()))
    }else {
        let number = 1
        if(Number(cmd2)<6){
            number = Number(cmd2)
        }

        tnoodle().getScrmable({
            puzzleName : cmd1,
            number : number
        }).then(res=>{
            const pannel_scramble_list = scrambleResDataToScriptFilterData({
                scrambles: res[0].scrambles,
                type:cmd1
            })
            console.log(JSON.stringify(pannel_scramble_list.Data()))
        })

    }
}


