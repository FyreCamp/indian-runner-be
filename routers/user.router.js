import { Router } from "express";
import { getInfo, listChallenges } from "../controllers/user.controller";
const router = Router();

router.get("/info", getInfo);

router.route("/challenges").get(listChallenges);

export default router;
