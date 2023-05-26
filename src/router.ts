/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { auth, CustomRequest } from "./services/auth";
import AvatarController from "./controller/avatar";
import PoiController from "./controller/poi";
import slugify from "slugify";

const storage = multer.diskStorage({
  destination: function (req, _, cb) {
    const dataReq = req as CustomRequest;
    let dirPath = path.join(__dirname, "../uploads/");
    const { poiId } = dataReq.params;

    if (poiId) {
      dirPath = path.join(dirPath, "/pois/", poiId, "/");
    }

    if (dataReq.userId) {
      dirPath = path.join(dirPath, "/avatar/", dataReq.userId, "/");
    }

    fs.mkdirSync(dirPath, { recursive: true });
    cb(null, dirPath);
  },
  filename: function (_, file, cb) {
    const fileArr = file.originalname.split(".");
    const extension = fileArr.pop() ?? "";
    const filename = fileArr.join(".");

    const newFileName = slugify(filename, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });
    cb(null, `${Date.now()}-${newFileName}.${extension}`);
  },
});
const upload = multer({ storage });

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
  upload.single("file"),
  PoiController.create
);
router.get("/images/pois/:poiId/:filename", PoiController.read);
router.put(
  "/images/update/pois/:poiId/:oldFilename",
  auth,
  upload.single("file"),
  PoiController.update
);
router.delete(
  "/images/delete/pois/:poiId/:filename",
  auth,
  PoiController.delete
);
router.delete("/images/delete-poi/:poiId", auth, PoiController.deleteAll);

export default router;
