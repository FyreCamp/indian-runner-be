import User from "../models/user.model";
import Challenge, { challengeModes } from "../models/challenge.model";
import Global from "../models/global.model";
// import Leaderboard from "../models/leaderboard.model";
import Faq from "../models/faq.model";
import maxDistanceModel from "../models/challengeTypes/max-distance.model";
import moveEverydayModel from "../models/challengeTypes/move-everyday.model";
import raceModel from "../models/challengeTypes/race.model";
import fixedTotalModel from "../models/challengeTypes/fixed-total.model";
import hourlyKnockoutModel from "../models/challengeTypes/hourly-knockout.model";
import dailyKnockoutModel from "../models/challengeTypes/daily-knockout.model";
import spartanModel from "../models/challengeTypes/spartan.model";

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
      } else if (
        (req.body[key].includes("[") && req.body[key].includes("]")) ||
        (req.body[key].includes("{") && req.body[key].includes("}"))
      ) {
        req.body[key] = JSON.parse(req.body[key]);
      }
    });
    const challenge = new Challenge({
      ...req.body,
      bannerImageWide: req.files.bannerImageWide[0].location,
      bannerImageSquare: req.files.bannerImageSquare[0].location,
    });
    let challengeTypeObj;

    switch (req.body.challengeMode) {
      case challengeModes[0]:
        challengeTypeObj = new maxDistanceModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.maxDistance = challengeTypeObj._id;
        break;
      case challengeModes[1]:
        challengeTypeObj = new moveEverydayModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.moveEveryday = challengeTypeObj._id;
        break;
      case challengeModes[2]:
        challengeTypeObj = new raceModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.race = challengeTypeObj._id;
        break;
      case challengeModes[3]:
        challengeTypeObj = new fixedTotalModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.fixedTotal = challengeTypeObj._id;
        break;
      case challengeModes[4]:
        challengeTypeObj = new hourlyKnockoutModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.hourlyKnockout = challengeTypeObj._id;
        break;
      case challengeModes[5]:
        challengeTypeObj = new dailyKnockoutModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.dailyKnockout = challengeTypeObj._id;
        break;
      case challengeModes[6]:
        challengeTypeObj = new spartanModel({
          challenge: challenge._id,
          targets: req.body.targets,
        });
        challenge.spartan = challengeTypeObj._id;
        break;
      default:
        throw new Error("Invalid challenge type.");
    }
    await challengeTypeObj.save();
    await challenge.save();
    res.status(200).json(challenge);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
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

export const createFaqs = async (req, res) => {
  try {
    const faqs = new Faq({ ...req.body });
    await faqs.save();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

export const editFaqs = async (req, res) => {
  try {
    const faqs = await Faq.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(faqs);
  } catch (err) {
    res.status(404).json({ errors: err });
  }
};

export const deleteFaqs = async (req, res) => {
  try {
    const faqs = await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Faqs deleted" });
  } catch (err) {
    res.status(404).json({ errors: err });
  }
};
