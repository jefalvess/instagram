const express = require('express');
const cloudant = require('./helpers/cloudant');
const download = require('./helpers/download');
const instagram = require('./helpers/instagram');
const jwt = require('./helpers/jwt');
const { validateUserToken } = require('./helpers/authenticator.js');

const router = express.Router();

// Tentar login
router.post('/login/user', async (req, res) => {
  if (!req.body.usuario) {
    return res
      .status(200)
      .json({ status: false, mensagem: 'Usuario com erro' });
  }

  if (!req.body.senha) {
    return res.status(200).json({ status: false, mensagem: 'Senha com erro' });
  }

  const query = {
    selector: {
      _id: `proposals:${req.body.usuario}`,
    },
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  // Gerar token se o usuario estiver no banco de dados e token valido
  if (typeof buscarUsuario !== 'undefined') {
    if (
      buscarUsuario.usuario === req.body.usuario &&
      buscarUsuario.senha === req.body.senha
    ) {
      console.log('[ Validado com sucesso ] ');
      let token = await jwt.sign(
        JSON.stringify({
          usuario: req.body.usuario,
          senha: req.body.senha,
          userId: buscarUsuario.userId,
          usuarioChat: true,
          ultimoPedidoLike: buscarUsuario.ultimoPedidoLike,
          ultimoPedidoSeguidores: buscarUsuario.ultimoPedidoSeguidores,
          ultimoPedidoComentarios: buscarUsuario.ultimoPedidoComentarios
        })
      );
      return res
        .status(200)
        .json({ status: true, usuario: buscarUsuario.usuario, token: token });
    }
  }

  //salvar no banco de dados
  if (typeof buscarUsuario === 'undefined') {
    let { responseInstagram, info, timelineArray } = await instagram.checarLogin(req.body.usuario, req.body.senha);
    if (responseInstagram.authenticated === true) {
      console.log('[ Salvar no banco de dados ]');
      let token = await jwt.sign(
        JSON.stringify({
          usuario: req.body.usuario,
          senha: req.body.senha,
          userId: responseInstagram.userId,
          usuarioChat: true,
          ultimoPedidoLike: 0,
          ultimoPedidoSeguidores: 0,
          ultimoPedidoComentarios: 0
        })
      );

      let documentID = `proposals:${req.body.usuario}`;
      let doc = {
        _id: documentID,
        usuario: req.body.usuario,
        senha: req.body.senha,
        userId: responseInstagram.userId,
        create: Date.now(),
        info: info,
        timeline: timelineArray,
        ultimaAcao: 0,
        ultimoPedidoLike: 0,
        ultimoPedidoSeguidores: 0,
        ultimoPedidoComentarios: 0,
      };
      await cloudant.createDocument(doc);
      return res
        .status(200)
        .json({ status: true, usuario: req.body.usuario, token: token });
    }

    if (responseInstagram.authenticated === false) {
      // senha errada erro
      if (responseInstagram.senhaErrada === true) {
        return res
          .status(200)
          .json({ status: 'error', mensagem: responseInstagram.mensagem });
      }

      return res.status(200).json({
        status: false,
      });
    }
  }
});

// Criar novo token de acesso
router.post('/token/user', validateUserToken, async (req, res) => {
  let token = await jwt.sign(
    JSON.stringify({
      usuario: req.user.usuario,
      senha: req.user.senha,
      userId: req.user.userId,
      usuarioChat: true,
      ultimoPedidoLike: req.user.ultimoPedidoLike,
      ultimoPedidoSeguidores: req.user.ultimoPedidoSeguidores,
      ultimoPedidoComentarios: req.user.ultimoPedidoComentarios
    })
  );
  return res
    .status(200)
    .json({ status: true, usuario: req.user.usuario, token: token });
});

// Criar novo token de acesso
router.post('/ganhar/seguidores', validateUserToken, async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'senha'],
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);
  if (await check_Temp(req.user.ultimoPedidoSeguidores) === false) {
    return res.status(500).json({ status: true, message: count });
  }
  for (let i = 0; i < response.docs.length; i++) {
    if (req.user.usuario !== response.docs[i].usuario) {
      await instagram.ganharSeguidores(
        response.docs[i].usuario,
        response.docs[i].senha,
        req.user.userId
      );
      console.log('[ Ganhar Seguidor ] ', req.user.usuario);

      count++;
    }
  }

  update_document_Pedido(req.user.usuario, 'ultimoPedidoSeguidores');


  return res.status(200).json({ status: true, message: count });
});

// Criar novo token de acesso
router.post('/ganhar/likes', validateUserToken, async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'senha'],
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);
  if (await check_Temp(req.user.ultimoPedidoLike) === false) {
    return res.status(200).json({ status: true, message: count });
  }

  for (let i = 0; i < response.docs.length; i++) {
    if (req.user.usuario !== response.docs[i].usuario) {
      await instagram.ganharLikes(
        response.docs[i].usuario,
        response.docs[i].senha,
        req.body.mediaId
      );
      // update_document_acao(response.docs[i].usuario);
      console.log('[ Ganhar Likes ] ', req.user.usuario);
      count++;
    }
  }

  update_document_Pedido(req.user.usuario, 'ultimoPedidoLike');

  return res.status(200).json({ status: true, message: count });
});

// Criar novo token de acesso
router.post('/ganhar/comentario', validateUserToken, async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'senha'],
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);

  if (await check_Temp(req.user.ultimoPedidoComentarios) === false) {
    return res.status(500).json({ status: true, message: count });
  }
  for (let i = 0; i < response.docs.length; i++) {
    if (req.user.usuario !== response.docs[i].usuario) {
      await instagram.ganharComentario(
        response.docs[i].usuario,
        response.docs[i].senha,
        req.body.mediaId,
        req.body.comentario
      );
      console.log('[ Ganhar Comentario ] ', req.user.usuario);
    }
  }

  update_document_Pedido(req.user.usuario, 'ultimoPedidoComentarios');


  return res.status(200).json({ status: true, message: count });
});

// Criar novo token de acesso
router.post('/info/perfil', validateUserToken, async (req, res) => {
  const query = {
    selector: {
      _id: `proposals:${req.user.usuario}`,
    },
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  // download foto de perfil
  await download.imgDownload(
    buscarUsuario.info.profile_pic_url_hd,
    buscarUsuario.userId,
    function () {
      console.log('done');
    }
  );

  let timeline = buscarUsuario.timeline;

  for (let i = 0; i < timeline.length; i++) {
    await download.imgDownload(
      timeline[i]['img'],
      timeline[i]['id'],
      function () {
        console.log('done');
      }
    );
  }

  return res
    .status(200)
    .json({
      status: true,
      ultimoLikePedidoMaisde24Horas: buscarUsuario.ultimoPedidoLike,
      ultimoComentarioPedidoMaisde24Horas: buscarUsuario.ultimoPedidoComentarios,
      ultimoSeguidoresPedidoMaisde24Horas: buscarUsuario.ultimoPedidoSeguidores,
      info: buscarUsuario.info,
      timeline: timeline
    });
});

// Criar novo token de acesso
router.post('/delete', async (req, res) => {
  const query = {
    selector: {},
  };
  let response = await cloudant.readDocument('proposals', query);
  for (let i = 0; i < response.docs.length; i++) {
    response.docs[i]['_deleted'] = true;
  }
  cloudant.bulkDocument(response.docs);
  return res.status(200).json({ status: response.docs });
});

// Criar novo token de acesso
router.post('/usuarios', async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario'],
  };
  let response = await cloudant.readDocument('proposals', query);
  return res.status(200).json({ status: response.docs });
});

// async function update_document_acao(usuario) {
//   const query = {
//     selector: {
//       _id: `proposals:${usuario}`,
//     },
//   };
//   // Validar senha do usuario
//   let doc = await cloudant.findDocument('proposals', query);
//   doc['ultimaAcao'] = Date.now();
//   cloudant.updateDocument(doc);
// }

async function update_document_Pedido(usuario, type) {

  const query = {
    selector: {
      _id: `proposals:${usuario}`,
    },
  };
  // Validar senha do usuario
  let doc = await cloudant.findDocument('proposals', query);
  doc[type] = Date.now();
  cloudant.updateDocument(doc);
}


async function check_Temp(ultimoPedido) {

  if (Date.now() - parseInt(ultimoPedido) > 1000 * 60 * 60 * 24) {

    return true
  } else {
    return false
  }

}

module.exports = router;
