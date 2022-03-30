const express = require('express');
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
      usuario: req.body.usuario,
      senha: req.body.senha,
    },
  };

  // Validar senha do usuario
  let buscarUsuario = await cloudant.findDocument('proposals', query);

  let responseInstagram = await instagram.checarLogin(
    req.body.usuario,
    req.body.senha
  );

  //salvar no banco de dados
  if (
    typeof buscarUsuario === 'undefined' &&
    responseInstagram.authenticated === true
  ) {
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
    };
    cloudant.createDocument(doc);
    return res
      .status(200)
      .json({ status: true, usuario: req.body.usuario, token: token });
  }

  // Gerar token se o usuario estiver no banco de dados e token valido
  if (
    typeof buscarUsuario !== 'undefined' &&
    responseInstagram.authenticated === true
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

  // usuario no banco mas o token é invalido = troca de senha do insta
  if (
    typeof buscarUsuario !== 'undefined' &&
    responseInstagram.authenticated === false
  ) {
    buscarUsuario['_deleted'] = true;
    cloudant.bulkDocument([buscarUsuario]);
    return res.status(200).json({
      status: false,
      mensagem: 'Senha incorreta do instagram entre com a senha correta',
    });
  }

  return res.status(200).json({ status: false, mensagem: 'erro' });
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

module.exports = router;
