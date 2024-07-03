const express=require('express')
const { register, login, getBookingCar, getCars, createBooking } = require('../Controllers/userControle')
const upload = require('../middlewares/multermiddleware')
const { addCars, viewUsers, editCar, deleteCar} = require('../Controllers/adminControl')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

//create an object for router
const router=new express.Router()


//register
router.post('/user/register',register)

//login
router.post('/user/login',login)

//admin add cars
router.post('/admin/add-car',jwtMiddleware,upload.single('carimage'),addCars)

// view car user and admin
router.get('/view-car',getCars)

//view single car for booking
router.get('/view-car/:id', getBookingCar);

//view users for admin
router.get('/view-users',viewUsers)

//createBooking
router.post('/booking/:carId',jwtMiddleware,createBooking);

//edit car details

router.put('/admin/edit-car/:id',jwtMiddleware,upload.single('carimage'),editCar)

//delete car

router.delete('/admin/delete-car/:id',jwtMiddleware,deleteCar)


module.exports=router

