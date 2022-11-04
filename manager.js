var mqtt = require('mqtt')

const {Device,Topic} = require('./device');












//metodo di callback che assegna alla variabile objectMessage i dati presi dal sub su un topic 



function OnCallback(object){
    this.client.on('message', (topic,message)=>{
        const objectMessage = JSON.parse(message.toString())
        object(objectMessage);
       
    })
}

class Manager
{

    static TOPICNEWDEVICE = "newdevice";
    


    constructor(id,password,host,onNewDevice)
    {
        
        this.id = id; 
        this.password = password;
        this.listDevices = [];
        this.client = mqtt.connect(host)
        this.client.subscribe(Manager.TOPICNEWDEVICE); //aggiungere intervalli
        OnCallback(obj=>{            
        this.addDevice(obj)
        onNewDevice(obj)
        });
        
        
    }

   
  /**
   * 
   * @param {Device} objectMessage 
   */
    addDevice(objectMessage)
    {   
        //console.log(objectMessage)
        
      //  for(const dev of this.listDevices){
      //  if(dev.name === objectMessage.name){
      //      this.removeDevice(dev);
      //      let listInputTopic= objectMessage.topicListInput
      //      let listOutputTopic= objectMessage.topicListOutput
      //      this.listDevices.push //aggiorno il device giá presente con una lista aggiornata
      //  }else{
            let listInputTopic= objectMessage.topicListInput
            let listOutputTopic= objectMessage.topicListOutput
            let a = new Device(objectMessage.name,listInputTopic,listOutputTopic)
            this.listDevices.push(a)
            
            //console.log(listInputTopic)
           //console.log(listOutputTopic)
            //console.log(a)
            
             //aggiungo un device alla lista
    }
      //  }
   // }



/**
   * 
   * @param {String} nome
   */
    checkExistsDevice(nome){
        
            for(const dev of this.listDevices){
              if(nome !== dev.name){
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
        if(this.checkExistsDevice(device.name) ==false){
            let indexRemove = this.listDevices.indexOf(device);
            this.listDevices.splice(indexRemove); //utilizzo di splice per rimuovere un determinato elemento
        }

        
    }//controlla la presenza del dispositivo e se non esiste lo rimuove
     //si puó anche usare pop o remove del device
    
    /**
     * 
     * @param {Device} device 
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
        
        //client.publish("MODIFICHE_SENSORI",JSON.stringify(devicethatIwanttopubblish));
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
                this.client.publish(nometopic,event); //publish delle modifiche
                this.client.subscribe(nometopic);   //ascolto sul topic modificato 
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
    getInfoTopicInputOnDevice(nome){
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
    getInfoTopicOutputOnDevice(nome){
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
     getAllInfoOfDevice(nome){
        for(const dev of this.listDevices){
            if(dev.name === nome){
                return [this.getInfoTopicInputOnDevice(nome),this.getInfoTopicOutputOnDevice(nome)]

            }
            
        }
    }


    publishListOfDevices(){
        const listaJson = JSON.stringify(this.listDevices);
        this.client.publish("ListaDispositivi",listaJson);
    }

    publishTopicInputList(){
        let InputList = [];
        for(const dev of this.listDevices){
             InputList.push(dev.topicListInput);
            }
        let listaIn = JSON.stringify(InputList);
        this.client.publish("ListaDispositiviInput",listaIn);
        return InputList;
    }

    publishTopicOutputList(){
        let outputList = [];
        for(const dev of this.listDevices){
             outputList.push(dev.topicListOutput);
            }
        let listaOut = JSON.stringify(outputList);
        this.client.publish("ListaDispositiviOutput",listaOut);
        
    }

    getListOfDevice(){
        return this.listDevices;
    }

    getStateOfDevices(nome){
        let dispositiviIn = [];
        let dispositiviOut = [];
        for(const dev of this.listDevices){
            if(dev.name == nome){
            for(const dispI of dev.topicListInput){
                dispositiviIn.push(dispI.nome,dispI.stato);
                console.log(dispI.nome,dispI.stato);
                 
                for(const dispO of dev.topicListOutput){
                    dispositiviOut.push(dispO.nome,dispO.stato);
                    console.log(dispO.nome,dispO.stato)
                }
            }

        }
            return [dispositiviIn,dispositiviOut]

                    
        }
    }

} 




module.exports = Manager;

