const util = require('util')
const {Device,Topic }= require('./device.js')
var mqtt = require('mqtt');
const {ex_devices} = require('./exampledevice')
var client = mqtt.connect('mqtt://192.168.1.6:1883',{clientId:"mini"})

const def = JSON.stringify(ex_devices)
const def1 = JSON.stringify({"topic": "disp"})
const def2 = JSON.stringify({"name":"esp","topic":"Movimento"})
const def3 = JSON.stringify({"name":"esp","topic":"Led1","option":"acceso"})
const def4 = JSON.stringify({"name":"esp","topic":"Movimento","option":"rilevato"})
const def5 = JSON.stringify({"name": "esp"})
const def6 = JSON.stringify({"ip": "ping"})

const checkTimeout = ()=>{
client.publish("newdevice",def,{retain:true});
client.subscribe("listDevices")
}
 const myTimeout = setTimeout(checkTimeout, 5000);

  const checkTimeout1 = ()=>{client.publish("listDevice",def1)}
  const myTimeout1 = setTimeout(checkTimeout1, 8000);

const checkTimeout2 = ()=>{client.publish("readTopic",def2)}
const myTimeout2 = setTimeout(checkTimeout2, 10000);

 const checkTimeout3 = ()=>{client.publish("writeTopic",def3)}
 const myTimeout3 = setTimeout(checkTimeout3, 15000);

 const checkTimeout4 = ()=>{client.publish("outputtriggered",def4)}
 const myTimeout4 = setTimeout(checkTimeout4, 20000);

 const checkTimeout5 = ()=>{client.publish("listTopicsDevice",def5)}
 const myTimeout5 = setTimeout(checkTimeout5, 25000);

 const checkTimeout6 = ()=>{client.publish("pingdevice",def6)}
 const myTimeout6 = setTimeout(checkTimeout6, 30000);



