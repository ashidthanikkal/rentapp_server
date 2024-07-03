const jwt = require("jsonwebtoken")
const users = require("../Models/usermodel")
const cars = require("../Models/carmodel")
const bookings = require("../Models/bookingmodel")

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
exports.getCars = async(req, res) => {

    try {
        const Cars =await cars.find()
        if (Cars) {
            res.status(200).json(Cars)
        }
    }
    catch {
        res.status(400).json("get car api failed")
    }
}

//view specific card
exports.getBookingCar = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        const Car = await cars.findOne({ _id: id }); // Find the car by ID using findOne
        if (Car) {
            res.status(200).json(Car);
        } else {
            res.status(404).json({ message: "Car not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve car", error });
    }
};


//booking a car

const isDateOverlap = (date1, date2) => {
    const from1 = new Date(date1.from.split('/').reverse().join('-'));
    const to1 = new Date(date1.to.split('/').reverse().join('-'));
    const from2 = new Date(date2.from.split('/').reverse().join('-'));
    const to2 = new Date(date2.to.split('/').reverse().join('-'));

    return (from1 <= to2 && from2 <= to1);
};

exports.createBooking = async (req, res) => {
    try {
        const { bookedTimeSlot, days, totalAmount, transactionId } = req.body;
        const userId = req.payload; // Assuming payload contains userId
        const { carId } = req.params; // Extract carId from params

        const car = await cars.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check for conflicts
        const conflict = car.bookedTimeSlots.some(slot =>
            bookedTimeSlot.some(newSlot => isDateOverlap(newSlot, slot))
        );

        if (conflict) {
            return res.status(400).json({ message: 'Selected time slot is already booked' });
        }

        const newBooking = new bookings({
            userId,
            carId,
            bookedTimeSlot,
            days,
            totalAmount,
            transactionId
        });

        const savedBooking = await newBooking.save();

        // Update the car's booked time slots
        await cars.findByIdAndUpdate(
            carId,
            { $push: { bookedTimeSlots: { $each: bookedTimeSlot } } },
            { new: true }
        );

        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

