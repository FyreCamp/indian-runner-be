import { Router } from "express";
const router = Router();

import {
  getStarted,
  verify,
  createProfile,
  login,
} from "../controllers/auth.controller";

import { uploadProfilePic } from "../services/s3.service";

router.post("/get-started", getStarted);
router.get("/verify", verify);
router.post("/profile", uploadProfilePic.array("profile", 1), createProfile);
router.post("/login", login);

export default router;
