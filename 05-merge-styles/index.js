const fs = require('fs');
const path = require('path');

const folderStyles = path.join(__dirname, 'styles');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
  if (err) throw err;
});

fs.readdir(folderStyles, (err, data) => {
  if (err) throw err;

  for (let i = 0; i < data.length; i++) {
    fs.stat(path.join(folderStyles, data[i]), (err, stats) => {
      if (err) throw err;
      let exert = data[i].slice(data[i].lastIndexOf('.') + 1, data[i].length);
      if (exert == 'css' && stats.isFile()) {
        fs.readFile(path.join(folderStyles, data[i]), 'utf-8', (err, info) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            info,
            (err) => {
              if (err) throw err;
            }
          );
        });
      }
    });
  }
});
