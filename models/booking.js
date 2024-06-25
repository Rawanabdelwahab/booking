import { Schema, model, ObjectId } from "mongoose";
const booking = new Schema(
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
    },
    service: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dayOfWeek: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    // staffMember: {
    //   type: ObjectId,
    //   ref: "staff",
    //   required: true,
    // },
    user: {
      type: ObjectId,
      ref: "login",
      required: true,
    },
  },
  { timestamps: true }
);
export default model("booking", booking);
