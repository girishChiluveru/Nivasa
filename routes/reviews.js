const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');

const {isLoggedIn,validateReview,isAuthor}=require('../middlewares.js');
const { deleteReview, createReview } = require('../controllers/reviews.js');
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview))
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(deleteReview))

module.exports=router;