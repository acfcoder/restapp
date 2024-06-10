import * as mongodb from "mongodb";
import { Product } from "./product";

export const collections: {
    products?: mongodb.Collection<Product>;
} = {};

export async function connectToDatabaseToProduct(uri: string) {
    const client = new mongodb.MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("restApp");
        await applySchemaValidation(db);

        const productsCollection = db.collection<Product>("product");
        collections.products = productsCollection;

    } catch (error) {
        console.error('Failed to connect to the database or failed to apply schema validation: ', error);
        throw error;
    }
    
}


async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
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
                    bsonType: "string",
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

    await db.command ({
        collMod: "products",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("product"), {validator: jsonSchema}};
        })
};

