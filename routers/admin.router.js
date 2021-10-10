import { Router } from "express";
const router = Router();

import { listUsers } from "../controllers/admin.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware";

router.route("/").get(isAuthenticated, isAdmin, listUsers);
// router
//   .route("/:id")
//   .get(isAuthenticated, isAdmin, getUser)
//   .put(isAuthenticated, isAdmin, updateUser)
//   .delete(isAuthenticated, isAdmin, deleteUser);

export default router;
