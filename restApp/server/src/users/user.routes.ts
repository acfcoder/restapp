import * as express from "express";
import { ConnectionClosedEvent, ObjectId } from "mongodb";
import { collections } from "../database";
import { User } from "./user";
import { error } from "console";

export const registerRouter = express.Router();
export const loginRouter = express.Router();
export const logoutRouter = express.Router();

registerRouter.use(express.json());
loginRouter.use(express.json());

registerRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        const checkMail = await collections.products?.findOne(user.mail);
        const result = await collections?.users?.insertOne(user);

        if(!checkMail) {
            if (result?.acknowledged) {
                res.status(201).send(`Created a new user width the ID ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to created a new user");
            }

        } else {
            //Cambiar 
            console.log ("El mail ya esta registrado. No es posible utilizarlo");
            return;
        } 
    
    } catch (error) {
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message : "Unknown error" );
    }
    
});

loginRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        
        const checkMail = await collections.products?.findOne(user.mail);
        const checkPass = await collections.products?.findOne(user.pass);

        if (!checkMail) {
            console.log("Usuario o password incorrecto");
            return;
        } 
        
        if (!checkPass) {
            console.log("Usuario o password incorrecto");
            return;
        }
    } catch (error){
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message : "Unknown error" );
    }
})
