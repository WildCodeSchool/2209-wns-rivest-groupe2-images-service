import express, { Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import router from "./router";

const app = express()
const port = 8000;
app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
    res.send("Hello World!");
});
app.use(router);


// app.post('/upload', upload.single('file'), function (req: any, res: Response) {
//     fs.readFile(req.file.path, (err) => {
//         if (err) {
//             console.log("Error: ",err);
//             res.status(500).json({ error: err});
//         } else {
//           console.log("file", file);
//             res
//             .status(201)
//             .json({ status: "success", filename: "/files/" + req.file.filename });
//         }
//     });
// });
// app.get("/files/:filename", (req, res) => {
//   let file = path.join(__dirname + "/../uploads", req.params.filename);
//   console.log("file", file);
//   fs.readFile(file, (err, content) => {
//     if (err) {
//       res.writeHead(404, { "Content-Type": "text" });
//       res.write("File Not Found!");
//       res.end();
//     } else {
//       res.writeHead(200, { "Content-Type": "application/octet-stream" });
//       res.write(content);
//       res.end();
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


  