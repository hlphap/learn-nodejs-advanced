const user = require("../models/user");

class UserController{
    index(req, res, next){
        res.json("123");
    }
}

module.exports = new UserController();