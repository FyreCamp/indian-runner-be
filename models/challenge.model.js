import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const challengeTypes = ["OPEN", "CORPORATE"];
export const challengeModes = [
  "OPEN_CHALLENGE",
  "MOVE_DAILY",
  "RACE",
  "FIXED_TOTAL",
  "HOURLY_KNOCKOUT",
  "DAILY_KNOCKOUT",
  "SPARTAN",
  "LEAGUE",
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

const descriptionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: [String],
    required: true,
  },
});

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: [descriptionSchema],
    required: true,
  },
  brief: {
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
  categories: {
    type: [String],
    enum: displayCategories,
    required: true,
  },
  tags: {
    type: [String],
    enum: challengeTags,
    required: false,
  },
  rewards: {
    type: [String],
    enum: challengeRewards,
    default: ["BADGE"],
  },
  sport: {
    type: String,
    enum: challengeSports,
    required: true,
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  rules: {
    type: [String],
    required: true,
  },
  maxDistance: {
    type: Schema.Types.ObjectId,
    ref: "MaxDistance",
  },
  MoveEveryday: {
    type: Schema.Types.ObjectId,
    ref: "MoveEveryday",
  },
  Race: {
    type: Schema.Types.ObjectId,
    ref: "Race",
  },
  FixedTotal: {
    type: Schema.Types.ObjectId,
    ref: "FixedTotal",
  },
  HourlyKnockout: {
    type: Schema.Types.ObjectId,
    ref: "HourlyKnockout",
  },
  DailyKnockout: {
    type: Schema.Types.ObjectId,
    ref: "DailyKnockout",
  },
  Spartan: {
    type: Schema.Types.ObjectId,
    ref: "Spartan",
  },
});

challengeSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Challenge", challengeSchema);
