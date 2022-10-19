
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
   */
constructor(nome,options){

  this.nome =nome;
  this.options=options;

} //option é una lista

  getId(){
  return this.nome;
  }

  getOption(){
    return this.options;
  }
}
 

module.exports = {Device,Topic};
