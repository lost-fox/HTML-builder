const fs = require('fs');
const path = require('path');
const readline = require('readline');

const { stdin: input, stdout: output } = require('process');

const pathText = path.join(__dirname, 'notes.txt');
let text = fs.createWriteStream(pathText, '');
const rl = readline.createInterface({ input, output });

rl.write('Hello! Write text... \n');

rl.on('line', (stdin) => {
  if (stdin == 'exit') {
    rl.close();
  } else {
    text.write(stdin + '\n');
  }
});

rl.on('close', () => {
  console.log('Bye!');
});
