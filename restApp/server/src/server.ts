import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { productRouter } from "./products/products.routes";
import { productRouterAdmin } from "./products/products.routes";
import path from "path";
import { orderRouter } from "./orders/orders.routes";
import { registerRouter, loginRouter } from "./users/user.routes";
import { verifyToken } from "./_middlewares/authToken";

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
        app.use(express.static(path.join(__dirname)));

    // start the Express server
        app.use("/api/products", productRouter );
        app.use("/api/admin/products", productRouterAdmin);
        app.use("/api/admin/orders", orderRouter);
        app.use("/api/login", loginRouter);
        app.use("/api/user/new", registerRouter);
        app.listen(5300, () => {
            console.log(`Server running at http://localhost:5300...`);
        });
    })
    .catch((error) => console.error(error));