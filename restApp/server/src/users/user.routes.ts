import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { SECRET } from "../../config"


const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

export const registerRouter = express.Router();
export const loginRouter = express.Router();
export const logoutRouter = express.Router();
export const adminUsers = express.Router();

registerRouter.use(express.json());
loginRouter.use(express.json());
adminUsers.use(express.json())

registerRouter.post('/', async (req, res) => {
    try {        
        const user = req.body;
        
        const checkMail = await collections.users?.findOne({mail: user.mail});
        
        if(checkMail) {
            return res.status(400).json("Mail is already registered");  
        }

        user.pass = bcrypt.hashSync(user.pass, 10);

        const result = await collections?.users?.insertOne(user);

        if (result?.acknowledged) { 
                
                const token = jwt.sign({id: result.insertedId}, SECRET, {
                    expiresIn: 86400});
                    
                    res.status(201).json({ message: `Created a new user with the ID ${result.insertedId}.`, token });
            
            } else {
                return res.status(500).json("Failed to created a new user");
                
            } 
            console.log('user created');
    } catch (error) {
        console.error(error);
        res.status(400).json (error instanceof Error ? error.message : "Unknown error" );
    }
    
});

loginRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        
        const userFound = await collections.users?.findOne({mail: user.mail});
        
        if (!userFound) {
            return res.status(400).json("User or pass are not correct"); 
        }; 

        const eq = bcrypt.compareSync(req.body.pass, userFound.pass);
      //  const maxExpiration = 30*24*60*60*100;


        if (!eq) {   
            return res.status(400).json("User or pass are not correct"); 
        }; 

        const token = jwt.sign({id: userFound._id},SECRET,{
            expiresIn: 86400
        })

        console.log('login ok');
        return res.status(200).json({
                success: 'Login ok',
                token: `${token}`
            });

    } catch (error){
        console.error(error);
        res.status(400).json (error instanceof Error ? error.message : "Unknown error" );
    }
})


adminUsers.get('/', async (req, res) => {
    try {
        const users = await collections.users?.find({}).toArray();
        res.status(200).send(users);
    } catch(error)
    {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error")
    };
});

