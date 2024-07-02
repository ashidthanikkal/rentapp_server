const cars = require("../Models/carmodel")
const users = require("../Models/usermodel")

exports.addCars = async(req, res) => {
    const { title, rentamount, milage, seat, cartype } = req.body
    //image access from multer
    const carimage = req.file?.filename

    // access userId from request payload bcz this logic contain jwtmiddleware
    const userId=req.payload

    const newCars = new cars({
        title, rentamount, milage, seat, cartype, carimage,userId
    })

    await newCars.save()
    res.status(201).json(newCars)
}

exports.viewUsers = async(req, res) => {

    try {
        const Users =await users.find({ role:'user' })
        if (Users) {
            res.status(200).json(Users)
        }
    }
    catch {
        res.status(400).json("get users api failed")
    }
}
