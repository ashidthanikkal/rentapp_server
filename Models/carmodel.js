const mongoos=require('mongoose')

const carSchema=new mongoos.Schema({
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

const cars=mongoos.model("cars",carSchema)
module.exports=cars