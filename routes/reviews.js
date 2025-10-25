const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema,reviewSchema}=require('../Schema.js')
const listing =require('../models/listings')
const review =require('../models/reviews')
const methodOverride=require('method-override')
router.use(express.urlencoded({extended:true}))
router.use(methodOverride("_method"))



const validateReview=(req,res,next)=>{
    let {error} =reviewSchema.validate(req.body)
    if(error){
        let errMsg=error.details.map((ele)=>ele.message).join(' ,')
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}


router.post("/", validateReview, wrapAsync(async(req,res)=>{
   const listingData= await listing.findById(req.params.id);
   const newReview=new review(req.body.review);
   listingData.reviews.push(newReview);
   await newReview.save();
   await listingData.save();
   req.flash('success', 'Review created successfully!');
   res.redirect(`/listings/${listingData._id}`);
}))
router.delete("/:reviewId", wrapAsync(async(req,res)=>{   
    const {id, reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
}))

module.exports=router;