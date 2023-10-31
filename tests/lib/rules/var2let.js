// import { noVarRule } from "../../../lib/rules/var2let.js";

// // eslint-disable-next-line node/no-unpublished-import
// import { RuleTester } from "@typescript-eslint/rule-tester";
// // eslint-disable-next-line node/no-unpublished-import
// import { test, suite } from "mocha";
// // eslint-disable-next-line node/no-unpublished-import
// import { AST_NODE_TYPES } from "@typescript-eslint/utils";

// RuleTester.afterAll = () => {};
// //------------------------------------------------------------------------------
// // Tests
// //------------------------------------------------------------------------------
// suite("test as no-var", () => {
//   test("test as no-var", () => {
//     const ruleTester = new RuleTester({
//       "parser": "/home/kkiiim/asParse/eslint-assemblyscript-parser/asParser.cjs",
//       "parserOptions": {
//           "ecmaVersion": "latest",
//           "sourceType": "module"
//       },
//     });
//     ruleTester.run("var2let", noVarRule, {
//       valid: [
//         {
//           code: "@qqq\nlet a = 1\n@qqq\nlet b = 1\n@qqq\nlet c = 1\na = b;\na = c;\nb = a;",
//         },
//       ],

//       invalid: [
//         {
//           code: "@qqq\nvar a = 1\n@qqq\n",
//           errors: [{ messageId: "not-use-var", type: AST_NODE_TYPES.VariableDeclaration }],
//           output: "@qqq\nlet a = 1\n@qqq\n",
//         },
//       ],
//     });
//   });
// });

/**
 * @fileoverview dont use var
 * @author Kim
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/var2let"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: __dirname + "/../../../asParser.cjs",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});
ruleTester.run("var2let", rule, {
  valid: [
    {
      code: "@qqq\nlet a = 1\n@qqq\nlet b = 1\n@qqq\nlet c = 1\na = b;\na = c;\nb = a;",
    },
  ],

  invalid: [
    {
      code: "@qqq\nvar a = 1\n@qqq\n",
      errors: [
        {
          // message: 'do not use var',
          line: 2,
          column: 1,
          messageId: "not-use-var",
          endLine: 2,
          endColumn: 10,
          // fix: { range: [5, 8], text: 'let' }
        },
      ],
      output: "@qqq\nlet a = 1\n@qqq\n",
    },
  ],
});
