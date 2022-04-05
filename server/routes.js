module.exports = function (app) {
    const cors = require("cors");
    const exec = require("./controllers")
    const userInfo = require("./controllers/userInfo")

    app.use(cors());
    app.use('/api/', exec )
    app.use('/api/', userInfo )
}