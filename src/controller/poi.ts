import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const PoiController = {
  create: (req: Request, res: Response) => {
    if (req.file?.path) {
      fs.readFile(req.file.path, (err) => {
        if (err) {
          console.error("Error: ", err);
          res.status(500).json({ error: err });
        } else {
          if (req.file?.filename) {
            const imgPath = `/pois/${req.file.filename}`;
            res.status(201).json({
              status: "success",
              filename: imgPath,
            });
          }
        }
      });
    }
  },

  read: (req: Request, res: Response) => {
    const file = path.join(
      __dirname,
      "/../../uploads/pois",
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

  update: (req: Request, res: Response) => {
    const oldFile = path.join(
      __dirname,
      "/../../uploads/pois",
      req.params.oldFilename
    );

    if (req.file?.path) {
      fs.readFile(req.file.path, (err) => {
        if (err) {
          console.error("Error: ", err);
          res.status(500).json({ error: err });
        } else {
          if (req.file?.filename) {
            const imgPath = `/pois/${req.file.filename}`;
            fs.unlink(oldFile, (err) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "text" });
                res.write("File Not Found!");
                res.end();
              } else {
                res.status(201).json({
                  status: "success",
                  filename: imgPath,
                });
              }
            });
          }
        }
      });
    }
  },

  delete: (req: Request, res: Response) => {
    const file = path.join(
      __dirname,
      "/../../uploads/pois",
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

  /* deleteAll: (req: Request, res: Response) => {
    const dataReq = req as CustomRequest;
    const userId = dataReq.userId;

    const directory = path.join(
      __dirname,
      "/../../uploads/",
      userId,
      req.params.blog,
      "/"
    );
    if (fs.existsSync(directory)) {
      fs.rmdirSync(directory, { recursive: true });
      res.writeHead(202, { "Content-Type": "application/octet-stream" });
      res.write("Blog deleted successfully !");
      res.end();
    } else {
      throw new Error("Blog Not Found");
    }
  }, */
};

export default PoiController;
