import express from 'express';
import { auth } from "./middlewares/auth"; // Crée un token d'identification
import multer from "multer"; // Permet d'envoyer un fichier dans la requête
import path from 'path';
import storage from "./middlewares/multer-config";

//import upload from "./middlewares/multer-config";


const router = express.Router();
const upload = multer({ storage });
router.post('/upload',auth, upload.single('file'));
router.get("/files/:filename");
router.put("/modify", auth, upload.single('file'));
router.delete('/:id', auth);



export default router;