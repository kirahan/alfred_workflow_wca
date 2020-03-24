const { displayList } = require("./lib/scriptFilter");
const user_command = process.argv[2];
// 去除左边的空格 replace(/(^\s*)/g,""),并且消除中间连续空格
const user_cmd = [...user_command.replace(/(^\s*)/g, "").replace(/\s+/g, " ").split(/ /g)];
const [puzzleName,caseSetName,caseName] = user_cmd
const {algdb} = require('./lib/algdb/algdbapi')

const  
{
    algPuzzleSelectPannel,
    algSearchPannelDefault,
    algPuzzleSetsSelectPannel,
    algPuzzleCaseSelectPannel,
    algPuzzleCaseAlgsDisplayPannel,
} =  require('./lib/defaultScriptFilterStyle/algdbSearchDefault')



if(user_cmd.length == 1 && user_cmd[0]==''){
    const pannel_alg_search_default = algSearchPannelDefault()
    console.log(JSON.stringify(pannel_alg_search_default.Data()));
}else if(user_cmd.length == 1){
    const pannel_alg_puzzle_select = algPuzzleSelectPannel({
        pzl : puzzleName
    })
    console.log(JSON.stringify(pannel_alg_puzzle_select.Data()));
}else if(user_cmd.length == 2){
    algPuzzleSetsSelectPannel({
        pzl : puzzleName,
        setname : caseSetName,
        callback: (pannel_alg_puzzle_set_select)=>{
            console.log(JSON.stringify(pannel_alg_puzzle_set_select.Data()))
        }
    })
    
}else if(user_cmd.length == 3){
    algPuzzleCaseSelectPannel({
        pzl : puzzleName,
        setname : caseSetName,
        casename: caseName,
        callback: (pannel_alg_puzzle_case_select)=>{
            console.log(JSON.stringify(pannel_alg_puzzle_case_select.Data()))
        }
    })
    
}else if(user_cmd.length == 4){
    algPuzzleCaseAlgsDisplayPannel({
        pzl : puzzleName,
        setname : caseSetName,
        casename: caseName,
        callback: (pannel_alg_puzzle_algs_display_select)=>{
            console.log(JSON.stringify(pannel_alg_puzzle_algs_display_select.Data()))
        }
    })
    
}