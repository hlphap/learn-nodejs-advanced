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
app.use((req, res, next)=>{
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})

//Error handler function
app.use((err, req, res, next)=>{
    const error = app.get('env')==="development"? err: {};
    const status = err.status || 500;

    //response to client
    return res.status(status).json({
        error: {
            message: error.message,
            status: status,
        }
    })
})

//Start the server
const port = app.get('port') || 3000;
app.listen(port, ()=> console.log(`Server is listening on port: ${port}`));