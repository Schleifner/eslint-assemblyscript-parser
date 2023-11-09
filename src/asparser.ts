import * as tsTree from "@typescript-eslint/typescript-estree";
const ts = require("typescript");

tsTree.astConverter = (ast, parseSettings, shouldPreserveNodeMaps) => {
  const { parseDiagnostics } = ast;
  if (parseDiagnostics.length) {
      throw (0, convert_1.convertError)(parseDiagnostics[0]);
  }
  ts.visitEachChild()

  visAllnode(ast);

  function visAllnode(mynode){
      if(mynode != undefined){
          console.log(mynode);
          console.log("#######################")
          if(mynode.hasOwnProperty("body")){
              //if(mynode.body.hasOwnProperty("type")){
                  if(mynode.body.type == "ClassBody" || mynode.body.type == "BlockStatement"){
                      visAllnode(mynode.body);
                  }else{
                      for(let i = 0; i < mynode.body.length; i++){
                          visAllnode(mynode.body[i]);
                      }
                  }
              //}
          }
      }
  }

  const instance = new convert_1.Converter(ast, {
      allowInvalidAST: parseSettings.allowInvalidAST,
      errorOnUnknownASTType: parseSettings.errorOnUnknownASTType,
      shouldPreserveNodeMaps,
      suppressDeprecatedPropertyWarnings: parseSettings.suppressDeprecatedPropertyWarnings,
  });
  const estree = instance.convertProgram();
  if (!parseSettings.range || !parseSettings.loc) {
      (0, simple_traverse_1.simpleTraverse)(estree, {
          enter: node => {
              if (!parseSettings.range) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TS 4.0 made this an error because the types aren't optional
                  // @ts-expect-error
                  delete node.range;
              }
              if (!parseSettings.loc) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TS 4.0 made this an error because the types aren't optional
                  // @ts-expect-error
                  delete node.loc;
              }
          },
      });
  }
  if (parseSettings.tokens) {
      estree.tokens = (0, node_utils_1.convertTokens)(ast);
  }
  if (parseSettings.comment) {
      estree.comments = (0, convert_comments_1.convertComments)(ast, parseSettings.codeFullText);
  }
  const astMaps = instance.getASTMaps();
  return { estree, astMaps };
}

module.exports = { ...tsParse };
