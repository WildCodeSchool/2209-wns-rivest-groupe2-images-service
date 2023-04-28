import multer, { diskStorage } from 'multer';// Permet d'envoyer un fichier dans la requête
import path from 'path';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};


const storage = diskStorage({ // Configure multer
  destination: (req, file, callback) => { // Indique où enregistrer les fichiers
    callback(null, path.join(__dirname, "../upload/"));
  },
  filename: (req, file, callback) => { // Indique le nom du fichier
    const name = file.originalname.split(' ').join('_'); // Retire les potentiels espaces
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES]; // Défini le type
    callback(null, name + '-' + uniqueSuffix + '.' + extension); // Génère le nom unique
  }
});
export { storage };
export default multer({ storage }).single('image');