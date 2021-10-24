import { Router } from "express";
import { getInfo } from "../controllers/user.controller";
const router = Router();

router.get("/info", getInfo);

export default router;
