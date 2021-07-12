const userRouter = require("./users");
const deckRouter = require("./decks");

function routes(app){
    app.use("/users",userRouter);
    app.use("/decks", deckRouter);
}

module.exports = routes;