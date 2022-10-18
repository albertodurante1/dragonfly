var mosca = require('mosca')
//var Manager = require('manager').Manager
//const { Device } = require('./device')
var settings = { host: "192.168.1.6", port: 1883 }
var broker = new mosca.Server(settings)
var esp = "esp"
//var man = new Manager()


broker.on('ready', () => {

    console.log('server pronto')
})

broker.on('published', (packet) => {
    console.log(packet.payload.toString());
    if(isJsonString(packet.payload.toString())){
        var json = JSON.parse(packet.payload.toString() || {});
        var keys = (Object.keys(json));  
        for(let k of keys){
           
           
        }
    }
    
})

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
