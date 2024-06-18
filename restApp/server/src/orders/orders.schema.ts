import * as mongodb from "mongodb";

export async function orderApplySchemaValidation(db: mongodb.Db) {

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
                    bsonType: "string",
                    description: "user Id",
                },
                price: {
                    bsonType: "number",
                    description: "This field is calculated",    
                },
                tax: {
                    bsonType: "number",
                    description: "Tax has been applied",    
                },
                total: { 
                    bsonType: "number",
                    description: "Tax * price",
                },
                date: {
                    bsonType: "date",
                    description: "Date of the transaction"
                },
                status: {
                    bsonType: "string",
                    description: "State of the order",
                    enum: ["waiting", "accepted", "rejected"],
                },
                paid: {
                    bsonType: "bool",
                    description: "Order payment status",
                },
                delivered: {
                    bsonType: "bool",
                    description: "Order pending?"
                }
            },
        },
    };            

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

