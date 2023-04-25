import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
        //On prend le token de la requete
        const token = req.header("Authorization")?.replace("Bearer ", "");
        //On le decode grace au TOKEN SECRET
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        //On extrait l'user id du TOKEN
        const userId = decodedToken.userId;
        //On le compare avec celui de la requete
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next(); //Si il est juste on passe au middleware suivant
        }
    } catch (err){
        res.status(401).send('Requête invalide!');
    }
};