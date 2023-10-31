/**
 * in this test file, The asParser will test multiple files, and if it executes smoothly, 
 * the latter stage of the tsParser accepts that no errors were reported, 
 * indicating that the asParser handled the problem correctly
 */
const fs = require('fs');
const {parse} = require("../src/asParser.cjs")

fs.readFile(__dirname + '/../testfile/exports-lazy.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  parse(data);
  console.log("pass testfile/exports-lazy")
})

fs.readFile(__dirname + '/../testfile/external.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  parse(data);
  console.log("pass testfile/external")
})

fs.readFile(__dirname + '/../testfile/function-inline-regressions.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  parse(data, {
    range: true,
  });
  console.log("pass testfile/function-inline-regressions")
})

fs.readFile(__dirname + '/../testfile/operator-overloading.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  parse(data, {
    range: true,
  });
  console.log("pass testfile/operator-overloading")
})

fs.readFile(__dirname + '/../testfile/resolve-binary.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  parse(data, {
    range: true,
  });
  console.log("pass testfile/resolve-binary")
})

fs.readFile(__dirname + '/../testfile/unsafe.ts', 'utf8', function (error, data) {
  if (error) {
    console.error("Failed to load testfile:", error);
    reject(error);
    return;
  }
  parse(data);
  console.log("pass testfile/unsafe")
})