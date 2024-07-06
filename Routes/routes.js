const express=require('express')
const { register, login, getBookingCar, getCars, createBooking, editProfile, getUserBookings } = require('../Controllers/userControle')
const upload = require('../middlewares/multermiddleware')
const { addCars, viewUsers, editCar, deleteCar, getAllBookings, deleteAdminBookings} = require('../Controllers/adminControl')
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

//edit user profile
router.put('/user/edit-profile/:id',jwtMiddleware,upload.single('profile'),editProfile)

//view booking details for admin
router.get('/bookings',jwtMiddleware, getAllBookings);

//my bookings
router.get('/user-bookings/:id',jwtMiddleware,getUserBookings)

//delete admin/user bookings
router.delete('/delete-booking/:id',jwtMiddleware,deleteAdminBookings)




module.exports=router

