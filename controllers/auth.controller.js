import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmailVerification } from "../services/email.service";
import { customAlphabet } from "nanoid";
import { MEMBERSHIP_TIER, CLUB } from "../utils/constants";
import User from "../models/user.model";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 12);

export const getStarted = (req, res) => {
  const { email } = req.body;
  const token = jwt.sign(
    { email, id: mongoose.Types.ObjectId() },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  sendEmailVerification(email, token);
  res.json({ email });
};

export const verify = (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      ...decoded,
      fpno: nanoid(),
      club: CLUB.find((c) => c.id == 1),
      membershipTier: MEMBERSHIP_TIER.find((m) => m.id == 10),
    });
  } catch (error) {
    res.json({ error });
  }
};

export const createProfile = (req, res) => {
  new User(req.body)
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch(({ errors }) => {
      res.json({ errors });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ error: "Invalid email" });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ error: "Invalid password" });
        } else {
          const token = jwt.sign(
            { email, id: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.json({ token });
        }
      });
    })
    .catch(({ errors }) => {
      return res.json({ errors });
    });
};
