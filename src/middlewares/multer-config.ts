import multer, { diskStorage } from 'multer';
import path from 'path';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = diskStorage({ // Configure multer
  destination: (req, file, callback) => { // Indique où enregistrer les fichiers
    callback(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, callback) => { // Indique le nom du fichier
    const name = file.originalname.split(' ').join('_'); // Retire les potentiels espaces
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = MIME_TYPES[file.mimetype]; // Défini le type
    callback(null, name + Date.now() + '.' + file.originalname + extension); // Génère le nom unique
  }
});
export default multer({storage: storage}).single('image');