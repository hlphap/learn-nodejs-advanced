const Deck = require("../models/deck");
const User = require("../models/user")

class DeckController{
    async index(req, res, next){
        const decks = await Deck.find({});
        return res.status(200).json(decks);
    }

    async newDeck(req, res, next){
        //Find owner
        const owner = await User.findById(req.value.body.owner);

        //Create a new deck
        const deck = req.value.body;
        const newDeck = new Deck(deck);
        await newDeck.save();

        //Add deck to user owner
        owner.decks.push(newDeck);
        await owner.save();

        //Return client
        return res.status(201).json({success: true});
    }

    async show(req, res, next){
        const {deckID} = req.value.params;
        const deck = await Deck.findById(deckID);
        return res.status(200).json({"deck" : deck});
    }

    async replace(req, res, next){
        //Get data
        const {deckID} = req.value.params;
        const deck = req.value.body;

        //Update Deck from deckID
        await Deck.findByIdAndUpdate(deckID, deck);

        //Return client
        return res.status(200).json({success: true});
    }

    async update(req, res, next){
        //Get data
        const {deckID} = req.value.params;
        const deck = req.value.body;

        //Update Deck from deckID
        await Deck.findByIdAndUpdate(deckID, deck);

        //Return client
        return res.status(200).json({success: true});
    }

    async delete(req, res, next){
        const {deckID} = req.value.params;

        //Get deck
        const deck = await Deck.findById(deckID);
        const ownerID = deck.owner;

        //Get owner
        const owner = await User.findById(ownerID);

        //Remove Deck
        await deck.remove();

        //Remove deck from owner.decks
        owner.decks.pull(deck);

        //Owner saved
        await owner.save();

        return res.status(200).json({success: true});
    }
}

module.exports = new DeckController();
