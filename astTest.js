const fs = require('fs');
const ts = require('typescript'); 

fs.readFile(__dirname + '/../testfile/exports-lazy.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  ts.create

})