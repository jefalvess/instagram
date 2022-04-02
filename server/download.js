const fs = require('fs');
const request = require('request');
const path = require('path');

let imgDownload = async function (uri, filename) {
  await new Promise((resolve) => {
    if (
      fs.existsSync(path.join(__dirname, '/../images/' + filename + '.png'))
    ) {
      console.log('arquivo existe');
      resolve(true);
    } else {
      request.head(uri, async function (err, res, body) {
        request(uri)
          .pipe(
            await fs.createWriteStream(
              path.join(__dirname, '/../images/' + filename + '.png')
            )
          )
          .on('close', resolve);
      });
    }
  });
};

module.exports = {
  imgDownload,
};
