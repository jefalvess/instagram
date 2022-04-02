const fs = require('fs');
const request = require('request');
const path = require('path');

let imgDownload = async function (uri, filename, callback) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path.join(__dirname, '/../images/' + filename + '.png'))) {
      resolve(true)
    } else {
      request.head(uri, async function (err, res, body) {
        request(uri)
          .pipe(
            fs.createWriteStream(
              path.join(__dirname, '/../images/' + filename + '.png')
            )
          )
          .on('close', resolve(async function (e) { console.log(e) }));
      });
    }

  })

};

module.exports = {
  imgDownload,
};
