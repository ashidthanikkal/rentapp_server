const cars = require("../Models/carmodel")

exports.addCars = (req, res) => {
    const { title, rentamount, milage, seat, cartype } = req.body
    //image access from multer
    const carimage = req.file?.filename

    const newCars = new cars({
        title, rentamount, milage, seat, cartype, carimage
    })
    newCars.save()
    res.status(201).json(newCars)
}