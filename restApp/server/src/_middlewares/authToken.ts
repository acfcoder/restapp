import { Request, Response, NextFunction } from 'express';
import { SECRET } from "../../config"

import jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = 'x-access-token';
    const token = req.headers[tokenHeader] as string;

    console.log(token);
    
        if(!token) return res.status(403).json({message: "No token provided"});
    
        const decoded = jwt.verify(token, SECRET);
        console.log(decoded);

        next();

}