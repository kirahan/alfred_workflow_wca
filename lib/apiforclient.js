const axios = require('axios')
const {SEVERPORT} = require('./config')
const http = axios.create({
    baseURL : `http://localhost:${SEVERPORT}`
})

const getUserInfo = async(cb)=>{
    const user = await http.get('/api/myinfo')
    cb(user)
    return user
}



module.exports = {
    getUserInfo,
}