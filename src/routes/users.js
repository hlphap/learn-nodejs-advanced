
const router = require("express-promise-router")();

const userController = require("../app/controllers/UserController");

router.route("/")
    .get(userController.index)
    .post(userController.newUser)

router.route("/:userID")
    .get(userController.show)
    .put(userController.replace)
    .patch(userController.update)


module.exports = router;