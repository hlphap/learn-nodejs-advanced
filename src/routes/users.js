
const router = require("express-promise-router")();

const userController = require("../app/controllers/UserController");

const { validateBody, validateParam, schema } = require("../helpers/routerHelpers");

const passport = require("../middlewares/passport");

router.route("/auth/facebook")
    .post(passport.authenticate("facebook-token", { session: false }), userController.authFacebook);

router.route("/auth/google")
    .post(passport.authenticate("google-plus-token", { session: false }), userController.authGoogle);

router.route("/signin")
    .post(validateBody(schema.authSignInSchema), passport.authenticate("local", { session: false }), userController.signIn);

router.route("/signup")
    .post(validateBody(schema.authSignUpSchema), userController.signUp);

router.route("/secret")
    .get(passport.authenticate("jwt", { session: false }), userController.secret);

router.route("/")
    .get(passport.authenticate("jwt", { session: false }), userController.index)
    .post(validateBody(schema.userSchema), userController.newUser)

router.route("/:userID")
    .all(passport.authenticate("jwt", { session: false }), validateParam(schema.idSchema, "userID"))
    .get(userController.show)
    .put(validateBody(schema.userSchema), userController.replace)
    .patch(validateBody(schema.userOptionalSchema), userController.update)

router.route("/:userID/decks")
    .all(passport.authenticate("jwt", { session: false }), validateParam(schema.idSchema, "userID"))
    .get(userController.getUserDecks)
    .post(validateBody(schema.deckSchema), userController.newUserDecks)

module.exports = router;