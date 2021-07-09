const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Deck = Schema({
    name : {
        type: String
    },
    description: {
        type: String
    },
    total:{
        type: Number,
        default: 0,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
},{
    //Option
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("decks", Deck);
