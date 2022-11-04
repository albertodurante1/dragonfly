const util = require('util')
const {Device,Topic }= require('./device.js')
const  Manager = require('./manager.js');
const man = new Manager("admin","1234567",'mqtt://127.0.0.1:1883',device=>{console.log(device) });

console.log("parto prima",man.getInfoTopicInputOnDevice("esp"));

  


