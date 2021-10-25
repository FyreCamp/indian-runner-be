import mongoose from "mongoose";
const { Schema, model } = mongoose;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  texts: {
    type: [String],
    required: true,
  },
});

const FaqSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: [contentSchema],
    required: true,
  },
});

FaqSchema.set("toJSON", {
  virtuals: true,
});

export default model("Faq", FaqSchema);
