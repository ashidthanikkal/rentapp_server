const express=require('express')
const { register } = require('../Controllers/userControle')

//create an object for router
const router=new express.Router()


//register
router.post('/user/register',register)


module.exports=router

