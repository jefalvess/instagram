const fs = require('fs');
const request = require('request');
const path = require('path');

let imgDownload = async function (uri, filename, callback) {

  if (fs.existsSync(path.join(__dirname, '/../images/' + filename + '.png'))) {
    console.log('arquivo existe')
  } else {


    await request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(path.join(__dirname, '/../images/' + filename + '.png'))).on('close', callback);
    });
  }
};


module.exports = {
  imgDownload,
};