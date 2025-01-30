const mongoose = require('mongoose');
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'tiur must bu name'],
        unique:true
    },
    duration:{
        type:String,
        required:[true,' A tour must have a difficulty']
    },
    ratingAverage:{
        type:Number,
        default:4.5
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true,'tour must have price']
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim:true,
        required:[true,' a tour must have a description']
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true,'a tour must have cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDate:[Date]
    }
);
const Tour= mongoose.model('Tour',tourSchema)
module.exports=Tour;