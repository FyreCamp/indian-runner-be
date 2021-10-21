import mongoose from "mongoose";
const { Schema, model } = mongoose;

const leaderboardSchema = new Schema({
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: false,
    default: [],
  },
});

export default model("Leaderboard", leaderboardSchema);
