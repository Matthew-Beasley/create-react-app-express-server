const fs = require('fs');

const writeJSON = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    })
  })
}


const readJSON = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (data) {
        try {
          resolve(JSON.parse(data));
        }
        catch (ex) {
          reject(ex);
        }
      }
      else {
        reject(err);
      }
    })
  })
}

module.exports = { readJSON, writeJSON };