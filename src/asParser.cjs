const tsParse = require("@typescript-eslint/parser");
const Utils = require("../../@typescript-eslint/typescript-estree/dist/node-utils.js");

function parse(code, options) {
  Utils.nodeCanBeDecorated = ()=>{return true};
  return tsParse.parse(code, options);
}

module.exports = { parse };