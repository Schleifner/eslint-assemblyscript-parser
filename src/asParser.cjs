"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astConverter = void 0;
const tsParse = require("@typescript-eslint/parser");
const tsTree = require("../node_modules/@typescript-eslint/typescript-estree/dist/ast-converter.js");
const ts = require("typescript");
const convert_1 = require("../node_modules/@typescript-eslint/typescript-estree/dist/convert");
const convert_comments_1 = require("../node_modules/@typescript-eslint/typescript-estree/dist/convert-comments");
const node_utils_1 = require("../node_modules/@typescript-eslint/typescript-estree/dist/node-utils");
const simple_traverse_1 = require("../node_modules/@typescript-eslint/typescript-estree/dist/simple-traverse");


// return context.factory.baseFactory.createBaseNode(170);


// tsTree.astConverter = (ast, parseSettings, shouldPreserveNodeMaps) => {
//   // console.log(ast);
//   const { parseDiagnostics } = ast;
//   if (parseDiagnostics.length) {
//       throw (0, convert_1.convertError)(parseDiagnostics[0]);
//   }
//   const transformerFactory = (context) => {
//     return (rootNode) => {
//         function visit(node) {
//             node = ts.visitEachChild(node, visit, context);

//             if (ts.isDecorator(node)) {
//                 return  undefined;
//             } else {
//                 return node;
//             }
//         }
//         return ts.visitNode(rootNode, visit);
//     };
//   };
//   // ts.getDecorators = (node) => {
//   //   return undefined;
//   // }
//   ast = ts.transform(
//     ast, [transformerFactory]
//   ).transformed[0];

//   // console.log(ast);

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

module.exports = { ...tsParse };
