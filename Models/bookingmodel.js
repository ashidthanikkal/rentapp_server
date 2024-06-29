const mongoose=require('mongoose')


const bookingSchema=new mongoose.Schema({
userId:{
    type:String,
    required:true
},
carId:{
    type:String,
    required:true
},

bookedTimeSlot:{
    from:{
    type:String,
    required:true
    },
    to:{
    type:String,
    required:true
    }
},
days:{
    type:Number
},
totalamount:{
    type:Number
},
transactionId:{
    type:String
}

})

const bookings=mongoose.model("bookings",bookingSchema)
module.exports=bookings