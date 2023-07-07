import express from "express";
import { auth } from "./services/auth";
import AvatarController from "./controller/avatar";
import PoiController from "./controller/poi";
import { upload, multiUpload } from "./middleware/upload";

const router = express.Router();

/*  Routes for an user */
router.post(
  "/images/upload/avatar",
  auth,
  upload.single("file"),
  AvatarController.create
);
router.get("/images/users/:userId/avatars/:filename", AvatarController.read);
router.put(
  "/images/update-avatar/:oldFilename",
  auth,
  upload.single("file"),
  AvatarController.update
);
router.delete(
  "/images/delete/avatars/:filename",
  auth,
  AvatarController.delete
);
router.delete("/images/delete-user", auth, AvatarController.deleteAll);

/* Routes for a POI */
router.post(
  "/images/upload/pois/:poiId",
  auth,
  multiUpload,
  PoiController.create
);
router.get("/images/pois/:poiId/:filename", PoiController.read);
router.delete(
  "/images/delete/pois/:poiId/:filename",
  auth,
  PoiController.delete
);

export default router;
