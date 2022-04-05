const express = require('express');
const cloudant = require('../helpers/cloudant');
const instagram = require('../helpers/instagram');
const { validateUserToken } = require('../helpers/authenticator.js');

const router = express.Router();

// Ganhar seguidores
router.post('/ganhar/seguidores', validateUserToken, async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'senha'],
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);
  if (checarDataUltimoPedido(req.user.ultimoPedidoSeguidores) === false) {
    console.log('[Tentativa de bug bloqueado]');
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

// Ganhar likes
router.post('/ganhar/likes', validateUserToken, async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'senha'],
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);
  if (checarDataUltimoPedido(req.user.ultimoPedidoLike) === false) {
    console.log('[Tentativa de bug bloqueado]');
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

// Ganhar comentarios
router.post('/ganhar/comentario', validateUserToken, async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'senha'],
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);

  if (
    (await checarDataUltimoPedido(req.user.ultimoPedidoComentarios)) === false
  ) {
    console.log('[Tentativa de bug bloqueado]');
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

async function checarDataUltimoPedido(ultimoPedido) {
  if (Date.now() - parseInt(ultimoPedido) > 1000 * 60 * 60 * 24) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
