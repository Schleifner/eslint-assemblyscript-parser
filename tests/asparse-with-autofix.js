/**
 * @fileoverview dont use var
 * @author Kim
 */
"use strict";

/**
 * in this test file, use ruleTester to assure the autofix functionality is working.
 * in other words, asParser won't conflict with eslint-RULES
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../node_modules/eslint/lib/rules/quotes.js"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: __dirname + "/../src/asParser.cjs",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});
ruleTester.run("quotes", rule, {
  valid: [
    {
      code: '@qqq\nlet b = "abc";\n@zxc b = "123";',
    },
  ],

  invalid: [
    {
      code: "@qqq\nlet b = 'abc';\n@zxc b = \"123\";",
      errors: [
        {
          line: 2,
          column: 9,
          messageId: "wrongQuotes",
          endLine: 2,
          endColumn: 14,
        },
      ],
      output: '@qqq\nlet b = "abc";\n@zxc b = "123";',
    }
  ],
});
