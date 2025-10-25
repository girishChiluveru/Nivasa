const listing =require('./models/listings');
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema}=require('./Schema.js');
const {reviewSchema}=require('./Schema.js');
const review =require('./models/reviews');
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // console.log(req.path, req.originalUrl);
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to perform this action!');
        return res.redirect('/users/login');
    }
    next();
};
const saveRedirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

const isOwner=async(req,res,next)=>{
    let listingData = await listing.findById(req.params.id);
    if(!listingData || !listingData.owner.equals(req.user._id)){
            req.flash('error', 'You do not have permission to access this listing!');
            return  res.redirect(`/listings/${req.params.id}`);
        }
    next();
};
const validateListing=(req,res,next)=>{
    let {error} =listingSchema.validate(req.body)
    if(error){
        let errMsg=error.details.map((ele)=>ele.message).join(' ,')
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};
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
const isAuthor=async(req,res,next)=>{
    const {id, reviewId}=req.params;
    const reviewData= await review.findById(reviewId);
    if(!reviewData.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to this review!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports={isLoggedIn, saveRedirectUrl, isOwner, validateListing, validateReview, isAuthor};