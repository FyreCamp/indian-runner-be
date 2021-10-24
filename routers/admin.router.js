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

router.route("/globals").get(listGlobals).post(createGlobal);
router
  .route("/globals/:id")
  .get(getGlobal)
  .put(updateGlobal)
  .delete(deleteGlobal);

router
  .route("/users")
  .get(listUsers)
  .post(
    isAuthenticated,
    isAdmin,
    uploadProfilePic.array("profile", 1),
    createUser
  );
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

router
  .route("/challenges")
  .get(listChallenge)
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
  .get(getChallenge)
  .put(updateChallenge)
  .delete(deleteChallenge);

export default router;
