import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { productRouter } from "./products/product.routes";
import { productRouterAdmin } from "./products/product.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if(!ATLAS_URI) {
    console.error(
        "No ATLAS_URI environment variable has been defined in config.env");
        process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());

    // start the Express server
        app.use("/products", productRouter );
        app.use("/admin/products", productRouterAdmin )
        app.listen(5300, () => {
            console.log(`Server running at http://localhost:5300...`);
        });
    })
    .catch((error) => console.error(error));