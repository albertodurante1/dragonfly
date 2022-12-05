const util = require('util')
const {Device,Topic }= require('./device.js')
const  Manager = require('./manager.js');



//console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//console.log("parto prima",man.listDevices)

  
const man = new Manager("admin","1234567",'mqtt://192.168.195.247:1883');
        

 const checkTimeout = ()=>{console.log("device \n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
                            
}

  const myTimeout = setTimeout(checkTimeout, 35000);
    
 
        



  
 



