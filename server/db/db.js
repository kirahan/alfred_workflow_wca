const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const adapter = new FileSync(path.join(__dirname+'/db.json'))
const db = low(adapter)

// Set defaults field setting
if(!db.has('name')){
    db.defaults({
        name : 'workflow-db',
        description : 'this is a small json database of this application, this db will store userdata',
        author : 'kirahan',
        data : {
            account : {},
            scrambe : {},
            timer : {},
            usefulltool : []
        },
        config :{},
        createdAt : new Date(),
        isLogged: false
        }).write() 
}



module.exports = {
    low,
    FileSync,
    adapter,
    db
}

