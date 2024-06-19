import * as mongodb from "mongodb";
import { Product } from "./products/product";
import { Order } from "./orders/order";
import { User } from "./users/user";
import { productApplySchemaValidation } from "./products/products.schema";
import { orderApplySchemaValidation } from "./orders/orders.schema";
import { userApplySchemaValidation } from "./users/users.schema";

export const collections: {
    products?: mongodb.Collection<Product>;
    orders?: mongodb.Collection<Order>;
    users?:mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("restApp");
        await productApplySchemaValidation(db);
        await orderApplySchemaValidation(db);
        await userApplySchemaValidation(db);

        collections.products = db.collection<Product>("product");
        collections.orders = db.collection<Order>("orders");
        collections.users= db.collection<User>("users");
        
        console.log ("Connected to database. Collections initialized");

    } catch (error) {
        console.error('Failed to connect to the database or failed to apply schema validation: ', error);
        throw error;
    }
    
}

