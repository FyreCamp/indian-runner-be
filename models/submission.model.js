import mongoose from "mongoose";
import { challengeSports } from "./challenge.model";
const { Schema, model } = mongoose;

const submissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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

export default model("Submission", submissionSchema);
