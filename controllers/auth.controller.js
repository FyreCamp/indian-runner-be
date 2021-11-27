import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmailVerification } from "../services/email.service";
import { MEMBERSHIP_TIER, CLUB, getFPNo } from "../utils/constants";
import User from "../models/user.model";

export const getStarted = async (req, res) => {
  const { email } = req.body;
  const fpNo = await getFPNo();
  const token = jwt.sign(
    {
      email,
      id: mongoose.Types.ObjectId(),
      fpno: fpNo,
      club: CLUB.find((c) => c.id == 1),
      membershipTier: MEMBERSHIP_TIER.find((m) => m.id == 10),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  console.log(token);
  sendEmailVerification(email, token);
  res.status(200).json({ message: "Email sent" });
};

export const verify = (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      ...decoded,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createProfile = (req, res) => {
  new User({ ...req.body })
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(({ errors }) => {
      res.status(400).json({ errors });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "Invalid email" });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ error: "Invalid password" });
        } else {
          const token = jwt.sign(
            { email, id: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          return res.status(200).json({ token });
        }
      });
    })
    .catch(({ errors }) => {
      return res.json({ errors });
    });
};

export const setProfilePic = (req, res) => {
  if (!req.files) return res.status(400).json({ errors: ["No file uploaded"] });
  const { id } = req.params;
  User.findByIdAndUpdate(id, { profilePic: req.files[0].location })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(({ errors }) => {
      res.status(400).json({ errors });
    });
};

export const check = (req, res) => {
  return res.status(200).json({ auth: true, message: "user logged in" });
}
