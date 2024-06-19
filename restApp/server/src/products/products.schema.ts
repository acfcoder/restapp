import * as mongodb from "mongodb";


export async function productApplySchemaValidation(db: mongodb.Db) {
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

    try {
        await db.command ({
        collMod: "product",
        validator: productJsonSchema
        });
    } catch (error) {
        if (error instanceof mongodb.MongoServerError && error.  codeName  === "NamespaceNotFound") {
            await db.createCollection("product", {validator: productJsonSchema})
        } else {
            console.error('Error in product schema validation:', error);
        };
    }
}