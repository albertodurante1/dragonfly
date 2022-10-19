var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')




const {Device,Topic} = require('./device');



 id = "admin";
 password = "mini";

var obj = {
    table:[]
};

var datiSensori = JSON.stringify(obj);



//salvataggio su file json
var saveDataOnFile = function(){
const fs = require('fs');
let rawdata = fs.readFileSync(listDevices);
datiSensori.parse(rawdata);
}


//lettura dati da file json
var readDataFromFile = function(){
const fs = require('fs');
fs.readFile(datiSensori, (err, data) => {
    if (err) throw err;
    datiSensori.parse(data);
    console.log(datiSensori)
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
        client.subscribe(Manager.TOPICNEWDEVICE)
        client.on('message', (topic,message)=>{
    
            objectMessage = JSON.parse(message)
           // console.log(jsonStr['Led1'])
            //console.log(jsonStr["Led2"])
            //vector = jsonStr["Led1"] + " \n" + jsonStr["Led2"] 
            //console.log(vector)
           if(topic == Manager.TOPICNEWDEVICE){
                this.addDevice(objectMessage)
           }
        })
        
        client.on('connect', ()=>{
            
        
        })
    }
 
   

     
  /**
   * 
   * @param {Device} objectMessage 
   */
    addDevice(objectMessage)
    {   
        
        let inputTopic = new Topic(nome,options); 
        let listInputTopic= objectMessage.topicListInput

        objectMessage.topicListInput
        let inputTopic1 = new Topic("Led",["acceso","spento"]);  //creare due sottoscrizione per acceso e spento  
        this.listDevices.push(new Device(objectMessage.nome, listInputTopic,listOutputTopic))

    }


    checkExistsDevice(device){
        client.on('connect', function () {
            setInterval(function() {
            for(device of this.listDevices){
              if(checkExistence){
                console.log("il dispostivo é presente:", client.subscribe(device));
              }else{ 
                console.log("il dispositivo non é piú connesso, procedo a rimuoverlo");
                client.unsubscribe(device);
                //pop o remove del device
              }
            }
            },500);
          });
    } //controlla la presenza del dispositivo e se esiste da le sue informazioni in caso contrario lo rimuove


    
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

        

    createSubOnEventOutput(device,nometopic,eventOutput){
        for(device of this.listDevices){
            if(eventOutput){
                client.publish(nometopic, device.topicListOutput[nometopic,eventOutput]);
                client.subscribe(nometopic);              
            }

        }
            
            
            
    } //se viene attivato un sensore di output genera una sub sul sensore 
} 




module.exports = {Manager};

