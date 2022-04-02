const fs = require('fs');
const request = require('request');
const path = require('path');

let imgDownload = async function (uri, filename, callback) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path.join(__dirname, '/../images/' + filename + '-a.png'))) {
      resolve(true)
    } else {
      request.head(uri, async function (err, res, body) {
        request(uri)
          .pipe(
            fs.createWriteStream(
              path.join(__dirname, '/../images/' + filename + '-a.png')
            )
          )
          .on('close', async function () { resolve() } );
      });
    }

  })

};

module.exports = {
  imgDownload,
};
