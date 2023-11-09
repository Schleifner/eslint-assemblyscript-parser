"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astConverter = void 0;
const convert_1 = require("./convert");
const convert_comments_1 = require("./convert-comments");
const node_utils_1 = require("./node-utils");
const simple_traverse_1 = require("./simple-traverse");

const ts = require("typescript");
function astConverter(ast, parseSettings, shouldPreserveNodeMaps) {

    const { parseDiagnostics } = ast;
    if (parseDiagnostics.length) {
        throw (0, convert_1.convertError)(parseDiagnostics[0]);
    }

    const transformerFactory = (context) => {
        return (rootNode) => {
            function visit(node) {
                node = ts.visitEachChild(node, visit, context);
                function replaceDecorators(node){
                    // return ts.isParameter(node) ? context.factory.updateParameterDeclaration(node, selectDecorator(node.modifiers), node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer) :
                    // ts.isPropertyDeclaration(node) ? context.factory.updatePropertyDeclaration(node, selectDecorator(node.modifiers), node.name, node.questionToken ?? node.exclamationToken, node.type, node.initializer) :
                    // ts.isMethodDeclaration(node) ? context.factory.updateMethodDeclaration(node, selectDecorator(node.modifiers), node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body) :
                    // ts.isGetAccessorDeclaration(node) ? context.factory.updateGetAccessorDeclaration(node, selectDecorator(node.modifiers), node.name, node.parameters, node.type, node.body) :
                    // ts.isSetAccessorDeclaration(node) ? context.factory.updateSetAccessorDeclaration(node, selectDecorator(node.modifiers), node.name, node.parameters, node.body) :
                    // ts.isClassExpression(node) ? context.factory.updateClassExpression(node, selectDecorator(node.modifiers), node.name, node.typeParameters, node.heritageClauses, node.members) :
                    // ts.isClassDeclaration(node) ? context.factory.updateClassDeclaration(node, selectDecorator(node.modifiers), node.name, node.typeParameters, node.heritageClauses, node.members):
                    return ts.isFunctionDeclaration(node) ? context.factory.updateFunctionDeclaration(node, selectDecorator(node.modifiers), node.asteriskToken | undefined, node.name | undefined, node.typeParameters| undefined, node.parameters, node.type | undefined, node.body | undefined):
                    // ts.isVariableDeclaration(node) ? context.factory.updateVariableDeclaration(node, node.name, node.exclamationToken | undefined, node.type | undefined, node.initializer | undefined):
                    // ts.isVariableStatement(node) ? context.factory.updateVariableStatement(node, selectDecorator(node.modifiers), node.declarationList):
                    // ts.isConstructorDeclaration(node) ? context.factory.updateConstructorDeclaration(node, selectDecorator(node.modifiers), node.parameters, node.body | undefined):
                    // ts.isConstructorTypeNode(node) ? context.factory.updateConstructorTypeNode(node, selectDecorator(node.modifiers), node.typeParameters | undefined, node.parameters, node.type):
                    node;
                }
                function selectDecorator(modifierArray){
                    if(modifierArray == undefined) return undefined;
                    for(let i = 0; i < modifierArray.length; i++){
                        if(modifierArray[i].kind == ts.SyntaxKind.Decorator){
                            modifierArray.splice(i, 1);
                        }
                    }
                    return modifierArray;
                }
                // function selectDecorator(node){
                //     if(node.modifiers == undefined) return undefined;
                //     const len = node.modifiers.length;
                //     var myarr = new Array();
                //     for(let i = 0; i < len; i++){
                //         if(node.modifiers[i].kind != ts.SyntaxKind.Decorator){
                //             myarr.push(node.modifiers[i]);
                //         }
                //     }
                //     return ts.factory.createModifiersFromModifierFlags(myarr);
                // }
                return replaceDecorators(node);
            }
            return ts.visitNode(rootNode, visit);
        };
    };
    ast = (ts.transform(ast, [transformerFactory])).transformed[0];
    
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
                    delete node.range;
                }
                if (!parseSettings.loc) {
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
exports.astConverter = astConverter;
//# sourceMappingURL=ast-converter.js.map