const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

//when routed to /register run check to either 
//render register page if they are not logged in
//or send the to user page if they are
router.get('/register', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/register');
});

//post details from new user form
router.post('/register', (req, res, next) => {
    return authHelpers.createUser(req, res)
        .then((response) => {
            console.log('registration successful');
        })
        .catch((err) => { res.status(500).json({ status: 'error' }); });
});

//login check and redirect
router.get('/login', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/login');
});

//submit login info and redirect after successful login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
}));
//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;