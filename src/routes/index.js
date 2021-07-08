const userController = require("../app/controllers/UserController");

function routes(app){
    app.use("/users",userController.index);
}

module.exports = routes;