const express = require('express');
const cloudant = require('../helpers/cloudant');
const download = require('../helpers/download');
const { validateUserToken } = require('../helpers/authenticator.js');

const router = express.Router();

// buscar info de usuario
router.post('/infoperfil', validateUserToken, async (req, res) => {
  const query = {
    selector: {
      _id: `proposals:${req.user.usuario}`,
    },
    fields: ['info', 'imgFlag'],
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  if (buscarUsuario.img === false) {
    // // download foto de perfil
    await download.imgDownload(
      buscarUsuario.info.profile_pic_url_hd,
      buscarUsuario.userId,
      function () {
        console.log('done');
      }
    );
  }

  return res.status(200).json({
    status: true,
    info: buscarUsuario.info,
  });
});

// buscar itens da timeline
router.post('/timeline', validateUserToken, async (req, res) => {
  const query = {
    selector: {
      _id: `proposals:${req.user.usuario}`,
    },
    fields: ['timeline', 'imgFlag'],
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  let timeline = buscarUsuario.timeline;

  if (buscarUsuario.imgFlag === false) {
    for (let i = 0; i < timeline.length; i++) {
      await download.imgDownload(
        timeline[i]['img'],
        timeline[i]['id'],
        function () {
          console.log('done');
        }
      );
    }

    update_img(req.user.usuario);
  }

  return res.status(200).json({
    status: true,
    timeline: timeline,
  });
});

// ultimas açoes no site
router.post('/pedidos', validateUserToken, async (req, res) => {
  const query = {
    selector: {
      _id: `proposals:${req.user.usuario}`,
    },
    fields: [
      'ultimoPedidoLike',
      'ultimoPedidoComentarios',
      'ultimoPedidoSeguidores',
    ],
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  return res.status(200).json({
    status: true,
    ultimoLikePedidoMaisde24Horas: buscarUsuario.ultimoPedidoLike,
    ultimoComentarioPedidoMaisde24Horas: buscarUsuario.ultimoPedidoComentarios,
    ultimoSeguidoresPedidoMaisde24Horas: buscarUsuario.ultimoPedidoSeguidores,
  });
});

async function update_img(usuario) {
  const query = {
    selector: {
      _id: `proposals:${usuario}`,
    },
  };
  // Validar senha do usuario
  let doc = await cloudant.findDocument('proposals', query);
  doc['imgFlag'] = true;
  cloudant.updateDocument(doc);
}

module.exports = router;
