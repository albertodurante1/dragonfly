var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')


//salvataggio su file json
var saveDati = function(){
const fs = require('fs');

let rawdata = fs.readFileSync('sensori.json');
let sensori = JSON.parse(rawdata);
console.log(sensori);

}


//lettura dati da file json
var readData = function(){
const fs = require('fs');

fs.readFile('sensori.json', (err, data) => {
    if (err) throw err;
    let sensori = JSON.parse(data);
    console.log(sensori);
});
}

//aggiunta sensore
var addDevice = function(device){
    var device = new Device(id,data,topic);
    client.publish(device.getTopic,device.getData())
    console.log('dati sensore:', device.getData())
}

//rimozione sensore
var removeDevice = function(device){
    client.publish(device.getTopic,'nessuna informazione')
    if(sensori != null && sensori != ''){
    delete sensori[device]
    }
    console.log('il sensore é stato rimosso')
}

//assegnazione stato master



