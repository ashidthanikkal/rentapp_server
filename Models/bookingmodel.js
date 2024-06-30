const mongoose=require('mongoose')


const bookingSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectID,
    ref:'users'
},
carId:{
    type:mongoose.Schema.TypesObjectID,
    ref:'cars'
},
bookedTimeSlot:[{
    from : {type : String },
    to:{type:String}
}],
days:{
    type:Number
},
totalamount:{
    type:Number
},
transactionId:{
    type:String
}
},
{timestamps : true}
)

const bookings=mongoose.model("bookings",bookingSchema)
module.exports=bookings