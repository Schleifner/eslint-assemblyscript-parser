const tsParse = require("@typescript-eslint/parser");

function parse(code, options) {
  const label = `Parsing file "${options.filePath}"`;
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
// function eraseAt(text) {
//     var arr = new Array();
//     let lastIndex = -1;
//     // The part @ the beginning is a very small number
//     for(let i = 0; i < text.length; i++){
//         if(text[i] == '@'){
//             // code before, merge to arr
//             if(lastIndex != -1){
//                 arr.push(text.slice(lastIndex+1,i-1))
//             }else{
//                 arr.push(text.slice(0,i-1))
//             }
//             while(i < text.length && text[i] != '\n' && text[i] != ' '){
//                 arr.push(' ');
//                 i++;
//             }// text[i] == \n || i == text.length
//             if(i == text.length){
//                 arr.push(' ');
//                 break;
//             }else{
//                 arr.push(text[i]);
//             }
//             lastIndex = i;
//         }
//     }
//     let newCode = arr.join('');
//     return newCode;
// }

module.exports = { parse };
