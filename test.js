const util = require('util')
const {Device,Topic }= require('./device.js')
const  Manager = require('./manager.js');



//console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//console.log("parto prima",man.listDevices)

  
const man = new Manager("admin","1234567",'mqtt://192.168.155.247:1883', device=>{console.log("device \n",util.inspect(device, {showHidden: false, depth: null, colors: true}),'\n') });
        

 const checkTimeout = ()=>{console.log("device \n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')}

        //man.pingAllDevice();
//     console.log("aggiunta\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
//     console.log("modifiche\n",util.inspect(man.triggerDevice("esp","Led1","acceso"), {showHidden: false, depth: null, colors: true}),'\n')
//     //man.removeDevice("esp");
//    //console.log("elemento rimosso\n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
// 
 //man.pingDevice();      
 

 const myTimeout = setTimeout(checkTimeout, 10000);
    
 
        

 const checkTimeout2 = ()=>{
    
    
    man.triggerDevice("esp","Led1","acceso")
    //man.client.publish("MODIFICHE_SENSORI",JSON.stringify(aa));

    console.log("device \n",util.inspect(man.listDevices, {showHidden: false, depth: null, colors: true}),'\n')
}

   
 
 const myTimeout2 = setTimeout(checkTimeout2, 15000);

 const checkTimeout3 = ()=>{
    
    man.triggerDevice("esp","Led2","acceso")
    
    
}

   
 
 const myTimeout3 = setTimeout(checkTimeout3, 20000);

 const checkTimeout5 = ()=>{
    
    man.triggerDevice("esp","Led1","spento");
    
    
}

   
 
 const myTimeout5 = setTimeout(checkTimeout5, 22000);
  
 

 const checkTimeout4 = ()=>{
    
    man.triggerDevice("esp","Led2","spento");
    
    
    man.pingAllDevice();
}

   
 
 const myTimeout4 = setTimeout(checkTimeout4, 25000);

