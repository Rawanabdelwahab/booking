import bookingModel from "../models/booking.js";
import { getDates } from "../controllers/booking.js";
export const slotBooking = async (req, res, next) => {
    const {
      date,
      startTime,
      endTime,
      user,
      service,
      price,
      duration,
      staffMember,
    } = req.body;
    const { dayOfWeek } = getDates(date);
    const existingSlot = await bookingModel.findOne({
      user: user,
      staffMember: staffMember,
      service:service,
      price: price,
      duration: duration,
      dayOfWeek,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // New slot starts before existing slot ends and ends after existing slot starts
        { startTime: { $gte: startTime, $lte: endTime } }, // New slot starts during existing slot
        { endTime: { $gte: startTime, $lte: endTime } }, // New slot ends during existing slot
      ],
    });
  
    if (existingSlot) {
      return res
        .status(500)
        .json({ error: "Time slot overlaps with an existing slot." });
    }
    next();
  };
  