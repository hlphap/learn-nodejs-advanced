const User = require("../models/user");

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

    async replace(req, res, next){
        //enforce new user to old user
        const {userID} = req.params;

        const newUser = req.body;

        const result = await User.findByIdAndUpdate(userID, newUser);

        return res.status(200).json({success: true});
    }

    async update(req, res, next){
        //number of field
        const {userID} = req.params;

        const newUser = req.body;

        const result = await User.findByIdAndUpdate(userID, newUser);

        return res.status(200).json({success: true});
    }
}

module.exports = new UserController();