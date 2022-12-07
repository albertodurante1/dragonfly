const util = require('util')
const {Device,Topic }= require('./device.js')
const  Manager = require('./manager.js');

const man = new Manager("admin","12345678",'mqtt://192.168.195.247:1883');
   
//const def = JSON.stringify("test1");
 //const checkTimeout = ()=>{man.client.publish("newdevice",def,{retain:true})}

        //man.pingAllDevice();
//     console.log("aggiunta\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
//     console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led1","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//     //man.removeDevice("esp");
//    //console.log("elemento rimosso\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
// 
 //man.pingDevice();      
 

//const myTimeout = setTimeout(checkTimeout, 5000);