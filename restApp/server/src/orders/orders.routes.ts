import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const orderRouter = express.Router();
orderRouter.use(express.json());

orderRouter.get("/", async (_req, res) => {
    try {
        const orders = await collections?.orders?.find({}).toArray();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message: "Unknown error");
    }
});

orderRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = {_id: new ObjectId};
        const order = await collections.orders?.findOne(query);

        if (order) {
            res.status(200).send(order);
        } else {
            res.status(400).send(`Failed to find an order: ID ${id} `);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an order: ID ${req.params.id}`);
    }
});

orderRouter.post ("/", async (req, res) =>{
    try {
        const order = req.body;
        const result = await collections?.orders?.insertOne(order);

        if (result?.acknowledged) {
            res.status(200).send(`Created a new order with ID ${result.insertedId}`);
        } else {
            res.status(404).send(`Failed to create a new order`);
        }
    } catch(error) {
        res.status(400).send(error instanceof Error ? error.message: "Unknown error");
    }

});

orderRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const order = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.orders?.updateOne(query, {$set: order});

        if (result && result.matchedCount) {
            res.status(201).send(`Updated a order: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a order: ID: ${id}`);
        } else {
            res.status(400).send(`Failed to updated a order: ID: ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send (error instanceof Error ? error.message: 'Unknown error');
    }
});

orderRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id)};
        const result = await collections?.orders?.deleteOne(query);

        if(result && result.deletedCount) {
            res.status(202).send(`Removed an order: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an oreer: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an order: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
    
});
