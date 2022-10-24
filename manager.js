var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')




const {Device,Topic} = require('./device');



const id = "admin";
const  password = "mini";
var objectMessage;

var obj = {
    table:[]
};



//metodo di callback che assegna alla variabile objectMessage i dati presi dal sub su un topic
client.on('message', (topic,message)=>{
    objectMessage = JSON.parse(message.toString())
})


//salvataggio su file json
var saveDataOnFile = function(listDevices){
const fs = require('fs');
fs.writeFile('listaDispositivi.txt', listDevices, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}


//lettura dati da file json
var readDataFromFile = function(){
const fs = require('fs');
fs.readFile('listaDispositivi.txt', (err, data) => {
    if (err) throw err;
    });
}


//funziona controllo esistenza
var checkExistence = function(){
    if(!client){
       return true; 
    }
}
//lunghezza del json
// var count = Object.keys(myObject).length;
// console.log(count);



class Manager
{

    static TOPICNEWDEVICE = "newdevice"

    constructor()
    {
        /**
         * @type  {Device[]}
         */
        this.listDevices= [];
        client.subscribe(Manager.TOPICNEWDEVICE);
        this.addDevice(objectMessage);
        
        
    }
 
   

     
  /**
   * 
   * @param {Device} objectMessage 
   */
    addDevice(objectMessage)
    {   
        
        //let inputTopic = new Topic(nome,options); 
        //let listInputTopic= objectMessage.topicListInput
        let listInputTopic= objectMessage.topicListInput
        let listOutputTopic= objectMessage.topicListInput        
        //objectMessage.topicListInput
        //let inputTopic1 = new Topic("Led",["acceso","spento"]);  //creare due sottoscrizione per acceso e spento  
        this.listDevices.push(new Device(objectMessage.name, listInputTopic,listOutputTopic))

    }

/**
   * 
   * @param {Device} device
   */

//aggiustare qua
    checkExistsDevice(device){
        
            for(device of this.listDevices){
              if(!checkExistence()){
                let indexRemove = this.listDevices.indexOf(device);
                this.listDevices.splice(indexRemove); //utilizzo di splice per rimuovere un determinato elemento
              }
                           
                //pop o remove del device
              }
            }
            
          
     //controlla la presenza del dispositivo e se esiste da le sue informazioni in caso contrario lo rimuove


    
    /**
     * 
     * @param {Device } device 
     * @param {string} nameTopic 
     * @param {string} option 
     */
    triggerDevice(device, nameTopic,option) 
    {


        const indexOfDeviceInsideListDevices =this.listDevices.map(device=>device.name).indexOf(device.name)

        if(indexOfDeviceInsideListDevices<0){
           console.log(' Il device non è presente nella lista!')
           return 
        }

        // ora sono sicuro che c'è l'elemento

        const deviceInsideOfList = this.listDevices[indexOfDeviceInsideListDevices];

        /**
         * @type {Device}
         */
        const deviceCopy = JSON.parse(JSON.stringify(deviceInsideOfList))

        const devicethatIwanttopubblish = new Device(deviceCopy.name,deviceCopy.topicListInput,deviceCopy.topicListOutput)
        devicethatIwanttopubblish.topicListInput = devicethatIwanttopubblish.topicListInput.map((topic)=>{
            if(topic.nome===nameTopic){
                topic.options=[option]
                return topic
            }else{
                return topic
            }

        })
        
        client.publish("MODIFICE_SENSORI",JSON.stringify(devicethatIwanttopubblish));

        return devicethatIwanttopubblish




        // for( let deviceInList of this.listDevices){
        //     if(deviceInList.name === nameTopic){ 
        //         if(option === '') // controllare se l'opzione arrivata combacia con quella del topic  
        //         {

        //             const deviceNewState = new Device()
                    
        //             client.publish(nameTopic, device.topicListInput[nameTopic,option]);
        //         }else{
        //             device.option = 0;
        //          client.publish(nameTopic, device.topicListInput[nameTopic,option]);
        //         }
        //     }
        // }       
    }

    /**
   * 
   * @param {Device} device
   * @param {string} nometopic 
   */  

    createSubOnEventOutput(device,nometopic){
        for(device of this.listDevices){
                client.subscribe(nometopic);              
            }

        }
            
            
            
    } //se viene attivato un sensore di output genera una sub sul sensore 





module.exports = {Manager};

