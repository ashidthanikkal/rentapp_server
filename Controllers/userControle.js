const jwt = require("jsonwebtoken")
const users = require("../Models/usermodel")
const cars = require("../Models/carmodel")

//registerlogic
exports.register = async (req, res) => {
    var { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("Already registerd..! Please login")
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                profile: "",
                phone: "",
                license: ""
            })
            await newUser.save()
            res.status(201).json("Account created successfully!")

        }
    }
    catch {
        res.status(400).json("register api failed!")
    }

}

//login

exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await users.findOne({ email, password })
        if (user) {
            //token generation
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
            res.status(200).json({
                user,
                message: "Login success..!",
                token,
                role:user.role
            })
        }
        else {
            res.status(401).json("Incorrect email or password..!")
        }
    }
    catch {
        res.status(400).json("Login api failed..!")

    }

}

//view user car
exports.getUserCars = async(req, res) => {

    try {
        const userCars =await cars.find()
        if (userCars) {
            res.status(200).json(userCars)
        }
    }
    catch {
        res.status(400).json("get project api failed")
    }
}
//view specific card
exports.getBookingCar = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        const car = await cars.findById(id); // Find the car by ID
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: "Car not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve car", error });
    }
};



//booking a car

exports.bookcar = async (req, res) => {
    req.body.transactionId = '1234'
    const newbooking = new Booking(req.body)
    await newbooking.save
    res.status(200).json('Your booking is successfull')
}



