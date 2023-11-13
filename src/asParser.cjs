"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require("fs");
const tsParse = require(
  __dirname + "/../node_modules/@typescript-eslint/parser/dist/parser.js",
);
const ts = require("typescript");

function replaceTextWithSplit(code, DecoratorPositionList) {
  var transformedCode = code.split("");
  for (
    let listIndex = 0;
    listIndex < DecoratorPositionList.length;
    listIndex++
  ) {
    for (
      let curPos = DecoratorPositionList[listIndex][0];
      curPos <= DecoratorPositionList[listIndex][1];
      curPos++
    ) {
      if (code[curPos] == "\n") {
        transformedCode[curPos] = "\n";
      } else {
        transformedCode[curPos] = " ";
      }
    }
  }
  return transformedCode.join("");
}

function replaceTextWithArrPush(code, DecoratorPositionList) {
  var transformedCode = new Array();
  if (DecoratorPositionList.length == 0) return code;
  var transformedPos = 0;
  for (
    let listIndex = 0;
    listIndex < DecoratorPositionList.length;
    listIndex++
  ) {
    var left = DecoratorPositionList[listIndex][0];
    var right = DecoratorPositionList[listIndex][1];
    transformedCode.push(code.slice(transformedPos, left));
    transformedCode.push(getSpaces(code, left, right));
    transformedPos = right + 1;
  }
  if (transformedPos <= code.length) {
    transformedCode.push(code.slice(transformedPos, code.length));
  }
  return transformedCode.join("");
}

function getSpaces(code, left, right) {
  var spaces = new Array();
  while (left <= right) {
    if (code[left++] == "\n") spaces.push("\n");
    else spaces.push(" ");
  }
  return spaces.join("");
}

function getDecoratorPosition(code, file) {
  var DecoratorPositionList = new Array();
  const ast = ts.createSourceFile(
    __dirname + "/../tests/testfile/" + file,
    code,
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true,
  );

  const transformerFactory = (context) => {
    return (rootNode) => {
      function visit(node) {
        node = ts.visitEachChild(node, visit, context);
        function replaceDecorators(node) {
          selectDecorator(node.modifiers);
          return node;
          // if (ts.isParameter(node)) {
          //   return context.factory.updateParameterDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.dotDotDotToken,
          //     node.name,
          //     node.questionToken,
          //     node.type,
          //     node.initializer,
          //   );
          // } else if (ts.isPropertyDeclaration(node)) {
          //   return context.factory.updatePropertyDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.name,
          //     node.questionToken ?? node.exclamationToken,
          //     node.type,
          //     node.initializer,
          //   );
          // } else if (ts.isMethodDeclaration(node)) {
          //   return context.factory.updateMethodDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.asteriskToken,
          //     node.name,
          //     node.questionToken,
          //     node.typeParameters,
          //     node.parameters,
          //     node.type,
          //     node.body,
          //   );
          // } else if (ts.isGetAccessorDeclaration(node)) {
          //   return context.factory.updateGetAccessorDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.name,
          //     node.parameters,
          //     node.type,
          //     node.body,
          //   );
          // } else if (ts.isSetAccessorDeclaration(node)) {
          //   return context.factory.updateSetAccessorDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.name,
          //     node.parameters,
          //     node.body,
          //   );
          // } else if (ts.isClassExpression(node)) {
          //   return context.factory.updateClassExpression(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.name,
          //     node.typeParameters,
          //     node.heritageClauses,
          //     node.members,
          //   );
          // } else if (ts.isClassDeclaration(node)) {
          //   return context.factory.updateClassDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.name,
          //     node.typeParameters,
          //     node.heritageClauses,
          //     node.members,
          //   );
          // } else if (ts.isFunctionDeclaration(node)) {
          //   return context.factory.updateFunctionDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.asteriskToken | undefined,
          //     node.name | undefined,
          //     node.typeParameters | undefined,
          //     node.parameters,
          //     node.type | undefined,
          //     node.body | undefined,
          //   );
          // } else if (ts.isVariableDeclaration(node)) {
          //   return context.factory.updateVariableDeclaration(
          //     node,
          //     node.name,
          //     node.exclamationToken | undefined,
          //     node.type | undefined,
          //     node.initializer | undefined,
          //   );
          // } else if (ts.isVariableStatement(node)) {
          //   return context.factory.updateVariableStatement(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.declarationList,
          //   );
          // } else if (ts.isConstructorDeclaration(node)) {
          //   return context.factory.updateConstructorDeclaration(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.parameters,
          //     node.body | undefined,
          //   );
          // } else if (ts.isConstructorTypeNode(node)) {
          //   return context.factory.updateConstructorTypeNode(
          //     node,
          //     selectDecorator(node.modifiers),
          //     node.typeParameters | undefined,
          //     node.parameters,
          //     node.type,
          //   );
          // } else {
          //   return node;
          // }
        }
        function selectDecorator(modifierArray) {
          if (modifierArray == undefined) return undefined;
          for (let i = 0; i < modifierArray.length; i++) {
            if (modifierArray[i].kind == ts.SyntaxKind.Decorator) {
              // replaceDecoratorsWithSpace(modifierArray[i].pos, modifierArray[i].end);
              DecoratorPositionList.push([
                modifierArray[i].pos,
                modifierArray[i].end,
              ]);
              // console.log("pos = " + modifierArray[i].pos + " end = " + modifierArray[i].end);
            }
          }
          // return modifierArray;
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

  // var new_str = rawTextArr.join("");
  /**
   * show newText if you need
   */
  // fs.writeFile('./message.txt', new_str, (err) => {
  //     if (err) throw err;
  //     console.log('The file has been saved!');
  // });
  return DecoratorPositionList;
}

function timeTest(code, DecoratorPositionList) {
  console.time("replaceTextWithSplit");
  for (let i = 0; i < 100000; i++) {
    replaceTextWithSplit(code, DecoratorPositionList);
  }
  console.timeEnd("replaceTextWithSplit");

  console.time("replaceTextWithArrPush");
  for (let i = 0; i < 100000; i++) {
    replaceTextWithArrPush(code, DecoratorPositionList);
  }
  console.timeEnd("replaceTextWithArrPush");
  console.log("");
}

function parse(code, file, options) {
  const DecoratorPos = getDecoratorPosition(code, file);
  timeTest(code, DecoratorPos);
  return tsParse.parse(replaceTextWithSplit(code, DecoratorPos), options);
  //return tsParse.parse(code, options);
}

// Overriding parse in tsParse.
module.exports = Object.assign({}, tsParse, { parse });
