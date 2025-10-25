const mongoose=require('mongoose');
const review = require('./reviews');
const Schema=mongoose.Schema
const listingSchema =new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1594179594534-9d826c107c10?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VtbWVyJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
        set:(v)=>v===""?"https://images.unsplash.com/photo-1594179594534-9d826c107c10?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VtbWVyJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D":v,
    },
    price:{
        type:Number,
        required:true,
    },
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review',
    }],
    owner: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
})
listingSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        });
    }
})
const listing=mongoose.model("listing",listingSchema)
module.exports=listing;