const express = require('express');
const router = express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema}=require('../Schema.js')
const listing =require('../models/listings')
const methodOverride=require('method-override')
const app=express();
router.use(express.urlencoded({extended:true}))
router.use(methodOverride("_method"))

const validateListing=(req,res,next)=>{
    let {error} =listingSchema.validate(req.body)
    if(error){
        let errMsg=error.details.map((ele)=>ele.message).join(' ,')
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

router.get("/new",(req,res)=>{
    res.render("./listings/new.ejs")
})
router.get('/:id',wrapAsync(async(req,res)=>{
    const data=await listing.findById(req.params.id).populate('reviews');
    if(!data){
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render("./listings/show.ejs",{data});
}))
router.get('/:id/edit',wrapAsync(async(req,res)=>{
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
    await newListing.save();
    req.flash('success', 'Listing created successfully!');
    
    res.redirect("/listings");
}))


router.put('/:id',validateListing, wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    const id = req.params.id;
    const updatedListing = req.body.listing;
    await listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
}))
router.delete("/:id",wrapAsync(async(req,res)=>{
    const id=req.params.id;
    await listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect("/listings")
}))

module.exports=router;