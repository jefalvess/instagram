const express = require('express');
const { info } = require('node-sass');
const cloudant = require('../cloudant');
const instagram = require('../instagram');
const jwt = require('../jwt');
const { validateUserToken } = require('./authenticator.js');

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
      _id: `proposals:${req.body.usuario}`
    },
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);



  //salvar no banco de dados
  if (
    typeof buscarUsuario === 'undefined') {

    let { responseInstagram, info, timeline } = await instagram.checarLogin(
      req.body.usuario,
      req.body.senha
    );

    if (responseInstagram.authenticated === true) {

      console.log('[ Salvar no banco de dados ]');
      let token = await jwt.sign(
        JSON.stringify({
          usuario: req.body.usuario,
          senha: req.body.senha,
          userId: responseInstagram.userId,
          usuarioChat: true,
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
        timeline: timeline,
      };
      cloudant.createDocument(doc);
      return res
        .status(200)
        .json({ status: true, usuario: req.body.usuario, token: token });
    }
  }

  // Gerar token se o usuario estiver no banco de dados e token valido
  if (
    typeof buscarUsuario !== 'undefined'
  ) {
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
        })
      );
      return res
        .status(200)
        .json({ status: true, usuario: buscarUsuario.usuario, token: token });
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
  };
  let count = 0;
  let response = await cloudant.readDocument('proposals', query);
  for (let i = 0; i < response.docs.length; i++) {
    if (req.user.usuario !== response.docs[i].usuario) {
      const seguir = await instagram.ganharSeguidores(
        response.docs[i].usuario,
        response.docs[i].senha,
        req.user.userId
      );
      console.log('[ Ganhar Seguidor ] ');
      console.log(seguir);
      count++;
    }
  }

  return res.status(200).json({ status: true, message: count });
});

// Criar novo token de acesso
router.post('/info/perfil', validateUserToken, async (req, res) => {
  const query = {
    selector: {
      _id: `proposals:${req.user.usuario}`
    },
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  return res.status(200).json({ status: true, info: buscarUsuario.info, timeline: buscarUsuario.timeline });

});

module.exports = router;
// buscarUsuario['_deleted'] = true;
// cloudant.bulkDocument([buscarUsuario]);