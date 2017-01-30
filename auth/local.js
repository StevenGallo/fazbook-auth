//details of local strategy for logging in user with username and password
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();

//create new instance of LocalStrategy Class from passport
passport.use(new LocalStrategy(options, (username, password, done) => {
    // check to see if the username exists
    models.User.findAll({
            where: {
                username
            }
        })
        //if user exists take user from returned user array. 
        .then((user) => {
            //if undefined exit from checks by returning a call of done method and passing false
            if (user[0] === undefined) {
                return done(null, false);
            }
            //if comparePass called from auth-helpers returns false -passwords don't match-
            //exit from checks by returning a call of done method and passing false
            if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
                return done(null, false);
                //user is not undefined and password matches so
                //exit from checks by returning a call of done method and passing data from the user being checked
            } else {
                console.log('everything works so wtf...')
                return done(null, user[0].datavalues);
            }
        })
        .catch((err) => {
            return done(err);
        });
}));

module.exports = passport;