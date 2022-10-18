var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.6:1883')
var listaSensori=[];



client.on('message', (topic,message)=>{
    message = message.toString()
    console.log('messaggio ricevuto', message)
})

client.on('connect', ()=>{
    client.subscribe("Sensore")
})
