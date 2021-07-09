
const router = require("express-promise-router")();

const userController = require("../app/controllers/UserController");

router.route("/")
    .get(userController.index)
    .post(userController.newUser)

module.exports = router;