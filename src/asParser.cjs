"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { default: exp } = require("constants");
const fs = require("fs");
const tsParse = require(__dirname + "/../node_modules/@typescript-eslint/parser/dist/parser.js");
const ts = require("typescript");

function replaceText(code, file){
    var rawTextArr = code.split("");
    const ast = ts.createSourceFile(
        __dirname + "/../tests/" + file,
        code,
        ts.ScriptTarget.ES2015,
        /*setParentNodes */ true
    );

    function replaceDecoratorsWithSpace(pos, end){
        for(let i = pos; i <= end; i++){
            if(code[i] == "\n"){
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
                    if(ts.isParameter(node)){
                        return context.factory.updateParameterDeclaration(node, selectDecorator(node.modifiers), node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer);
                    }else if(ts.isPropertyDeclaration(node)){
                        return context.factory.updatePropertyDeclaration(node, selectDecorator(node.modifiers), node.name, node.questionToken ?? node.exclamationToken, node.type, node.initializer);
                    }else if(ts.isMethodDeclaration(node)){
                        return context.factory.updateMethodDeclaration(node, selectDecorator(node.modifiers), node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body);
                    }else if(ts.isGetAccessorDeclaration(node)){
                        return context.factory.updateGetAccessorDeclaration(node, selectDecorator(node.modifiers), node.name, node.parameters, node.type, node.body);
                    }else if(ts.isSetAccessorDeclaration(node)){
                        return context.factory.updateSetAccessorDeclaration(node, selectDecorator(node.modifiers), node.name, node.parameters, node.body);
                    }else if(ts.isClassExpression(node)){
                        return context.factory.updateClassExpression(node, selectDecorator(node.modifiers), node.name, node.typeParameters, node.heritageClauses, node.members);
                    }else if(ts.isClassDeclaration(node)){
                        return context.factory.updateClassDeclaration(node, selectDecorator(node.modifiers), node.name, node.typeParameters, node.heritageClauses, node.members);
                    }else if(ts.isFunctionDeclaration(node)){
                        return context.factory.updateFunctionDeclaration(node, selectDecorator(node.modifiers), node.asteriskToken | undefined, node.name | undefined, node.typeParameters| undefined, node.parameters, node.type | undefined, node.body | undefined);
                    }else if(ts.isVariableDeclaration(node)){
                        return context.factory.updateVariableDeclaration(node, node.name, node.exclamationToken | undefined, node.type | undefined, node.initializer | undefined);
                    }else if(ts.isVariableStatement(node)){
                        return context.factory.updateVariableStatement(node, selectDecorator(node.modifiers), node.declarationList);
                    }else if(ts.isConstructorDeclaration(node)){
                        return context.factory.updateConstructorDeclaration(node, selectDecorator(node.modifiers), node.parameters, node.body | undefined);
                    }else if(ts.isConstructorTypeNode(node) ){
                        return context.factory.updateConstructorTypeNode(node, selectDecorator(node.modifiers), node.typeParameters | undefined, node.parameters, node.type);
                    }else{
                        return node;
                    }
                }
                function selectDecorator(modifierArray){
                    if(modifierArray == undefined) return undefined;
                    for(let i = 0; i < modifierArray.length; i++){
                        if(modifierArray[i].kind == ts.SyntaxKind.Decorator){
                            replaceDecoratorsWithSpace(modifierArray[i].pos, modifierArray[i].end);
                            // console.log("pos = " + modifierArray[i].pos + " end = " + modifierArray[i].end);
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
    //ast = (ts.transform(ast, [transformerFactory])).transformed[0];
    /**
     * but in this case, we dont need transformed ast,
     * only rawTextArr-Changing is necessary
     */

    var new_str = rawTextArr.join("");
    /**
     * show newText if you need
     */
    // fs.writeFile('./message.txt', new_str, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // });
    return new_str;
}
function timeTest(code, file){
    console.time("replaceText");
    for(let i = 0; i < 1000; i++){
       replaceText(code, file); 
    }
    console.timeEnd("replaceText");
}
function parse(code, file, options){
    //timeTest(code, file);
    var rawTextArr = replaceText(code, file);
    return tsParse.parse(rawTextArr, options);
}

// Overriding parse in tsParse.
module.exports = Object.assign({}, tsParse, {parse});