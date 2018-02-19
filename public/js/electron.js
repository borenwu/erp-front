var electron = require('electron')
fs = electron.remote.require('fs')
var inConfig = require('./src/configs/ipConfig')


fs.readFile('./build/configs/ipConfig.json',(err,data)=>{
    if(err) return console.log(err)

    data = JSON.parse(data)
    inConfig.rootUrl = data.rootUrl
})
