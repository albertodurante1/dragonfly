var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'sensore'
var message = 'dato'


client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic,message)
        console.log('dati sensore:', message)
    },2000)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})