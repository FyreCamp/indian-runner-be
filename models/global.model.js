import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GlobaSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
GlobaSchema.set("toJSON", {
  virtuals: true,
});

export default model("Global", GlobaSchema);
