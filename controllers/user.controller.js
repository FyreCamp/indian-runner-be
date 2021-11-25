import Challenge, { challengeTypes } from "../models/challenge.model";
import Submission from "../models/submission.model";
import User from "../models/user.model";
import maxDistanceModel from "../models/challengeTypes/max-distance.model";
import moveEverydayModel from "../models/challengeTypes/move-everyday.model";
import raceModel from "../models/challengeTypes/race.model";
import fixedTotalModel from "../models/challengeTypes/fixed-total.model";
import hourlyKnockoutModel from "../models/challengeTypes/hourly-knockout.model";
import dailyKnockoutModel from "../models/challengeTypes/daily-knockout.model";
import spartanModel from "../models/challengeTypes/spartan.model";

export const getInfo = (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

export const listChallenges = async (req, res) => {
  const challenges = await Challenge.find({});
  res.status(200).json({
    status: "success",
    data: {
      challenges,
    },
  });
};

export const listMyChallenges = async (req, res) => {
  const myChallenges = await User.find({ _id: req.user._id })
    .select("challenges")
    .populate({
      path: "challenges",
      select: "name _id",
    });
  res.status(200).json({
    status: "success",
    data: myChallenges,
  });
};

export const getChallenge = async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findById(id);
  if (!challenge) {
    return res.status(404).json({
      status: "fail",
      message: "Challenge not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      challenge,
    },
  });
};

export const registerToChallenge = async (req, res) => {
  const { id } = req.params;
  const { user, level } = req;
  const challenge = await Challenge.findById(id);
  const userObject = await User.findById(user._id);
  if (!challenge) {
    return res.status(404).json({
      status: "fail",
      message: "Challenge not found",
    });
  }
  if (challenge.users.includes(user._id)) {
    return res.status(400).json({
      status: "fail",
      message: "You are already registered to this challenge",
    });
  }
  let challengeTypeObj;
  switch (challenge.challengeType) {
    case challengeTypes[0]:
      challengeTypeObj = await maxDistanceModel.findOne({
        challenge: challenge._id,
      });
      break;
    case challengeTypes[1]:
      challengeTypeObj = await moveEverydayModel.findOne({
        challenge: challenge._id,
      });
      break;
    case challengeTypes[2]:
      challengeTypeObj = await raceModel.findOne({
        challenge: challenge._id,
      });
      break;
    case challengeTypes[3]:
      challengeTypeObj = await fixedTotalModel.findOne({
        challenge: challenge._id,
      });
      break;
    case challengeTypes[4]:
      challengeTypeObj = await hourlyKnockoutModel.findOne({
        challenge: challenge._id,
      });
      break;
    case challengeTypes[5]:
      challengeTypeObj = await dailyKnockoutModel.findOne({
        challenge: challenge._id,
      });
      break;
    case challengeTypes[6]:
      challengeTypeObj = await spartanModel.findOne({
        challenge: challenge._id,
      });
      break;
    default:
      return res.status(400).json({
        status: "fail",
        message: "Invalid Challenge Type",
      });
  }
  challengeTypeObj.user.push({
    userId: user._id,
    targetRegistered: level,
  });
  challenge.users.push(user._id);
  userObject.challenges.push(id);
  await userObject.save();
  await challenge.save();
  await challengeTypeObj.save();
  return res.status(200).json({
    status: "success",
    data: {
      challenge,
    },
    message: "You have registered to this challenge",
  });
};

export const submitData = async (req, res) => {
  const { user } = req;
  try {
    const submission = await Submission.findOne({
      user: user._id,
    });
    if (!submission) {
      return res.status(404).json({
        status: "fail",
        message: "Submission not found",
      });
    }
    console.log(req.body);
    const details = {
      distance: req.body.distance || 0,
      timeTake: req.body.timeTaken || 0,
      count: req.body.count || 0,
      sport: req.body.sport,
      date: req.body.date,
      proof: req.body.proof || null,
    };

    if (req.file) {
      details.proof = req.file.location;
    }
    submission.details.push(details);
    await submission.save();
    res.status(200).json({
      status: "success",
      data: {
        submission,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

export const getLeaderboard = async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findById(id);
  if (!challenge) {
    return res.status(404).json({
      status: "fail",
      message: "Challenge not found",
    });
  }
  const submissions = await Submission.find({ challenge: challenge._id })
    .sort([
      ["total.distance", "descending"],
      ["total.time", "ascending"],
    ])
    .populate({
      path: "userId",
      select: "firstName lastName middleName fpNo email mobile",
    });
  res.status(200).json({
    status: "success",
    data: {
      submissions,
    },
  });
};
