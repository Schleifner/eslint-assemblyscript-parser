/**
 * @fileoverview var2let
 * @author Kim
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules

module.exports = {
    rules: requireIndex(__dirname + "/rules"),
    configs: {
        recommended: {
            plugins: ['no-var'],
            rules: {
                'no-var/var2let': ["error"]
            }
        }
    },
}


