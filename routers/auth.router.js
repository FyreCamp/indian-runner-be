import { Router } from "express";
const router = Router();

import {
  getStarted,
  verify,
  createProfile,
  login,
  check,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

import { uploadProfilePic } from "../services/s3.service";

router.post("/get-started", getStarted);
router.get("/verify", verify);
router.post("/profile", createProfile);
router.post(
  "/profile/:id/image",
  uploadProfilePic.array("profile", 1),
  createProfile
);
router.post("/login", login);
router.get("/check", isAuthenticated, check);

export default router;
