class Ipaddress
{
  
constructor(nome,ip,listTopic){

  this.nome =nome;
  this.ip=ip;
  this.topic = listTopic;

} //option é una lista


 
  
  getId(){
  return this.nome;
  }

  getOption(){
    return this.ip;
  }

  getStato(){
    return this.topic;
    }
}
 

module.exports = {Ipaddress};