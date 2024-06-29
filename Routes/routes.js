const express=require('express')
const { register, login } = require('../Controllers/userControle')

//create an object for router
const router=new express.Router()


//register
router.post('/user/register',register)

//login
router.post('/user/login',login)

module.exports=router

