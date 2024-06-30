const express=require('express')
const { register, login, bookcar } = require('../Controllers/userControle')
const upload = require('../middlewares/multermiddleware')
const { addCars } = require('../Controllers/adminControl')

//create an object for router
const router=new express.Router()


//register
router.post('/user/register',register)

//login
router.post('/user/login',login)

//add cars
router.post('/admin/add-car',upload.single('carimage'),addCars)

//bookings
router.post('/user/booking',bookcar)

module.exports=router

