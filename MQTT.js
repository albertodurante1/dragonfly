var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')

var pub = function(topic,message){
    client.publish(topic,message)
        console.log('messaggio mandato', message)
}

var sub = function(topic){
    client.subscribe(topic)
}