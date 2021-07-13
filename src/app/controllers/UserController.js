const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../../configs/index");

const User = require("../models/user");
const Deck = require("../models/deck");

//Encode from userID
function encodedToken(userID) {
    return JWT.sign({
        sub: userID,
        iss: "Phap Huynh",
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3),
    }, JWT_SECRET)
}
class UserController {
    //[GET] /users/
    async index(req, res, next) {
        const user = await User.find({});
        return res.status(200).json({ user });
    }

    //[POST] /users/
    async newUser(req, res, next) {
        const user = new User(req.value.body);
        await user.save();
        res.status(201).json({ user });
    }

    //[GET] /users/:userID
    async show(req, res, next) {
        const { userID } = req.value.params;
        const user = await User.findById(userID);
        return res.status(200).json({ user });
    }

    //[PUT] /users/:userID
    async replace(req, res, next) {
        //enforce new user to old user
        const { userID } = req.value.params;

        const newUser = req.value.body;

        await User.findByIdAndUpdate(userID, newUser);

        return res.status(200).json({ success: true });
    }

    //[PATCH] /users/:userID
    async update(req, res, next) {
        //number of field
        const { userID } = req.value.params;

        const newUser = req.value.body;

        await User.findByIdAndUpdate(userID, newUser);

        return res.status(200).json({ success: true });
    }

    //[GET] /users/:userID/decks
    async getUserDecks(req, res, next) {
        const { userID } = req.value.params;

        const user = await User.findById(userID)
            .populate("decks");
        res.status(200).json({ decks: user.decks });
    }

    //[POST] /users/:userID/decks
    async newUserDecks(req, res, next) {
        const { userID } = req.value.params;

        //Create a new deck
        const newDeck = Deck(req.value.body);

        //Get user
        const user = await User.findById(userID);

        //Assign user as a deck's owner
        newDeck.owner = user;

        //Save deck
        await newDeck.save();

        //Add deck to user's decks array "decks"
        user.decks.push(newDeck);

        //Save user
        await user.save();

        res.status(200).json({ deck: newDeck });
    }

    async signIn(req, res, next) {
        console.log("Called to sign in");
    }

    //[POST] /users/signup
    async signUp(req, res, next) {
        const { firstName, lastName, email, password } = req.value.body;

        const user = new User({ firstName, lastName, email, password });

        const foundUser = await User.findOne({ email });

        if (foundUser) return res.status(403).json({
            error: {
                message: "email already exists",
                status: "403",
            }
        })

        await user.save();

        //Encode token
        const token = encodedToken(user._id);

        res.setHeader('Authorization', token)

        return res.status(201).json({ success: true });
    }

    //[POST] /users/signin
    async signIn(req, res, next) {
        const token = encodedToken(req.user._id);
        res.setHeader("Authorization", token);
        res.status(200).json({ resource: true });
    }

    //[GET] /users/secret
    async secret(req, res, next) {
        console.log("Called secret");
        return res.status(200).json({ success: true });
    }

    //[POST] /users/auth/google
    async authGoogle(req, res, next) {
        const token = encodedToken(req.user._id);
        res.setHeader("Authorization", token);
        res.status(200).json({ resource: true });
    }

    async authFacebook(req, res, next) {
        const token = encodedToken(req.user._id);
        res.setHeader("Authorization", token);
        res.status(200).json({ resource: true });
    }
}

module.exports = new UserController();