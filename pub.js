var mqtt = require('mqtt') 
var client = mqtt.connect('mqtt://127.0.0.1:1883')

const {ex_devices} = require('./exampledevice')

client.on('connect', ()=>{
    setInterval(()=>{
        //client.publish(topic,message)
        //console.log('messaggio mandato', message)
    

   
        
    // const jsonStr = JSON.parse(doc);
    client.publish("newdevice", JSON.stringify(ex_devices));
    
},4000)
})



