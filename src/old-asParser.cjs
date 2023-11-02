const tsParse = require("@typescript-eslint/parser");
const ts = require('typescript'); 
const estraverse = require('estraverse');
const AstConverter = require("../node_modules/@typescript-eslint/typescript-estree/dist/ast-converter.js");

//const UAYORisk = require("@typescript-eslint/typescript-estree/use-at-your-own-risk");
//const convert = require("../node_modules/@typescript-eslint/typescript-estree/dist/convert.js")

function parse(code, options) {
  // let myParser = new asParser(code);
  // console.log(myParser.getresult());
  // return tsParse.parse(myParser.getresult(), options);

  // AstConverter.astConverter = (ast, parseSettings, shouldPreserveNodeMaps) => {
  //   const { parseDiagnostics } = ast;
  //   if (parseDiagnostics.length) {
  //       throw (0, convert_1.convertError)(parseDiagnostics[0]);
  //   }

  //   function visitor(node) {
  //     if(node.getChildCount()) {
  //       return ts.visitEachChild(node, visitor, )
  //     }
  //     console.log(node.kind);
  //     if(node.kind == ts.SyntaxKind.Decorator){
  //       return undefined;
  //     }
  //     return node;
  //   }
  //   ts.visitEachChild(ast, visitor)

    /**
     * Recursively convert the TypeScript AST into an ESTree-compatible AST
     */
  //   const instance = new convert_1.Converter(ast, {
  //       allowInvalidAST: parseSettings.allowInvalidAST,
  //       errorOnUnknownASTType: parseSettings.errorOnUnknownASTType,
  //       shouldPreserveNodeMaps,
  //       suppressDeprecatedPropertyWarnings: parseSettings.suppressDeprecatedPropertyWarnings,
  //   });
  //   const estree = instance.convertProgram();
  
  //   if (!parseSettings.range || !parseSettings.loc) {
  //       (0, simple_traverse_1.simpleTraverse)(estree, {
  //           enter: node => {
  //               if (!parseSettings.range) {
  //                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TS 4.0 made this an error because the types aren't optional
  //                   // @ts-expect-error
  //                   delete node.range;
  //               }
  //               if (!parseSettings.loc) {
  //                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TS 4.0 made this an error because the types aren't optional
  //                   // @ts-expect-error
  //                   delete node.loc;
  //               }
  //           },
  //       });
  //   }
  
  //   if (parseSettings.tokens) {
  //       estree.tokens = (0, node_utils_1.convertTokens)(ast);
  //   }
  
  //   if (parseSettings.comment) {
  //       estree.comments = (0, convert_comments_1.convertComments)(ast, parseSettings.codeFullText);
  //   }
  //   const astMaps = instance.getASTMaps();
  //   return { estree, astMaps };
  // }
  return tsParse.parse(code, options);
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
      this.tmpArr.push(" ");
      if(tmpC == ")"){
        return;
      }
    }
  }
}

module.exports = { parse };
