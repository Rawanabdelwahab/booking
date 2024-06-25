// import bookingModel from "../models/booking.js";
// import { getWeekDates } from "../controllers/booking.js";
// export const slot = async (req, res, next) => {
//   const { date, startTime, endTime, user,  } = req.body;
//   const { dayOfWeek } = getWeekDates(date);
//   const existingSlot = await bookingModel.findOne({
//     user: user,
//     dayOfWeek,
//     $or: [
//       { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // New slot starts before existing slot ends and ends after existing slot starts
//       { startTime: { $gte: startTime, $lte: endTime } }, // New slot starts during existing slot
//       { endTime: { $gte: startTime, $lte: endTime } }, // New slot ends during existing slot
//     ],
//   });

//   if (existingSlot) {
//     return res
//       .status(400)
//       .json({ error: "Time slot overlaps with an existing slot." });
//   }
//   next();
// };
