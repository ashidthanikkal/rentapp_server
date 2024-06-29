const mongoose=require('mongoose')

const carSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rentamount:{
        type:Number,
        required:true
    },
    milage:{
        type:Number,
        required:true
    },
    seat:{
        type:Number,
        required:true
    },
    cartype:{
        type:String,
        required:true
    },
    carimage:{
        type:String,
        required:true
    }

})

const cars=mongoose.model("cars",carSchema)
module.exports=cars