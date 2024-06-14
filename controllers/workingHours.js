import workingHoursModel from "../models/workingHours.js";
import moment from "moment";
export const post = async (req, res) => {
  const { date, startTime, endTime, user, repeating } = req.body;
  const { dayOfWeek } = getWeekDates(date);
  // console.log(dayOfWeek);
  const foundRepeating = await workingHoursModel
    .findOne({ dayOfWeek, startTime, endTime, repeating: true })
    .lean();
  if (foundRepeating) {
    console.log("Repeated");
  } else
    await workingHoursModel.create({
      dayOfWeek,
      date,
      startTime,
      endTime,
      user,
      repeating,
    });
  res.json();
};
export const edit = async (req, res) => {
  const id = req.params.id;
  const { date, startTime, endTime } = req.body;
  const user = req.body.user; //token
  let updatedUser = {};
  updatedUser.date = date;
  updatedUser.startTime = startTime;
  updatedUser.endTime = endTime;
  const updateOne = await workingHoursModel
    .updateOne({ _id: id, user: user._id }, updatedUser)
    .lean();
  res.json(updateOne);
};
// export const edit = async (req, res) => {
//     const id = req.params.id;
//     const { date, startTime, endTime, user } = req.body; // Assuming user is passed correctly in the request body
//     const updatedFields = { date, startTime, endTime };

//     try {
//         const updateResult = await workingHoursModel.updateOne({ "_id": id, user: user }, updatedFields);
//         res.json(updateResult);
//     } catch (error) {
//         console.error("Error updating document:", error);
//         res.status(500).json({ error: "Error updating document" });
//     }
// }

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  const user = req.body.user;
  const deletedData = await workingHoursModel.deleteOne({
    _id: id,
    user: user._id,
  });
  res.json(deletedData);
};
export const getWorkingHoursOfWeek = async (req, res) => {
  const { date, user, repeating } = req.body;

  // Determine the start and end dates of the week
  const { startDate, endDate } = getWeekDates(date);

  try {
    // Find all working hours for the week of the provided date
    const workingHours = await workingHoursModel.find({
      user: user,
      $or: [
        { date: { $gte: startDate, $lte: endDate } },
        { repeating: true, date: { $lte: startDate } },
      ],
    });
    res.json(workingHours);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getWorkingHoursOfAnyWeek = async (req, res) => {
  const { date, user } = req.body;
  const { startDate, endDate, dayOfWeek } = getWeekDates(date);
  //console.log({ "startDate=": startDate });
  try {
    // Find all working hours for the week of the provided date
    const workingHours = await workingHoursModel.find({
      user: user,
      dayOfWeek: { $eq: dayOfWeek },
      // date: { $gte: startDate, $lte: endDate },
    });

    res.json(workingHours);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export function getWeekDates(date) {
  const d = moment(date); // Convert the input date to a moment object
  const dayOfWeek = d.day(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const startDate = moment(d).startOf("week"); // Set to the first day of the week (Sunday)
  const endDate = moment(startDate).endOf("week"); // Set to the last day of the week (Saturday)
  return { startDate, endDate, dayOfWeek };
}
