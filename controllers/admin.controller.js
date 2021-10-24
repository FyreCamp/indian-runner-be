import User from "../models/user.model";
import Challenge from "../models/challenge.model";
import Global from "../models/global.model";
import Leaderboard from "../models/leaderboard.model";

export const createGlobal = (req, res) => {
  console.log(req.file);
  new Global({ ...req.body })
    .save()
    .then((global) => {
      res.status(201).json(global);
    })
    .catch(({ errors }) => {
      res.status(400).json({ errors });
    });
};

export const listGlobals = async (req, res) => {
  try {
    const globals = await Global.find();
    res.json(globals);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getGlobal = async (req, res) => {
  try {
    const global = await Global.findById(req.params.id);
    res.status(200).json(global);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const updateGlobal = async (req, res) => {
  try {
    const global = await Global.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(global);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const deleteGlobal = async (req, res) => {
  try {
    const global = await Global.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Global deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createUser = (req, res) => {
  new User({ ...req.body, profilePic: req.files[0].location })
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(({ errors }) => {
      res.status(400).json({ errors });
    });
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createChallenge = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      } else {
        req.body[key] = JSON.parse(req.body[key]);
      }
    });
    const challenge = new Challenge({
      ...req.body,
      bannerImageWide: req.files.bannerImageWide[0].location,
      bannerImageSquare: req.files.bannerImageSquare[0].location,
    });
    const leaderboard = new Leaderboard({
      challenge: challenge._id,
    });
    challenge.leaderboard = leaderboard._id;
    await challenge.save();
    await leaderboard.save();
    res.status(200).json(challenge);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

export const listChallenge = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    res.status(200).json(challenge);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(challenge);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Challenge deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
