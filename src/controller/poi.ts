/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { CustomRequest } from "../services/auth";

const PoiController = {
  create: (req: Request, res: Response) => {
    const dataReq = req as CustomRequest;
    const { poiId } = dataReq.params;
    const files: any = req.files;
    const arrayFiles = [...files];

    if (!arrayFiles) {
      return res
        .status(400)
        .send({ message: "Please upload at least one image" });
    }
    const data: Array<{ status: string; filename: string }> = [];
    arrayFiles.forEach((element: any) => {
      const imgPath = `/pois/${poiId}/${element.filename}`;
      data.push({
        status: "success",
        filename: imgPath,
      });
    });
    res.status(201).json(data);
  },

  read: (req: Request, res: Response) => {
    const { poiId } = req.params;
    const file = path.join(
      __dirname,
      "/../../uploads/pois/",
      poiId,
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
    const { poiId } = req.params;
    const file = path.join(
      __dirname,
      "/../../uploads/pois/",
      poiId,
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
