var mosca = require('mosca')
var settings = { host: "172.25.192.1", port: 1883 }
var broker = new mosca.Server(settings)
const util = require('util')



broker.on('ready', () => {

    console.log('server pronto')
})


broker.on('clientConnected', (packet) => {

        console.log(packet.payload.toString());
    


        if(packet.id == "mini"){
            broker.authorizePublish = function(client, topic, payload, callback) {
                callback(packet.id,true);
              };
            
        }else{
            broker.authorizePublish = function(client, topic, payload, callback) {
                callback(null,false);
              };
        };
        //console.log(util.inspect(packet, {showHidden: false, depth: null, colors: true}),'\n')

    
    
        
    

})

