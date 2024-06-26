import { Request, Response, NextFunction } from 'express';
import { SECRET } from "../../config";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { collections } from '../database'; 

// Define el tipo específico para el payload de tu token
interface JwtPayloadWithId extends jwt.JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            // ... otras propiedades del request
        }
    }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log('Not logged');
        } else {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, SECRET) as JwtPayloadWithId;

            if (typeof decoded === 'string' || !('id' in decoded)) {
                console.log("Invalid token");
            } else {
                req.userId = decoded.id;
            }
        }
    } catch (err) {
        console.log("Unauthorized: Invalid token" );
    } finally {
        next(); // Continúa con la siguiente función middleware o ruta
    }
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return console.log('Not logged');
    }
    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized: Missing access token" });

    try {
        const decoded = jwt.verify(token, SECRET) as string | JwtPayloadWithId;

        if (typeof decoded === 'string') {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded.id;

        if(!collections.users) {
            return res.status(500).json({ message: "Internal server error: Database collection not initialized" });
        }

        const user = await collections.users.findOne({_id: new ObjectId(req.userId) });

        if(!user) {
            return res.status(404).json({ message: "Not Found: User not associated with the request" });
        }
    
        next();
    
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const isAdmin = async ( req: Request, res: Response, next: NextFunction) => {
    const user = await collections?.users?.findOne({_id: new ObjectId(req.userId) });
    const isAdmin = user?.role === 'admin' ? true : false;
    
    (isAdmin) ? next() : res.status(403).json({ message: 'Forbidden: User is not authorized for this resource' });
}
