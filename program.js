/*
  console.log("HELLO WORLD");
*/

/*

Baby Steps

let sum = 0;
for (let i = 2; i < process.argv.length; i++) {
  sum += Number(process.argv[i]);
}
console.log(sum);
*/

/*


My First I/O

const fs = require("fs");
let buf = fs.readFileSync(process.argv[2]);
var str = buf.toString().split("\n");
let lines = str.length - 1;
console.log(lines);

*/

/*

ASYNC I/O

const fs = require("fs");
fs.readFile(process.argv[2], (err, fileContents) => {
  if (err) {
    throw err;
  }
  let lineSum = fileContents.toString().split("\n").length - 1;
  console.log(lineSum);
});

*/

const fs = require("fs");
fs.readdir(process.argv[2], (err, list) => {
  if (err) {
    return err;
  }
  for (var i = 0; i < list.length; i++) {
    if (list[i].split(".")[1] === process.argv[3]) {
      console.log(list[i]);
    }
  }
});
