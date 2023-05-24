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
    console.log("dataReq: ", dataReq);
    const { poiId, userId } = dataReq.params;

    if (poiId) {
      dirPath = path.join(dirPath, "/pois/", poiId, "/");
    }

    if (userId) {
      dirPath = path.join(dirPath, "/avatar/", userId, "/");
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
  "/upload/avatar",
  auth,
  upload.single("file"),
  AvatarController.create
);
router.get("/users/:userId/avatars/:filename", AvatarController.read);
router.put(
  "/update-avatar/:oldFilename",
  auth,
  upload.single("file"),
  AvatarController.update
);
router.delete("/delete/avatars/:filename", auth, AvatarController.delete);
router.delete("/delete-user", auth, AvatarController.deleteAll);

/* Routes for a POI */
router.post(
  "/upload/pois/:poiId",
  auth,
  upload.single("file"),
  PoiController.create
);
router.get("/pois/:poiId/:filename", PoiController.read);
router.put(
  "/update/pois/:poiId/:oldFilename",
  auth,
  upload.single("file"),
  PoiController.update
);
router.delete("/delete/pois/:poiId/:filename", auth, PoiController.delete);
router.delete("/delete-poi/:poiId", auth, PoiController.deleteAll);

export default router;
