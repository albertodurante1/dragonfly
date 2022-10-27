var mosca = require('mosca')
var settings = { host: "192.168.1.6", port: 1883 }
var broker = new mosca.Server(settings)




broker.on('ready', () => {

    console.log('server pronto')
})

broker.on('published', (packet) => {
    console.log(packet.payload.toString());
          
        
    
    
})

