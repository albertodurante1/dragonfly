var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
const {Device,Topic} = require('./device');




const id = "admin";
const  password = "mini";







//metodo di callback che assegna alla variabile objectMessage i dati presi dal sub su un topic 


function OnCallback(object){
    client.on('message', (topic,message)=>{
        const objectMessage = JSON.parse(message.toString())
        object(objectMessage);
       
    })
}

class Manager
{

    static TOPICNEWDEVICE = "newdevice";
    

    constructor()
    {
        /**
         * @type  {Device[]}
         */
        this.listDevices= [];        
        client.subscribe(Manager.TOPICNEWDEVICE); //aggiungere intervalli
        OnCallback(obj=>{this.addDevice(obj)});
        
    }
 
   

     
  /**
   * 
   * @param {Device} objectMessage 
   */
    addDevice(objectMessage)
    {   
        
        
        let listInputTopic= objectMessage.topicListInput
        let listOutputTopic= objectMessage.topicListOutput                  
        this.listDevices.push(new Device(objectMessage.name, listInputTopic,listOutputTopic))

    }

/**
   * 
   * @param {Device} device
   */


    checkExistsDevice(device){
        
            for(const dev of this.listDevices){
              if(device.name !== dev.name){
                console.log("dispositivo non presente");
                return false
                
              }else{
                console.log("dispositivo presente");
                return true
              }
                           
               
              }
            }
            
          
     

    /**
   * 
   * @param {Device} device
   */
    removeDevice(device){
        if(this.checkExistsDevice(device) ==false){
            let indexRemove = this.listDevices.indexOf(device);
            this.listDevices.splice(indexRemove); //utilizzo di splice per rimuovere un determinato elemento
        }

        
    }//controlla la presenza del dispositivo e se non esiste lo rimuove
     //si puó anche usare pop o remove del device
    
    /**
     * 
     * @param {Device } device 
     * @param {string} nameTopic 
     * @param {string} option 
     */
    triggerDevice(device, nameTopic,option) 
    {

        //faccio una copia del device e lo mappo per farlo combaciare
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
        //copio la lista e modifico il singolo elemento 
        const devicethatIwanttopubblish = new Device(deviceCopy.name,deviceCopy.topicListInput,deviceCopy.topicListOutput)
        devicethatIwanttopubblish.topicListInput = devicethatIwanttopubblish.topicListInput.map((topic)=>{
            if(topic.nome===nameTopic){
                topic.stato=option
                return topic
            }else{
                return topic
            }

        })
        
        client.publish("MODIFICE_SENSORI",JSON.stringify(devicethatIwanttopubblish));
        //potrebbe anche triggerare la funzione  createSubOnEventOutput facendo un publish solo sul sensore modificato

        return devicethatIwanttopubblish
         
    }

    /**
   * 
   * @param {Device} device
   * @param {string} nometopic 
   * @param {string} event
   */  

    createSubOnEventOutput(device,nometopic,event){
        for(const dev of this.listDevices){
            if(device === dev){
                client.publish(nometopic,event); //publish delle modifiche
                client.subscribe(nometopic);   //ascolto sul topic modificato 
            }
        }

        }//se viene attivato un sensore di output genera una sub
            
    


     //salvataggio su file json
    saveDataOnFile(listDevices){
    const fs = require('fs');
    fs.writeFile('listaDispositivi.txt', listDevices, function (err) {
        if (err) return console.log(err);
        console.log('ListaDispositivi > listaDispositivi.txt');
      });
    }


    //lettura dati da file json
     readDataFromFile(){
    const fs = require('fs');
    fs.readFile('listaDispositivi.txt', (err, data) => {
        if (err) throw err;
        });
    }
     
     /**
     * 
     * @param {string} nome
     */
      getInfoTopicInput(nome){
        for(const dev of this.listDevices){
            if(dev.name === nome){
                return dev.topicListInput
            }
            
        }
    }

     /**
     * 
     * @param {string} nome
     */
      getInfoTopicOutput(nome){
        for(const dev of this.listDevices){
            if(dev.name === nome){
                return dev.topicListOutput
            }
            
        }
    }

    /**
     * 
     * @param {string} nome
     */
     getAllInfo(nome){
        for(const dev of this.listDevices){
            if(dev.name === nome){
                return [this.getInfoTopicInput(nome),this.getInfoTopicOutput(nome)]

            }
            
        }
    }


    publicListOfDevices(){
        const listaJson = JSON.stringify(this.listDevices);
        client.publish("ListaDispositivi",listaJson);
    }

    publishTopicInputList(){
        let InputList;
        for(const dev of this.listDevices){
             InputList = dev.topicListInput;
            }
        let listaIn = JSON.stringify(InputList);
        client.publish("ListaDispositivi",listaIn);
        return InputList;
    }

    publishTopicOutputList(){
        let outputList;
        for(const dev of this.listDevices){
             outputList = dev.topicListOutput;
            }
        let listaOut = JSON.stringify(outputList);
        client.publish("ListaDispositivi",listaOut);
        return outputList;
    }

    } 




module.exports = {Manager};

