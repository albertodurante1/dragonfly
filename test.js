const util = require('util')
const {Device,Topic }= require('./device.js')
const  Manager = require('./manager.js');



//console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//console.log("parto prima",man.listDevices)

  
const man = new Manager("admin","1234567",'mqtt://127.0.0.1:1883', device=>{console.log("device \n",util.inspect(device, {showHidden: false, depth: null, colors: true}),'\n') });
        

// const checkTimeout = ()=>{
//     console.log("aggiunta\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
//     console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led1","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//     //man.removeDevice("esp");
//    //console.log("elemento rimosso\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
// 
          
// const myTimeout = setTimeout(checkTimeout, 20000);

//console.log("aggiunta\n",console.log(man.getListOfDevice()));
