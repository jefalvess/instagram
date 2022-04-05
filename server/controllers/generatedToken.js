const express = require('express');
const jwt = require('../helpers/jwt');
const { validateUserToken } = require('../helpers/authenticator.js');

const router = express.Router();

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
      ultimoPedidoComentarios: req.user.ultimoPedidoComentarios,
    })
  );
  return res
    .status(200)
    .json({ status: true, usuario: req.user.usuario, token: token });
});

module.exports = router;
