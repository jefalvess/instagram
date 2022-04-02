const fs = require('fs');
const request = require('request');
const path = require('path');

let imgDownload = async function (uri, filename, callback) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path.join(__dirname, '/../uploads/' + filename + '-a.png'))) {
      resolve();
    } else {
      request.head(uri, async function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(path.join(__dirname, '/../uploads/' + filename + '-a.png'))).on('close', function () {
          resolve(body);
        })
      });
    }
  });
};


module.exports = {
  imgDownload,
};