const tsParse = require("@typescript-eslint/parser");
const Utils = require("../node_modules/@typescript-eslint/typescript-estree/dist/node-utils.js");

Utils.nodeCanBeDecorated = () => {
  return true;
};

module.exports = { ...tsParse };
