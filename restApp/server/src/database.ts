import * as mongodb from "mongodb";
import { Product } from "./products/product";
import { Order } from "./orders/orders";
import { finished } from "stream";

export const collections: {
    products?: mongodb.Collection<Product>;
    orders?: mongodb.Collection<Order>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("restApp");
        await applySchemaValidation(db);

        const productsCollection = db.collection<Product>("product");
        collections.products = productsCollection;

        const ordersCollection = db.collection<Order>("order");
        collections.orders = ordersCollection;

    } catch (error) {
        console.error('Failed to connect to the database or failed to apply schema validation: ', error);
        throw error;
    }
    
}

async function applySchemaValidation(db: mongodb.Db) {
    const productJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "desc", "price"],
            additionalProperties: true,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                    minLength: 5
                },
                desc: {
                    bsonType: "string",
                    description: "'Short description' is required and is a string",
                    minLength: 5
                },
                l_desc: {
                    bsonType: "string",
                    description: "Long description",
                },
                price: {
                    bsonType: "number",
                    description: "The price of the product is required",
                }, 
                category: {
                    bsonType: "number",
                    description: "Show the category of the product"
                },
                img: {
                    bsonType: "string",
                    description: "upload a main image for the product"
                },
                pos: {
                    bsonType: "number",
                    description: "The position in the list",
                },
                available: {
                    bsonType: "bool",
                    description: "'available' is required and is a boolean",
                },
                time: {
                    bsonType: "number",
                    description: "Time to make it",
                },
                excl: {
                    bsonType: "number",
                    description: "Percentage of exclusivity",
                },
                allergens: {
                    bsonType: "array",
                    description: "list of allergens",
                },
                tags: {
                    bsonType: "array",
                    description: "list of tags",
                },
            },
        },
    };

    const orderJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["lines", "user", "price", "total"],
            additionalProperties: true,
            properties: {
                _id: {},
                lines: {
                    bsonType: "array",
                    description: "'lines' are required and is a string",
                },
                user: {
                    bsontype: "text",
                    description: "user Id",
                },
                price: {
                    bsonype: "number",
                    description: "This field is calculated",    
                },
                tax: {
                    bsonype: "number",
                    description: "Tax has been applied",    
                },
                total: { 
                    bsontype: "number",
                    description: "Tax * price",
                },
                date: {
                    bsontype: "date",
                    description: "Date of the transaction"
                },
                status: {
                    bsontype: "string",
                    description: "State of the order",
                    enum: ["waiting", "accepted", "rejected"],
                },
                paid: {
                    bsontype: "bool",
                    description: "Order payment status",
                },
                delivered: {
                    bsontype: "bool",
                    description: "Order pending?"
                }
            },
        },
    };            


    try {
        await db.command ({
        collMod: "product",
        validator: productJsonSchema
        });
    } catch (error) {
        if (error instanceof mongodb.MongoServerError && error.  codeName  === "NamespaceNotFound") {
            await db.createCollection("products", {validator: productJsonSchema})
        } else {
            console.error('Error in users schema validation:', error);
        };
    }

    try {
        await db.command ({
        collMod: "order",
        validator: orderJsonSchema
        });
    } catch (error) {
        if (error instanceof mongodb.MongoServerError && error.  codeName  === "NamespaceNotFound") {
            await db.createCollection("orders", {validator: orderJsonSchema})
        } else {
            console.error('Error in users schema validation:', error);
        };
    }     
    
};

