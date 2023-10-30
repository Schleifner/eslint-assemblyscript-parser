/**
 * @fileoverview dont use var
 * @author Kim
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "dont use var",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: { "not-use-var": "do not use var" }
  },

  create(context) {
    const sourceCode = context.sourceCode;
    // const commentSet = context.sourceCode.getAllComments();
    // console.log(commentSet[0].loc, '\n', commentSet[1].loc, '\n', commentSet[2].loc)
    
    return {
      VariableDeclaration(node){
        if(node.kind == 'var'){
          context.report({
            node,
            data: { type: 'var' },
            messageId: 'not-use-var',
            fix(fixer){
              const varToken = sourceCode.getFirstToken(node, {filter: t => t.value == 'var'})
              console.log(varToken)
              return fixer.replaceText(varToken, 'let')
            }
          })
        }
      }
    };
  },
};
