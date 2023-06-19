/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const PoiController = {
  create: (req: Request, res: Response) => {
    const files: any = req.files;
    const arrayFiles = [...files];
    console.log("files", files);

    if (!arrayFiles) {
      return res
        .status(400)
        .send({ message: "Please upload at least one image" });
    }
    const data: Array<{ status: string; filename: string }> = [];
    arrayFiles.forEach((element: any) => {
      const imgPath = `/pois/${element.filename}`;
      data.push({
        status: "success",
        filename: imgPath,
      });
    });

    res.json(data);
  },

  read: (req: Request, res: Response) => {
    const file = path.join(
      __dirname,
      "/../../uploads/pois/",
      req.params.filename
    );
    fs.readFile(file, (err, content) => {
      if (err) {
        console.log("err", err);
        res.writeHead(404, { "Content-Type": "text" });
        res.write("File Not Found!");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "application/octet-stream" });
        res.write(content);
        res.end();
      }
    });
  },

  delete: (req: Request, res: Response) => {
    const file = path.join(
      __dirname,
      "/../../uploads/pois/",
      req.params.filename
    );
    fs.unlink(file, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text" });
        res.write("File Not Found!");
        res.end();
      } else {
        res.writeHead(202, { "Content-Type": "application/octet-stream" });
        res.write("File deleted successfully !");
        res.end();
      }
    });
  },
};

export default PoiController;
