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

router.post("challenges/:id/register", registerToChallenge);
router.post("challenges/:id/submit", submitData);
router.get("challenges/:id/leaderboard", getLeaderboard);

export default router;
