import * as mongodb from "mongodb";
import { Product } from "./products/product";
import { Order } from "./orders/order";
import { User } from "./users/user";
import { productApplySchemaValidation } from "./products/products.schema";
import { orderApplySchemaValidation } from "./orders/orders.schema";

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

        const productsCollection = db.collection<Product>("products");
        collections.products = productsCollection;

        const ordersCollection = db.collection<Order>("orders");
        collections.orders = ordersCollection;

        const usersCollection = db.collection<User>("users");
        collections.users = usersCollection;

    } catch (error) {
        console.error('Failed to connect to the database or failed to apply schema validation: ', error);
        throw error;
    }
    
}

