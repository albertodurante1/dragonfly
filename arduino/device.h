#include "topic.h"
#ifndef sensore_h
#define sensore_h
#include <string.h>
#include <strings.h>
#include <ArduinoJson.h>



char jsonStr[1000];
DynamicJsonDocument doc(1024);
JsonObject obj=doc.as<JsonObject>();

 
  
class Device{
  private:
  String nomeS ;
  Topic topicInput[5];
  Topic topicOutput[5];
  
  public:
  
  Device(){
  
  };

  

  Device(String nS,Topic I[],Topic O[]){
  nomeS = nS;
  for(int i=0; i<(sizeof(I)/sizeof(Topic)) ;i++){
  topicInput[i] = I[i];
  };
  for(int i=0; i<(sizeof(O)/sizeof(Topic)) ;i++){
  topicOutput[i] = O[i];
  
  };
  
  
 

 

};

void SetTopicI(Topic topI[]){
  for(int i=0; i<(sizeof(topI)/sizeof(Topic)) ;i++){
  topicInput[i] = topI[i];
  };

}

String getNomeS() {
      return nomeS;
    }

Topic getTopicI() {
      return topicInput[20];
    }

Topic getTopicO() {
      return topicOutput[20];
    }
 
Topic getElementI(Topic In[],int i){
  return In[i];
}

Topic getElementO(Topic Out[],int i){
  return Out[i];
}

 char* getJson(String i,Topic topI[],Topic topO[]){
    doc["name"]=i;
    JsonArray topicListInput = doc.createNestedArray("topicListInput");
    JsonObject s1 = topicListInput.createNestedObject();
    JsonObject s2 = topicListInput.createNestedObject(); 
    Topic led1=getElementI(topI,0);
    Topic led2=getElementI(topI,1);
    s1["nome"]= led1.getNome();
    JsonArray options = s1.createNestedArray("options");
    for(int i=0; i<(led1.getLenght()) ;i++){
    options.add(led1.getOpzione(i));
    };
    s1["stato"] = led1.getStato();
    s2["nome"]= led2.getNome();
    JsonArray options2 = s2.createNestedArray("options");
    for(int i=0; i<(led2.getLenght()) ;i++){
    options2.add(led2.getOpzione(i));
    };
    s2["stato"] = led2.getStato();
    JsonArray topicListOutput = doc.createNestedArray("topicListOutput");
    JsonObject o1 = topicListOutput.createNestedObject(); 
    Topic mov =getElementO(topO,0);
    o1["nome"]= mov.getNome();
    o1["stato"] = mov.getVal();
    serializeJson(doc,jsonStr);
    return jsonStr;
 }

 char* getJsonOutput(String a,String b){
    doc["nome"]=a;
    doc["stato"] =b;
    serializeJson(doc,jsonStr);
    return jsonStr;
 }

};

#endif