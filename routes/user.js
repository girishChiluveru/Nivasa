const express = require('express');
const router = express.Router();

const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { saveRedirectUrl } = require('../middlewares.js');
const { signup, getSignupForm, loginUser , logoutUser} = require('../controllers/users.js');
router.route('/signup')
  .get( getSignupForm )
  .post( wrapAsync(signup));
router.route('/login')
  .get((req, res) => {
    res.render('./users/login.ejs');
  })
  .post(saveRedirectUrl, passport.authenticate('local', {
    failureRedirect: '/users/login',
  failureFlash: true
}), loginUser);
router.get('/logout', logoutUser);
module.exports = router;