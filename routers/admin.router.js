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
  createFaqs,
  editFaqs,
  deleteFaqs,
  listBadges,
  getBadge,
  createBadge,
  updateBadge,
  deleteBadge,
} from "../controllers/admin.controller";
import { getFaqs, listFaqs } from "../controllers/global.controller";
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
  .post(uploadProfilePic.array("profile", 1), createUser);
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

router
  .route("/badges")
  .get(listBadges)
  .post(uploadProfilePic.array("image", 1), createBadge);
router.route("/badges/:id").get(getBadge).put(updateBadge).delete(deleteBadge);

router
  .route("/challenges")
  .get(listChallenge)
  .post(
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

router.route("/faqs").post(createFaqs).get(listFaqs);
router.route("/faqs/:id").get(getFaqs).put(editFaqs).delete(deleteFaqs);

export default router;
