const fs = require('fs');
const path = require('path');

const folderName = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');

function callback(err) {
  if (err) throw err;
}

fs.mkdir(folderName, { recursive: true }, callback);
fs.readdir(folderPath, (err, data) => {
  if (err) throw err;
  for (let i = 0; i < data.length; i++) {
    fs.copyFile(
      `${path.join(folderPath, data[i])}`,
      `${path.join(folderName, data[i])}`,
      callback
    );
  }
  console.log('Copy DONE!');
});
