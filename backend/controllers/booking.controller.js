const Booking = require("../models/booking.model");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user.id,
      property: req.body.property,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullname")
      .populate("property");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};