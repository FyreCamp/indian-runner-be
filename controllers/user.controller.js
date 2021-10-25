import Challenge from "../models/challenge.model";

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
