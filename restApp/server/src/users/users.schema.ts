import * as mongodb from "mongodb";

export async function userApplySchemaValidation(db: mongodb.Db) {
    const userJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name, mail, pass"],
            additionalProperties: true,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                    minLength: 5
                },
                mail: {
                    bsonType: "string",
                },
                pass: {
                    bsonType: "string",
                    minLength: 6
                },
                phone: {
                    bsonType: "number",
                }, 
                address: {
                    bsonType: "array",
                },
                role: {
                    bsonType: "string",
                    description: "role of the user",
                    enum: ["admin", "customer"]
                },
                newsletter: {
                    bsonType: "bool",
                    description: "True if the customer wants a newsletter",
                },
            }
        }
    }

    try {
        await db.command ({
        collMod: "users",
        validator: userJsonSchema
        });
    } catch (error) {
        if (error instanceof mongodb.MongoServerError && error.  codeName  === "NamespaceNotFound") {
            await db.createCollection("users", {validator: userJsonSchema})
        } else {
            console.error('Error in users schema validation:', error);
        };
    }
}