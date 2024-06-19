import { Request, Response, NextFunction } from 'express';
import { SECRET } from "../../config";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { collections } from '../database'; 

// Define el tipo específico para el payload de tu token
interface JwtPayloadWithId extends jwt.JwtPayload {
    id: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = 'x-access-token';
    const token = req.headers[tokenHeader] as string;

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, SECRET) as string | JwtPayloadWithId;

        if (typeof decoded === 'string') {
            return res.status(403).json({ message: "Invalid token" });
        }

        const userId = decoded.id;

        if(!collections.users) {
            return res.status(404).json({ message: "Collection not initialized" });
        }


        const user = await collections.users.findOne({_id: new ObjectId(userId)});

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(user.role);

        const admin = user.role === 'admin' ? true : false;
        //req.user = user;
        next();
    
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

