const express = require('express');
const router = express.Router();
const wrapAsync=require('../utils/wrapAsync.js');

const {isLoggedIn,isOwner,validateListing}=require('../middlewares.js');
const {getAllListings, getNewListingForm, getListingById, getListingEditForm, createListing, updateListing, deleteListing } = require('../controllers/listings.js');
const multer  = require('multer');
const {cloudinary,storage} = require('../cloudConfig.js');
const upload = multer({ storage });
//Move all callbacks to controllers/listings.js, with suitable names., use router.route() for cleaner code.
router.route("/")
  .get(wrapAsync(getAllListings))
  .post(
    validateListing ,
    isLoggedIn, 
    upload.single('listing[image]'),
    wrapAsync(createListing)
  );
  // .post(upload.single('listing[image]'),(req,res,next)=>{
  //   res.send(req.file);
  // });

router.route("/new")
  .get(isLoggedIn, getNewListingForm);

router.route("/:id")
  .get(wrapAsync(getListingById))
  .put(isLoggedIn, validateListing, isOwner, upload.single('listing[image]'), wrapAsync(updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

router.route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(getListingEditForm));

module.exports=router;