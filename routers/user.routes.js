import { Router } from "express";
import { getInfo } from "../controllers/user.controller";
const router = Router();

router.get("/", getInfo);

export default router;
