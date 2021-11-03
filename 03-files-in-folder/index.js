const path = require('path');
const fs = require('fs');

const pathFiles = path.join(__dirname, 'secret-folder');
fs.readdir(pathFiles, (err, data) => {
  if (err) throw err;
  for (let i = 0; i < data.length; i++) {
    fs.stat(path.join(pathFiles, data[i]), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(
          `${data[i].slice(
            __filename.lenght,
            data[i].lastIndexOf('.')
          )} - ${data[i].slice(
            data[i].lastIndexOf('.') + 1,
            data[i].length
          )} - ${stats.size}`
        );
      }
    });
  }
});
