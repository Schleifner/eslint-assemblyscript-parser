/**
 * in this test file, The asParser will test multiple files, and if it executes smoothly, 
 * the latter stage of the tsParser accepts that no errors were reported, 
 * indicating that the asParser handled the problem correctly
 */
const fs = require('fs');
const chai = require('chai');
const {parse} = require("../src/asParser.cjs");
const { test, suite } = require("mocha");

function testAllFiles(files){
  for(let i = 0; i < files.length; i++){
    chaiTest(files[i]);
  }
}

function chaiTest(file){
  chai.expect(function () {
    testFile(file);
  }).to.not.throw();
}

function testFile(file){
  fs.readFile(__dirname + "/testfile/" + file, 'utf8', function (error, data) {
    if (error) {
      console.error("Failed to load testfile:", error);
      reject(error);
      return;
    }
    parse(data, file, {
      range: true,
    });
  })
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
suite("asparse", () => {
  test("asparse", async () => {
    const folderPath = __dirname + "/testfile";
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      testAllFiles(files);
    });
  });
});