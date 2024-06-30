const jwt = require("jsonwebtoken")
const users = require("../Models/usermodel")

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


//booking a car

exports.bookcar = async (req, res) => {
    req.body.transactionId = '1234'
    const newbooking = new Booking(req.body)
    await newbooking.save
    res.status(200).json('Your booking is successfull')
}

