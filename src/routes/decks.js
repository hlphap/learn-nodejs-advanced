const router = require("express-promise-router")();

const deckController = require("../app/controllers/DeckController");
const { validateBody, validateParam, schema } = require("../helpers/routerHelpers");

router.route("/")
    .get(deckController.index)
    .post(validateBody(schema.newDeckSchema), deckController.newDeck)

router.route("/:deckID")
    .all(validateParam(schema.idSchema, "deckID"))
    .get(deckController.show)
    .put(validateBody(schema.newDeckSchema), deckController.replace)
    .patch(validateBody(schema.newDeckSchemaOptional), deckController.update)
    .delete(deckController.delete)

module.exports = router;