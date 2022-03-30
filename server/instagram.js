const Instagram = require('instagram-web-api');
// const username = 'Dc544060';
// const password = 'popo8010'

const checarLogin = async function (username, password) {
    console.log(username, password);
    let client = await new Instagram({ username, password });
    let response = await client.login();
    return response;
  };


const ganharSeguidores = async function (username, password, userId) {
    let client = await new Instagram({ username, password });
    await client.login();
    let seguir = await client.follow({ userId: userId })
    return seguir;
};


module.exports = {
  checarLogin,
  ganharSeguidores,
};
