const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const assetsFirst = path.join(__dirname, 'assets');
const assetsProject = path.join(__dirname, 'project-dist', 'assets');
const styleFolder = path.join(__dirname, 'styles');
const styleProject = path.join(projectDist, 'style.css');
const template = path.join(__dirname, 'template.html');
const indexProject = path.join(projectDist, 'index.html');
const components = path.join(__dirname, 'components');

function callback(err) {
  if (err) throw err;
}

fs.mkdir(projectDist, { recursive: true }, callback);
fs.mkdir(path.join(projectDist, 'assets'), { recursive: true }, callback);
fs.open(path.join(projectDist, 'index.html'), 'w', callback);
fs.open(path.join(projectDist, 'style.css'), 'w', callback);

fs.readdir(assetsFirst, (err, data) => {
  if (err) throw err;
  for (let i = 0; i < data.length; i++) {
    fs.mkdir(path.join(assetsProject, data[i]), { recursive: true }, callback);
    fs.readdir(path.join(assetsFirst, data[i]), (err, file) => {
      if (err) throw err;
      for (let j = 0; j < file.length; j++) {
        fs.copyFile(
          `${path.join(assetsFirst, data[i], file[j])}`,
          `${path.join(assetsProject, data[i], file[j])}`,
          callback
        );
      }
    });
  }
});

fs.readdir(styleFolder, (err, file) => {
  if (err) throw err;
  for (let i = 0; i < file.length; i++) {
    fs.readFile(path.join(styleFolder, file[i]), (err, data) => {
      if (err) throw err;
      fs.appendFile(styleProject, data, callback);
    });
  }
});

const stream = new fs.ReadStream(template, 'utf-8');

stream.on('readable', () => {
  let data = stream.read();
  const index = fs.createReadStream(indexProject, 'utf-8');
  if (data != null) {
    fs.readdir(components, (err, file) => {
      if (err) throw err;
      for (let i = 0; i < file.length; i++) {
        let name = `{{${file[i].slice(0, file[i].lastIndexOf('.'))}}}`;
        let regex = new RegExp(name, 'gi');
        fs.readFile(path.join(components, file[i]), 'utf-8', (err, comp) => {
          if (err) throw err;
          data = data.replace(regex, comp);
          fs.writeFile(indexProject, data, callback);
        });
      }
    });
  }
});
