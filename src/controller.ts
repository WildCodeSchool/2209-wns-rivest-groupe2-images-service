import { Request as ExpressRequest} from "express";
import { Response } from "express";
import path from "path";
import fs from "fs";

interface User {
    id: string;
  }
  
  interface Request extends ExpressRequest {
    user: User;
  }

const Controller = {
    postImage: (req: Request, res: Response) => {
        const userId = req.user.id;
        if (req.file?.path) {
          fs.readFile(req.file.path, (err) => {
        if (err) {
            console.log("Error: ",err);
            res.status(500).json({ error: err});
        } else {
            if (req.file?.filename) {
                const imgPath = `/users/${userId}/files/${req.file.filename}`;
            res
            .status(201)
            .json({ status: "success", filename: imgPath });
            }
        }
        });
    };
    },
    getImage: (req: Request, res: Response) => {
        let file = path.join(__dirname + "/../uploads", req.params.filename);
        console.log("file", file);
        fs.readFile(file, (err, content) => {
            if (err) {
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

    deleteImage: (req: Request, res: Response) => {},
}
