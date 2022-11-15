var mqtt = require('mqtt');
const { setInterval } = require('timers');
var ping = require('ping');
const {Device,Topic} = require('./device');
const {Ipaddress} = require('./ipAddress');
const { timeStamp } = require('console');












//metodo di callback che assegna alla variabile objectMessage i dati presi dal sub su un topic 





class Manager
{
    static IPADDRESS = "infoIP";
    static TOPICNEWDEVICE = "newdevice";
    static TOPICSENSORTRIGGERED = "OutTriggered";
    static TOPICMODIFICHESENSORI = "MODIFICHE_SENSORI";
    
     OnCallback(object){
        this.client.on('message', (topic,message)=>{
    
            if(topic == Manager.TOPICNEWDEVICE){
                const objectMessage = JSON.parse(message.toString())
                this.addDevice(objectMessage);
            }

            if(topic == Manager.TOPICSENSORTRIGGERED){
                const objectMessage = JSON.parse(message.toString())
                this.updateSensorOutPut(objectMessage);
            }
    
            if(topic == Manager.TOPICMODIFICHESENSORI){
                const objectMessage = JSON.parse(message.toString())
                this.updateSensorInPut(objectMessage);
            }
            
            if(topic == Manager.IPADDRESS){
                const objectMessage = JSON.parse(message.toString())
                this.listOfIpAddress.push(objectMessage[1])
                this.ipAdd(objectMessage)
                
            }
            
           
        })

        this.client.on('connect',()=>{
            this.client.subscribe(Manager.TOPICNEWDEVICE);
            this.client.subscribe(Manager.TOPICSENSORTRIGGERED);
            this.client.subscribe(Manager.TOPICMODIFICHESENSORI);
            this.client.subscribe(Manager.IPADDRESS);
        })

        
    }

    constructor(id,password,host,onNewDevice)
    {
        
        this.id = id; 
        this.password = password;
        this.listDevices = [];
        this.listOfIpAddress = [];
        this.listOfIpConnection = [];
        this.client = mqtt.connect(host,{keepalive :60})        
        this.OnCallback(obj=>{            
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
        let listInputTopic= objectMessage.topicListInput
        let listOutputTopic= objectMessage.topicListOutput
        let a = new Device(objectMessage.name,listInputTopic,listOutputTopic)
       
    if(this.listDevices.length === 0 ){
        this.listDevices.push(a) 
    }else{ 

        for(const dev of this.listDevices){
            if(dev.name === a.name){
                this.removeDevice(a.name);
                this.listDevices.push(a) //aggiorno il device giá presente con una lista aggiornata
                }else{
                    this.listDevices.push(a)             
        	            //aggiungo un device alla lista
                }
            }
    }    
  }
   
    removeDevice(name){
            const indexRemove =this.listDevices.map(device=>device.name).indexOf(name)
            this.listDevices.splice(indexRemove); //utilizzo di splice per rimuovere un determinato elemento
        }

        
    //controlla la presenza del dispositivo e se non esiste lo rimuove
     //si puó anche usare pop o remove del device
    
   

     ipAdd(objectMessage){
        let a = new Ipaddress(objectMessage[0],objectMessage[1],objectMessage[2])
        this.listOfIpConnection.push(a)
        for(const topic of objectMessage[2]){
            this.client.subscribe(topic);
        }
        console.log(this.listOfIpConnection)
     }
    
    triggerDevice(name, nameTopic,option) 
    {

        //faccio una copia del device e lo mappo per farlo combaciare
        const indexOfDeviceInsideListDevices =this.listDevices.map(device=>device.name).indexOf(name)

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
        
        this.client.publish("MODIFICHE_SENSORI",JSON.stringify(devicethatIwanttopubblish));
         //aggiorna lo stato dei dispositivi 
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
            if(device.name === dev.name){
                this.client.publish(nometopic,event); //publish delle modifiche
                this.client.subscribe(nometopic);   //ascolto sul topic modificato 
            }
        }

        }//se viene attivato un sensore di output genera una sub
     
    updateSensorOutPut(objectMessage){
        for (const dev of this.listDevices){
            if(dev.name == objectMessage.name){
                const indexOfDeviceInsideListDevices =this.listDevices.map(device=>device.name).indexOf(dev.name)

                    if(indexOfDeviceInsideListDevices<0){
                    console.log(' Il device non è presente nella lista!')
                    return 
        }
                    const deviceInsideOfList = this.listDevices[indexOfDeviceInsideListDevices];
                    const deviceCopy = JSON.parse(JSON.stringify(deviceInsideOfList));
                    const updatedDevice = new Device(deviceCopy.name,deviceCopy.topicListInput,objectMessage.topicListOutput);
                    this.addDevice(updatedDevice);
            } 
        }
    }   

    updateSensorInPut(objectMessage){
        for (const dev of this.listDevices){
            if(dev.name == objectMessage.name){
                const indexOfDeviceInsideListDevices =this.listDevices.map(device=>device.name).indexOf(dev.name)

                    if(indexOfDeviceInsideListDevices<0){
                    console.log(' Il device non è presente nella lista!')
                    return 
        }
                    const deviceInsideOfList = this.listDevices[indexOfDeviceInsideListDevices];
                    const deviceCopy = JSON.parse(JSON.stringify(deviceInsideOfList));
                    const updatedDevice = new Device(deviceCopy.name,objectMessage.topicListInput,deviceCopy.topicListOutput);
                    this.addDevice(updatedDevice);
            } 
        }
    }   
    

    unSubOnEvent(nameTopic){
        this.client.unsubscribe(nameTopic);
    }


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
        if(this.listDevices.length === 0 ){
            return "non ci sono dispositivi connessi"
        }else{
            return this.listDevices; 
        }
        
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


    

    pingDevice(hosts){
      
        hosts.forEach(function(host){
            ping.sys.probe(host, function(isAlive){
                if(!isAlive){
                    for (const a of this.listOfIpConnection){
                        if(host == a.ip){
                            this.removeDevice(a.nome);
                            for(const topic of a.topic){
                                this.client.unSubOnEvent(topic)
                            }
                        }

                    }
                    
                }
        
            });
         });
    }

} 




module.exports = Manager;

