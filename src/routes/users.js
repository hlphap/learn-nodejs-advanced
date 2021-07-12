
const router = require("express-promise-router")();

const userController = require("../app/controllers/UserController");

const { validateBody, validateParam, schema } = require("../helpers/routerHelpers");

const passport = require("passport");
const passportConfig = require("../middlewares/passport");

router.route("/signin")
    .post(validateBody(schema.authSignInSchema), userController.signIn);

router.route("/signup")
    .post(validateBody(schema.authSignUpSchema), userController.signUp);

router.route("/secret")
    .get(passport.authenticate("jwt", { session: false }), userController.secret);

router.route("/")
    .get(userController.index)
    .post(validateBody(schema.userSchema), userController.newUser)

router.route("/:userID")
    .all(validateParam(schema.idSchema, "userID"))
    .get(userController.show)
    .put(validateBody(schema.userSchema), userController.replace)
    .patch(validateBody(schema.userOptionalSchema), userController.update)

router.route("/:userID/decks")
    .all(validateParam(schema.idSchema, "userID"))
    .get(userController.getUserDecks)
    .post(validateBody(schema.deckSchema), userController.newUserDecks)



module.exports = router;