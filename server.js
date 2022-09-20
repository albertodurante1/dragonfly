var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)



broker.on('ready', ()=>{

    console.log('server pronto')
} )

broker.on('published',(packet)=>{
    console.log(packet.payload.toString());
})