import { ClassDeclaration, createSourceFile, Node, ScriptTarget, ConstructorDeclaration, SyntaxKind } from "typescript";
//import {code} from './code.ts';
const code: string = "";
const sourceFile = createSourceFile('./code.ts', code, ScriptTarget.Latest, true);
sourceFile.forEachChild(findClass);

function findClass(node: Node): void {
  if (node.kind === SyntaxKind.ClassDeclaration) {
    const { name } = node as ClassDeclaration;
    if (name && name.text === 'Animal') {
      node.forEachChild(findConstructor);
      return;
    }
  }
  node.forEachChild(findClass);
}

function findConstructor(node: Node): void {
  if (node.kind === SyntaxKind.Constructor) {
    printParameters(node as ConstructorDeclaration);
  }
}

function printParameters(node: ConstructorDeclaration) {
  node.parameters.forEach(parameter => {
    console.log(parameter.name.getText());
  })
}






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


      // ts.getDecorators = (node) => {
      //   return undefined;
      // }