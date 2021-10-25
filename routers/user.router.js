import { Router } from "express";
import {
  getChallenge,
  getInfo,
  listChallenges,
} from "../controllers/user.controller";
const router = Router();

router.get("/info", getInfo);

router.route("/challenges").get(listChallenges);

router.route("/challenges/:id").get(getChallenge);

export default router;
