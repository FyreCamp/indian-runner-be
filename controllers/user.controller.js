import Challenge from "../models/challenge.model";
import Submission from "../models/submission.model";
import User from "../models/user.model";

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
  const { user } = req;
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
  const submission = new Submission({
    userId: user._id,
    challenge: challenge._id,
    details: [],
    total: {
      distance: 0,
      time: 0,
      count: 0,
    },
  });
  challenge.users.push(user._id);
  userObject.challenges.push(id);
  await userObject.save();
  await challenge.save();
  await submission.save();
  return res.status(200).json({
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
  try {
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
    submission.total.distance += Number(details.distance);
    submission.total.time += Number(details.timeTake);
    submission.total.count += Number(details.count);
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
