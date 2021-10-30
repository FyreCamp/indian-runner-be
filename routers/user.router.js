import { Router } from "express";
import {
  getChallenge,
  getInfo,
  getLeaderboard,
  listChallenges,
  registerToChallenge,
  submitData,
} from "../controllers/user.controller";
const router = Router();

router.get("/info", getInfo);

router.route("/challenges").get(listChallenges);

router.route("/challenges/:id").get(getChallenge);

router.post("challenge/:id/register", registerToChallenge);
router.post("challenge/:id/submit", submitData);
router.get("challenge/:id/leaderboard", getLeaderboard);

export default router;
