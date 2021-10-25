import { Router } from "express";
import { listFaqs } from "../controllers/global.controller";
const router = Router();

router.get("/faqs", listFaqs);

export default router;
