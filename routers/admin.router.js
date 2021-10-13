import { Router } from "express";
const router = Router();

import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/admin.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware";
import { uploadProfilePic } from "../services/s3.service";

router
  .route("/users")
  .get(isAuthenticated, isAdmin, listUsers)
  .post(
    isAuthenticated,
    isAdmin,
    uploadProfilePic.array("profile", 1),
    createUser
  );
router
  .route("/users/:id")
  .get(isAuthenticated, isAdmin, getUser)
  .put(isAuthenticated, isAdmin, updateUser)
  .delete(isAuthenticated, isAdmin, deleteUser);

export default router;
