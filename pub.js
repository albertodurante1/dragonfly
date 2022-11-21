var mqtt = require('mqtt') 
var client = mqtt.connect('mqtt://192.168.127.247:1883')

const {ex_devices} = require('./exampledevice')

client.on('connect', ()=>{
    setTimeout(()=>{
        //client.publish(topic,message)
         //console.log('messaggio mandato', message)
    

   
        
    
    //client.publish("newdevice", JSON.stringify(ex_devices), {retain: true });
    let ipad = ["esp","127.0.0.1","topic"]
    let ipad2 = ["esp2",'192.168.1.69',["topic1","topic2"]]
    client.publish("infoIP",JSON.stringify(ipad))
    client.publish("infoIP",JSON.stringify(ipad2))  
    
},2000)
 })

// const { networkInterfaces } = require('os');

// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//         // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//         if (net.family === familyV4Value && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }
//             results[name].push(net.address);
//         }
//     }
// }


 let ipad4 = [{"nome": "Movimento","stato":"rilevato"}];
 const checkTimeout = ()=>{client.publish("topic",JSON.stringify(ipad4))}
 
//     console.log("aggiunta\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
//     console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led1","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//     //man.removeDevice("esp");
//    //console.log("elemento rimosso\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
// 
 //man.pingDevice();      
 
 const myTimeout = setTimeout(checkTimeout, 12000);



//client.publish("newdevice", JSON.stringify(ex_devices), {retain: true });