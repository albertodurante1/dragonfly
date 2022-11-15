var mqtt = require('mqtt') 
var client = mqtt.connect('mqtt://127.0.0.1:1883',{keepalive :20})

const {ex_devices} = require('./exampledevice')

// client.on('connect', ()=>{
//     setInterval(()=>{
//         //client.publish(topic,message)
//         //console.log('messaggio mandato', message)
    

   
        
//     // const jsonStr = JSON.parse(doc);
//     client.publish("newdevice", JSON.stringify(ex_devices), {retain: true });
    
    
// },4000)
// })

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
let ipad = ["esp",'192.168.1.2',["topic1","topic2"]]
let ipad2 = ["esp",'192.168.1.2',["topic1","topic2"]]
client.publish("infoIP",JSON.stringify(ipad))
client.publish("infoIP",JSON.stringify(ipad2))
//client.publish("newdevice", JSON.stringify(ex_devices), {retain: true });