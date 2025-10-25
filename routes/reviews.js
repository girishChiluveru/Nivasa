const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const listing =require('../models/listings')
const review =require('../models/reviews')
const methodOverride=require('method-override')
router.use(express.urlencoded({extended:true}))
router.use(methodOverride("_method"));
const {isLoggedIn,validateReview,isAuthor}=require('../middlewares.js');
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req,res)=>{
   const listingData= await listing.findById(req.params.id);
   const newReview=new review(req.body.review);
   listingData.reviews.push(newReview);
   newReview.author=req.user._id;
   await newReview.save();
   await listingData.save();
   req.flash('success', 'Review created successfully!');
   res.redirect(`/listings/${listingData._id}`);
}))
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(async(req,res)=>{   
    const {id, reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
}))

module.exports=router;