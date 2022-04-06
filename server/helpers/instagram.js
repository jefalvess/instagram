async function checarLogin(username, password) {
  try {
    let { IgApiClient } = require('instagram-private-api');
    let ig = new IgApiClient();
    await ig.state.generateDevice(username);
    // await ig.simulate.preLoginFlow();
    let loggedInUser = await ig.account.login(username, password);
    let infoPerfil = await ig.user.info(loggedInUser.pk);

    let info = {
      profile_pic_url_hd: loggedInUser.profile_pic_url,
      full_name: loggedInUser.full_name,
      userId: loggedInUser.pk,
      biography: infoPerfil.biography,
      edge_followed_by: { count: infoPerfil.follower_count },
      edge_follow: { count: infoPerfil.following_count },
    };

    let userFeed = await ig.feed.user(loggedInUser.pk);
    let timeline = await userFeed.items();

    let timelineArray = [];
    for (let i = 0; i < timeline.length; i++) {
      timelineArray.push({
        img: timeline[i].image_versions2.candidates[0].url,
        likes: timeline[i].like_count,
        id: timeline[i].pk,
      });
    }

    let responseInstagram = { authenticated: true, userId: loggedInUser.pk };

    return { responseInstagram, info, timelineArray };
  } catch (e) {
    let mensagemErro = '';
    let senhaErrada = false;

    if (e.message.match(/check your username/)) {
      senhaErrada = true;
      mensagemErro =
        'Nome de usuario ou senha estao incorretos por favor verifique e tente novamente';
    }

    if (e.message.match(/password you entered/)) {
      senhaErrada = true;
      mensagemErro =
        'Nome de usuario ou senha estao incorretos por favor verifique e tente novamente';
    }

    if (e.message.match(/challenge_required/)) {
      mensagemErro = 'Conta bloqueada veja como desbloquear';
    }

    let responseInstagram = {
      authenticated: false,
      senhaErrada: senhaErrada,
      mensagem: mensagemErro,
    };

    return { responseInstagram };
  }
}

async function seguirPessoas(username, password, listaParaSeguir) {

  let { IgApiClient } = require('instagram-private-api');
  let ig = new IgApiClient();
  await ig.state.generateDevice(username);
  await ig.account.login(username, password);
  for (let i = 0; i < listaParaSeguir.length; i++) {
    let userId = listaParaSeguir[i];
    await ig.friendship.create(userId);
    await sleep(2000);
  }
}

async function ganharLikes(username, password, mediaId) {
  try {
    let { IgApiClient } = require('instagram-private-api');
    let { sample } = require('lodash');
    let ig = new IgApiClient();
    await ig.state.generateDevice(username);
    // await ig.simulate.preLoginFlow();
    let loggedInUser = await ig.account.login(username, password);

    await ig.media.like({
      mediaId: sample([mediaId]),
      moduleInfo: {
        module_name: 'profile',
        user_id: loggedInUser.pk,
        username: loggedInUser.username,
      },
      d: sample([0, 1]),
    });

    return true;
  } catch (e) {
    return e;
  }
}

async function ganharComentario(username, password, mediaId, text) {
  try {
    let { IgApiClient } = require('instagram-private-api');
    let ig = new IgApiClient();
    await ig.state.generateDevice(username);
    // await ig.simulate.preLoginFlow();
    await ig.account.login(username, password);

    await ig.media.comment({
      module_name: 'profile',
      mediaId: mediaId,
      text: text,
    });

    return true;
  } catch (e) {
    return e;
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  checarLogin,
  seguirPessoas,
  ganharLikes,
  ganharComentario,
};
