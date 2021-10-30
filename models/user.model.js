import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, required: false, trim: true },
  lastName: { type: String, required: true, trim: true },
  countryCode: { type: String, required: true, trim: true, default: "+91" },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  profilePic: { type: String, required: false, trim: true },
  gender: { type: String, required: true },
  alternateMobile: { type: String, required: false },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  anniversary: {
    type: Date,
    required: false,
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: false,
    trim: true,
  },
  height: {
    type: String,
    required: false,
    trim: true,
  },
  weight: {
    type: String,
    required: false,
    trim: true,
  },
  company: {
    type: String,
    required: false,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  fpNo: {
    type: String,
    required: true,
    trim: true,
  },
  membershipTier: {
    type: String,
    required: true,
    trim: true,
  },
  club: {
    type: String,
    required: true,
    trim: true,
  },
  challenges: {
    type: [Schema.Types.ObjectId],
    ref: "Challenge",
    required: false,
  },
});

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model("User", UserSchema);
