import * as mongodb from "mongodb";

export async function userApplySchemaValidation(db: mongodb.Db) {
    const userJsonSchema = {
        $jsonSchema: {
            bson: "object",
            required: ["name, mail, pass"],
            addtionalProperties: true,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                    minLength: 5
                },
                mail: {
                    bsonType: "string",
                    unique: true
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
}