import bookingModel from "../models/booking.js";
export const appointmentBooking = async (req, res) => {
  const staffMember = req.body.user;
  const { date, startTime, endTime, service, price, duration } = req.body;
  const x = await bookingModel.create({
    date,
    startTime,
    endTime,
    service,
    price,
    duration,
    staffMember,
  });
  res.json(x);
};
