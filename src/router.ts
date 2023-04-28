import express from 'express';
import { auth } from "./middlewares/auth"; // Crée un token d'identification
import multer from "multer"; // Permet d'envoyer un fichier dans la requête
import path from 'path';
import { storage } from "./middlewares/multer-config";
import Controller from './controller';

//import upload from "./multer-config";

const router = express.Router();

// const upload = multer({ storage });
router.post('/upload',auth, multer({ storage }).single('file')),Controller.postImage;
// router.get("/files/:filename"),Controller.getImage;
router.get("/files/");
router.put("/modify", auth, multer({ storage }).single('file'));
router.delete('/:id', auth);

export default router;