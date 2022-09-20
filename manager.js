var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')

const {Device,Topic} = require('device');
const { deprecate } = require('util');


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
var checkExistence = function(device){
    //inserire libreria github detecte device
}








class Manager
{
    constructor()
    {
        this.listDevices= [];
    }

    //controllo se il dispositivo é master

    isValidMaster = function(id,password){  //farlo in maniera autonoma con riconoscimento di mini senza richiedere id e pass
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      readline.question('user?', user => {    
        readline.close();
        if(id == user){
            readline.question('password?', pass => {    
                readline.close();
                if(password == pass){
                    return  true;
                    
                }else{
                    return false;
                }
              });
            
        }else{
                return false;
        }
      });
     
    }
  
    addDevice(device,nome, option)
    {
        let inputTopic = new Topic(nome,option);     
        if (isValidMaster){
            this.listDevices.push(new Device(device.nome, [inputTopic],null,true));
            client.publish(ListaDispositivi, this.listDevices);
        }else{
            this.listDevices.push(new Device(device.nome, [inputTopic],null,false));
            client.publish(ListaDispositivi, this.listDevices);
        }
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
              }
            }
            },500);
          });
    } //controlla la presenza del dispositivo e se esiste da le sue informazioni in caso contrario lo rimuove



    triggerDevice(device, nameTopic,option) 
    {
        for(device of this.listDevices){
            if(device.nome = nameTopic){ 
                if(option == 'on'){
                    device.option = HIGH;
                    client.publish(nameTopic, device.topicListInput[nameTopic,option]);
                }else{
                    device.option = LOW;
                 client.publish(nameTopic, device.topicListInput[nameTopic,option]);
                }
            }
        }       
    }


    createSubOnEventOutput(device,nometopic,event){
        for(device of this.listDevices){
            if(event){
                client.subscribe(nometopic);
            }

        }
            
            
            
    } //se viene attivato un sensore triggera un evento
} 

