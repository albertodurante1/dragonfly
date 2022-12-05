const util = require('util')
const {Device,Topic }= require('./device.js')
var mqtt = require('mqtt');
const {ex_devices} = require('./exampledevice')
var client = mqtt.connect('mqtt://172.29.15.104:1883',{clientId:"mini"})
const OK = "OK";



const def = JSON.stringify(ex_devices);
const def1 = JSON.stringify({"msg":"ciao"}) //richiede lista dispositivi listDevice
const def2 = JSON.stringify({"name":"esp","topic":"Movimento"}) //richiede stato movimento readTopic
const def3 = JSON.stringify({"name":"esp","topic":"Led1","option":"acceso"}) //accende un led writeTopic
const def4 = JSON.stringify({"name":"esp","topic":"Movimento","option":"rilevato"})
const def5 = JSON.stringify({"name": "esp"}) // acquisisce tutti i topic di un dispositivo listTopicsDevice
const def6 = JSON.stringify({"ip": "ping"}) //pinga il dispositivo  pingdevice

 const checkTimeout = ()=>{
 client.publish("newdevice",def,{retain:true});
  client.subscribe("listDevice")
 }
  const myTimeout = setTimeout(checkTimeout, 5000);


client.on('connect', function(packet) {  client.subscribe("listDevices"),{qos:1}});
  const checkTimeout1 = ()=>{client.publish("listDevices",def1)
      
      }
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



 client.on('publish',function(packet){
  
  var json = JSON.parse(packet.payload);
    console.log(json);
 });

 client.on('offline', function() {
  console.log("offline");
});

client.on("error", function(error) {
  console.log("ERROR: ", error);
});

client.on('message', function (topic, message) {
  console.log(topic, message.toString());
});