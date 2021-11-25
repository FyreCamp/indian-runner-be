import mongoose from "mongoose";
const { Schema, model } = mongoose;

const targetSchema = new Schema({
  distance: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
});

const totalSchema = new Schema({
  distance: {
    type: Number,
    default: 0,
  },
});

const userSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activities: {
    type: [Schema.Types.ObjectId],
    ref: "Submission",
    default: [],
  },
  targetRegistered: {
    type: targetSchema,
    required: true,
  },
  total: {
    type: totalSchema,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const DailyKnockoutSchema = new Schema({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  user: {
    type: [userSchema],
    default: [],
  },
  targets: {
    type: [targetSchema],
    default: [],
  },
});

export default model("DailyKnockout", DailyKnockoutSchema);
