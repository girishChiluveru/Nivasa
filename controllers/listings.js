//Move all callbacks to controllers/listings.js, with suitable names.
const listing =require('../models/listings');
const geocoder = require('../geocoderConfig.js');

module.exports.getNewListingForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.getAllListings = async (req, res) => {
    const data = await listing.find({});
    res.render("./listings/index.ejs", { data });
};

module.exports.getListingById = async (req, res) => {
    const data = await listing.findById(req.params.id)
        .populate('owner')
        .populate({ path: 'reviews', populate: { path: 'author' } });
    if (!data) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render("./listings/show.ejs", { data });
};

module.exports.getListingEditForm = async (req, res) => {
    const data = await listing.findById(req.params.id);
    if (!data) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    let originalImageUrl = data.image.url;
    originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250');
    res.render("./listings/edit.ejs", { data , originalImageUrl });
};

module.exports.createListing = async (req, res) => {
    // Geocode the location using FREE OpenStreetMap
    const geoData = await geocoder.geocode(`${req.body.listing.location}, ${req.body.listing.country}`);
    
    // console.log(req.file);
    let { path, filename } = req.file;
    req.body.listing.image = { url:path, filename };
    const newListing = new listing(req.body.listing);
    
    // Store coordinates in GeoJSON format
    if (geoData && geoData.length > 0) {
        newListing.geometry = {
            type: 'Point',
            coordinates: [geoData[0].longitude, geoData[0].latitude]
        };
    }
    
    newListing.owner = req.user._id;
    await newListing.save();
    console.log(newListing);
    req.flash('success', 'Listing created successfully!');
    res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
    const id = req.params.id;
    
    // Geocode the location using FREE OpenStreetMap
    const geoData = await geocoder.geocode(`${req.body.listing.location}, ${req.body.listing.country}`);
    
    // console.log(req.file);
    if(typeof req.file !== 'undefined'){
    const {path,filename}=req.file;
    req.body.listing.image={url:path,filename};
    }
    const updatedListing = req.body.listing;
    
    // Update coordinates
    if (geoData && geoData.length > 0) {
        updatedListing.geometry = {
            type: 'Point',
            coordinates: [geoData[0].longitude, geoData[0].latitude]
        };
    }
    
    await listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const id = req.params.id;
    await listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect("/listings");
};
