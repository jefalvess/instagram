const fs = require('fs');
const request = require('request');
const path = require('path');

let imgDownload = async function (uri, filename) {
  try {
    if (
      fs.existsSync(path.join(__dirname, '/../images/' + filename + '.png'))
    ) {
      console.log('arquivo existe');
    } else {
      await new Promise((resolve) =>
        request(uri)
          .pipe(
            fs.createWriteStream(
              path.join(__dirname, '/../images/' + filename + '.png')
            )
          )
          .on('finish', resolve)
      );

      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  imgDownload,
};
