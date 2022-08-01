var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'test1'
var message = 'ciao'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic,message)
        console.log('messaggio mandato', message)
    },5000)
})