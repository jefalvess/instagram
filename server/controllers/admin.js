const express = require('express');
const cloudant = require('../helpers/cloudant');
const queue = require('../helpers/queueSeguidores');

const router = express.Router();

// deletar todos
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

// ver todos os usuarios
router.post('/usuarios', async (req, res) => {
  const query = {
    selector: {},
    fields: ['usuario', 'ultimaAcao', 'userId'],
  };
  let response = await cloudant.readDocument('proposals', query);
  return res.status(200).json({ status: response.docs });
});

// ver todos os usuarios
router.post('/list', async (req, res) => {
  return res.status(200).json(await queue.get());
});


module.exports = router;
