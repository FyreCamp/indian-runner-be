import { Router } from "express";
const router = Router();

import { getStarted } from "../controllers/auth.controller";

router.post("/get-started", getStarted);

export default router;
