var mqtt = require('mqtt')
const util = require('util')
const {Device,Topic }= require('./device.js')
const  {Manager} = require('./manager.js');
var client = mqtt.connect('mqtt://192.168.1.4:1883')
const man = new Manager();

var listaDispositivi = [];

  


client.on('connect', ()=>{
    
    listaDispositivi = new man.listDevices;
   
  

    console.log("listaDispositivi\n",util.inspect(listaDispositivi, {showHidden: false, depth: null, colors: true}),'\n')
    // const carico =  client.subscribe("MODIFICE_SENSORI");  
    // console.log(util.inspect(carico, {showHidden: false, depth: null, colors: true}))
})