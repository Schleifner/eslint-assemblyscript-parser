"use strict";
exports.__esModule = true;
var typescript_1 = require("typescript");
//import {code} from './code.ts';
var code = "";
var sourceFile = (0, typescript_1.createSourceFile)('./code.ts', code, typescript_1.ScriptTarget.Latest, true);
sourceFile.forEachChild(findClass);
function findClass(node) {
    if (node.kind === typescript_1.SyntaxKind.ClassDeclaration) {
        var name_1 = node.name;
        if (name_1 && name_1.text === 'Animal') {
            node.forEachChild(findConstructor);
            return;
        }
    }
    node.forEachChild(findClass);
}
function findConstructor(node) {
    if (node.kind === typescript_1.SyntaxKind.Constructor) {
        printParameters(node);
    }
}
function printParameters(node) {
    node.parameters.forEach(function (parameter) {
        console.log(parameter.name.getText());
    });
}
