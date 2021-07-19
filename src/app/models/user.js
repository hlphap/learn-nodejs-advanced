const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs")

const User = Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    authGoogleID: {
        type: String,
        default: null,
    },
    authFacebookID: {
        type: String,
        default: null,
    },
    authType: {
        type: String,
        enum: ["local", "google", "facebook"],
        default: "local",
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: "decks",
    }]
}, {
    //Options
    timestamps: true,
    versionKey: false,
})

User.pre("save", async function (next) {
    try {
        if (this.authType !== "local") next();

        if (!this.password) next();

        //Generate a salt
        const salt = await bcrypt.genSalt(10);

        //Generate password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt);

        //Re-assign the password hashed
        this.password = passwordHashed;

        //Next Function
        next();
    } catch (err) {
        next(err);
    }
})

User.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mongoose.model("users", User);
