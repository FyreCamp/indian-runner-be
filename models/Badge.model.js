import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BadgeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  challenges: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

export default model("Badge", BadgeSchema);
