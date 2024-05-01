import workingHoursModel from "../models/workingHours.js";
export const post = async (req, res) => {
    const { date, startTime, endTime, user } = req.body
    const { dayOfWeek } = getWeekDates(date)
    const foundRepeating = await workingHoursModel.findOne({ dayOfWeek, startTime, endTime, repeating: { $ne: true } }).lean()
    if (foundRepeating) {
        console.log("Repeated")
    }
    else
    await workingHoursModel.create({ date, startTime, endTime, user })
    res.json()

}
export const edit = async (req, res) => {
    const id = req.params.id
    const { date, startTime, endTime } = req.body
    const user = req.body.user; //token
    let updatedUser = {}
    updatedUser.date = date
    updatedUser.startTime = startTime
    updatedUser.endTime = endTime
    const updateOne = await workingHoursModel.updateOne({ "_id": id, user: user._id }, updatedUser).lean()
    res.json(updateOne);
}
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
    const id = req.params.id
    const user = req.body.user;
    const deletedData = await workingHoursModel.deleteOne({ "_id": id, user: user._id })
    res.json(deletedData);
}
export const getWorkingHoursOfWeek = async (req, res) => {
    const { date, user } = req.body;

    // Determine the start and end dates of the week
    const { startDate, endDate } = getWeekDates(date);

    try {
        // Find all working hours for the week of the provided date
        const workingHours = await workingHoursModel.find({
            user: user,
            date: { $gte: startDate, $lte: endDate }
        });

        res.json(workingHours);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
function getWeekDates(date) {
    const d = new Date(date);  //the input date
   // console.log({ "d=": d })
    const dayOfWeek = d.getDay(); // 0 (Sunday) to 6 (Saturday)   choose the day
   // console.log({ "dayOfWeek=": dayOfWeek })
    const startDate = new Date(d); // Copy the provided date  
   // console.log({ "startDate=": startDate })
    startDate.setDate(d.getDate() - dayOfWeek); // Set to the first day of the  week (Sunday)   if d=2   2-2
    //console.log({ "startDate=": startDate })
    const endDate = new Date(startDate); // Copy the start date
    //console.log({ "endDate=": endDate })
    endDate.setDate(startDate.getDate() + 6); // Set to the last day of the week (Saturday)
    return { startDate, endDate };
}
