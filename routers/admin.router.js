import { Router } from "express";
const router = Router();

import {
  listGlobals,
  getGlobal,
  createGlobal,
  updateGlobal,
  deleteGlobal,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  listChallenge,
  createChallenge,
  getChallenge,
  updateChallenge,
  deleteChallenge,
} from "../controllers/admin.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware";
import { uploadProfilePic, uploadChallengePic } from "../services/s3.service";

router
  .route("/globals")
  .get(isAuthenticated, isAdmin, listGlobals)
  .post(isAuthenticated, isAdmin, createGlobal);
router
  .route("/globals/:id")
  .get(isAuthenticated, isAdmin, getGlobal)
  .put(isAuthenticated, isAdmin, updateGlobal)
  .delete(isAuthenticated, isAdmin, deleteGlobal);

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

router
  .route("/challenges")
  .get(isAuthenticated, isAdmin, listChallenge)
  .post(
    isAuthenticated,
    isAdmin,
    uploadChallengePic.fields([
      { name: "bannerImageWide", maxCount: 1 },
      { name: "bannerImageSquare", maxCount: 1 },
    ]),
    createChallenge
  );
router
  .route("/challenges/:id")
  .get(isAuthenticated, isAdmin, getChallenge)
  .put(isAuthenticated, isAdmin, updateChallenge)
  .delete(isAuthenticated, isAdmin, deleteChallenge);

export default router;
