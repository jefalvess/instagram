module.exports = function (app) {
  const http = require('http');
  const server = http.createServer(app);
  const queueSeguidores = require('./helpers/queueSeguidores');
  // queueSeguidores.job_seguidores();
  require('./routes')(app);
  server.listen(process.env.PORT, function () {
    console.log('server started port', process.env.PORT);
   
  });
};
