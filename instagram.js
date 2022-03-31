const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const dotenv = require('dotenv');

dotenv.config();

//Create a new server
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }) );

const staticFileMiddleware = express.static(path.join(__dirname));
app.use(history());
app.use(staticFileMiddleware);

app.use('/', express.static('./dist'));
console.log(__dirname + '/images')
app.use('/static', express.static(__dirname + '/images'));

require('./server/server')(app);
