#include "device.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <string.h>
#include <strings.h>



int pin1=13;
int pin2=14;
char jsonIP[1000];
DynamicJsonDocument docIP(1024);
JsonObject objIP=docIP.as<JsonObject>();

String clientId;
String stato[2]={"acceso","spento"};

  

 
 const char* ssid = ""; //inserire ssid della connessione hotspot
 const char* pass = "";

 const char* mqtt_server = ""; //inserire indirizzo ip del server 127.0.0.1 non funziona

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;
long val = 0;
char* gass = "gas";

Topic led1("Led1",stato,2,"spento");
Topic led2("Led2",stato,2,"spento");
Topic mov("Movimento","non rilevato");
Topic gas("Carbonio",String (analogRead(5)));
Topic topicInput[20]={led1};
Topic topicOutput[20] = {mov};
Device dispositivo("esp",topicInput,topicOutput);

 



//stabilire connessione wifi
 void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: "); 
  Serial.println(WiFi.localIP());
  
   }

void callback(char* topic, byte* payload, unsigned int length) {
  String messaggio ;
  for(int i=0;i<length;i++){
    messaggio += (char)payload[i];
  }
  if(strcmp(topic,"MODIFICHE_SENSORI")==0){
    Serial.println(messaggio);
  }
  DynamicJsonDocument docMod(1024);
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");  
  Serial.println();  
  deserializeJson(docMod, (char*) payload, length);
  String stateLed1 = docMod["topicListInput"][0]["stato"];
  String stateLed2 = docMod["topicListInput"][1]["stato"];
  if(stateLed1 == "acceso"){
    digitalWrite(pin1, HIGH);
    Serial.println("led1 acceso");    
    }else{
    digitalWrite(pin1, LOW); 
    Serial.println(" led1 spento"); 
  }  

  if(stateLed2 == "acceso"){
    digitalWrite(pin2, HIGH);
    Serial.println("led2 acceso");
  }else{
    digitalWrite(pin2, LOW); 
    Serial.println("led2 spento"); 
  }   
   
}




void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
     clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");      
      //client.publish("DispositivoConnesso", "connesso");      
      client.subscribe("MODIFICHE_SENSORI"); 
      String localIP = WiFi.localIP().toString().c_str();      
      client.publish("newdevice", dispositivo.getJson("esp",localIP,topicInput,topicOutput));                       
      } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 3 seconds");
      delay(3000);
      }
    }
  }





   
void setup() {
  pinMode(BUILTIN_LED, OUTPUT);  
  pinMode(16,INPUT);  
  pinMode(4,INPUT); 
  pinMode(pin1,OUTPUT);
  pinMode(pin2,OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  
  
  
 
}

void loop() {

  
 if (!client.connected()) {
    reconnect();
  }
  client.loop();



  if(digitalRead(16) == HIGH) // ascolto sul pin del sensore di movimento
  {   
    client.publish("readTopic", dispositivo.getJsonOutput("movimento","rilevato"));   
   doc.clear();
 }else{
   delay(7000);
   client.publish("readTopic", dispositivo.getJsonOutput("movimento","non rilevato")); 
 } // esempio di publish in caso di trigger dei sensori 

 // client.publish("outputtriggered", dispositivo.getJsonOutput("gas",String (analogRead(12))));   
   
     
  
}


