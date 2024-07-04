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
        // const conflict = car.bookedTimeSlots.some(slot =>
        //     bookedTimeSlot.some(newSlot => isDateOverlap(newSlot, slot))
        // );

        // if (conflict) {
        //     return res.status(400).json({ message: 'Selected time slot is already booked' });
        // }

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
        // await cars.findByIdAndUpdate(
        //     carId,
        //     { $push: { bookedTimeSlots: { $each: bookedTimeSlot } } },
        //     { new: true }
        // );

        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

//edit user profile

exports.editProfile = async (req, res) => {
    const { username, phone, license } = req.body;
    const { id } = req.params; // changed from _id to id
    const newProfile = req.file ? req.file.filename : req.body.profile; // fixed profile assignment from req.body

    try {
        const user = await users.findById(id); // changed findOne to findById

        if (user) {
            user.username = username;
            user.phone = phone;
            user.license = license;
            user.profile = newProfile;

            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//my bookings

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find bookings associated with the userId
        const Booking = await bookings.find({ userId }).populate('carId');

        // Check if any bookings were found
        if (!Booking || Booking.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the specified user ID.' });
        }

        // Transform the bookings to include the desired fields
        const bookingDetails = Booking.map(booking => ({
            bookingId:booking._id,
            title: booking.carId.title,
            rentamount: booking.carId.rentamount,
            days: booking.days,
            totalAmount: booking.totalAmount,
            bookedTimeSlot: booking.bookedTimeSlot,
            timestamp: booking.createdAt
        }));

        // Respond with the transformed booking details
        res.status(200).json(bookingDetails);
    } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({ message: 'Server error' });
    }
}