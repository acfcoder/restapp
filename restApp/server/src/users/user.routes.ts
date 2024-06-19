import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

const bcrypt = require('bcryptjs');

export const registerRouter = express.Router();
export const loginRouter = express.Router();
export const logoutRouter = express.Router();

registerRouter.use(express.json());
loginRouter.use(express.json());

registerRouter.post('/', async (req, res) => {
    try {        
        const user = req.body;
        
        const checkMail = await collections.users?.findOne({mail: user.mail});
        
        if(checkMail) {
            return res.status(400).send("Mail is already registered");
            
        }

        user.pass = bcrypt.hashSync(user.pass, 12);

        const result = await collections?.users?.insertOne(user);

        if (result?.acknowledged) {
                res.status(201).send(`Created a new user width the ID ${result.insertedId}.`);
            } else {
                return res.status(500).send("Failed to created a new user");
                
            }
    
    } catch (error) {
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message : "Unknown error" );
    }
    
});

loginRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        
        const userFound = await collections.users?.findOne({mail: user.mail});

        
        if (!userFound) {
            return res.status(400).send("User or pass are not correct"); 
        } 

        const eq = bcrypt.compareSync(req.body.pass, userFound.pass)

        if (!eq) {   
            return res.status(400).send("User or pass are not correct"); 
        } 
        
        res.status(200).send(`Hello, again, ${userFound.name}`);

    } catch (error){
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message : "Unknown error" );
    }
})
