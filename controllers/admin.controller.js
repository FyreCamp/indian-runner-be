import User from "../models/user.model";

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
