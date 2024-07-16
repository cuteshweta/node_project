// import passport for authentication
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const Persondata = require('./models/person');

// middleware for authentication using passport local stratigy
passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    //authentication logic here
    try {
        console.log("recived login", USERNAME, password);
        const user = await Persondata.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username' });

        const isPassordMatch = user.comparePassword(password);
        if (!isPassordMatch) {
            return done(null, false, { message: 'Incorrect Password' });
        }
        else {
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;