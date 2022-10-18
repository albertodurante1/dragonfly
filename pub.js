var mqtt = require('mqtt') 
var client = mqtt.connect('mqtt://192.168.1.6:1883')
var topic = 'sensore'
var message = 'ciao'
var ms 
var mg
var doc = {}

client.on('connect', ()=>{
    setInterval(()=>{
        //client.publish(topic,message)
        //console.log('messaggio mandato', message)
    

   
     ms=15;
     mg=20;  
    doc["Led1"]= 0;
    doc["Led2"]= 0;    
    jsonStr = JSON.stringify(doc);
    client.publish("TopicOutput", jsonStr);
},4000)
})