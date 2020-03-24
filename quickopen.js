const user_command = process.argv[2];
// alfred's data structure of Script Filter module
const { displayList } = require("./lib/scriptFilter")
const fs = require('fs') 
let quickconfig = JSON.parse(fs.readFileSync('./quickopendata.json'))

// 去除左边的空格 replace(/(^\s*)/g,""),并且消除中间连续空格
const user_cmd = user_command
.replace(/(^\s*)/g, "")
.replace(/\s+/g, " ")
.split(" ")

// 直接获取后面的部分
const [cmd1, cmd2=undefined] = user_cmd


if(cmd2 == undefined){
    const data = new displayList()
    for(let keyword in quickconfig){
        if(keyword.includes(cmd1) || !cmd1){
            data.additems()
            .title(`Command <${keyword}> | ${quickconfig[keyword].title}`)
            .valid(['set',false])
            .icon('jpg',`./img/open/${quickconfig[keyword].name}.jpg`)
            .autocomplete(`${keyword} `)
            
        }
    }
    console.log(JSON.stringify(data.Data()))
    
}else{
    const data = new displayList()
    const wholestr = String(user_cmd.slice(1)).replace(/,/g, " ")
    for(let keyword in quickconfig){
        if(keyword.includes(cmd1)){
            let searchUrl = quickconfig[keyword].url.includes('{query}')
            ? `${quickconfig[keyword].url.replace("{query}",wholestr)}`
            : `${quickconfig[keyword].url}`
            
            data.additems()
            .title(`Command <${keyword}> | ${quickconfig[keyword].title} : ${wholestr}`)
            .valid(['set',true])
            .arg(searchUrl)
            .icon('jpg',`./img/open/${quickconfig[keyword].name}.jpg`)
            
        }
    }
    console.log(JSON.stringify(data.Data()))
}




