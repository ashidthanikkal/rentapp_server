const bookings = require("../Models/bookingmodel")
const cars = require("../Models/carmodel")
const users = require("../Models/usermodel")


//admin add car
exports.addCars = async (req, res) => {
    const { title, rentamount, milage, seat, cartype } = req.body
    //image access from multer
    const carimage = req.file?.filename

    // access userId from request payload bcz this logic contain jwtmiddleware
    const userId = req.payload

    const newCars = new cars({
        title, rentamount, milage, seat, cartype, carimage, userId
    })

    await newCars.save()
    res.status(201).json(newCars)
}

//admin edit car
exports.editCar = async (req, res) => {
    const { id } = req.params;
    const { title, rentamount, milage, seat, cartype, carimage } = req.body;
    const newCarimage = req.file ? req.file.filename : carimage;
    const userId = req.payload;

    try {
        const updatedCars = await cars.findByIdAndUpdate(
            id,
            { title, rentamount, milage, seat, cartype, carimage: newCarimage, userId },
            { new: true }
        );
        if (!updatedCars) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json(updatedCars);
    } catch (error) {
        res.status(500).json({ message: "Error updating car", error });
    }
};

//admin delete car
exports.deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCar = await cars.findByIdAndDelete(id)
        res.status(200).json(deletedCar)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

//admin view users
exports.viewUsers = async (req, res) => {

    try {
        const Users = await users.find({ role: 'user' })
        if (Users) {
            res.status(200).json(Users)
        }
    }
    catch(error) {
        res.status(400).json(error)
    }
}


//admin view bookings
exports.getAllBookings = async (req, res) => {
    try {
      const Bookings = await bookings.find({})
        .populate('userId', 'username phone')
        .populate('carId', 'title rentamount');
  
      const bookingDetails = Bookings.map(booking => {
        // Check if userId and carId are not null
        const user = booking.userId || {};
        const car = booking.carId || {};
        
        return {
          username: user.username || 'N/A',
          phone: user.phone || 'N/A',
          carTitle: car.title || 'N/A',
          rentPerDay: car.rentamount || 'N/A',
          transactionId: booking.transactionId,
          from: booking.bookedTimeSlot.map(slot => slot.from).join(', '),
          to: booking.bookedTimeSlot.map(slot => slot.to).join(', '),
          days: booking.days,
          totalAmount: booking.totalAmount
        };
      });
  
      res.status(200).json(bookingDetails);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  };
  
    