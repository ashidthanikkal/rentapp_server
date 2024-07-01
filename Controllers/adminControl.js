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

exports.getAdminCars = async(req, res) => {

    try {
        const adminCars =await cars.find()
        if (adminCars) {
            res.status(200).json(adminCars)
        }
    }
    catch {
        res.status(400).json("get project api failed")
    }

}