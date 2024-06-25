import bookingModel from "../models/booking.js";
import moment from "moment";
export const appointmentBooking = async (req, res) => {
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
  // console.log(dayOfWeek);
  const foundRepeating = await bookingModel
    .findOne({
      dayOfWeek,
      startTime,
      endTime,
      service,
      price,
      duration,
      user,
      staffMember,
    })
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
      staffMember,
    });
    
  res.json();
};
export function getDates(date) {
  const d = moment(date); // Convert the input date to a moment object
  const dayOfWeek = d.day(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const startDate = moment(d).startOf("week"); // Set to the first day of the week (Sunday)
  const endDate = moment(startDate).endOf("week"); // Set to the last day of the week (Saturday)
  return { startDate, endDate, dayOfWeek };
}
