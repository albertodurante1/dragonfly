var mosca = require('mosca')
var settings = { host: "192.168.195.247", port: 1883 }
var broker = new mosca.Server(settings)
const util = require('util')



broker.on('ready', () => {

    console.log('server pronto')
})


broker.on('published', (packet) => {

        console.log(packet.payload.toString());        
    

})

