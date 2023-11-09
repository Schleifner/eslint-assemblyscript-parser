"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { default: exp } = require("constants");
const fs = require("fs");
const tsParse = require(__dirname + "/../node_modules/@typescript-eslint/parser/dist/parser.js");
const ts = require("typescript");

const tsFilePath = __dirname + "/../tests/testfile/external.ts";
var rawTextString = fs.readFileSync(tsFilePath).toString();
console.log("rawTextString.length = " + rawTextString.length);
var rawTextArr = rawTextString.split("");
// console.log(rawTextArr);
const ast = ts.createSourceFile(
    tsFilePath,
    rawTextString,
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
);

function replaceText(code){
    function replaceDecoratorsWithSpace(pos, end){
        for(let i = pos; i <= end; i++){
            if(rawTextString[i] == "\n"){
                rawTextArr[i] = "\n";
            }else{
                rawTextArr[i] = " ";
            }
        }
    }

    const transformerFactory = (context) => {
        return (rootNode) => {
            function visit(node) {
                node = ts.visitEachChild(node, visit, context);
                function replaceDecorators(node){
                    // if(ts.isParameter(node)){

                    // }else if(){

                    // }else if(){

                    // }else if(){

                    // }else if(){

                    // }else if(){

                    // }else if(){

                    // }
                    return ts.isParameter(node) ? context.factory.updateParameterDeclaration(node, selectDecorator(node.modifiers), node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer) :
                    ts.isPropertyDeclaration(node) ? context.factory.updatePropertyDeclaration(node, selectDecorator(node.modifiers), node.name, node.questionToken ?? node.exclamationToken, node.type, node.initializer) :
                    ts.isMethodDeclaration(node) ? context.factory.updateMethodDeclaration(node, selectDecorator(node.modifiers), node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body) :
                    ts.isGetAccessorDeclaration(node) ? context.factory.updateGetAccessorDeclaration(node, selectDecorator(node.modifiers), node.name, node.parameters, node.type, node.body) :
                    ts.isSetAccessorDeclaration(node) ? context.factory.updateSetAccessorDeclaration(node, selectDecorator(node.modifiers), node.name, node.parameters, node.body) :
                    ts.isClassExpression(node) ? context.factory.updateClassExpression(node, selectDecorator(node.modifiers), node.name, node.typeParameters, node.heritageClauses, node.members) :
                    ts.isClassDeclaration(node) ? context.factory.updateClassDeclaration(node, selectDecorator(node.modifiers), node.name, node.typeParameters, node.heritageClauses, node.members):
                    ts.isFunctionDeclaration(node) ? context.factory.updateFunctionDeclaration(node, selectDecorator(node.modifiers), node.asteriskToken | undefined, node.name | undefined, node.typeParameters| undefined, node.parameters, node.type | undefined, node.body | undefined):
                    ts.isVariableDeclaration(node) ? context.factory.updateVariableDeclaration(node, node.name, node.exclamationToken | undefined, node.type | undefined, node.initializer | undefined):
                    ts.isVariableStatement(node) ? context.factory.updateVariableStatement(node, selectDecorator(node.modifiers), node.declarationList):
                    ts.isConstructorDeclaration(node) ? context.factory.updateConstructorDeclaration(node, selectDecorator(node.modifiers), node.parameters, node.body | undefined):
                    ts.isConstructorTypeNode(node) ? context.factory.updateConstructorTypeNode(node, selectDecorator(node.modifiers), node.typeParameters | undefined, node.parameters, node.type):
                    node;
                }
                function selectDecorator(modifierArray){
                    if(modifierArray == undefined) return undefined;
                    for(let i = 0; i < modifierArray.length; i++){
                        if(modifierArray[i].kind == ts.SyntaxKind.Decorator){
                            // modifierArray.splice(i, 1);
                            // posArr.push([modifierArray[i].pos, modifierArray[i].end]);
                            replaceDecoratorsWithSpace(modifierArray[i].pos, modifierArray[i].end);
                            console.log("pos = " + modifierArray[i].pos + "end = " + modifierArray[i].end);
                        }
                    }
                    return modifierArray;
                }
                return replaceDecorators(node);
            }
            return ts.visitNode(rootNode, visit);
        };
    };

    ts.transform(ast, [transformerFactory]);
    // ast = (ts.transform(ast, [transformerFactory])).transformed[0];

    return rawTextArr.join("");
}
// console.log("new_str.length = " + new_str.length);
// fs.writeFile('./message.txt', new_str, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

function parse(code, options){
    code = replaceText(code);
    return tsParse.parse(code, options);
}

// function parse(code, options) {
//     code = replaceText(code);
//     return parseForESLint(code, options).ast;
// }
// Object.assign({parse}, tsParse);
// console.log(
//     {...Object.assign({}, tsParse, {parse})}
// )
module.exports = Object.assign({}, tsParse, {parse});