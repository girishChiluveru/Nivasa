const express=require('express')
const app=express()
const mongoose=require('mongoose')
const MONGO_URL="mongodb://localhost:27017/wander-lust"
async function main(){
    await mongoose.connect(MONGO_URL)
}
const ejsMate=require('ejs-mate')
const path=require('path')
const methodOverride=require('method-override')

app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")))
const wrapAsync=require('./utils/wrapAsync.js');

const ExpressError = require('./utils/ExpressError.js');

const listingSchema=require('./Schema.js')
main()
.then(()=>{
    console.log("Connected")
}).catch((err)=>console.log(err))
const listing =require('./models/listings')
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

// app.get("/testListing",async(req,res)=>{
//     const doc=new listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Mumbai",
//         country:"India"
//     });
//     await doc.save();
//     console.log("saved")
//     res.send("saved")
// })
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

app.get("/",(req,res)=>res.send("working"))
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs")
})
app.get('/listings/:id',wrapAsync(async(req,res)=>{
    const data=await listing.findById(req.params.id)
    res.render("./listings/show.ejs",{data});
}))
app.get('/listings/:id/edit',wrapAsync(async(req,res)=>{
    let data =await listing.findById(req.params.id);
    res.render("./listings/edit.ejs",{data});
}))
app.get("/listings",wrapAsync(async(req,res)=>{
    const data= await listing.find({})
    res.render("./listings/index.ejs",{data})
}))

app.post("/listings",validateListing, wrapAsync(async (req, res, next) => {
    //   if (!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}))


app.put('/listings/:id',validateListing, wrapAsync(async (req,res)=>{
    if(!req.body.listings){
        throw new ExpressError(400,"Send valid data");
    }
    const newListing=req.body;
    const id=req.params.id;
    await listing.findByIdAndUpdate(id,newListing.listings)
    res.redirect(`/listings/${id}`);
}))
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    const id=req.params.id;
    await listing.findByIdAndDelete(id)
    res.redirect("/listings")
}))
// app.all('*',(req,res,next)=>{
//     next(new ExpressError(404,"page not found!!"));
// })
app.all('/*catchAll', (req, res, next) => {
    next(new ExpressError(404, "Page not found!!"));
});
app.use((err,req,res,next)=>{
    let {status=500, message="something error occured!"} =err;
    console.log("---Error---",status,message)
    res.status(status).render("error.ejs",{message});
})

app.listen(8080,(req,res)=>{
    console.log("listening at 8080 port")
})