import multer from "multer";
import fs from "fs";
import path from "path";
import { CustomRequest } from "../services/auth";
import slugify from "slugify";

const storage = multer.diskStorage({
  destination: function (req, _, cb) {
    const dataReq = req as CustomRequest;
    const { poiId, userId } = dataReq.params;
    let dirPath = path.join(__dirname, "../../uploads/");

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

export const upload = multer({ storage });
export const multiUpload = multer({ storage }).array("file", 10);
