module.exports = function (app) {
  const cors = require('cors');
  const admin = require('./controllers/admin');
  const createUser = require('./controllers/createUser');
  const functions = require('./controllers/functions');
  const generatedToken = require('./controllers/generatedToken');
  const userInfo = require('./controllers/userInfo');

  app.use(cors());
  app.use('/api/', [admin, createUser, functions, generatedToken, userInfo]);
};
