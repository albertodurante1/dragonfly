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

  getIp(){
    return this.ip;
  }

  getTopic(){
    return this.topic;
    }
}
 

module.exports = {Ipaddress};