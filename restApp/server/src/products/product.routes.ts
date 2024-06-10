    import * as express from "express";
    import { ObjectId } from "mongodb";
    import { collections } from "../database";
    import multer from "multer";
    import path from "path";


    const MIMETYPES = ['image/jpg', 'image/png', 'image/jpeg'];

    // Improving MULTER
    const fileUploads = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/uploads/')
            },
            filename: (req, file, cb) => {
                const fileExt =  path.extname(file.originalname);
                cb(null, file.originalname.split(fileExt)[0] + '-' + Date.now() + fileExt );
            }     
        }),
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) {
            cb(null, true) 
            } else {
            cb ( new Error (`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
            }
        },
        limits: {
            fileSize: 10000000,
        }

    });

    export const productRouter = express.Router();
    export const productRouterAdmin = express.Router();

    productRouter.use(express.json());
    productRouterAdmin.use(express.json())

    productRouter.get("/", async (_req, res) => {
        try {
            const products = await collections?.products?.find({}).toArray();
            res.status(200).send(products);
        }  catch (error) 
        {
            res.status(500).send(error instanceof Error ? error.message: "Unknown error")
        };
    });

    productRouter.get("/:id", async (req, res) => {
        try {
            const id = req?.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await collections.products?.findOne(query);

            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send(`Failed to find a product: ID: ${id}`);
            }

        } catch (error) {
            res.status (404).send(`Failed to find a product: ID ${req?.params?.id}`);
        }
    });

    productRouterAdmin.post("/", async (req, res) => {
        try {
            const product = req.body;
            const result = await collections?.products?.insertOne(product);

            if (result?.acknowledged) {
                res.status(201).send(`Created a new product: ID ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to create a new product");
            }
        } catch (error) {
            console.error(error);
            res.status(400).send (error instanceof Error ? error.message: 'Unknown error');
        }        
    });

    productRouter.put("/upload/:id", fileUploads.single('file'), async(req, res) => {
        try {
            const id = req?.params?.id;
            const item = req.body;

            if (req.file) {
                req.body.img = req.file.filename;
            }

            const query = {_id: new ObjectId(id)};
            const result = await collections?.products?.updateOne(query, {$set: item});

            if (result && result.matchedCount) {
                res.status(201).send(`Image uploaded successfully in the product ID: ${id}`);
            } else if (!result?.matchedCount) {
                res.status(404).send(`Failed to find a product: ID: ${id}`);
            } else {
                res.status(400).send(`Failed to updated a product: ID: ${id}`);
            }
        } catch (error) {
            res.status(400).send('Error uploading file');
        }
    });


    productRouterAdmin.put("/:id", async (req, res) => {
        try {
            const id = req?.params?.id;
            const product = req.body;
            const query = { _id: new ObjectId(id) };
            const result = await collections?.products?.updateOne(query, {$set: product});

            if (result && result.matchedCount) {
                res.status(201).send(`Updated a product: ID ${id}.`);
            } else if (!result?.matchedCount) {
                res.status(404).send(`Failed to find a product: ID: ${id}`);
            } else {
                res.status(400).send(`Failed to updated a product: ID: ${id}`);
            }
        } catch (error) {
            console.error(error);
            res.status(400).send (error instanceof Error ? error.message: 'Unknown error');
        }
    })

    productRouterAdmin.delete("/:id", async (req, res) => {
        try {
            const id = req?.params?.id;
            const query = { _id: new ObjectId(id) };
            const result = await collections?.products?.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(201).send(`Delete a product: ID ${id}.`);
            } else if  (!result) {
                res.status(400).send(`Failed to remove a product: ID ${id}`);
            } else if ( !result.deletedCount) {
                res.status(404).send(`Failed to find product ID ${id}.`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.error (message);
            res.status(400).send(message);
        }
    });

