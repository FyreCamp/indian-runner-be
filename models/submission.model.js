import mongoose from "mongoose";
import { challengeSports } from "./challenge.model";
const { Schema, model } = mongoose;

const userTotal = new Schema({
  distance: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
});

const submissionDetails = new Schema({
  sport: {
    type: String,
    enum: challengeSports,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  timeTake: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const submissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: {
    type: [submissionDetails],
    required: true,
    default: [],
  },
  total: {
    type: userTotal,
    required: true,
  },
});

export default model("Submission", submissionSchema);
