module.exports = function (app) {
    const cors = require("cors");
    const exec = require("./controllers")
    app.use(cors());
    app.use('/api/', exec)
}