var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var pass;
const {Device,Topic} = require('device');
const { deprecate } = require('util');

 master = new Boolean(false);
var password = "mini";

var obj = {
    table:[]
};

var datiSensori = JSON.stringify(obj);



//salvataggio su file json
var saveDati = function(){
const fs = require('fs');
let sensore = new Device(id,dati,topic);
let rawdata = fs.readFileSync(sensore.dati);
datiSensori.parse(rawdata);

}


//lettura dati da file json
var readData = function(){
const fs = require('fs');

fs.readFile(datiSensori, (err, data) => {
    if (err) throw err;
    datiSensori.parse(data);
    console.log(datiSensori)
});
}

//aggiunta sensore
var addDevice = function(device){
    saveDati(device) 
    client.publish(device.getTopic,device.getDati())
    console.log('dati sensore:', device.getDati())
}

//rimozione sensore
var removeDevice = function(device){
    client.device.destroy();
    if(sensori != null && sensori != ''){
        do{
            delete datiSensori[device];
        }while(device.name == device.name && device.topic == device.topic);
        }
    serverClient.removeListener('publish', onPublish)
    
}

//assegnazione stato master


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('password?', pass => {    
    readline.close();
    if(password == pass){
        master = !master
        console.log("passwrd corretta")
    }else{
        console.log('password errata')
    }
  });




class Manager
{
    constructor()
    {
        this.listDevices=[ ]
    }

    isValidMaster(){
        return false;
    }
    addDevice(){
        let inputTopicLed = new Topic('led1',["on", "off"])        
        this.listDevices.push(new Device(1,"esp", [inputTopicLed],null))
    }
    checkExistsDevice(id){} //controlla se esiste e in caso lo rimuove
    triggerDevice(nome, nameTopic,option)
    {
        for(device of listDevices)
        {
            if(device.name == name)
            {
                mqtt_pub(device.topicListInput[nameTopic, option] ) // name topic é il topic da dare e option é l'opzione da cambiare
            
            }
        }
    }
    createSubOnEventOutput(){
            client.subscribe(OuputTopicLed);
        }
    } //se viene attivato un sensore triggera un evento

