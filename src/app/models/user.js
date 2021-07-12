const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: "decks"
    }]
}, {
    //Option
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("users", User);
