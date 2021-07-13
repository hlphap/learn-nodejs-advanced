const passport = require("passport");

//passport Jwt
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//passport Local
const LocalStrategy = require("passport-local").Strategy;

//passport Google OAuth
const GooglePlusTokenStrategy = require("passport-google-plus-token");

//passport Facebook
const FacebookTokenStrategy = require("passport-facebook-token");

const User = require("../app/models/user");

const { JWT_SECRET, auth } = require("../configs/index")

//Passport jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
    secretOrKey: JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        const { sub: userID } = jwt_payload;

        const user = await User.findById(userID);

        if (!user) done(null, false);

        return done(null, user);

    } catch (error) {
        return done(error, false);
    }
}))

//Passport local
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false);

        const isCorrectPassword = await user.isValidPassword(password);

        if (!isCorrectPassword) return done(null, false);

        return done(null, user);
    } catch (error) {
        done(error, false);
    }
}))

//Passport google
passport.use(new GooglePlusTokenStrategy({
    clientID: auth.google.CLIENT_ID,
    clientSecret: auth.google.CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        //check whether this current user exists in our database
        const user = await User.findOne({
            authGoogleID: profile.id,
            authType: "google",
        })

        if (user) return done(null, user)

        //If new account
        const newUser = new User({
            authType: "google",
            authGoogleID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
        });

        await newUser.save();

        done(null, newUser);

    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}))

//Passport facebook
passport.use(new FacebookTokenStrategy({
    clientID: auth.facebook.CLIENT_ID,
    clientSecret: auth.facebook.CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        //check whether this current user exists in our database
        const user = await User.findOne({
            authFacebookID: profile.id,
            authType: "facebook",
        })

        if (user) return done(null, user)

        //If new account
        const newUser = new User({
            authType: "facebook",
            authFacebookID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
        });

        await newUser.save();

        done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}))