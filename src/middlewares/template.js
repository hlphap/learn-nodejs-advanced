const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../configs/index");

const User = require("../app/models/user");

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
    secretOrKey: JWT_SECRET,
}, async (payload, done) => {
    try {
        const { sub } = payload;

        const user = await User.findById(sub);

        if (!user) return done(null, false)

        done(null, user);

    } catch (error) {
        done(error, false);
    }
}))

