import Challenge from "../models/challenge.model";
import Submission from "../models/submission.model";

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
  const myChallenges = await User.find({ _id: req.user._id }).populate({
    path: "challenges",
    select: "name _id",
  });
  res.status(200).json({
    status: "success",
    data: {
      challenges: myChallenges.challenges,
    },
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
  const { user } = req;
  const challenge = await Challenge.findById(id);
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
  challenge.users.push(user._id);
  await challenge.save();
  const submission = new Submission({
    user: user._id,
    challenge: challenge._id,
    details: [],
    total: {
      distance: 0,
      time: 0,
      count: 0,
    },
  });
  await submission.save();
  res.status(200).json({
    status: "success",
    data: {
      challenge,
    },
    message: "You have registered to this challenge",
  });
};

export const submitData = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const submission = await Submission.findOne({
    user: user._id,
    challenge: id,
  });
  if (!submission) {
    return res.status(404).json({
      status: "fail",
      message: "Submission not found",
    });
  }
  const { details } = req.body;
  if (req.file) {
    details.proof = req.file.location;
  }
  submission.total.distance += details.distance;
  submission.total.time += details.timeTake;
  submission.total.count += details.count;
  submission.details.push(details);
  await submission.save();
  res.status(200).json({
    status: "success",
    data: {
      submission,
    },
  });
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
      path: "user",
      select: "name",
    });
  res.status(200).json({
    status: "success",
    data: {
      submissions,
    },
  });
};
