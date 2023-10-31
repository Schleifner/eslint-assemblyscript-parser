const tsParse = require("@typescript-eslint/parser");

function parse(code, options) {
  const label = `Parsing file "${options.filePath}"`;
  //let myParser = new asParser();
  let newCode = eraseAt(code);
  console.time(label);
  const ast = tsParse.parse(newCode, options);
  console.timeEnd(label);
  return ast;
}

// arr.push O(1)
// str.contact/+ O(n)
// str.join only once merge from arr
function eraseAt(text) {
  var arr = new Array();
  for (let i = 0; i < text.length; i++) {
    if (text[i] == "@") {
      while (i < text.length && text[i] != "\n" && text[i] != " ") {
        arr.push(" ");
        i++;
      } // text[i] == \n || i == text.length
      if (i == text.length) {
        arr.push(" ");
        break;
      } else {
        arr.push(text[i]);
      }
    } else {
      arr.push(text[i]);
    }
  }
  let newCode = arr.join("");
  return newCode;
}
module.exports = { parse };
