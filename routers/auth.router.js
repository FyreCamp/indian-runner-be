import { Router } from "express";
const router = Router();

import {
  getStarted,
  verify,
  createProfile,
  login,
} from "../controllers/auth.controller";

router.post("/get-started", getStarted);
router.get("/verify", verify);
router.post("/profile", createProfile);
router.post("/login", login);

export default router;
