const User = require("../models/user");
const Deck = require("../models/deck");

class UserController{
    //[GET] /users/
    async index(req, res, next){
        //Callback
        // User.find({}, (err, users)=>{
        //     res.json({users});
        // })

        //Promise
        // User.find({})
        //     .then((user)=>{
        //         res.status(200).json({user});
        //     })
        //     .catch(next);

        //Async/ await
        const user = await User.find({});
        return res.status(200).json({user});
    }

    //[POST] /users/
    async newUser(req, res, next){
        const data = req.body;
        const user = new User(data);

        //Callback
        // user.save((err, user)=>{
        //     res.status(201).json({user});
        // })

        //Promise
        // user.save()
        //     .then((user)=>{
        //         res.status(201).json({user});
        //     })
        //     .catch(next);

        //Async await
        await user.save();
        res.status(201).json({user});
    }

    //[GET] /users/:userID
    async show(req, res, next){
        const {userID} = req.params;
        const user = await User.findById(userID);
        return res.status(200).json({user});
    }

    //[PUT] /users/:userID
    async replace(req, res, next){
        //enforce new user to old user
        const {userID} = req.params;

        const newUser = req.body;

        const result = await User.findByIdAndUpdate(userID, newUser);

        return res.status(200).json({success: true});
    }

    //[PATCH] /users/:userID
    async update(req, res, next){
        //number of field
        const {userID} = req.params;

        const newUser = req.body;

        const result = await User.findByIdAndUpdate(userID, newUser);

        return res.status(200).json({success: true});
    }

    //[GET] /users/:userID/decks
    async getUserDecks(req, res, next){
        const { userID } = req.params;

        const user = await User.findById(userID)
            .populate("decks");
        res.status(200).json({decks: user.decks});
    }

    //[POST] /users/:userID/decks
    async newUserDecks(req, res, next){
        const {userID} = req.params;

        //Create a new deck
        const newDeck = Deck(req.body);

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

        res.status(200).json({deck: newDeck});
    }

}

module.exports = new UserController();