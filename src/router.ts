import express from 'express';
const router = express.Router();
import { auth } from "./middlewares/auth"; // Crée un token d'identification
import multer from "multer"; // Permet d'envoyer un fichier dans la requête
import storage from "./middlewares/multer-config";

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'));
router.get("/files/:filename");
router.put("/modify", auth, multer);
router.delete('/:id', auth);



export default router;