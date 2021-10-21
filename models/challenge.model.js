import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const challengeTypes = ["OPEN", "CORPORATE"];
export const challengeModes = [
  "OPEN_CHALLENGE",
  "MOVE_DAILY",
  "RACE",
  "FIXED_TARGET",
];
export const challengeSports = [
  "RUN",
  "RIDE",
  "SWIM",
  "WALK",
  "WORKOUT",
  "DUATHLON",
  "TRIATHLON",
];

export const challengeTags = [
  "CHALLENGE",
  "EVENT",
  "LIMITED_TIME",
  "LIMITED_DISTANCE",
];

export const displayCategories = [
  "ANNUAL",
  "RUN",
  "RIDE",
  "SWIM",
  "WALK",
  "WORKOUT",
  "MONTHLY",
  "FREE",
  "1_DAY",
];

export const challengeRewards = [
  "BADGE",
  "E_CERTIFICATE",
  "MEDAL",
  "TROPHY",
  "T_SHIRT",
];

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  registrationStartDate: {
    type: Date,
    required: true,
  },
  registrationEndDate: {
    type: Date,
    required: true,
  },
  challengeStartDate: {
    type: Date,
    required: true,
  },
  challengeEndDate: {
    type: Date,
    required: true,
  },
  lastDateSubmission: {
    type: Date,
    required: true,
  },
  finalLeaderboardDate: {
    type: Date,
    required: true,
  },
  eCertificateDate: {
    type: Date,
    required: true,
  },
  trophyDisplayDate: {
    type: Date,
    required: true,
  },
  trophyDispatchDate: {
    type: Date,
    required: true,
  },
  bibNumber: {
    type: String,
    required: true,
  },
  challengeType: {
    type: String,
    enum: challengeTypes,
    required: true,
  },
  challengeMode: {
    type: String,
    enum: challengeModes,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  bannerImageWide: {
    type: String,
    required: true,
  },
  bannerImageSquare: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: displayCategories,
    required: true,
  },
  tags: {
    type: [String],
    enum: challengeTags,
    required: false,
  },
  sport: {
    type: String,
    enum: challengeSports,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  targetUnit: {
    type: String,
    required: true,
    default: "KM",
  },
  leaderboardId: {
    type: Schema.Types.ObjectId,
    ref: "Leaderboard",
    required: true,
  },
});

challengeSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Challenge", challengeSchema);
