const tsParse = require("@typescript-eslint/parser");

function parse(code, options) {
  let myParser = new asParser(code);
  return tsParse.parse(myParser.getresult(), options);
}

class asParser{
  constructor(code){
    this.sourceCode = code;
    this.tmpArr = new Array();
    this.index = 0;
  }

  getresult(){
    while(this.index < this.sourceCode.length){
      let curChar = this.getNextChar();
      if (curChar == "@") {
        this.atProcessor();
      }else{
        this.tmpArr.push(curChar);        
      }
    }
    return this.tmpArr.join("");
  }

  getNextChar(){
    let newChar = this.sourceCode[this.index];
    this.index++;
    return newChar;
  }

  atProcessor(){
    this.tmpArr.push(" ");
    while (this.index < this.sourceCode.length) {
      let tmpC = this.getNextChar();
      if(this.isStopChar(tmpC)){
        this.tmpArr.push(tmpC);
        return;
      }
      if(tmpC == "("){
        this.braceProcessor();
        return;
      }
      this.tmpArr.push(" ");
    }
  }

  isStopChar(tmpC){
    return tmpC == "\n" || tmpC == " " || tmpC == "\t";
  }

  braceProcessor(){
    this.tmpArr.push(" ");
    while (this.index < this.sourceCode.length) {
      let tmpC = this.getNextChar();
      if(tmpC == ")"){
        return;
      }
    }
  }
}

module.exports = { parse };
