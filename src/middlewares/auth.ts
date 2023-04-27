import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define JWT_SECRET_KEY variable with a default value
export const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || "default_secret_key";

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
        //On prend le token de la requete
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw "No token provided";
        }
        //On le decode grace au TOKEN SECRET
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY ) as JwtPayload;
        //On extrait l'user id du TOKEN
        const userId = decodedToken.userId;
        //On le compare avec celui de la requete
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next(); //S'il est juste on passe au middleware suivant
        }
    } catch (err){
        res.status(401).send('Requête invalide!');
    }
};