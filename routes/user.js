const express = require('express');
const router = express.Router();
const user = require('../models/user');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { saveRedirectUrl } = require('../middlewares.js');
router.get('/signup', (req, res) => {
  res.render('./users/signup.ejs');
});
router.post('/signup',  wrapAsync(async (req, res) => {
  let { username, email, password } = req.body;
  const newUser = new user({ username, email });
  const registeredUser = await user.register(newUser, password);
  // req.flash('success', 'Welcome to Wanderlust!');
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
    req.flash('success', 'Welcome to Wanderlust!');
    res.redirect('/listings');
    });
  }));
router.get('/login', (req, res) => {
  res.render('./users/login.ejs');
});
router.post('/login', saveRedirectUrl, passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: true
}), async (req, res) => {
  req.flash('success', 'Welcome back!');
  // console.log('Redirect URL:', res.locals.redirectUrl);
  const redirectUrl = res.locals.redirectUrl || '/listings';
  //explain why we did not use directly the req.session.redirectUrl rather we used res.locals.redirectUrl , i.e storing redirectUrl in response locals object rather than session object, while redirecting after login
  //as passport automatically removes session data after login, we stored the redirectUrl in locals object in middleware saveRedirectUrl before login so that we can access it here after login, passport dont remove locals object data
  res.redirect(redirectUrl);
});
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/users/login');
  });
}); 
module.exports = router;