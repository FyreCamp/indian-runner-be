import { Router } from "express";
const router = Router();

import { listUsers } from "../controllers/admin.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware";

router.route("/users").get(isAuthenticated, isAdmin, listUsers);
// router
//   .route("user/:id")
//   .get(isAuthenticated, isAdmin, getUser)
//   .put(isAuthenticated, isAdmin, updateUser)
//   .delete(isAuthenticated, isAdmin, deleteUser);

export default router;
