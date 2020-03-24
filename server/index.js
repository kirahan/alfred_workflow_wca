const fs = require('fs')
const express = require('express')
const app = express()
// 获取alfred里面配置的环境变量，非常重要
// const serverPort = process.env.port || 8000
const {SEVERPORT} = require('../lib/config')

var server = require('http').Server(app)
//跨域中间件
app.use(require('cors')())
//json中间件
app.use(express.json())
// api挂载
require('./routes/api')(app)
//app 设置为serverPort端口
server.listen(SEVERPORT,()=>{
    console.log(`listen ${SEVERPORT} port`)
})



