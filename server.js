var mosca = require('mosca')
var settings = { host: "172.29.15.104", port: 1883 }
var broker = new mosca.Server(settings)
const util = require('util')



broker.on('ready', () => {

    console.log('server pronto')
})


broker.on('published', (packet) => {

        console.log(packet.payload.toString());        
    

})

