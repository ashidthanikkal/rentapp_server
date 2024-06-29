const mongoos=require('mongoose')


const bookingSchema=new mongoos.Schema({
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

const bookings=mongoos.model("bookings",bookingSchema)
module.exports=bookings