const User = require("../models/user");

class UserController{
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
        res.status(200).json({user});
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
}

module.exports = new UserController();