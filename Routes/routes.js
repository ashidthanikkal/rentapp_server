const express=require('express')
const { register, login, bookcar, getUserCars, getBookingCar } = require('../Controllers/userControle')
const upload = require('../middlewares/multermiddleware')
const { addCars, getAdminCars } = require('../Controllers/adminControl')
// const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

//create an object for router
const router=new express.Router()


//register
router.post('/user/register',register)

//login
router.post('/user/login',login)

//admin add cars
router.post('/admin/add-car',upload.single('carimage'),addCars)

//admin view card
router.get('/admin/view-car',getAdminCars)

//user view card
router.get('/user/view-car',getUserCars)

//bookingss
router.get('/user/view-car/:id', getBookingCar);

module.exports=router

