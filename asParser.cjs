const tsParse = require("@typescript-eslint/parser");

function parse(code, options) {
    const label = `Parsing file "${options.filePath}"`;
    let newCode = eraseAt(code);
    console.time(label);
    const ast = tsParse.parse(newCode, options);
    console.timeEnd(label);
    return ast;
};

function eraseAt(text) {
    let newCode = '';
    for(let i = 0; i < text.length; i++){
        if(text[i] == '@'){
            while(i < text.length && text[i] != '\n'){
                newCode += ' ';
                i++;
            }// text[i] == \n || i == text.length
            if(i == text.length){
                newCode += ' ';
                break;
            }else{
                newCode += text[i];
            }
        }else{
            newCode += text[i];
        }
    }
    return newCode;
}



module.exports = {parse};