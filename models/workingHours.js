import { Schema, model, ObjectId } from "mongoose";
const workingHours = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
      // unique:true
    },

    repeating: {
      type: Boolean,
      default: false,
    },
    dayOfWeek: {
      type: Number,
      required: true,
    },
    // adminId: {
    //     type: ObjectId,
    //     ref: 'login',
    //     required: true
    // },
    user: {
      type: ObjectId,
      ref: "login",
      required: true,
    },
  },
  { timestamps: true }
);
export default model("workingHours", workingHours);
