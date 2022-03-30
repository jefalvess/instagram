module.exports = function (app) {

  const http = require('http');
  const server = http.createServer(app);

  require('./routes')(app);
  server.listen(process.env.PORT, function () {
    console.log('server started port', process.env.PORT);
  });
};
