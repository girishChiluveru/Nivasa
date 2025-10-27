const listing =require('../models/listings')
const review =require('../models/reviews');

module.exports.createReview = async (req, res) => {
   const listingData= await listing.findById(req.params.id);
   const newReview=new review(req.body.review);
   listingData.reviews.push(newReview);
   newReview.author=req.user._id;
   await newReview.save();
   await listingData.save();
   req.flash('success', 'Review created successfully!');
   res.redirect(`/listings/${listingData._id}`);
}
module.exports.deleteReview = async(req,res)=>{   
    const {id, reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
}