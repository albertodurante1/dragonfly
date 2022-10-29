var mqtt = require('mqtt')
const util = require('util')
// var vec = require('device')
const {Device,Topic }= require('./device.js')
const  {Manager} = require('./manager.js');
var client = mqtt.connect('mqtt://192.168.1.19:1883')
// var vector = []
const listDevices= [];





/**
 * 
 * @param {Device} objectMessage 
 */
const addDevice = (objectMessage)=>
{   
    
    // let inputTopic = new Topic(objectMessage.name,objectMessage.options); 
    let listInputTopic= objectMessage.topicListInput
    let listOutputTopic= objectMessage.topicListOutput
    
    // objectMessage.topicListInput
    // let inputTopic1 = new Topic("Led",["acceso","spento"]);  //creare due sottoscrizione per acceso e spento  
    // client.subscribe();
    listDevices.push(new Device(objectMessage.name, listInputTopic, listOutputTopic))
    // console.log(util.inspect(listDevices, {showHidden: false, depth: null, colors: true}))
    // console.log(listDevices) 
    const man = new Manager();
    man.listDevices=listDevices;
    //console.clear();
    const aa =man.triggerDevice(objectMessage,"Led1","acceso")
    console.log("device modificato\n",util.inspect(aa, {showHidden: false, depth: null, colors: true}),'\n')
//    console.log("Device modificato: ", man.triggerDevice(objectMessage,"Led","acceso"))
    client.publish("MODIFICHE_SENSORI",JSON.stringify(aa));

}


// client.on('message', (topic,message)=>{
    
//     jsonStr = JSON.parse(message)
//     console.log(jsonStr['Led1'])
//     console.log(jsonStr["Led2"])
//     vector = jsonStr["Led1"] + " \n" + jsonStr["Led2"] 
//     console.log(vector)
//    if(topic == ""){

//    }


        // client.subscribe(Manager.TOPICNEWDEVICE,)
        client.on('message', (topic,message)=>{
        //    console.log({message:message.toString()})
        const objectMessage = JSON.parse(message.toString())
           // console.log(jsonStr['Led1'])
            //console.log(jsonStr["Led2"])
            //vector = jsonStr["Led1"] + " \n" + jsonStr["Led2"] 
            //console.log(vector)
        //    if(topic == Manager.TOPICNEWDEVICE){
        // }
        addDevice(objectMessage)
        })

// })



client.on('connect', ()=>{
    client.subscribe("newdevice")
    // const carico =  client.subscribe("MODIFICE_SENSORI");  
    // console.log(util.inspect(carico, {showHidden: false, depth: null, colors: true}))
})


