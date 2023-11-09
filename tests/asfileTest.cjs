/**
 * in this test file, The asParser will test multiple files, and if it executes smoothly, 
 * the latter stage of the tsParser accepts that no errors were reported, 
 * indicating that the asParser handled the problem correctly
 */
const fs = require('fs');
const chai = require('chai');
const {parse} = require("../src/asParser.cjs");
const { test, suite } = require("mocha");


function chaiTest(file){
  chai.expect(function () {
    testFile(file);
  }).to.not.throw();
}

function testFile(file){
  fs.readFile(__dirname + file, 'utf8', function (error, data) {
    if (error) {
      console.error("Failed to load testfile:", error);
      reject(error);
      return;
    }
    parse(data, {
      range: true,
    });
  })
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
suite("asparse", () => {
  test("asparse", async () => {
    chaiTest('/testfile/exports-lazy.ts');
    chaiTest('/testfile/external.ts');
    // chaiTest('/testfile/function-inline-regressions.ts');
    // chaiTest('/testfile/operator-overloading.ts');
    // chaiTest('/testfile/resolve-binary.ts');
    // chaiTest('/testfile/unsafe.ts');
  });
});