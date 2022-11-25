const util = require('util')
const {Device,Topic }= require('./device.js')
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://172.25.192.1:1883',{clientId:"mini"})

const def = JSON.stringify("porcodio")

const checkTimeout = ()=>{client.publish("newdevice",def,{retain:true})}
const myTimeout = setTimeout(checkTimeout, 5000);