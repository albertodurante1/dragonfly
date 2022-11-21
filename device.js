
class Device {
  /**
   * 
   * @param {string} name 
   * @param {Topic[]} topicListInput 
   * @param {Topic[]} topicListOutput 
   */
  constructor(name, topicListInput,topicListOutput) {
    /**
     * @type {string}
     */
    this.name = name;
    /**
     * @type {Topic[]}
     */
    this.topicListInput = topicListInput;
    /**
     * @type {Topic[]}
     */
    this.topicListOutput = topicListOutput;


  }

  getName(){
    return this.name;
  }

  getTopicListInput(){
    return this.topicListInput;
  }
  getTopicListOutput(){
    return this.topicListOutput;
  }

}

class Topic
{
  /**
   * 
   * @param {string} nome 
   * @param {string[]} options 
   * @param {string} stato
   */
constructor(nome,options,stato){

  this.nome =nome;
  this.options=options;
  this.stato = stato;

} //option é una lista
 
static topic2Val(nome,stato){
  return new Topic(nome,null,stato);
} //istanza del costruttore di topic con solo 2 valori nome e stato

  
  getId(){
  return this.nome;
  }

  getOption(){
    return this.options;
  }

  getStato(){
    return this.stato;
    }
}
 

module.exports = {Device,Topic};
