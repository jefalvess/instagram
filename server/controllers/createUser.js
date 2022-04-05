const express = require('express');
const cloudant = require('../helpers/cloudant');
const instagram = require('../helpers/instagram');
const jwt = require('../helpers/jwt');
const { validateUserToken } = require('../helpers/authenticator.js');

const router = express.Router();

// criar usuario
router.post('/createUser', validateUserToken, async (req, res) => {
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
          ultimoPedidoComentarios: buscarUsuario.ultimoPedidoComentarios,
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
        imgFlag: false,
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

module.exports = router;
