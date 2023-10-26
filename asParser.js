import {parse as tsParse} from "@typescript-eslint/parser"

function parse(code, options) {
    const label = `Parsing file "${options.filePath}"`;
    let newCode = eraseAt(code);
    console.time(label);
    const ast = tsParse(newCode, options);
    console.timeEnd(label);
    return ast;
};

function eraseAt(text) {
    var regex = /^@.*$/gm;
    var result = text.replace(regex, "");
    return { text: result };
}

module.exports = { parse };