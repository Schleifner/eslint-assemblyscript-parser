"use strict";
exports.__esModule = true;
var ts = require("typescript");
var filename = "test.ts";
var code = "@aaa\nconst test: number = 1 + 2;";
var sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest);
var transformerFactory = function (context) {
    return function (rootNode) {
        function visit(node) {
            node = ts.visitEachChild(node, visit, context);
            if (ts.isDecorator(node)) {
                return context.factory.createNull();
            }
            else {
                return node;
            }
        }
        return ts.visitNode(rootNode, visit);
    };
};
var transformationResult = ts.transform(sourceFile, [transformerFactory]);
var transformedSourceFile = transformationResult.transformed[0];
var printer = ts.createPrinter();
var result = printer.printNode(ts.EmitHint.Unspecified, transformedSourceFile, undefined);
console.log(result); // const testsuffix: number = 1 + 2;
