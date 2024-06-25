import bookingModel from "../models/booking.js";
import moment from "moment";

export const appointmentBooking = async (req, res) => {
  const { date, startTime, endTime, user, service, price, duration } = req.body;
  const { dayOfWeek } = getWeekDates(date);
  // console.log(dayOfWeek);
  const foundRepeating = await bookingModel
    .findOne({ dayOfWeek, startTime, endTime })
    .lean();
  if (foundRepeating) {
    console.log("Repeated");
  } else
    await bookingModel.create({
      dayOfWeek,
      date,
      startTime,
      endTime,
      user,
      service,
      price,
      duration,
    });
  res.json();
};
export function getWeekDates(date) {
  const d = moment(date); // Convert the input date to a moment object
  const dayOfWeek = d.day(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const startDate = moment(d).startOf("week"); // Set to the first day of the week (Sunday)
  const endDate = moment(startDate).endOf("week"); // Set to the last day of the week (Saturday)
  return { startDate, endDate, dayOfWeek };
}
