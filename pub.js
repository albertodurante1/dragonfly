var mqtt = require('mqtt') 
var client = mqtt.connect('mqtt://192.168.1.19:1883')

const {ex_devices} = require('./exampledevice')

client.on('connect', ()=>{
    setInterval(()=>{
        //client.publish(topic,message)
        //console.log('messaggio mandato', message)
    

   
        
    // const jsonStr = JSON.parse(doc);
    client.publish("TopicOutput", JSON.stringify(ex_devices));
    
},4000)
})



