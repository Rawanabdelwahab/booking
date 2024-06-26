import bookingModel from "../models/booking.js";
import { getWeekDates } from "../controllers/booking.js";
export const slot = async (req, res, next) => {
  const { date, startTime, endTime, user } = req.body;
  const { dayOfWeek } = getWeekDates(date);
  const existingSlot = await bookingModel
    .findOne({
      user: user,
      dayOfWeek,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    })
    .lean();

  if (existingSlot) {
    return res
      .status(400)
      .json({ error: "Time slot overlaps with an existing slot." });
  }
  next();
};
