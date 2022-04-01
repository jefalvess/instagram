const { IgApiClient } = require('instagram-private-api');
const { sample } = require('lodash');
const ig = new IgApiClient();

const checarLogin = async function (username, password) {
  try {
    ig.state.generateDevice(username);
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(username, password);
    let infoPerfil = await ig.user.info(loggedInUser.pk);

    let info = {
      profile_pic_url_hd: loggedInUser.profile_pic_url,
      full_name: loggedInUser.full_name,
      userId: loggedInUser.pk,
      biography: infoPerfil.biography,
      edge_followed_by: { count: infoPerfil.follower_count },
      edge_follow: { count: infoPerfil.following_count },
    };

    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    // Create UserFeed instance to get loggedInUser's posts
    const userFeed = ig.feed.user(loggedInUser.pk);
    const timeline = await userFeed.items();

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
  } catch {
    let responseInstagram = { authenticated: false };
    return responseInstagram;
  }
};

const ganharSeguidores = async function (username, password, userId) {
  ig.state.generateDevice(username);
  await ig.simulate.preLoginFlow();
  await ig.account.login(username, password);
  const response = await ig.friendship.create(userId);
  return response.id;
};

const ganharLikes = async function (username, password, mediaId) {
  try {
    ig.state.generateDevice(username);
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(username, password);

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
};

module.exports = {
  checarLogin,
  ganharSeguidores,
  ganharLikes,
};
