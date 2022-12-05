var mqtt = require('mqtt');
var ping = require('ping');
const {Device,Topic} = require('./device');
const {Ipaddress} = require('./ipAddress');
const exec = require("child_process").exec;



class Manager
{
    
    static LISTDEVICES = "listDevices";
    static TOPICNEWDEVICE = "newdevice";
    static TOPICSENSORTRIGGERED = "readTopic";
    static TOPICMODIFICHESENSORI = "writeTopic";
    static PINGDEVICE = "pingdevice";
    static LISTTOPICDEVICE ="listTopicsDevice";
    static SUBONTOPIC = "subOnTopic";
    static UNSUBONTOPIC = "unSubOnTopic";
    static SENSORTRIGGERED = "outputtriggered";

    
     OnCallback(object){
        this.client.on('message', (topic,message)=>{
            const objectMessage = JSON.parse(message.toString())
            
            switch(topic){
                case Manager.TOPICNEWDEVICE:
                    this.addDevice(objectMessage);                   
                    break;
                case Manager.TOPICSENSORTRIGGERED:
                    this.getStatusOfTopicOutputOnDevice(objectMessage);
                    break;
                case Manager.TOPICMODIFICHESENSORI:
                    this.triggerDevice(objectMessage);
                    break;
                case Manager.PINGDEVICE:
                    this.pingAllDevice();
                    break;
                case Manager.LISTDEVICES:
                        if(objectMessage.msg === "ciao"){
                            this.getListOfDevice();
                        }
                        
                    
                    
                    break;
                case Manager.LISTTOPICDEVICE:
                    this.getAllInfoOfDevice(objectMessage);
                    break;
                case Manager.SUBONTOPIC:
                    this.subOnTopic();
                    break;
                case Manager.UNSUBONTOPIC:
                    this.unSubOnEvent(objectMessage);
                    break;
                case Manager.SENSORTRIGGERED:
                    this.updateSensorOutPut(objectMessage);
                    break;                                   
                default:this.client.publish(topic,"questo topic non é stato ancora gestito");
                break;
            }
           
           
           
        })

        this.client.on('connect',()=>{
            this.client.subscribe(Manager.TOPICNEWDEVICE);
            this.client.subscribe(Manager.TOPICSENSORTRIGGERED);
            this.client.subscribe(Manager.TOPICMODIFICHESENSORI);
            this.client.subscribe(Manager.PINGDEVICE);
            this.client.subscribe(Manager.LISTDEVICES);
            this.client.subscribe(Manager.LISTTOPICDEVICE);
            this.client.subscribe(Manager.SUBONTOPIC);
            this.client.subscribe(Manager.UNSUBONTOPIC);
            this.client.subscribe(Manager.SENSORTRIGGERED);
        })

        
    }

    constructor(id,password,host)
    {
        
        this.id = id; 
        this.password = password;
        this.listDevices = [];       
        this.client = mqtt.connect(host,{clientId:id})        
        this.OnCallback(obj=>{ 
        });
        
        
    }

   
  /**
   * 
   * @param {Device} objectMessage 
   */
    addDevice(objectMessage)
    {   
    try{
        //console.log(objectMessage)
        let listInputTopic= objectMessage.topicListInput
        let listOutputTopic= objectMessage.topicListOutput
        let a = new Device(objectMessage.name,objectMessage.ip,listInputTopic,listOutputTopic)
       
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
    }catch(err){
        console.log("errore in aggiunta dispositivo", err);
        }   
    }
   
    removeDevice(name){
        try{ 
            const indexRemove =this.listDevices.map(device=>device.name).indexOf(name)
            this.listDevices.splice(indexRemove); 
        }  
        catch(err){
            console.log("errore nella rimozione del dispositivo", err);
        }   
    }   
    //controlla la presenza del dispositivo e se non esiste lo rimuove
     //si puó anche usare pop o remove del device
    
       

     ipAddressOfDevice(nome){
        for(let a of this.listDevices){
            if(a.nome == nome){
                this.client.publish("requestIP",a.ip);
            }
            
         } 
     }

    triggerSensorInput(objectMessage) 
    {
      try{for(const dev of this.listDevices){    
        for(const a of dev.topicListOutput){ 
            this.updateSensorOutPut(objectMessage);         
            
            
    }
   }}catch(err){
        return ("rilevato errore in TriggerSensorInput: " + err)
   }
       
    }
       

        
        
   subOnTopic(topic){
    //controlliamo se topic sia una lista di topic o un solo topic
    if(Array.isArray(topic)){
        for(const a of topic){ //unsub sui topic del device
        this.client.subscribe(a)
    }}else{
        this.client.subscribe(topic);
    }
    this.client.subscribe(topic);
   } 
         
    
    
    triggerDevice(objectMessage) 
    {
        try{ 
        const indexOfDeviceInsideListDevices = this.listDevices.findIndex(obj =>{return obj.name ===objectMessage.name});
       
        if(indexOfDeviceInsideListDevices<0){
           console.log(' Il device non è presente nella lista!')
           this.client.publish("writeTopic","Il device non è presente nella lista!")
           return 
        }else{
            const deviceInsideOfList = this.listDevices[indexOfDeviceInsideListDevices];      
            const devicethatIwanttopubblish = new Device(deviceInsideOfList.name,deviceInsideOfList.ip,deviceInsideOfList.topicListInput,deviceInsideOfList.topicListOutput)
                      for(const dev of devicethatIwanttopubblish.topicListInput){
                        if(dev.nome===objectMessage.topic){
                            dev.stato=objectMessage.option;
                            
                        }           
                      }
                    this.client.publish("MODIFICHE_SENSORI",JSON.stringify(devicethatIwanttopubblish));                       
                    this.addDevice(devicethatIwanttopubblish);
                    
   
                }        
        
        }catch(err){
           console.log("errore nell'attivazione del sensore", err);    
        }
    }

 

    
    createSubOnEventOutput(nome,nometopic){
        for(const dev of this.listDevices){
            if(nome === dev.name){
                this.client.subscribe(nometopic);   //ascolto sul topic modificato 
            }
        }

        }//se viene attivato un sensore di output genera una sub
     


    updateSensorOutPut(objectMessage){
        try{ 
        const indexOfDeviceInsideListDevices = this.listDevices.findIndex(obj =>{return obj.name === objectMessage.name});
       
        if(indexOfDeviceInsideListDevices<0){
           console.log(' Il device non è presente nella lista!')
           this.client.publish("outputtriggered","Il device non è presente nella lista!")
           return 
        }else{
                 const deviceInsideOfList = this.listDevices[indexOfDeviceInsideListDevices];      
                     
                const devicethatIwanttoUpdate = new Device(deviceInsideOfList.name,deviceInsideOfList.ip,deviceInsideOfList.topicListInput,deviceInsideOfList.topicListOutput)
                      for(const dev of devicethatIwanttoUpdate.topicListOutput){
                        if(dev.nome===objectMessage.topic){
                            dev.stato=objectMessage.option;
                            
                        }           
                      }           
    
                                          
                    this.addDevice(devicethatIwanttoUpdate);
                    
       
   
                } 
            }catch(err){
                    console.log("errore nell'update, sintassi non corretta", err);
            }       
        
            
               
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
     

    getInfoTopicInputOnDevice(nome){
        for(const dev of this.listDevices){
            if(dev.name === nome){
                return dev.topicListInput
            }else{
                return "dispositivo non presente"
            }
            
        }
    }
    getInfoTopicOutputOnDevice(nome){
        for(const dev of this.listDevices){
            if(dev.name === nome){
                return dev.topicListOutput
            }else{
                return "dispositivo non presente"
            }
            
        }
    }
   getAllInfoOfDevice(objectMessage){
        for(const dev of this.listDevices){
            if(dev.name === objectMessage.name){
                const v = [];
                v.push(this.getInfoTopicInputOnDevice(objectMessage.name));
                v.push(this.getInfoTopicOutputOnDevice(objectMessage.name));
                const listaJsonTopic = JSON.stringify(v);
                this.client.publish("listTopicsDevice",listaJsonTopic);
                
                }
            
        }
    }

    getStatusOfTopicOutputOnDevice(objectMessage){
        try{ 
        for(const dev of this.listDevices){
            if(dev.name === objectMessage.name){
                for (const top of dev.topicListOutput)
                    if(top.nome == objectMessage.topic){
                        let stato = top.stato;
                        let state =JSON.stringify({"name":"Movimento","stato":stato})
                        this.client.publish("readTopic",state);
                    }
            }else{
                return "dispositivo non presente"
            }
            
            }
        }catch(err){
            console.log("errore nella restituzione della lista dei topic", err);
        }
    }
    unSubOnEvent(topic){
        //controlliamo se topic sia una lista di topic o un solo topic
        if(Array.isArray(topic)){
            for(const a of topic){ //unsub sui topic del device
            this.client.unsubscribe(a);
        }}else{
            this.client.unsubscribe(topic);
        }
        
        
    }


   

    publicNameOfAllDevice(){

        const listNameOfDevices = [];
        for(const a of this.listDevices){
            listNameOfDevices.push(a.name);
        }
        const listaJson = JSON.stringify(listNameOfDevices);
        this.client.publish("nameOfAllDevice", listaJson);
    }

    publishTopicInputList(nomeD){
        let InputList = [];
        for(const dev of this.listDevices){
            if(dev.nome==nomeD){
                InputList.push(dev.topicListInput);
            }
             InputList.push(dev.topicListInput);
            }
        let listaIn = JSON.stringify(InputList);
        this.client.publish("DeviceInputList",listaIn);
        
    }

    publishTopicOutputList(nomeD){
        let outputList = [];
        for(const dev of this.listDevices){
            if(dev.nome==nomeD){
                outputList.push(dev.topicListOutput);
            }
             outputList.push(dev.topicListOutput);
            }
        
            let listaOut = JSON.stringify(outputList);
            this.client.publish("DeviceInputList",listaOut);
        
    }

    getListOfDevice(){
        
        if(this.listDevices.length === 0 ){
            this.client.publish("listDevices","non ci sono dispositivi connessi");
            return 
        }
        
                 this.client.publish("listDevices",JSON.stringify(this.listDevices));
            
           
            
            
            
        
        
    }

    publishListOfDevices(a){
        
        const listaJson = JSON.stringify(a);
        this.client.publish("listDevice",listaJson);
    }
     
        
    
  
    
    removeDeadDevice(r){
        console.log("rimozione dispositivo Inattivo: ", r.ip);
        this.removeDevice(r.nome) //rimozione device dalla lista
        
    }

    pingAllDevice(){
        for(const a of this.listDevices){              
             ping.sys.probe(a.ip, Alive =>{
                var msg = Alive ? 'host ' + a.ip + ' é attivo' : 'host ' + a.ip + ' non attivo';
                console.log(msg);
                // @ts-ignore
                if (!Alive) {  exec("rimozione listner",this.removeDeadDevice(a)) }      
             });   
                
        }
    }         
     
    

} 




module.exports = Manager;

