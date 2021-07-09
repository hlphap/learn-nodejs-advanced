const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
    firstName : {
        type: String
    },
    lastName: {
        type: String
    },
    email:{
        type: String,
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: "decks"
    }]
},{
    //Option
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("users", User);
