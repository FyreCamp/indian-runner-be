import { Router } from "express";
import {
  getChallenge,
  getInfo,
  getLeaderboard,
  listChallenges,
  listMyChallenges,
  registerToChallenge,
  submitData,
} from "../controllers/user.controller";
import { uploadProof } from "../services/s3.service";
const router = Router();

router.get("/info", getInfo);

router.route("/challenges").get(listChallenges);
router.route("/my-challenges").get(listMyChallenges);

router.route("/challenges/:id").get(getChallenge);

router.post("/challenges/:id/register", registerToChallenge);
router.post("/challenges/:id/submit", uploadProof("proof"), submitData);
router.get("/challenges/:id/leaderboard", getLeaderboard);

export default router;
