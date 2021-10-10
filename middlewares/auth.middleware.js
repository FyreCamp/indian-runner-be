import jwt from "jsonwebtoken";
import User from "../models/user.model";
export const isAuthenticated = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(500).send({ auth: false, message: "No user found." });
    }
    req.user = user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      status: 401,
      error: "You are not an admin",
    });
  }
  next();
};
