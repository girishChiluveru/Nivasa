const express = require('express');
const router = express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const listing =require('../models/listings')
const methodOverride=require('method-override')
const {isLoggedIn,isOwner,validateListing}=require('../middlewares.js');
router.use(express.urlencoded({extended:true}))
router.use(methodOverride("_method"))



router.get("/new",isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs")
})
router.get('/:id',wrapAsync(async(req,res)=>{
    const data=await listing.findById(req.params.id)
    .populate('owner')
    .populate({path:'reviews', populate:{path:'author'}});
    // console.log(data);
    if(!data){
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render("./listings/show.ejs",{data});
}))
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let data =await listing.findById(req.params.id);
    if(!data){
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render("./listings/edit.ejs",{data});
}))
router.get("/",wrapAsync(async(req,res)=>{
    const data= await listing.find({});
    res.render("./listings/index.ejs",{data})
}))

router.post("/",validateListing, wrapAsync(async (req, res, next) => {
    //   if (!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    
    const newListing = new listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash('success', 'Listing created successfully!');
    
    res.redirect("/listings");
}))


router.put('/:id',isLoggedIn,validateListing,isOwner, wrapAsync(async (req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }
    const id = req.params.id;
    const updatedListing = req.body.listing;
    await listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
}))
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    const id=req.params.id;
    await listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect("/listings")
}))

module.exports=router;