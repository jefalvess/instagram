const Instagram = require('instagram-web-api');
// const username = 'Dc544060';
// const password = 'popo8010'

const checarLogin = async function (username, password) {
    let client = await new Instagram({ username, password });
    let responseInstagram = await client.login();
    let info = await client.getUserByUsername({ username })
    let timeline = await client.getPhotosByUsername({ username })
    return { responseInstagram, info, timeline  } ;
  };


  const ganharSeguidores = async function (username, password, userId) {
    let client = await new Instagram({ username, password });
    await client.login();
    let seguir = await client.follow({ userId: userId })
    return seguir;
};


const pegarInfo = async function (username, password) {
  let client = new Instagram({ username, password });
  await client.login();
  let timeline = await client.getPhotosByUsername({ username })
  let info = await client.getUserByUsername({ username })

  return { info, timeline } 

};


module.exports = {
  checarLogin,
  ganharSeguidores,
  pegarInfo
};
