const fs = require('fs');
const path = require('path');
const url = path.join(__dirname, 'text.txt');

fs.readFile(
  path.join(url), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
