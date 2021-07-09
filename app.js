const express = require("express")
const morgan = require("morgan")

const routes = require("./src/routes/index");
const db = require("./src/config/db/connect")


//Connect DB
db.connect();

const app = express();

//Middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
routes(app);

//Catch 404

//Error handler function

//Start the server
const port = app.get('port') || 3000;
app.listen(port, ()=> console.log(`Server is listening on port: ${port}`));