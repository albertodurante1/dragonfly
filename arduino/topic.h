#ifndef topic_h
#define topic_h
#include <string.h>
#include <strings.h>





class Topic{
  private:
  String nome ;
  String opzioni[2];
  String value ;
  String stato;

  public:


 void setNome(String n) {
      nome = n;
 }

  void setStato(String n) {
      stato = n;
 }

  String getNome() {
      return nome;
  }

  String getOpzione(int j) {
       return opzioni[j];
      
   }

  String getStato(){
    return stato;
  }

  String getVal(){
    return value;
  }

  int getLenght(){
    return sizeof(opzioni)/sizeof(String);
  }
  

  Topic(){

  }
  
  Topic(String a){
   nome = a;
       
  }

   

  Topic(String a,String opzione[], int lenght,String stat){
   nome = a;
    for(int i=0; i<lenght ;i++){
        opzioni[i] = opzione[i];
      }
      stato = stat;
  }
  Topic(String a, String b){
      nome = a;
      value = b;
  }
};

 
#endif
