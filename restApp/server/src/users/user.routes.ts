import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const registerRouter = express.Router();
export const loginRouter = express.Router();
export const logoutRouter = express.Router();

registerRouter.use(express.json());
loginRouter.use(express.json());

registerRouter.post('/', async (req, res) => {
    try {
        const user = req.body;

        const checkMail = await collections.users?.findOne({mail: user.mail});
        const result = await collections?.users?.insertOne(user);

        if(!checkMail) {
            if (result?.acknowledged) {
                res.status(201).send(`Created a new user width the ID ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to created a new user");
            }

        } else {
            res.status(500).send("Mail is registered");
        } 
    
    } catch (error) {
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message : "Unknown error" );
    }
    
});

loginRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        
        const loginSuccess = await collections.users?.findOne({mail: user.mail, pass: user.pass});

        if (!loginSuccess) {
            res.status(500).send("User or pass are not correct");     
        } else {
            res.status(200).send(`Hello, again, ${loginSuccess.name}`);
        } 
        

    } catch (error){
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message : "Unknown error" );
    }
})
