const mongoose=require('mongoose')
async function main(){
    await mongoose.connect("mongodb://localhost:27017/wander-lust")
}
main()
.then(()=>{
    console.log("Connected")
}).catch((err)=>console.log(err))
const listing =require('../models/listings')
const initData=require('./data')
async function initDB(){
    await listing.deleteMany({})
    initData.data=initData.data.map((obj)=>{
        return {...obj,owner:"68fc9b389703e0c63159aa40"}
    })
    await listing.insertMany(initData.data)
    console.log("Cleared and added initData")
}
initDB();
