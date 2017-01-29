const passport = require('passport');
const models = require('../db/models/index');

module.exports = () => {
    //serialize user data into a format the computer can store in session memory
    passport.serializeUser((user, done) => {
        done(null, user, id);
    });

    //deserialize user data taken from memory into json object 
    passport.deserializeUser((id, done) => {
        models.User.findById(id)
            .then((user) => { done(null, user); })
            .catch((err) => { done(err, null); });
    });
};