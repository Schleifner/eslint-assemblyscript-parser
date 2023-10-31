const tsParse = require("@typescript-eslint/parser");

function parse(code, options) {
  let myParser = new asParser(code);
  return tsParse.parse(myParser.getresult(), options);
}

class asParser{
  constructor(code){
    this.sourceCode = code;
    this.tmpArr = new Array();
    this.newCode = "";
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
    this.newCode = this.tmpArr.join("");
    return this.newCode;
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
      if(tmpC == "\n" || tmpC == " "){
        this.tmpArr.push(tmpC);
        return;
      }
      this.tmpArr.push(" ");
    }
  }
}

module.exports = { parse };
